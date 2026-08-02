# Audit UI/UX NUSA Boarding School

Tanggal audit: 30 Juli 2026  
Lingkup: landing page publik, halaman pendaftaran, sistem visual, konten, aksesibilitas, dan performa UX  
Metode: audit struktur halaman, komponen, styling, aset, dan alur pengguna dari source code

## 1. Ringkasan Eksekutif

Website NUSA Boarding School telah memiliki identitas visual yang cukup kuat melalui kombinasi warna teal, cyan, dan gold, foto kegiatan santri, serta pendekatan visual teknologi yang sesuai dengan positioning sekolah IT Islami.

Masalah utamanya bukan kekurangan dekorasi, melainkan kurangnya fokus. Landing page memiliki banyak section panjang dengan bobot visual yang hampir sama. Akibatnya, pengguna harus bekerja keras untuk memahami keunggulan utama, membandingkan program, menemukan biaya, dan memutuskan untuk mendaftar.

Prioritas perbaikan adalah:

1. Membuat navigasi desktop dan mobile yang benar-benar berfungsi.
2. Memperjelas value proposition pada hero.
3. Mengurangi panjang dan repetisi landing page.
4. Mengoptimalkan aset gambar yang saat ini berjumlah sekitar 37,9 MB.
5. Mengubah form pendaftaran panjang menjadi alur bertahap.
6. Memperbaiki kontras warna, focus state, dan aksesibilitas interaksi.
7. Menambahkan bukti untuk klaim pemasaran dan outcome program.

## 2. Penilaian Umum

| Area | Nilai | Kondisi |
| --- | ---: | --- |
| Identitas visual | 7/10 | Khas dan relevan, tetapi efek visual terlalu sering digunakan |
| Typography | 6/10 | Arah font cukup jelas, implementasi dan loading belum efisien |
| Color system | 6/10 | Palet kuat, tetapi terdapat masalah kontras dan hardcoded color |
| Layout dan hierarchy | 5/10 | Terlalu panjang dan semua section terasa sama penting |
| Mobile UX | 4/10 | Navigasi mobile tidak berfungsi dan alur terlalu panjang |
| Conversion UX | 5/10 | CTA tersedia, tetapi keputusan pengguna belum dipandu dengan baik |
| Accessibility | 4/10 | Focus state, hover dependency, contrast, dan semantics perlu diperbaiki |
| Image dan performance | 3/10 | Beberapa gambar sangat besar dan galeri belum menggunakan optimasi Next.js |

## 3. Target Pengguna dan Tujuan UX

### Target utama

- Orang tua calon santri yang membutuhkan informasi legalitas, kurikulum, biaya, keamanan, dan prospek anak.
- Calon santri usia SMA yang tertarik pada programming, design, teknologi, dan lingkungan boarding school.
- Pengguna mobile yang datang dari Instagram, TikTok, WhatsApp, atau iklan digital.

### Tujuan utama website

1. Menjelaskan positioning NUSA dalam 5-10 detik pertama.
2. Membangun kepercayaan orang tua.
3. Membuat program dan outcome mudah dipahami.
4. Menjawab pertanyaan biaya dan proses pendaftaran.
5. Mengarahkan pengguna ke konsultasi atau pendaftaran.

## 4. Temuan Prioritas

### P0. Navigasi tidak membantu pengguna menjelajahi halaman

#### Temuan

- Header desktop hanya menampilkan wordmark dan tagline.
- Tidak tersedia link menuju program, kurikulum, biaya, galeri, atau pengajar.
- Tombol hamburger mobile tidak memiliki aksi untuk membuka menu.
- Landing page memiliki lebih dari 12 section sehingga navigasi menjadi kebutuhan utama.

#### Dampak

- Pengguna tidak dapat melompat langsung ke informasi yang dicari.
- Pengguna mobile harus melakukan scroll panjang.
- Informasi biaya dan pendaftaran berisiko tidak ditemukan.
- Header mengambil ruang sticky tanpa memberikan fungsi navigasi yang cukup.

#### Action

- Tambahkan menu desktop: `Program`, `Kurikulum`, `Kehidupan Santri`, `Biaya`, `Pengajar`, dan `FAQ`.
- Tambahkan tombol CTA `Daftar Sekarang` pada header.
- Gunakan mobile sheet/drawer untuk hamburger.
- Tambahkan ID pada section dan smooth scrolling dengan offset sticky header.
- Tampilkan state aktif untuk section yang sedang dibaca jika diperlukan.

