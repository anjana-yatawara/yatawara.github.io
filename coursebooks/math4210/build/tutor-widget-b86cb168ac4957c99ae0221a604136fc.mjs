// MATH 4210 study-tutor footer card.
//
// WHAT THIS IS NOW (rewritten 2026-07-20; see _planning/reports/tutor-widget-fix.md)
// ---------------------------------------------------------------------------
// The MATH 2200 template shipped this file as a live anywidget CHAT panel: it
// read an `endpoint` from the widget model, POSTed to `{endpoint}/chat`, and
// registered teardown via `signal.addEventListener("abort", ...)`.
//
// Neither half of that can work on this site. The published book is STATIC HTML
// on GitHub Pages: there is no Jupyter kernel, so MyST's static AnyRenderer
// invokes `render({ model, el })` with NO AbortSignal -- `signal` is undefined
// and `signal.addEventListener` threw a TypeError on EVERY page load. There is
// also no tutor server, so the chat POST could never have succeeded (the
// inherited endpoint was `http://127.0.0.1:8000`, which is additionally
// mixed-content blocked from an HTTPS origin).
//
// So this module no longer uses the anywidget RUNTIME CONTRACT at all. It reads
// no model, requires no signal, opens no socket, and makes ZERO network
// requests. The `{anywidget}` directive in ../parts/tutor-footer.md is kept
// only as a plain static ESM loader, because MyST's book-theme exposes no other
// hook that runs JavaScript on every page (its template.yml offers `style`,
// `favicon` and `logo` file options and markdown-only `parts`; a raw <script>
// in a part is inserted as markup by the React theme and never executes).
//
// What it does instead: renders a small footer card that copies a ready-made
// tutoring prompt -- naming the page the student is actually on -- to the
// clipboard, so the student can paste it into whichever AI assistant they
// already use. Nothing is opened for them and nothing is transmitted.
//
// DEFENSIVE CONTRACT (the acceptance criterion is zero console errors)
// ---------------------------------------------------------------------------
//   * `render` is a total function: its whole body is wrapped in try/catch and
//     it always returns a callable teardown, so no input can make it throw.
//   * Every property of the anywidget props is optional. `model`, `signal` and
//     even `el` may be absent, of the wrong type, or throw on access.
//   * The card NEVER looks its own nodes up with querySelector. Every element
//     is held by direct reference from createElement, so there is no
//     "element is undefined" dereference path -- the exact class of bug that
//     produced the original error.
//   * The prompt is rebuilt AT CLICK TIME from document.title / location, so a
//     client-side navigation that reuses this mount cannot serve a stale title.
//   * No external requests: no fetch, no XHR, no CDN, no fonts, no images.

const SITE_SUFFIX_SEPARATOR = " - ";

/* ------------------------------------------------------------------ i18n -- */

