/* ============================================================
   The Fourth Wind — Untuk pemilik
   Rebuilt 1:1 from the production /untuk-pemilik markup.
   ============================================================ */

import { STATS, PLANS, rupiah } from "../data.js";
import { page } from "../ui.js";

const UNIT = (p) => (p.price_per_table > 0 ? "per meja / bulan" : "per jam yang dibooking");

function planCard(p, i) {
  const featured = p.key === "full";
  const rows = [
    p.is_listed_publicly ? "Tampil di marketplace The Fourth Wind" : "Website &amp; domain sendiri, tanpa pesaing",
    p.has_pos ? "Termasuk kasir &amp; POS makanan/minuman" : "Booking online &amp; voucher",
  ];
  if (p.min_billable_tables) rows.push(`Minimum ${p.min_billable_tables} meja`);
  if (p.contract_min_months) rows.push(`Kontrak ${p.contract_min_months} bulan`);
  if (p.price_per_table === 0) rows.push('<span class="font-semibold text-gold-dark">Jam perpanjangan tidak pernah ditagih</span>');

  return `
  <div class="reveal flex flex-col rounded-2xl border p-6 ${
    featured ? "border-gold/40 bg-primary-900 text-white shadow-lift" : "border-primary-100 bg-white shadow-soft"
  }" style="transition-delay:${i * 90}ms">
    <h2 class="font-display text-xl font-bold">${p.label}</h2>
    <p class="tnum mt-3 font-display text-3xl font-bold ${featured ? "text-gold" : "text-gold-dark"}">
      ${rupiah(p.price_per_table > 0 ? p.price_per_table : p.service_fee_value)}
    </p>
    <p class="text-sm ${featured ? "text-white/60" : "text-ink/55"}">${UNIT(p)}</p>
    <ul class="mt-5 flex flex-col gap-2 border-t pt-5 text-sm ${featured ? "border-white/10 text-white/75" : "border-primary-50 text-ink/70"}">
      ${rows.map((r) => `<li>${r}</li>`).join("")}
    </ul>
  </div>`;
}

export function owners() {
  return page({
    title: "Untuk pemilik",
    headerVariant: "dark",
    body: `
      <header class="relative overflow-hidden bg-primary-900 pt-28 pb-14 sm:pt-32">
        <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
        <div class="absolute -right-32 bottom-0 size-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-light">Untuk pemilik club</span>
          <h1 class="mt-5 font-display text-4xl font-bold text-balance text-white sm:text-5xl">Punya meja yang sering kosong di jam sepi?</h1>
          <p class="mt-4 text-lg text-white/70">Kami bawakan pemainnya. Anda tetap pegang uangnya — pemain transfer langsung ke rekening club, bukan ke kami.</p>
          <p class="mt-6 text-sm text-white/50">${STATS.venues} club terdaftar di ${STATS.cities} kota</p>
        </div>
      </header>

      <main class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div class="grid gap-5 sm:grid-cols-3">${PLANS.map(planCard).join("")}</div>
        <p class="mt-6 text-sm text-ink/50">Harga di atas adalah harga standar dan bisa dinegosiasikan.</p>

        <div class="mt-12 rounded-2xl border border-primary-100 bg-white p-6 shadow-soft">
          <h2 class="font-display text-2xl font-bold">Bagaimana uangnya mengalir</h2>
          <ol class="mt-4 flex flex-col gap-3 text-ink/70">
            <li>1. Pemain booking meja lewat The Fourth Wind.</li>
            <li>2. Pemain transfer <strong>langsung ke rekening club Anda</strong>. Kami tidak pernah menerima atau menahan uang pemain.</li>
            <li>3. Staf Anda cek rekening, konfirmasi, voucher terbit.</li>
            <li>4. Kami menagih <strong>biaya layanan</strong> ke Anda secara berkala — bukan memotong pembayaran pemain.</li>
          </ol>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-4 border-t border-primary-100 pt-8">
          <a href="mailto:halo@thefourthwind.com" class="rounded-xl bg-gold px-6 py-3.5 font-bold text-primary-900 shadow-soft transition hover:bg-gold-light">Hubungi kami</a>
          <a class="font-semibold text-primary" href="#/">← Kembali ke halaman utama</a>
        </div>
      </main>
    `,
  });
}
