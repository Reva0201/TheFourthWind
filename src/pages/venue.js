/* ============================================================
   The Fourth Wind — venue page
   Two modes, matching the original:
     • bookable  → date strip, hourly slots, booking summary
     • directory → contact card, table/price ranges, waitlist, Mabar
   ============================================================ */

import { VENUES, HOURS, DATES, rupiah, splitPrice, priceForHour } from "../data.js";
import { icon, page } from "../ui.js";

const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);

/* ---------- bookable: slot data ---------- */
function roomsFor(v) {
  return (v.rooms ?? []).map((r, i) => ({ id: i + 1, ...r, capacity: 6 }));
}

/* ---------- shared hero ---------- */
function hero(v) {
  // Three states: bookable (gold "Buka"), listed-but-paused (directory partner),
  // and bare directory listing (partner badge).
  const badge = v.bookable
    ? `<span class="rounded-full px-3 py-1 text-xs font-bold bg-gold text-primary-900">Buka</span>`
    : `<span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">Partner direktori The Fourth Wind</span>`;

  const showBadgeInline = v.bookable;
  const showBadgeAbove = !v.bookable;

  return `
  <header class="relative overflow-hidden bg-primary-900 pt-28 pb-12 sm:pt-32">
    <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
    <div class="absolute -top-24 -right-24 size-96 rounded-full bg-primary-500/25 blur-3xl" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-5xl px-4 sm:px-6">
      <a class="text-sm font-medium text-white/60 hover:text-white" href="#/">← Semua club</a>
      ${showBadgeAbove ? `<div class="mt-3 flex flex-wrap items-center gap-2">${badge}</div>` : ""}
      <div class="mt-3 flex flex-wrap items-start gap-3">
        <h1 class="flex-1 font-display text-3xl font-bold text-white sm:text-4xl">${v.name}</h1>
        ${showBadgeInline ? badge : ""}
      </div>
      <p class="mt-1 text-white/70">${v.address}${v.city && !v.address.includes(v.city) ? `, ${v.city}` : ""}</p>
      ${v.description ? `<p class="mt-3 max-w-2xl text-white/60">${v.description}</p>` : ""}
      ${v.bookable ? `<p class="mt-4 text-sm text-white/50">Buka ${v.open_label} · minimal booking ${v.min_booking_hours} jam</p>` : ""}
    </div>
  </header>`;
}

/* ---------- bookable: date strip ---------- */
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

/* ---------- bookable: slot rows ---------- */
function slotSection(room) {
  const slots = HOURS.map((h) => {
    const price = priceForHour(room.base, h);
    return `<button type="button" data-slot data-room="${room.id}" data-hour="${h}" data-price="${price}" aria-pressed="false"
      class="tnum w-20 shrink-0 rounded-xl border px-2 py-2.5 text-center transition border-primary-100 bg-white hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-soft">
      <span class="block text-sm font-bold">${h}</span>
      <span class="block text-xs">${fmt(price)}</span>
      <span class="mt-0.5 block text-[10px] opacity-70">${room.tables} meja</span>
    </button>`;
  }).join("");

  return `
  <section class="mt-8">
    <div class="flex items-baseline justify-between">
      <h2 class="font-display text-xl font-bold">${room.name}</h2>
      <span class="text-sm text-ink/55">${room.tables} meja</span>
    </div>
    <div class="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2">${slots}</div>
  </section>`;
}

/* ---------- bookable: summary (injected only after a slot is picked) ---------- */
function summaryTemplate() {
  return `
    <div class="border-b border-primary-50 bg-cream px-5 py-4">
      <h2 class="font-display text-lg font-bold" data-summary-title></h2>
    </div>
    <div class="p-5">
      <div class="flex items-center gap-3">
        <span class="text-sm text-ink/60">Durasi</span>
        <div class="flex items-center gap-2">
          <button type="button" data-dur="-1" aria-label="Kurangi jam"
            class="size-10 rounded-xl border border-primary-100 text-lg font-bold hover:bg-cream">−</button>
          <span class="tnum w-12 text-center font-display text-lg font-bold" data-dur-value></span>
          <button type="button" data-dur="1" aria-label="Tambah jam"
            class="size-10 rounded-xl border border-primary-100 text-lg font-bold hover:bg-cream">+</button>
        </div>
      </div>

      <dl class="tnum mt-5 flex flex-col gap-2 border-t border-primary-50 pt-4 text-sm">
        <div class="flex justify-between"><dt class="text-ink/60">Sewa meja</dt><dd data-line-subtotal></dd></div>
        <div class="flex justify-between"><dt class="text-ink/60">PB1</dt><dd data-line-tax></dd></div>
        <div class="flex justify-between border-t border-primary-50 pt-2 font-display text-lg font-bold">
          <dt>Total transfer</dt><dd data-line-total></dd>
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
    </div>`;
}

