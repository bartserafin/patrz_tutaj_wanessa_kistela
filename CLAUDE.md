# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static, no-build, no-dependency photography portfolio site (Polish-language) for photographer Wanessa Kistela. Pages: a home page (`index.html`), a portfolio hub (`portfolio.html`), and four category subpages (`portfolio-biznesowe.html`, `portfolio-reportazowe.html`, `portfolio-artystyczne.html`, `portfolio-rodzinne.html`). There is no package.json, bundler, linter, or test suite — this is plain HTML/CSS/JS served directly.

## Running / previewing

There is no build step. Open `index.html` directly in a browser, or serve the directory with any static file server, e.g.:

```
npx serve .
```

or Python's built-in server:

```
python -m http.server
```

Since the site uses relative image paths, viewing via a local server (rather than `file://`) is closer to production behavior.

## Architecture

Each page follows a strict **content/logic split**:

- The `.html` file is a nearly empty shell of section containers with `id`s (e.g. `#hHero`, `#pGrid`, `#opTrack`) and has no hardcoded copy or image lists.
- The corresponding `.js` file (`js/index.js` for `index.html`, `js/portfolio.js` for `portfolio.html`) defines a single `CONTENT` object at the top containing **all text and image references** for that page, then imperatively renders it into the DOM via `innerHTML`/`textContent` assignments keyed off those element `id`s.

**This means all copy edits (text, headings, image lists, contact info) should be made in the `CONTENT` object inside the relevant JS file — not in the HTML.** The HTML files themselves carry a comment reminding of this.

Each page has its own paired CSS file — there is no shared/global stylesheet. All CSS files define an identical `:root` color palette (purple/orange/yellow brand colors) redundantly; keep them in sync if changing the palette.

### index.html / js/index.js / css/index.css

Renders, in order: nav + mobile nav overlay, a hero image carousel (auto-advancing every 3s, with prev/next arrows and dots), an "about" section, a portfolio preview grid (a curated subset of photos — note many entries in `CONTENT.portfolio.photos` are commented out to hand-pick which images show here), a testimonial/"opinions" carousel, a contact section, and a footer.

### portfolio.html / js/portfolio.js / css/portfolio.css

The portfolio **hub** page. Renders a page header ("Chwile, które zostają na zawsze") and four category tiles in a 2×2 CSS grid. Each tile is a full-bleed cover photo with a purple gradient overlay and a category title, linking to its category subpage. **No lightbox on this page.**

`CONTENT.categories` in `js/portfolio.js` defines the four tiles — each entry has `title`, `cover` (path to the cover image), and `href` (link to the subpage). To change a cover photo or title, edit this array.

### Category subpages

Four pages, one per category:

| Page | JS | CSS |
|---|---|---|
| `portfolio-biznesowe.html` | `js/portfolio-biznesowe.js` | `css/portfolio-biznesowe.css` |
| `portfolio-reportazowe.html` | `js/portfolio-reportazowe.js` | `css/portfolio-reportazowe.css` |
| `portfolio-artystyczne.html` | `js/portfolio-artystyczne.js` | `css/portfolio-artystyczne.css` |
| `portfolio-rodzinne.html` | `js/portfolio-rodzinne.js` | `css/portfolio-rodzinne.css` |

Each subpage renders: a "← Wróć do Portfolio" back-link, a page header, a masonry photo grid, and a click-to-open lightbox (keyboard arrow keys + Escape supported). Logic is identical across all four — mobile nav, nav shadow on scroll, scroll-reveal, lightbox.

To add photos to a category: drop images into the matching subfolder (`portfolio/biznesowe/`, `portfolio/reportazowe/`, `portfolio/artystyczne/`, `portfolio/rodzinne/`) and add their relative paths to the `photos: []` array in the corresponding JS file.

### Image assets

- `/logo`, `/carousel` (hero carousel), `/photo_of_me`, `/opinions` — used by the home page
- `/portfolio/biznesowe/`, `/portfolio/reportazowe/`, `/portfolio/artystyczne/`, `/portfolio/rodzinne/` — category galleries; the cover photo for each hub tile is also stored here (named `[kategoria]-cover.jpg` by convention)

## Notes when editing

- Keep the content/logic separation: don't hardcode text or image paths into the HTML files.
- All pages (index + portfolio hub + 4 category subpages) independently duplicate mobile-nav, nav-shadow-on-scroll, and scroll-reveal logic — if fixing a bug in one, check whether the same bug exists in the others.
- Site language is Polish; keep new copy consistent with the existing tone/language.
