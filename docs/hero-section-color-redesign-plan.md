# Hero Section Color Redesign Plan

## Summary
Redesign warna pada `components/hero-section.tsx` agar selaras dengan `docs/style.md`, dengan fokus pada penggunaan `#2C8970` sebagai primary brand resmi. Struktur hero tetap dipertahankan, tetapi seluruh surface color, glow, highlight, dan CTA disusun ulang agar tetap terasa cerah, modern, dan tech-forward tanpa melepaskan warna logo.

## Key Changes
- Ganti background hero dari fill tunggal ke komposisi berlapis:
  - Primary `#2C8970` untuk base visual utama
  - Secondary `#42CDBA` untuk tint terang dan highlight agar hero tetap terasa bright
  - Depth Tone `#1F6F68` untuk depth, overlay, dan area penyeimbang
  - Optional Accent `#8EF3E7` untuk glow, node, atau garis digital ringan
- Ubah elemen dekoratif background agar sesuai visual style guide:
  - lingkaran besar/medium memakai tint turquoise/cyan transparan, bukan putih polos
  - shape kecil dan star/decorative node memakai golden yellow atau soft neon cyan, bukan warna olive lama
  - arahkan background ke gradient atau digital-grid feel, bukan flat fill
- Samakan semua elemen highlight ke accent brand:
  - tombol utama memakai `#F3B233`
  - teks/icon tombol utama memakai dark teal atau charcoal
  - badge kuota dan highlight `SPMB 2026–2027` memakai golden yellow yang konsisten
- Rapikan semua hardcoded color agar hanya memakai palette dari `docs/style.md`:
  - hapus penggunaan warna lama yang tidak sesuai palette baru seperti `#B6CB6C`, `#e3b251`, `#134146`, dan warna hijau acak lain di luar sistem
  - definisikan mapping warna lokal yang eksplisit di komponen agar mudah dirawat
- Pertahankan image card sebagai elemen terang, tetapi sesuaikan treatment visual:
  - border tetap terang
  - shadow diarahkan ke teal gelap, bukan hitam netral dominan
  - glow tipis cyan opsional untuk memberi depth dan nuansa immersive
- Jaga aksesibilitas:
  - heading putih tetap dominan dan terbaca kuat
  - subheadline tetap punya kontras aman
  - hover state tombol tidak menurunkan keterbacaan label dan icon

## Public Interfaces / Implementation Notes
- Tidak ada perubahan API untuk `HeroSection`.
- Tidak ada perubahan props, struktur konten, atau layout utama.
- Perubahan hanya mencakup warna, glow, shadow, dan decorative color treatment di `components/hero-section.tsx`.
- File implementasi utama tetap `components/hero-section.tsx`.
- File plan ini ditujukan untuk disimpan sebagai `docs/hero-section-color-redesign-plan.md`.
- Untuk elemen logo atau brand lockup di hero, gunakan typography brand terbaru:
  - `Righteous` untuk tulisan `NUSA`
  - `Work Sans` untuk tulisan `Boarding School`
- Untuk seluruh heading, subheadline, badge, CTA copy, dan supporting text lain di hero, gunakan `Work Sans`.
- Jika ada frase aksen pendek yang ingin diberi emphasis emosional, `Romulo Italic` boleh dipakai secara terbatas dan tidak menggantikan heading utama.

## Test Plan
- Verifikasi visual di desktop dan mobile:
  - headline tetap terbaca jelas
  - CTA utama tetap paling dominan
  - image card tetap kontras terhadap background
  - hero terasa terang dan segar meski primary utamanya `#2C8970`
- Verifikasi konsistensi warna:
  - semua warna utama hanya memakai palette dari `docs/style.md`
  - `#2C8970` muncul sebagai warna brand dominan
  - `#42CDBA` dipakai sebagai bright secondary support, bukan sebagai primary baru
  - tidak ada sisa warna legacy di hero
- Verifikasi interaction states:
  - hover tombol utama dan sekunder tetap sesuai tema
  - icon dan teks tombol tetap kontras
- Verifikasi thematic fit:
  - hero terasa lebih futuristik, cerah, dan branded
  - hasil akhir tidak terasa terlalu flat, terlalu corporate, atau terlalu gelap

## Assumptions
- Scope hanya redesign warna dan treatment visual permukaan, bukan perubahan layout, copy, atau struktur section.
- `PromoBanner` di luar scope kecuali implementasinya nanti perlu penyesuaian minor agar tidak bentrok dengan warna hero baru.
- Font konten hero mengikuti sistem typography final di `docs/style.md`: `Work Sans` untuk website, `Righteous` untuk wordmark, dan `Romulo Italic` hanya untuk aksen terbatas.
- Keputusan default: `#2C8970` dianggap primary brand resmi, sedangkan `#42CDBA` turun fungsi menjadi bright secondary support.
