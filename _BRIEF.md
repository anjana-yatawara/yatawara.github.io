# yatawara.com — MASTER BUILD BRIEF (read this fully before building your file)

You are one of several agents rebuilding the personal website of **Dr. Anjana Yatawara**
into a dark, futuristic, "living computational interface." This file is the single
source of truth. Read it, read `_template.html`, `assets/css/core.css`, and
`assets/css/components.css`, then build ONLY the file assigned to you.

---

## 0. WHO ANJANA IS (for tone — keep all facts accurate)
- Assistant Professor of Mathematics & Statistics, **California State University, Bakersfield** (since Aug 2023).
- Ph.D. in Mathematics (Statistics emphasis), **Missouri University of Science & Technology**, 2017–2023 (advisor: Dr. V.A. Samaranayake). B.Sc. Special Degree in Statistics, **University of Peradeniya, Sri Lanka**, 2012–2016.
- Research: (1) financial **volatility / GARCH** time-series econometrics — "how markets remember," sub-exponential / stretched-exponential memory kernels (α≈0.27); (2) hybrid **time series + ML** (GRU-CNN flu forecasting); (3) **environmental justice / air quality**; (4) **AI in statistics education** (California Learning Lab ELEVATE grant, Co-PI).
- Builder: **KernelStats** (free open-source stats platform, kernelstats.com), Custom GPT tutors, and browser games.
- Heritage: Sri Lankan; her mother taught 35 years in rural Sri Lankan schools (informs her teaching philosophy).
- Email: **ayatawara@csub.edu**. GitHub: github.com/anjana-yatawara. Scholar user id n5WtVd0AAAAJ. ORCID 0009-0007-8506-7763. LinkedIn in/anjana-yatawara.
- **Never publish her phone number.** Don't invent papers, dates, numbers, or quotes beyond what's in this brief.

## CONCEPT
Her research is about **memory, signal, and decay** — nothing ever fully goes away, it just
contributes less. That idea is the visual/interaction language: terminal-tinged, data-driven,
alive, elegant. Carry the aesthetic of her existing games page (dark near-black, neon
cyan/violet/green accents, JetBrains Mono labels, glassmorphism) but more refined and
"academic-credible." Think: an instrument built by someone from 2035.

---

## 1. HARD RULES (all agents)
1. **Pure static** — no build step, no frameworks, no external JS libs/CDNs except Google Fonts (already loaded in template). Vanilla HTML/CSS/JS only.
2. **Do NOT edit** `core.css`, `components.css`, `shell.js`, or `_template.html`. They are read-only contracts.
3. **Asset paths are root-absolute**: `/assets/...`, `/research.html`, `/games/index.html`. (Site is served from domain root.)
4. **Page-specific CSS** goes in a single `<style>` block inside that page's `<head>`, AFTER the `components.css` link. Reuse existing tokens/vars (`var(--cyan)`, `var(--surface)`, etc.). Don't restate component styles.
5. **Feature JS modules** are fully self-contained: inject their own CSS via JS (`document.createElement('style')`). They must no-op gracefully if their mount element is absent.
6. **Accessibility**: semantic HTML, `alt` on images, `aria-label` on icon-only controls, sufficient contrast, keyboard-usable. Respect `prefers-reduced-motion` (gate animation; the media query in core.css already neutralizes transitions, but JS animation loops must check `matchMedia('(prefers-reduced-motion: reduce)').matches` and render a single static frame instead).
7. **Responsive**: must look great 360px → 1440px+. Use the grid helpers / `clamp()`.
8. **External links**: `target="_blank" rel="noopener"`.
9. **Keep content faithful.** You may rephrase section labels/taglines for futuristic flavor, but research claims, titles, venues, course descriptions, names, and dates must match this brief.
10. Output a **brief summary only** (≤6 lines) when done — the file on disk is the deliverable.

---

## 2. PAGE SKELETON
Copy `_template.html` verbatim, then change only:
- `<title>` + `<meta name="description">`
- `<link rel="canonical">` (e.g. `https://www.yatawara.com/research.html`)
- the three `og:`/`twitter:` url+title+description lines
- the `<main id="main">…</main>` content
- add any per-page feature `<script>` tags before `</body>` (see contracts)
The `<header>` and `<footer>` are already complete and identical everywhere — leave them.
`shell.js` auto-adds: command palette, mobile menu, theme toggle behavior, scroll progress,
scroll-reveal (`[data-reveal]`), HUD, view transitions. Add `data-reveal` (optionally
`data-delay="1..5"`) to elements you want to animate in on scroll.