#### Kriteria selesai

- Semua menu dapat digunakan dengan mouse, keyboard, dan touch.
- Hamburger memiliki `aria-expanded`, nama yang jelas, serta focus state.
- Pengguna dapat mencapai informasi biaya maksimal dalam satu interaksi dari header.

### P0. Hero belum menjelaskan manfaat utama secara langsung

#### Temuan

- Headline utama hanya menampilkan nama sekolah.
- Informasi `Programmer & Designer` dan pendidikan kesetaraan SMA berada pada supporting text yang relatif kecil.
- Promo banner, dua badge pendaftaran, headline, CTA, foto, dan floating badge saling bersaing mendapatkan perhatian.
- Heading menggunakan `whitespace-nowrap`, yang berisiko overflow pada layar kecil.

#### Dampak

- Pengunjung baru belum langsung memahami apa yang membedakan NUSA.
- Hierarki antara positioning, promo, dan CTA tidak cukup jelas.
- Hero terlihat aktif, tetapi pesan utamanya kurang kuat.

#### Action

Gunakan struktur konten berikut:

- Eyebrow: `Boarding School Islam tingkat SMA di Semarang`.
- Headline: `Menjadi Muslim Tangguh yang Siap Berkarya di Industri Teknologi`.
- Supporting copy: jelaskan jalur Programmer dan Designer, pendidikan kesetaraan SMA, dan sistem asrama.
- Primary CTA: `Daftar SPMB 2027/2028`.
- Secondary CTA: `Konsultasi dengan Admin`.
- Trust row: legalitas, jumlah santri, mitra, atau outcome yang dapat diverifikasi.

Kurangi elemen hero menjadi satu promo label, satu headline, satu supporting paragraph, dua CTA, satu visual utama, dan satu kelompok trust signal.

#### Kriteria selesai

- Pengguna dapat menjelaskan positioning NUSA setelah melihat hero selama 5 detik.
- Headline dapat membungkus secara alami pada viewport 320 px.
- CTA utama terlihat tanpa scroll pada perangkat mobile umum.

### P0. Beban gambar terlalu besar

#### Temuan

Total aset di `public/images` sekitar 37,9 MB. Contoh file terbesar:

| File | Ukuran sekitar |
| --- | ---: |
| `gallery-9-takziyah.jpg` | 9,7 MB |
| `gallery-3-itcamp.jpg` | 6,6 MB |
| `gallery-12-camp.jpg` | 4,3 MB |
| `gallery-7-googleio.png` | 2,1 MB |
| `nusa-hero-image.png` | 2,1 MB |

Galeri menggunakan elemen `<img>` biasa. Lazy loading membantu initial load, tetapi pengguna tetap akan mengunduh aset besar saat melakukan scroll.

#### Dampak

- Loading lambat pada jaringan seluler.
- Penggunaan kuota tinggi.
- Risiko buruk pada LCP, engagement, dan conversion.
- Scroll galeri dapat terasa tersendat pada perangkat kelas menengah.

#### Action

- Konversi foto ke AVIF atau WebP.
- Targetkan ukuran 150-350 KB per foto galeri.
- Batasi hero sekitar 300-500 KB.
- Gunakan `next/image` dengan atribut `sizes` yang akurat.
- Buat thumbnail terpisah untuk galeri dan gunakan versi besar hanya pada lightbox.
- Gunakan `object-position` per foto untuk menjaga wajah atau subjek penting.
- Audit dimensi asli agar file tidak jauh lebih besar dari ukuran render.

#### Kriteria selesai

- Total aset galeri awal di bawah 3 MB.
- Tidak ada satu thumbnail galeri di atas 500 KB.
- Hero memiliki LCP yang baik pada simulasi mobile.

### P0. Form pendaftaran terlalu berat dalam satu sesi

#### Temuan

Form menggabungkan data pribadi, informasi sekolah, pilihan program, pembayaran, upload bukti, dan pernyataan dalam satu halaman panjang.

#### Dampak

