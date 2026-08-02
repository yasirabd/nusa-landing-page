export type FAQItem = {
  id: string
  question: string
  answer: string
  sourceLabel?: string
  sourceUrl?: string
}

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    id: "jenjang",
    question: "Jenjang pendidikan apa yang diselenggarakan NUSA?",
    answer:
      "NUSA Boarding School ditujukan untuk santri tingkat SMA dan menggabungkan pendidikan kesetaraan SMA dengan pembinaan agama, keterampilan teknologi, bahasa Inggris, serta pengembangan karakter di lingkungan asrama.",
  },
  {
    id: "legalitas",
    question: "Bagaimana orang tua dapat memeriksa legalitas pendidikannya?",
    answer:
      "NUSA Boarding School merupakan bagian dari PKBM Cahaya Hikmah yang berada di bawah Yayasan Islam Nurus Sunnah. Informasi lembaga dapat diperiksa melalui situs Referensi Data Kemendikdasmen.",
    sourceLabel: "Lihat data PKBM Cahaya Hikmah di Kemendikdasmen",
    sourceUrl:
      "https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/P9998836",
  },
  {
    id: "asrama",
    question: "Bagaimana sistem kehidupan santri di asrama?",
    answer:
      "Santri mengikuti kegiatan belajar dan pembinaan di lingkungan boarding school. Program yang ditampilkan meliputi monitoring adab dan ibadah, pembelajaran agama, kegiatan bahasa Inggris, kepemimpinan, kemandirian, dan aktivitas bersama guru asrama.",
  },
  {
    id: "jurusan",
    question: "Apa perbedaan jurusan Programmer dan Designer?",
    answer:
      "Jalur Programmer berfokus pada kemampuan pengembangan teknologi seperti frontend dan backend. Jalur Designer berfokus pada UI/UX, prototyping, dan visual design. Keduanya menggunakan pembelajaran berbasis proyek dan teknologi terkini.",
  },
  {
    id: "biaya",
    question: "Biaya apa saja yang perlu dipersiapkan?",
    answer:
      "Rincian biaya pendaftaran, biaya masuk, kebutuhan asrama, dan biaya pendidikan bulanan tersedia pada bagian Informasi Biaya. Nominal promo, skema cicilan, dan beasiswa perlu dikonfirmasi kembali kepada tim administrasi sebelum pembayaran.",
  },
  {
    id: "pendaftaran",
    question: "Bagaimana proses pendaftaran tahun ajaran 2027/2028?",
    answer:
      "Calon santri mengisi formulir pendaftaran, memilih program, melengkapi data sekolah, dan mengikuti petunjuk pembayaran serta konfirmasi yang tersedia. Setelah data diterima, admin NUSA akan menghubungi calon santri melalui WhatsApp untuk proses berikutnya.",
  },
] as const
