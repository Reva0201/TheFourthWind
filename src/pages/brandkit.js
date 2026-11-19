/* ============================================================
   The Fourth Wind — Brand kit
   Structure and copy rebuilt from the production /brand page.
   ============================================================ */

import { page } from "../ui.js";

const VARIANTS = [
  { key: "light", label: "Latar terang", swatch: "#fbf7ef", rule: "#e6ded0" },
  { key: "dark", label: "Latar gelap", swatch: "#052a1f", rule: "#0b6449" },
  { key: "mono", label: "Hitam putih", swatch: "#f4f6f3", rule: "#dde4de" },
  { key: "white", label: "Putih penuh", swatch: "#0e7c5a", rule: "#0b6449" },
];

const FAMILIES = [
  {
    title: "Horizontal",
    note: "Header, kop surat, banner — pilihan utama.",
    file: (k) => `horizontal-${k}`,
    imgClass: "max-h-20 w-auto max-w-full",
  },
  {
    title: "Bertumpuk",
    note: "Kolom sempit, stiker pintu, kaos.",
    file: (k) => `stacked-${k}`,
    imgClass: "max-h-20 w-auto max-w-full",
  },
  {
    title: "Ikon saja",
    note: "Avatar sosial media, favicon, watermark.",
    file: (k) => `mark-${k}`,
    imgClass: "h-20 w-auto",
  },
];

const assetCard = (family, v) => {
  const file = family.file(v.key);
  const label = `${family.title} ${v.label}`;
  return `
  <div class="overflow-hidden rounded-2xl border border-primary-50 bg-white shadow-soft">
    <div class="grid h-36 place-items-center px-6" style="background:${v.swatch};border-bottom:1px solid ${v.rule}">
      <img alt="Logo The Fourth Wind, ${label}" class="${family.imgClass}" src="./assets/logo/${file}.svg" loading="lazy" />
    </div>
    <div class="flex flex-wrap items-center gap-2 p-3">
      <span class="mr-auto text-xs font-semibold text-ink/60">${v.label}</span>
      <a href="./assets/logo/${file}.svg" download
        class="rounded-lg border border-primary-100 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary-50">SVG</a>
      <select aria-label="Ukuran PNG untuk ${label}"
        class="rounded-lg border border-primary-100 bg-white px-2 py-1.5 text-xs font-semibold">
        <option value="512">512 px</option>
        <option value="1024">1024 px</option>
        <option value="2048">2048 px</option>
      </select>
      <button type="button" data-logo-png="./assets/logo/${file}.svg" data-logo-label="${label}"
        class="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white transition hover:bg-primary-600">PNG</button>
    </div>
  </div>`;
};

const COLORS = [
  { name: "Jade 900", hex: "#052a1f", use: "Latar utama — hero, footer, kop gelap." },
  { name: "Jade 500", hex: "#0e7c5a", use: "Aksen hijau, tombol sekunder." },
  { name: "Brass", hex: "#d4a24c", use: "Warna aksen. Selalu di atas hijau tua, jangan di atas putih." },
  { name: "Brass tua", hex: "#a97b2c", use: "Pengganti Brass kalau harus di atas latar terang." },
  { name: "Cream", hex: "#fbf7ef", use: "Latar terang halaman." },
  { name: "Ink", hex: "#12211c", use: "Teks di atas latar terang." },
];

const rule = (ok, text) => `
  <li class="flex gap-3">
    <span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${ok ? "bg-primary" : "bg-dragon"}" aria-hidden="true">${ok ? "✓" : "✕"}</span>
    <span>${text}</span>
  </li>`;

