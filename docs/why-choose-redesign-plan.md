# Rencana Redesain: Komponen "Why Choose NUSA"

Komponen `components/why-choose-section.tsx` saat ini berfungsi dengan baik untuk menyampaikan informasi ("Mengapa pilih NUSA?"), namun secara visual masih terasa seperti *template standard* (kotak putih polos di atas latar hijau pekat rata/flat). Desain ini bertentangan dengan panduan `style.md` yang menginginkan identitas *Tech Academy Playful Sci-Fi* (memiliki elemen *depth*, garis cahaya, atau *interactive card*).

## User Review Required
> [!IMPORTANT]
> Plan ini siap dieksekusi. Tolong review dan ACC via tombol atau konfirmasi *chat* jika Anda setuju dengan transisi gaya visual '*premium edutech*' ini.

## 1. Analisis Kelemahan Kode Eksisting
1. **Hardcoded Hex & Tailwind Classes**: Menggunakan warna literatur `#2C8970` dan memanggil kelas Tailwind yang kurang pasti seperti `bg-primary/10`, yang bisa jadi asinkron dengan konfigurasi *theme*.
2. **Flat Design**: Latar belakang `#2C8970` polos sangat *"flat"*. Tidak ada pola (*grid/pattern*) maupun pantulan cahaya pudar *(glow)* untuk memberikan kesan ruangan (*depth*).
3. **Card Boxy Kuno**: Modul daftar dipenjara dalam *card* statis `bg-white` berbentuk kaku. Kartu tidak memiliki interaksi *(hover effect)* dan terasa mati.
4. **Ikon SVG Hardcoded**: Ikon centang panjang dan raksasa (`<svg>`) disuntikkan secara mentah ke baris kode, sehingga membuang puluhan baris.

## 2. Rencana Pembaruan Estetika (*Tech-Flavor Edutech*)

### A. Restrukturisasi Layout & Warna Dasar
- **Injeksi Konstanta COLORS**: Mengestraksi semua *hex* (*Dark Base*, *Primary*, *Secondary*, *Accent*, *White*) ke dalam ojek konstan internal untuk menjamin tidak ada warna "abu-abu salah" (seperti `text-slate-800` masa lalu). Teks *card* akan memakai `COLORS.darkBase`.
- **Background Berpola**: Membubuhkan grafis *Subtle Pattern* *(seperti rintik rasi / micro-grid line cyan tipis)* di latar belakang ber-`bg-[#2C8970]` untuk membunuh kebosanan visual.

### B. Header Monumental (Penyelarasan Tagline Rushd-style)
- **Tipografi Bersih Tanpa Kicker**: Berkaca pada evolusi *Tagline* sebelumnya, kita TIDAK akan memasang label *eyebrow/kicker* yang membuang ruang. Judul akan dikonversi menjadi hierarki murni super-besar nan elegan ala Rushd, ditopang ruang *whitespace* yang megah agar audiens fokus penuh pada pertanyaan utamanya.
- **Warna & Aksen Judul**: Menonjolkan H2 "Mengapa pilih <span class="accent">NUSA?</span>" dengan memberikan injeksi warna kuning tajam `F3B233` plus kemiringan elegan `font-romulo-italic` khusus pada "NUSA?" untuk mewariskan identitas merek.
- **Rasio Kontras Penjelas**: Teks deskripsi pengiring diatur warna cerah *White* (`#F7F7F2`) dengan `opacity-80` agar tenggelam elegan berbaur dengan latar gelap `#2C8970`.

### C. Redesain "Card" & Komponen List
- **Responsive Layering Cards**: Mengganti kotak kaku menjadi *card* yang terlihat mewah. Card akan sedikit responsif di-*hover* (bergerak mengambang `hover:-translate-y-1` dan bayangan membesar `shadow-xl`) untuk memancing ketertarikan visual kursor (*Playful Tech*).
- **Pemurnian Ikon Centang**: Mengganti SVG panjang dengan *library* `lucide-react` (seperti `CheckCircle2` atau `Sparkles`) lalu memberikannya wadah lingkaran bercahaya lembut (menggunakan `COLORS.secondary` transparan `20%`).
- **Penataan Spasi List**: Merekayasa spasi per item menjadi lebih longgar (`space-y-5`) sehingga pembaca tidak tersedak oleh tumpukan kalimat padat.

## 3. Open Questions (Pertanyaan Opsional)
1. **Copywriting**: Di dalam *card list* kolom dua terdapat kalimat panjang seperti: `"# 100 Hari Belajar Besoknya Gajian: punya penghasilan setelah seratus hari belajar intensif."` Apakah tulisan *copywriting* ini akan dibiarkan bawaan *default* aslinya?
2. **Layout Kartu**: Kita akan mempertahankan format silang 2 Kolom (*Side-by-side*) seperti wujud aslinya. Setuju?
