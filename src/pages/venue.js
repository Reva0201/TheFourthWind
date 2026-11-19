/* ============================================================
   The Fourth Wind — venue page + booking widget
   ============================================================ */

import { VENUES, HOURS, DATES, rupiah, splitPrice, priceForHour } from "../data.js";
import { icon, page } from "../ui.js";

/* ---------- static slot data (deterministic per venue) ---------- */
function roomTypesFor(v) {
  const base = v.room_types[0] === "Meja Manual" ? 55000 : 75000;
  return [
    { id: 1, name: v.room_types[0], capacity: 6, base, tables: 4 },
    { id: 2, name: v.room_types[1] ?? "Ruang VIP", capacity: 6, base: base + 20000, tables: v.table_count > 12 ? 6 : 4 },
  ];
}

const label = (date) => DATES.find((d) => d.value === date) ?? DATES[0];

/* ---------- header band ---------- */
function hero(v) {
  const badge = v.is_open
    ? `<span class="rounded-full px-3 py-1 text-xs font-bold bg-gold text-primary-900">Buka</span>`
    : `<span class="rounded-full px-3 py-1 text-xs font-bold bg-white/15 text-white">Tutup</span>`;

  return `
  <header class="relative overflow-hidden bg-primary-900 pt-28 pb-12 sm:pt-32">
    <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
    <div class="absolute -top-24 -right-24 size-96 rounded-full bg-primary-500/25 blur-3xl" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-5xl px-4 sm:px-6">
      <a class="text-sm font-medium text-white/60 hover:text-white" href="#/">← Semua club</a>
      <div class="mt-3 flex flex-wrap items-start gap-3">
        <h1 class="flex-1 font-display text-3xl font-bold text-white sm:text-4xl">${v.name}</h1>
        ${badge}
      </div>
      <p class="mt-1 text-white/70">${v.address}, ${v.city}</p>
      ${v.description ? `<p class="mt-3 max-w-2xl text-white/60">${v.description}</p>` : ""}
      <p class="mt-4 text-sm text-white/50">Buka ${v.open_label} · minimal booking ${v.min_booking_hours} jam</p>
    </div>
  </header>`;
}

