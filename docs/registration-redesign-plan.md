# Rencana Redesain Ringan: Komponen Pendaftaran (registration-section.tsx)

Menyusul evaluasi layout dan tata letak yang berujung pada kerusakan ketika di-skala ekstrem, operasi ini kini memasuki mode **Lightweight Enhancement**. Skema *Grid 2 Kolom* dan ukuran tipografi orisinal akan **dibiarkan mutlak suci tanpa tersentuh sedikitpun**.

## Target Perbaikan Estetika Terbatas:

### 1. Upgrade Material Kapsul (Bento Card)
- **Status Lama**: Menggunakan `rounded-xl`, `border` tipis 0.20, dan `shadow-md` yang terkesan pudar.
- **Eksekusi**: Mengungkit sisi premium dengan mendongkrak kelokan menjadi `rounded-3xl` berbayang `shadow-[0_20px_40px_rgba]`. Tebal *border cyan* ditegaskan ke `0.30` dan area *padding Responsive* ditambahkan agar terlihat empuk layaknya komponen NUSA berkelas B2B.

### 2. Micro-Interaction pada Magic Button CTA
- **Status Lama**: Tombol statis "Daftar Sekarang →" bergabung dalam 1 string.
- **Eksekusi**: Memisahkan teks dan panah "→" secara anatomis (Flex). Membumikan sifat levitasi standar NUSA (`hover:-translate-y-1 hover:scale-1.03`), ditambah ilusi dorong jari lewat instruksi `group-hover:translate-x-1.5` khusus pada panahnya. Skala ukurannya dibuat lebih berotot (`font-bold px-10 md:py-8`).

Semua tata ruang luar *(Macro padding)* dan struktur kolom tipografi tetap dipelihara tegak sejalan dengan bentuk embrio awalnya aslinya.
