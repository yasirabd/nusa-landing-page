# Rencana Redesign Form Pendaftaran (Style Rushd)

Berdasarkan referensi desain dari form pendaftaran Rushd (`https://sma.ppdb.rushd.sch.id/register/regular`), berikut adalah *action plan* untuk merombak tampilan form pendaftaran pada komponen `registration-form-page.tsx`.

## 1. Redesign Section Headers (Bagian A, B, C, D)
**Tujuan:** Mengadopsi struktur desain Rushd untuk memisahkan setiap kelompok informasi dengan lebih jelas dan menarik.

**Langkah Implementasi:**
- [ ] Ubah teks *heading* "A. Informasi Pribadi", "B. Informasi Sekolah", dll., menjadi format *header block* atau *badge/card header* yang lebih menonjol.
- [ ] Gunakan elemen visual (seperti *border bottom*, *background accent* tipis, atau penomoran berdesain lingkaran/badge) untuk memisahkan antar section (A, B, C, D).
- [ ] Sesuaikan margin dan *spacing* (padding antar form card) agar strukturnya lebih mirip dengan *layout* pada Rushd yang lega dan rapi.

## 2. Penambahan Ikon Representatif pada Setiap Field
**Tujuan:** Memperkuat representasi visual tiap isian *field* agar lebih intuitif dan *user-friendly*, sesuai gaya Rushd.

**Langkah Implementasi:**
- [ ] Pasang *icon* dari `lucide-react` (seperti `User`, `Phone`, `MapPin`, `Calendar`, `School`, `Info`) pada setiap `TextInput` dan elemen form lainnya.
- [ ] Letakkan ikon tersebut di sisi kiri dalam kotak *input* (sebagai *prefix*), dengan warna ikon yang kalem (misalnya opacity atau warna `muted`).
- [ ] Sesuaikan `padding-left` dari *input text* agar teks tidak tumpang tindih dengan ikon.
- [ ] Integrasikan ini ke dalam komponen re-usable `TextInput` atau buat bungkus baru di sekitar komponen input.

## 3. Redesign Action Buttons (Submit & Back)
**Tujuan:** Membuat area penyelesaian (submit) lebih terpusat dan meyakinkan, seperti pada tombol 'Register' milik Rushd.

**Langkah Implementasi:**
- [ ] **Hapus Button Back**: Hilangkan tombol "Back" (outline) dari deretan action button di bagian paling bawah form.
- [ ] **Redesign Button Register**: 
  - Ubah tombol "Register" agar berukuran penuh atau lebih proporsional (mirip Rushd).
  - Terapkan gaya warna, *shadow*, dan interaksi *hover* yang lebih mantap dan solid.
  - Jika diperlukan, tambahkan ikon *ArrowRight* atau *Check* di dalam tombol untuk memperkuat *call-to-action*.
- [ ] Pastikan posisi tombol "Clear form" (jika dipertahankan) tidak mengganggu dominasi tombol "Register".

---
*Catatan: Eksekusi kode akan dilakukan pada file `components/registration-form-page.tsx`. Sebelum mengeksekusi, komponen-komponen akan direstrukturisasi untuk menerima *icon prop* dan merombak tampilan section.*