/* ---------- bookable: rules ----------
   The original page ends at the booking summary — there is no rules card. */

/* ---------- directory-only body ---------- */
function directoryBody(v) {
  const rooms = (v.rooms ?? [])
    .map((r) => {
      const price =
        r.baseMax && r.baseMax !== r.base
          ? `${rupiah(r.base)} – ${rupiah(r.baseMax)}`
          : rupiah(r.base);
      return `<li class="flex items-center justify-between gap-3 rounded-xl border border-primary-50 bg-cream/60 px-4 py-3">
        <span>
          <span class="block font-semibold">${r.name}</span>
          <span class="block text-xs text-ink/55">${r.tables} meja</span>
        </span>
        <span class="tnum shrink-0 text-right text-sm font-semibold">${price}<span class="font-normal text-ink/50">/jam</span></span>
      </li>`;
    })
    .join("");

  /* Venues that have a contact number get a WhatsApp button; the rest get the
     "kontak belum tersedia" line — matching the original's two states. */
  const contact = v.whatsapp
    ? `<a href="https://wa.me/${v.whatsapp}" target="_blank" rel="noreferrer"
         class="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-600">WhatsApp venue</a>`
    : `<p class="text-sm text-ink/60">Kontak venue belum tersedia — datang langsung ke alamat di atas.</p>`;

  return `
  <main class="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-8 sm:px-6">
    <div class="reveal rounded-2xl border border-primary-100 bg-white p-5 shadow-soft">
      <h2 class="font-display text-xl font-bold">Hubungi &amp; datang</h2>
      <div class="mt-4 flex flex-wrap gap-2">${contact}</div>
    </div>

    <div class="reveal rounded-2xl border border-primary-100 bg-white p-5 shadow-soft">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h2 class="font-display text-xl font-bold">Meja &amp; harga</h2>
        <span class="text-sm text-ink/55">${v.table_count} meja</span>
      </div>
      <ul class="mt-3 flex flex-col gap-2">${rooms}</ul>
      <p class="mt-3 text-xs text-ink/50">Harga per meja per jam. Booking online di halaman ini belum aktif — sementara ini hubungi venue langsung, atau tinggalkan nomor di bawah.</p>
    </div>

    <div id="minat" class="reveal scroll-mt-24 overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-lift">
      <div class="relative overflow-hidden bg-primary-900 px-5 py-4">
        <div class="tile-pattern absolute inset-0 opacity-60" aria-hidden="true"></div>
        <h2 class="relative font-display text-lg font-bold text-white">Booking online belum dibuka di venue ini</h2>
        <p class="relative mt-1 text-sm text-white/60">Tinggalkan nomor WhatsApp — kami kabari begitu meja di sini bisa dibooking dari The Fourth Wind.</p>
        <p class="relative mt-2 text-xs text-white/45">Pemilik venue ini: lengkapi rekening bank &amp; harga di menu Pengaturan agar jadwal booking tampil di sini.</p>
      </div>
      <div class="p-5">
        <div class="flex flex-col gap-2">
          <input placeholder="Nama (opsional)" class="w-full rounded-xl border border-primary-100 px-4 py-3 outline-none focus:border-primary" />
          <input placeholder="Nomor WhatsApp" inputmode="tel" maxlength="30" class="w-full rounded-xl border border-primary-100 px-4 py-3 outline-none focus:border-primary" data-minat-phone />
          <button type="button" disabled data-minat-submit
            class="min-h-12 w-full rounded-xl bg-gold px-4 text-sm font-semibold text-primary-900 opacity-40 shadow-soft">Kabari saya</button>
        </div>
      </div>
    </div>

    ${v.showMabar === false ? "" : `<a class="reveal group flex items-center gap-4 rounded-2xl border border-primary-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
       href="#/venue/${v.slug}/mabar">
      <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-900 font-display text-xl font-bold text-gold">4</span>
      <span class="min-w-0 flex-1">
        <span class="block font-display text-lg font-bold group-hover:text-primary">Mabar — cari lawan main</span>
        <span class="block text-sm text-ink/60">Kurang orang? Buka meja atau gabung meja yang menunggu pemain.</span>
      </span>
      <span class="shrink-0 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">Buka meja →</span>
    </a>`}

    <p class="reveal text-center text-sm text-ink/50">
      Pemilik atau pengelola venue ini?
      <a href="mailto:halo@thefourthwind.com" class="font-semibold text-primary hover:underline">Hubungi kami untuk mengaktifkan booking</a>.
    </p>
  </main>

  <div class="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
    <a href="#minat" data-scroll="minat" class="flex w-full items-center justify-between gap-3 rounded-2xl bg-primary-900 px-5 py-3.5 text-left text-white shadow-lift ring-1 ring-white/10">
      <span class="font-bold">Kabari saya saat booking dibuka</span>
    </a>
  </div>`;
}

