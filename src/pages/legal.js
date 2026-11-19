/* ============================================================
   The Fourth Wind — Kebijakan Privasi & Ketentuan Layanan
   Structure and copy rebuilt from the production legal pages.
   ============================================================ */

import { page } from "../ui.js";

const EMAIL = `<a href="mailto:halo@thefourthwind.com" class="font-semibold text-primary hover:underline">halo@thefourthwind.com</a>`;

const PRIVACY = {
  slug: "privasi",
  title: "Kebijakan Privasi",
  lede:
    "Apa yang kami simpan saat Anda booking meja, ikut Mabar, atau mendaftar event — dan apa yang tidak pernah kami lakukan dengan data itu.",
  updated: "Berlaku sejak 24 Agustus 2026",
  sections: [
    {
      id: "pengelola",
      title: "Siapa yang mengelola data Anda",
      body: `
        <p>The Fourth Wind (thefourthwind.com dan app.thefourthwind.com) mengelola sendiri data pribadi yang dijelaskan di halaman ini. Untuk segala urusan data pribadi, hubungi ${EMAIL}.</p>
        <p>Dalam istilah Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP), kami adalah Pengendali Data Pribadi atas data yang dijelaskan di halaman ini. Club (venue) tempat Anda booking atau mendaftar adalah pengendali tersendiri atas data yang mereka terima dari kami untuk melayani Anda.</p>`,
    },
    {
      id: "data",
      title: "Data yang kami kumpulkan",
      list: [
        "<strong>Akun Google</strong> — nama, alamat email, dan foto profil yang Google berikan saat Anda masuk. Kami tidak pernah melihat maupun menyimpan kata sandi Google Anda.",
        "<strong>Booking meja</strong> — nama, nomor WhatsApp, email tujuan kode booking, club, tipe meja, jadwal, durasi, dan nominal yang harus ditransfer.",
        "<strong>Bukti transfer</strong> — foto atau tangkapan layar yang Anda unggah. Gambar ini biasanya memuat nama dan nomor rekening Anda.",
        "<strong>Mabar</strong> — nomor WhatsApp, jumlah rombongan, kategori main, dan jadwal meja yang Anda buka atau ikuti.",
        "<strong>Pendaftaran event</strong> — nama, nomor WhatsApp, dan email yang Anda isi di formulir event sebuah club.",
        "<strong>Minat booking</strong> — nomor WhatsApp (dan nama, bila diisi) saat Anda minta dikabari ketika sebuah club membuka booking online.",
        "<strong>Pemilik dan staf club</strong> — nama, email, nomor telepon, serta data rekening club yang ditampilkan kepada pemain sebagai tujuan transfer.",
        "<strong>Data teknis</strong> — alamat IP, jenis peramban dan perangkat, serta catatan akses server, untuk keamanan dan pemecahan masalah.",
      ],
      intro: "Kami hanya mengumpulkan apa yang diperlukan untuk mengantar Anda ke meja:",
    },
    {
      id: "cookie",
      title: "Cookie",
      body: `
        <p>Kami memakai cookie sesi agar Anda tetap masuk dan agar formulir terlindung dari pemalsuan permintaan (CSRF). Cookie ini diperlukan supaya situs berfungsi dan terhapus sendiri saat sesi berakhir.</p>
        <p>Bila analitik diaktifkan, kami hanya melihat statistik kunjungan secara agregat — halaman mana yang dibuka, dari jenis perangkat apa — tanpa mengidentifikasi Anda secara pribadi. Kami tidak memasang cookie iklan dan tidak melacak Anda di situs lain.</p>`,
    },
    {
      id: "tujuan",
      title: "Untuk apa data dipakai",
      list: [
        "Mengirim kode booking, voucher, dan pengingat jadwal ke WhatsApp atau email Anda.",
        "Menampilkan booking Anda di menu Booking Saya dan memudahkan club mencocokkan transfer.",
        "Menjalankan Mabar: memberi tahu Anda ketika kursi meja yang Anda buka atau ikuti sudah penuh.",
        "Mencegah penyalahgunaan: booking palsu, unggahan bukti transfer yang tidak sah, dan percobaan akses tanpa izin.",
        "Menyusun laporan internal dalam bentuk agregat untuk memahami halaman dan club mana yang dipakai.",
      ],
    },
    {
      id: "dasar",
      title: "Dasar pemrosesan",
      body: `
        <p>Kami memproses data Anda karena diperlukan untuk menjalankan layanan yang Anda minta (booking, Mabar, event), karena kewajiban hukum (pembukuan), dan karena kepentingan sah kami yang wajar (keamanan dan pencegahan penyalahgunaan). Bila kami memerlukan persetujuan untuk hal lain, kami memintanya secara terpisah dan Anda bisa menariknya kapan saja.</p>`,
    },
    {
      id: "berbagi",
      title: "Dengan siapa data dibagikan",
      body: `
        <p>Data booking dibagikan kepada club yang Anda pilih — hanya bagian yang mereka perlukan untuk mengenali tamu dan mencocokkan transfer: nama, nomor WhatsApp, tipe meja, jadwal, durasi, dan nominal.</p>
        <p>Kami memakai penyedia layanan untuk mengirim email dan pesan WhatsApp, menyimpan berkas, serta menjalankan server. Mereka memproses data atas instruksi kami dan tidak boleh memakainya untuk tujuan lain.</p>
        <p>Kami tidak menjual data pribadi dan tidak membagikannya kepada pengiklan.</p>`,
    },
    {
      id: "penyimpanan",
      title: "Penyimpanan dan keamanan",
      body: `
        <p>Data akun disimpan selama akun Anda aktif. Catatan transaksi dan bukti transfer disimpan lebih lama karena kewajiban pembukuan dan penyelesaian sengketa dengan club.</p>
        <p>Kami memakai koneksi terenkripsi, kata sandi sesi yang ditandatangani, dan akses terbatas untuk staf. Tidak ada sistem yang sepenuhnya bebas risiko; bila terjadi kebocoran yang berdampak pada Anda, kami memberi tahu sesuai ketentuan yang berlaku.</p>`,
    },
    {
      id: "hak",
      title: "Hak Anda",
      body: `
        <p>Anda berhak meminta salinan data Anda, meminta koreksi data yang keliru, dan meminta penghapusan data yang tidak terikat kewajiban pembukuan. Kirim permintaan ke ${EMAIL}; kami menanggapi dalam waktu yang wajar dan dapat meminta bukti bahwa permintaan datang dari pemilik akun.</p>`,
    },
    {
      id: "perubahan",
      title: "Perubahan kebijakan",
      body: `
        <p>Kami dapat memperbarui kebijakan ini. Versi terbaru beserta tanggal berlakunya selalu ada di halaman ini. Perubahan besar akan kami beritahukan lewat email atau halaman ini sebelum berlaku.</p>`,
    },
  ],
};

