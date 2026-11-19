/* ============================================================
   The Fourth Wind — home page
   ============================================================ */

import {
  BRAND, STATS, AREAS, VENUES, ROOM_TYPES, STEPS, FAQ, rupiah,
} from "../data.js";
import {
  icon, page, tileChar, tileDots, tileShineDefs, btnGold, btnGhost,
} from "../ui.js";

const fmtShort = (n) => new Intl.NumberFormat("id-ID").format(n);

/* ---------- hero ---------- */
function hero() {
  return `
  <section class="relative overflow-hidden bg-primary-900 pt-28 pb-24 sm:pt-36 sm:pb-32">
    <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
    <div class="absolute -top-24 -right-24 size-96 rounded-full bg-primary-500/25 blur-3xl" aria-hidden="true"></div>
    <div class="absolute -left-32 bottom-0 size-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true"></div>

    <div class="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <div class="max-w-2xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-light">
          <span class="size-1.5 rounded-full bg-gold"></span>${STATS.venues} club · ${STATS.cities} kota
        </span>
        <h1 class="mt-5 font-display text-4xl leading-[1.05] font-bold text-balance text-white sm:text-5xl lg:text-6xl">
          Meja mahjong siap,<span class="block text-gold">tinggal cari lawannya.</span>
        </h1>
        <p class="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
          Sewa meja per jam di club terdekat. Lihat meja yang benar-benar kosong, kunci jamnya, bayar langsung ke club.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          ${btnGold("Cari meja sekarang", "#venue")}
          ${btnGhost("Kurang orang? Mabar", "#/mabar")}
        </div>
      </div>

      <div class="relative hidden min-h-[430px] lg:block">
        ${tileShineDefs}
        <div class="absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
        <div aria-hidden="true">
          <div class="absolute top-[2%] left-[2%] w-36 -rotate-12 xl:w-40">
            <div class="tile-float-slow drop-shadow-2xl">${tileChar("發", "#0e7c5a")}</div>
          </div>
          <div class="absolute top-[14%] right-[10%] z-10 w-44 rotate-6 xl:w-48">
            <div class="tile-float drop-shadow-2xl">${tileChar("中", "#a0342b")}</div>
          </div>
          <div class="absolute bottom-[4%] left-[22%] w-36 -rotate-[18deg] xl:w-40">
            <div class="tile-float-fast drop-shadow-xl">${tileDots()}</div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- jumbotron / ad slots ---------- */
function adSlots() {
  const card = `
    <a href="#/masuk" class="flex w-[82%] shrink-0 snap-center flex-col justify-center rounded-2xl border-2 border-dashed border-gold/40 bg-white p-5 text-center shadow-soft transition hover:border-gold sm:w-auto">
      <p class="text-xs font-semibold tracking-wider text-gold-dark uppercase">Slot jumbotron</p>
      <p class="mt-2 font-display text-lg leading-snug font-bold">Kartu ini bisa jadi milik club Anda.</p>
      <p class="mt-1.5 text-sm text-ink/60">Tampil paling depan di The Fourth Wind selama periode yang Anda pilih — hanya tiga slot.</p>
      <p class="mt-3 text-sm font-bold text-primary">Pasang iklan club →</p>
    </a>`;
  return `
  <section class="relative z-10 -mt-14 sm:-mt-20" aria-label="Iklan venue">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        ${card}${card}${card}
      </div>
    </div>
  </section>`;
}

/* ---------- areas ---------- */
function areasSection() {
  const chips = AREAS.map((a) => {
    const glyph = a.hanzi
      ? `<span class="grid size-7 shrink-0 place-items-center rounded-lg font-display text-base font-bold bg-primary-900 text-gold">${a.hanzi}</span>`
      : "";
    return `<a class="group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition border-primary-100 bg-white text-ink hover:border-primary hover:bg-primary-50" href="#venue" data-scroll="venue" data-area="${a.slug}">${glyph}${a.name}<span class="tnum text-xs font-bold text-ink/45">${a.count}</span></a>`;
  }).join("");

  return `
  <section class="border-b border-primary-50 bg-white py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <h2 class="font-display text-xl font-bold">Cari club di daerah kamu</h2>
      <p class="mt-1 text-sm text-ink/60">Tidak ada yang menyeberang Jakarta demi satu meja — pilih daerahnya dulu.</p>
      <div class="mt-5 flex flex-wrap gap-2" data-area-list>${chips}</div>
    </div>
  </section>`;
}

/* ---------- stats ---------- */
function statsBar() {
  const cell = (value, label) => `
    <div class="px-2 py-8 text-center">
      <dd class="tnum font-display text-3xl font-bold text-primary sm:text-4xl">${value}</dd>
      <dt class="mt-1 text-xs text-ink/60 sm:text-sm">${label}</dt>
    </div>`;
  return `
  <section class="border-b border-primary-50 bg-white">
    <dl class="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-primary-50 px-4 sm:px-6">
      ${cell(STATS.venues, "Club terdaftar")}
      ${cell(STATS.tables, "Meja siap dibooking")}
      ${cell(STATS.cities, "Kota")}
    </dl>
  </section>`;
}

/* ---------- mabar teaser ---------- */
function mabarBand() {
  return `
  <section id="mabar" class="relative overflow-hidden bg-primary-900 py-16 sm:py-20">
    <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
    <div class="absolute -top-24 -left-24 size-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div class="rounded-2xl border border-dashed px-4 py-10 text-center border-white/15 text-white/50">
        <p class="font-semibold">Belum ada meja yang menunggu pemain.</p>
        <p class="mt-1 text-sm">Buka meja pertama — pemain lain akan melihatnya di sini.</p>
        <a href="#/mabar" class="mt-4 inline-block rounded-xl bg-gold px-5 py-3 font-bold text-primary-900 shadow-soft">Buka meja Mabar</a>
      </div>
    </div>
  </section>`;
}

/* ---------- steps ---------- */
function stepsSection() {
  const items = STEPS.map(
    (s, i) => `
    <li class="reveal rounded-2xl border border-primary-100 bg-white p-6 shadow-soft" style="transition-delay:${i * 90}ms">
      <span class="grid size-11 place-items-center rounded-xl bg-primary-900 font-display text-lg font-bold text-gold">${i + 1}</span>
      <h3 class="mt-4 font-display text-xl font-bold">${s.title}</h3>
      <p class="mt-2 text-ink/65">${s.body}</p>
    </li>`
  ).join("");

  return `
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
    <h2 class="reveal max-w-2xl font-display text-3xl font-bold text-balance sm:text-4xl">
      Dari niat main sampai duduk di meja: 3 langkah.
    </h2>
    <ol class="mt-10 grid gap-5 sm:grid-cols-3">${items}</ol>
  </section>`;
}

/* ---------- venue directory ---------- */
function venueCard(v, i) {
  const badge = v.is_open
    ? `<span class="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold bg-primary-50 text-primary-700">Buka</span>`
    : `<span class="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold bg-ground text-muted">Tutup</span>`;

  const rooms = v.room_types
    .map((r) => `<span class="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-ink/70">${r}</span>`)
    .join("");

  return `
  <a class="reveal group rounded-2xl border border-primary-100 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
     href="#/venue/${v.slug}" data-venue="${v.key}"
     data-search="${[v.name, v.address, v.city, v.description].join(" ").toLowerCase()}"
     style="transition-delay:${(i % 3) * 70}ms">
    <div class="tile-pattern relative grid h-28 place-items-center overflow-hidden rounded-xl bg-primary-800">
      <span class="absolute -top-8 -right-8 size-28 rounded-full bg-primary-500/30 blur-2xl"></span>
      <span class="relative font-display text-4xl font-bold text-gold">${v.name.charAt(0)}</span>
    </div>
    <div class="mt-4 flex items-start gap-2">
      <h3 class="flex-1 font-display text-xl font-bold group-hover:text-primary">${v.name}</h3>
      ${badge}
    </div>
    <p class="mt-1 text-sm text-ink/60">${v.address}, ${v.city}</p>
    <div class="mt-3 flex flex-wrap gap-1.5">${rooms}</div>
    <div class="tnum mt-4 flex items-end justify-between border-t border-primary-50 pt-3">
      <span>
        <span class="text-xs text-ink/50">mulai</span>
        <span class="block font-display text-lg font-bold">${rupiah(v.price_from)}<span class="text-sm font-normal text-ink/50">/jam</span></span>
      </span>
      <span class="text-sm font-semibold text-primary">${v.table_count} meja →</span>
    </div>
  </a>`;
}

function directory() {
  const cards = VENUES.map(venueCard).join("");
  return `
  <section id="venue" class="border-y border-primary-50 bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <h2 class="reveal font-display text-3xl font-bold sm:text-4xl">Club mahjong pilihan di sekitar kamu</h2>
      <p class="reveal mt-2 max-w-2xl text-ink/65">Ketersediaan meja diambil langsung dari sistem masing-masing club — bukan daftar statis.</p>

      <div class="mt-8 max-w-2xl">
        <div class="relative">
          <input placeholder="Cari club, alamat, atau daerah…" aria-label="Cari club" data-venue-search
            class="w-full rounded-xl border border-primary-100 bg-white py-3.5 pr-4 pl-11 text-base outline-none focus:border-primary" type="search" />
          ${icon.search}
        </div>
        <p class="mt-2 text-sm text-ink/55" aria-live="polite" data-venue-hint>Cari dengan nama club, nama jalan, mall, atau daerahnya.</p>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-venue-grid>${cards}</div>
      <p class="mt-6 hidden text-sm text-ink/55" data-venue-empty>Belum ada club yang cocok. Coba kata kunci lain atau kosongkan pencarian.</p>
    </div>
  </section>`;
}

/* ---------- room types ---------- */
function pricing() {
  const cards = ROOM_TYPES.map((r, i) => {
    const featured = !!r.featured;
    return `
    <article class="reveal relative rounded-2xl border p-6 ${
      featured ? "border-primary-900 bg-primary-900 text-white shadow-lift" : "border-primary-100 bg-white shadow-soft"
    }" style="transition-delay:${i * 70}ms">
      ${featured ? `<span class="absolute top-5 right-5 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-primary-900">Paling dicari</span>` : ""}
      <h3 class="font-display text-xl font-bold">${r.name}</h3>
      <p class="tnum mt-3 font-display text-3xl font-bold ${featured ? "text-gold" : "text-gold-dark"}">
        ${rupiah(r.from)}<span class="text-base font-normal ${featured ? "text-white/50" : "text-ink/50"}">/jam</span>
      </p>
      <p class="mt-1 text-sm ${featured ? "text-white/55" : "text-ink/55"}">mulai dari · tersedia di ${r.venues} club</p>
    </article>`;
  }).join("");

  return `
  <section id="harga" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
    <h2 class="reveal font-display text-3xl font-bold sm:text-4xl">Tipe meja &amp; harga</h2>
    <p class="reveal mt-2 max-w-2xl text-ink/65">Harga termurah yang sedang ditawarkan club di The Fourth Wind.</p>
    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${cards}</div>
  </section>`;
}

/* ---------- owner CTA ---------- */
function ownerStrip() {
  return `
  <section class="border-y border-primary-50 bg-white py-12">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
      <div>
        <h2 class="font-display text-2xl font-bold">Punya club mahjong?</h2>
        <p class="mt-1 max-w-xl text-ink/65">Kami bawakan pemainnya, Anda tetap pegang uangnya — pemain transfer langsung ke rekening club.</p>
      </div>
      <a href="#/untuk-pemilik" class="rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-soft transition hover:bg-primary-600">Lihat paket &amp; harga untuk pemilik</a>
    </div>
  </section>`;
}

/* ---------- FAQ ---------- */
function faq() {
  const items = FAQ.map(
    (f, i) => `
    <div class="reveal rounded-2xl border border-primary-100 bg-white shadow-soft" data-faq data-open="false" style="transition-delay:${i * 50}ms">
      <button type="button" aria-expanded="false" class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span class="font-medium">${f.q}</span>
        <span data-faq-glyph class="grid size-7 shrink-0 place-items-center rounded-full bg-primary-50 text-primary transition-transform duration-200">${icon.plus}</span>
      </button>
      <div data-faq-panel class="hidden px-5 pb-5 text-ink/70">${f.a}</div>
    </div>`
  ).join("");

  return `
  <section id="faq" class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
    <h2 class="reveal text-center font-display text-3xl font-bold sm:text-4xl">Pertanyaan yang sering masuk</h2>
    <div class="mt-10 flex flex-col gap-3">${items}</div>
  </section>`;
}

/* ---------- closing CTA ---------- */
function closing() {
  return `
  <section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
    <div class="relative overflow-hidden rounded-2xl bg-primary-900 px-6 py-14 text-center sm:px-12 sm:py-16">
      <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
      <div class="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" aria-hidden="true"></div>
      <div class="relative">
        <h2 class="font-display text-3xl font-bold text-white sm:text-4xl">Malam ini masih ada meja kosong.</h2>
        <p class="mx-auto mt-2 max-w-md text-white/70">Kunci jamnya sebelum diambil orang lain.</p>
        <div class="mt-7">
          <a href="#venue" data-scroll="venue" class="inline-block rounded-xl bg-gold px-6 py-3.5 font-bold text-primary-900 shadow-lift transition hover:bg-gold-light">Booking meja sekarang</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- page ---------- */
export function home() {
  return page({
    title: "Sewa meja mahjong per jam",
    headerVariant: "dark",
    body: `
      ${hero()}
      ${adSlots()}
      ${areasSection()}
      ${statsBar()}
      ${mabarBand()}
      ${stepsSection()}
      ${directory()}
      ${pricing()}
      ${ownerStrip()}
      ${faq()}
      ${closing()}
    `,
  });
}
