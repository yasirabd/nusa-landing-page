# Design Style Guide

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
  Tint terang pendukung. Menjaga tampilan tetap cerah, segar, dan modern. Digunakan untuk highlight ringan, border dekoratif, dan elemen yang butuh kontras terang terhadap Primary.
- Neon Cyan: `#8EF3E7`
  Warna paling terang di keluarga teal. Cocok untuk glow, garis digital, hover state, dan elemen dekoratif berbasis teknologi. Gunakan secukupnya.

### Neutral Colors
- Surface: `#F0FAF7`
  Background section terang yang terhubung secara hue ke keluarga teal. Digunakan untuk section-section seperti Gallery, Program, Registration — sebagai alternatif dari putih polos agar halaman punya variasi tanpa kehilangan keterkaitan warna.
- White: `#F7F7F2`
  Putih hangat. Digunakan untuk teks di atas background gelap atau berwarna, card background, dan surface yang perlu terasa bersih.
- Charcoal: `#2B2B2B`
  Netral gelap murni (tanpa hue). Digunakan **hanya** untuk icon fill/stroke, outline tipis, dan shadow ringan. **Bukan untuk teks** — gunakan Dark Base `#134146` untuk teks agar tetap teal-tinted dan konsisten.

### Accent Colors
- Accent: `#F3B233` *(golden yellow)*
  Warna interaktif utama. Dipakai untuk CTA button, badge, headline promo, highlight penting, dan elemen urgency. Kontras kuat terhadap seluruh keluarga teal.
- Neon Cyan: `#8EF3E7` *(lihat Brand Colors)*
  Boleh berfungsi ganda sebagai accent sekunder untuk elemen digital/tech.

### Opacity Patterns (berbasis Dark Base `#134146`)
Untuk kebutuhan mid-tone tanpa menambah warna baru, gunakan Dark Base di berbagai opacity:
- Teks utama: `#134146` opacity `100%`
- Teks sekunder / muted: `#134146` opacity `70%`
- Teks disabled / placeholder: `#134146` opacity `40%`
- Border / divider: `#134146` opacity `12%`
- Background hover ringan: `#134146` opacity `5%`

### Warna Legacy (Harus Dimigrasi)
Warna-warna berikut masih ditemukan di beberapa komponen dan harus secara bertahap diganti ke palette resmi:
- `#E3B251` → ganti ke `#F3B233` (Accent). Fungsi sama, hue sedikit berbeda agar lebih konsisten.
- `#B6CB6C` → ganti ke `#42CDBA` (Secondary) atau `#2C8970` (Primary) tergantung konteks. Warna hijau-olive ini tidak lagi sesuai arah visual brand.
- `#e3b251` (lowercase) → sama dengan `#E3B251`, ganti ke `#F3B233`.
- `#0e3238` → ganti ke `#134146` (Dark Base) untuk konsistensi.

## Typography
- Logo Wordmark:
  - `NUSA` menggunakan `Righteous`
  - `Boarding School` menggunakan `Work Sans`
  Kombinasi ini menjadi identitas wordmark resmi brand: modern, tegas, ramah, dan tetap profesional.
- Heading Website: `Work Sans`
  Digunakan untuk hero heading, section title, card title, dan headline promosi. Karakternya harus modern, tegas, bersih, dan mudah dibaca tanpa terlihat terlalu dekoratif.
- Subheading: `Work Sans`
  Digunakan untuk subjudul, label section, supporting headline, dan penjelas singkat yang perlu tetap rapi serta kuat secara hierarchy.
- Body: `Work Sans`
  Digunakan untuk paragraf, deskripsi program, informasi kontak, caption, dan semua teks informatif utama. Prioritaskan readability di desktop maupun mobile.
- Accent Phrase: `Romulo Italic`
  Dipertahankan sebagai font aksen untuk frase pendek yang ingin diberi penekanan emosional atau brand flavor, seperti tagline utama. Jangan dipakai untuk paragraf panjang, heading umum, navigasi, atau CTA utama.
- Karakter font:
  - Wordmark logo harus terasa khas, bersih, dan mudah dikenali
  - Heading website harus tegas, modern, dan bersih
  - Teks pendukung harus ramah, rapi, dan profesional
  - Accent phrase boleh lebih ekspresif, tetapi tetap terkontrol
- Hierarki yang direkomendasikan:
  - Heading utama: `Work Sans` weight `700–800`
  - Section title / subheading: `Work Sans` weight `600–700`
  - Body text: `Work Sans` weight `400–500`
  - Label / button / nav: `Work Sans` weight `500–600`
- Sistem font final:
  - Logo: `Righteous` + `Work Sans`
  - Website UI: `Work Sans`
  - Accent terbatas: `Romulo Italic`

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
- Struktur yang direkomendasikan untuk website:
  - Hero: branding, headline, subheadline, CTA
  - Program section: jurusan atau kompetensi utama
  - Benefit section: keunggulan sekolah
  - Promo/info pendaftaran
  - Contact section / CTA penutup
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

## Imagery
- Foto:
  - Gunakan foto siswa nyata sebagai elemen utama visual
  - Pose sebaiknya percaya diri, aktif, dan relevan dengan konteks sekolah teknologi
  - Framing foto bisa dibuat seperti hero portrait atau grouped students
- Ilustrasi:
  - Gunakan ilustrasi hanya sebagai pendukung
  - Hindari ilustrasi yang terlalu kartun jika ingin menjaga kredibilitas institusi
- Icon style:
  - Gunakan icon yang clean, modern, dan familiar
  - Boleh mengarah ke semi-3D atau badge style
  - Ikon teknologi, coding, design, atau tools digital sangat relevan
- Efek visual:
  - Glow tipis
  - Floating elements
  - Outline terang
  - Panel atau frame digital untuk memperkuat nuansa tech

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
- Gaya visual yang disarankan:
  - cerah
  - energetic
  - digital
  - friendly
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
