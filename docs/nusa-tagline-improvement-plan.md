# NUSA Tagline Design Improvement Plan

Plan ini bertujuan untuk meningkatkan nilai estetika komponen peringkas visi `nusa-tagline.tsx` agar tampil lebih berwibawa, inspiratif, dan modern tanpa mengorbankan _style guide_ merek.

## 1. Ringkasan Audit Desain Saat Ini

1. **Warna Hardcoded**: Penggunaan warna teks `#134146` dan `#F3B233` masih tertulis statis *inline style*, beda dengan tata cara di *hero section*.
2. **Redundansi Class**: Terdapat penulisan class Tailwind yang mubazir (contoh: `text-3xl sm:text-3xl` berulang) dan duplikasi spesifikasi `font-sans`.
3. **Kekosongan Estetika**: Latar belakang sama sekali polos (hanya padding dan teks ditengah layar). Komponen deklarasi visi/kutipan yang kuat idealnya memiliki ornamen tekstur pengantar tipis *(subtle background)* agar tidak terlihat seperti baris PDF yang terpisah.

---

## 2. Rencana Perbaikan (Proposed Changes)

Berikut adalah detail teknis perombakan pada `components/nusa-tagline.tsx`:

### A. Pembakuan Manajemen Warna
- Mengisolasi kode hex ke suatu objek `COLORS` abstrak di atas badan fungsi komponen. Mengikuti keselarasan `Dark Base (#134146)` untuk teks dan `Accent (#F3B233)` untuk highlight *Golden Yellow*.

### B. Pembersihan & Proporsi Tipografi
- Memuluskan kurva rasionial *responsive text*: `text-2xl sm:text-3xl md:text-4xl lg:text-[42px]` agar progresif dari mobile-friendly sampai desktop megah.
- Merapikan nilai `tracking-tighter` yang dirasa kurang lebar sedikit untuk keterbacaan teks besar menjadi `tracking-tight` normal, agar tidak sumpek.

### C. Injeksi "Pure Typography" (Strict Rushd Style)
Pendekatan terakhir mencabut seluruh gaya dekoratif dan bertumpu 100% pada kekuatan tipografi super bersih (sangat identik dengan referensi `rushd.sch.id`):
- **Latar Putih Polos (`bg-white`)**: Membunuh seluruh *Background Digital Grid* maupun *Radial Glow*. Area ini dibiarkan sepenuhnya polos tanpa gangguan visual sedikitpun untuk mengeksploitasi dominasi *whitespace*.
- **Pemisahan Semantic White-Space (Anti-Overflow)**: Terkait "Muslim Tangguh, Jago IT.", alih-alih merangkainya dalam satu bungkus `whitespace-nowrap` rentan *overflow* *(melebihi batas layar HP 320px)*, frasa ini dipecah aman menjadi dua blok *nowrap* terpisah (`<span className="whitespace-nowrap">Muslim Tangguh,</span> <span className="whitespace-nowrap">Jago IT.</span>`). Secara semantik tetap satu nafas kalimat, utuh, dan cantik saat responsif.
- **Tipografi Utama Kontras (Monumental Statement Hierarchy)**: Membuang struktur konvensional "Judul + Deskripsi Paragraf". Frasa dirubah menjadi dua blok khusus Semantik Visi. Kalimat pemicu `Rise as a...` diletakkan di `<H2>` berukuran ekstrim gajah (`text-72px font-extrabold`). Sementara subteks `Lead with faith...` dielevasi dari `<p>` rendahan menjadi `<H3>`. Untuk menjaga kohesi warna sekaligus mematuhi standar aksesibilitas kontras layar *(WCAG)*, warna teks bukan abu-abu generik, melainkan turunan `COLORS.darkBase` dengan `opacity-75`. Keduanya dijembatani pembatas kuning solid tebal (`opacity-80`) yang memastikan mereka terlihat seperti "Motto Global" alih-alih sekadar ringkasan kurikulum.

---

## 3. Pertanyaan Eksekusi (Open Questions)

Sebelum saya mengeksekusi kode di `nusa-tagline.tsx`:

1. **Arah Desain Hibrida (Sintesis)**: Pendekatan ganda antara kelonggaran megah SMA Rushd dikalikan dengan DNA latar belakang *grid sci-fi* khas visi merek IT NUSA Boarding School. Apakah perpaduan rasio teknis dan elemen Islam (*faith, knowledge, courage*) ini sudah mewakili suara ideal brand-nya?
2. Apakah *copywriting* ("Rise as a Muslim Tangguh... Lead with faith...") tidak ada perubahan sama sekali dari draf aslinya?

## 4. Verification Plan

1. Ekseskusi *Replacement* kode pada `components/nusa-tagline.tsx`.
2. Verifikasi via observasi UI memastikan tak ada masalah *z-index* dan teks masih aman di atas elemen absolut raksasa (watermark tidak memotong tombol / fitur blok baris). 
