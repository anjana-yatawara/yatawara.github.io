# yatawara.com — a living computational interface

A clean, **minimal, pure-static** personal site for Dr. Anjana Yatawara — white background,
one simple typeface (Numans), near-monochrome with a single blue accent. No build step,
no framework, no dependencies (just Google Fonts). It drops straight into free GitHub Pages
hosting and keeps the `www.yatawara.com` custom domain.

> Palette + type live as CSS variables at the top of `assets/css/core.css` (the `:root` block).
> Change `--accent` (one line) to re-tint the whole site; the default theme is light, with a
> simple dark mode via the toggle.

## What's here
```
index.html            Home — living memory-kernel hero, ticker, ask console, pillars
research.html         Four research pillars (+ interactive kernel playground)
publications.html     Full publication list + presentations
teaching.html         Courses, philosophy, AI tools, mentorship
consulting.html       Services, process, credentials
kernelstats.html      The KernelStats platform
cv.html               Curriculum vitae (+ /assets/Yatawara_CV.pdf)
blog.html             Writing index
blog/nothing-ever-fully-goes-away.html   Featured essay (+ kernel playground)
games/                Games hub + the 3 standalone games (preserved as-is)
assets/css/           core.css (design tokens + shell), components.css
assets/js/            shell.js (palette, theme, boot, HUD), hero.js, ticker.js,
                      ask.js, kernel-playground.js
CNAME, .nojekyll, sitemap.xml, robots.txt, favicon
_template.html        Dev reference skeleton (not deployed)
_BRIEF.md             Dev build spec (not deployed)
```

## Signature features
- **Living hero** (`hero.js`) — renders Anjana's actual finding: a stretched-exponential
  volatility-memory kernel (α≈0.27), cursor-reactive. Static frame under reduced-motion.
- **⌘K command palette** (`shell.js`) — navigate / run actions / ask from anywhere. Also `/`.
- **Ask my work** (`ask.js`) — a free, client-side research concierge (20 intents). No network.
- **Memory-kernel playground** (`kernel-playground.js`) — drag α and watch decay morph.
- **Live volatility HUD** (`ticker.js`) — GARCH-simulated "market memory," no API.
- Boot sequence (once/session), system HUD, scroll choreography, light/dark, Konami → a game.

## Preview locally
It must be served over HTTP (root-absolute `/assets/...` paths won't work via `file://`):
```bash
cd site
python -m http.server 8080      # then open http://localhost:8080
```

## Deploy (free, GitHub Pages) — two options
The simplest path keeps your current `anjana-yatawara/yatawara.github.io` repo.

**Option A — deploy from branch (no Actions):**
1. Replace the repo's contents with the **contents of this `site/` folder** (keep `CNAME`).
2. In the repo: **Settings → Pages → Build and deployment → Source: _Deploy from a branch_**,
   Branch: `main` / `/ (root)`. Save.
3. `.nojekyll` is included so GitHub serves files as-is. Done — `www.yatawara.com` updates in ~1 min.

**Option B — GitHub Actions (included):** `.github/workflows/deploy.yml` auto-publishes on push
to `main` (set Settings → Pages → Source: _GitHub Actions_). It strips dev-only files first.

> DNS is already configured (Namecheap A records → GitHub Pages IPs; `www` CNAME →
> `anjana-yatawara.github.io`). The `CNAME` file pins `www.yatawara.com`.

### Prefer Cloudflare Pages? (also free, faster, unlocks real AI)
Connect the repo at dash.cloudflare.com → Pages, framework preset **None**, build command
empty, output dir `/`. Add `www.yatawara.com` as a custom domain. This also lets you add the
optional **Ask my work → real LLM** upgrade via a Cloudflare Worker (see the commented block at
the bottom of `assets/js/ask.js`).

## Editing
- **Content** lives directly in each `.html` file — edit the text, keep the classes.
- **New blog post:** copy `blog/nothing-ever-fully-goes-away.html`, change the content, then add a
  card to `blog.html` and a `<url>` to `sitemap.xml`.
- **Design tokens** (colors, type, spacing) are CSS variables at the top of `assets/css/core.css`.
- Don't hand-edit the shared chrome per page — header/footer are identical everywhere by design.

© 2026 Anjana Yatawara.