### Interior page header pattern
```html
<section class="page-head">
  <div class="wrap">
    <p class="kicker"><span class="dot">◆</span> yatawara.com / research</p>
    <h1>Research</h1>
    <p class="lead">One-sentence futuristic-but-accurate summary of the page.</p>
  </div>
</section>
```
Use terminal-flavored section heads inside content where it fits:
```html
<div class="section-head">
  <span class="s-num">01</span>
  <h2 class="s-title"><span class="arrow">▸</span>Volatility &amp; Memory</h2>
  <span class="s-rule"></span>
  <span class="s-tag">// time-series</span>
</div>
```

## 3. DESIGN CLASS CHEAT-SHEET (defined in core.css/components.css — use these)
- Layout: `.wrap` (1180), `.wrap-prose` (760), `.wrap-wide` (1320); `.section`, `.section-sm`; `.grid .cols-2|.cols-3|.cols-auto`; `.divider`.
- Type: `.kicker` (mono eyebrow, has `.dot`), `.lead`, `.gradient-text`, `.mono`, `.term-ln` (with `.prompt`,`.flag`).
- Buttons: `.btn`, `.btn-primary`, `.btn-cyan`, `.btn-ghost`, `.btn-sm/.btn-lg`; `.link-arrow` (wrap arrow glyph in `<span class="arr">→</span>`).
- Cards: `.card` (glass; add `.spot` for cursor spotlight, `.glow-violet`/`.glow-cyan` for hover glow); `.card-icon`, `.card-arrow`; `.stat`(`.stat-num`,`.stat-label`).
- Tags/badges: `.tag`(`.cyan/.violet/.green/.amber/.pink`), `.tags`; `.badge .badge-published|.badge-inprogress|.badge-submitted|.badge-accepted`; `.live-pill`; `.chips`/`.chip`.
- Content: `.prose` (article body), `.pub-list`/`.pub`(`.pub-title`,`.pub-authors`(`.me`),`.pub-venue`,`.pub-links`), `.course`(`.course-code`,`.course-meta`), `.service`, `.timeline`/`.tl-item`(`.tl-when`,`.tl-what`,`.tl-where`,`.tl-note`), `.callout`(`.tip/.note`, `.co-ico`), `.cta-band`, `.section-head`.
- Tables: wrap in `.table-wrap`, use `<table class="data">`; `.center`, `.check`, `.cross`.
- Section heads: `.section-head`(`.s-num`,`.s-title`+`.arrow`,`.s-rule`,`.s-tag`).
- Icons: inline SVG, `fill`/`stroke="currentColor"`. (Sizes ~16–22px.)

## 4. FEATURE MOUNT CONTRACTS (page builders: drop the mount markup + script tag; feature agents: build the module to fill the mount)
- **Living hero** (home only): `<canvas id="hero-canvas" aria-hidden="true"></canvas>` + `<script src="/assets/js/hero.js" defer></script>`. The canvas should be absolutely positioned to fill its container; hero.js sizes to the canvas's parent.
- **Ask console** (home, optionally consulting): `<div data-component="ask-console"></div>` + `<script src="/assets/js/ask.js" defer></script>`. ask.js builds the whole UI inside. It listens for `window 'ay:ask'` events `{detail:{q}}` (fired by the command palette) and auto-runs `?ask=` from the URL (shell.js dispatches that).
- **Memory-kernel playground** (blog post + research): `<div data-component="kernel-playground"></div>` + `<script src="/assets/js/kernel-playground.js" defer></script>`.
- **Volatility ticker/HUD** (home, optionally research): `<div data-component="vol-ticker"></div>` + `<script src="/assets/js/ticker.js" defer></script>`.
All four self-init on DOMContentLoaded by querying their selector; multiple or zero mounts must be safe.

---

## 5. FEATURE MODULE SPECS

