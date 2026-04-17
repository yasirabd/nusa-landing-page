# Rencana Redesain: Komponen "Testimonial" (testimonials-section.tsx)

Komponen ini memegang peranan vital untuk *Social Proof*. Saat ini mekanismenya sudah menggunakan karosel mandiri berbasis state React (Client Component), yang mana secara keteknikan sudah padat. Namun, wujud estetikanya masih tampak kaku seperti *template library Bootstrap* tahun 2015 dengan tata letak tombol panah yang mencekik pinggiran kartu.

## User Review Required
> [!IMPORTANT]
> Plan ini diusulkan untuk membongkar total sistem kerangka kontrol karosel *(Carousel Controls)* yang menjepit _layout_ kartu dan memompakan nyawa "Tech Bento-Card" ke setiap sudut estetika Testimoni. Susunan data *array* Testimoni Ustadz dan Wali Murid akan saya jamin **100% aman dan tidak tersentuh**. Mohon ulas rancangan UI ini.

## 1. Analisis Kelemahan Tampilan Saat Ini
1. **Navigasi Mencekik (Layout Squeeze)**: Tombol panah kiri `<` dan kanan `>` diletakkan sebaris secara paksa mendesak komponen Grid kartu. Hal ini pada layar HP memakan jatah lebar piksel luar biasa banyak sehingga kartu ulasan tampak terjepit kurus di tengah layar.
2. **Kartu Miskin Karakter**: Menggunakan sekadar `bg-white rounded-2xl shadow-md`. Sangat rata dan generik, kehilangan esensi futuristik dan *vibe Apple-like* yang sudah ditancapkan pada komponen The Team atau Program 100 Hari.
3. **Tipografi Berbisik**: Tulisan ulasan/kutipan wali murid menggunakan ukuran liliput `text-sm`, menyulitkan audiens tua untuk memindai pesan emosionalnya dari jarak pandang normal.
4. **Latar Polos Kosong**: Background menggunakan warna tunggal Solid Primary `#2C8970` tanpa tekstur atau kedalaman spasial.

## 2. Cetak Biru Perombakan (Redesign Action Plan)

### A. Revitalisasi Struktur Ruang & Tipografi
- H2 "Testimoni" dinaikkan eselonnya ke `6xl font-extrabold`. 
- Menambahkan frasa pendukung (Subtitle) di bawah H2 "Apa kata mereka tentang NUSA?" untuk menghangatkan ruang interaksi.
- Modul pembungkus luar ditarik menggunakan simetri kanvas lazim `max-w-6xl` dengan nafas vertikal raksasa `py-24 md:py-32 lg:py-40`.
- Menyuntikkan Jaring Latar *Cyber/Polka-Mesh* bernuansa neon terang yang berpendar di dasar `<section>`, persis mendenyutkan wibawa area Tim Pengajar. 

### B. Pembebasan Lebar Kartu & Reposisi Kontrol Navigasi
- **Penghancuran Jepitan Panah**: Tombol `<` dan `>` yang mencekik grid dari kiri-kanan akan diangkat! Tombol-tombol navigasi peluncur (beserta titik pendar paginasi) akan disatukan *(Clustered)* merapat elegan ke bawah ruang karosel persis seperti wujud layar mobil listrik pintar / UI Apple. 
- Ini otomatis membuat kartu terbebas secara horizontal mengisi **100% lebar area** yang disediakan untuk mereka baik di tablet maupun mobile.

### C. Evolusi Kartu "Glass Bento" (Kapasitas Maksimal)
- Kartu testimoni direntangkan menjadi `rounded-3xl` dengan bantalan dalam `p-8 md:p-10`.
- Kutipan kalimat puitis (`<p>`) dibesarkan menuju eselon mapan: `text-base md:text-lg italic font-medium leading-relaxed`.
- Nama Wali Murid/Santri ditarik tegas ke `text-lg font-bold`.
- Efek sihir ditancapkan: Menyematkan *Anti-Gravity Hover* (`hover:-translate-y-2`) dipadu bias pendaran kaca `hover:shadow-2xl` saat testimoni disentuh telunjuk *(Tap/Hover)*.
- Garis pemisah identitas penulis *(Border Top)* pada profil avatarnya tak lagi warna hijau keras, melainkan gradien atau *dashed hairline* elegan. 

### D. Pemulihan Hukum Warna Opsional & Opacity Pola Dasar
- **Pengkhianatan Pembatas (Divider)**: Kode lawas menancapkan warna `#42CDBA` untuk garis batas *(border-t)* antar teks dan nama penulis. Ini **ilegal** dan melanggar keras mandat `style.md`! Semua garis pembatas (Divider) konstitusinya wajib menggunakan `Dark Base opacity 12%`.
- **Pengkhianatan Hierarki Text**: Pekerjaan / Jabatan orang tua santri dirender dengan Primary `#2C8970`. Saya tangkap kepalsuannya! Dokumen tata letak mutlak memakukan aturan teks sekunder harus `Dark Base opacity 70%`. Ini akan dibabat habis.
- **Pemusnahan Pure-White `#FFFFFF`**: Judul H2 raksasa dan titik-titik paginasi di bawah *slider* memakai teks murni putih pucat `#FFFFFF`. Akan segera saya gempur menggunakan kehangatan Putih NUSA yang sah: `COLORS.white` (`#F7F7F2`).

## 3. Pertanyaan Konfirmasi (Open Questions)
Saat ini sistem warna Avatar Inisial menggunakan latar Kuning Aksen `bg-[#F3B233]`. Apakah warna Inisial nama wali murid ini mau kita biarkan tetap warna emas interaktif, atau Anda ingin diseragamkan dengan *Dark Base Teal*? (*Berdasarkan insting saya, Kuning Emas adalah warna terbaik sebagai penyeimbang komplementer pada background kotak putih).* Bagaimana komando Anda?
