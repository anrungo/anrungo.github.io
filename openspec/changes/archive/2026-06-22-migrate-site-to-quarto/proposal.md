## Why

Antonio Rungo's site (antoniorungo.com) is an aging R Markdown website (Bootstrap 3 `paper` theme): a wall of justified text, floated avatar, no hero, no motion. We prototyped three modern directions and the owner chose **"Clinical Clean"** (light, Inter, refined emerald accent, avatar-left hero). This change rebuilds the full site in **Quarto** in that direction — modern Bootstrap 5, real theming, and a Dashboards carousel — replacing the R Markdown build.

## What Changes

- Introduce a **Quarto website project** (`_quarto.yml` + custom SCSS theme) implementing the Clinical Clean design tokens (Inter, emerald `#0E9F6E`, light surfaces, soft shadows, rounded cards).
- Rebuild a **modern landing page**: avatar-left hero with the new photo (`AntonioRUNGO_photo_2.jpg`), real bio/role copy, skill pills, CTAs, and a **Dashboards carousel** (lightweight thumbnails deep-linking to the existing `Monitor_*.html`).
- Migrate every content page preserving its content, restyled: **Programming** (was Software — skills/IDE grids), **Teaching**, **Projects** (consolidating the duplicate `projects`/`projects-done`), **About**, **Contact**.
- Keep the three heavy dashboards (`Monitor_Dashboards*.html`) as-is and keep a **Dashboards** navbar menu pointing at them.
- Define how Quarto output reaches the deploy repo so the site can publish (see design). **BREAKING**: the authoring format changes from `.Rmd` (rmarkdown::render_site) to `.qmd` (Quarto); the old `_site.yml` + `.Rmd` build is retired.

## Capabilities

### New Capabilities
- `quarto-site`: Quarto website project that replaces the R Markdown build — theme/SCSS, navbar, content-page migration, render output, and deployment path.
- `landing-page`: Modernized home page with hero and the dashboards carousel.

### Modified Capabilities
<!-- None tracked in openspec/specs yet; this is the first spec'd capability set for the site. -->

## Impact

- **New files**: `_quarto.yml`, `theme.scss` (or `custom.scss`), `index.qmd`, `programming.qmd`, `teaching.qmd`, `projects.qmd`, `about.qmd`, `contact.qmd`, shared carousel/partials, plus the existing `prototypes/assets` thumbnails reused under the site (e.g. `assets/dashboards/`).
- **Retired**: `*.Rmd`, `_site.yml`, and the rmarkdown-generated `*.html` (index/about/contact/projects/software/teaching) — superseded by Quarto output.
- **Unchanged**: `Monitor_Dashboards*.html`, `files/` (CV PDF), the underlying dashboard data.
- **Tooling**: Quarto 1.8.x (installed); no R required (pages are prose/markdown). Thumbnail regeneration still via Playwright (`generate-thumbnails.mjs`).
- **Source vs deploy**: source lives in `d:\IA\My-Site\anrungo.github.io` (nested inside the `d:\IA` git repo, not a clone); deploy target is the real clone `D:\GitHub\anrungo.github.io` → GitHub Pages (github.com/anrungo) → antoniorungo.com. The build/deploy step must bridge these.