/* ---------- date strip ---------- */
function dateStrip() {
  return `
  <div class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2" role="tablist" aria-label="Pilih tanggal">
    ${DATES.map(
      (d, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-date="${d.value}"
        class="shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
          i === 0 ? "border-primary bg-primary text-white shadow-soft" : "border-primary-100 bg-white hover:border-primary-200"
        }">${d.label}</button>`
    ).join("")}
  </div>`;
}

/* ---------- slot rows ---------- */
function slotSection(v, room, index) {
  const slots = HOURS.map((h) => {
    const price = priceForHour(room.base, h);
    return `<button type="button" data-slot data-room="${room.id}" data-hour="${h}" data-price="${price}"
      class="tnum w-20 shrink-0 rounded-xl border px-2 py-2.5 text-center transition border-primary-100 bg-white hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-soft">
      <span class="block text-sm font-bold">${h}</span>
      <span class="block text-xs">${fmt(price)}</span>
      <span class="mt-0.5 block text-[10px] opacity-70">${room.tables} meja</span>
    </button>`;
  }).join("");

  return `
  <section class="mt-8" data-room-section="${room.id}">
    <div class="flex items-baseline justify-between">
      <h2 class="font-display text-xl font-bold">${room.name}</h2>
      <span class="text-sm text-ink/55">${room.tables} meja</span>
    </div>
    <div class="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2">${slots}</div>
  </section>`;
}

const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);

/* ---------- booking summary ---------- */
function summary(v, room, hour, hours) {
  const unit = priceForHour(room.base, hour);
  const gross = unit * hours;
  const parts = splitPrice(gross, { tax_bp: v.tax_rate_bp, inclusive: true });

  return `
  <div id="ringkasan" class="mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-lift">
    <div class="border-b border-primary-50 bg-cream px-5 py-4">
      <h2 class="font-display text-lg font-bold" data-summary-title>${room.name} · ${hour} · ${hours} jam</h2>
    </div>
    <div class="p-5">
      <div class="flex items-center gap-3">
        <span class="text-sm text-ink/60">Durasi</span>
        <div class="flex items-center gap-2">
          <button type="button" data-dur="-1" aria-label="Kurangi jam"
            class="size-10 rounded-xl border border-primary-100 text-lg font-bold hover:bg-cream">−</button>
          <span class="tnum w-12 text-center font-display text-lg font-bold" data-dur-value>${hours}j</span>
          <button type="button" data-dur="1" aria-label="Tambah jam"
            class="size-10 rounded-xl border border-primary-100 text-lg font-bold hover:bg-cream">+</button>
        </div>
      </div>

      <dl class="tnum mt-5 flex flex-col gap-2 border-t border-primary-50 pt-4 text-sm">
        <div class="flex justify-between"><dt class="text-ink/60">Sewa meja</dt><dd data-line-subtotal>${rupiah(parts.net)}</dd></div>
        <div class="flex justify-between"><dt class="text-ink/60">PB1 (termasuk)</dt><dd data-line-tax>${rupiah(parts.tax)}</dd></div>
        <div class="flex justify-between border-t border-primary-50 pt-2 font-display text-lg font-bold">
          <dt>Total transfer</dt><dd data-line-total>${rupiah(parts.gross)}</dd>
        </div>
      </dl>

      <div class="mt-5 flex flex-col gap-2">
        <label class="flex items-center justify-between gap-3 rounded-xl border border-primary-100 px-4 py-2.5">
          <span class="text-sm text-ink/70">Jumlah pemain</span>
          <select class="bg-transparent font-semibold outline-none">
            ${[1,2,3,4,5,6,7,8].map((n) => `<option value="${n}"${n === 4 ? " selected" : ""}>${n} orang</option>`).join("")}
          </select>
        </label>
        <input placeholder="Nama" class="w-full rounded-xl border border-primary-100 px-4 py-3 outline-none focus:border-primary" />
        <input placeholder="Nomor WhatsApp" inputmode="tel" class="w-full rounded-xl border border-primary-100 px-4 py-3 outline-none focus:border-primary" />
        <input placeholder="Email (kode booking dikirim ke sini)" inputmode="email" type="email"
          class="w-full rounded-xl border border-primary-100 px-4 py-3 outline-none focus:border-primary" />
      </div>

      <a href="#/masuk" class="mt-4 flex min-h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-gold px-4 py-3.5 text-base font-bold text-primary-900 shadow-soft transition hover:bg-gold-light">
        ${icon.google}Masuk dengan Google untuk booking
      </a>
      <p class="mt-3 text-center text-xs text-ink/50">Pembayaran langsung ke rekening club. The Fourth Wind tidak menahan uang Anda.</p>
    </div>
  </div>`;
}

/* ---------- detail strip ---------- */
function details(v) {
  const rows = [
    ["Kebijakan pembatalan", "Sedang — batalkan sampai 6 jam sebelum jadwal, tanpa biaya."],
    ["Pembayaran", "Transfer ke rekening club, dikonfirmasi staf club."],
    ["Jam operasional", v.open_label],
    ["Minimal booking", `${v.min_booking_hours} jam`],
  ];
  return `
  <section class="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
    <div class="rounded-2xl border border-primary-100 bg-white p-6 shadow-soft">
      <h2 class="font-display text-lg font-bold">Sebelum Anda booking</h2>
      <dl class="mt-4 grid gap-4 sm:grid-cols-2">
        ${rows
          .map(
            ([k, val]) => `<div>
              <dt class="text-xs font-semibold tracking-wide text-ink/50 uppercase">${k}</dt>
              <dd class="mt-1 text-sm text-ink/75">${val}</dd>
            </div>`
          )
          .join("")}
      </dl>
    </div>
  </section>`;
}

/* ---------- page ---------- */
export function venue(path) {
  const slug = path.split("/").filter(Boolean).pop();
  const v = VENUES.find((x) => x.slug === slug) ?? VENUES[0];
  const rooms = roomTypesFor(v);

  const html = page({
    title: v.name,
    headerVariant: "dark",
    body: `
      ${hero(v)}
      <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        ${dateStrip()}
        ${rooms.map((r, i) => slotSection(v, r, i)).join("")}
        ${summary(v, rooms[0], "20:00", v.min_booking_hours)}
      </main>
      ${details(v)}
    `,
  });

  // Wire the widget after the router injects the markup.
  window.__pageInit = () => initBooking(v, rooms);
  return html;
}

/* ---------- interactions ---------- */
function initBooking(v, rooms) {
  const state = { roomId: rooms[0].id, hour: "20:00", hours: v.min_booking_hours };

  const room = () => rooms.find((r) => r.id === state.roomId) ?? rooms[0];

  const paint = () => {
    const r = room();
    const unit = priceForHour(r.base, state.hour);
    const parts = splitPrice(unit * state.hours, { tax_bp: v.tax_rate_bp, inclusive: true });

    document.querySelectorAll("[data-slot]").forEach((b) => {
      const on = Number(b.dataset.room) === r.id && b.dataset.hour === state.hour;
      b.classList.toggle("border-primary", on);
      b.classList.toggle("bg-primary", on);
      b.classList.toggle("text-white", on);
      b.classList.toggle("shadow-soft", on);
      b.classList.toggle("border-primary-100", !on);
      b.classList.toggle("bg-white", !on);
      b.setAttribute("aria-pressed", String(on));
    });

    const title = document.querySelector("[data-summary-title]");
    if (title) title.textContent = `${r.name} · ${state.hour} · ${state.hours} jam`;

    set("[data-dur-value]", `${state.hours}j`);
    set("[data-line-subtotal]", rupiah(parts.net));
    set("[data-line-tax]", rupiah(parts.tax));
    set("[data-line-total]", rupiah(parts.gross));

    document.querySelectorAll("[data-dur]").forEach((b) => {
      const next = state.hours + Number(b.dataset.dur);
      b.disabled = next < v.min_booking_hours || next > 8;
      b.classList.toggle("opacity-40", b.disabled);
    });
  };

  const set = (sel, text) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = text;
  };

  document.querySelectorAll("[data-slot]").forEach((b) =>
    b.addEventListener("click", () => {
      state.roomId = Number(b.dataset.room);
      state.hour = b.dataset.hour;
      paint();
      document.getElementById("ringkasan")?.scrollIntoView({ behavior: "smooth", block: "start" });
    })
  );

  document.querySelectorAll("[data-dur]").forEach((b) =>
    b.addEventListener("click", () => {
      const next = state.hours + Number(b.dataset.dur);
      if (next < v.min_booking_hours || next > 8) return;
      state.hours = next;
      paint();
    })
  );

  document.querySelectorAll("[data-date]").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll("[data-date]").forEach((x) => {
        x.classList.remove("border-primary", "bg-primary", "text-white", "shadow-soft");
        x.classList.add("border-primary-100", "bg-white");
        x.setAttribute("aria-selected", "false");
      });
      b.classList.add("border-primary", "bg-primary", "text-white", "shadow-soft");
      b.classList.remove("border-primary-100", "bg-white");
      b.setAttribute("aria-selected", "true");
    })
  );

  paint();
}
