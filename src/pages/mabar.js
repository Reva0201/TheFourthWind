/* ============================================================
   The Fourth Wind — Mabar (club picker)
   Rebuilt 1:1 from the production /mabar page structure.
   ============================================================ */

import { VENUES, rupiah } from "../data.js";
import { icon, page } from "../ui.js";

function hero() {
  return `
  <header class="relative overflow-hidden bg-primary-900 pt-28 pb-12 sm:pt-32">
    <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-5xl px-4 sm:px-6">
      <a class="text-sm font-medium text-white/60 hover:text-white" href="#/">← Halaman depan</a>
      <h1 class="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Mabar — kurang orang bukan alasan batal main</h1>
      <p class="mt-2 max-w-2xl text-white/65">Pilih dulu clubnya, lalu buka meja atau gabung meja yang sudah menunggu. Begitu genap empat, jadwalnya terkunci.</p>
    </div>
  </header>`;
}

/* The picker lists the clubs that have tables waiting, then the rest. */
const CLUBS = VENUES.map((v) => ({
  name: v.name,
  slug: v.slug,
  address: v.address,
  city: v.city,
  waiting: false,
}));

const card = (c) => `
  <a class="group rounded-2xl border border-primary-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
     href="#/venue/${c.slug}/mabar"
     data-search="${[c.name, c.address, c.city].join(" ").toLowerCase()}">
    <div class="flex items-start gap-2">
      <h3 class="flex-1 font-display text-lg font-bold group-hover:text-primary">${c.name}</h3>
    </div>
    <p class="mt-1 line-clamp-2 text-sm text-ink/60">${c.address}</p>
    <p class="mt-2 text-xs font-semibold text-ink/45">${c.city}</p>
  </a>`;

export function mabar() {
  // The picker is alphabetical — the "waiting tables" priority only affects
  // which clubs surface first when some actually have open games.
  const waiting = CLUBS.filter((c) => c.waiting);
  const rest = CLUBS.filter((c) => !c.waiting);
  const shown = (waiting.length ? [...waiting, ...rest] : [...CLUBS].sort((a, b) => a.name.localeCompare(b.name))).slice(0, 12);

  return page({
    title: "Mabar",
    headerVariant: "dark",
    body: `
      ${hero()}
      <main class="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6">
        <section>
          <h2 class="font-display text-2xl font-bold">Pilih club</h2>
          <p class="mt-1 text-sm text-ink/60">Cari dengan nama club, nama jalan, mall, atau daerahnya.</p>

          <div class="relative mt-4">
            <input placeholder="Cari club, alamat, atau daerah…" aria-label="Cari club" data-club-search
              class="w-full rounded-xl border border-primary-100 bg-white py-3.5 pr-4 pl-11 text-base outline-none focus:border-primary" type="search" />
            ${icon.search}
          </div>

          <p class="mt-4 text-xs font-semibold tracking-wide text-ink/45 uppercase">Club dengan meja menunggu, lalu sisanya</p>
          <div class="mt-3 grid gap-3 sm:grid-cols-2" data-club-grid>${shown.map(card).join("")}</div>
          <p class="mt-4 text-sm text-ink/50"><span data-club-count>${88 - shown.length}</span> club lainnya — ketik untuk mencari.</p>
        </section>

        <section class="border-t border-primary-50 pt-10">
          <div class="rounded-2xl border border-dashed px-4 py-10 text-center border-primary-100 text-ink/50">
            <p class="font-semibold">Belum ada meja yang menunggu pemain.</p>
            <p class="mt-1 text-sm">Buka meja pertama — pemain lain akan melihatnya di sini.</p>
            <a class="mt-4 inline-block rounded-xl bg-gold px-5 py-3 font-bold text-primary-900 shadow-soft" href="#/venue/angin-timur-mahjong-club/mabar">Buka meja Mabar</a>
          </div>
        </section>
      </main>
    `,
  });
}
