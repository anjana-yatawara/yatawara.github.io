# KANDINSKY RE-SKIN BRIEF — Bauhaus "point · line · plane"

Re-skinning yatawara.com into a **living Kandinsky / Bauhaus composition**: warm
parchment ground, painterly primaries, floating circles, concentric rings,
crossing lines, arcs & triangles, geometric Jost type. core.css/components.css are
ALREADY rewritten. Make the JS modules + games hub match.
**Only change the LOOK. Keep all logic, contracts, selectors, events, math, reduced-motion.**
Read `assets/css/core.css` first.

## Palette (hexes for canvas; vars in CSS)
- canvas/ground `#efe9da` (var(--canvas)) · panel `#f6f1e6` (var(--panel))
- ink (warm black) `#1a1813` (var(--ink)) · ink-2 `#403a2e` · ink-soft `#635c4b`
- **blue (cobalt, lead)** `#1840c4` (var(--blue)) · **red (vermilion)** `#e23a26` (var(--red)) · **yellow (golden)** `#f4b81e` (var(--yellow)) · teal `#138a7a` · violet `#6c3fb4`
- fonts: display+body = var(--font-display) **Jost** (geometric) · labels = var(--font-mono) **Space Mono**
- Forms: circles everywhere, concentric rings, thin ink lines, pills, soft shadows + flat color. Painterly primaries (NOT fluorescent). Light, balanced, composed.

## Per module (edit in place)

### hero.js — REPLACE with a generative KANDINSKY COMPOSITION
The centerpiece. On `#hero-canvas` (transparent over parchment, `source-over`), compose a slowly-living abstract painting in the Kandinsky/Bauhaus vocabulary:
- **Circles**: several — some solid (blue/red/yellow/teal/violet), some **concentric rings**, some thin outlines; varied sizes.
- **Lines**: a few long thin lines (ink + one colored), some diagonal, crossing the field.
- **Arcs**, 1–2 **triangles**, a scatter of small **dots** ("points"), optionally a tiny checkerboard square.
Make it a *balanced composition* (not random noise) that slowly drifts/rotates/orbits and breathes; the pointer applies gentle parallax. Bias the visual mass toward the RIGHT so the left-side hero text stays clear/legible. DPR-aware, resize-safe, rAF, pause on document.hidden, no-op if `#hero-canvas` absent. Reduced motion: render ONE static composition. Keep the `#hero-canvas` contract. node --check.

### ask.js
Bauhaus terminal: `var(--panel)` bg, ink border (var(--bw-2)), rounded `var(--r-lg)`, soft shadow, Jost text / Space Mono labels, prompt `>` in blue, links blue, suggested chips = outlined pills each with a colored dot (reuse the `.chip`/`.tag` look). Replace dark/riso colors. Keep KB, typing, `ay:ask`/`e.detail.q`, escaping, `[data-component="ask-console"]` contract, LLM-upgrade comment. node --check.

### ticker.js
Bauhaus cells: `var(--panel)`, ink border, pill/rounded, Space Mono, ink text. Sparkline up = teal `#138a7a`, down = red `#e23a26` (source-over on parchment). Highlight "memory α ≈ 0.27" cell (yellow `#f4b81e` bg, ink text); regime label ink/blue. Replace riso colors. Keep GARCH sim, marquee/reduced-motion, pause-on-hidden, `[data-component="vol-ticker"]` contract. node --check.

### kernel-playground.js
Bauhaus plot: thin ink axes/gridlines; the STRETCHED-exponential curve = blue `#1840c4` (with a faint blue fill); the EXPONENTIAL reference = red `#e23a26` dashed; markers (w=0.5/w=0.01) = ink. Sliders/buttons/readouts = ink border, rounded, Jost/Space Mono; active fills blue/yellow; soft shadow (no glow). source-over. Keep all math, the 5-day / ~15-year readouts, quick-sets, `[data-component="kernel-playground"]` contract, reduced-motion. node --check.

### games/index.html (GAMES HUB)
Rework only `<main>` + scoped `<style>` (keep template head/header/footer/scripts). Bauhaus zine: parchment bg, ink text, Jost (var(--font-display)) display, Space Mono labels, painterly primaries. Game cards = composition panels (ink border, rounded `var(--r-md)`, soft shadow, a floating colored CIRCLE accent in a corner, lift on hover). Keep hero copy ("Games by Anjana Yatawara", "Built for fun. Play in browser. Just have fun.", the lost-hours/sleep/exam disclaimer), the 3 cards (Acts of the Continuous [featured], Revenge of the Basco, Sigma Strike) with LIVE iframe previews (loading="lazy", relative src), `.live-pill` labels, terminal lines, tags, "▶ Play Fullscreen" links (target="_blank"). Replace any Bricolage/Caveat/old font-families with the var() fonts. Do NOT modify the 3 standalone game files. Responsive, accessible, reduced-motion safe.

Reply ≤4 lines each. Files on disk are the deliverable.