const STRINGS = {
  en: {
    heading: "Ask an AI tutor about this page",
    blurb:
      "Copy a ready-made prompt and paste it into whichever AI assistant you already use. Nothing is sent from this page, and no assistant is opened for you.",
    copy: "Copy prompt",
    copied: "Copied",
    failed: "Press Ctrl+C to copy",
    show: "Show the prompt",
    fallbackNote:
      "Copying was blocked by your browser. The prompt is selected below; press Ctrl+C (or Cmd+C) to copy it.",
    promptTitleLabel: "I am on the page titled",
    prompt: (title, url) =>
      [
        "I am studying MATH 4210, Regression Modeling and Analysis.",
        `I am on the page titled: "${title}"`,
        `Page link: ${url}`,
        "",
        "Please act as my tutor for this page.",
        "1. Ask me what I already understand about it, and wait for my answer.",
        "2. Explain the idea I name in plain language, with one small worked example.",
        "3. Then give me one practice question and check my answer.",
        "",
        "Please do not hand me finished solutions to the exercises. Walk me through",
        "the reasoning so I can do the next one on my own. If I say something that",
        "is wrong, correct it directly and tell me why it is wrong.",
      ].join("\n"),
  },
  es: {
    heading: "Pregunta a un tutor de IA sobre esta página",
    blurb:
      "Copia un mensaje ya preparado y pégalo en el asistente de IA que ya uses. Nada se envía desde esta página y no se abre ningún asistente por ti.",
    copy: "Copiar mensaje",
    copied: "Copiado",
    failed: "Pulsa Ctrl+C para copiar",
    show: "Ver el mensaje",
    fallbackNote:
      "Tu navegador bloqueó la copia. El mensaje está seleccionado abajo; pulsa Ctrl+C (o Cmd+C) para copiarlo.",
    promptTitleLabel: "Estoy en la página titulada",
    prompt: (title, url) =>
      [
        "Estoy estudiando MATH 4210, Modelos de Regresión y Análisis.",
        `Estoy en la página titulada: "${title}"`,
        `Enlace de la página: ${url}`,
        "",
        "Por favor, actúa como mi tutor para esta página.",
        "1. Pregúntame qué entiendo ya sobre ella y espera mi respuesta.",
        "2. Explica en lenguaje sencillo la idea que yo nombre, con un ejemplo breve.",
        "3. Luego dame una pregunta de práctica y corrige mi respuesta.",
        "",
        "Por favor, no me des las soluciones terminadas de los ejercicios. Guíame por",
        "el razonamiento para que yo pueda hacer el siguiente por mi cuenta. Si digo",
        "algo incorrecto, corrígelo directamente y explícame por qué está mal.",
      ].join("\n"),
  },
};

// Spanish pages live at /chNN/es/ in this book. Fall back to <html lang>.
function isSpanish() {
  try {
    const path = String(location.pathname || "").replace(/\/+$/, "");
    if (/\/es$/i.test(path)) return true;
  } catch (err) {
    /* location unavailable; fall through */
  }
  try {
    const lang = document.documentElement.getAttribute("lang") || "";
    return lang.toLowerCase().slice(0, 2) === "es";
  } catch (err) {
    return false;
  }
}

/* ----------------------------------------------------- prompt assembly -- */

// document.title is "<page title> - <site title>". Cut at the LAST separator so
// a page title that itself contains " - " survives intact.
function pageTitle(fallback) {
  let title = "";
  try {
    title = String(document.title || "").trim();
  } catch (err) {
    title = "";
  }
  const cut = title.lastIndexOf(SITE_SUFFIX_SEPARATOR);
  if (cut > 0) title = title.slice(0, cut).trim();
  return title || fallback;
}

function pageUrl(fallback) {
  try {
    const loc = location;
    if (loc && loc.origin && loc.pathname) return loc.origin + loc.pathname;
    if (loc && loc.href) return String(loc.href).split("#")[0];
  } catch (err) {
    /* fall through */
  }
  return fallback;
}

function buildPrompt(t) {
  const title = pageTitle(t === STRINGS.es ? "esta página" : "this page");
  const url = pageUrl("");
  return t.prompt(title, url);
}

/* ---------------------------------------------------------- clipboard -- */

// Three tiers: async Clipboard API, then a hidden-textarea execCommand copy,
// then "select the text and press Ctrl+C". Every tier is individually guarded;
// this function resolves to a boolean and never rejects.
async function copyText(text) {
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function" &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    /* blocked by permissions or insecure context; try the legacy path */
  }

  let scratch = null;
  try {
    scratch = document.createElement("textarea");
    scratch.value = text;
    scratch.setAttribute("readonly", "");
    scratch.setAttribute("aria-hidden", "true");
    scratch.style.position = "fixed";
    scratch.style.top = "-1000px";
    scratch.style.left = "0";
    scratch.style.opacity = "0";
    document.body.appendChild(scratch);
    scratch.select();
    const ok =
      typeof document.execCommand === "function" && document.execCommand("copy");
    return !!ok;
  } catch (err) {
    return false;
  } finally {
    try {
      if (scratch && scratch.parentNode) scratch.parentNode.removeChild(scratch);
    } catch (err) {
      /* nothing further to do */
    }
  }
}

