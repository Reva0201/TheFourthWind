/* ============================================================
   The Fourth Wind — 404 / "Masuk" placeholder page
   ============================================================ */

import { page, btnGold } from "../ui.js";

export function notFound(kind = "Halaman") {
  const isLogin = kind === "Masuk";

  const heading = isLogin ? "Masuk belum tersambung di demo ini." : "Halaman ini tidak ada.";
  const note = isLogin
    ? "Alur masuk pemilik venue memakai Google OAuth dan tidak termasuk dalam replika statis ini."
    : "Tautan yang Anda buka mungkin sudah pindah, atau memang belum pernah ada.";

  const body = `
    <div class="mx-auto flex max-w-lg flex-col items-center px-4 pt-40 pb-24 text-center sm:pt-48 sm:pb-32">
      <p class="reveal font-display text-7xl font-bold text-gold">404</p>
      <h1 class="reveal mt-4 font-display text-3xl font-bold">${heading}</h1>
      <p class="reveal mt-3 text-ink/65">${note}</p>
      <div class="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
        ${btnGold("Kembali ke beranda", "#/")}
        <a href="#venue" data-scroll="venue" class="rounded-xl border border-primary-200 px-6 py-3.5 font-semibold text-primary transition hover:bg-primary-50">Cari meja</a>
      </div>
    </div>`;

  return page({ title: "Tidak ditemukan", headerVariant: "solid", body });
}
