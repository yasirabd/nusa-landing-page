# Design Style Guide

> Diperbarui 3 Agustus 2026: font UI resmi berpindah dari Work Sans ke **Geist Sans**; font aksen berpindah dari Romulo Italic (CDN Framer) ke **DM Serif Display Italic** (Google Fonts). Palet warna tidak berubah.

## Color Palette

### Brand Colors (Keluarga Teal)
Kelima warna ini membentuk satu keluarga tonal dari gelap ke terang, semuanya berbasis teal.

- Dark Base: `#134146`
  Warna paling gelap. Digunakan untuk footer background, teks heading dan body di atas surface terang, dan area yang butuh anchor visual kuat. Ini adalah **warna teks utama** di seluruh website.
- Depth Tone: `#1F6F68`
  Digunakan untuk panel gelap, overlay, grid background, shadow berwarna, dan area penyeimbang agar komposisi tetap punya depth.
- Primary: `#2C8970` *(warna logo — tidak boleh diubah)*
  Warna brand utama. Digunakan untuk hero background, section background berwarna (Why Choose, Teaching Team, Testimonials), identitas visual utama, dan area yang perlu langsung terasosiasi dengan NUSA.
- Secondary: `#42CDBA`
  Tint terang pendukung. Menjaga tampilan tetap cerah, segar, dan modern. Digunakan untuk highlight ringan, border dekoratif, dan elemen yang butuh kontras terang terhadap Primary. **Catatan kontras:** jangan gunakan sebagai warna ikon/teks bermakna di atas surface terang (kontras < 3:1) — gunakan Primary `#2C8970`.
- Neon Cyan: `#8EF3E7`
  Warna paling terang di keluarga teal. Cocok untuk glow, garis digital, hover state, dan elemen dekoratif berbasis teknologi. Gunakan secukupnya.

### Neutral Colors
- Surface: `#F0FAF7`
  Background section terang yang terhubung secara hue ke keluarga teal. Digunakan untuk section-section seperti Gallery, Program, Registration — sebagai alternatif dari putih polos agar halaman punya variasi tanpa kehilangan keterkaitan warna.
- White: `#F7F7F2`
  Putih hangat. Digunakan untuk teks di atas background gelap atau berwarna, card background, dan surface yang perlu terasa bersih. Hindari putih polos `#FFFFFF` sebagai background section.
- Charcoal: `#2B2B2B`
  Netral gelap murni (tanpa hue). Digunakan **hanya** untuk icon fill/stroke, outline tipis, dan shadow ringan. **Bukan untuk teks** — gunakan Dark Base `#134146` untuk teks agar tetap teal-tinted dan konsisten.

### Accent Colors
- Accent: `#F3B233` *(golden yellow)*
  Warna interaktif utama. Dipakai untuk CTA button, badge, headline promo, highlight penting, dan elemen urgency. Kontras kuat terhadap seluruh keluarga teal.
  - Hover state: `#F6BE4D` (token `--color-brand-accent-hover`)
- Neon Cyan: `#8EF3E7` *(lihat Brand Colors)*
  Boleh berfungsi ganda sebagai accent sekunder untuk elemen digital/tech.
- Depth hover: `#24745F` (token `--color-brand-depth-hover`) untuk tombol sekunder berbasis Depth Tone.

### Aturan CTA
- **CTA primer selalu Accent `#F3B233`** dengan teks Dark Base — di header, section, maupun penutup. Jangan berganti-ganti dengan teal.
- CTA sekunder: outline/ghost di atas gelap, atau Depth Tone `#1F6F68` di atas terang.

### Opacity Patterns (berbasis Dark Base `#134146`)
Untuk kebutuhan mid-tone tanpa menambah warna baru, gunakan Dark Base di berbagai opacity:
- Teks utama: `#134146` opacity `100%`
- Teks sekunder / muted: `#134146` opacity `70%`
- Teks disabled / placeholder: `#134146` opacity `40%`
- Border / divider: `#134146` opacity `12%`
- Background hover ringan: `#134146` opacity `5%`

**Dilarang** memakai skala gray/red/yellow Tailwind (`gray-100`, `red-500`, `yellow-50`, dst.) — selalu turunkan dari palet di atas.

### Warna Legacy (Harus Dimigrasi)
Warna-warna berikut masih ditemukan di beberapa komponen dan harus secara bertahap diganti ke palette resmi:
- `#E3B251` / `#e3b251` → ganti ke `#F3B233` (Accent).
- `#B6CB6C` → ganti ke `#42CDBA` (Secondary) atau `#2C8970` (Primary) tergantung konteks.
- `#0e3238` → ganti ke `#134146` (Dark Base).
- `text-red-500` (harga coret) → `#134146` opacity 50% + line-through.
- `gray-*` (border, divider, placeholder) → `#134146` opacity 5–12%.

## Typography
- Logo Wordmark:
  - `NUSA` menggunakan `Righteous`
  - `Boarding School` menggunakan `Geist Sans` *(sebelumnya Work Sans — pastikan master file logo ikut diperbarui atau catat sebagai pengecualian)*
- Heading Website: `Geist Sans`
  Digunakan untuk hero heading, section title, card title, dan headline promosi. Karakter: modern, netral-teknis, bersih — selaras dengan positioning sekolah IT.
- Subheading: `Geist Sans`
- Body: `Geist Sans`
  Prioritaskan readability di desktop maupun mobile.
