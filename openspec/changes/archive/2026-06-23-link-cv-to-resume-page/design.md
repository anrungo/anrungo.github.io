## Context

The home page is authored in `index.qmd` (Quarto) and rendered to `_site/index.html`. Two links currently target the local file `assets/cv.pdf`:

- Hero CTA (line ~25): `[Download CV](assets/cv.pdf){.btn-cc .ghost target="_blank"}`
- About section (line ~45): `My full CV is available [here](assets/cv.pdf){target="_blank"}.`

Antonio maintains a canonical résumé at `https://anrungo.github.io/resume/` (a published GitHub Pages site). The goal is to point the hero CTA there and drop the redundant About-section sentence.

## Goals / Non-Goals

**Goals:**
- Hero CTA targets `https://anrungo.github.io/resume/` and opens in a new tab.
- Hero button relabelled "Download CV" → "Curriculum Vitae" since it opens a page, not a download.
- About-section CV sentence ("My full CV is available here.") removed entirely.
- Generated site reflects the changes.

**Non-Goals:**
- No change to the résumé page itself (separate repo).
- Not deleting the local `assets/cv.pdf` (left in place as a fallback artifact).
- No styling/layout changes to the hero or buttons.

## Decisions

- **Link to the page (`/resume/`), not the PDF (`/resume/index.pdf`).** Chosen by the user. The résumé page is the maintained, presentable surface; the direct PDF is a secondary artifact. Trade-off: visitors get a web page rather than an immediate download — hence the label change to "Curriculum Vitae".
- **Edit only `index.qmd`, then re-render.** `_site/index.html` is generated output and must not be hand-edited; running `quarto render` regenerates it. Editing the source keeps the single source of truth intact.
- **Keep `target="_blank"`.** Leaving the site to an external page is least disruptive in a new tab.

## Risks / Trade-offs

- [The résumé page could be unavailable/404] → It is already live (verified previously via `https://anrungo.github.io/resume/index.pdf`); the `/resume/` root is the same GitHub Pages site.
- [Forgetting to re-render leaves the deployed site stale] → Tasks include an explicit `quarto render` + deploy step.
- [Label "Curriculum Vitae" is longer than "Download CV"] → Fits the existing ghost-button styling; no layout change expected, but verify visually after render.