- Pengguna tidak mengetahui berapa lama proses akan berlangsung.
- Kesalahan pada bagian akhir dapat membuat pengguna merasa harus mengulang proses.
- Permintaan pembayaran dan upload bukti dalam sesi yang sama meningkatkan abandonment.
- Pengalaman mobile menjadi panjang dan melelahkan.

#### Action

Ubah form menjadi wizard:

1. `Data Calon Santri`
2. `Sekolah dan Pilihan Program`
3. `Pembayaran dan Konfirmasi`

Tambahkan:

- Progress indicator.
- Estimasi waktu pengisian.
- Validasi per langkah.
- Penyimpanan draft pada browser.
- Ringkasan data sebelum submit.
- Informasi format dan batas ukuran file.
- Penjelasan privasi dan penggunaan data.
- Sticky bottom action pada mobile.
- Opsi registrasi awal sebelum pembayaran jika proses bisnis memungkinkan.

#### Kriteria selesai

- Setiap langkah memiliki maksimal 5-7 input utama.
- Data tidak hilang saat pengguna kembali ke langkah sebelumnya.
- Error membawa fokus keyboard ke field bermasalah.
- Pengguna mendapat ringkasan dan status pengiriman yang jelas.

## 5. Typography

### Temuan

- Website memuat Work Sans, Inter, Inconsolata, Noto Serif, Righteous, dan Romulo.
- Inter terlihat tidak menjadi font UI utama karena `font-sans` diarahkan ke Work Sans.
- Noto Serif dan Inconsolata hanya memiliki penggunaan terbatas atau tidak penting pada halaman publik.
- Romulo dimuat dari domain Framer melalui `@font-face` eksternal.
- Utility global mengubah `font-bold`, `font-extrabold`, dan `font-black` dari nilai standar Tailwind.
- Kelas `font-work-sans` digunakan berulang, tetapi sistem utama sudah mengarahkan `font-sans` ke Work Sans.

### Dampak

- Font loading lebih kompleks dari yang diperlukan.
- Risiko layout shift atau fallback font ketika resource eksternal bermasalah.
- Arti utility weight tidak lagi sesuai ekspektasi developer.
- Heading besar yang berulang membuat hierarchy terasa datar.

### Action

- Gunakan Work Sans sebagai font utama seluruh UI.
- Gunakan Righteous hanya pada wordmark `NUSA`.
- Gunakan Romulo hanya pada tagline pendek dan self-host jika tetap dipakai.
- Hapus font yang tidak digunakan.
- Jangan override utility weight global.
- Gunakan type scale yang konsisten:

| Fungsi | Mobile | Desktop | Weight |
| --- | ---: | ---: | ---: |
| Hero headline | 38-44 px | 56-64 px | 700-800 |
| Section title | 30-36 px | 40-48 px | 700 |
| Card title | 18-22 px | 20-24 px | 600-700 |
| Body utama | 16 px | 16-18 px | 400-500 |
| Label/button | 14-16 px | 14-16 px | 500-600 |

- Gunakan line-height sekitar 1.5-1.7 untuk body.
- Batasi panjang paragraf sekitar 55-70 karakter per baris.

## 6. Color System dan Contrast

### Hal yang sudah baik

- Keluarga warna teal sesuai dengan identitas sekolah teknologi yang ramah.
- Gold memberi focal point yang kuat untuk CTA dan promo.
- Dark Base `#134146` memiliki keterbacaan baik di atas surface terang.

### Masalah

- Warna didefinisikan ulang melalui object `COLORS` dan inline style di banyak komponen.
- Terdapat banyak nilai opacity lokal yang tidak konsisten.
- Putih pada gold `#F3B233` memiliki contrast ratio sekitar 1.87:1.
- Putih pada cyan `#42CDBA` memiliki contrast ratio sekitar 1.97:1.
- Putih pada primary `#2C8970` sekitar 4.27:1 dan tidak aman untuk teks normal berukuran kecil.

### Action

- Gunakan teks `#134146` di atas gold dan cyan.
- Gunakan teal lebih gelap jika tombol membutuhkan teks putih.
- Pusatkan warna menjadi semantic token:

```css
--color-brand: #2c8970;
--color-brand-dark: #134146;
--color-brand-depth: #1f6f68;
--color-accent: #f3b233;
--color-highlight: #42cdba;
--color-surface: #f0faf7;
--color-paper: #f7f7f2;
```

