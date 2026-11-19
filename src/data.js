/* ============================================================
   The Fourth Wind — shared data
   Content transcribed from the production site's page payloads.
   ============================================================ */

export const BRAND = {
  name: "The Fourth Wind",
  mark: "風",
  tagline: "Sewa meja mahjong per jam di club terdekat.",
  email: "halo@thefourthwind.com",
  appLogin: "#/masuk",
};

export const STATS = { venues: 88, tables: 56, cities: 15 };

export const AREAS = [
  { name: "Jakarta Timur", hanzi: "東", slug: "jakarta-timur", count: 1 },
  { name: "Jakarta Selatan", hanzi: "南", slug: "jakarta-selatan", count: 7 },
  { name: "Jakarta Barat", hanzi: "西", slug: "jakarta-barat", count: 11 },
  { name: "Jakarta Utara", hanzi: "北", slug: "jakarta-utara", count: 13 },
  { name: "Jakarta Pusat", hanzi: "中", slug: "jakarta-pusat", count: 6 },
  { name: "Tangerang Serpong", hanzi: null, slug: "tangerang-serpong", count: 21 },
  { name: "Bekasi", hanzi: null, slug: "bekasi", count: 10 },
  { name: "Tangerang BSD", hanzi: null, slug: "tangerang-bsd", count: 4 },
  { name: "Depok", hanzi: null, slug: "depok", count: 4 },
  { name: "Bogor", hanzi: null, slug: "bogor", count: 4 },
  { name: "Tangerang PIK 2", hanzi: null, slug: "tangerang-pik-2", count: 2 },
  { name: "Tangerang Alam Sutera", hanzi: null, slug: "tangerang-alam-sutera", count: 2 },
  { name: "Tangerang Suvarna Sutera", hanzi: null, slug: "tangerang-suvarna-sutera", count: 1 },
  { name: "Tangerang Bintaro", hanzi: null, slug: "tangerang-bintaro", count: 1 },
  { name: "Kab. Tangerang", hanzi: null, slug: "kab-tangerang", count: 1 },
];

/* The full 88-entry venue directory lives in its own module. */
export { VENUES } from "./venues.js";

export const ROOM_TYPES = [
  { name: "Meja Otomatis", from: 45000, venues: 4 },
  { name: "Meja Manual", from: 55000, venues: 3, featured: true },
  { name: "Meja Reguler", from: 75000, venues: 1 },
  { name: "Ruang VIP", from: 95000, venues: 1 },
];

export const STEPS = [
  {
    title: "Pilih venue & jam",
    body: "Lihat meja yang benar-benar kosong malam ini, lengkap dengan harganya per jam.",
  },
  {
    title: "Transfer ke venue",
    body: "Bayar langsung ke rekening club. The Fourth Wind tidak pernah menahan uang Anda.",
  },
  {
    title: "Tunjukkan voucher",
    body: "Club konfirmasi transfer, kode voucher terbit, tinggal datang dan main.",
  },
];

export const FAQ = [
  {
    q: "Bayarnya ke The Fourth Wind atau ke venue?",
    a: "Langsung ke rekening club. Kami hanya mencatat bookingnya — uang Anda tidak pernah lewat kami.",
  },
  {
    q: "Kenapa harus menunggu konfirmasi?",
    a: "Staf club mengecek rekening mereka dulu. Selama menunggu, meja Anda ditahan. Kalau lewat batas waktu, meja dilepas dan Anda bisa booking ulang.",
  },
  {
    q: "Harganya per orang atau per meja?",
    a: "Per meja, per jam. Mau main berdua atau berempat, harganya sama.",
  },
  {
    q: "Kalau mau nambah jam waktu sudah main?",
    a: "Bisa, tinggal bilang ke kasir — selama meja itu belum dibooking orang lain. Jam tambahan dibayar langsung di tempat.",
  },
  {
    q: "Kalau saya tidak jadi datang?",
    a: "Tergantung kebijakan pembatalan masing-masing club. Kebijakannya tertera di halaman club sebelum Anda booking.",
  },
];

export const PLANS = [
  {
    key: "promo",
    label: "Promosi",
    price_per_table: 0,
    service_fee_value: 5000,
    min_billable_tables: 0,
    contract_min_months: 0,
    has_pos: false,
    is_listed_publicly: true,
  },
  {
    key: "full",
    label: "Lengkap",
    price_per_table: 200000,
    service_fee_value: 0,
    min_billable_tables: 0,
    contract_min_months: 0,
    has_pos: true,
    is_listed_publicly: true,
  },
  {
    key: "private",
    label: "Private",
    price_per_table: 400000,
    service_fee_value: 0,
    min_billable_tables: 10,
    contract_min_months: 12,
    has_pos: true,
    is_listed_publicly: false,
  },
];

export const HOURS = [
  "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00",
  "22:00", "23:00",
];

export const DATES = [
  { value: "2026-11-19", label: "Kam 19 Nov" },
  { value: "2026-11-20", label: "Jum 20 Nov" },
  { value: "2026-11-21", label: "Sab 21 Nov" },
  { value: "2026-11-22", label: "Min 22 Nov" },
  { value: "2026-11-23", label: "Sen 23 Nov" },
  { value: "2026-11-24", label: "Sel 24 Nov" },
  { value: "2026-11-25", label: "Rab 25 Nov" },
];

export const NAV = [
  { href: "#venue", scroll: "venue", label: "Club" },
  { href: "#/mabar", label: "Mabar" },
  { href: "#harga", scroll: "harga", label: "Harga" },
  { href: "#/untuk-pemilik", label: "Untuk pemilik" },
  { href: "#faq", scroll: "faq", label: "FAQ" },
];

/* ---------- formatting ---------- */

export const rupiah = (n) =>
  "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));

/** Price split, mirroring the production basis-point logic. */
export function splitPrice(gross, { tax_bp = 0, service_bp = 0, inclusive = true } = {}) {
  const n = service_bp;
  const r = tax_bp;
  if (n <= 0 || gross <= 0) {
    const tax = Math.round(inclusive ? (gross * r) / (1e4 + r) : (gross * r) / 1e4);
    return {
      net: inclusive ? gross - tax : gross,
      service: 0,
      tax,
      gross: inclusive ? gross : gross + tax,
    };
  }
  if (inclusive) {
    const net = Math.round(((gross * 1e4) / (1e4 + n)) * (1e4 / (1e4 + r)));
    const service = Math.round((net * n) / 1e4);
    return { net, service, tax: gross - net - service, gross };
  }
  const service = Math.round((gross * n) / 1e4);
  const tax = Math.round(((gross + service) * r) / 1e4);
  return { net: gross, service, tax, gross: gross + service + tax };
}

/** Slot price bands: off-peak before 17:00, peak after. */
export function priceForHour(base, hour) {
  const h = parseInt(hour, 10);
  return h >= 17 ? base + 20000 : base;
}
