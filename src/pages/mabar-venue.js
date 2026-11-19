/* ============================================================
   The Fourth Wind — per-club Mabar (join / open a table)
   Rebuilt 1:1 from /venue/{key}/mabar: segmented tabs + form.
   ============================================================ */

import { VENUES, HOURS, DATES } from "../data.js";
import { icon, page } from "../ui.js";

export function mabarVenue(path) {
  const slug = path.split("/").filter(Boolean)[1];
  const v = VENUES.find((x) => x.slug === slug) ?? VENUES[0];

  const field = (label, inner, hint = "") => `
    <label class="block">
      <span class="text-sm font-semibold">${label}</span>
      ${inner}
      ${hint ? `<span class="mt-1 block text-xs text-ink/50">${hint}</span>` : ""}
    </label>`;

  const input = (attrs) =>
    `<input class="mt-1.5 w-full rounded-xl border border-primary-100 bg-white px-4 py-3 text-base outline-none focus:border-primary" ${attrs} />`;

  const select = (name, options) =>
    `<select name="${name}" class="mt-1.5 w-full rounded-xl border border-primary-100 bg-white px-4 py-3 text-base outline-none focus:border-primary">${options}</select>`;

  return page({
    title: `Mabar · ${v.name}`,
    headerVariant: "dark",
    body: `
      <header class="relative overflow-hidden bg-primary-900 pt-28 pb-12 sm:pt-32">
        <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-2xl px-4 sm:px-6">
          <a class="text-sm font-medium text-white/60 hover:text-white" href="#/venue/${v.slug}">← ${v.name}</a>
          <h1 class="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Mabar — cari lawan main</h1>
          <p class="mt-2 text-white/65">Mahjong butuh empat. Kurang orang? Buka meja atau gabung yang sudah menunggu — begitu genap empat, jadwal terkunci.</p>
        </div>
      </header>

      <main class="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-8 sm:px-6">
        <div class="flex gap-1 rounded-xl bg-primary-50 p-1" role="tablist">
          <button type="button" data-mtab="join" aria-selected="true"
            class="min-h-11 flex-1 rounded-lg text-sm font-bold transition bg-white text-primary-700 shadow-soft">Gabung meja (0)</button>
          <button type="button" data-mtab="open" aria-selected="false"
            class="min-h-11 flex-1 rounded-lg text-sm font-bold transition text-ink/60">Buka meja baru</button>
        </div>

        <section data-mpanel="join">
          <div class="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-soft">
            <p class="font-semibold">Belum ada meja yang menunggu.</p>
            <p class="mt-1 text-sm text-ink/60">Jadilah yang pertama — buka meja dan biarkan pemain lain menemukanmu.</p>
            <button type="button" data-mtab-go="open" class="mt-4 rounded-xl bg-gold px-5 py-3 font-bold text-primary-900 shadow-soft">Buka meja baru</button>
          </div>
        </section>

        <section data-mpanel="open" class="hidden">
          <form class="flex flex-col gap-4 rounded-2xl border border-primary-100 bg-white p-5 shadow-soft" onsubmit="return false">
            ${field("Nomor WhatsApp", input('placeholder="0812…" inputmode="tel" name="phone"'))}

            <div>
              <p class="text-sm font-semibold">Berapa orang rombonganmu?</p>
              <div class="mt-1.5 grid grid-cols-3 gap-1.5">
                ${[1, 2, 3]
                  .map(
                    (n) => `<button type="button" data-party="${n}"
                      class="min-h-11 rounded-xl border text-sm font-bold transition ${
                        n === 1 ? "border-primary bg-primary-50 text-primary-700" : "border-primary-100"
                      }">${n} orang</button>`
                  )
                  .join("")}
              </div>
              <p class="mt-1.5 text-xs text-ink/50">Sudah berempat? Langsung <a href="#/venue/${v.slug}" class="font-semibold text-primary">booking meja biasa</a>.</p>
            </div>

            <div>
              <p class="text-sm font-semibold">Kategori main</p>
              <div class="mt-1.5 grid grid-cols-2 gap-1.5">
                <button type="button" data-cat="biasa"
                  class="rounded-xl border border-primary bg-primary-50 px-3 py-3 text-left text-sm font-semibold text-primary-700">
                  Main Biasa<span class="mt-0.5 block text-xs font-normal opacity-70">Santai, semua level welcome</span>
                </button>
                <button type="button" data-cat="poin"
                  class="rounded-xl border border-primary-100 px-3 py-3 text-left text-sm font-semibold">
                  Main Poin<span class="mt-0.5 block text-xs font-normal opacity-70">Serius, pakai hitungan poin</span>
                </button>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              ${field("Tanggal", select("play_date", DATES.map((d) => `<option value="${d.value}">${d.label}</option>`).join("")))}
              ${field("Jam mulai", select("start_label", HOURS.filter((h) => h >= "19:00").map((h) => `<option>${h}</option>`).join("")))}
            </div>

            ${field(
              "Main berapa jam?",
              select("hours", [1, 2, 3, 4, 5, 6, 7, 8].filter((n) => n >= (v.min_booking_hours ?? 1)).map((n) => `<option>${n} jam</option>`).join(""))
            )}

            <div>
              <p class="text-sm font-semibold">Main rutin tiap minggu?</p>
              <div class="mt-1.5 grid grid-cols-4 gap-1.5">
                ${[1, 2, 4, 8]
                  .map(
                    (n) => `<button type="button" data-weeks="${n}"
                      class="min-h-11 rounded-xl border text-sm font-bold transition ${
                        n === 1 ? "border-primary bg-primary-50 text-primary-700" : "border-primary-100"
                      }">${n === 1 ? "Sekali" : `${n} minggu`}</button>`
                  )
                  .join("")}
              </div>
              <p class="mt-1.5 text-xs text-ink/50">Meja yang sama dibuka untuk beberapa minggu ke depan — jam dan harinya sama, tiap minggu terisi sendiri-sendiri.</p>
            </div>

            <button type="submit" class="mt-1 w-full rounded-xl bg-gold px-5 py-3.5 font-bold text-primary-900 shadow-soft transition hover:bg-gold-light">
              Buka meja Mabar
            </button>
            <p class="text-center text-xs text-ink/50">Meja Mabar ditagih di kasir club saat Anda datang, bukan di muka.</p>
          </form>
        </section>
      </main>
    `,
  });
}

/* tab + option-pill behaviour, re-run after each route render */
export function initMabar() {
  const tabs = document.querySelectorAll("[data-mtab]");
  if (!tabs.length) return;

  const activate = (name) => {
    tabs.forEach((t) => {
      const on = t.dataset.mtab === name;
      t.setAttribute("aria-selected", String(on));
      t.classList.toggle("bg-white", on);
      t.classList.toggle("text-primary-700", on);
      t.classList.toggle("shadow-soft", on);
      t.classList.toggle("text-ink/60", !on);
    });
    document.querySelectorAll("[data-mpanel]").forEach((p) => {
      p.classList.toggle("hidden", p.dataset.mpanel !== name);
    });
  };

  tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.mtab)));
  document.querySelectorAll("[data-mtab-go]").forEach((b) =>
    b.addEventListener("click", () => activate(b.dataset.mtabGo))
  );

  const pill = (group, attr) => {
    const els = document.querySelectorAll(`[data-${attr}]`);
    els.forEach((el) =>
      el.addEventListener("click", () => {
        els.forEach((x) => {
          x.classList.remove("border-primary", "bg-primary-50", "text-primary-700");
          x.classList.add("border-primary-100");
        });
        el.classList.add("border-primary", "bg-primary-50", "text-primary-700");
        el.classList.remove("border-primary-100");
      })
    );
  };
  pill("party", "party");
  pill("cat", "cat");
  pill("weeks", "weeks");
}
