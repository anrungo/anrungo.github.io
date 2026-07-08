## Context

Current site: R Markdown (`rmarkdown::render_site`, `_site.yml`, Bootstrap 3 `paper`). Pages: index, software, teaching, projects, projects-done (near-duplicate of projects), about, contact, plus a Dashboards navbar menu → three large standalone HTML files (`Monitor_Dashboards.html`, `_Abertura`, `_PT`, 20–32 MB each).

Approved direction: **Clinical Clean** (validated prototype in `prototypes/clinical-clean.html`): Inter, emerald `#0E9F6E`/`#0B7D57`, light `#f5f8f6`/white, soft shadows, rounded cards, avatar-left hero, thumbnail carousel.

Environment: Quarto 1.8.24 installed; **no R on PATH** (fine — pages are prose). Node + Playwright available for thumbnails. Thumbnails already generated in `prototypes/assets/dash-1..3.png`. New avatar: `images/AntonioRUNGO_photo_2.jpg`.

Git topology (important): source folder `d:\IA\My-Site\anrungo.github.io` is **nested inside the `d:\IA` git repo** (not a clone of the site). The real deploy clone is `D:\GitHub\anrungo.github.io` (remote `github.com/anrungo/anrungo.github.io`, GitHub Pages → antoniorungo.com).

## Goals / Non-Goals

**Goals:**
- A Quarto website matching the Clinical Clean prototype, all pages migrated, dashboards carousel on home.
- Render without R; keep the heavy dashboards untouched and linkable.
- A clear, repeatable path to deploy the rendered output to the GitHub Pages repo.

**Non-Goals:**
- No redesign of the dashboards themselves.
- No new content writing beyond consolidating/cleaning existing copy.
- No dynamic backend, CMS, or analytics in this change.
- Not committing/pushing to production automatically — deploy step is prepared and documented; the owner approves the push.

## Decisions

**1. Quarto website project with a custom SCSS theme.**
`_quarto.yml` defines `project: type: website`, navbar, and `theme: [cosmo, custom.scss]` (cosmo as a clean Bootstrap 5 base, overridden by `custom.scss` carrying the Clinical Clean tokens ported from the prototype CSS). Rationale: SCSS variables + a small rules layer reproduce the prototype without fighting a heavy preset. Alternative: a bare `theme: custom.scss` — viable but more from-scratch; cosmo gives sane defaults.

**2. Hero + carousel as raw HTML inside `index.qmd`.**
Port the prototype's hero and carousel markup into `index.qmd` (Quarto passes through HTML), with `carousel.js` and thumbnails moved under a site asset folder (e.g. `assets/`). Rationale: the prototype is already approved and self-contained; reuse beats rebuilding in shortcodes. The carousel JS stays vanilla.

**3. Reuse existing thumbnails; keep the generator.**
Copy `prototypes/assets/dash-*.png` into the site assets and keep `generate-thumbnails.mjs` (repointed) for future refreshes. Rationale: avoid regenerating unless dashboards change.

**4. Page mapping.**
`index.qmd` (home/hero/carousel + short bio), `programming.qmd` (was software — skills + IDE logo grids, modernized into cards), `teaching.qmd`, `projects.qmd` (merge `projects` + `projects-done`), `about.qmd`, `contact.qmd`. Navbar: Programming · Teaching · Projects · About · Dashboards▾ · Contact + social icons. Rationale: preserve the existing IA while dropping the duplicate.

**5. Deploy strategy — render in source, sync to the clone, push (recommended).**
Quarto `output-dir` renders the site; a documented step copies the rendered output into `D:\GitHub\anrungo.github.io`, preserving `CNAME`/custom domain and adding `.nojekyll`, then the owner commits & pushes. Rationale: matches today's pattern (repo holds rendered HTML), keeps `.qmd` source in the owner's chosen source folder, no CI to configure. Alternatives considered: (a) move the whole Quarto project into the GitHub clone and develop there — rejected, owner wants to work in the IA folder; (b) push `.qmd` sources and render via a GitHub Action — more robust long-term but adds CI/secrets setup and changes the repo contents. **This is the one decision worth confirming with the owner before building the deploy step.**

## Risks / Trade-offs

- **Source/deploy split is error-prone** (we already churned on wrong folders) → make the sync step a single scripted command with explicit source and destination paths; never auto-push.
- **`output-dir` vs repo layout**: GitHub Pages for `user.github.io` serves from repo root on `master`/`main` → render output must map to the clone's root; preserve `CNAME` and `.nojekyll`. Mitigate by scripting the copy and verifying these files survive.
- **Custom domain / CNAME**: if a `CNAME` file exists in the deploy repo, it must be preserved on every deploy → include in the sync step's keep-list.
- **Heavy dashboards in repo**: they already live in the deploy repo; keep them, don't re-render.
- **SCSS drift from prototype** → port tokens 1:1 from the prototype CSS and screenshot-compare the rendered home vs `prototypes/clinical-clean.html`.
- **No R**: if any page secretly needs R execution, render fails → pages are confirmed prose-only; set `engine: markdown`/no execution to be safe.

## Open Questions

- Confirm deploy strategy (recommended: render→sync→push vs GitHub Action).
- Does the deploy repo currently have a `CNAME` for antoniorungo.com (to preserve)? Verify during apply.
- Keep an `About` page separate, or fold it into the home? Default: keep separate (preserves nav), but home carries a short bio.
