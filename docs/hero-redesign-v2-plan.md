# Hero Section Redesign V2 (Aesthetic Upgrade)

Memberikan sentuhan modern, dinamis, dan futuristik edukatif pada Hero Section agar tidak terkesan kaku. Area ini dikembangkan kelanjutan dari `hero-section-color-redesign-plan.md` untuk merombak arsitekturnya menjadi lebih *immersive* tanpa melanggar *style guide* warna yang telah di-set.

## 1. Ringkasan Masalah Estetika Saat Ini

Walau warna sudah distandarisasi (menggunakan Palette #2C8970 & Dark Base #134146), komposisi UI saat ini masih terlalu konvensional:
1. **Hierarki Konten Numplek**: Susunan atas ke bawah: *H1 -> Badge Kuota -> Subheadline Besar* membuat area bawah sangat padat dan mendesak H1.
2. **Drop-Shadow Konvensional**: Teks putih judul utama memiliki shadow/bayangan hitam statis yang sangat bertolak belakang dengan kesan *clean tech*.
3. **Hero Image Kaku**: Gambar di sebelah kanan berupa "kotak pasif" berlapis border. Tidak ada efek kedalaman 3D atau elemen mengambang yang mewakili *Youth Tech Academy*.
4. **Tombol Secondary Biasa**: Tombol sekunder ("Daftar Sekarang") hanya memakai border konvensional, kurang merefleksikan UI modern.
5. **Promo Banner Terlalu Tebal**: Posisi banner sebagai "pasak" dengan `mb-8` dan padding tebal memutuskan *flow* halaman.

---

## 2. Rencana Perbaikan (Proposed Changes)

Berikut adalah detail teknis perombakan pada `components/hero-section.tsx`:

### A. Restrukturisasi Layout & Kicker
- **Pindahkan Kicker (Badge Kuota & SPMB)**: Pindahkan posisi badge ke *paling atas* (sebelum H1).
  - Terapkan *Glassmorphism Pill*: `bg-white/10 backdrop-blur-sm border border-white/20`.
  - Warna teks menggunakan `text-white` agar elegan, ditemani dengan dot indicator kuning (`COLORS.accent`).

### B. Pembersihan Tipografi & Penonjolan SPMB
- **Headline Satu Baris**: Mengembalikan `<h1>` ("NUSA Boarding School") kembali ke format murni **satu baris** horisontal tak terputus. Elemen `<br />` tidak diterapkan di dalam H1 untuk mempertahankan orisinalitas kesatuan identitas merek. Untuk mengakomodasi satu baris ini, pengaturan skalabilitas font akan dipastikan aman dan tidak menimpa / membungkus.
- **Penonjolan SPMB**: Kicker *"SPMB 2026–2027 Pendaftaran Dibuka"* akan diperbesar tingkat signifikansinya (secara *visual weight*)! Tidak sekadar ditaruh di dalam badge kecil, melainkan akan diberikan latar belakang beraksen kuat (misal Glow `#F3B233`) atau font styling bertaraf *Subheadline Primary* agar pengunjung langsung sadar bahwa pendaftaran sedang berlangsung sesaat setelah melihat nama sekolah.
- **Tanpa Hitam Kaku**: Hilangkan efek bawaan `[text-shadow:_0_..._rgba(0,0,0,0.45)]` pada `<h1>`. Ganti memakai soft text-shadow berbasis primary/gelap (`#134146`) jika butuh kontras.
- **Pembersihan DOM Redundan**: Menghapus `div` berlapis (duplikasi class `space-y-2` tumpang tindih dengan `mt-4`) yang merusak sinkronisasi jarak spasial antara H1 dan paragraf deskripsi *(copywriting)* pendaftaran. Paragraf kini memiliki elevasi *opacity 90%* yang ideal.

### C. Glassmorphism & Tombol Premium
- **Secondary Button UI Modern**: Timpa dengan *Glassmorphism* solid transparan `bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20` dan teks putih konstan. Menghasilkan efek *milky glass* yang premium ketimbang *outline button*.
- **Icon Sizing**: Pastikan ukuran `h-5 w-5` agar tombol proporsional.

### D. Immersive Floating Elements pada Hero Image
- Ubah *container image* menjadi komposisi dinamis *Absolute-Relative*:
- Tambahkan **2 Elemen Floating UI (Melayang)** menimpa frame foto siswa:
  1. Box transparan kecil (Glass UI) bertuliskan `<Code>` *"IT Expert"*. Posisinya di-setting masuk ke dalam bingkai gambar utama (sumbu Y: `top-8` dan margin kiri `-left-8`) **agar tidak terjadi tabrakan / collision** dengan kontainer `PromoBanner` yang melintang di atasnya.
  2. Badge melayang di kanan bawah bertuliskan `<Star />` **"100% Praktik"**.
- **Micro-padding Check**: Merapatkan jarak elemen (`gap-2.5`) dan dimensi padding (`px-3.5 py-2.5`) pada kotak-kotak floating badge agar rasionya lebih meramping dan tidak terlihat bengkak.
- Ini langsung mengubah estetika "*Corporate Leaflet*" menjadi "*Edutech Modern Dashboard*".

### E. Integrasi Promo Banner & Resolusi Margin
- Tipiskan margin *PromoBanner* dari `mb-8` menjadi `mb-6`.
- Sesuaikan di `promo-banner.tsx` (opsional): buat padding vertikal di banner menjadi lebih pipih (dari `py-4` ke `py-3` misalnya) agar layout pahlawan lebih menonjol tanpa harus buang promonya.

---

## 3. Pertanyaan Eksekusi (Open Questions)

Sebelum saya mengeksekusi kode di `hero-section.tsx`:

1. **Copywriting Teks Melayang**: Untuk elemen dekoratif melayang menimpa gambar siswa, saya akan memakai Ikon Code + teks **"IT Expert"** dan ikon Star + teks **"100% Praktik"**. Apakah setuju?
2. **Implementasi Segera**: Apakah cukup saya terapkan perubahannya sekarang ke dalam file `hero-section.tsx`?

## 4. Verification Plan

- Terapkan di lingkungan lokal via terminal `npm run dev`.
- Mengamati secara *real-time* rendering pada mode responsif agar tidak ada layout yang terlipat / *overflow* di mode Mobile.
- Verifikasi visual konsistensi *Glass UI* dengan layer background `#2C8970`.
