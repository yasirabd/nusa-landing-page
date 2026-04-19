# Audit Desain Registrasi (Registration Section & Form Page)

Dokumen ini berisi hasil audit desain dan rencana perbaikan untuk komponen `registration-section.tsx` dan `registration-form-page.tsx` berdasarkan panduan visual di `docs/style.md`.

## 1. Audit `components/registration-section.tsx`

### Kesesuaian Warna (Color Palette)
- **Temuan**: Card container menggunakan warna background `#FFFFFF` secara hardcode.
- **Rencana Perbaikan**: Ubah background `#FFFFFF` menjadi White brand (`#F7F7F2`) agar suhunya (warm white) lebih menyatu dengan keseluruhan halaman.
- **Temuan**: Warna teks pada button menggunakan utility `text-white` (default Tailwind yaitu `#FFFFFF`).
- **Rencana Perbaikan**: Ubah warna teks button menjadi `#F7F7F2`.

### Tipografi (Typography)
- **Temuan**: Teks heading utama ("Jadilah bagian dari") belum memanggil font `Work Sans` secara eksplisit, sedangkan teks aksen ("Muslim Tangguh Jago IT") sudah menggunakan `font-romulo-italic` dengan warna Accent `#F3B233` (sudah sesuai panduan).
- **Rencana Perbaikan**: Terapkan class `font-work-sans` pada heading utama agar hierarkinya sesuai dengan panduan heading website.
- **Temuan**: Button utama menggunakan kelas `font-bold` (weight 700).
- **Rencana Perbaikan**: Panduan tipografi merekomendasikan `Label / button / nav` berada pada weight `500–600`. Ubah `font-bold` menjadi `font-semibold` (600) atau `font-medium` (500).

### Gaya Visual (Visual Style & Imagery)
- **Temuan**: Desain border dan shadow sudah baik, namun kesan "digital sci-fi" atau "tech-savvy" kurang menonjol.
- **Rencana Perbaikan**: Tambahkan efek *glow* ringan menggunakan Neon Cyan (`#8EF3E7`) atau Secondary (`#42CDBA`) pada efek hover shadow button untuk memperkuat nuansa futuristik edukatif.

---

## 2. Audit `components/registration-form-page.tsx`

### Kesesuaian Warna (Color Palette)
- **Temuan**: Komponen `<FormCard>` dan card dialog *Success State* menggunakan background `#FFFFFF`.
- **Rencana Perbaikan**: Ganti menjadi White brand (`#F7F7F2`).
- **Temuan**: Elemen input text dan button selector program menggunakan background `#F8FFFE` (warna di luar palette).
- **Rencana Perbaikan**: Ganti ke White brand (`#F7F7F2`) atau Surface (`#F0FAF7`) agar palet warna tetap konsisten.
- **Temuan**: Grid overlay di bagian *background/body* menggunakan warna Primary (`#2C8970`).
- **Rencana Perbaikan**: Agar grid background lebih menyatu dengan panduan "Depth Tone" / "Neon grid", gunakan warna `#1F6F68` dengan opacity rendah, atau warna Neon Cyan (`#8EF3E7`) untuk memperkuat kesan digital tech.
- **Temuan**: Opacity dari warna Dark Base (`#134146` atau `rgba(19, 65, 70, ...)`) yang digunakan pada teks, border, dan background sangat bervariasi (menggunakan opacity 55%, 45%, 65%, 35%, 20%, 6%).
- **Rencana Perbaikan**: Standarkan opacity tersebut agar ketat mengikuti panduan *Opacity Patterns* dari Dark Base:
  - Teks sekunder / muted: opacity `70%` (0.7)
  - Teks disabled / placeholder: opacity `40%` (0.4)
  - Border / divider: opacity `12%` (0.12)
  - Background hover ringan: opacity `5%` (0.05)

### Tipografi (Typography)
- **Temuan**: Terdapat banyak penggunaan inline style `fontFamily: "var(--v0-font-work-sans)"`.
- **Rencana Perbaikan**: Sebaiknya diganti menggunakan utility class Tailwind (misalnya `font-work-sans`) yang terpusat agar kode lebih bersih dan terstandarisasi.
- **Temuan**: Label form (`<FieldLabel>`) dan button submit menggunakan `font-bold` (weight 700).
- **Rencana Perbaikan**: Sesuaikan dengan hierarki font di `docs/style.md` (Label / button / nav weight `500–600`). Ubah `font-bold` menjadi `font-semibold` (600) atau `font-medium` (500).
- **Temuan**: Penggunaan warna Charcoal (`#2B2B2B`) pada *mask image* logo WhatsApp.
- **Rencana Perbaikan**: Sesuai panduan bahwa Charcoal hanya dipakai untuk icon fill/stroke, implementasi ini **sudah tepat**.

### UI Elements, Hierarchy & Visual Style
- **Temuan**: Warna notifikasi *error* dan border error menggunakan merah standar (`#DC2626`).
- **Rencana Perbaikan**: Tetap dipertahankan untuk menjamin kontras dan fungsi *Accessibility* (UX), tetapi beri keterangan di style guide jika kelak akan ada standarisasi warna merah brand.
- **Temuan**: State *selected* pada Program Selector saat ini menggunakan border solid `#2C8970`.
- **Rencana Perbaikan**: Tambahkan sentuhan *semi-3D web aesthetic* atau *neon outline* dengan menggunakan warna Neon Cyan (`#8EF3E7`) atau menambah tebal border/shadow glow agar tampak lebih interaktif.
