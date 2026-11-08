# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static, no-build, no-dependency photography portfolio site (Polish-language) for photographer Wanessa Kistela. Pages: a home page (`index.html`), a portfolio hub (`portfolio.html`), four photo category subpages (`portfolio-biznesowe.html`, `portfolio-reportazowe.html`, `portfolio-artystyczne.html`, `portfolio-rodzinne.html`), a video subpage (`portfolio-video.html`), an FAQ page (`faq.html`), and a Regulamin (terms of service) page (`regulamin.html`). There is no package.json, bundler, linter, or test suite — this is plain HTML/CSS/JS served directly.

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

**Exception:** the nav bar (desktop `<nav id="nav"><ul>` and the `.mobile-nav` overlay) is hardcoded directly into every page's HTML rather than rendered from `CONTENT` — the JS only wires burger-menu/close/scroll behavior onto it. This includes the logo image (`logo/Patrz (3) nav.png`) and the "Zapytaj o sesję" CTA button (`.nav-cta` on desktop, `.mobile-nav-cta` in the overlay). Adding, removing, or relabeling a nav link means editing all 9 HTML files by hand, in two places each (desktop list + mobile overlay list). On `index.html` links are in-page anchors (`#o-mnie`, `#kontakt`, …); on every other page the same links are `index.html#o-mnie` etc.

**Second exception:** `index.html` hardcodes the photo of Wanessa (`photo_of_me/065A3669.jpg`) in two `<img>` tags — the about section and the contact section — instead of taking it from `CONTENT`.

Each page has its own paired CSS file — there is no shared/global stylesheet. All CSS files define an identical `:root` color palette (purple/orange/yellow brand colors) redundantly; keep them in sync if changing the palette.

### index.html / js/index.js / css/index.css

Renders, in order: nav + mobile nav overlay, a hero image carousel (auto-advancing every 3s, with prev/next arrows and dots), an "about" section, a portfolio preview grid (a curated subset of photos — note many entries in `CONTENT.portfolio.photos` are commented out to hand-pick which images show here), a testimonial/"opinions" carousel, a contact section, and a footer.

### portfolio.html / js/portfolio.js / css/portfolio.css

The portfolio **hub** page. Renders a page header ("Chwile, które zostają na zawsze") and five tiles: the four photo categories in a 2×2 CSS grid, plus a full-width "Video" tile below them (`.cat-tile-video`, spans both columns, wider aspect ratio, CSS-drawn play icon). Each tile is a full-bleed cover photo with a purple gradient overlay and a title, linking to its subpage. The inline `background-image` layers the cover over a purple `linear-gradient`, so a tile whose cover file is missing shows the gradient instead of a blank box. **No lightbox on this page.**

`CONTENT.categories` in `js/portfolio.js` defines the tiles — each entry has `title`, `cover` (path to the cover image), `href` (link to the subpage), and optionally `video: true` (applies the video tile styling). To change a cover photo or title, edit this array.

### Category subpages

Four pages, one per category:

| Page | JS | CSS |
|---|---|---|
| `portfolio-biznesowe.html` | `js/portfolio-biznesowe.js` | `css/portfolio-biznesowe.css` |
| `portfolio-reportazowe.html` | `js/portfolio-reportazowe.js` | `css/portfolio-reportazowe.css` |
| `portfolio-artystyczne.html` | `js/portfolio-artystyczne.js` | `css/portfolio-artystyczne.css` |
| `portfolio-rodzinne.html` | `js/portfolio-rodzinne.js` | `css/portfolio-rodzinne.css` |

Each subpage renders: a "← Wróć do Portfolio" back-link, a page header, a masonry photo grid, and a click-to-open lightbox (keyboard arrow keys + Escape supported). Logic is identical across all four — mobile nav, nav shadow on scroll, scroll-reveal, lightbox.

**Photo lists are generated, not hand-edited.** Each subpage's `CONTENT.photos` starts as an empty array and is filled at runtime by fetching `portfolio/<category>/manifest.json`. To add or remove photos: drop images into the matching subfolder (`portfolio/biznesowe/`, `portfolio/reportazowe/`, `portfolio/artystyczne/`, `portfolio/rodzinne/`), then run:

```
node scripts/generate-photo-manifests.js
```

This scans each `portfolio/<category>/` folder and rewrites its `manifest.json` (creating the folder if needed). It picks up every `.jpg/.jpeg/.png/.webp` file, sorted by natural filename order — **including the `[kategoria]-cover.jpg` hub cover**, so the cover photo also appears in that category's gallery (there is no exclusion rule). Never edit `photos: []` in the JS files by hand — it's just a fallback used if the fetch fails. Because the grid loads via `fetch()`, viewing pages via `file://` won't show any photos — serve the directory locally (see "Running / previewing" above) or deploy to a real static host.

### portfolio-video.html / js/portfolio-video.js / css/portfolio-video.css

The "Video" subpage, linked from the fifth hub tile. Same back-link + page-header pattern as the photo subpages, but instead of a masonry grid + lightbox it renders a row of social profile buttons (`CONTENT.socials` — YouTube, TikTok, Facebook) and a grid of embedded videos (`CONTENT.videos`). Not part of the manifest system — `scripts/generate-photo-manifests.js` doesn't touch it.

