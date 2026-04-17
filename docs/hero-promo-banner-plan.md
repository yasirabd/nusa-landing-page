# Plan Promo Banner Tanpa Menambah CTA di Hero

## Summary
Tambahkan promo banner di bagian paling atas area konten `HeroSection` untuk menonjolkan urgency tanpa membuat hero terasa penuh oleh terlalu banyak tombol. Banner menampilkan pesan promo dan countdown timer, sementara jumlah CTA tetap dipertahankan dua: `Konsultasi WhatsApp` dan CTA pendaftaran utama yang ada, dengan copy CTA pendaftaran diperbarui agar selaras dengan promo.

## Implementation Changes
- Update `components/hero-section.tsx` dengan menambahkan promo banner di atas blok headline utama, masih di dalam container hero agar menyatu dengan komposisi yang ada dan tidak bentrok dengan `Header`.
- Gunakan palette brand terbaru agar banner tetap urgent tetapi menyatu dengan hero:
  - `#2C8970` sebagai primary anchor
  - `#42CDBA` sebagai tint terang agar banner tetap terasa cerah
  - `#F7F7F2` untuk surface atau teks terang
  - `#8EF3E7` untuk glow tipis atau aksen digital
  - `#F3B233` untuk angka promo, kata penting, atau elemen urgency
- Hindari merah/orange generik yang terasa lepas dari identitas visual hero; urgency harus tetap branded, bukan terasa seperti iklan eksternal.
- Tampilkan teks promo persis: `"PROMO TERBATAS! Potongan Rp 8 JUTA untuk 10 Pendaftar Pertama!"`.
- Tambahkan countdown timer di dalam banner sebagai elemen urgency, dengan layout responsif yang tetap rapi di mobile dan desktop.
- Jangan menambahkan tombol ketiga di promo banner; fokus banner adalah menarik perhatian dan mengarahkan mata ke CTA hero yang sudah ada.
- Ubah label tombol `Daftar Sekarang` yang sudah ada menjadi `"Daftar Sekarang & Dapatkan Diskon!"` agar promo punya jalur aksi yang jelas tanpa menambah kepadatan visual.
- Pertahankan tombol `Konsultasi WhatsApp` apa adanya sebagai jalur alternatif untuk pengguna yang masih ingin bertanya sebelum mendaftar.
- Jaga hierarchy hero tetap jelas: promo banner dulu, lalu headline/subheadline, lalu dua CTA eksisting, lalu hero image.
- Pertahankan bahasa visual komponen saat ini: rounded corners, spacing lega, shadow ringan berwarna teal, gradient halus, dan kontras teks yang kuat.
- Jika banner menampilkan identitas brand atau lockup logo, gunakan typography terbaru:
  - `Righteous` untuk `NUSA`
  - `Work Sans` untuk `Boarding School`
- Seluruh promo text, countdown, CTA copy, supporting text, dan label urgency menggunakan `Work Sans`.
- `Romulo Italic` hanya boleh dipakai bila ada frase aksen pendek yang memang ingin diberi nuansa editorial, dan tidak boleh menjadi font utama banner.

## Public Interfaces / Types
- Tidak ada perubahan API publik halaman atau route.
- Tambahkan konfigurasi internal sederhana untuk promo text dan target countdown placeholder agar nilai deadline bisa diisi nanti tanpa mengubah struktur UI.
- Karena countdown butuh update waktu di client, implementasi harus memilih salah satu pendekatan yang aman:
  - jadikan `HeroSection` sebagai client component, atau
  - ekstrak countdown menjadi subkomponen client kecil agar bagian hero lain tetap statis
- Jika countdown dipisah, props cukup minimal, misalnya `targetDate` atau nilai placeholder yang mudah diganti saat tanggal promo final sudah tersedia.

## Test Plan
- Verifikasi promo banner muncul di posisi paling atas area hero content dan tidak menabrak header.
- Verifikasi teks promo tampil utuh, kontras, dan tetap terbaca pada viewport mobile kecil sampai desktop.
- Verifikasi countdown tampil stabil tanpa hydration error, dan punya fallback/placeholder yang tetap masuk akal sebelum target waktu final ditetapkan.
- Verifikasi tombol pendaftaran utama sekarang berlabel `"Daftar Sekarang & Dapatkan Diskon!"` dan tetap mengarah ke Google Form yang sama seperti sebelumnya.
- Verifikasi tombol `Konsultasi WhatsApp` tetap berfungsi dan keberadaan banner tidak membuat susunan CTA terasa sempit atau timpang.
- Verifikasi penambahan banner tidak merusak alignment headline, badge kuota, subheadline, maupun hero image.
- Verifikasi warna banner tetap terasa cerah dan menyatu dengan hero meski primary brand-nya `#2C8970`.

## Assumptions
- Scope tetap hanya di `components/hero-section.tsx`, tanpa perubahan pada section lain.
- Countdown belum punya deadline promo final, jadi implementasi menyiapkan placeholder/configuration point, bukan deadline hardcoded yang berpotensi menyesatkan.
- CTA baru tidak ditambahkan; CTA pendaftaran lama cukup diganti copy-nya agar hero tetap fokus dan tidak terasa overcrowded.
- Link tombol pendaftaran tetap memakai Google Form yang sudah digunakan saat ini.
- Primary brand mengikuti style terbaru: `#2C8970` adalah anchor utama, sementara `#42CDBA` berfungsi sebagai secondary terang.
- Typography final mengikuti style terbaru: `Work Sans` untuk seluruh teks website, `Righteous` untuk `NUSA`, dan `Romulo Italic` hanya untuk aksen terbatas.
