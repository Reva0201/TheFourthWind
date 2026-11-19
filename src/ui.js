/* ============================================================
   The Fourth Wind — shared UI primitives
   ============================================================ */

import { BRAND, NAV } from "./data.js";

/* ---------- icons (1.5–2px stroke, 24px grid) ---------- */
export const icon = {
  search: `<svg viewBox="0 0 24 24" class="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/35" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`,
  close: `<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" class="size-4" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  google: `<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"/><path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5a11 11 0 0 0-9.82 6.05l3.66 2.84c.87-2.6 3.3-4.64 6.16-4.64Z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" class="size-4" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" class="size-4" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" class="size-4" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Z"/></svg>`,
};

/* ---------- brand mark ---------- */
export const logo = (variant = "light") => `
  <span class="flex shrink-0 items-center gap-2.5">
    <span class="grid size-9 place-items-center rounded-xl bg-gold font-display text-lg font-bold text-primary-900 shadow-soft">${BRAND.mark}</span>
    <span data-wordmark class="whitespace-nowrap font-display text-xl font-bold ${variant === "dark" ? "text-white" : "text-ink"}">
      The Fourth<span class="text-gold"> Wind</span>
    </span>
  </span>`;

/* ---------- header ---------- */
export function header({ solid = true, activeNav = null } = {}) {
  const navLinks = NAV.map((n) => {
    const on = n.scroll && n.scroll === activeNav;
    const tone = solid
      ? on
        ? "bg-primary-50 font-bold text-primary-700"
        : "text-ink/70 hover:bg-primary-50 hover:text-ink"
      : on
        ? "bg-white/10 font-bold text-white"
        : "text-white/80 hover:bg-white/10 hover:text-white";
    return `<a data-header-nav ${n.scroll ? `data-scroll="${n.scroll}"` : ""} class="rounded-lg px-3 py-2 transition ${tone}" href="${n.href}">${n.label}</a>`;
  }).join("");

  return `
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-300">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div data-header-bar data-solid="${solid}" class="mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
        solid
          ? "border border-primary-100 bg-white/95 shadow-lift backdrop-blur-md"
          : "border border-white/10 bg-primary-900/25 backdrop-blur-md"
      }">
        <a href="#/" aria-label="${BRAND.name}">${logo(solid ? "light" : "dark")}</a>
        <nav class="ml-4 hidden items-center gap-1 text-sm font-medium lg:flex">${navLinks}</nav>
        <div class="ml-auto flex items-center gap-2">
          <a href="#/masuk" data-header-login class="hidden rounded-xl border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition md:inline-flex ${
            solid ? "border-primary-200 text-primary hover:bg-primary-50" : "border-white/25 text-white hover:bg-white/10"
          }">Pemilik venue? Masuk</a>
          <a href="#venue" data-scroll="venue" class="hidden items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-bold whitespace-nowrap text-primary-900 shadow-soft transition hover:bg-gold-light sm:inline-flex">Cari meja</a>
          <button type="button" aria-label="Menu" aria-expanded="false" data-menu-toggle
            class="grid size-10 place-items-center rounded-xl border lg:hidden ${
              solid ? "border-primary-100 bg-primary-50 text-ink" : "border-white/15 bg-white/10 text-white"
            }">${icon.menu}</button>
        </div>
      </div>
      <div data-menu-panel class="mt-2 hidden overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-lift lg:hidden">
        ${NAV.map((n) => `<a href="${n.href}" class="block border-b border-primary-50 px-5 py-3.5 text-sm font-semibold hover:bg-primary-50">${n.label}</a>`).join("")}
        <a href="#/masuk" class="block border-b border-primary-50 px-5 py-3.5 text-sm font-semibold hover:bg-primary-50">Pemilik venue? Masuk di sini</a>
        <a href="#venue" data-scroll="venue" class="block bg-primary-50 px-5 py-3.5 text-sm font-bold text-primary">Cari meja sekarang</a>
      </div>
    </div>
  </header>`;
}

