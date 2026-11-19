# The Fourth Wind

A front-end replica of the mahjong table-booking site, rebuilt under a different brand.
Vanilla ES modules, no framework — only Tailwind for the stylesheet.

## Run it

```bash
npm install
npm run build      # compiles src/app.css -> dist/app.css
node serve.mjs     # http://127.0.0.1:4173
```

Or use any static server; `index.html` is the entry point.

## Structure

```
index.html            shell: fonts, #app, module script
serve.mjs             tiny static server (no deps)
src/app.css           design tokens (@theme) + utilities (.tile-pattern, .shadow-soft/lift, .reveal, .tile-float)
src/data.js           shared content: areas, room types, steps, FAQ, plans, pricing math
src/venues.js         generated: 88 clubs (5 listed, 3 bookable) — do not edit by hand
src/ui.js             primitives: icons, logo lockup, header, footer, tile SVGs, page()
src/app.js            hash router + behaviours (header scroll, reveal, filters, nav, deep links)
src/pages/            one module per screen
assets/logo/          generated SVG lockups (horizontal / stacked / mark × 4 variants)
assets/banner/        generated venue cover illustrations
```

### Generator scripts

| Script | Output |
|---|---|
| `build-venues.mjs` | `src/venues.js` from `venue-raw.json` |
| `make-logos.mjs` | `assets/logo/*.svg` |
| `make-banners.mjs` | `assets/banner/*.svg` |
| `set-mabar.mjs` | per-venue Mabar flag in `venue-raw.json` |

## Screens

| Route | Page |
|---|---|
| `#/` | Home — hero, ad slots, areas, stats, Mabar band, 3 steps, 88-club directory, pricing, owner strip, FAQ, closing CTA |
| `#/venue/:slug` | Venue. Bookable clubs get the date strip + hourly slots; directory clubs get contact, price ranges, waitlist and Mabar |
| `#/mabar` | Club picker for pickup games |
| `#/venue/:slug/mabar` | Per-club Mabar: join tab / open-a-table form |
| `#/untuk-pemilik` | Owner pitch, three plans, money flow |
| `#/brand` | Brand kit — colour, type, downloadable lockups with PNG rasterisation |
| `#/privasi`, `#/ketentuan` | Legal, with table of contents |
| `#/masuk` | Operator sign-in (email + password, full-bleed dark) |

Section links behave like the original's anchors: `#harga`, `#faq` and `#venue` deep-link into the home page and highlight the matching nav item.

## Design system

Ported from the original stylesheet.

- **Type** — Fraunces (display), Plus Jakarta Sans (UI)
- **Jade** `#052a1f` / `#0e7c5a`, **Brass** `#d4a24c` / `#a97b2c`, cream `#fbf7ef`, ink `#12211c`
- **Motifs** — `.tile-pattern` lattice on dark bands, floating mahjong tiles, hairline borders, `shadow-soft` / `shadow-lift`

## Booking model

Only three of the 88 clubs accept online booking. The summary panel is created on the first slot pick and removed again when the day changes — the original has no such node before that.

Rates are in **basis points**. `splitPrice()` in `src/data.js` models:

- service charge stacked before tax when prices are exclusive
- both decomposed out of the gross when inclusive

Venue prices are exclusive, so a 2-hour `Rp 150.000` booking yields `PB1 Rp 15.000` and `Total transfer Rp 165.000`.

## Fidelity check

Measured against the live site at ~1000px viewport:

| Page | Height (real → replica) |
|---|---|
| Home | 19312 → 19312 |
| Mabar | 2044 → 2044 |
| Untuk pemilik | 1640 → 1640 |
| Venue (bookable) | 1153 → 1153 |
| Masuk | 700 → 700 |

Remaining differences are sub-100px text wrapping on the legal pages.

## Not built

`/kota/:slug` (15 city pages), `/booking/:code`, `/booking-saya`, `/venue/:key/kompetisi/:id`, and `/brand/:key`.

## Notes

- The replica is static. Booking, transfers and sign-in are UI only.
- Content was transcribed from the live site's rendered pages. Illustrations are generated, not photographs of real premises.
