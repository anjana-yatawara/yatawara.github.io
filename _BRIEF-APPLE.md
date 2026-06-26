# APPLE × COSMOS RE-SKIN BRIEF

Re-skinning yatawara.com into a **premium apple.com aesthetic set in deep space**:
near-black cosmic ground, clean Inter/SF type, generous space, big rounded glass
tiles, Apple-blue links — over a beautiful animated UNIVERSE. core.css/components.css
are ALREADY rewritten. Make the JS modules + games hub match.
**Only change the LOOK. Keep all logic, contracts, selectors, events, math, reduced-motion.**
Read `assets/css/core.css` first.

## Palette (hexes for canvas; vars in CSS)
- bg (deep space) `#000206` (var(--bg)) · tiles = var(--panel) glass · hairlines var(--hair)/var(--hair-2)
- text `#f5f7fa` (var(--text)) · soft `#c6ccd8` · dim `#8b92a1`
- **accent (Apple blue)** `#2997ff` (var(--accent)) · violet (nebula) `#a98bff` (var(--violet)) · teal `#4fd6e6` (var(--teal)) · pink `#ff6aa6` (var(--pink))
- fonts: var(--font-display)/var(--font-body) = SF/Inter; code = var(--font-code)
- Look: premium, restrained, spacious, big rounding (var(--r-lg/xl)), soft shadows + subtle glow, glassy translucency (backdrop-blur). NO hard offset shadows, NO loud colors. Cinematic + clean.

## Per module (edit in place)

### cosmos.js — REBUILD into a top-tier animated UNIVERSE (the background showpiece)
Replace the file. Self-init IIFE: a FIXED full-viewport `<canvas id="cosmos">` appended to `<body>` (self-inject CSS: position:fixed; inset:0; z-index:-1; pointer-events:none), behind all content, above the CSS nebula (z-index -2). Render a genuinely beautiful deep-space scene:
- **Parallax starfield**: 3–4 depth layers, hundreds of stars, varied size/brightness, gentle twinkle, mostly white with a few faint blue/violet/teal stars; slow drift.
- **Nebula clouds**: a few very soft, large, low-opacity radial color blobs (blue #2997ff / violet #a98bff / teal) that slowly drift and shift — subtle, never overpowering text.
- **Shooting stars**: occasional streaks (~every 7–16s).
- **Depth parallax on SCROLL**: layers translate at different rates with window.scrollY (far stars barely move, near stars move more) — a gentle "travel through space" feeling. Plus subtle **mouse parallax**.
- DPR-aware, resize-safe, requestAnimationFrame, pause when document.hidden. **Reduced motion**: render ONE static starfield frame, no loop/parallax. Performant (~60fps; cap star count by area). No libraries.
Keep it subtle enough that white headline text over it stays perfectly legible. End with a 1-line comment. node --check.

### ask.js
Apple-dark: glass panel var(--panel) + 1px var(--hair) border + big radius var(--r-lg) + backdrop-blur + soft shadow; Inter; prompt `>` and links in accent blue #2997ff; suggested chips = subtle rounded pills (var(--panel), hairline). Replace any hard borders/offset shadows/loud colors. Keep KB, typing, `ay:ask`/`e.detail.q`, escaping, `[data-component="ask-console"]` contract, LLM-upgrade comment. node --check.

### ticker.js
Apple-dark: glass cells (var(--panel)), rounded var(--r-md), Inter, hairline; sparkline up = teal #4fd6e6, down = pink #ff6aa6 (source-over). "memory α ≈ 0.27" cell accent blue; regime label dim/accent. Replace loud/hard styles. Keep GARCH sim, marquee/reduced-motion, pause-on-hidden, `[data-component="vol-ticker"]` contract. node --check.

### kernel-playground.js
Apple-dark: subtle glass panel; stretched-exponential curve = accent blue #2997ff (with a faint blue fill); exponential reference = violet #a98bff dashed (or dim); axes/grid = hairline; markers = white/teal. Sliders/buttons/readouts = Apple-style (rounded, glass, pill thumbs, soft). source-over. Keep all math, the 5-day / ~15-year readouts, quick-sets, `[data-component="kernel-playground"]` contract, reduced-motion. node --check.

### games/index.html (GAMES HUB)
Rework only `<main>` + scoped `<style>` (keep template head/header/footer/scripts). Apple-dark zine: cosmic ground (let the global cosmos show — keep card areas glassy/transparent-ish), Inter, big rounded GLASS tiles (var(--r-lg), var(--panel), hairline, soft shadow, lift on hover). Keep the hero copy ("Games by Anjana Yatawara", "Built for fun. Play in browser. Just have fun.", the lost-hours/sleep/exam disclaimer), the 3 cards (Acts of the Continuous [featured], Revenge of the Basco, Sigma Strike) with LIVE iframe previews (loading="lazy", relative src), `.live-pill` labels, terminal lines, tags, "▶ Play Fullscreen" links (target="_blank"). Replace any old font-families with var() fonts; remove leftover loud/riso styling. Do NOT modify the 3 standalone game files. Responsive, accessible, reduced-motion safe.

Reply ≤4 lines each. Files on disk are the deliverable.
