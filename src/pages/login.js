/* ============================================================
   The Fourth Wind — operator sign-in
   Rebuilt 1:1 from app.mahjongqu.com/login: full-bleed dark
   background, brand lockup, white card with email + password.
   ============================================================ */

import { BRAND } from "../data.js";
import { page, tileShineDefs } from "../ui.js";

export function login() {
  return page({
    title: "Masuk",
    headerVariant: "none",
    body: `
      <div class="relative flex min-h-screen flex-col overflow-hidden bg-primary-900">
        <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
        <div class="absolute -top-32 -right-24 size-96 rounded-full bg-primary-500/25 blur-3xl" aria-hidden="true"></div>
        <div class="absolute -bottom-40 -left-32 size-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true"></div>

        <main class="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
          <a href="#/" class="flex items-center gap-2.5">
            <span class="grid size-10 place-items-center rounded-xl bg-gold font-display text-xl font-bold text-primary-900 shadow-soft">${BRAND.mark}</span>
            <span class="font-display text-2xl font-bold text-white">The Fourth<span class="text-gold"> Wind</span></span>
          </a>

          <h1 class="mt-8 font-display text-3xl font-bold text-white">Masuk ke aplikasi venue</h1>
          <p class="mt-2 text-white/60">Untuk pemilik club, kasir, dan tim The Fourth Wind.</p>

          <form class="mt-7 rounded-2xl border border-white/10 bg-white p-6 shadow-lift" onsubmit="event.preventDefault()">
            <label class="block">
              <span class="text-sm font-semibold">Email</span>
              <input autocomplete="username" name="email" type="email"
                class="mt-1.5 w-full rounded-xl border border-primary-100 px-4 py-3 outline-none focus:border-primary" />
            </label>

            <label class="mt-4 block">
              <span class="text-sm font-semibold">Kata sandi</span>
              <input autocomplete="current-password" name="password" type="password"
                class="mt-1.5 w-full rounded-xl border border-primary-100 px-4 py-3 outline-none focus:border-primary" />
            </label>

            <label class="mt-4 flex items-center gap-2.5 text-sm">
              <input type="checkbox" class="size-4 rounded border-primary-200 accent-primary" />
              <span class="text-ink/70">Ingat saya di perangkat ini</span>
            </label>

            <button type="submit"
              class="mt-5 min-h-13 w-full rounded-xl bg-gold text-base font-bold text-primary-900 shadow-soft transition hover:bg-gold-light">
              Masuk
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-white/50">
            Mau booking meja? <a href="#/" class="font-semibold text-gold hover:text-gold-light">The Fourth Wind</a>
          </p>
        </main>
      </div>
    `,
  });
}