/* Waitlist form: the button enables only once a number looks usable. */
export function initMinat() {
  const phone = document.querySelector("[data-minat-phone]");
  const submit = document.querySelector("[data-minat-submit]");
  if (!phone || !submit) return;
  phone.addEventListener("input", () => {
    const ok = phone.value.replace(/\D/g, "").length >= 9;
    submit.disabled = !ok;
    submit.classList.toggle("opacity-40", !ok);
  });
}

/* ---------- page ---------- */
export function venue(path) {
  const slug = path.split("/").filter(Boolean).pop();
  const v = VENUES.find((x) => x.slug === slug) ?? VENUES[0];

  if (!v.bookable) {
    window.__pageInit = () => initMinat();
    return page({ title: v.name, headerVariant: "dark", body: `${hero(v)}${directoryBody(v)}` });
  }

  const rooms = roomsFor(v);

  const html = page({
    title: v.name,
    headerVariant: "dark",
    body: `
      ${hero(v)}
      <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        ${dateStrip()}
        ${rooms.map(slotSection).join("")}
      </main>
    `,
  });

  window.__pageInit = () => initBooking(v, rooms);
  return html;
}

/* ---------- bookable interactions ---------- */
function initBooking(v, rooms) {
  const state = { roomId: null, hour: null, hours: v.min_booking_hours };

  const room = () => rooms.find((r) => r.id === state.roomId) ?? rooms[0];
  const chosen = () => state.roomId !== null && state.hour !== null;

  const covered = (roomId, hour) => {
    if (!chosen() || Number(roomId) !== state.roomId) return false;
    const start = HOURS.indexOf(state.hour);
    const idx = HOURS.indexOf(hour);
    return idx >= start && idx < start + state.hours;
  };

  const set = (sel, text) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = text;
  };

  /* The summary is created on first pick and removed again when the day
     changes — the original has no such node in the DOM before that. */
  const ensureSummary = () => {
    let panel = document.getElementById("ringkasan");
    if (panel) return panel;
    panel = document.createElement("div");
    panel.id = "ringkasan";
    panel.className =
      "mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-lift";
    panel.innerHTML = summaryTemplate();
    document.querySelector("main")?.appendChild(panel);
    panel.querySelectorAll("[data-dur]").forEach((b) => b.addEventListener("click", step));
    return panel;
  };

  const step = (e) => {
    if (!chosen()) return;
    const next = state.hours + Number(e.currentTarget.dataset.dur);
    if (next < v.min_booking_hours || next > 8) return;
    if (HOURS.indexOf(state.hour) + next > HOURS.length) return;
    state.hours = next;
    paint();
  };

  const paint = () => {
    const on = chosen();

    if (!on) {
      document.getElementById("ringkasan")?.remove();
      document.querySelectorAll("[data-slot]").forEach((b) => {
        b.classList.remove("border-primary", "bg-primary", "text-white", "shadow-soft");
        b.classList.add("border-primary-100", "bg-white");
        b.setAttribute("aria-pressed", "false");
      });
      return;
    }

    ensureSummary();

    const r = room();
    const unit = priceForHour(r.base, state.hour);
    const parts = splitPrice(unit * state.hours, { tax_bp: v.tax_rate_bp, inclusive: false });

    document.querySelectorAll("[data-slot]").forEach((b) => {
      const active = covered(b.dataset.room, b.dataset.hour);
      b.classList.toggle("border-primary", active);
      b.classList.toggle("bg-primary", active);
      b.classList.toggle("text-white", active);
      b.classList.toggle("shadow-soft", active);
      b.classList.toggle("border-primary-100", !active);
      b.classList.toggle("bg-white", !active);
      b.setAttribute("aria-pressed", String(active));
    });

    set("[data-summary-title]", `${r.name} · ${state.hour} · ${state.hours} jam`);
    set("[data-dur-value]", `${state.hours}j`);
    set("[data-line-subtotal]", rupiah(parts.net));
    set("[data-line-tax]", rupiah(parts.tax));
    set("[data-line-total]", rupiah(parts.gross));

    document.querySelectorAll("[data-dur]").forEach((b) => {
      const next = state.hours + Number(b.dataset.dur);
      b.disabled =
        next < v.min_booking_hours ||
        next > 8 ||
        HOURS.indexOf(state.hour) + next > HOURS.length;
      b.classList.toggle("opacity-40", b.disabled);
    });
  };

  document.querySelectorAll("[data-slot]").forEach((b) =>
    b.addEventListener("click", () => {
      state.roomId = Number(b.dataset.room);
      state.hour = b.dataset.hour;
      paint();
      document.getElementById("ringkasan")?.scrollIntoView({ behavior: "smooth", block: "start" });
    })
  );

  document.querySelectorAll("[data-dur]").forEach((b) => b.addEventListener("click", step));

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

      state.roomId = null;
      state.hour = null;
      paint();
    })
  );

  paint();
}
