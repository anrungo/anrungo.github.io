## ADDED Requirements

### Requirement: Quarto website project replaces R Markdown

The site SHALL be built as a Quarto website project (`_quarto.yml`) that renders all pages, replacing the previous `rmarkdown::render_site` / `_site.yml` build.

#### Scenario: Site renders with Quarto

- **WHEN** `quarto render` runs on the project
- **THEN** it produces a complete static site (home + all content pages) without errors and without requiring R

#### Scenario: Old build retired

- **WHEN** the migration is complete
- **THEN** the `.Rmd` sources and `_site.yml` are no longer the build inputs, and the Quarto output is what gets deployed

### Requirement: Clinical Clean theme

The site SHALL implement the "Clinical Clean" visual direction via a custom Quarto theme (Bootstrap 5 + SCSS): Inter typography, a single refined emerald accent (`#0E9F6E` / dark `#0B7D57`), light surfaces, soft shadows and rounded cards.

#### Scenario: Theme tokens applied site-wide

- **WHEN** any page renders
- **THEN** headings/body use Inter, links/accents use the emerald palette, and the look matches the approved prototype (not the old Bootstrap 3 `paper` theme)

#### Scenario: Responsive and accessible

- **WHEN** the site is viewed at mobile and desktop widths
- **THEN** layout reflows cleanly (navbar collapses, hero/cards stack) and text keeps adequate contrast

### Requirement: Navbar with Dashboards menu

The site SHALL provide a sticky top navbar with links to Programming, Teaching, Projects, About, Contact, a Dashboards dropdown, and the social/contact icons.

#### Scenario: Dashboards menu links to dashboards

- **WHEN** the user opens the Dashboards menu
- **THEN** it lists the three monitors and each opens the corresponding `Monitor_Dashboards*.html`

### Requirement: Content pages migrated

All existing content pages SHALL be migrated to `.qmd` preserving their information, restyled in the new theme: Programming (skills + IDE logos), Teaching (classes, training, SPSS tutorial link), Projects (client + personal projects, consolidating the duplicate projects/projects-done), About, Contact.

#### Scenario: No content lost

- **WHEN** a migrated page is compared to its original
- **THEN** all meaningful text, links, and resources are present (or intentionally consolidated), with no dead internal links

#### Scenario: Projects de-duplicated

- **WHEN** the Projects page renders
- **THEN** it contains a single, consolidated list (the former `projects` and `projects-done` are merged, duplicates removed)

### Requirement: Deployable to GitHub Pages

The build SHALL produce output that can be published to the deploy repo (`github.com/anrungo/anrungo.github.io` → antoniorungo.com), with a documented, repeatable step to get rendered output from the source folder into that repo.

#### Scenario: Output lands in deploy repo

- **WHEN** the documented build/deploy step runs
- **THEN** the rendered site is placed in the `anrungo.github.io` clone ready to commit and push, preserving `CNAME`/custom-domain and `.nojekyll`
