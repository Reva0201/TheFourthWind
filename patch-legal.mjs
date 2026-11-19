import fs from "node:fs";

const p = "src/pages/legal.js";
let s = fs.readFileSync(p, "utf8");

const EM = "\u2014";

/* Extra paragraphs so each section carries the same depth as the original. */
const additions = {
  pembayaran: [
    `Selama menunggu konfirmasi, meja Anda ditahan. Bila transfer tidak masuk sebelum batas waktu, booking kedaluwarsa dan meja dilepas kembali ${EM} Anda bisa booking ulang bila jamnya masih kosong.`,
    "Pastikan nominal yang Anda transfer sama dengan total yang tertera, termasuk pajak bila club menerapkannya. Selisih akibat biaya transfer bank menjadi tanggungan Anda.",
    "Bila Anda terlanjur transfer setelah batas waktu, hubungi club langsung. Selama jamnya belum diambil orang lain, mereka biasanya masih bisa mengaktifkan booking Anda.",
    "Harga yang Anda lihat di halaman venue adalah harga sewa meja dari club. The Fourth Wind tidak memungut biaya tambahan, tidak menyimpan saldo, dan tidak menerbitkan faktur atas nama pemain.",
  ],
  kedatangan: [
    "Datang lebih awal tidak menjamin meja langsung kosong " + EM + " meja baru menjadi milik Anda pada jam yang dibooked.",
  ],
  pembatalan: [
    "Bacalah kebijakan itu sebelum transfer, karena kebijakan tersebut yang berlaku bila Anda berubah pikiran.",
    "Booking yang kedaluwarsa karena transfer tidak dikonfirmasi bukan pembatalan " + EM + " tidak ada dana yang berpindah, jadi tidak ada yang perlu dikembalikan.",
    "Simpan bukti transfer Anda sampai jadwal main selesai; bukti itu yang dipakai club bila terjadi sengketa.",
  ],
  club: [
    "Club juga wajib menjaga jam buka yang ditampilkan tetap sesuai kenyataan; jadwal yang sudah dibooking pemain tidak boleh dibatalkan sepihak tanpa memberi tahu peserta.",
  ],
};

const fix = (body) => body.replace("meja di-", "meja di"); // no-op guard

/* Insert after a given `<p>...</p>` inside a named section. */
function addToSection(key, paragraphs) {
  const idIdx = s.indexOf(`id: "${key}"`);
  if (idIdx === -1) {
    console.log("missing section", key);
    return;
  }
  // find the closing of this section's body template
  const bodyStart = s.indexOf("body: `", idIdx);
  const bodyEnd = s.indexOf("`,", bodyStart);
  if (bodyStart === -1 || bodyEnd === -1) {
    console.log("missing body", key);
    return;
  }
  const body = s.slice(bodyStart, bodyEnd);
  const extra = paragraphs.map((t) => `        <p>${t}</p>`).join("\n");
  s = s.slice(0, bodyEnd) + "\n" + extra + s.slice(bodyEnd);
  console.log("updated", key, "+", paragraphs.length);
}

for (const [k, v] of Object.entries(additions)) addToSection(k, v);

fs.writeFileSync(p, s, "utf8");
console.log("done");
