# yatawara.com — Quarto Academic Website

Personal academic website for Dr. Anjana Yatawara, Assistant Professor of Mathematics & Statistics at California State University, Bakersfield.

## Quick Start

### Prerequisites
- [Quarto](https://quarto.org/docs/get-started/) (v1.4+)
- Git

### Local Development
```bash
# Clone the repo
git clone https://github.com/anjana-yatawara/yatawara.github.io.git
cd yatawara.github.io

# Preview locally
quarto preview

# Build
quarto render
```

### Deploy
Push to `main` branch. GitHub Actions will automatically build and deploy to GitHub Pages.

### Custom Domain
The `CNAME` file is set to `www.yatawara.com`. DNS A records on Namecheap should point to:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

CNAME record: `www` → `anjana-yatawara.github.io.`

(These are already configured in your Namecheap account.)

## Project Structure
```
├── _quarto.yml          # Site configuration
├── index.qmd            # Homepage
├── research/index.qmd   # Research areas & projects
├── publications/index.qmd # Full publication list
├── teaching/index.qmd   # Courses, philosophy, mentoring
├── consulting/index.qmd # Services & CTA
├── cv/index.qmd         # Curriculum vitae
├── blog/                # Blog posts (Quarto listings)
├── images/              # Photos & header art
│   ├── profile.jpg      # Professional headshot
│   └── headers/         # Classical AI-generated art
├── styles/
│   ├── custom.scss       # Healy blue + Silge gray theme
│   └── extra.css         # Minor overrides
└── .github/workflows/
    └── publish.yml       # Auto-deploy on push
```

## Design
- **Primary color:** Healy blue (#4271AE)
- **Neutral:** Silge warm gray (#F7F6F3 background, #2A2927 text)
- **Fonts:** Source Serif 4 (headings), Source Sans 3 (body), JetBrains Mono (code)
- **Inspiration:** juliasilge.com (simplicity), kieranhealy.org (typography), martenw.com (classical art)

## TODO
- [ ] Add professional headshot as `images/profile.jpg`
- [ ] Generate 7 classical header images (prompts in master plan)
- [ ] Update publication DOIs as papers are accepted
- [ ] Add Google Scholar meta tags to individual paper pages
- [ ] Set up Google Search Console & submit sitemap
- [ ] Add Schema.org JSON-LD structured data
- [ ] Implement dark mode toggle
- [ ] Add Calendly link to consulting page

Built with [Quarto](https://quarto.org) · © 2026 Anjana Yatawara