### A) `assets/js/hero.js` — Living memory-kernel field
A real-time canvas animation that literally renders Anjana's central finding: a **stretched-exponential
volatility memory kernel** (`w(τ) = exp(-(τ/T)^α)`, α≈0.27). Ideas (use judgment, make it beautiful & performant):
- A field of "shocks": each shock spawns (randomly, and on pointer move/click) and its influence **decays sub-exponentially** over time — fast at first, then a long faint tail (this is the whole point: nothing fully disappears).
- Render as glowing particles / ripples / a flowing kernel curve, in the palette (cyan #00e5ff, violet #bf5af2, green #22ff88) over transparent (let page bg show through). Use `globalCompositeOperation='lighter'` for glow.
- Pointer-reactive: moving/clicking injects a shock at the cursor.
- DPR-aware (`devicePixelRatio`), sizes to parent, handles resize, uses `requestAnimationFrame`, throttles offscreen (pause when `document.hidden`).
- **Reduced motion**: draw ONE elegant static frame (a faint kernel curve + scattered points), no loop.
- Self-inject any CSS needed. Keep < ~60fps cost reasonable on a laptop. No libraries.
Return: confirm file + the math/visual approach in 2–3 lines.

### B) `assets/js/kernel-playground.js` — Interactive decay simulator
Builds inside `[data-component="kernel-playground"]`. The user drags **α** (shape, 0.1–1.0) and **T** (timescale).
- Live-plot the stretched exponential `exp(-(τ/T)^α)` on a canvas/SVG, alongside the pure exponential (α=1) for contrast.
- Readouts that update live: "half-life" (τ where w=0.5), and "time to last 1%" (τ where w=0.01) — show how, as α drops, the half-life stays small but the 1% tail explodes (the blog's "first half of a memory disappears in ~5 days; the last 1% can linger a year"). Map T so that at α≈0.27 the numbers feel market-like (e.g., label axis in "days").
- Controls: range sliders (styled with site tokens), plus quick-set buttons "Exponential (α=1)" and "Markets (α=0.27)".
- Beautiful, labeled axes, gridlines, animated transitions between states. Palette-consistent. Responsive. Reduced-motion: no transition tweening, just redraw.
- Self-inject CSS. No libraries.
Return: confirm file + UX summary in 2–3 lines.

### C) `assets/js/ask.js` — "Ask my work" research concierge (client-side, free, always-on)
Builds a terminal-style Q&A console inside `[data-component="ask-console"]`. NO network calls — it answers
from an embedded knowledge base over Anjana's bio/research/teaching/KernelStats/contact.
- UI: a faux terminal with a prompt line input, a transcript area, and ~6 suggested question chips
  ("What does Anjana research?", "Explain volatility memory simply", "What is KernelStats?",
  "What does she teach?", "How do I work with her?", "Where did she study?").
- Engine: a curated array of intents — each `{patterns:[keywords/regex], answer:"...", links?:[...]}`. Score the
  user query by keyword overlap / includes / simple fuzzy; return the best answer. Add a smart fallback that
  points to the most relevant page and suggests the chips. Type answers out char-by-char (terminal feel;
  instant if reduced-motion). Render markdown-ish (bold, links) safely (escape user text).
- Build a genuinely useful KB (~14–20 intents) from THIS brief's content (research areas, the memory-kernel
  finding in plain English, KernelStats pitch + comparison, courses, consulting, education/AI work, bio/PhD,
  contact, "is she taking students/consulting"). Be accurate; if unknown, say so and suggest contacting her.
- Listen for `window` `ay:ask` events (`e.detail.q`) and run that query; on init, also accept a query passed by
  shell (shell.js dispatches ay:ask for `?ask=`). If the q is empty, just focus the input.
- At the END of ask.js, in a clearly commented block, document how to upgrade to a REAL LLM later
  (e.g. a Cloudflare Worker / serverless endpoint that calls the Claude API with model `claude-opus-4-8`,
  RAG over this KB) — `POST /api/ask {q}` → `{answer}` — as commented guidance only, no live calls.
- Self-inject CSS. No libraries.
Return: confirm file + KB size + upgrade-path note in 2–3 lines.

### D) `assets/js/ticker.js` — Live volatility HUD strip
Builds inside `[data-component="vol-ticker"]` a sleek horizontal "market memory" status strip.
- Show several cells: a few "assets" (e.g. SPX, BTC, VIX, EUR) with a value, a delta (▲/▼ colored green/red),
  and a tiny inline sparkline canvas; plus a "memory α" cell pulsing ≈0.27 and a "regime" label.
- **Default = elegant simulated data**: seed plausible numbers and evolve them with a small random walk +
  GARCH-ish volatility clustering on an interval (≈1.5s). Smoothly animate value changes. This makes
  "her research, live" tangible without any API.
- In a commented block, document the optional free real-data upgrade (e.g., a no-key endpoint) — guidance only.
- Marquee/auto-scroll on narrow screens; static wrap on wide. Reduced-motion: no marquee, slower/again no anim.
- Self-inject CSS. No libraries.
Return: confirm file + 2–3 line summary.

---

## 6. PAGE SPECS

> All interior pages: kicker crumb `yatawara.com / <slug>`, an `<h1>`, a `.lead`, then content sections.
> Wrap text-heavy bodies in `.wrap-prose`; card grids in `.wrap`. Sprinkle `data-reveal`.

### index.html  (HOME — built by lead; documented here for consistency)
Hero with `#hero-canvas`, name, role, one-line bio, social row, CTAs (Explore research / Ask my work),
`[data-component="vol-ticker"]`, the four research pillars as `.card.spot` links, recent work list,
`[data-component="ask-console"]`, KernelStats highlight, games teaser. Bio text:
> "I'm a statistician and applied mathematician studying how financial markets encode and forget information.
> My research develops new econometric models for volatility persistence, applies machine learning to public
> health forecasting, and investigates income-based environmental exposure disparities. I also build AI-powered
> tools that help students learn statistics — work supported by the California Learning Lab. At CSUB I teach
> from elementary statistics to mathematical statistics and applied data science, and mentor undergraduate
> researchers across multiple funded programs."

### research.html
Lead: research program around four pillars sharing a core — modeling complex temporal/spatial patterns to produce actionable insight.
Mount the **kernel-playground** somewhere in the volatility section (`<div data-component="kernel-playground"></div>` + its script) as the centerpiece. Sections:
**01 Financial Volatility & Time-Series Econometrics** (primary):
- *The Shape of Volatility Memory* — volatility memory kernels across 100+ assets (equities, FX, commodities, fixed income, crypto, VIX) follow sub-exponential (stretched-exponential) decay, better than GARCH/FIGARCH. Introduces GMARCH & SEARCH frameworks. `badge-inprogress` "In production — target: Journal of Business & Economic Statistics".
- *MF2V-GARCH* — augments Conrad & Engle's (2025) Multiplicative Factor Multi-Frequency GARCH with smoothed trading volume; 15 US assets, rolling OOS; includes a MATLAB toolbox. `badge-inprogress` target: Journal of Forecasting.
- *MF2-GARCH-A* — sign-sensitive long-run component (asymmetric response to +/− shocks). `badge-inprogress` target: International Journal of Forecasting.
- *MF2-EGARCH* — exponential-GARCH version of the multiplicative-factor multi-frequency framework; asymmetric MEM and logarithmic MEM long-term variants. `badge-inprogress` target: International Journal of Forecasting.
- Additional models: Multiple Regime Hyperbolic GARCH (MR-HYGARCH), Fractionally Integrated GJR-GARCH (FI-GJRGARCH), Smooth-Transition FI-GJRGARCH.
- Software: **MF2V-GARCH Toolbox for MATLAB** → https://github.com/anjana-yatawara/MF2V-GARCH-Toolbox-for-MATLAB
**02 Hybrid Time Series & Machine Learning**: explainable ML forecasting grounded in statistics. *GRU-CNN Hybrid for Influenza Forecasting* with Yeo-Johnson scaling; presented JSM 2025; with student Noah Gallego and Prof. Isuru Ratnayake (KUMC). `badge-inprogress` Manuscript in preparation.
**03 Environmental Justice & Air Quality**:
- *Income-Based Exposure Disparities in California* — county-level multi-pollutant framework (PM2.5, NO₂, O₃, SO₂, CO); with students Kayla Ko & Christian Rodriguez; CES Mini-Grant. `badge-published` Environmental Research: Health, 2025 → https://iopscience.iop.org/article/10.1088/2752-5309/ae4134/meta
- *Fine-Scale Air-Quality Heterogeneity in Twin Cities* — 45 low-cost multi-pollutant sensors, Minneapolis–St. Paul. `badge-published` ACS ES&T Air, 2025 → https://pubs.acs.org/doi/abs/10.1021/acsestair.5c00439
- *Air Pollution & Fertility Patterns* — ongoing, California counties; CV Pathway 2025 apprenticeship.
**04 AI in Statistics Education** (California Learning Lab ELEVATE):
- *Scaffolded LLM Tutors* — lead author, "From Answer Generators to Thinking Partners," Custom GPT tutoring/prompt/ethics framework. `badge-submitted` JSDSE.
- *Structured AI Tutoring in Engineering Education* — co-author WIP. `badge-published` IEEE FIE 2025 → https://ieeexplore.ieee.org/abstract/document/11328293
- *Computer-Aided Instruction for K–12 Teachers* — cognitive-apprenticeship LLM integration. `badge-published` IEEE FIE 2025.
Then **Collaborators** (V.A. Samaranayake — Missouri S&T, PhD advisor; Isuru Ratnayake — KUMC; Alberto Cruz — CSUB ECE, ELEVATE PI; Jianjun Wang — CSUB Math; Maruti Mishra — CSUB; Eduardo Montoya — CSUB Math; Bilin Zeng — CSUB Math) as chips, and **Grants** table (2025 — Air Pollution Disparities in California 2000–2025 — PI — CES Mini-Grant, CSUB; 2024–25 — ELEVATE: Enhancing Learning Experiences Via AI Techniques — Co-PI — California Learning Lab AI FAST Challenge).

### publications.html
Lead: peer-reviewed work + working papers across volatility, environmental statistics, and AI in education.
Use `.pub-list`/`.pub`. Group with `.section-head`: **Published**, **Under Review**, **Conference Proceedings**, **Dissertation**, **Working Papers**, **Selected Presentations** (table). Entries (author lists; mark `<span class="me">A. Yatawara</span>`):
PUBLISHED: (1) "Evaluating Fine-Scale Air-Quality Heterogeneity Using a Low-Cost Multipollutant Sensor Network in Twin Cities, Minnesota" — A. Yatawara et al. — ACS ES&T Air, 2025 — link https://pubs.acs.org/doi/abs/10.1021/acsestair.5c00439 . (2) "Income-Based Exposure Disparities Across California Counties, 2000–2023: A Generalizable Statistical Framework" — A. Yatawara, K. Ko, C. Rodriguez — Environmental Research: Health, 2025 — link https://iopscience.iop.org/article/10.1088/2752-5309/ae4134/meta . (3) "WIP: Structured AI Tutoring in Engineering Education" — A. Cruz, A. Yatawara, et al. — IEEE FIE 2025 — link https://ieeexplore.ieee.org/abstract/document/11328293 . (4) "Computer-Aided Instruction for K–12 Teachers: A Cognitive Apprenticeship Approach to LLM Integration" — A. Cruz, A. Yatawara, et al. — IEEE FIE 2025.
UNDER REVIEW: "From Answer Generators to Thinking Partners: Scaffolded LLM Tutors in Statistics Education" — A. Yatawara, J. Wang, A. Cruz, M. Mishra — Submitted to JSDSE, 2025.
CONFERENCE PROCEEDINGS: "A Multiplicative Factor Multi-Frequency Exponential GARCH Model" — A. Yatawara, V.A. Samaranayake — JSM Proceedings, Business & Economic Statistics Section, 2022. "An Asymmetric Hyperbolic Generalized Autoregressive Conditional Heteroscedastic Model" — A. Yatawara, V.A. Samaranayake — JSM Proceedings, 2021.
DISSERTATION: "The Multiplicative Factor Multi-Frequency Exponential GARCH ((MF)²EGARCH)" — A. Yatawara — Ph.D. Dissertation, Missouri S&T, 2023 — ProQuest link https://www.proquest.com/openview/964c28fd3197a880e84e510d38de2daa/1?pq-origsite=gscholar&cbl=18750&diss=y
WORKING PAPERS (each `badge-inprogress`): "The Shape of Volatility Memory: Sub-Exponential ARCH(∞) Kernels Across 100+ Financial Assets" — A. Yatawara — target JBES. "MF2V-GARCH: Augmenting Multi-Factor Volatility with Smoothed Trading Volume" — A. Yatawara — target Journal of Forecasting. "MF2-GARCH-A: Volatility Modelling with a Sign-Sensitive Long-Run Component" — A. Yatawara, V.A. Samaranayake — target IJF. "The Multiplicative Factor Multi-Frequency Exponential GARCH (MF2-EGARCH)" — A. Yatawara, V.A. Samaranayake — target IJF. "Multiple Regime Hyperbolic GARCH (MR-HYGARCH)" — A. Yatawara, V.A. Samaranayake — target TBD. "Improving Influenza Forecasting: A GRU-CNN Hybrid Model with Yeo-Johnson Scaling" — A. Yatawara, N. Gallego, I. Ratnayake — target TBD.
PRESENTATIONS (table Year/Title/Venue): 2025 — Hybrid LSTM Deep Learning Model for Forecasting Influenza-Like Illnesses — JSM, Nashville TN (Contributed Paper); 2025 — Findings from ELEVATE — AI in Education Day, UC Berkeley (Invited Panel); 2025 — Build Your AI Teaching Assistant — NextTech Kern (Session Lead); 2022 — A Multiplicative Factor Multi-Frequency Exponential GARCH Model — JSM, Washington DC (Contributed Paper); 2021 — The Asymmetric Hyperbolic GARCH Model — JSM Virtual (Speed Presentation).
Add a "Google Scholar ↗" button to her profile.

### teaching.html
Lead: statistics & applied math with computational thinking, real-world data, student-centered active learning; AI integrated thoughtfully (after fundamentals).
**Courses** (grid of `.course`): MATH 2200 Elementary Statistics (Undergrad · OER · AI-assisted tools); MATH 3200 Probability Theory (Upper-division · Wackerly, Mendenhall & Scheaffer · Fall 2025); MATH 3209 Statistical Measures of Inequality in Society (Undergrad · GE · Spring 2025); MATH 3210 Applied Statistical Computing & Multivariate Methods (Graduate · R & SAS · Fall 2024); MATH 4200 Mathematical Statistics (Upper-division · Proof-based · Spring 2025); MATH 4210 Regression Modeling & Analysis (Upper-division · Applied · 4 units); MATH 4230 Applied Statistical Methods for Data Science (Upper-division · Statistical Data Science concentration · ISLR, R & Python). (Use the course descriptions from the source — keep them; condense lightly if needed.)
**Teaching Philosophy** (`.prose`): rooted in belief that education transforms lives — shaped by her mother, 35 years teaching in rural Sri Lanka. Four interactions: student–teacher (learn names, approachable, every question equal), student–subject (motivate why statistics matters with real examples — markets, crypto, environment), peer-to-peer (group projects, collaborative analyses), student–real-world (presentations, reports, careers). Uses AI deliberately/ethically — Custom GPT tutors only after fundamentals. Quote (blockquote): *"Anyone can google the steps to a hypothesis test, but you need to understand the basics to interpret the result and make inferences."* Closing: the job market changed; her duty is to prepare students with computational skills, AI literacy, data-science workflows, and critical thinking to work alongside AI.
**AI Tools for Students** (chips/cards): R Tutor for MATH 2200; MATH 4200 AI Assistant; LaTeX Converter; MATLAB/R/Python Learning Assistants; MathBuddy Jr.; Study Coach GPT.
**Teaching Innovations** (list): OER Development (CSUB Affordable Learning Solutions 2024–25); ELEVATE (Co-PI, California Learning Lab); CSUB JupyterLab Cloud (R/Python/VS Code via CAL-ICOR); AI Instructional Module (BA 1028, with Kim Mishkind); Statistical Data Science Concentration (with Drs. Montoya & Zeng, designed MATH 4230).
**Student Mentorship** (table Program/Year/Students/Project): SURE (Chevron) — Summer 2025 — J. Rosas, J. Rodriguez, C. Rodriguez, R. Gamez — Local LLM applications for education; CV Pathway — Summer 2025 — E. DeJesus, N. Gallego — Air pollution & fertility patterns; Student Research Scholars — 2024–25 — 1 student — "How Present is ChatGPT at CSUB?"; CV Pathway — Summer 2024 — T. Regpala, J. Rodriguez Aguilar — Air pollution research.
**For Students** (callout): office hours via course Canvas or email; recommendation letters need ≥3 weeks notice + CV + program description + emphasis note. Email ayatawara@csub.edu.

### consulting.html
Lead: statistical consulting & data-science advisory through CSU Bakersfield — AI-automated analytics dashboards, rigorous analysis, data strategy. All engagements via CSUB's institutional framework.
**Services** (grid of `.service`): (flagship, make it stand out) **AI-Automated Data Analytics Dashboards** — custom AI-powered dashboards to your KPIs/data; automated reporting with AI-generated interpretations; real-time pipelines & interactive viz; production R/Python deployed to your infra/cloud; powered by the engine behind KernelStats. Then: Time Series & Forecasting (GARCH-family + hybrid ML); Machine Learning & Prediction (RF, gradient boosting, NNs, deep learning — interpretable); Study Design & Analysis; Environmental & Health Analytics (EPA AQS data, sensor networks, multi-pollutant); AI Strategy & Implementation (Custom GPTs, LLM integration; presented with OpenAI at NextTech Kern); Training & Workshops (R, Python, SAS, stats, ML, AI).
**How I Work** (4 steps — use a process layout): 1 Discovery, 2 Proposal (scope/timeline/methodology/quote via CSUB), 3 Engagement (regular check-ins), 4 Delivery (report + reproducible code + viz + recommendations).
**Credentials** (list): Ph.D. Mathematics (Statistics emphasis), Missouri S&T; Assistant Professor, CSUB; creator of KernelStats; active researcher (financial econometrics, environmental stats, AI in education); tools R/Python/MATLAB/SAS/SQL/LaTeX/Git/TensorFlow/cloud; member ASA & AMS.
End with a `.cta-band`: "Let's discuss your project" + button mailto:ayatawara@csub.edu. (Optional: include `[data-component="ask-console"]` is NOT required here; skip unless trivial.)

### kernelstats.html
Hero with the logo image `/assets/img/kernelstats.svg` (alt "KernelStats"). Lead/pitch: a free, open-source statistical analysis platform built to replace expensive tools (Minitab ~$1,700/yr, JMP ~$1,785/yr, SAS ~$8,700/yr); runs entirely in the browser — no install, no license. Built because powerful analysis should be accessible to students, budget researchers, and small orgs.
Prominent CTA buttons: **Open kernelstats.com ↗** (https://kernelstats.com) and **GitHub ↗** (https://github.com/anjana-yatawara/kernel).
**Features** (cards grouped Data Quality / Analysis / Output): Variable Doctor (15 automated diagnostics — coded missing, numeric-as-text, dates, outliers, ID cols; one-click fixes + undo); imports CSV/Excel/SPSS/Stata/SAS/RDS/paste/URL. Analysis: 20+ hypothesis tests + Test Finder wizard; 10 regression families (linear, logistic, probit, multinomial, ordinal, Poisson, negative binomial, zero-inflated, hurdle, bias-reduced); Time series & GARCH (ARIMA auto, GARCH(1,1), GJR-GARCH, EGARCH, news-impact curves, forecasting); Survival (Kaplan-Meier, Cox PH, hazard forest, Schoenfeld); ML pipeline (7 algorithms, auto classify/regress, model comparison, ROC, variable importance). Output: plain-English interpretations; Word/HTML reports; industry templates (SPC Cp/Cpk, RFM, Pareto, heatmaps, volcano plots).
**Comparison table** (`table.data`, use `.check`/`.cross`): rows Annual cost (Free / $1,700 / $1,785 / $8,700), Open source, Runs in browser, Variable Doctor, Test Finder wizard, GARCH models, ML pipeline, Plain-English output; columns KernelStats/Minitab/JMP/SAS (per the source — KernelStats ✓ across; SAS also ✓ for GARCH+ML; Minitab/JMP ✓ for ML).
**Technology**: R + Shiny, ggplot2, 132 statistical methods mapped to peer-reviewed R packages, MIT-licensed on GitHub. **Coming soon**: KernelStats Pro — AI-powered with Claude integration, automated interpretation, enterprise deployment.

### cv.html
Lead + a **Download PDF** button → `/assets/Yatawara_CV.pdf` (also a "request full CV" mailto). Use `.timeline` for Education & Positions; `.section-head` blocks; `table.data` for grants. Content:
**Education**: Ph.D. Mathematics — Statistics Emphasis, Missouri S&T, 2017–2023 (Advisor V.A. Samaranayake; focus: time series with conditional heteroscedastic structure). B.Sc. Special Degree in Statistics, University of Peradeniya, Sri Lanka, 2012–2016.
**Academic Positions**: Assistant Professor of Mathematics, CSU Bakersfield, Aug 2023–present. Graduate Teaching Assistant, Missouri S&T, Aug 2017–Jul 2023. Teaching Assistant, University of Peradeniya, 2016–2017.
**Grants & Funding** (table): 2025 — Air Pollution Disparities in California, 2000–2025 — PI — CES Mini-Grant, CSUB. 2024 — ELEVATE: Enhancing Learning Experiences Via AI Techniques — Co-PI — California Learning Lab AI FAST Challenge.
**Technical Skills** (chips groups): Languages/Software: R, Python, MATLAB, SAS, SQL, LaTeX, Git/GitHub, HTML/CSS. Statistical Methods: GARCH-family, time series, Bayesian inference, MLE, Monte Carlo, multivariate, causal inference. Machine Learning: random forests, gradient boosting (XGBoost), neural nets (LSTM, GRU-CNN), SVMs, k-means, PCA. AI & LLMs: Custom GPT development, prompt engineering, local LLM deployment, OpenAI API. Cloud & Computing: JupyterLab, Google Cloud, AWS, CSUB AI Lab (GPU workstations).
**Professional Memberships**: ASA, AMS.
**Service (selected)** (list): Proposed Center for Applied AI & Data Science Innovation (CAADSI) at CSUB; Proposed CSUB AI Essentials Certificate; Planned & developed AI Lab (Science III, Room 214); Contributed to CSUB campus-wide ChatGPT deployment (ChatGPT Project Team); Member, Scientific Committee, CSU Mathematical Sciences Conference (2023).
Footer note: "Full CV available as PDF — ayatawara@csub.edu."

### blog.html  (+ blog/nothing-ever-fully-goes-away.html)
**blog.html**: lead "Occasional writing on research, teaching, and the tools I use — accessible explanations of econometric methods, R/Python tutorials, reflections on teaching with AI, and notes from conferences." List ONE published post as a `.card.spot` link (the welcome post is a draft — omit it):
- Card → `/blog/nothing-ever-fully-goes-away.html`; title "Nothing Ever Fully Goes Away"; subtitle "What financial markets taught me about how memory actually works"; date 2026-04-05; categories tags [research, life]; ~3 min read.
Add a subtle "more soon" note.
**blog/nothing-ever-fully-goes-away.html**: a beautiful long-form article page. Use a centered `.wrap-prose`, a post header (kicker `yatawara.com / blog`, title, subtitle, date + reading time + category tags), then the essay in `.prose`. Mount the **kernel-playground** (`<div data-component="kernel-playground"></div>` + script) inline at the natural point (after the paragraph introducing α / stretched exponential) so readers can play with the very curve being described. The essay text (use verbatim, it's hers):
> We assume forgetting is exponential. Something happens, it fades, it's gone. Like a half-life — cut in half, cut in half again, and pretty soon it rounds to zero. That's what every standard model in finance assumes about volatility: a shock hits the market, and its impact decays exponentially. Clean. Fast. Predictable.
>
> But when I actually estimated how markets remember — without assuming any shape at all, just letting the data speak — the answer was different. The memory kernel isn't exponential. It's *sub-exponential*. Markets forget fast at first, then slow down. The initial shock fades quickly, but a residual hangs around far longer than any exponential model predicts.
>
> The first half of a memory disappears in about five days. The last one percent can linger for a year.
>
> I think life works the same way.
>
> You move on from most things quickly. A bad meeting, an awkward conversation, a missed flight — half the emotional weight is gone by the weekend. But that one failure from years ago? That relationship that ended badly? That moment you didn't speak up? Those aren't gone. They're at lag 1,000, contributing a fraction of a percent of their original weight to every decision you make today.
>
> Not enough to notice. Enough to matter.
>
> The stretched exponential — the function that fits this pattern — has a shape parameter called α. When α = 1, memory is exponential: things fade on schedule. When α < 1, the past sticks around longer than it should. In financial markets, I found α ≈ 0.27 across hundreds of assets. Nowhere close to 1.
>
> [MOUNT kernel-playground HERE]
>
> The beautiful part is *why*. A stretched exponential isn't just a curve — it's a mixture. It's what you get when many different exponential decay rates operate simultaneously. Some memories fade in days. Some in months. Some almost never. The aggregate of all those timescales, running in parallel, produces the concave, slow-fading shape we observe.
>
> Markets are like this because they aggregate millions of participants with different horizons — a day trader and a pension fund experience the same crash but process it on completely different timescales. And I suspect we're like this too. Different parts of us — our rational mind, our emotions, our body, our identity — process the same event at different speeds. The result isn't a clean exponential decay. It's richer, slower, and more human than that.
>
> Nothing ever fully goes away. It just contributes less.
>
> ---
> *This is the central finding of my paper "The Shape of Volatility Memory," currently in preparation for the Journal of Business & Economic Statistics. The math is rigorous. The metaphor is mine.*

Use MathJax-free rendering: write α as the character "α" and exp formulas as plain text/`<code>` (no math lib). Add a "← all writing" link back to /blog.html and a footer link to /research.html.

### games/index.html  (adapt the EXISTING games hub to the new shell)
There is an existing beautiful games hub (dark, matrix rain, glass cards, 3 game iframes). REBUILD it as a normal page using the site template (so it gets the same header/footer/command-palette/HUD), but PRESERVE its look & content: hero ("Games by Anjana Yatawara", "Built for fun. Play in browser." + the disclaimer "I bear no responsibility for lost hours, lost sleep, or any exam grades…"), the matrix-rain canvas background, and the three game cards with live iframe previews:
1. **Acts of the Continuous** (educational, featured) — `acts_of_the_continuous.html` — "A six-act study game for MATH 3200 Exam 2. Continuous distributions, MGFs, bivariate analysis. Adaptive 138-question pool, global leaderboard, and a Grandmaster of the Continuum title at 90%+." tags: Study, Probability, Leaderboard, No Calculator. meta "138 questions · 6 acts · adaptive". term-ln `$ math_3200 --exam 2 --mode study`.
2. **Revenge of the Basco** (arcade) — `revenge-of-the-basco.html` — "Tabasco chooses violence. Tap to fly through hellfire columns. Survive the chaos. Beat the bosses. Don't blink." tags: Fire, One-Tap, Boss Fights. term-ln `$ ./chaos.exe --enable-hellfire`.
3. **Sigma Strike** (arcade) — `sigma-strike.html` — "Defend the distribution from rogue outliers. Chain kills for combos, collect power-ups, battle bosses every 10 waves." tags: Space, Shooter, Stats. term-ln `$ ./defend.exe --target distribution`.
Game files are siblings in /games/ (link relative: `acts_of_the_continuous.html`, etc.; iframes `src="acts_of_the_continuous.html"` with `loading="lazy"` `title=...`). Each card: live iframe preview, a `.live-pill` "LIVE", "▶ Play Fullscreen" link (`target="_blank"`). Keep the page-specific games styling in a `<style>` block (you can reuse the matrix-rain `<script>` from the old page — it's fine to inline). Match the new palette/tokens. Keep it self-contained.

---

## 7. TONE & COPY
Futuristic, confident, a little playful, but a credible professor's site. Mono labels in lowercase
with terminal flavor (`$ research --area volatility`, `// time-series`, `0x01`). Real headings in
Space Grotesk. Don't overdo neon on text-heavy pages — let whitespace and one or two glows per
viewport do the work. Every page should feel part of ONE instrument.
