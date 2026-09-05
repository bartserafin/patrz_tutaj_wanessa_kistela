# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static, no-build, no-dependency photography portfolio site (Polish-language) for photographer Wanessa Kistela. Two pages: a home page (`index.html`) and a full portfolio gallery (`portfolio.html`). There is no package.json, bundler, linter, or test suite — this is plain HTML/CSS/JS served directly.

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

Each page has its own paired CSS file (`css/index.css`, `css/portfolio.css`) — there is no shared/global stylesheet. Both define an identical `:root` color palette (purple/orange/yellow brand colors) redundantly; keep them in sync if changing the palette.

### index.html / js/index.js

Renders, in order: nav + mobile nav overlay, a hero image carousel (auto-advancing every 3s, with prev/next arrows and dots), an "about" section, a portfolio preview grid (a curated subset of photos — note many entries in `CONTENT.portfolio.photos` are commented out to hand-pick which images show here), a testimonial/"opinions" carousel, a contact section, and a footer.

### portfolio.html / js/portfolio.js

Renders the full photo grid (all images in `CONTENT.photos`, uses `portfolio-grid` from index for the curated preview) as a masonry-style gallery with lazy-loaded images, plus a click-to-open lightbox (keyboard arrow keys + Escape supported).

Both pages independently implement: mobile nav burger/overlay toggling, a nav drop-shadow on scroll, and scroll-reveal animations via `IntersectionObserver` on elements with the `.reveal` class (staggered via `.delay-1`/`.delay-2` classes or an inline `transitionDelay`).

### Image assets

Top-level folders hold source photos by purpose: `/logo`, `/carousel` (hero carousel), `/photo_of_me`, `/portfolio` (full gallery — also the source for the home page's curated preview), `/opinions` (testimonial photos). Filenames are raw camera export names (e.g. `065A1592-2.jpg`) — when adding new photos, drop them in the appropriate folder and reference the relative path from the corresponding `CONTENT` object.

## Notes when editing

- Keep the content/logic separation: don't hardcode text or image paths into the HTML files.
- Both pages duplicate mobile-nav, nav-shadow-on-scroll, and scroll-reveal logic in their respective JS files rather than sharing a common script — if fixing a bug in one, check whether the same bug exists in the other file's copy.
- Site language is Polish; keep new copy consistent with the existing tone/language.
