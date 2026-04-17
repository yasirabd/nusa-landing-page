# Rencana Redesain: Komponen "Curriculum Section"

Secara struktural, kode untuk `components/curriculum-section.tsx` saat ini rapi karena sudah menggunakan peta array objek `curriculumPillars`. Namun, secara visual komponen ini masih memiliki *"bau template murahan"* karena digambar menggunakan properti yang sangat standar (bingkai abu-abu kaku, ikon centang unicode kuno `✔`, teks polos tanpa hirarki murni). Kita harus membawanya ke level premium *Tech Academy* yang searah dengan komponen Tagline dan hero kita.

## User Review Required
> [!IMPORTANT]
> Plan ini diusulkan untuk dieksekusi secara otomatis jika Anda setuju. Tolong ulas rencana perombakan ini dan konfirmasi apakah Anda setuju dengan transisi ke gaya *bento-card modern*!

## 1. Analisis Kelemahan Kode Eksisting
1. **Header Konservatif**: Tulisan "Kurikulum" hanya berukuran `text-4xl`. Sangat kontras dan jomplang bila disejajarkan dengan ukuran monumental komponen sebelumnya yang mencapai 60px.
2. **Kartu Flat & Bingkai Gambar Mati**: Gambar dibungkus dalam div statis berlatar abu-abu kotor (`bg-gray-300`), dan kartunya sendiri sama sekali tidak memiliki respons *hover* seperti halaman Edutech mutakhir.
3. **Ikon Checklist Kuno**: Penggunaan simbol unicode murni `<span style={{ color: "#2C8970" }}>✔</span>` berasa seperti web tahun 2005.
4. **Hardcoded Inline Styles**: Penggunaan *hex* bertaburan (`#2C8970`, `#134146`, warna transparan acak), belum patuh pada standardisasi objek `COLORS` tunggal.

## 2. Cetak Biru Perombakan (Redesign Action Plan)

### A. Rekalibrasi Header Pendahulu (Penyelarasan Momentum Rushd)
- **Monumental Sizing**: Menyesuaikan ukuran H2 dari `text-4xl` statis menjadi kurva responsif `text-4xl sm:text-5xl md:text-6xl font-extrabold` berbalut warna gelap `COLORS.darkBase`.
- **Eskalasi Subteks (Anti-Kicker)**: Teks deskripsi pengiring tentang *"4 Pilar..."* tidak akan disulap jadi Kicker atas, tapi dibiarkan menjadi `<p>` bawah penjelas dengan laju *font-size* yang dikontrol ketat (maksimal `text-xl`) agar tidak terlihat gajah seperti *bug* "Why Choose" sebelumnya.
- **Brand Slogan Locking**: Khusus bagi serpihan kalimat `"Muslim Tangguh Jago IT"` di dalam subteks, frasa tersebut akan di-blok khusus dengan bumbu `COLORS.accent` dan `font-romulo-italic`. Di samping itu, pelindung `whitespace-nowrap` akan disuntikkan agar slogan keramat ini tidak merusak pemenggalannya saat dicekik ukuran responsif HP.

### B. Modernisasi Kartu Kurikulum (Hover State & Glassmorphism)
- **Interactive Card Surface**: Latar kartu yang aslinya transparan 10% (Secondary) akan diperkuat karakternya menggunakan warna putih bersih `bg-white` berhias bayangan lembut `shadow-sm`, yang akan bereaksi lompat naik dan menebar *glow-shadow* cyan mutakhir ketika kursor melewatinya.
- **Bingkai Gambar Premium (Aspect Ratio Consistencty)**: Wadah bernaungnya gambar (`p-5`) tidak lagi berlatar abu-abu kotor. Kita akan memberinya kurva `rounded-2xl` dengan penguncian rasio ukuran presisi `aspect-[4/3]`, sehingga tinggi semua foto seragam menawan tanpa takut tertarik regang.
- **Lucide Icon Integration**: Membasmi simbol centang pasaran `"✔"` dan memasangkan komponen `<CheckCircle2 />` dari pustaka *Lucide React* yang diwarnai `COLORS.primary` untuk memberikan sensasi *trust* & teknologi mahal.
- **Micro-Typography Spacing**: Membenahi rasio letak teks paragraf (`opacity-80`) agar renggang bernapas seperti evaluasi kita sebelumnya.

### C. Pemolesan CTA "Lihat Karya"
- Tombol (Button) khusus untuk slot pilar IT akan didekorasi layaknya *Secondary Button* di ruang *Hero*: melengkung penuh (`rounded-full`), memiliki transisi warna halus nan reaktif ke *yellow accent* (`F3B233`), dilengkapi panah kecil dinamis `MoveRight` dari *Lucide react*.

## 3. Pertanyaan Konfirmasi (Open Questions)
1. **Rasio Gambar Kartu**: Saat ini foto gambar diletakkan mendarat di "dalam" kartu (berbingkai padding `p-5`). Di tren modern *(Bento Grid / Apple Card)*, biasanya foto ditarik rapat menjebol sudut batas atas sejajar dengan ujung kartu *(Edge-to-edge layout)*. **Saran saya: Pertahankan berbingkai (`p-5`) saja agar mirip brosur buku estetik**. Apakah Anda punya preferensi menabraknya sampai ujung *(Edge-to-edge)* atau kita gunakan versi berbingkai elegan?
2. **Background Warna Utama**: Rencana saya di sini adalah menggunakan `bg-[#F0FAF7]` (Surface Color ringan) untuk seluruh badan Section ini agar tidak membosankan kalau putih terus. Setuju?