- Standarkan opacity:
  - Secondary text: 70%.
  - Placeholder/disabled: 40%.
  - Border/divider: 12%.
  - Subtle background: 5%.
- Uji seluruh kombinasi teks dan background menggunakan standar WCAG AA.

## 7. Layout dan Information Architecture

### Temuan

- Landing page terdiri dari terlalu banyak section besar.
- Banyak section menggunakan padding `py-24`, `py-32`, sampai `py-40`.
- Hampir semua section memakai pola title besar, subtitle tengah, lalu card grid.
- Penggunaan rounded card, glow, grid background, dan hover elevation terlalu merata.
- Galeri 12 item dalam dua kolom menghasilkan enam baris gambar besar.

### Dampak

- Halaman terasa panjang dan repetitif.
- Tidak ada perbedaan kuat antara informasi utama dan pendukung.
- Pengguna dapat mengalami scroll fatigue sebelum mencapai biaya atau CTA terakhir.

### Action

Susunan landing page yang direkomendasikan:

1. Header dan hero.
2. Trust strip: legalitas, mitra, jumlah santri, atau pencapaian.
3. Outcome dan keunggulan utama.
4. Jurusan dan kurikulum.
5. Kehidupan santri, pengajar, dan galeri ringkas.
6. Testimoni dan bukti hasil.
7. Biaya, FAQ, dan CTA pendaftaran.

Perubahan spesifik:

- Gabungkan `NUSA Tagline`, `Why Choose`, dan `100 Days`.
- Gunakan alignment kiri untuk section informatif yang memiliki banyak teks.
- Batasi section dengan heading monumental hanya untuk hero dan satu section utama.
- Gunakan spacing 72-96 px desktop dan 48-64 px mobile sebagai baseline.
- Kurangi jumlah card dengan memilih informasi paling penting.

## 8. Imagery dan Galeri

### Temuan

- Penggunaan foto santri nyata sudah tepat dan meningkatkan kredibilitas.
- Semua foto galeri dipaksa ke rasio 16:9 menggunakan `object-cover`.
- Caption desktop bergantung pada hover.
- Galeri terlalu panjang untuk fungsi pendukung.
- Kualitas dan ukuran file foto tidak konsisten.

### Action

- Pilih 5-6 foto terbaik untuk landing page.
- Gunakan editorial grid: satu foto unggulan dan empat foto pendukung.
- Tambahkan tombol `Lihat Semua Kegiatan` menuju galeri lengkap.
- Letakkan caption tetap terlihat pada touch device.
- Gunakan lightbox yang mendukung keyboard dan focus trap.
- Buat pedoman art direction foto:
  - Aktivitas nyata, bukan hanya pose.
  - Wajah dan interaksi santri terlihat jelas.
  - Seimbangkan kegiatan IT, agama, asrama, bahasa Inggris, dan entrepreneurship.
  - Gunakan tone warna foto yang konsisten.

## 9. Content dan Conversion Copy

### Temuan

- Klaim `100 Hari Belajar, Besoknya Gajian` menarik, tetapi membutuhkan penjelasan dan bukti.
- Klaim `Satu-satunya sekolah IT yang ada di Semarang` berisiko jika tidak dapat diverifikasi.
- Sebagian copy menggunakan istilah campuran Indonesia dan Inggris.
- Informasi penting untuk orang tua belum selalu ditampilkan dekat CTA.
- Testimoni lebih banyak menyampaikan opini umum daripada hasil konkret.

### Action

- Ubah klaim menjadi spesifik dan dapat dipercaya.
- Jelaskan arti `gajian`: freelance, project internal, internship, atau bisnis santri.
- Tambahkan studi kasus karya santri dengan nama project, peran, durasi, dan hasil.
- Tambahkan disclaimer bahwa outcome setiap santri dapat berbeda.
- Konsistenkan bahasa:
  - `Email us` menjadi `Email`.
  - `Visit us` menjadi `Kunjungi Kami`.
  - `Get Direction` menjadi `Lihat Petunjuk Arah`.
  - `Curriculum` menjadi `Kurikulum` jika bukan istilah program resmi.
- Dekat CTA, tampilkan jawaban singkat tentang:
  - Jenjang dan legalitas pendidikan.
  - Lokasi sekolah.
  - Kuota.
  - Biaya awal.
  - Jadwal pendaftaran.
  - Kontak admin.