- Accent Phrase: `DM Serif Display Italic` *(Google Fonts, via next/font — menggantikan Romulo Italic)*
  Dipakai untuk frase pendek yang ingin diberi penekanan emosional atau brand flavor, seperti tagline utama. Jangan dipakai untuk paragraf panjang, heading umum, navigasi, atau CTA utama. Fallback: `Georgia, serif` italic.
- Hierarki yang direkomendasikan:
  - Heading utama: `Geist Sans` weight `700–800`
  - Section title / subheading: `Geist Sans` weight `600–700`
  - Body text: `Geist Sans` weight `400–500`
  - Label / button / nav: `Geist Sans` weight `500–600`
- **Preset heading section (2 tingkat, jangan menambah varian):**
  - `display` — section utama (Kurikulum, Program, Tim Pengajar, Biaya, Partner):
    `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight`
  - `standard` — section pendukung (Why Choose, Gallery, Testimonials, FAQ, Registration):
    `text-3xl sm:text-4xl font-bold tracking-tight`
- Sistem font final:
  - Logo: `Righteous` + `Geist Sans`
  - Website UI: `Geist Sans`
  - Accent terbatas: `DM Serif Display Italic`

## Tagline (Kanonik)
Penulisan resmi, dipakai persis sama di semua media:

> **Muslim Tangguh, Jago IT**

- Selalu dengan koma. Sumber tunggal: `siteConfig.tagline` di `lib/site-config.ts`.
- Boleh diberi kata pengantar ("Menjadi…", "Jadilah bagian dari…") tanpa mengubah frasa intinya.

## Layout
- Grid: Gunakan grid modern yang rapi dengan fokus kuat pada center hero area
- Hierarchy:
  - Hero section harus menjadi titik fokus utama
  - Judul besar diletakkan di atas fold
  - CTA utama harus langsung terlihat tanpa scroll
  - Informasi sekunder ditempatkan dalam blok/card yang mudah dipindai
- Alignment:
  - Kombinasi center alignment pada hero
  - Left alignment untuk section konten agar nyaman dibaca
- Ritme background section: selang-seling `Surface` / `White (paper)` / panel gelap — hindari lebih dari dua section berurutan dengan background sama.
- Karakter layout:
  - Padat visual tetapi tetap terarah
  - Memiliki layering dan depth
  - Banyak highlight visual, namun tidak mengorbankan keterbacaan

## Visual Style
- Gaya utama: Futuristik edukatif dengan sentuhan playful
- Pendekatan visual:
  - Semi-3D ringan
  - Digital sci-fi yang cerah
  - Modern, muda, dan aspiratif
- Ciri visual utama:
  - Background grid atau pola digital
  - Garis cahaya, glow, dan node interface
  - Rounded card dan badge
  - Shadow lembut dengan highlight terang
  - Layering elemen untuk memberi kesan immersive
- Arah implementasi website:
  - Gunakan gradient atau background berpola agar halaman tidak terasa datar
  - Saat memakai `#2C8970` sebagai primary, jaga mood tetap terang dengan bright turquoise tint, surface putih, dan glow cyan
  - Terapkan glow secukupnya pada button, badge, atau elemen penting
  - Hindari tampilan terlalu flat dan generik
  - Hindari nuansa terlalu gelap agar brand tetap ramah dan edukatif
- **Emoji tidak dipakai** di UI — gunakan ikon lucide dengan warna palet.

## Imagery
- Foto:
  - Gunakan foto siswa nyata sebagai elemen utama visual
  - Pose sebaiknya percaya diri, aktif, dan relevan dengan konteks sekolah teknologi
  - Framing foto bisa dibuat seperti hero portrait atau grouped students
- Ilustrasi:
  - Gunakan ilustrasi hanya sebagai pendukung
  - Hindari ilustrasi yang terlalu kartun jika ingin menjaga kredibilitas institusi
- Icon style:
  - Gunakan icon yang clean, modern, dan familiar (lucide)
  - Ikon teknologi, coding, design, atau tools digital sangat relevan
- Efek visual:
  - Glow tipis
  - Floating elements
  - Outline terang
  - Panel atau frame digital untuk memperkuat nuansa tech

## Format Angka & Biaya
- Rupiah tanpa spasi: `Rp275.000`, `Rp10 juta`, `Rp2 juta/bulan`, `Rp1,25 juta/semester`.
- Desimal memakai koma (konvensi Indonesia), ribuan memakai titik.
- Istilah biaya konsisten: "Biaya Masuk (SPI)" saat pertama disebut, selanjutnya boleh "SPI".

## Tone Komunikasi
- Modern
- Aspiratif
- Edukatif
- Tech-savvy
- Islami ringan
- Ramah untuk remaja dan orang tua
- Profesional tetapi tidak kaku

## Visual Direction
- Website perlu memposisikan brand sebagai sekolah IT Islami yang modern, relevan, dan membangun masa depan.
- Identitas visual sebaiknya menampilkan perpaduan:
  - semangat pendidikan
  - kepercayaan diri generasi muda
  - teknologi kreatif
  - lingkungan belajar yang terarah
- Gaya visual yang disarankan: cerah, energetic, digital, friendly
- Hindari:
  - desain corporate yang terlalu kaku
  - minimalisme polos tanpa karakter
  - ornamen berlebihan yang membuat UI terasa ramai

## Keywords
- Islamic tech school
- logo green bright interface
- futuristic education website
- youth tech academy
- turquoise neon grid
- playful digital interface
- student future vision
- modern sans heading
- modern school landing page
- coding and design education
- semi-3D web aesthetic
- sci-fi classroom visual
- clean techno branding
- aspirational student hero
- edu-tech website design