const TERMS = {
  slug: "ketentuan",
  title: "Ketentuan Layanan",
  lede:
    "Aturan main di The Fourth Wind: apa yang kami sediakan, apa yang club sediakan, dan apa yang berlaku saat Anda booking meja, ikut Mabar, atau mendaftar event.",
  updated: "Berlaku sejak 24 Agustus 2026",
  sections: [
    {
      id: "layanan",
      title: "Apa itu The Fourth Wind",
      body: `
        <p>The Fourth Wind adalah platform penyewaan meja mahjong per jam dan direktori club. Kami mempertemukan pemain dengan club; meja, tempat, dan pelayanannya disediakan oleh masing-masing club.</p>
        <p>The Fourth Wind <strong>bukan penyelenggara permainan</strong> dan tidak menyediakan, memfasilitasi, atau menerima pembayaran atas taruhan dalam bentuk apa pun. Satu-satunya transaksi di platform ini adalah sewa meja — dan, di tempat, makanan-minuman yang dijual club. Kesepakatan apa pun di antara pemain berada di luar platform dan sepenuhnya menjadi tanggung jawab pemain, yang wajib mematuhi hukum yang berlaku.</p>
        <p>Dengan memakai The Fourth Wind Anda menyetujui ketentuan ini dan <a href="#/privasi" class="font-semibold text-primary hover:underline">Kebijakan Privasi</a> kami.</p>`,
    },
    {
      id: "akun",
      title: "Akun",
      body: `
        <p>Untuk booking, Mabar, dan event, Anda masuk memakai akun Google. Satu orang satu akun; jangan memakai akun orang lain. Anda bertanggung jawab atas aktivitas yang terjadi di akun Anda dan wajib memberi tahu kami bila mencurigai akses tanpa izin.</p>`,
    },
    {
      id: "booking",
      title: "Booking meja",
      body: `
        <p>Saat Anda booking, jam meja dikunci untuk Anda selama batas waktu transfer. Bila transfer tidak dikonfirmasi sebelum batas waktu habis, meja dilepas kembali dan booking kedaluwarsa — Anda bisa booking ulang bila jamnya masih kosong.</p>
        <p>Ketersediaan yang tampil berasal dari sistem masing-masing club. Kami berusaha menampilkannya seketika, tetapi kesalahan sistem atau perubahan mendadak dari club bisa terjadi; dalam hal itu club akan menghubungi Anda dan Anda berhak atas jadwal pengganti atau pembatalan tanpa biaya.</p>`,
    },
    {
      id: "pembayaran",
      title: "Pembayaran",
      body: `
        <p>Pembayaran dilakukan <strong>langsung ke rekening club</strong> yang tertera di halaman booking. The Fourth Wind tidak menerima dan tidak menahan uang pemain. Voucher terbit setelah staf club memeriksa dan mengonfirmasi transfer Anda.</p>
        <p>Biaya layanan platform ditagihkan kepada club, bukan kepada pemain. Harga yang Anda lihat di halaman venue adalah harga sewa meja dari club, termasuk pajak bila club menerapkannya.</p>`,
    },
    {
      id: "kedatangan",
      title: "Kedatangan dan durasi main",
      body: `
        <p>Datanglah sesuai jam yang Anda booking. Meja ditahan sebentar setelah jam mulai; bila Anda tidak datang dalam tenggang waktu yang ditetapkan club, booking dapat ditandai tidak datang dan meja dilepas.</p>
        <p>Menambah jam bisa dilakukan lewat kasir club selama meja belum dibooking orang lain. Jam tambahan dibayar langsung di tempat dan tidak selalu tercatat sebagai booking di platform.</p>`,
    },
    {
      id: "pembatalan",
      title: "Pembatalan dan pengembalian dana",
      body: `
        <p>Kebijakan pembatalan ditetapkan masing-masing club dan tertera di halaman venue sebelum Anda booking. Karena uang berpindah langsung ke club, pengembalian dana — bila ada — diproses oleh club, bukan oleh kami.</p>
        <p>Bila club membatalkan jadwal Anda, hubungi club untuk pengembalian dana atau jadwal pengganti. Kami membantu menjembatani, tetapi tidak dapat memaksa keputusan komersial club.</p>`,
    },
    {
      id: "mabar",
      title: "Mabar (cari lawan main)",
      body: `
        <p>Mabar memungkinkan Anda membuka meja atau bergabung ke meja pemain lain. Begitu empat kursi terisi, jadwal terkunci dan seluruh peserta menerima konfirmasi. Meja Mabar ditagih di kasir club saat kedatangan, bukan di muka.</p>
        <p>Anda bertanggung jawab atas nomor WhatsApp yang Anda berikan dan atas kesopanan di meja. Club berhak menolak tamu yang mengganggu, dan pembatalan oleh club disampaikan ke seluruh peserta lewat email.</p>`,
    },
    {
      id: "event",
      title: "Event dan kompetisi",
      body: `
        <p>Event dan kompetisi diselenggarakan oleh club. Ketentuan teknis — format, biaya masuk, hadiah, dan aturan permainan — ditetapkan penyelenggara dan ditampilkan di halaman event. The Fourth Wind hanya menyediakan formulir pendaftaran dan daftar peserta.</p>`,
    },
    {
      id: "club",
      title: "Pemilik dan staf club",
      body: `
        <p>Pemilik club bertanggung jawab atas kebenaran data venue, harga, jam buka, dan rekening yang ditampilkan; atas konfirmasi transfer; dan atas pelayanan di lokasi. Staf hanya boleh mengakses data tamu untuk keperluan operasional club.</p>
        <p>Biaya layanan platform, siklus penagihan, dan paket diatur dalam perjanjian terpisah dengan club.</p>`,
    },
    {
      id: "larangan",
      title: "Yang tidak boleh dilakukan",
      list: [
        "Memakai platform untuk taruhan atau kegiatan yang melanggar hukum.",
        "Membuat booking palsu, mengunggah bukti transfer yang bukan milik Anda, atau menyalahgunakan formulir Mabar dan event.",
        "Mengambil data orang lain dari platform, menyalin isi situs secara massal, atau mengakses sistem tanpa izin.",
        "Mengganggu jalannya situs, termasuk percobaan membebani server atau menembus pembatasan akses.",
      ],
    },
    {
      id: "tanggung-jawab",
      title: "Batas tanggung jawab",
      body: `
        <p>Kami menyediakan platform apa adanya dan berusaha menjaganya tetap berjalan. Kami tidak bertanggung jawab atas kerusakan barang di lokasi, atas perilaku sesame pemain, atas sengketa pembayaran antara Anda dan club, maupun atas perubahan jadwal yang dilakukan club. Sejauh diizinkan hukum, tanggung jawab kami terbatas pada kerugian langsung yang terbukti disebabkan oleh kelalaian kami.</p>`,
    },
    {
      id: "lain",
      title: "Perubahan, hukum yang berlaku, dan kontak",
      body: `
        <p>Kami dapat memperbarui ketentuan ini. Versi terbaru beserta tanggal berlakunya selalu ada di halaman ini dan berlaku untuk pemakaian setelah tanggal tersebut.</p>
        <p>Ketentuan ini tunduk pada hukum Republik Indonesia. Perselisihan diselesaikan secara musyawarah lebih dulu; bila tidak tercapai, melalui Pengadilan Negeri Jakarta Barat.</p>
        <p>Pertanyaan: ${EMAIL}.</p>`,
    },
  ],
};