/* ---------- footer ---------- */
export function footer() {
  return `
  <footer class="relative overflow-hidden bg-primary-900 text-white/70">
    <div class="tile-pattern absolute inset-0 opacity-60" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div>
          <span class="flex shrink-0 items-center gap-2.5">
            <span class="grid size-9 place-items-center rounded-xl bg-gold font-display text-lg font-bold text-primary-900 shadow-soft">${BRAND.mark}</span>
            <span class="font-display text-xl font-bold text-white">The Fourth<span class="text-gold"> Wind</span></span>
          </span>
          <p class="mt-4 max-w-md text-sm">${BRAND.tagline}</p>
          <a href="mailto:${BRAND.email}" class="mt-4 inline-block text-sm font-semibold text-gold hover:text-gold-light">${BRAND.email}</a>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p class="text-sm font-semibold text-white">Sudah terdaftar sebagai pemilik venue?</p>
          <a href="#/masuk" class="mt-3 inline-flex rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-primary-900 shadow-soft transition hover:bg-gold-light">Masuk ke aplikasi</a>
        </div>
      </div>
      <div class="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/50">
        <p>Pembayaran dilakukan langsung ke rekening masing-masing club. The Fourth Wind tidak menerima atau menahan uang pemain.</p>
        <nav class="flex gap-4">
          <a class="hover:text-white" href="#/brand">Brand &amp; logo</a>
          <a class="hover:text-white" href="#/privasi">Kebijakan Privasi</a>
          <a class="hover:text-white" href="#/ketentuan">Ketentuan Layanan</a>
        </nav>
      </div>
    </div>
  </footer>`;
}

/* ---------- page shell ---------- */
export function page({ title, headerVariant = "solid", footerless = false, activeNav = null, body }) {
  document.title = `${title} · The Fourth Wind`;
  const chrome = headerVariant === "none" ? "" : header({ solid: headerVariant === "solid", activeNav });
  const foot = headerVariant === "none" || footerless ? "" : footer();
  return `
    ${chrome}
    ${body}
    ${foot}
  `;
}

/* ---------- mahjong tile SVGs ---------- */
export function tileChar(char, color, extraClass = "") {
  return `
  <svg viewBox="0 0 120 170" class="${extraClass}" role="presentation">
    <rect x="2" y="12" width="116" height="156" rx="16" fill="#c9b98d"/>
    <rect x="2" y="2" width="116" height="156" rx="16" fill="#fdfaf0"/>
    <rect x="2" y="2" width="116" height="156" rx="16" fill="url(#tileShine)"/>
    <text x="60" y="106" text-anchor="middle" font-size="78" font-weight="700" fill="${color}"
      style="font-family:'Noto Sans SC','Microsoft YaHei','PingFang SC',serif">${char}</text>
  </svg>`;
}

export function tileDots() {
  const dots = [[38,48],[82,48],[38,90],[82,90],[38,132],[82,132]];
  return `
  <svg viewBox="0 0 120 170" role="presentation">
    <rect x="2" y="12" width="116" height="156" rx="16" fill="#c9b98d"/>
    <rect x="2" y="2" width="116" height="156" rx="16" fill="#fdfaf0"/>
    ${dots.map(([cx, cy], i) => {
      const c = i % 2 ? "#0e7c5a" : "#a0342b";
      return `<g><circle cx="${cx}" cy="${cy}" r="15" fill="${c}"/><circle cx="${cx}" cy="${cy}" r="7" fill="#fdfaf0" opacity="0.9"/><circle cx="${cx}" cy="${cy}" r="3" fill="${c}"/></g>`;
    }).join("")}
  </svg>`;
}

export const tileShineDefs = `
  <svg width="0" height="0" class="absolute" aria-hidden="true"><defs>
    <linearGradient id="tileShine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.65"/>
      <stop offset="0.45" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#d8ccab" stop-opacity="0.35"/>
    </linearGradient>
  </defs></svg>`;

/* ---------- section heading ---------- */
export const sectionHead = (eyebrow, title, body) => `
  <div class="max-w-2xl">
    ${eyebrow ? `<p class="text-xs font-semibold tracking-widest text-gold-dark uppercase">${eyebrow}</p>` : ""}
    <h2 class="reveal mt-2 font-display text-3xl font-bold sm:text-4xl">${title}</h2>
    ${body ? `<p class="reveal mt-2 text-ink/65">${body}</p>` : ""}
  </div>`;

/* ---------- buttons ---------- */
export const btnGold = (label, href = "#", extra = "") =>
  `<a href="${href}" class="rounded-xl bg-gold px-6 py-3.5 font-bold text-primary-900 shadow-lift transition hover:bg-gold-light ${extra}">${label}</a>`;

export const btnGhost = (label, href = "#", extra = "") =>
  `<a href="${href}" class="rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10 ${extra}">${label}</a>`;