/* --------------------------------------------------------------- DOM -- */

function elem(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function isMountable(node) {
  return !!(node && node.nodeType === 1 && typeof node.appendChild === "function");
}

function build(t) {
  const card = elem("div", "m4210-tutor-card");

  const heading = elem("h2", "m4210-tutor-heading", t.heading);
  const blurb = elem("p", "m4210-tutor-blurb", t.blurb);

  const row = elem("div", "m4210-tutor-row");
  const button = elem("button", "m4210-tutor-copy", t.copy);
  button.type = "button";

  const status = elem("span", "m4210-tutor-status", "");
  // Announce copy success without stealing focus.
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  row.appendChild(button);
  row.appendChild(status);

  const details = elem("details", "m4210-tutor-details");
  const summary = elem("summary", "m4210-tutor-summary", t.show);
  const pre = elem("pre", "m4210-tutor-prompt", buildPrompt(t));
  details.appendChild(summary);
  details.appendChild(pre);

  card.appendChild(heading);
  card.appendChild(blurb);
  card.appendChild(row);
  card.appendChild(details);

  return { card, button, status, details, pre };
}

/* ------------------------------------------------------------ render -- */

function mount(props) {
  const el = props && props.el;
  // No element to render into means there is simply nothing to do. Bailing is
  // correct here: this card is an optional affordance, never a hard dependency.
  if (!isMountable(el)) return function teardown() {};

  const t = isSpanish() ? STRINGS.es : STRINGS.en;
  const parts = build(t);
  let resetTimer = null;

  function onCopy() {
    // Rebuilt every click so a client-side navigation cannot serve a stale title.
    let text;
    try {
      text = buildPrompt(t);
      parts.pre.textContent = text;
    } catch (err) {
      return;
    }

    Promise.resolve(copyText(text))
      .catch(function () {
        return false;
      })
      .then(function (ok) {
        try {
          if (ok) {
            parts.button.textContent = t.copied;
            parts.card.classList.add("m4210-tutor-ok");
            parts.status.textContent = t.copied;
          } else {
            // Last resort: reveal the prompt and select it for a manual copy.
            parts.button.textContent = t.failed;
            parts.status.textContent = t.fallbackNote;
            parts.details.open = true;
            selectNode(parts.pre);
          }
          if (resetTimer) clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            try {
              parts.button.textContent = t.copy;
              parts.card.classList.remove("m4210-tutor-ok");
              parts.status.textContent = "";
            } catch (err) {
              /* node already gone */
            }
          }, 2600);
        } catch (err) {
          /* never let feedback rendering break the page */
        }
      });
  }

  parts.button.addEventListener("click", onCopy);

  try {
    el.appendChild(parts.card);
  } catch (err) {
    return function teardown() {};
  }

  function teardown() {
    try {
      if (resetTimer) clearTimeout(resetTimer);
      parts.button.removeEventListener("click", onCopy);
      if (parts.card.parentNode) parts.card.parentNode.removeChild(parts.card);
    } catch (err) {
      /* already detached */
    }
  }

  // Honour an AbortSignal only if the host actually supplies one. This is the
  // guard whose absence caused the original crash: `signal` is undefined under
  // MyST's static, kernel-free renderer.
  try {
    const signal = props && props.signal;
    if (signal && typeof signal.addEventListener === "function") {
      signal.addEventListener("abort", teardown);
    }
  } catch (err) {
    /* teardown is still returned below, so cleanup is not lost */
  }

  return teardown;
}

function selectNode(node) {
  try {
    const selection = window.getSelection && window.getSelection();
    if (!selection || typeof document.createRange !== "function") return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (err) {
    /* selection is a nicety, not a requirement */
  }
}

// Total function: cannot throw, always returns a callable teardown.
function render(props) {
  try {
    return mount(props) || function () {};
  } catch (err) {
    return function () {};
  }
}

export default { render };
