# Registration Form Design Audit & Migration Plan

## 1. Audit Findings (vs `docs/style.md`)

Berdasarkan pengecekan file `components/registration-form-page.tsx` terhadap panduan `docs/style.md`, berikut adalah hasil audit desainnya:

### ✅ Sesuai Panduan (Compliant)
- **Background & Base**: Form sudah menggunakan warna `Surface` (`#F0FAF7`) sebagai background utama, dan `Dark Base` (`#134146`) sebagai teks utama.
- **Typography**: Penggunaan `Work Sans` (`var(--v0-font-work-sans)`) sudah diterapkan secara konsisten untuk heading, label, dan body text.
- **Form Card Structure**: Menggunakan sudut melengkung (`rounded-2xl`, `rounded-xl`) dan shadow halus yang selaras dengan arahan "rounded card".
- **Primary Color**: Warna logo/brand utama (`#2C8970`) sudah digunakan dengan baik pada interaksi aktif (misal state terpilih pada selector program dan icon success).

### ❌ Gaps & Pelanggaran (Non-Compliant)
- **Penggunaan Warna di Luar Palette (Cokelat/Kuning Pudar)**: 
  Pada bagian *Info Box Pembayaran*, terdapat warna yang tidak ada di style guide: `#FFF8E7` (bg), `#92660A` (text secondary), `#7A4700` (text bold). Sesuai guideline, nuansa ini harus diganti menggunakan kombinasi `Accent` (`#F3B233`) dengan teks `Dark Base` (`#134146`) atau varian opacity-nya.
- **Teks Tombol Submit**: 
  Warna teks pada tombol Submit menggunakan `#7A4700`. Harus dikembalikan ke warna netral gelap `Dark Base` (`#134146`) agar kontras maksimal di atas warna `Accent` emas.
- **Kurangnya Nuansa "Futuristik Edukatif"**: 
  Secara visual, form ini terasa masih terlalu "flat/minimalist konvensional". Guideline menyebutkan gaya *"Semi-3D ringan, digital sci-fi yang cerah, pola digital/grid"*. Form saat ini belum memiliki sentuhan background grid atau glow subtle yang menghubungkannya dengan estetika di Hero Section.

---

## 2. Implementation Plan

Rencana perbaikan untuk file `components/registration-form-page.tsx` agar 100% selaras dengan `docs/style.md`:

### Tahap 1: Koreksi Warna & Tipografi
1. **Refactor Info Box Pembayaran**
   - Hapus warna `#FFF8E7`, `#92660A`, dan `#7A4700`.
   - Gunakan background: `rgba(243,178,51, 0.1)` (Accent dengan 10% opacity) atau `Surface` dengan border `Accent`.
   - Gunakan teks utama: `Dark Base` (`#134146`).
   - Gunakan teks sekunder: `Dark Base` opacity 70% (`rgba(19, 65, 70, 0.7)`).
2. **Refactor Tombol Submit**
   - Ubah warna teks tombol dari `#7A4700` menjadi `Dark Base` (`#134146`).
3. **Penyelarasan Warna Error**
   - Pastikan warna merah error (`#DC2626`) tetap kontras namun tidak merusak palet utama (sudah standar UI, dapat dipertahankan).

### Tahap 2: Peningkatan Visual "Tech-Savvy" (Futuristik Edukatif)
1. **Tambahkan Digital Grid Overlay**
   - Sematkan background grid transparan yang sangat subtle (menggunakan `Neon Cyan` `#8EF3E7` di opacity sangat rendah atau `Primary` opacity rendah) di bagian atas header form agar terasa menyatu dengan tema "Islamic Tech School".
2. **Enhance Glow & Shadow**
   - Tambahkan efek glow/shadow berwarna (misal shadow `Primary` atau `Neon Cyan` opacity ringan) pada hover state tombol atau card Program Selector untuk memberikan kesan "Semi-3D ringan".
3. **Polesan Success State**
   - Pada layar "Pendaftaran Terkirim", pastikan icon ceklis dan box info rekening juga menggunakan palet warna teal dan accent yang konsisten dengan gaya desain form utama.

### Tahap 3: Validasi Aksesibilitas
- Memastikan semua warna teks utama memenuhi standar kontras di atas background form card (`#FFFFFF` atau `#F8FFFE`).