`CONTENT.videos` is a hand-edited array of `{ url, title }`, where `url` is a link to a **specific video** (not a profile). `toEmbed()` detects the platform from the URL and builds the `<iframe>` src: YouTube `watch?v=`/`youtu.be`/`shorts` (via `youtube-nocookie.com`), TikTok `/video/<id>` (`tiktok.com/player/v1` — the bare video player; don't switch back to `embed/v2`, which embeds the whole TikTok card with description/comments, scrolls inside the 9:16 frame and often won't play), and Facebook videos/reels (`facebook.com/plugins/video.php`). Shorts, TikToks and FB reels get a vertical 9:16 frame; the rest 16:9. Unrecognized URLs are silently skipped. While the array is empty the page shows the `CONTENT.empty` message. The social profile URLs are duplicated from `CONTENT.contact` in `js/index.js` — keep them in sync.

### faq.html / js/faq.js / css/faq.css

An FAQ page, linked from the nav between "Portfolio" and "Opinie". Renders the same page-header pattern as the category subpages (back-link to `index.html`, tag, heading "Często zadawane pytania", subheading), then an accordion of expandable question/answer blocks instead of a photo grid — no lightbox on this page.

`CONTENT.faqs` in `js/faq.js` is an array of `{ q, a }` entries rendered into `.faq-item` blocks. Clicking a question toggles an `.open` class on its `.faq-item` (multiple items can be open at once — no "close others" behavior); CSS animates the answer open/closed via a `grid-template-rows: 0fr → 1fr` transition on `.faq-answer-wrap`, and rotates the `+`/`×` icon. `aria-expanded`/`aria-controls`/`role="region"` are set for accessibility.

**The current `CONTENT.faqs` entries are placeholder copy** (booking, pricing, delivery timeline, session locations, rescheduling, deliverable count, prints/albums) — written to be plausible for a photography business but not verified facts about Wanessa Kistela's actual policies. Replace them with real Q&A before relying on this content in production.

### regulamin.html / js/regulamin.js / css/regulamin.css

A Regulamin (terms of service) page, reachable only via the footer copyright link on every page (see "Footer" note below) — it is **not** in the nav bar or mobile nav overlay on any page. Renders the same page-header pattern as the FAQ/category subpages (back-link to `index.html`, tag, heading "Regulamin", subheading), then a list of content cards instead of an accordion or photo grid.

`CONTENT.sections` in `js/regulamin.js` is an array of `{ title, paragraphs: [...] }` entries rendered into `.regulamin-item` cards (title as `<h2>`, each paragraph as a `<p>`). No accordion/toggle behavior — all sections are always expanded.

**The current `CONTENT.sections` entries are placeholder copy** (booking/deposit, rescheduling/cancellation, delivery timeline, copyright/usage rights, image consent, complaints) — written to be plausible for a photography business but not verified facts about Wanessa Kistela's actual policies or legal terms. Replace them with real, legally-reviewed terms before relying on this content in production.

### Footer

Every page's `CONTENT.footer` string is the plain copyright text `"© 2026 Wanessa Kistela — wszelkie prawa zastrzeżone"`. The render call wraps it in a link to `regulamin.html` (e.g. `js/faq.js`: `` document.getElementById('foot').innerHTML = `<a href="regulamin.html">${C.footer}</a>`; ``) rather than storing markup in `CONTENT.footer` itself — keep new pages' footer render calls consistent with this pattern rather than hardcoding an `<a>` into the content string. The link style (`footer a` / `footer a:hover`) is duplicated in every CSS file alongside the `footer {}` rule, same as the `:root` palette.

### Image assets

- `/logo` — `Patrz (3) nav.png` is the nav logo on every page; the other files are unused variants
- `/carousel` (hero carousel), `/photo_of_me`, `/opinions` — used by the home page
- `/portfolio/*.jpg` (files directly in the `portfolio/` root, not in a subfolder) — the pool for the home page's preview grid (`CONTENT.portfolio.photos` in `js/index.js`, hand-picked by commenting entries in/out). These are **not** part of the manifest system and are not shown on the category subpages.
- `/portfolio/biznesowe/`, `/portfolio/reportazowe/`, `/portfolio/artystyczne/`, `/portfolio/rodzinne/` — category galleries; the cover photo for each hub tile is also stored here (named `[kategoria]-cover.jpg` by convention). As of now only `biznesowe-cover.jpg` exists and the other three category folders contain no photos, so three hub tiles fall back to the plain gradient and three subpages show an empty grid. The Video tile's cover (`portfolio/video/video-cover.jpg`) doesn't exist yet either — drop a file there to replace the gradient.

The ASCII "STRUKTURA FOLDERÓW" comment at the top of `index.html` predates the category subfolders and is out of date — trust this section instead.

## Notes when editing

- Keep the content/logic separation: don't hardcode text or image paths into the HTML files (the nav bar and the `photo_of_me` image on `index.html` are the existing exceptions — see Architecture above).
- All pages (index + portfolio hub + 4 category subpages + video subpage + FAQ + Regulamin) independently duplicate mobile-nav, nav-shadow-on-scroll, and scroll-reveal logic — if fixing a bug in one, check whether the same bug exists in the others.
- Site language is Polish; keep new copy consistent with the existing tone/language.