## 10. Testimoni dan Trust Signals

### Temuan

- Testimoni menggunakan avatar inisial.
- Nama dan jabatan menggunakan `truncate` sehingga dapat terpotong.
- Carousel menambah interaksi untuk membaca hanya empat testimoni.
- Partner logo terlihat interaktif melalui cursor dan hover, tetapi fungsi klik belum jelas.

### Action

- Gunakan foto asli dengan izin.
- Prioritaskan wali santri, santri, alumni, dan mitra industri.
- Tampilkan outcome spesifik dalam kutipan.
- Untuk empat testimoni, pertimbangkan grid statis atau satu featured testimonial dan tiga supporting quotes.
- Jangan potong nama dan jabatan penting.
- Jika partner dapat diklik, gunakan link dengan tujuan yang jelas. Jika tidak, hilangkan cursor pointer.
- Tambahkan trust signal yang dapat diverifikasi seperti legalitas, afiliasi yayasan, mitra, dan karya santri.

## 11. Accessibility

### Temuan

- Terdapat pola link yang membungkus button, menghasilkan nested interactive element.
- Tombol carousel menggunakan `focus:outline-none` tanpa focus replacement yang cukup jelas.
- Caption galeri desktop hanya muncul melalui hover.
- Animasi pulse, scale, translate, dan transisi panjang belum mempertimbangkan reduced motion.
- Sebagian teks muted menggunakan opacity rendah.
- Hamburger belum memiliki state atau fungsi menu.

### Action

- Gunakan satu interactive element saja: link bergaya button atau button dengan event, bukan keduanya.
- Tambahkan `focus-visible` ring dengan contrast yang jelas.
- Pastikan seluruh informasi dapat diakses tanpa hover.
- Tambahkan dukungan `prefers-reduced-motion`.
- Pastikan touch target minimal 44 x 44 px.
- Gunakan heading hierarchy yang berurutan.
- Hubungkan error form melalui `aria-describedby`.
- Gunakan `aria-live` untuk status upload, error submit, dan success state.
- Uji keyboard-only dan screen reader pada header, carousel, form, dan lightbox.

## 12. Motion dan Interaction

### Temuan

- Banyak card menggunakan kombinasi hover translate, scale, shadow, border, dan glow.
- Durasi animasi 300-700 ms digunakan secara luas.
- Animasi lebih berfungsi sebagai dekorasi daripada membantu orientasi pengguna.

### Action

- Gunakan motion hanya untuk feedback dan perubahan state.
- Standardisasi durasi:
  - Hover/press: 120-180 ms.
  - Panel/menu: 200-300 ms.
  - Page/section reveal: maksimal 400-500 ms.
- Hindari scale pada terlalu banyak card.
- Gunakan elevation atau border change sebagai hover utama.
- Gunakan animasi pulse hanya untuk informasi yang benar-benar time-sensitive.
- Tambahkan reduced-motion fallback tanpa transform.

## 13. SEO dan Brand Detail

### Temuan

- Metadata dasar sudah tersedia.
- Metadata masih memiliki generator `v0.app`.
- Favicon diletakkan di komponen header dan menggunakan relative path.
- Belum terlihat social sharing metadata yang kuat pada root layout.

### Action

- Pindahkan favicon ke metadata Next.js atau `app/icon.*`.
- Hapus generator yang tidak relevan untuk brand publik.
- Tambahkan Open Graph title, description, image, locale, dan canonical URL.
- Gunakan title spesifik seperti `NUSA Boarding School Semarang | Sekolah IT Islami`.
- Tambahkan structured data untuk EducationalOrganization jika datanya tersedia.

## 14. Roadmap Implementasi

### Fase 1: Quick Wins dan Risiko Utama

Estimasi: 2-4 hari kerja

- Implementasikan navigasi desktop dan mobile.
- Perbaiki hero headline dan supporting copy.
- Hilangkan nested link-button.
- Perbaiki contrast gold/cyan.
- Tambahkan focus-visible dan reduced-motion dasar.
- Kompres lima gambar terbesar.
- Perbaiki bahasa campuran pada footer dan komponen utama.

### Fase 2: Conversion dan Information Architecture

Estimasi: 4-7 hari kerja