export function brandkit() {
  return page({
    title: "Brand & logo",
    headerVariant: "dark",
    body: `
      <section class="relative overflow-hidden bg-primary-900 pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-5xl px-4 sm:px-6">
          <span class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-light">
            <span class="size-1.5 rounded-full bg-gold"></span>Brand kit
          </span>
          <h1 class="mt-5 font-display text-4xl leading-[1.05] font-bold text-white sm:text-5xl">
            Logo The Fourth Wind, <span class="text-gold">siap dipakai.</span>
          </h1>
          <p class="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Untuk club yang memasang logo kami di pintu, banner, atau unggahan media sosial — dan untuk media yang menulis tentang The Fourth Wind. Unduh SVG atau PNG, gratis, tanpa perlu izin tertulis.
          </p>
        </div>
      </section>

      <section class="border-b border-primary-50 bg-white py-14">
        <div class="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <img alt="Ikon The Fourth Wind: ubin emas bergambar aksara 風" class="size-32 rounded-2xl shadow-lift"
            src="./assets/logo/mark-light.svg" />
          <div>
            <h2 class="font-display text-2xl font-bold">風 — ubin angin</h2>
            <p class="mt-3 text-ink/70">
              Ikonnya bukan huruf hiasan. <strong>風</strong> (fēng) berarti angin — dan dalam mahjong, empat angin menandai empat arah duduk:
              timur, selatan, barat, dan utara. Angin keempat adalah putaran terakhir sebelum permainan ditutup. Satu ubin emas dengan aksara hijau tua:
              cukup dikenali dari jauh sebagai ubin mahjong, dan cukup sederhana untuk dicetak sebesar favicon.
            </p>
            <p class="mt-3 text-sm text-ink/60">
              Nama merek selalu ditulis <strong>The Fourth Wind</strong> — tiga kata, huruf kapital di awal setiap kata. Bukan "The 4th Wind", bukan "Fourth Wind", bukan "TFW".
            </p>
          </div>
        </div>
      </section>

      <section class="border-b border-primary-50 bg-cream py-14">
        <div class="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 class="font-display text-3xl font-bold">Unduh logo</h2>
          <p class="mt-2 max-w-2xl text-ink/65">
            SVG untuk cetak dan desain — bisa diperbesar tanpa pecah. Tombol PNG menyimpan versi 1024 px dengan latar transparan.
            Ikon diunduh bujur sangkar; logo lengkap mengikuti proporsinya sendiri.
          </p>
          ${FAMILIES.map(
            (f, i) => `
            <div class="${i === 0 ? "mt-10" : "mt-10"}">
              <h3 class="font-display text-xl font-bold">${f.title}</h3>
              <p class="mt-1 text-sm text-ink/60">${f.note}</p>
              <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                ${VARIANTS.map((v) => assetCard(f, v)).join("")}
              </div>
            </div>`
          ).join("")}
        </div>
      </section>

      <section class="border-b border-primary-50 bg-white py-14">
        <div class="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 class="font-display text-3xl font-bold">Warna</h2>
          <p class="mt-2 max-w-2xl text-ink/65">
            Hijau tua adalah warnanya, emas hanya aksen. Kalau ragu: hijau untuk bidang besar, emas untuk satu hal terpenting di layar.
          </p>
          <dl class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            ${COLORS.map(
              (c) => `
              <div class="flex items-start gap-3 rounded-2xl border border-primary-50 p-3">
                <span class="size-12 shrink-0 rounded-xl border border-black/5" aria-hidden="true" style="background:${c.hex}"></span>
                <span>
                  <dt class="font-semibold">${c.name}</dt>
                  <dd class="tnum text-sm text-ink/60 uppercase">${c.hex}</dd>
                  <dd class="mt-1 text-xs text-ink/55">${c.use}</dd>
                </span>
              </div>`
            ).join("")}
          </dl>
          <h3 class="mt-10 font-display text-xl font-bold">Huruf</h3>
          <p class="mt-2 text-ink/65">
            <strong class="font-display">Fraunces</strong> untuk judul dan wordmark, <strong>Plus Jakarta Sans</strong> untuk teks.
            Keduanya gratis di Google Fonts. Logo yang Anda unduh sudah berupa kurva, jadi tidak perlu memasang font apa pun.
          </p>
        </div>
      </section>

      <section class="bg-cream py-14">
        <div class="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 class="font-display text-3xl font-bold">Cara pakai</h2>
          <div class="mt-6 grid gap-8 sm:grid-cols-2">
            <ul class="flex flex-col gap-3 text-ink/75">
              ${rule(true, "Beri ruang kosong di sekeliling logo minimal selebar ubinnya.")}
              ${rule(true, "Ukuran terkecil: 24 px untuk ikon, 120 px untuk logo horizontal. Di bawah itu aksaranya tidak terbaca.")}
              ${rule(true, "Di atas foto, pakai versi <strong>Putih penuh</strong> — jangan versi emas.")}
              ${rule(true, 'Club boleh menulis "Booking di The Fourth Wind" beserta logo ini di materi promosi venue sendiri.')}
            </ul>
            <ul class="flex flex-col gap-3 text-ink/75">
              ${rule(false, "Jangan mengubah warna, memiringkan, memberi bayangan, atau menambahkan efek pada logo.")}
              ${rule(false, "Jangan menyusun ulang ikon dan tulisannya, atau menggantinya dengan font lain.")}
              ${rule(false, "Jangan menaruh logo emas di atas latar terang — pakai versi Latar terang.")}
              ${rule(false, "Jangan memakai logo ini seolah-olah The Fourth Wind ikut menyelenggarakan, mensponsori, atau menjamin acara Anda.")}
            </ul>
          </div>
          <p class="mt-8 rounded-2xl border border-primary-100 bg-white p-5 text-sm text-ink/70">
            Butuh format lain — EPS, PDF, atau logo untuk cetak besar? Kirim email ke
            <a href="mailto:halo@thefourthwind.com" class="font-semibold text-primary hover:underline">halo@thefourthwind.com</a>, kami kirimkan.
          </p>
        </div>
      </section>
    `,
  });
}

/* Rasterise an SVG to PNG in-browser so the download buttons actually work. */
export function initBrandkit() {
  document.querySelectorAll("[data-logo-png]").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", async () => {
      const src = btn.dataset.logoPng;
      const label = (btn.dataset.logoLabel || "logo").toLowerCase().replace(/\s+/g, "-");
      const size = 1024;
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
        });
        const canvas = document.createElement("canvas");
        const ratio = img.naturalHeight / img.naturalWidth || 1;
        canvas.width = size;
        canvas.height = Math.round(size * ratio);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${label}-1024.png`;
        a.click();
      } catch {
        window.open(src, "_blank");
      }
    });
  });
}
