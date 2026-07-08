# publications-section Specification

## Purpose

Defines how Antonio's publications are featured on the site: the book *Building Your Analytics Career Journey* as a slide in the homepage featured-work carousel with a purchase link to Amazon, and the publishing workflow that ships the site from the source folder.

## Requirements

### Requirement: Book featured in the homepage carousel

The homepage SHALL feature *Building Your Analytics Career Journey* as the **first slide** of the existing featured-work carousel (single carousel shared with the dashboard slides). The slide SHALL show the book cover, a kicker label, the book title, and a short description. The section heading SHALL read "Featured work" and keep the `#dashboards` anchor used by the hero CTA. The carousel SHALL be the only place the book appears — no dedicated navbar item or separate section.

#### Scenario: Book slide is first in the carousel

- **WHEN** a visitor views the featured-work carousel on the homepage
- **THEN** the first slide shows the book (cover, kicker, title, description) followed by the three dashboard slides, with four indicator dots

#### Scenario: Dashboards remain in the carousel

- **WHEN** the visitor navigates the carousel past the book slide
- **THEN** the three dashboard slides are present and behave as before

### Requirement: Navbar unchanged

The site navbar SHALL keep its original items (Programming, Teaching, Projects, Dashboards, Contact) with no "Book" entry — the author decided the navbar item was redundant with the book being the first carousel slide.

#### Scenario: Navbar order

- **WHEN** any page of the site is rendered
- **THEN** the navbar items appear in the order: Programming, Teaching, Projects, Dashboards, Contact (no "Book" item)

### Requirement: Purchase link to Amazon

The book slide SHALL include a "Buy on Amazon" link pointing to the clean product URL `https://www.amazon.com/dp/B0DS57FNZV` (no search/tracking query parameters), opening in a new tab.

#### Scenario: Visitor follows the purchase link

- **WHEN** a visitor clicks "Buy on Amazon" on the book slide
- **THEN** the Amazon product page for ASIN B0DS57FNZV opens in a new browser tab

### Requirement: Portrait cover rendered without cropping

The book cover image SHALL be produced from the author's original cover file (`Cover.pdf`, front cover extracted from the print spread) and displayed in full (portrait orientation, not cropped) within the slide's image slot, on both desktop and mobile layouts.

#### Scenario: Cover display on desktop

- **WHEN** the book slide is viewed on a desktop-width viewport
- **THEN** the entire cover is visible (no cropping of title or author text) inside the image slot

#### Scenario: Cover display on mobile

- **WHEN** the book slide is viewed on a viewport narrower than 720px (single-column slide layout)
- **THEN** the entire cover remains visible and the slide layout stacks image above text

### Requirement: Publishing from the source folder

The project SHALL be publishable with a single command from the source folder (`publish.ps1`): render the site with Quarto and deploy the rendered output to the `master` branch of `anrungo/anrungo.github.io` without deleting content that does not originate from this project (`resume/`, `CNAME`, `.nojekyll`, `robots.txt`). The source SHALL be version-controlled on a `source` branch of the same repository.

#### Scenario: One-command publish

- **WHEN** the author runs `.\publish.ps1` from the source folder
- **THEN** the site is rendered, committed to `master`, and pushed — with `resume/`, `CNAME`, `.nojekyll` and `robots.txt` preserved

#### Scenario: No manual copy step

- **WHEN** the author publishes an update
- **THEN** no manual copying to `D:\GitHub\anrungo.github.io` is required
