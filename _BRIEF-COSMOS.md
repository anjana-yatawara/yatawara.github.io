# COSMIC RE-SKIN BRIEF — "Aurora cosmos"

We are re-skinning yatawara.com to a **universe** theme. The CSS design system
(`assets/css/core.css`, `assets/css/components.css`) is ALREADY rewritten to this
language. Your job: make the JS feature modules match. **Only change the LOOK
(colors, radii, fonts, glow). Do NOT change logic, contracts, selectors, events,
math, or reduced-motion handling.** Read `assets/css/core.css` first.

## Palette (use these exact hexes for canvas drawing; use the CSS vars in injected CSS)
- void (bg)        `#040b0e`   var(--void)
- void-2           `#06121a`   var(--void-2)
- aurora (LEAD, emerald) `#36f5b0`  var(--aurora)
- ion (teal)       `#4fd6ff`   var(--ion)
- atmos (violet)   `#9b8cff`   var(--atmos)
- gold             `#ffd27d`   var(--gold)
- rose             `#ff7ea8`   var(--rose)
- star (text)      `#eef7f3`   var(--star)
- star-soft        `#cdddd9`   var(--star-soft)
- dim              `#8aa09c`   var(--dim)
- hairlines        var(--hair) / var(--hair-2)
- panels           var(--panel) / var(--panel-2)
- fonts            display=var(--font-display) (Fraunces serif) · mono=var(--font-mono) (Spline Sans Mono)

## OLD → NEW recolor map (replace any of these literals you find)
- `#00e5ff` → `#4fd6ff`   ·  `0,229,255` → `79,214,255`     (cyan → ion)
- `#bf5af2` → `#9b8cff`   ·  `191,90,242` → `155,140,255`   (violet → atmos)
- `#22ff88` → `#36f5b0`   ·  `34,255,136` → `54,245,176`    (green → aurora)
- `#fbbf24` → `#ffd27d`  (amber → gold) · `#ff3b7f`/`#ff453a` → `#ff7ea8` (pink/red → rose)

## FORM rules (universe = constellation, NOT rounded boxes)
- Radii are near-square now: use `var(--r-sm)` (2px) / `var(--r-md)` (3px). **No big rounded panels** (no 12–20px radius). Console/widget frames: hairline borders (`1px solid var(--hair)`), transparent or `var(--panel)` bg, subtle glow on focus/hover (`box-shadow: var(--node-glow)` or `0 0 30px -8px var(--aurora)`).
- Labels in Spline Sans Mono. Headings/large numbers may use Fraunces (`var(--font-display)`).
- Accents: emerald aurora is the lead; ion + atmos secondary; gold/rose sparingly.

## Per-module tasks

### hero.js (edit in place)
Recolor the kernel-field canvas to ion/atmos/aurora (use the recolor map). Make each "shock" read as a **star / supernova**: a tiny bright near-white core + a soft colored halo that decays on the stretched-exponential kernel (keep the math). Keep transparent canvas, `lighter` compositing, pointer-reactivity, pause-on-hidden, and the reduced-motion single static frame. Keep `#hero-canvas` contract.

### kernel-playground.js (edit in place)
Recolor: the **stretched-exponential** curve = aurora `#36f5b0` (with a soft glow + faint fill), the **exponential reference** = atmos `#9b8cff` dashed (or dim). Axis/gridlines = hairline; markers (w=0.5 / w=0.01) = ion. Sliders + readouts: hairline, near-square (`var(--r-sm)`), Spline mono labels, aurora fills. Keep all math, the 5-day/15-year readouts, quick-set buttons, and reduced-motion behavior. Keep `[data-component="kernel-playground"]` contract.

### ask.js (edit in place)
Reskin the console to a constellation terminal: transparent/`var(--panel)` bg, `1px solid var(--hair)` frame, **near-square** (`var(--r-sm)`), Spline mono, prompt `>` in aurora, links ion, suggested chips = hairline near-square (reuse `.chip` look). Recolor any old hexes. Keep the KB, typing effect, `ay:ask` listener, `e.detail.q`, escaping, and the LLM-upgrade comment. Keep `[data-component="ask-console"]` contract.

### ticker.js (edit in place)
Cells: hairline, near-square (`var(--r-sm)`), Spline mono. Sparkline: up = aurora `#36f5b0`, down = rose `#ff7ea8`. "memory α ≈ 0.27" cell in aurora; regime label ion. Recolor old hexes. Keep the GARCH simulation, marquee/reduced-motion behavior, and `[data-component="vol-ticker"]` contract.

### cosmos.js (CREATE NEW: assets/js/cosmos.js)
A global cosmic background. Self-init IIFE: create a FIXED full-viewport `<canvas id="cosmos">` appended to `<body>` (self-inject CSS: `position:fixed;inset:0;z-index:-2;pointer-events:none`), sitting above the CSS aurora veils (z-index -3) and behind all content.
Render:
- A deep-space **starfield** — 2–3 parallax layers of stars (varied size/brightness/color: mostly white, some faint aurora/ion/gold), gentle twinkle, very slow drift.
- 1–2 soft **aurora ribbons** — undulating sine-wave bands in emerald/ion/atmos, `lighter`/screen blend, slowly morphing, low opacity (must not overpower content).
- An occasional **shooting star** (a fading streak) every ~6–14s.
DPR-aware, handles resize, `requestAnimationFrame`, pause when `document.hidden`. **Reduced motion**: draw ONE static frame (stars + a still ribbon), no loop. Keep it subtle and performant (~60fps; cap star count by area). Vanilla JS, no libraries, no external assets. End with a 1-line comment noting it’s the global universe backdrop.

When done, reply ≤4 lines confirming the file + what you changed. The file on disk is the deliverable.