- Ringkas landing page menjadi 6-7 blok utama.
- Gabungkan section yang menyampaikan manfaat serupa.
- Buat trust strip.
- Perbarui testimoni dan bukti outcome.
- Ubah galeri menjadi preview ringkas.
- Tambahkan FAQ dekat biaya dan CTA.

### Fase 3: Form Pendaftaran

Estimasi: 4-7 hari kerja

- Ubah form menjadi wizard tiga langkah.
- Tambahkan validasi per langkah dan progress indicator.
- Tambahkan draft persistence dan confirmation summary.
- Perjelas alur pembayaran, upload, privasi, dan error handling.
- Uji form pada perangkat mobile dan koneksi lambat.

### Fase 4: Design System dan Polish

Estimasi: 3-5 hari kerja

- Konsolidasikan token warna dan spacing.
- Sederhanakan font loading.
- Standardisasi heading, body, button, card, radius, dan shadow.
- Rapikan motion system.
- Lakukan audit WCAG dan performance akhir.

## 15. Backlog Prioritas

| ID | Action | Prioritas | Dampak | Effort |
| --- | --- | --- | --- | --- |
| UX-01 | Membuat navigasi desktop dan mobile | P0 | Tinggi | Sedang |
| UX-02 | Menulis ulang hierarchy hero | P0 | Tinggi | Rendah |
| UX-03 | Mengoptimalkan semua gambar besar | P0 | Tinggi | Sedang |
| UX-04 | Memperbaiki contrast dan semantics CTA | P0 | Tinggi | Rendah |
| UX-05 | Mengubah form menjadi multi-step | P0 | Tinggi | Tinggi |
| UX-06 | Ringkas struktur landing page | P1 | Tinggi | Tinggi |
| UX-07 | Tambahkan trust signal dan bukti outcome | P1 | Tinggi | Sedang |
| UX-08 | Ringkas galeri dan tambahkan halaman lengkap | P1 | Sedang | Sedang |
| UX-09 | Tingkatkan kualitas testimoni | P1 | Tinggi | Sedang |
| UX-10 | Konsolidasikan typography dan font loading | P1 | Sedang | Rendah |
| UX-11 | Pusatkan color dan spacing tokens | P2 | Sedang | Sedang |
| UX-12 | Standardisasi motion dan reduced motion | P2 | Sedang | Sedang |
| UX-13 | Lengkapi Open Graph dan structured data | P2 | Sedang | Rendah |

## 16. Metrik Keberhasilan

Perbaikan sebaiknya dievaluasi menggunakan metrik berikut:

- Persentase pengguna yang mencapai section biaya.
- Klik CTA `Daftar Sekarang` dan `Konsultasi WhatsApp`.
- Completion rate form pendaftaran.
- Drop-off per langkah form.
- Waktu rata-rata menyelesaikan pendaftaran.
- LCP, INP, dan CLS pada mobile.
- Bounce rate dari traffic media sosial.
- Rasio pengguna mobile yang membuka navigasi.
- Jumlah pertanyaan admin yang sebenarnya sudah dapat dijawab website.

Target teknis minimum:

- LCP mobile di bawah 2,5 detik.
- CLS di bawah 0,1.
- INP di bawah 200 ms.
- Semua teks normal memenuhi WCAG AA 4.5:1.
- Semua kontrol dapat digunakan dengan keyboard.
- Tidak ada gambar landing page di atas 500 KB tanpa alasan khusus.

## 17. Urutan Rekomendasi Utama

Jika hanya dapat melakukan lima pekerjaan terlebih dahulu, lakukan dalam urutan berikut:

1. Aktifkan navigasi dan CTA header.
2. Optimalkan aset gambar.
3. Perjelas headline, supporting copy, dan trust signal pada hero.
4. Ubah form pendaftaran menjadi multi-step.
5. Ringkas jumlah section dan perkuat bukti untuk klaim program.

## 18. Catatan Audit

Audit ini berfokus pada source code, struktur halaman, styling, konten, aset, dan alur pengguna. Percobaan render lokal dilakukan, tetapi server Next.js menerima koneksi tanpa menyelesaikan respons dalam batas waktu audit. Oleh karena itu, sebelum implementasi besar dimulai, tetap disarankan melakukan visual QA tambahan menggunakan screenshot desktop dan mobile dari environment yang berhasil berjalan.
