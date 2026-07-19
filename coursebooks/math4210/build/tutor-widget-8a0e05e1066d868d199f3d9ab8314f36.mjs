// MATH 4210 AI study tutor -- anywidget chat panel (kernel-free ESM).
// Floating bubble appended to document.body; calls POST {endpoint}/chat with
// {message, session_id}. Adapted from the MATH 2200 template's tutor widget.
//
// Because the panel is appended to document.body (to escape the shadow-DOM /
// footer flow into a fixed viewport corner), the directive's shadow-scoped
// :css file cannot reach it, so we also inject a <style> into document.head.

const STYLE_ID = "m4210-tutor-style";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
#m4210-tutor { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 9999;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
#m4210-fab { background: #0072B2; color: #fff; border: none; border-radius: 2rem;
  padding: 0.6rem 1.1rem; font-size: 0.95rem; cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25); }
#m4210-fab:hover { background: #005a8e; }
#m4210-panel { position: absolute; right: 0; bottom: 3.25rem; width: 22rem;
  max-width: 90vw; height: 28rem; max-height: 70vh; display: flex;
  flex-direction: column; background: #fff; color: #111;
  border: 1px solid #ccc; border-radius: 0.6rem; overflow: hidden;
  box-shadow: 0 4px 18px rgba(0,0,0,0.3); }
#m4210-panel[hidden] { display: none; }
#m4210-log { flex: 1; overflow-y: auto; padding: 0.75rem; font-size: 0.9rem;
  display: flex; flex-direction: column; }
#m4210-log p { margin: 0 0 0.6rem; padding: 0.45rem 0.6rem; border-radius: 0.5rem;
  line-height: 1.35; white-space: pre-wrap; max-width: 90%; }
.m4210-user { background: #e7f1fb; align-self: flex-end; }
.m4210-bot { background: #f1f1f1; align-self: flex-start; }
.m4210-refuse { background: #fdecea; border: 1px solid #D55E00; }
#m4210-form { display: flex; gap: 0.4rem; border-top: 1px solid #eee; padding: 0.5rem; }
#m4210-in { flex: 1; padding: 0.45rem; border: 1px solid #bbb; border-radius: 0.4rem;
  font-size: 0.9rem; }
#m4210-form button { background: #0072B2; color: #fff; border: none;
  border-radius: 0.4rem; padding: 0 0.9rem; cursor: pointer; }
#m4210-head { display: flex; align-items: center; justify-content: space-between;
  background: #0072B2; color: #fff; padding: 0.5rem 0.75rem; font-weight: 600; font-size: 0.9rem; }
#m4210-close { background: transparent; border: none; color: #fff; font-size: 1.35rem;
  line-height: 1; cursor: pointer; padding: 0 0.3rem; }
#m4210-close:hover { color: #ffe08a; }
`;
  document.head.appendChild(style);
}

async function postChat(endpoint, message, sessionId, signal) {
  const res = await fetch(`${endpoint}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId }),
    signal,
  });
  if (!res.ok) throw new Error(`tutor ${res.status}`);
  return res.json();   // {reply, action, flags, low_confidence, ...}
}

function render({ model, el, signal }) {
  const endpoint = model.get("endpoint");
  // SPA guard: MyST (React/Remix) re-runs render on every client-side nav.
  if (document.getElementById("m4210-tutor")) return;
  injectStyles();

  const sessionId = crypto.randomUUID();    // client thread id; server hashes it
  const root = document.createElement("div");
  root.id = "m4210-tutor";
  root.innerHTML = `
    <button id="m4210-fab" aria-label="Open MATH 4210 tutor">Ask the tutor</button>
    <div id="m4210-panel" role="dialog" aria-label="MATH 4210 study tutor" hidden>
      <div id="m4210-head"><span>MATH 4210 Tutor</span><button id="m4210-close" type="button" aria-label="Close tutor" title="Close">&times;</button></div>
      <div id="m4210-log" aria-live="polite"></div>
      <form id="m4210-form">
        <input id="m4210-in" aria-label="Your question"
               placeholder="e.g. Why does the divisor become n minus p?" autocomplete="off"/>
        <button type="submit">Send</button>
      </form>
    </div>`;
  document.body.appendChild(root);          // escape footer flow -> fixed corner

  const log = root.querySelector("#m4210-log");
  const panel = root.querySelector("#m4210-panel");
  const fab = root.querySelector("#m4210-fab");
  fab.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    fab.textContent = panel.hidden ? "Ask the tutor" : "Tutor";
  }, { signal });
  // explicit close (x) button in the panel header
  root.querySelector("#m4210-close").addEventListener("click", () => {
    panel.hidden = true; fab.textContent = "Ask the tutor";
  }, { signal });
  // Esc closes the panel too
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { panel.hidden = true; fab.textContent = "Ask the tutor"; }
  }, { signal });

  function add(role, text) {
    const p = document.createElement("p");
    p.className = `m4210-${role}`;
    p.textContent = text;                   // textContent, not innerHTML (no XSS)
    log.appendChild(p); log.scrollTop = log.scrollHeight;
  }

  root.querySelector("#m4210-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = root.querySelector("#m4210-in");
    const q = input.value.trim(); if (!q) return;
    add("user", q); input.value = ""; add("bot", "...");
    try {
      const out = await postChat(endpoint, q, sessionId, signal);
      log.lastChild.remove();
      add("bot", out.reply);
      if (out.action === "refuse") log.lastChild.classList.add("m4210-refuse");
    } catch (err) {
      log.lastChild.textContent = "Tutor unavailable. Try again shortly.";
    }
  }, { signal });

  signal.addEventListener("abort", () => root.remove());   // teardown on nav/unmount
  return () => root.remove();
}

export default { render };
