# Rencana Peningkatan UI/UX Portal Tes (Dashboard) NUSA Boarding School

Halaman Dashboard Portal Tes (`app/test/page.tsx`) saat ini sudah fungsional namun desainnya masih bisa dibuat jauh lebih menarik dan sesuai dengan identitas visual NUSA Boarding School yang mengedepankan nuansa *Futuristik Edukatif*, *Tech-savvy*, dan *Playful*.

Mengacu pada `docs/style.md`, berikut adalah rencana perombakan UI dan UX halaman tersebut.

---

## 1. Tipografi & Identitas Font
- **Ganti ke Work Sans:** Seluruh teks (heading, paragraph, button) harus konsisten menggunakan `Work Sans` sesuai dengan arahan visual resmi untuk UI Website.
- **Hierarki Ketebalan (Weight):** 
  - Heading utama ("Portal Tes Calon Santri") menggunakan *Extra Bold* (800) dengan *tracking-tight* agar berkarakter tegas.
  - Subheading / Teks Deskripsi menggunakan *Medium* (500).
  - Label tombol menggunakan *Semi Bold* (600).

---

## 2. Palet Warna (The Teal Family)
Halaman saat ini menggunakan beberapa warna generik. Kita akan mengkonversinya murni ke keluarga warna NUSA:
- **Background Utama (Surface):** Menggunakan `#F0FAF7` (Surface) untuk latar belakang utama layar.
- **Teks Utama:** `#134146` (Dark Base) untuk kontras yang ramah namun sangat terbaca.
- **Warna Aksen:** `#F3B233` (Accent Yellow) untuk highlight penting (seperti label "AKTIF").
- **Glow & Transisi:** Memanfaatkan `#8EF3E7` (Neon Cyan) untuk efek *hover* tipis atau *glow* pada kartu yang aktif.

---

## 3. Gaya Visual & Komposisi Card (Semi-3D & Digital Sci-Fi)
Kartu-kartu tes (Tes Kepribadian & Tes Penjurusan) akan didesain ulang agar tidak terlihat datar:
- **Border & Shadow:** Memberikan *shadow* berwarna (Depth Tone `#1F6F68` dengan opasitas rendah) dan border tipis.
- **Layering & Iconography:** Menggunakan ikon yang lebih modern, *clean*, dan relevan (teknologi/digital). Memberikan *background pad* berbentuk lingkaran dengan warna kontras untuk membingkai ikon di sebelah kiri teks.
- **Animasi *Hover*:** Saat kartu bisa di-klik (aktif), berikan efek *transform hover:translate-y-1* dan penambahan *glow shadow*.
- **Background Pola / Grid:** Menambahkan latar belakang grid transparan tipis di belakang halaman untuk memberi kesan *sci-fi classroom*.

---

## 4. Revisi UX & Copywriting Tombol

Tombol *"Lihat Hasil Akhir"* saat ini dirasa kurang relevan karena sebenarnya siswa belum mendapatkan hasil akhir, melainkan menuju konfirmasi penyelesaian. 

**Perubahan Label Button:**
- Sebelum: "Lihat Hasil Akhir"
- **Sesudah: "Selesaikan Rangkaian Tes"** (atau "Konfirmasi Selesai Ujian"). Tombol ini akan mengarahkan santri ke halaman `app/test/selesai`.

**State Tombol Tes:**
1. **Belum Dikerjakan (Aktif):** 
   Tombol berwarna `#F3B233` (Accent) dengan *glow*. Muncul animasi denyut (*pulse*) halus pada badge "Tersedia".
2. **Sudah Dikerjakan:** 
   Tombol berubah wujud menjadi label tebal bercentang hijau-teal (`#2C8970`) dengan teks "Telah Selesai". Kartu akan meredup opacity-nya (`opacity-80`) agar fokus berpindah ke tugas berikutnya.
3. **Terkunci:**
   Kartu berwarna abu-abu (*grayscale*), dengan teks "Terkunci (Selesaikan Tes 1)".

---

## 5. Implementasi Langkah-demi-Langkah

1. **Setup Background:** Terapkan `bg-[#F0FAF7]` pada *wrapper* utama `app/test/page.tsx` dan hapus pola dekoratif bundar yang lama, ganti dengan pola grid digital yang sangat tipis (opacity 5%).
2. **Styling Typography:** Bungkus area dengan `font-sans` (pastikan Work Sans sudah terpasang di Tailwind).
3. **Redesign Card Tes:**
   - Jadikan layout Flex/Grid yang menonjolkan ikon.
   - Aplikasikan border color `#42CDBA` (Secondary Teal) untuk tes yang sedang berjalan.
4. **Update Tombol Final:** Ganti teks dan *styling* tombol menuju halaman `/selesai` agar terasa lebih seperti selebrasi selesainya tugas.

## Ringkasan Eksekusi Kode
File yang akan disentuh:
- `app/test/page.tsx` (modifikasi penuh struktur HTML/Tailwind)

Plan ini memastikan antarmuka terasa *premium*, ramah-remaja, dan tetap *tech-oriented* sesuai jiwa NUSA Boarding School!
