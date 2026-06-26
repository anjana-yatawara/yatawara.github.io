/* ============================================================================
   yatawara.com — YATTA JR.  (assets/js/ask.js)
   ---------------------------------------------------------------------------
   Anjana's friendly, branded AI chat assistant. A polished Apple-glass chat
   console that mounts inside [data-component="ask-console"] and answers
   questions about Dr. Anjana Yatawara from an embedded knowledge base.

   HYBRID ENGINE (async respond(query)):
     1) RAG retrieval over an embedded KB (chunks scored by token overlap).
     2) MODE PRIORITY:
        a) HOSTED   — if CONFIG.endpoint is set, POST {q, context} -> {answer}
                      (Cloudflare Worker / Claude). On any error: fall through.
        b) IN-BROWSER — if the user enabled WebLLM, generate locally with the
                      retrieved context, streaming tokens. On error: fall through.
        c) CURATED  — render the best-matching chunk's authored answer (always
                      works, high quality) + a smart fallback if nothing matches.
     The MODE chip reflects which path answered: instant / private AI / smart.

   ZERO new deps on default load. WebLLM is lazy/opt-in (dynamic import on a
   button click, WebGPU feature-detected first). HOSTED mode is off until you
   set CONFIG.endpoint — see _YATTA-SETUP.md.

   Contracts honoured:
     • mounts inside [data-component="ask-console"]; safe if absent.
     • listens on window for 'ay:ask' CustomEvents and runs e.detail.q.
     • HTML-escapes all user/echoed text (no XSS).
     • self-injects its own CSS; respects prefers-reduced-motion
       (instant text, no typing animation).
     • node --check passes (vanilla IIFE, self-init, no build step).
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     0. CONFIG  — turn on "smart" (hosted) mode by setting an endpoint URL.
        Leave "" for the excellent default (curated + optional private AI).
        See _YATTA-SETUP.md for a ready-to-paste Cloudflare Worker.
     ---------------------------------------------------------------------- */
  var CONFIG = {
    endpoint: "", // e.g. "https://yatta.<you>.workers.dev"  (empty = off)
    hostedTimeoutMs: 18000,
    // In-browser model (lazy, opt-in). Qwen 0.5B is small & decent; if it
    // fails to load we try the even-smaller SmolLM2 360M.
    webllmModels: [
      "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
      "SmolLM2-360M-Instruct-q4f16_1-MLC"
    ],
    webllmCdn: "https://esm.run/@mlc-ai/web-llm"
  };

  var SELECTOR = '[data-component="ask-console"]';
  var EMAIL = "ayatawara@csub.edu";
  var REDUCED = (function () {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  })();

  // System prompt shared by the in-browser model (and mirrored in the Worker).
  var SYSTEM_PROMPT =
    "You are Yatta Jr., Dr. Anjana Yatawara's website assistant. " +
    "Answer ONLY from the provided context about Anjana. Be concise, warm, " +
    "accurate, third-person. If it's not in the context, say you're unsure " +
    "and suggest emailing " + EMAIL + ".";

  /* ------------------------------------------------------------------------
     1. SMALL HELPERS
     ---------------------------------------------------------------------- */

  // Escape user-supplied / model-supplied text so it can never inject markup.
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Render a *trusted* answer string (authored by us) with a tiny markdown
  // subset: **bold**, [text](url) links, and \n -> <br>. We still escape the
  // raw text first so stray angle brackets render literally, then re-introduce
  // only the whitelisted tags. (Model/user text is escaped, never markdown-ed.)
  function renderMarkdown(src) {
    var html = esc(src);
    html = html.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*|mailto:[^\s)]+)\)/g,
      function (_, label, url) {
        var ext = /^https?:\/\//.test(url);
        var attrs = ext ? ' target="_blank" rel="noopener"' : "";
        return '<a href="' + url + '"' + attrs + ">" + label + "</a>";
      }
    );
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\n/g, "<br>");
    return html;
  }

  // Normalise text for matching: lowercase, strip punctuation, collapse ws.
  function norm(s) {
    return String(s)
      .toLowerCase()
      .replace(/[^a-z0-9\s+]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Levenshtein distance (bounded use) for light fuzzy token matching.
  function lev(a, b) {
    if (a === b) return 0;
    var al = a.length, bl = b.length;
    if (!al) return bl;
    if (!bl) return al;
    var prev = new Array(bl + 1), cur = new Array(bl + 1), i, j;
    for (j = 0; j <= bl; j++) prev[j] = j;
    for (i = 1; i <= al; i++) {
      cur[0] = i;
      for (j = 1; j <= bl; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      for (j = 0; j <= bl; j++) prev[j] = cur[j];
    }
    return prev[bl];
  }

  // Two tokens count as a fuzzy match if they're close in edit distance
  // (tolerant of typos like "voltility", "kernal", "phd"/"phddd").
  function fuzzyEq(t, w) {
    if (t === w) return true;
    if (t.length < 4 || w.length < 4) return false;
    if (t.indexOf(w) !== -1 || w.indexOf(t) !== -1) return true;
    var tol = Math.max(t.length, w.length) >= 7 ? 2 : 1;
    return lev(t, w) <= tol;
  }

  /* ------------------------------------------------------------------------
     2. KNOWLEDGE BASE  (RAG corpus — built faithfully from _BRIEF.md)
        Each chunk: { title, tags:[...], text, answer, links?, weight? }
          - title : short label (shown in fallback nudges)
          - tags  : keyword/phrase strings, the retrieval signal
          - text  : compact factual snippet sent to LLMs as <context>
          - answer: trusted authored markdown rendered in CURATED mode
          - links : quick glass-pill links beneath an answer
        ~20 chunks spanning research, the volatility-memory finding (α≈0.27),
        hybrid TS+ML, environmental justice, AI-in-education/ELEVATE,
        KernelStats, teaching, consulting, bio/PhD, contact, collaborators,
        games, and more.
     ---------------------------------------------------------------------- */

  var KB = [
    {
      title: "Overview",
      tags: [
        "who is anjana", "who is he", "who is dr yatawara", "about anjana",
        "about his", "tell me about", "introduce", "introduction", "summary",
        "what does he do", "his work", "overview", "bio", "biography"
      ],
      text:
        "Dr. Anjana Yatawara is a statistician and applied mathematician, " +
        "Assistant Professor of Mathematics & Statistics at California State " +
        "University, Bakersfield (since Aug 2023). He studies how financial " +
        "markets encode and forget information, builds explainable ML models " +
        "for public health, investigates income-based environmental-exposure " +
        "disparities, and creates AI-powered tools that help students learn " +
        "statistics (supported by the California Learning Lab). He also builds " +
        "KernelStats, a free open-source stats platform, plus Custom GPT tutors " +
        "and browser games.",
      answer:
        "**Dr. Anjana Yatawara** is a statistician and applied mathematician — " +
        "**Assistant Professor of Mathematics & Statistics at California State " +
        "University, Bakersfield** (since Aug 2023). He studies **how financial " +
        "markets encode and forget information**, builds explainable machine-" +
        "learning models for public health, investigates income-based " +
        "environmental-exposure disparities, and creates **AI-powered tools that " +
        "help students learn statistics** (supported by the California Learning " +
        "Lab). He also builds **KernelStats**, a free open-source stats platform, " +
        "plus Custom GPT tutors and browser games.\n\n" +
        "Ask me about his **research**, **the volatility-memory finding**, " +
        "**KernelStats**, **teaching**, **consulting**, or **how to reach him**.",
      links: [
        { label: "Research →", url: "/research.html" },
        { label: "KernelStats →", url: "/kernelstats.html" }
      ]
    },

    {
      title: "Research program",
      tags: [
        "research", "research areas", "research interests", "what does he research",
        "what do you research", "areas of research", "fields", "topics",
        "what does anjana research", "study", "studies", "focus", "program",
        "four pillars", "pillars"
      ],
      text:
        "Anjana's research spans four pillars that share one core (modeling " +
        "complex temporal and spatial patterns to produce actionable insight): " +
        "(1) Financial volatility & time-series econometrics (primary) — GARCH " +
        "models and how markets remember; (2) Hybrid time series + machine " +
        "learning — explainable ML forecasting (e.g. a Hybrid LSTM influenza model); " +
        "(3) Environmental justice & air quality — income-based pollution-exposure " +
        "disparities and low-cost sensor networks; (4) AI in statistics education " +
        "— scaffolded LLM tutors (California Learning Lab ELEVATE grant, Co-PI).",
      answer:
        "Anjana's research program spans **four pillars that share one core** — " +
        "modeling complex temporal and spatial patterns to produce actionable " +
        "insight:\n\n" +
        "**1. Financial volatility & time-series econometrics** (primary) — GARCH-" +
        "family models and *how markets remember* (the volatility-memory finding).\n" +
        "**2. Hybrid time series + machine learning** — explainable ML forecasting, " +
        "e.g. a Hybrid LSTM model for influenza.\n" +
        "**3. Environmental justice & air quality** — income-based pollution-" +
        "exposure disparities and low-cost sensor networks.\n" +
        "**4. AI in statistics education** — scaffolded LLM tutors (California " +
        "Learning Lab ELEVATE grant, Co-PI).\n\n" +
        "Want the plain-English version of the headline finding? Ask me to " +
        "**explain volatility memory simply**.",
      links: [
        { label: "Full research page →", url: "/research.html" },
        { label: "Publications →", url: "/publications.html" }
      ]
    },

    {
      title: "Volatility memory (plain English)",
      weight: 1.15,
      tags: [
        "explain volatility memory", "volatility memory simply", "memory kernel",
        "how markets remember", "stretched exponential", "sub exponential",
        "subexponential", "what is the finding", "main finding", "central finding",
        "headline finding", "nothing ever fully goes away", "alpha 0.27", "alpha",
        "shape of volatility memory", "decay", "explain simply", "in plain english",
        "how do markets remember", "volatility persistence", "what did he find"
      ],
      text:
        "Standard finance models assume markets forget exponentially — a shock " +
        "fades fast and rounds to zero. When Anjana estimated how markets actually " +
        "remember, without assuming any shape, the memory was sub-exponential (a " +
        "stretched exponential): fast forgetting at first, then much slower. " +
        "Vivid version: the first half of a memory disappears in about five days, " +
        "but the last one percent can linger for a year. The curve has a shape " +
        "parameter alpha; at alpha=1 memory is exponential, at alpha<1 the past " +
        "sticks around longer than it should. Across 100+ financial assets he " +
        "found alpha approximately 0.27. A stretched exponential is a mixture of " +
        "many decay rates running at once (day traders and pension funds processing " +
        "the same crash on different timescales). Nothing ever fully goes away — " +
        "it just contributes less.",
      answer:
        "Here's the idea in plain English. Standard finance models assume markets " +
        "**forget exponentially** — a shock hits, its impact fades fast, and pretty " +
        "soon it rounds to zero. But when Anjana estimated *how markets actually " +
        "remember* — without assuming any shape, just letting the data speak — the " +
        "memory wasn't exponential. It was **sub-exponential** (a *stretched " +
        "exponential*): markets forget fast at first, then much more slowly.\n\n" +
        "The vivid version: **the first half of a memory disappears in about five " +
        "days — but the last one percent can linger for a year.**\n\n" +
        "The curve has a shape parameter **α**. At **α = 1** memory is exponential " +
        "(things fade on schedule); at **α < 1** the past sticks around longer than " +
        "it should. Across **100+ financial assets** he found **α ≈ 0.27** — " +
        "nowhere near 1. Why? A stretched exponential is really a *mixture* of many " +
        "decay rates running at once (day traders and pension funds processing the " +
        "same crash on different timescales). **Nothing ever fully goes away — it " +
        "just contributes less.**",
      links: [
        { label: "Read the essay →", url: "/blog/nothing-ever-fully-goes-away.html" },
        { label: "Volatility research →", url: "/research.html" }
      ]
    },

    {
      title: "GARCH / volatility models",
      tags: [
        "garch", "garch models", "figarch", "egarch", "gmarch", "search framework",
        "mf2v", "mf2 garch", "mf2-garch", "mf2egarch", "mf2-egarch", "hygarch",
        "hyperbolic garch", "gjr", "matlab toolbox", "econometrics models",
        "which models", "what models", "volatility models", "conrad engle",
        "trading volume", "asymmetric", "long run component", "time series models"
      ],
      text:
        "On the volatility side Anjana develops a family of GARCH-type models: " +
        "The Shape of Volatility Memory (sub-exponential ARCH(infinity) kernels " +
        "across 100+ assets; introduces the GMARCH and SEARCH frameworks; in " +
        "production, target Journal of Business & Economic Statistics); MF2V-GARCH " +
        "(augments Conrad & Engle's 2025 multiplicative-factor multi-frequency " +
        "GARCH with smoothed trading volume; ships a MATLAB toolbox; target " +
        "Journal of Forecasting); MF2-GARCH-A (sign-sensitive long-run component); " +
        "MF2-EGARCH (exponential-GARCH version); plus MR-HYGARCH, FI-GJRGARCH, and " +
        "a Smooth-Transition variant. The MF2V-GARCH Toolbox for MATLAB is open " +
        "source on GitHub.",
      answer:
        "On the volatility side, Anjana develops a family of GARCH-type models:\n\n" +
        "• **The Shape of Volatility Memory** — sub-exponential ARCH(∞) kernels " +
        "across 100+ assets; introduces the **GMARCH & SEARCH** frameworks. " +
        "*(In production — target: Journal of Business & Economic Statistics.)*\n" +
        "• **MF2V-GARCH** — augments Conrad & Engle's (2025) multiplicative-factor " +
        "multi-frequency GARCH with **smoothed trading volume**; ships a MATLAB " +
        "toolbox. *(Target: Journal of Forecasting.)*\n" +
        "• **MF2-GARCH-A** — a sign-sensitive long-run component (asymmetric " +
        "response to +/− shocks).\n" +
        "• **MF2-EGARCH** — an exponential-GARCH version of the framework.\n" +
        "• Plus **MR-HYGARCH**, **FI-GJRGARCH**, and a Smooth-Transition variant.\n\n" +
        "The **MF2V-GARCH Toolbox for MATLAB** is open source on GitHub.",
      links: [
        { label: "MF2V-GARCH Toolbox →", url: "https://github.com/anjana-yatawara/MF2V-GARCH-Toolbox-for-MATLAB" },
        { label: "Research →", url: "/research.html" }
      ]
    },

    {
      title: "Machine learning for health",
      tags: [
        "machine learning", "ml", "deep learning", "neural network", "flu",
        "influenza", "forecasting", "gru", "cnn", "gru cnn", "gru-cnn",
        "hybrid model", "public health", "health forecasting", "yeo johnson",
        "lstm", "noah gallego", "isuru ratnayake", "jsm 2025"
      ],
      text:
        "Anjana's second pillar is hybrid time series + machine learning — " +
        "explainable ML forecasting grounded in statistics. The flagship project " +
        "is a Hybrid LSTM model for influenza forecasting (with Yeo-Johnson " +
        "scaling), built with student Noah Gallego and Prof. Isuru Ratnayake " +
        "(KUMC) and presented at JSM 2025 (manuscript in preparation). The theme " +
        "throughout: interpretable models, not black boxes.",
      answer:
        "Anjana's second pillar is **hybrid time series + machine learning** — " +
        "explainable ML forecasting grounded in statistics. The flagship project " +
        "is a **Hybrid LSTM model for influenza forecasting** (with Yeo-Johnson " +
        "scaling), built with student **Noah Gallego** and Prof. **Isuru " +
        "Ratnayake** (KUMC) and presented at **JSM 2025**. *(Manuscript in " +
        "preparation.)* The theme throughout: models you can actually interpret, " +
        "not black boxes.",
      links: [{ label: "Research →", url: "/research.html" }]
    },

    {
      title: "Environmental justice & air quality",
      tags: [
        "environmental", "environment", "air quality", "pollution", "air pollution",
        "environmental justice", "exposure", "disparities", "pm2.5", "pm25",
        "no2", "ozone", "sensors", "sensor network", "twin cities", "minnesota",
        "fertility", "kayla ko", "christian rodriguez", "income based", "equity"
      ],
      text:
        "Anjana's third pillar is environmental justice & air quality: " +
        "Income-Based Exposure Disparities in California — a county-level " +
        "multi-pollutant framework (PM2.5, NO2, O3, SO2, CO) with students Kayla " +
        "Ko & Christian Rodriguez (published, Environmental Research: Health, 2025); " +
        "Fine-Scale Air-Quality Heterogeneity in the Twin Cities — 45 low-cost " +
        "multi-pollutant sensors across Minneapolis-St. Paul (published, ACS ES&T " +
        "Air, 2025); and Air Pollution & Fertility Patterns — ongoing, across " +
        "California counties.",
      answer:
        "Anjana's third pillar is **environmental justice & air quality**:\n\n" +
        "• **Income-Based Exposure Disparities in California** — a county-level " +
        "multi-pollutant framework (PM2.5, NO₂, O₃, SO₂, CO) with students Kayla " +
        "Ko & Christian Rodriguez. *(Published — Environmental Research: Health, " +
        "2025.)*\n" +
        "• **Fine-Scale Air-Quality Heterogeneity in the Twin Cities** — 45 low-" +
        "cost multi-pollutant sensors across Minneapolis–St. Paul. *(Published — " +
        "ACS ES&T Air, 2025.)*\n" +
        "• **Air Pollution & Fertility Patterns** — ongoing, across California " +
        "counties.",
      links: [
        { label: "Exposure disparities paper →", url: "https://iopscience.iop.org/article/10.1088/2752-5309/ae4134/meta" },
        { label: "Twin Cities paper →", url: "https://pubs.acs.org/doi/abs/10.1021/acsestair.5c00439" }
      ]
    },

    {
      title: "AI in statistics education (ELEVATE)",
      tags: [
        "ai in education", "ai education", "education", "teaching with ai",
        "llm tutor", "llm tutors", "scaffolded", "thinking partners", "custom gpt",
        "gpt tutor", "elevate", "california learning lab", "learning lab",
        "fie", "jsdse", "ai literacy", "ethics", "k-12", "k12", "engineering education"
      ],
      text:
        "Anjana's fourth pillar is AI in statistics education, anchored by the " +
        "California Learning Lab ELEVATE grant (he's Co-PI): Scaffolded LLM Tutors " +
        "— lead author of 'From Answer Generators to Thinking Partners,' a " +
        "Custom-GPT tutoring/prompt/ethics framework (submitted to JSDSE); " +
        "Structured AI Tutoring in Engineering Education — co-author (published, " +
        "IEEE FIE 2025); Computer-Aided Instruction for K-12 Teachers — a " +
        "cognitive-apprenticeship approach to LLM integration (published, IEEE FIE " +
        "2025). The throughline: AI as a thinking partner introduced after students " +
        "master the fundamentals — never a shortcut around them.",
      answer:
        "Anjana's fourth pillar is **AI in statistics education**, anchored by the " +
        "**California Learning Lab ELEVATE** grant (he's **Co-PI**):\n\n" +
        "• **Scaffolded LLM Tutors** — lead author of *\"From Answer Generators to " +
        "Thinking Partners,\"* a Custom-GPT tutoring / prompt / ethics framework. " +
        "*(Submitted to JSDSE.)*\n" +
        "• **Structured AI Tutoring in Engineering Education** — co-author. " +
        "*(Published — IEEE FIE 2025.)*\n" +
        "• **Computer-Aided Instruction for K–12 Teachers** — a cognitive-" +
        "apprenticeship approach to LLM integration. *(Published — IEEE FIE 2025.)*\n\n" +
        "The throughline: AI as a *thinking partner* introduced **after** students " +
        "master the fundamentals — never a shortcut around them.",
      links: [{ label: "Research →", url: "/research.html" }]
    },

    {
      title: "KernelStats",
      weight: 1.1,
      tags: [
        "kernelstats", "kernel stats", "what is kernelstats", "stats platform",
        "statistics software", "open source", "free software", "minitab", "jmp",
        "sas", "spss", "replace", "alternative to", "stats tool", "shiny",
        "variable doctor", "test finder", "kernelstats pro", "kernel"
      ],
      text:
        "KernelStats is Anjana's free, open-source statistical analysis platform — " +
        "it runs entirely in your browser (no install, no license) and is built to " +
        "replace expensive tools like Minitab (~$1,700/yr), JMP (~$1,785/yr) and " +
        "SAS (~$8,700/yr). Highlights: a Variable Doctor (15 automated diagnostics " +
        "with one-click fixes), 20+ hypothesis tests plus a Test Finder wizard, 10 " +
        "regression families, time series & GARCH (ARIMA, GARCH(1,1), GJR-GARCH, " +
        "EGARCH), survival analysis, a 7-algorithm ML pipeline, and plain-English " +
        "interpretations with Word/HTML reports. Built on R + Shiny, MIT-licensed. " +
        "Site: kernelstats.com. Coming soon: KernelStats Pro, AI-powered with Claude.",
      answer:
        "**KernelStats** is Anjana's **free, open-source statistical analysis " +
        "platform** — it runs **entirely in your browser** (no install, no " +
        "license) and is built to replace expensive tools like Minitab (~$1,700/" +
        "yr), JMP (~$1,785/yr) and SAS (~$8,700/yr). He built it because powerful " +
        "analysis should be accessible to students, budget researchers and small " +
        "organizations.\n\n" +
        "Highlights: a **Variable Doctor** (15 automated diagnostics with one-click " +
        "fixes), 20+ hypothesis tests plus a **Test Finder** wizard, 10 regression " +
        "families, **time series & GARCH** (ARIMA, GARCH(1,1), GJR-GARCH, EGARCH), " +
        "survival analysis, a 7-algorithm ML pipeline, and **plain-English " +
        "interpretations** with Word/HTML reports. Built on **R + Shiny**, MIT-" +
        "licensed. *(Coming soon: KernelStats Pro, AI-powered with Claude.)*",
      links: [
        { label: "Open kernelstats.com ↗", url: "https://kernelstats.com" },
        { label: "GitHub ↗", url: "https://github.com/anjana-yatawara/kernel" },
        { label: "About KernelStats →", url: "/kernelstats.html" }
      ]
    },

    {
      title: "Teaching & courses",
      tags: [
        "teach", "teaches", "teaching", "what does he teach", "what do you teach",
        "courses", "course", "classes", "class", "math 2200", "math 3200",
        "math 4200", "math 4230", "statistics course", "elementary statistics",
        "mathematical statistics", "probability", "data science course", "subjects"
      ],
      text:
        "At CSUB Anjana teaches from elementary statistics to mathematical " +
        "statistics and applied data science. His courses include MATH 2200 " +
        "Elementary Statistics (OER, AI-assisted tools); MATH 3200 Probability " +
        "Theory; MATH 3209 Statistical Measures of Inequality in Society (GE); " +
        "MATH 3210 Applied Statistical Computing & Multivariate Methods (graduate, " +
        "R & SAS); MATH 4200 Mathematical Statistics (proof-based); MATH 4210 " +
        "Regression Modeling & Analysis; and MATH 4230 Applied Statistical Methods " +
        "for Data Science (ISLR, R & Python). He teaches with real data, active " +
        "learning, and AI introduced deliberately after the fundamentals.",
      answer:
        "At CSUB Anjana teaches **from elementary statistics to mathematical " +
        "statistics and applied data science**. His courses include:\n\n" +
        "• **MATH 2200** — Elementary Statistics *(OER, AI-assisted tools)*\n" +
        "• **MATH 3200** — Probability Theory\n" +
        "• **MATH 3209** — Statistical Measures of Inequality in Society *(GE)*\n" +
        "• **MATH 3210** — Applied Statistical Computing & Multivariate Methods " +
        "*(graduate, R & SAS)*\n" +
        "• **MATH 4200** — Mathematical Statistics *(proof-based)*\n" +
        "• **MATH 4210** — Regression Modeling & Analysis\n" +
        "• **MATH 4230** — Applied Statistical Methods for Data Science " +
        "*(ISLR, R & Python)*\n\n" +
        "He teaches with real data, active learning, and AI introduced " +
        "deliberately **after** the fundamentals. Ask about his **teaching " +
        "philosophy** for more.",
      links: [{ label: "Teaching page →", url: "/teaching.html" }]
    },

    {
      title: "Teaching philosophy",
      tags: [
        "teaching philosophy", "philosophy", "approach to teaching", "his mother",
        "mother", "sri lanka", "sri lankan", "rural", "why teach", "beliefs",
        "values", "pedagogy", "student centered", "active learning", "google the steps"
      ],
      text:
        "Anjana's teaching philosophy is rooted in the belief that education " +
        "transforms lives — shaped by his mother, who taught for 35 years in rural " +
        "Sri Lanka. He builds four kinds of interaction: student-teacher (learn " +
        "names, stay approachable, treat every question as equal), student-subject " +
        "(motivate why statistics matters with real examples — markets, crypto, the " +
        "environment), peer-to-peer (group projects and collaborative analyses), and " +
        "student-real-world (presentations, reports, careers). AI is used ethically " +
        "and only after fundamentals. As he puts it: 'Anyone can google the steps " +
        "to a hypothesis test, but you need to understand the basics to interpret " +
        "the result and make inferences.'",
      answer:
        "Anjana's teaching philosophy is rooted in the belief that **education " +
        "transforms lives** — shaped by his mother, who taught for **35 years in " +
        "rural Sri Lanka**. He builds four kinds of interaction: student–teacher " +
        "(learn names, stay approachable, treat every question as equal), student–" +
        "subject (motivate *why* statistics matters with real examples — markets, " +
        "crypto, the environment), peer-to-peer (group projects and collaborative " +
        "analyses), and student–real-world (presentations, reports, careers). AI " +
        "is used ethically and only after fundamentals. As he puts it: *\"Anyone " +
        "can google the steps to a hypothesis test, but you need to understand the " +
        "basics to interpret the result and make inferences.\"*",
      links: [{ label: "Teaching page →", url: "/teaching.html" }]
    },

    {
      title: "Consulting & advisory",
      weight: 1.05,
      tags: [
        "consulting", "consult", "hire", "work with him", "work with you",
        "how do i work with", "how can i work with", "data science advisory",
        "advisory", "dashboards", "analytics dashboard", "freelance", "project",
        "services", "business", "data strategy", "for my company", "engagement",
        "can he help"
      ],
      text:
        "Anjana offers statistical consulting & data-science advisory through CSU " +
        "Bakersfield — all engagements run via CSUB's institutional framework. His " +
        "flagship service is AI-Automated Data Analytics Dashboards: custom " +
        "AI-powered dashboards built to your KPIs, automated reporting with " +
        "AI-generated interpretations, real-time pipelines, and production R/Python " +
        "deployed to your infrastructure (powered by the engine behind KernelStats). " +
        "He also offers time series & forecasting (GARCH + hybrid ML), machine " +
        "learning & prediction, study design & analysis, environmental & health " +
        "analytics, AI strategy & implementation, and training & workshops. Process: " +
        "Discovery, Proposal, Engagement, Delivery. To start, email " + EMAIL + ".",
      answer:
        "Anjana offers **statistical consulting & data-science advisory through CSU " +
        "Bakersfield** — all engagements run via CSUB's institutional framework. " +
        "His flagship service is **AI-Automated Data Analytics Dashboards**: " +
        "custom AI-powered dashboards built to your KPIs, automated reporting with " +
        "AI-generated interpretations, real-time pipelines, and production R/Python " +
        "deployed to your infrastructure (powered by the engine behind " +
        "KernelStats). He also offers **time series & forecasting** (GARCH + " +
        "hybrid ML), **machine learning & prediction**, **study design & " +
        "analysis**, **environmental & health analytics**, **AI strategy & " +
        "implementation**, and **training & workshops** (R, Python, SAS, ML, AI).\n\n" +
        "The process: **Discovery → Proposal → Engagement → Delivery** (report + " +
        "reproducible code + visualizations). To start, email **[" + EMAIL +
        "](mailto:" + EMAIL + ")**.",
      links: [
        { label: "Consulting page →", url: "/consulting.html" },
        { label: "Email about a project →", url: "mailto:" + EMAIL }
      ]
    },

    {
      title: "Mentoring students",
      tags: [
        "taking students", "take students", "accepting students", "mentor",
        "mentorship", "undergraduate research", "research opportunities",
        "join his lab", "work in his lab", "student researcher", "research assistant",
        "can i do research", "sure program", "cv pathway", "scholars",
        "opportunities for students"
      ],
      text:
        "Yes — Anjana actively mentors undergraduate researchers across several " +
        "funded programs (SURE/Chevron, the CV Pathway apprenticeship, and Student " +
        "Research Scholars). Past projects span local-LLM applications for " +
        "education, air-pollution & fertility patterns, and 'How Present is ChatGPT " +
        "at CSUB?'. The best move is to email him with your interests at " + EMAIL +
        ". For recommendation letters he asks for at least 3 weeks notice plus your " +
        "CV, the program description, and your emphasis note.",
      answer:
        "Yes — Anjana **actively mentors undergraduate researchers** across several " +
        "funded programs (SURE/Chevron, the CV Pathway apprenticeship, and Student " +
        "Research Scholars). Past projects span local-LLM applications for " +
        "education, air-pollution & fertility patterns, and *\"How Present is " +
        "ChatGPT at CSUB?\"*. The best move is to **email him** with your " +
        "interests at **[" + EMAIL + "](mailto:" + EMAIL + ")**. (For " +
        "recommendation letters he asks for **≥3 weeks notice** plus your CV, the " +
        "program description, and your emphasis note.)",
      links: [
        { label: "Teaching & mentorship →", url: "/teaching.html" },
        { label: "Email Anjana →", url: "mailto:" + EMAIL }
      ]
    },

    {
      title: "AI tools for students",
      tags: [
        "ai tools", "ai tools for students", "r tutor", "mathbuddy", "study coach",
        "latex converter", "learning assistant", "custom gpts", "gpt tutors",
        "tools for students", "what tools", "student tools", "tutoring tools"
      ],
      text:
        "Anjana builds a suite of AI tools for students, including an R Tutor for " +
        "MATH 2200, a MATH 4200 AI Assistant, a LaTeX Converter, MATLAB/R/Python " +
        "Learning Assistants, MathBuddy Jr., and a Study Coach GPT — all designed to " +
        "deepen understanding rather than replace it.",
      answer:
        "Anjana builds a suite of **AI tools for students**, including an **R Tutor** " +
        "for MATH 2200, a **MATH 4200 AI Assistant**, a **LaTeX Converter**, " +
        "**MATLAB/R/Python Learning Assistants**, **MathBuddy Jr.**, and a **Study " +
        "Coach GPT** — all designed to deepen understanding rather than replace it.",
      links: [{ label: "Teaching page →", url: "/teaching.html" }]
    },

    {
      title: "Publications",
      tags: [
        "publications", "papers", "published", "articles", "preprints",
        "working papers", "journal", "what has he published", "list of papers",
        "his papers", "dissertation", "thesis", "proceedings", "google scholar",
        "scholar", "orcid", "citations papers"
      ],
      text:
        "Anjana's peer-reviewed and working papers span volatility, environmental " +
        "statistics, and AI in education. Published work includes the Twin Cities " +
        "low-cost sensor study (ACS ES&T Air, 2025), the income-based exposure " +
        "disparities framework (Environmental Research: Health, 2025), and two IEEE " +
        "FIE 2025 education papers. Working papers include The Shape of Volatility " +
        "Memory (target JBES), MF2V-GARCH, MF2-GARCH-A, and the Hybrid LSTM influenza " +
        "model. His Ph.D. dissertation is The Multiplicative Factor Multi-Frequency " +
        "Exponential GARCH ((MF)2EGARCH) (Missouri S&T, 2023).",
      answer:
        "Anjana's peer-reviewed and working papers span volatility, environmental " +
        "statistics, and AI in education. Published work includes the **Twin " +
        "Cities** low-cost sensor study (ACS ES&T Air, 2025), the **income-based " +
        "exposure disparities** framework (Environmental Research: Health, 2025), " +
        "and two **IEEE FIE 2025** education papers. Working papers include *The " +
        "Shape of Volatility Memory* (target: JBES), *MF2V-GARCH*, *MF2-GARCH-A*, " +
        "and the Hybrid LSTM influenza model. His **Ph.D. dissertation** is *The " +
        "Multiplicative Factor Multi-Frequency Exponential GARCH ((MF)²EGARCH)* " +
        "(Missouri S&T, 2023).",
      links: [
        { label: "All publications →", url: "/publications.html" },
        { label: "Google Scholar ↗", url: "https://scholar.google.com/citations?user=n5WtVd0AAAAJ" }
      ]
    },

    {
      title: "Education & background",
      tags: [
        "where did he study", "where did you study", "education background",
        "phd", "ph d", "doctorate", "degree", "degrees", "university",
        "missouri", "missouri s t", "missouri science", "peradeniya",
        "advisor", "samaranayake", "where did he get his phd", "alma mater",
        "studied", "school", "graduate"
      ],
      text:
        "Anjana earned his Ph.D. in Mathematics (Statistics emphasis) from Missouri " +
        "University of Science & Technology (2017-2023), advised by Dr. V.A. " +
        "Samaranayake, with a focus on time series with conditional heteroscedastic " +
        "structure. Before that he completed a B.Sc. Special Degree in Statistics " +
        "at the University of Peradeniya, Sri Lanka (2012-2016). He has been an " +
        "Assistant Professor at CSU Bakersfield since August 2023.",
      answer:
        "Anjana earned his **Ph.D. in Mathematics (Statistics emphasis) from " +
        "Missouri University of Science & Technology (2017–2023)**, advised by " +
        "**Dr. V.A. Samaranayake**, with a focus on time series with conditional " +
        "heteroscedastic structure. Before that he completed a **B.Sc. Special " +
        "Degree in Statistics at the University of Peradeniya, Sri Lanka (2012–" +
        "2016)**. He has been an **Assistant Professor at CSU Bakersfield since " +
        "August 2023**.",
      links: [{ label: "Curriculum vitae →", url: "/cv.html" }]
    },

    {
      title: "CV / credentials",
      tags: [
        "cv", "curriculum vitae", "resume", "résumé", "credentials", "qualifications",
        "grants", "funding", "skills", "technical skills", "memberships",
        "positions", "experience", "background", "asa", "ams"
      ],
      text:
        "Anjana's CV covers his education (Ph.D., Missouri S&T; B.Sc., Peradeniya), " +
        "academic positions (Assistant Professor, CSUB, 2023-present), and funded " +
        "grants — including the CES Mini-Grant (PI) for air-pollution disparities " +
        "and the California Learning Lab ELEVATE challenge (Co-PI). His technical " +
        "toolkit spans R, Python, MATLAB, SAS, SQL, LaTeX, Git, and TensorFlow, " +
        "across GARCH-family modeling, Bayesian inference, machine learning, and " +
        "Custom GPT / LLM development. He's a member of the ASA and AMS.",
      answer:
        "Anjana's CV covers his education (Ph.D., Missouri S&T; B.Sc., Peradeniya), " +
        "academic positions (Assistant Professor, CSUB, 2023–present), and funded " +
        "grants — including the **CES Mini-Grant** (PI) for air-pollution " +
        "disparities and the **California Learning Lab ELEVATE** challenge (Co-PI). " +
        "His technical toolkit spans **R, Python, MATLAB, SAS, SQL, LaTeX, Git, " +
        "and TensorFlow**, across GARCH-family modeling, Bayesian inference, " +
        "machine learning, and Custom GPT / LLM development. He's a member of the " +
        "**ASA** and **AMS**.",
      links: [
        { label: "Curriculum vitae →", url: "/cv.html" },
        { label: "Download CV (PDF) →", url: "/assets/Yatawara_CV.pdf" }
      ]
    },

    {
      title: "Browser games",
      tags: [
        "games", "game", "play", "browser games", "arcade", "sigma strike",
        "tabasco", "basco", "acts of the continuous", "fun", "made any games"
      ],
      text:
        "Anjana builds browser games for fun — and one for learning. There's Acts " +
        "of the Continuous, a six-act study game for MATH 3200 Exam 2 (138-question " +
        "adaptive pool, global leaderboard), plus the arcade titles Revenge of the " +
        "Basco and Sigma Strike. All play right in the browser.",
      answer:
        "Anjana builds **browser games** for fun — and one for learning. There's " +
        "**Acts of the Continuous**, a six-act study game for MATH 3200 Exam 2 " +
        "(138-question adaptive pool, global leaderboard), plus the arcade titles " +
        "**Revenge of the Basco** and **Sigma Strike**. All play right in the " +
        "browser.",
      links: [{ label: "Games hub →", url: "/games/index.html" }]
    },

    {
      title: "Contact",
      tags: [
        "contact", "email", "reach", "get in touch", "how do i contact",
        "how to reach", "linkedin", "github", "social", "connect", "message him",
        "phone", "call", "where is he", "find him", "his email"
      ],
      text:
        "The best way to reach Anjana is email: " + EMAIL + ". You can also find him " +
        "on GitHub (github.com/anjana-yatawara), Google Scholar, ORCID " +
        "(0009-0007-8506-7763), and LinkedIn (in/anjana-yatawara). His phone number " +
        "isn't published — email is the way to go.",
      answer:
        "The best way to reach Anjana is **email: [" + EMAIL + "](mailto:" + EMAIL +
        ")**. You can also find him on **[GitHub](https://github.com/anjana-yatawara)**, " +
        "**[Google Scholar](https://scholar.google.com/citations?user=n5WtVd0AAAAJ)**, " +
        "**[ORCID](https://orcid.org/0009-0007-8506-7763)**, and " +
        "**[LinkedIn](https://www.linkedin.com/in/anjana-yatawara)**. " +
        "*(His phone number isn't published — email is the way to go.)*",
      links: [
        { label: "Email →", url: "mailto:" + EMAIL },
        { label: "GitHub ↗", url: "https://github.com/anjana-yatawara" },
        { label: "LinkedIn ↗", url: "https://www.linkedin.com/in/anjana-yatawara" }
      ]
    },

    {
      title: "Collaborators",
      tags: [
        "collaborators", "collaborate", "co authors", "coauthors",
        "who does he work with", "team", "colleagues", "partners", "works with"
      ],
      text:
        "Anjana collaborates widely. His PhD advisor V.A. Samaranayake (Missouri " +
        "S&T) is a frequent co-author on the volatility work; Isuru Ratnayake (KUMC) " +
        "on the influenza forecasting; and at CSUB he works with Alberto Cruz (ECE, " +
        "ELEVATE PI), Jianjun Wang, Maruti Mishra, Eduardo Montoya, and Bilin Zeng, " +
        "among others.",
      answer:
        "Anjana collaborates widely. His PhD advisor **V.A. Samaranayake** " +
        "(Missouri S&T) is a frequent co-author on the volatility work; **Isuru " +
        "Ratnayake** (KUMC) on the influenza forecasting; and at CSUB he works " +
        "with **Alberto Cruz** (ECE, ELEVATE PI), **Jianjun Wang**, **Maruti " +
        "Mishra**, **Eduardo Montoya**, and **Bilin Zeng**, among others.",
      links: [{ label: "Research →", url: "/research.html" }]
    },

    {
      title: "About Yatta Jr.",
      tags: [
        "who are you", "what are you", "yatta jr", "yatta", "are you a bot",
        "are you ai", "what can you do", "help", "what can i ask", "how do you work",
        "what model", "are you real"
      ],
      text:
        "Yatta Jr. is Anjana's friendly website assistant. It answers questions " +
        "about his research, teaching, and tools using a hybrid engine: a curated " +
        "knowledge base that always works, an optional private AI that can run " +
        "entirely in your browser via WebGPU, and an optional hosted 'smart' mode. " +
        "It only speaks about Anjana, in the third person.",
      answer:
        "I'm **Yatta Jr.**, Anjana's friendly AI assistant. I answer questions " +
        "about his **research**, **teaching**, and **tools** — always in the third " +
        "person.\n\n" +
        "Under the hood I run a **hybrid engine**: a curated knowledge base that " +
        "always works (*instant* mode), an optional **private AI that runs entirely " +
        "in your browser** (tap *⚡ Run a private AI*), and an optional hosted " +
        "*smart* mode. Pick a suggested question below, or just ask.",
      links: [
        { label: "Research →", url: "/research.html" },
        { label: "KernelStats →", url: "/kernelstats.html" }
      ]
    }
  ];

  // Suggested-question chips (per the brief).
  var CHIPS = [
    "What does Anjana research?",
    "Explain volatility memory simply",
    "What is KernelStats?",
    "What does he teach?",
    "How can I work with him?",
    "Where did he study?"
  ];

  // Precompute normalised tag tokens for each chunk.
  KB.forEach(function (it) {
    it._pats = it.tags.map(function (p) {
      return { raw: p, toks: norm(p).split(" ").filter(Boolean) };
    });
  });

  /* ------------------------------------------------------------------------
     3. RAG RETRIEVAL  — score chunks by keyword/token overlap; return top-K
        plus the best confident match for CURATED rendering.
     ---------------------------------------------------------------------- */

  // very common words that shouldn't drive matching
  var STOP = {
    the: 1, a: 1, an: 1, is: 1, are: 1, do: 1, does: 1, did: 1, what: 1,
    who: 1, how: 1, "of": 1, to: 1, "in": 1, on: 1, for: 1, with: 1, and: 1,
    his: 1, he: 1, his: 1, he: 1, you: 1, your: 1, i: 1, me: 1, my: 1,
    about: 1, tell: 1, can: 1, "this": 1, that: 1, it: 1, "or": 1, "as": 1,
    please: 1, anjana: 1, yatawara: 1, dr: 1
  };

  function scoreChunk(chunk, qToks) {
    var qNormStr = qToks.join(" ");
    var score = 0;

    chunk._pats.forEach(function (p) {
      // Strong signal: full multi-word phrase appears in the query.
      if (p.toks.length > 1 && qNormStr.indexOf(norm(p.raw)) !== -1) {
        score += 6 + p.toks.length;
      }
      // Token-level overlap (exact + fuzzy), ignoring stopwords.
      p.toks.forEach(function (pt) {
        if (STOP[pt]) return;
        var best = 0;
        for (var i = 0; i < qToks.length; i++) {
          var qt = qToks[i];
          if (STOP[qt]) continue;
          if (qt === pt) { best = Math.max(best, 2.2); }
          else if (fuzzyEq(qt, pt)) { best = Math.max(best, 1.3); }
        }
        score += best;
      });
    });

    return score * (chunk.weight || 1);
  }

  // Retrieve: rank all chunks, return { ranked, best, confident, top }.
  //   ranked : [{chunk, score}, ...] desc
  //   best   : top chunk (may be low-confidence)
  //   confident: whether best clears the threshold
  //   top    : top 3-4 chunks above a weak floor (RAG context)
  function retrieve(query) {
    var qToks = norm(query).split(" ").filter(Boolean);
    if (!qToks.length) return { ranked: [], best: null, confident: false, top: [] };

    var ranked = KB.map(function (c) {
      return { chunk: c, score: scoreChunk(c, qToks) };
    }).sort(function (a, b) { return b.score - a.score; });

    var bestScore = ranked[0] ? ranked[0].score : 0;
    var meaningful = qToks.filter(function (t) { return !STOP[t]; }).length;
    var threshold = meaningful >= 1 ? 1.9 : 3.5;
    var confident = bestScore >= threshold;

    // Top 3-4 chunks above a weak floor become the LLM context.
    var top = [];
    for (var i = 0; i < ranked.length && top.length < 4; i++) {
      if (ranked[i].score >= 1.0) top.push(ranked[i].chunk);
    }
    if (!top.length && ranked[0]) top.push(ranked[0].chunk); // always give some context

    return {
      ranked: ranked,
      best: ranked[0] ? ranked[0].chunk : null,
      confident: confident,
      top: top
    };
  }

  // Build a compact <context> string from retrieved chunks (for LLM modes).
  function buildContext(chunks) {
    return chunks.map(function (c) {
      return "## " + c.title + "\n" + c.text;
    }).join("\n\n");
  }

  // Smart curated fallback: honest "not sure", nudge to the closest page,
  // re-offer chips. Used when retrieval isn't confident.
  function curatedFallback(hint) {
    var msg =
      "I'm not certain I have that in my knowledge base. I can speak to " +
      "Anjana's **research**, the **volatility-memory finding**, " +
      "**KernelStats**, his **teaching** and **consulting**, his **background**, " +
      "and **how to reach him**.";
    var links = [];
    if (hint && hint.links && hint.links.length) {
      msg += "\n\nThe closest topic looked like **" + hint.title +
        "** — try a link below, or pick a suggested question.";
      links.push(hint.links[0]);
    }
    msg += "\n\nStill stuck? Email Anjana directly at **[" + EMAIL +
      "](mailto:" + EMAIL + ")**.";
    return { answer: msg, links: links };
  }

  /* ------------------------------------------------------------------------
     4. IN-BROWSER MODEL  (WebLLM — lazy/opt-in only; zero deps on default load)
     ---------------------------------------------------------------------- */

  var WebLLM = {
    supported: (function () {
      try { return !!(navigator && navigator.gpu); } catch (e) { return false; }
    })(),
    state: "idle",       // idle | loading | ready | error
    engine: null,
    modelId: null,
    progress: 0,
    _loading: null       // shared promise so multiple consoles share one load
  };

  // Lazily load WebLLM and create the engine. onProgress(pct, text) fires
  // during download. Resolves to the engine, or rejects on failure.
  WebLLM.load = function (onProgress) {
    if (WebLLM.state === "ready") return Promise.resolve(WebLLM.engine);
    if (WebLLM._loading) return WebLLM._loading;
    if (!WebLLM.supported) {
      return Promise.reject(new Error("WebGPU unavailable"));
    }

    WebLLM.state = "loading";
    WebLLM._loading = (function () {
      return import(/* @vite-ignore */ CONFIG.webllmCdn).then(function (mod) {
        var CreateMLCEngine = mod.CreateMLCEngine;
        if (typeof CreateMLCEngine !== "function") {
          throw new Error("WebLLM export missing");
        }
        var initProgressCallback = function (rep) {
          var pct = rep && typeof rep.progress === "number"
            ? Math.round(rep.progress * 100) : WebLLM.progress;
          WebLLM.progress = pct;
          if (onProgress) onProgress(pct, (rep && rep.text) || "");
        };

        // Try each model id in turn; first to load wins.
        var models = CONFIG.webllmModels.slice();
        function tryNext(i) {
          if (i >= models.length) {
            throw new Error("No in-browser model could be loaded");
          }
          var id = models[i];
          return CreateMLCEngine(id, { initProgressCallback: initProgressCallback })
            .then(function (engine) {
              WebLLM.engine = engine;
              WebLLM.modelId = id;
              WebLLM.state = "ready";
              return engine;
            })
            .catch(function () { return tryNext(i + 1); });
        }
        return tryNext(0);
      }).catch(function (err) {
        WebLLM.state = "error";
        WebLLM._loading = null; // allow a retry
        throw err;
      });
    })();

    return WebLLM._loading;
  };

  // Generate with the in-browser engine, streaming tokens via onToken(chunk).
  // Resolves to the full text. Throws on any error (caller falls back).
  WebLLM.generate = function (query, context, onToken) {
    var engine = WebLLM.engine;
    if (!engine) return Promise.reject(new Error("engine not ready"));
    var messages = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content:
          "Context about Anjana:\n" + context +
          "\n\nQuestion: " + query +
          "\n\nAnswer concisely from the context above."
      }
    ];
    return engine.chat.completions.create({
      messages: messages,
      stream: true,
      temperature: 0.4
    }).then(function (stream) {
      var full = "";
      // for-await over the async iterator (wrapped to keep node --check happy
      // and to work on older engines that hand back an async generator).
      function pump(iter) {
        return iter.next().then(function (res) {
          if (res.done) return full;
          var chunk = res.value;
          var delta = chunk && chunk.choices && chunk.choices[0] &&
            chunk.choices[0].delta && chunk.choices[0].delta.content;
          if (delta) {
            full += delta;
            if (onToken) onToken(delta);
          }
          return pump(iter);
        });
      }
      var iterator = stream[Symbol.asyncIterator]
        ? stream[Symbol.asyncIterator]() : stream;
      return pump(iterator);
    });
  };

  /* ------------------------------------------------------------------------
     5. HOSTED MODE  (Cloudflare Worker / Claude) — POST {q, context} -> {answer}
        Supports a plain-text OR JSON ({answer}) response. Any error/timeout
        falls through to the next mode.
     ---------------------------------------------------------------------- */

  function hostedRespond(query, context) {
    if (!CONFIG.endpoint) return Promise.reject(new Error("no endpoint"));

    var ctrl = (typeof AbortController !== "undefined") ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); },
      CONFIG.hostedTimeoutMs);

    var opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ q: query, context: context })
    };
    if (ctrl) opts.signal = ctrl.signal;

    return fetch(CONFIG.endpoint, opts).then(function (resp) {
      clearTimeout(timer);
      if (!resp.ok) throw new Error("hosted HTTP " + resp.status);
      var ct = resp.headers.get("content-type") || "";
      if (ct.indexOf("application/json") !== -1) {
        return resp.json().then(function (data) {
          var ans = data && (data.answer || data.text || data.completion);
          if (!ans || !String(ans).trim()) throw new Error("empty hosted answer");
          return String(ans);
        });
      }
      // plain text
      return resp.text().then(function (t) {
        if (!t || !t.trim()) throw new Error("empty hosted answer");
        return t;
      });
    }).catch(function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  /* ------------------------------------------------------------------------
     6. UI — Apple-glass chat console
     ---------------------------------------------------------------------- */

  function injectCSS() {
    if (document.getElementById("ay-yatta-css")) return;
    // Apple × Cosmos glass chat: translucent panel (var(--panel)) over deep
    // space, hairline border, big rounding, backdrop-blur + soft shadow.
    // Inter body type. Message bubbles (user right, Yatta left w/ avatar).
    // Apple-pill chips. Cosmic accent #2997ff. Restrained, cinematic.
    var css = [
      '[data-component="ask-console"]{display:block}',
      ".ayk{font-family:var(--font-body,-apple-system,'Inter',system-ui,sans-serif);",
      "border:1px solid var(--hair,rgba(255,255,255,0.09));",
      "border-radius:var(--r-lg,22px);background:var(--panel,rgba(255,255,255,0.045));",
      "-webkit-backdrop-filter:blur(20px) saturate(160%);backdrop-filter:blur(20px) saturate(160%);",
      "box-shadow:var(--shadow-2,0 24px 60px -24px rgba(0,0,0,0.7));overflow:hidden;position:relative}",
      ".ayk *{box-sizing:border-box}",
      /* header */
      ".ayk-bar{display:flex;align-items:center;gap:.65rem;padding:.75rem 1rem;",
      "border-bottom:1px solid var(--hair,rgba(255,255,255,0.09));",
      "background:var(--panel,rgba(255,255,255,0.045))}",
      ".ayk-ava{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;",
      "background:var(--grad-accent,linear-gradient(120deg,#2997ff,#a98bff));",
      "box-shadow:var(--glow,0 0 30px -8px rgba(41,151,255,0.5))}",
      ".ayk-ava svg{width:22px;height:22px;display:block}",
      ".ayk-id{display:flex;flex-direction:column;gap:.05rem;min-width:0}",
      ".ayk-id b{color:var(--text,#f5f7fa);font-weight:600;font-size:var(--fs-sm,.92rem);letter-spacing:-.01em;line-height:1.1}",
      ".ayk-id span{color:var(--dim,#8b92a1);font-size:.66rem;line-height:1.2;",
      "white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      /* mode chip */
      ".ayk-mode{margin-left:auto;display:inline-flex;align-items:center;gap:.4rem;flex:none;",
      "font-size:.62rem;letter-spacing:.02em;color:var(--text-soft,#c6ccd8);font-weight:500;",
      "background:var(--panel,rgba(255,255,255,0.045));border:1px solid var(--hair,rgba(255,255,255,0.09));",
      "padding:.18rem .55rem;border-radius:var(--r-pill,980px);text-transform:lowercase}",
      ".ayk-mode::before{content:'';width:6px;height:6px;border-radius:50%;flex:none;",
      "background:var(--accent,#2997ff);box-shadow:0 0 8px var(--accent,#2997ff);animation:ayk-pulse 2.4s infinite}",
      ".ayk-mode[data-mode='private AI']::before{background:var(--violet,#a98bff);box-shadow:0 0 8px var(--violet,#a98bff)}",
      ".ayk-mode[data-mode='smart']::before{background:var(--teal,#4fd6e6);box-shadow:0 0 8px var(--teal,#4fd6e6)}",
      /* transcript */
      ".ayk-scroll{max-height:clamp(300px,48vh,580px);overflow-y:auto;padding:1rem 1.05rem;scroll-behavior:smooth}",
      ".ayk-scroll::-webkit-scrollbar{width:10px}",
      ".ayk-scroll::-webkit-scrollbar-thumb{background:var(--hair-2,rgba(255,255,255,0.16));border-radius:var(--r-pill,980px);",
      "border:2px solid transparent;background-clip:padding-box}",
      /* message rows */
      ".ayk-msg{display:flex;gap:.55rem;margin:0 0 .85rem;align-items:flex-end}",
      ".ayk-msg.me{flex-direction:row-reverse}",
      ".ayk-mava{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;",
      "background:var(--grad-accent,linear-gradient(120deg,#2997ff,#a98bff));align-self:flex-start;margin-top:1px}",
      ".ayk-mava svg{width:16px;height:16px;display:block}",
      ".ayk-bubble{max-width:84%;padding:.6rem .85rem;border-radius:var(--r-md,16px);",
      "font-size:var(--fs-sm,.92rem);line-height:1.6;word-break:break-word}",
      ".ayk-msg.bot .ayk-bubble{background:var(--panel,rgba(255,255,255,0.045));",
      "border:1px solid var(--hair,rgba(255,255,255,0.09));color:var(--text-soft,#c6ccd8);",
      "border-bottom-left-radius:6px}",
      ".ayk-msg.me .ayk-bubble{background:var(--accent-dim,rgba(41,151,255,0.14));",
      "border:1px solid var(--accent-dim,rgba(41,151,255,0.14));color:var(--text,#f5f7fa);",
      "border-bottom-right-radius:6px;font-weight:500}",
      ".ayk-bubble strong{color:var(--text,#f5f7fa);font-weight:600}",
      ".ayk-bubble a{color:var(--accent,#2997ff);text-decoration:none;font-weight:500}",
      ".ayk-bubble a:hover{color:var(--accent-2,#66b5ff)}",
      ".ayk-cur{display:inline-block;width:.5em;height:1.05em;background:var(--accent,#2997ff);",
      "vertical-align:-.18em;margin-left:1px;border-radius:1px;animation:ayk-blink 1.05s steps(1) infinite}",
      /* typing dots */
      ".ayk-dots3{display:inline-flex;gap:.22rem;padding:.12rem 0}",
      ".ayk-dots3 i{width:6px;height:6px;border-radius:50%;background:var(--dim,#8b92a1);",
      "animation:ayk-bob 1.2s infinite ease-in-out}",
      ".ayk-dots3 i:nth-child(2){animation-delay:.15s}.ayk-dots3 i:nth-child(3){animation-delay:.3s}",
      /* answer links — glass pills */
      ".ayk-links{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.7rem}",
      ".ayk-links a{font-size:var(--fs-xs,.82rem);color:var(--text-soft,#c6ccd8);",
      "padding:.3rem .72rem;border:1px solid var(--hair,rgba(255,255,255,0.09));border-radius:var(--r-pill,980px);",
      "background:var(--panel,rgba(255,255,255,0.045));text-decoration:none;font-weight:500;",
      "transition:color .2s ease,background .2s ease,border-color .2s ease}",
      ".ayk-links a:hover{color:var(--text,#f5f7fa);background:var(--panel-2,rgba(255,255,255,0.075));border-color:var(--hair-2,rgba(255,255,255,0.16))}",
      /* chips */
      ".ayk-chips{display:flex;flex-wrap:wrap;gap:.5rem;padding:.1rem 1.05rem .2rem}",
      ".ayk-chip{display:inline-flex;align-items:center;font-size:var(--fs-xs,.82rem);",
      "color:var(--text-soft,#c6ccd8);padding:.4rem .9rem;border-radius:var(--r-pill,980px);",
      "background:var(--panel,rgba(255,255,255,0.045));border:1px solid var(--hair,rgba(255,255,255,0.09));",
      "font-weight:500;cursor:pointer;line-height:1.2;",
      "transition:color .2s ease,background .2s ease,border-color .2s ease}",
      ".ayk-chip:hover{background:var(--panel-2,rgba(255,255,255,0.075));color:var(--text,#f5f7fa);border-color:var(--hair-2,rgba(255,255,255,0.16))}",
      ".ayk-chip:focus-visible{outline:2px solid var(--accent,#2997ff);outline-offset:2px}",
      /* private-AI control row */
      ".ayk-ctl{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;padding:.55rem 1.05rem 0}",
      ".ayk-llm{display:inline-flex;align-items:center;gap:.45rem;font-size:var(--fs-xs,.82rem);",
      "color:var(--text-soft,#c6ccd8);padding:.4rem .85rem;border-radius:var(--r-pill,980px);",
      "background:var(--panel,rgba(255,255,255,0.045));border:1px solid var(--hair,rgba(255,255,255,0.09));",
      "font-weight:500;cursor:pointer;line-height:1.2;",
      "transition:color .2s ease,background .2s ease,border-color .2s ease}",
      ".ayk-llm:hover:not(:disabled){color:var(--text,#f5f7fa);background:var(--panel-2,rgba(255,255,255,0.075));border-color:var(--accent,#2997ff)}",
      ".ayk-llm:disabled{opacity:.5;cursor:not-allowed}",
      ".ayk-llm.on{color:var(--violet,#a98bff);border-color:var(--violet,#a98bff)}",
      ".ayk-llm svg{width:14px;height:14px;flex:none}",
      ".ayk-note{font-size:.66rem;color:var(--dim,#8b92a1);line-height:1.3}",
      /* input row */
      ".ayk-form{display:flex;align-items:center;gap:.55rem;margin:.85rem 1.05rem 1.05rem;",
      "padding:.6rem .85rem;border:1px solid var(--hair,rgba(255,255,255,0.09));",
      "border-radius:var(--r-md,16px);background:var(--panel,rgba(255,255,255,0.045));",
      "transition:box-shadow .2s ease,border-color .2s ease}",
      ".ayk-form:focus-within{border-color:var(--accent,#2997ff);box-shadow:0 0 0 3px var(--accent-dim,rgba(41,151,255,0.14))}",
      ".ayk-input{flex:1;background:none;border:none;outline:none;color:var(--text,#f5f7fa);",
      "font-family:var(--font-body,-apple-system,'Inter',system-ui,sans-serif);font-size:var(--fs-sm,.92rem);min-width:0}",
      ".ayk-input::placeholder{color:var(--dimmer,#5d6473)}",
      ".ayk-send{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:var(--r-pill,980px);",
      "border:1px solid var(--hair,rgba(255,255,255,0.09));color:var(--text-soft,#c6ccd8);",
      "background:var(--panel,rgba(255,255,255,0.045));cursor:pointer;",
      "transition:color .2s ease,background .2s ease,border-color .2s ease}",
      ".ayk-send:hover{color:#fff;background:var(--accent,#2997ff);border-color:var(--accent,#2997ff)}",
      ".ayk-send svg{width:16px;height:16px}",
      "@keyframes ayk-blink{0%,49%{opacity:1}50%,100%{opacity:0}}",
      "@keyframes ayk-pulse{0%,100%{opacity:1}50%{opacity:.25}}",
      "@keyframes ayk-bob{0%,80%,100%{transform:translateY(0);opacity:.5}40%{transform:translateY(-4px);opacity:1}}",
      "@media (max-width:560px){.ayk-scroll{padding:.85rem .8rem}",
      ".ayk-chips,.ayk-ctl,.ayk-form{padding-left:.8rem;padding-right:.8rem}",
      ".ayk-form{margin-left:.8rem;margin-right:.8rem}.ayk-bubble{max-width:88%}}",
      "@media (prefers-reduced-motion:reduce){.ayk-cur,.ayk-mode::before,.ayk-dots3 i{animation:none}}"
    ].join("");
    var el = document.createElement("style");
    el.id = "ay-yatta-css";
    el.textContent = css;
    document.head.appendChild(el);
  }

  // Inline-SVG avatar: a little planet on an orbit with a "Y" star spark.
  function svgAvatar(size) {
    var s = size || 22;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s +
      '" fill="none" aria-hidden="true">' +
      '<ellipse cx="12" cy="12" rx="10" ry="4.4" stroke="#fff" stroke-opacity="0.55" ' +
      'stroke-width="1.1" transform="rotate(-22 12 12)"/>' +
      '<circle cx="12" cy="12" r="4.6" fill="#fff" fill-opacity="0.96"/>' +
      '<path d="M12 9.7l1.05 2.0 2.15.28-1.6 1.46.42 2.1L12 14.6l-1.95 1.0.42-2.1' +
      '-1.6-1.46 2.15-.28z" fill="#2997ff"/>' +
      '<circle cx="20.2" cy="6.4" r="1" fill="#fff" fill-opacity="0.9"/>' +
      "</svg>";
  }

  function svgSend() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line>' +
      '<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
  }

  function svgBolt() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z"/></svg>';
  }

  /* ------------------------------------------------------------------------
     7. Console component
     ---------------------------------------------------------------------- */

  function Console(mount) {
    this.mount = mount;
    this.busy = false;
    this.queue = [];
    this.build();
  }

  Console.prototype.build = function () {
    var self = this;
    this.mount.classList.add("ayk");
    this.mount.setAttribute("role", "region");
    this.mount.setAttribute("aria-label", "Yatta Jr. — Anjana's AI assistant");

    this.mount.innerHTML =
      '<div class="ayk-bar">' +
      '<span class="ayk-ava">' + svgAvatar(22) + "</span>" +
      '<span class="ayk-id"><b>Yatta Jr.</b>' +
      "<span>Anjana's AI · ask about his research, teaching &amp; tools</span></span>" +
      '<span class="ayk-mode" data-mode="instant" title="Active engine">instant</span>' +
      "</div>" +
      '<div class="ayk-scroll" aria-live="polite"></div>' +
      '<div class="ayk-chips"></div>' +
      '<div class="ayk-ctl">' +
      '<button class="ayk-llm" type="button">' + svgBolt() +
      "<span>Run a private AI in your browser</span></button>" +
      '<span class="ayk-note"></span>' +
      "</div>" +
      '<form class="ayk-form" autocomplete="off">' +
      '<input class="ayk-input" type="text" name="q" ' +
      'aria-label="Ask Yatta Jr. about Anjana" ' +
      'placeholder="Ask anything — e.g. what does Anjana research?" />' +
      '<button class="ayk-send" type="submit" aria-label="Send question">' +
      svgSend() + "</button>" +
      "</form>";

    this.scroll = this.mount.querySelector(".ayk-scroll");
    this.chipsEl = this.mount.querySelector(".ayk-chips");
    this.modeEl = this.mount.querySelector(".ayk-mode");
    this.form = this.mount.querySelector(".ayk-form");
    this.input = this.mount.querySelector(".ayk-input");
    this.llmBtn = this.mount.querySelector(".ayk-llm");
    this.llmLabel = this.llmBtn.querySelector("span");
    this.noteEl = this.mount.querySelector(".ayk-note");

    // chips
    CHIPS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ayk-chip";
      b.textContent = c;
      b.addEventListener("click", function () { self.ask(c); });
      self.chipsEl.appendChild(b);
    });

    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = self.input.value;
      self.input.value = "";
      self.ask(v);
    });

    // Private-AI enable button (WebGPU gated)
    this.initLlmButton();

    // greeting
    this.botMessage(
      "**Hi — I'm Yatta Jr.**, Anjana's AI assistant. Ask me about his " +
      "research, the volatility-memory finding, KernelStats, teaching, " +
      "consulting, or how to reach him. Tap a suggestion below to start.",
      [], "instant"
    );
  };

  Console.prototype.initLlmButton = function () {
    var self = this;
    if (!WebLLM.supported) {
      this.llmBtn.disabled = true;
      this.llmLabel.textContent = "Private AI unavailable";
      this.noteEl.textContent = "needs a desktop browser with WebGPU";
      return;
    }
    if (WebLLM.state === "ready") {
      this.markLlmReady();
      return;
    }
    this.llmBtn.addEventListener("click", function () {
      if (WebLLM.state === "ready" || WebLLM.state === "loading") return;
      self.llmBtn.disabled = true;
      self.llmLabel.textContent = "Loading private AI… 0%";
      self.noteEl.textContent = "downloading a small model (one time, cached)";
      WebLLM.load(function (pct) {
        self.llmLabel.textContent = "Loading private AI… " + pct + "%";
      }).then(function () {
        self.markLlmReady();
      }).catch(function () {
        self.llmBtn.disabled = false;
        self.llmLabel.textContent = "Retry private AI";
        self.noteEl.textContent = "couldn't load the in-browser model — using instant mode";
      });
    });
  };

  Console.prototype.markLlmReady = function () {
    this.llmBtn.classList.add("on");
    this.llmBtn.disabled = true;
    this.llmLabel.textContent = "Private AI ready";
    this.noteEl.textContent = "answers now run on-device via WebGPU";
  };

  Console.prototype.setMode = function (mode) {
    this.modeEl.textContent = mode;
    this.modeEl.setAttribute("data-mode", mode);
  };

  Console.prototype.scrollDown = function () {
    this.scroll.scrollTop = this.scroll.scrollHeight;
  };

  // Append a user bubble (escaped — no XSS).
  Console.prototype.userMessage = function (q) {
    var row = document.createElement("div");
    row.className = "ayk-msg me";
    row.innerHTML = '<div class="ayk-bubble">' + esc(q) + "</div>";
    this.scroll.appendChild(row);
    this.scrollDown();
  };

  // Create an empty Yatta (bot) row + bubble; returns the bubble element.
  Console.prototype.botRow = function () {
    var row = document.createElement("div");
    row.className = "ayk-msg bot";
    var ava = document.createElement("div");
    ava.className = "ayk-mava";
    ava.innerHTML = svgAvatar(16);
    var bubble = document.createElement("div");
    bubble.className = "ayk-bubble";
    row.appendChild(ava);
    row.appendChild(bubble);
    this.scroll.appendChild(row);
    this.scrollDown();
    return bubble;
  };

  // Show a "thinking" bubble; returns the bubble so it can be reused/filled.
  Console.prototype.thinkingBubble = function () {
    var bubble = this.botRow();
    bubble.innerHTML = '<span class="ayk-dots3"><i></i><i></i><i></i></span>';
    return bubble;
  };

  // Render a complete authored answer into an existing (or new) bubble, with
  // optional typewriter reveal and link pills. mode updates the chip.
  Console.prototype.botMessage = function (markdown, links, mode, bubble) {
    var self = this;
    if (mode) this.setMode(mode);
    bubble = bubble || this.botRow();

    function done() {
      bubble.innerHTML = renderMarkdown(markdown);
      if (links && links.length) bubble.appendChild(self.buildLinks(links));
      self.scrollDown();
    }

    if (REDUCED) { done(); return; }

    var i = 0, raw = markdown, speed = 9;
    var cursor = '<span class="ayk-cur" aria-hidden="true"></span>';
    (function tick() {
      bubble.innerHTML = esc(raw.slice(0, i)).replace(/\n/g, "<br>") + cursor;
      self.scrollDown();
      if (i < raw.length) {
        i += Math.max(1, Math.round(raw.length / 240));
        setTimeout(tick, speed);
      } else {
        done();
      }
    })();
  };

  Console.prototype.buildLinks = function (links) {
    var wrap = document.createElement("div");
    wrap.className = "ayk-links";
    links.forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.url;
      a.textContent = l.label;
      if (/^https?:\/\//.test(l.url)) { a.target = "_blank"; a.rel = "noopener"; }
      wrap.appendChild(a);
    });
    return wrap;
  };

  // Public entry: queue a query (used by chips, form, and ay:ask events).
  Console.prototype.ask = function (raw) {
    var q = (raw == null ? "" : String(raw)).trim();
    if (!q) { this.focus(); return; }
    this.queue.push(q);
    this.drain();
  };

  Console.prototype.drain = function () {
    if (this.busy || !this.queue.length) return;
    this.busy = true;
    var self = this;
    var q = this.queue.shift();
    this.userMessage(q);
    this.respond(q).then(function () {
      self.busy = false;
      self.drain();
    }).catch(function () {
      self.busy = false;
      self.drain();
    });
  };

  /* ------------------------------------------------------------------------
     8. HYBRID PIPELINE  — async respond(query)
        1) RAG retrieve  2) hosted → in-browser → curated, with fallback.
     ---------------------------------------------------------------------- */

  Console.prototype.respond = function (query) {
    var self = this;
    var rag = retrieve(query);
    var context = buildContext(rag.top);

    // CURATED render helper (always available, high quality).
    function curated() {
      if (rag.confident && rag.best) {
        self.botMessage(rag.best.answer, rag.best.links || [], "instant");
      } else {
        var fb = curatedFallback(rag.best);
        self.botMessage(fb.answer, fb.links, "instant");
      }
    }

    // (a) HOSTED — only if an endpoint is configured.
    var chain = Promise.reject(new Error("skip"));
    if (CONFIG.endpoint) {
      chain = chain.catch(function () {
        var thinking = self.thinkingBubble();
        self.setMode("smart");
        return hostedRespond(query, context).then(function (answer) {
          // hosted answers are model text -> escape, no markdown injection,
          // but we still allow our link pills from the matched chunk.
          self.botMessage(answer, rag.confident && rag.best ? rag.best.links || [] : [],
            "smart", thinking);
        }).catch(function (err) {
          thinking.parentNode && thinking.parentNode.removeChild(thinking);
          throw err;
        });
      });
    }

    // (b) IN-BROWSER — only if the user enabled & it's ready.
    chain = chain.catch(function () {
      if (WebLLM.state !== "ready") throw new Error("no in-browser engine");
      var bubble = self.thinkingBubble();
      self.setMode("private AI");
      var started = false;
      return WebLLM.generate(query, context, function (delta) {
        if (!started) { bubble.textContent = ""; started = true; }
        // stream raw text safely (escaped); markdown not parsed mid-stream
        bubble.innerHTML = esc(bubble.textContent + delta);
        self.scrollDown();
      }).then(function (full) {
        if (!full || !full.trim()) throw new Error("empty in-browser answer");
        // finalize: escape full text, append matched link pills if confident
        bubble.innerHTML = esc(full.trim());
        if (rag.confident && rag.best && rag.best.links && rag.best.links.length) {
          bubble.appendChild(self.buildLinks(rag.best.links));
        }
        self.scrollDown();
      }).catch(function (err) {
        bubble.parentNode && bubble.parentNode.removeChild(bubble);
        throw err;
      });
    });

    // (c) CURATED — always succeeds.
    return chain.catch(function () { curated(); });
  };

  Console.prototype.focus = function () {
    try { this.input.focus({ preventScroll: false }); } catch (e) { this.input.focus(); }
  };

  /* ------------------------------------------------------------------------
     9. INIT + EVENT WIRING
     ---------------------------------------------------------------------- */

  var instances = [];

  function init() {
    var mounts = document.querySelectorAll(SELECTOR);
    if (!mounts.length) return; // no-op if absent
    injectCSS();
    for (var i = 0; i < mounts.length; i++) {
      if (mounts[i].__aykDone) continue;
      mounts[i].__aykDone = true;
      instances.push(new Console(mounts[i]));
    }
  }

  // Run a query from a global 'ay:ask' event (command palette / ?ask= URLs).
  // Empty/whitespace q just focuses the input.
  window.addEventListener("ay:ask", function (e) {
    if (!instances.length) init();
    if (!instances.length) return;
    var q = e && e.detail ? e.detail.q : "";
    var target = instances[0];
    if (instances.length > 1) {
      for (var i = 0; i < instances.length; i++) {
        var r = instances[i].mount.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { target = instances[i]; break; }
      }
    }
    try { target.mount.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" }); } catch (er) {}
    if (q == null || !String(q).trim()) {
      target.focus();
    } else {
      target.ask(String(q));
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
