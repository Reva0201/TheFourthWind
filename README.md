# The Fourth Wind

A front-end replica of the mahjong table-booking site, rebuilt under a different brand.
Vanilla ES modules, no framework, no build step for the app itself — only Tailwind for the stylesheet.

## Run it

```bash
npm install
npm run build      # compiles src/app.css -> dist/app.css
node serve.mjs     # http://127.0.0.1:4173
```

Or use any static server; `index.html` is the entry point.

## Structure

```
index.html            shell: fonts + #app + module script
serve.mjs             tiny static server
src/app.css           design tokens (@theme) + utilities (.tile-pattern, .shadow-soft/lift, .reveal, .tile-float)
src/data.js           all content: venues, areas, room types, plans, FAQ, pricing math
src/ui.js             shared primitives: icons, logo lockup, header, footer, tile SVGs, page()
src/app.js            hash router + shared behaviours (header scroll, reveal, FAQ, filters, nav)
src/pages/            one module per screen
assets/logo/          generated SVG lockups (horizontal / stacked / mark × 4 variants)
make-logos.mjs        regenerates assets/logo
```

## Screens

| Route | Page |
|---|---|
| `#/` | Home — hero, jumbotron slots, areas, stats, Mabar band, 3 steps, venue directory, pricing, owner strip, FAQ, closing CTA |
| `#/venue/:slug` | Venue + booking widget (date strip, hourly slots, live price breakdown, duration stepper) |
| `#/mabar` | Club picker for pickup games |
| `#/venue/:slug/mabar` | Per-club Mabar: join tab / open-a-table form |
| `#/untuk-pemilik` | Owner pitch, plans, money flow |
| `#/brand` | Brand kit — colour, type, downloadable lockups |
| `#/privasi`, `#/ketentuan` | Legal, with table of contents |
| `#/masuk` | Operator sign-in |

Section links behave like the original site's anchors: `#harga`, `#faq`, `#venue` deep-link into the home page and highlight the matching nav item.

## Design system

Ported 1:1 from the original stylesheet.

- **Type** — Fraunces (display), Plus Jakarta Sans (UI)
- **Jade** `#052a1f` / `#0e7c5a`, **Brass** `#d4a24c` / `#a97b2c`, cream `#fbf7ef`, ink `#12211c`
- **Motifs** — `.tile-pattern` lattice on every dark band, floating mahjong tiles, 1px hairline borders, `shadow-soft` / `shadow-lift`

## Pricing model

Rates are stored in **basis points**. `splitPrice()` in `src/data.js` mirrors the original: service charge stacks before tax when prices are exclusive, and both are decomposed out of the gross when inclusive.

## Notes

- The replica is static. Booking, transfers, and sign-in are UI only.
- Content was transcribed from the live site's rendered pages; no customer data is included.
