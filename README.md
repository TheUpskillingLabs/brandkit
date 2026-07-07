# The Upskilling Labs - Brand Style Guide

This repository contains The Upskilling Labs brand style guide, hosted as a GitHub Page.

## View the Guide

The brand style guide is live at: [https://theupskillinglabs.github.io/brandkit/](https://theupskillinglabs.github.io/brandkit/)

## What's Inside

- **Brand Style Guide.dc.html** — The complete brand style guide with:
  - Brand foundations (logo, marks)
  - Color palette (the full 15-token system) and the cover gradient
  - Typography and the mobile → desktop type scale
  - Voice and tone guidelines
  - Background and texture rules
  - Component specifications (buttons, cards, chips, forms, labels)
  - Photography guidelines
  - Social media and slide templates
  - Do's and don'ts
  - AI prompts for creating on-brand materials

- **downloads/** — Files to hand to an AI tool or designer:
  - `brand-brief.txt` — plain-text AI context file
  - `brand-rules.md` — the full brand spec with token tables and code examples
  - `Geologica-VariableFont.ttf` + `OFL.txt` — the brand typeface (OFL licensed)

- **_ds/.../colors_and_type.css** — the design tokens stylesheet the guide runs on:
  every token under its canonical name (`--ink`, `--teal-deep`, `--r` …) plus
  legacy `--tul-*` aliases.

- **support.js** — Powers the interactive features (color copying, prompt copying, hover states).

## Source of truth

The guide mirrors the design system shipped in the OLOS app — `app/globals.css`
in [github.com/TheUpskillingLabs/OLOS](https://github.com/TheUpskillingLabs/OLOS)
is the canonical token source. If the app and this guide ever disagree, the app wins;
update the guide.

Quick facts the guide encodes:

- Light-first: warm paper `#F6F4EF` is the only light page background; dark is reserved for covers, nav bars, and footers.
- One radius: 14px on every rectangular container. No pills.
- One typeface: Geologica, weights 400–700.
- Primary filled CTA: teal-deep `#007882`; the landing "Join The Labs" is red `#E11D2A`.
- Naming: shorten only to "The Labs" — never "TUL".

## For AI Tools

This guide is optimized for AI design systems and Claude Design import. The HTML is
self-contained with inlined CSS and assets for easy distribution and integration.
Start any prompt with `downloads/brand-brief.txt` as context, or use the ready-made
prompts in the guide's AI Prompt Library section.

## GitHub Pages Setup

This repository is configured for GitHub Pages. To enable:

1. Go to repository Settings → Pages
2. Set Source to: Deploy from a branch
3. Select branch: `main` (or your working branch)
4. Directory: `/root` or specific folder
5. Save

The site will be live at `https://theupskillinglabs.github.io/brandkit/`

## Local Development

No build process needed! The HTML is static:

```bash
# Serve with any simple HTTP server
python -m http.server 8000
```

Then navigate to: `http://localhost:8000`

## About The Upskilling Labs

The Upskilling Labs is a citizen R&D community where professionals build real skills
by doing real work with real people. Launched in January 2026 at the DC Public Library,
the format is replicable — designed so any civic community across the US can adopt it.

The Upskilling Labs, Inc. operates as a fiscally sponsored project of Superbloom Design,
a registered 501(c)(3) nonprofit organization. Partners: Levy Strategic Design,
DC Public Library, Superbloom Design. Web: [theupskillinglabs.org](https://theupskillinglabs.org)

### Brand Tagline
"Find your people. Build your edge."

## Contributing

To update the brand guide:

1. Check the OLOS app's `app/globals.css` for the current tokens
2. Edit the HTML file locally and test in your browser
3. Commit with clear messages
4. Push to trigger GitHub Pages rebuild

Changes typically appear within 1-2 minutes.

---

**Questions?** Contact The Upskilling Labs team or check the full guide at the link above.