const body = (s) => `<div class="mt-3 flex flex-col gap-3 leading-relaxed text-ink/75">${s}</div>`;
const bullets = (items) => `<ul class="flex list-disc flex-col gap-2 pl-5 marker:text-gold-dark">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

export function legal(kind) {
  const doc = kind === "ketentuan" ? TERMS : PRIVACY;

  return page({
    title: doc.title,
    headerVariant: "dark",
    body: `
      <header class="relative overflow-hidden bg-primary-900 pt-28 pb-12 sm:pt-32">
        <div class="tile-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-3xl px-4 sm:px-6">
          <a class="text-sm font-medium text-white/60 hover:text-white" href="#/">← Beranda</a>
          <h1 class="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">${doc.title}</h1>
          <p class="mt-2 max-w-2xl text-white/70">${doc.lede}</p>
          <p class="mt-4 text-sm text-white/50">${doc.updated}</p>
        </div>
      </header>

      <main class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav aria-label="Daftar isi" class="mb-8 rounded-2xl border border-primary-100 bg-white p-5 shadow-soft">
          <p class="text-xs font-semibold tracking-wide text-ink/50 uppercase">Isi</p>
          <ol class="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
            ${doc.sections
              .map(
                (s, i) =>
                  `<li><a href="#/legal/${doc.slug}/${s.id}" data-toc="${s.id}" class="font-medium text-primary hover:underline">${i + 1}. ${s.title}</a></li>`
              )
              .join("")}
          </ol>
        </nav>

        <div class="flex flex-col gap-10">
          ${doc.sections
            .map(
              (s, i) => `
              <section id="${s.id}" class="scroll-mt-28">
                <h2 class="font-display text-xl font-bold sm:text-2xl">${i + 1}. ${s.title}</h2>
                ${body(`${s.intro ? `<p>${s.intro}</p>` : ""}${s.list ? bullets(s.list) : ""}${s.body ?? ""}`)}
              </section>`
            )
            .join("")}
        </div>

        <div class="mt-12 rounded-2xl border border-primary-100 bg-white p-6 shadow-soft">
          <h2 class="font-display text-lg font-bold">Ada yang mau ditanyakan?</h2>
          <p class="mt-1 text-sm text-ink/65">
            Kirim email ke <a href="mailto:halo@thefourthwind.com" class="font-semibold text-primary hover:underline">halo@thefourthwind.com</a>.
            Kami membaca semuanya, biasanya membalas dalam satu hari kerja.
          </p>
        </div>
      </main>
    `,
  });
}
