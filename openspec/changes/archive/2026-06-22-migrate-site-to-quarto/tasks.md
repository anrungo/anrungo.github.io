## 1. Quarto project + theme

- [x] 1.1 Create `_quarto.yml` (website project: title, navbar, social icons, `output-dir`, `theme: [cosmo, custom.scss]`)
- [x] 1.2 Create `custom.scss` porting Clinical Clean tokens (Inter, emerald #0E9F6E/#0B7D57, light surfaces, shadows, rounded cards, pills, buttons)
- [x] 1.3 Add site assets: copy `images/AntonioRUNGO_photo_2.jpg` and `prototypes/assets/dash-1..3.png` + `carousel.js` into a site `assets/` folder
- [x] 1.4 Verify `quarto render` runs clean with no R engine

## 2. Landing page

- [x] 2.1 Build `index.qmd` hero (avatar-left new photo, headline, real bio subline, skill pills, CTAs)
- [x] 2.2 Add the Dashboards carousel (3 thumbnails + titles/descriptions + "Open dashboard" deep links to `Monitor_Dashboards*.html`)
- [x] 2.3 Wire `carousel.js`; confirm prev/next, dots, keyboard, swipe all work in the rendered page
- [x] 2.4 Screenshot-compare rendered home vs `prototypes/clinical-clean.html`; reconcile differences

## 3. Content pages

- [x] 3.1 `programming.qmd` from `software.Rmd` — skills + IDE logos restyled as cards
- [x] 3.2 `teaching.qmd` from `teaching.Rmd` — invited classes, TA, trainer, SPSS tutorial link
- [x] 3.3 `projects.qmd` — merge `projects.Rmd` + `projects-done.Rmd`, de-duplicate, restyle as project cards
- [x] 3.4 `about.qmd` from `about.Rmd`
- [x] 3.5 `contact.qmd` from `contact.Rmd` (email + socials)
- [x] 3.6 Check every internal/external link resolves; no dead links

## 4. Navbar + dashboards wiring

- [x] 4.1 Configure navbar: Programming · Teaching · Projects · About · Dashboards▾ · Contact + GitHub/LinkedIn/Twitter/email icons
- [x] 4.2 Dashboards dropdown links to the three `Monitor_Dashboards*.html`
- [x] 4.3 Confirm sticky nav + mobile collapse behave correctly

## 5. Build + deploy path

- [x] 5.1 Decide/confirm deploy strategy with owner (render→sync→push vs GitHub Action)
- [x] 5.2 Check the `anrungo.github.io` clone for `CNAME`/`.nojekyll` to preserve
- [x] 5.3 Write a documented sync step/script: render → copy output into `D:\GitHub\anrungo.github.io` (root), preserving `CNAME` + `.nojekyll`, keeping `Monitor_*.html`
- [x] 5.4 Dry-run the sync locally and verify the site opens correctly from the clone (do NOT push)

## 6. Cleanup + verification

- [x] 6.1 Retire old `.Rmd` + `_site.yml` from the build (remove or move aside) once Quarto output is verified
- [x] 6.2 Full render + click-through of every page and the carousel
- [x] 6.3 Hand off: summarize what to commit/push to publish, leaving the push to the owner
