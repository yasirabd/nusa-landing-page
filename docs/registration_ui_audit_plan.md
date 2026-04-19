# Audit & Rencana Perbaikan UI/UX Form Pendaftaran NUSA

Berdasarkan analisis file komponen pendaftaran (`components/registration-form-page.tsx` dan `components/registration-section.tsx`) dengan membandingkannya terhadap panduan gaya di `docs/style.md`, berikut adalah hasil audit dan rencana perbaikan terstruktur.

## 1. Audit Desain & UI/UX Saat Ini

Secara umum, form pendaftaran telah mengadopsi warna brand (Teal family & Accent yellow) dengan baik. Namun, ada beberapa aspek visual dan UX yang belum sepenuhnya mencerminkan estetika "futuristik edukatif" yang diinstruksikan oleh `docs/style.md`.

### Temuan Positif (Sesuai `style.md`):
- **Warna Teks Utama**: Telah menggunakan `#134146` (Dark Base).
- **Background Utama**: Memakai `#F0FAF7` (Surface) dan form container memakai `#F7F7F2` (White), yang membedakan kedalaman layer.
- **Button Utama**: Menggunakan Accent `#F3B233` (Golden Yellow).
- **Program Selector**: Sudah mengadopsi efek glow dengan Neon Cyan (`#8EF3E7`) saat di-hover/dipilih.

### Temuan Kurang Sesuai / Butuh Pemolesan:
1. **Kurangnya Elemen "Futuristik / Tech-Savvy"**: 
   - `docs/style.md` menyebutkan perlunya *Glow tipis, garis cahaya, dan layering immersive*. Saat ini, form input reguler masih terlihat terlalu flat (border solid, tanpa transisi focus/glow cyan).
   - Pola radial gradient (dot pattern) di *hero background* terlalu standar. Bisa ditambahkan aksen cahaya (glow cyan `#8EF3E7`) di area header.
2. **UX Interaksi Form (Focus State)**: 
   - Input text, select, dan textarea tidak memiliki *focus state* (ring/glow) yang jelas saat user sedang mengetik. Ini penting untuk UX.
3. **Registration Section di Landing Page**:
   - Komponen `registration-section.tsx` yang berada di halaman utama terasa sedikit "kosong" dari elemen tech. Tidak ada aksen garis digital atau panel bercahaya. Background card-nya hanya menggunakan border polos.
4. **Detail Ikonografi & Typography**:
   - Teks "Jadilah bagian dari" pada komponen section bisa dipoles lagi agar lebih *bold*.

---

## 2. Rencana Implementasi Perbaikan

### A. Komponen Form Page (`components/registration-form-page.tsx`)

1. **Peningkatan Visual Hero Section**:
   - Tambahkan efek *glow cyan* (`bg-[#8EF3E7]/20 blur-3xl`) membulat di latar belakang area hero (di balik judul "Form Pendaftaran") untuk menonjolkan estetika *tech-sci-fi*.

2. **Peningkatan UX Input Form**:
   - Update komponen `TextInput` dan elemen `<textarea>`, `<select>` agar memiliki *focus ring* yang menggunakan warna Neon Cyan (`#8EF3E7`) dan Depth Tone (`#1F6F68`).
   - Misalnya menambahkan utilitas CSS Tailwind: `focus:border-[#42CDBA] focus:ring-4 focus:ring-[#8EF3E7]/30 focus:bg-white`.
   - Tambahkan transisi halus (`transition-all duration-300`) pada background input saat di-hover (`hover:bg-white`).

3. **Peningkatan UX Upload Bukti Transfer**:
   - Berikan efek *hover glow* cyan tipis pada kotak upload agar terlihat interaktif layaknya panel futuristik.
   - Ganti border dashed merah biasa menjadi merah menyala jika ada error validasi.

4. **Micro-interactions Button Submit**:
   - Tombol Submit ("Register") akan diperkuat dengan efek hover shadow glow emas (`hover:shadow-[0_10px_30px_rgba(243,178,51,0.5)]`) dan transformasi scale ringan.

### B. Komponen Registration Section CTA (`components/registration-section.tsx`)

1. **Penambahan Elemen Dekoratif Tech**:
   - Modifikasi kotak utama `div` berlatar belakang `#F7F7F2` agar memiliki border gradient atau efek glassmorphism/glow yang lebih kuat di pinggirannya.
   - Tambahkan garis dekoratif ala sirkuit atau *digital grid* di pojok section untuk mengisi kekosongan visual.
   - Ganti gaya bayangan default dengan kombinasi shadow *Neon Cyan* (`#8EF3E7`) atau *Depth Tone* tipis.

2. **Penyelarasan Warna Teks & Tombol**:
   - Poles teks utama "NUSA" agar kontras Accent-nya lebih tajam.
   - Tambahkan hover state yang dinamis untuk tombol pendaftarannya.

### C. UX Logika Success State ("Pendaftaran Terkirim")

1. **Hapus Instruksi Transfer Infaq**:
   - Berdasarkan alur form yang baru, user diwajibkan mengunggah "Bukti Transfer Infaq" *sebelum* menekan tombol Submit. Oleh karena itu, menampilkan kembali kotak instruksi transfer beserta nomor rekening BSI pada halaman **Success State** menjadi mubazir dan sangat membingungkan user (seolah-olah mereka disuruh transfer lagi).
   - Kotak informasi rekening di Success State harus dihapus.
2. **Pembaruan Pesan Konfirmasi**:
   - Ganti pesan dari sekadar "Data kamu sudah kami terima" menjadi pesan yang mengonfirmasi bahwa data pendaftaran **serta bukti transfer infaq** telah diterima dan sedang dalam tahap verifikasi oleh Admin.
   - Tetapkan gaya UI yang konsisten dengan estetika form baru (kemungkinan dengan efek *glow* sukses pada ikon checkmark).

---

> **Tujuan Akhir**: Perbaikan ini tidak merombak struktur layout secara keseluruhan (karena secara grid sudah baik), melainkan **menyuntikkan estetika futuristik dan micro-interactions** (hover, focus, glow) yang diwajibkan oleh panduan desain, sekaligus menambal **logical gap** pada alur pembayaran di Success State, tanpa mengurangi visibilitas form itu sendiri.
