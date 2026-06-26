# ENTROPY RE-SKIN BRIEF — riso maximalist / mad-artist

Re-skinning yatawara.com into a **risograph art-zine**: warm BONE PAPER background,
JET INK, and fluorescent riso inks. Loud, tactile, tilted, overprinted — but legible.
core.css/components.css are ALREADY rewritten. Make the JS modules + games hub match.
**Only change the LOOK. Keep all logic, contracts, selectors, events, math, reduced-motion.**
Read `assets/css/core.css` first.

## Palette (use these hexes in canvas; vars in injected CSS)
- paper (bg) `#f4ecd6`  (var(--paper)) · paper-2 `#ece1c4` · paper-3 `#e3d6b3`
- ink (near-black, primary) `#14120c` (var(--ink)) · ink-2 `#3a3526` · ink-soft `#5c5640`
- **flame** (fluor orange, lead) `#ff4d12` (var(--flame))
- **acid** (fluor green-yellow) `#c8ff00` (var(--acid))   ← great as a FILL/highlight, NOT for thin text on paper
- **magenta** (fluor pink) `#ff2e88` (var(--magenta))
- **klein** (electric blue) `#1f1fe0` (var(--klein))
- fonts: display = var(--font-display) **Bricolage Grotesque** (800) · body = var(--font-body) Archivo · mono = var(--font-mono) JetBrains Mono · hand = var(--font-hand) **Caveat** (scribbles)

## Look rules
- Background is PAPER (light) — canvas modules must use `source-over` (NOT additive `lighter`), drawing INK + riso-ink strokes that read on cream.
- Hard **offset shadows** (e.g. `4px 4px 0 var(--ink)`), NOT soft glow. **Thick ink borders** (var(--bw) = 2.5px). Sharp corners (var(--r-sm) ≈ 2px). Slight **tilts** (rotate ±1–3deg) are encouraged.
- Print/halftone energy: bold fills, duotone, a little misregistration. Riot but legible (body text stays ink on paper).

## Per module (edit in place)

### hero.js  — REPLACE the visual with a live STRANGE ATTRACTOR
This is the centerpiece. Render a **chaotic strange attractor** (e.g. a **Clifford** or **De Jong** attractor: `xn+1 = sin(a·y)+c·cos(a·x); yn+1 = sin(b·x)+d·cos(b·y)`, or a 2D projection of **Lorenz**) as a dense field of tiny ink/riso dots plotted over thousands of iterations — it looks like a hand-inked chaos plot. Draw on the `#hero-canvas` (transparent over the paper) with `source-over`: points mostly **ink `#14120c`** at low alpha, with accent points in **flame/magenta/klein** for depth. Slowly drift the attractor's parameters over time so the shape breathes/morphs; **pointer position nudges the parameters** so it reacts. DPR-aware, resize-safe, rAF, pause on `document.hidden`. **Reduced motion**: plot one static attractor frame, no loop. Keep the `#hero-canvas` contract + the no-op-if-absent guard. (You may rename internal symbols; the file must still self-init on `#hero-canvas`.) node --check.

### NEW FILE: assets/js/madness.js  — the art-interaction layer
Self-init IIFE; all features must degrade gracefully + respect `matchMedia('(prefers-reduced-motion: reduce)')` (then do nothing fancy). No libraries. Include:
1. **Ink cursor** — a small flame blob (`.ink-dot`, class already styled in core.css) that follows the pointer with a tiny lag; on hover over links/buttons it grows. Only on `(pointer:fine)`. Skip on touch + reduced-motion.
2. **Marquee** — if the page has `.marquee .track`, duplicate its inner content once so the CSS `@keyframes marquee` loops seamlessly (translateX -50%). (The home page provides the markup; just clone for seamlessness.)
3. **Scatter/glitch headline** — give elements with `[data-glitch]` a quick glitch/jitter on hover (you may toggle a class that uses the `glitch-x` keyframe in core.css, or do a brief letter-jitter). Subtle, fast.
4. **Draggable stickers** — make elements with `[data-sticker]` draggable (pointer down/move/up), with a little inertia/toss and rotation; they stay where dropped. Keep within viewport-ish. This is the playful "fling things around" bit.
Expose nothing required, but you may attach to `window.AY` if present (optional). node --check.

### kernel-playground.js
Riso plot: paper background area, **ink axes/gridlines** (thin), the **stretched-exponential curve = flame `#ff4d12`** (bold, maybe a faint flame fill), the **exponential reference = klein `#1f1fe0` dashed**; markers (w=0.5/w=0.01) = ink. Sliders/buttons/readouts = thick ink border, hard offset shadow, JetBrains Mono, near-square; active fills in flame/acid. Keep all math, the 5-day / ~15-year readouts, quick-sets, the `[data-component="kernel-playground"]` contract, reduced-motion. node --check.

### ask.js
Riso terminal: paper/`var(--paper)` bg, **thick ink border** (var(--bw)) + hard offset shadow, sharp corners, ink text, prompt `>` in flame, links klein, suggested chips as ink-bordered stickers (reuse `.chip`/tag look). Replace dark-only colors. Keep KB, typing, `ay:ask`/`e.detail.q`, escaping, the `[data-component="ask-console"]` contract, and the LLM-upgrade comment. node --check.

### ticker.js
Riso cells: thick ink border, sharp, JetBrains Mono, ink text, hard offset shadow; sparkline up = klein `#1f1fe0`, down = flame `#ff4d12` (source-over on paper). "memory α" cell highlighted (acid bg / ink text); regime label ink. Keep GARCH sim, marquee/reduced-motion, pause-on-hidden, `[data-component="vol-ticker"]` contract. node --check.

### games/index.html (GAMES HUB — riso reskin)
Read the current file + core.css. Rework only `<main>` + its scoped `<style>` (keep template head/header/footer/scripts). Make it a loud riso zine: paper bg, ink, Bricolage display (var(--font-display)), riso accents, **game cards as thick-ink panels with hard offset shadows and slight tilts** (alternate rotate ±1.5deg). Keep the hero copy ("Games by Anjana Yatawara", "Built for fun. Play in browser. Just have fun.", the lost-hours/sleep/exam disclaimer), the three game cards (Acts of the Continuous [featured], Revenge of the Basco, Sigma Strike) with LIVE `<iframe>` previews (loading="lazy", relative src), `.live-pill` labels, terminal lines, tags, "▶ Play Fullscreen" links (target="_blank"). Replace any 'Numans'/old font-families with the ENTROPY vars. Do NOT modify the 3 standalone game files. Responsive + accessible + reduced-motion safe.

Reply ≤4 lines each. Files on disk are the deliverable.
