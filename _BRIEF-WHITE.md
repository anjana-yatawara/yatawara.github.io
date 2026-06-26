# WHITE-MINIMAL RE-SKIN BRIEF

Re-skinning yatawara.com to a clean **white, minimal** theme. core.css/components.css
are ALREADY rewritten to this. Make the JS modules + games hub match.
**Only change the LOOK. Keep all logic, contracts, selectors, events, math, reduced-motion.**
Read `assets/css/core.css` first.

## Palette (LIGHT)
- bg white `#ffffff`  (var(--bg)) · section bg `#f6f7f8` (var(--bg-2)) · panels `#ffffff`
- ink (near-black, primary) `#121417` (var(--ink)) · text `#1a1d22` · text-soft `#3c4149` · dim `#6a6f78` · faint `#c6cad0`
- hairlines `rgba(18,20,24,.10)` (var(--hair)) / `.16` (var(--hair-2))
- accent (the ONE color, a clean blue) `#2a5bd7` (var(--accent)) · accent-dim `var(--accent-dim)`
- functional: success green `#2f9e6b` (var(--success)) · warn amber `#b8800e` (var(--warn)) · danger red `#d23f57` (var(--danger))
- font: **Numans** everywhere via var(--font-display/body/mono); code = var(--font-code) (monospace)

## CRITICAL for canvas modules (white background!)
- The old dark theme used additive `globalCompositeOperation='lighter'` — on WHITE that makes everything invisible. **Switch to `'source-over'`** and draw with DARK ink / accent at low opacity (e.g. `rgba(18,20,24,0.10)` strokes, `#2a5bd7` accents, ink dots). Keep it subtle, elegant, airy — this is a minimal site.
- No glows. Use thin lines + soft fills. Near-square radii (var(--r-sm/md)). Soft shadows (var(--shadow-1/2)) not glow.

## Per module (edit in place)

### hero.js
Re-render the kernel field for a WHITE background: `source-over` compositing; draw the decaying stretched-exponential kernel as thin **ink/gray curves** + small soft dots, with the "shocks" as faint expanding rings in low-opacity ink and a touch of **accent `#2a5bd7`**. Subtle and refined (it sits behind hero text on white — must stay light/legible). Keep transparent canvas, pointer-reactivity, pause-on-hidden, reduced-motion static frame, and the `#hero-canvas` contract. node --check.

### kernel-playground.js
White plot: axes/gridlines = hairline (low-opacity ink); **stretched-exponential curve = accent `#2a5bd7`** (with a faint accent-dim fill); **exponential reference = gray dashed `#9aa0a8`**; markers (w=0.5 / w=0.01) = ink. Sliders/buttons/readouts = hairline, near-square (var(--r-sm)), ink text, Numans. Keep all math, the 5-day/15-year readouts, quick-sets, contract, reduced-motion. node --check.

### ask.js
Light terminal: white/`var(--panel)` bg, `1px solid var(--hair)` frame, near-square (var(--r-sm)), ink text, prompt `>` and cursor in **accent**, links in accent, chips = hairline near-square. Keep KB, typing, `ay:ask`/`e.detail.q`, escaping, the `[data-component="ask-console"]` contract, and the LLM-upgrade comment. node --check.

### ticker.js
White cells: hairline, near-square (var(--r-sm)), Numans. Sparkline up = **success `#2f9e6b`**, down = **danger `#d23f57`**. "memory α" cell + alpha in accent; regime label ink. Keep GARCH sim, marquee, reduced-motion, pause-on-hidden, `[data-component="vol-ticker"]` contract. node --check.

### games/index.html  (the GAMES HUB page — full reskin to white)
Currently a dark neon hub (scoped `<style>` + a matrix-rain canvas). Convert it to the **white minimal** theme:
- Read the current file + `assets/css/core.css`. Keep the site template's head/header/footer/scripts (already light) — only rework the `<main>` + its scoped `<style>`.
- White background, ink text, **Numans** (replace any 'Space Grotesk'/'JetBrains Mono' font-families with var(--font-display)/var(--font-body)/var(--font-mono)). **Remove the dark matrix-rain canvas + its script** (it doesn't belong on white) — keep the page clean white.
- Keep the hero copy ("Games by Anjana Yatawara", "Built for fun. Play in browser. Just have fun.", and the lost-hours/sleep/exam disclaimer), and the three game cards (Acts of the Continuous [featured/educational], Revenge of the Basco, Sigma Strike) with their LIVE `<iframe>` previews (`loading="lazy"`, relative `src` to the sibling game files), the `.live-pill` LIVE labels, terminal command lines, tags, and "▶ Play Fullscreen" links (`target="_blank"`).
- Style the cards as clean light cards (hairline border, near-square `var(--r-md)`, white bg, subtle `var(--shadow-1)` hover) OR the constellation style — your call, but minimal + on-theme. Use site tokens.
- The 3 standalone game files (acts/sigma/basco .html) are NOT changed — they remain dark arcade games; the hub just embeds/links them (the dark previews inside white cards are fine — they're game screens).
- Responsive, accessible, reduced-motion safe.

Reply ≤4 lines each confirming the file + changes. The files are the deliverable.
