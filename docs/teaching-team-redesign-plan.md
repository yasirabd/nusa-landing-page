# Rencana Redesain: Komponen "Tim Pengajar (Teaching Team)"

Komponen ini (`components/teaching-team-section.tsx`) merupakan elemen pembangun *"Trust"* (Kepercayaan) krusial bagi orang tua wali, menampilkan para pakar di belakang layar akademik NUSA. Sayangnya, desainnya masih berada di level _minimum viable product_ (MVP): latar belakang sekadar diwarnai hijau datar `linear` polos tanpa nyawa, kartu identitas siku lancip `rounded-lg`, pembatasan *padding* kerdil warisan masa lalu, dan gaya identifikasi *"NUSA"* yang tidak menggunakan font logo yang pakem.

## User Review Required
> [!IMPORTANT]
> Plan ini diusulkan untuk membunuh habis kesan *template murahan* pada profil jajaran Guru NUSA dan mengamankan pakem UI kita tanpa *sedikitpun mengubah teks materi asli Anda*. Silakan review lalu setujui eksekusinya.

## 1. Analisis Kelemahan Kode Eksisting
1. **Identitas Merek Terkubur**: Kata `"NUSA"` pada judul "Tim Pengajar NUSA" hanya memakai teks biasa. Mengabaikan panduan `style.md` yang mewajibkan penyebutan NUSA mengokupasi jenis huruf `Righteous`.
2. **Spasial Sesak & Visual Mati**: Area kanvas tertahan dalam kungkungan dimensi jadul `py-12 md:py-16`. Tembok latarnya hanya menguras kaleng cat solid `#2C8970` tanpa pantulan dimensi digital ala sekolah Tech yang kita capai di section lain.
3. **Kartu Profil Standar Pabrik**: Kartu para pahlawan akademik kita dikurung dalam batas kaku `rounded-lg bg-white p-6`. Tetesan bayangannya sangat remang, apalagi saat disentuh kursor kodenya mati lumpuh tak bergeming tanpa reaksi balasan (*hover interaction*).
4. **Anomali Skala Avatar Foto**: Ada pengetikan parameter duplikasi memutus-akal pada ukuran gambar guru (Tertulis `width: "120px"` disilang bentrok memakai utilitas tailwind bawaan `w-32` [128px]). Cincin pembatas *(ring)* digambar kasar lewat modul *inline style* HTML.

## 2. Cetak Biru Perombakan (Redesign Action Plan)

### A. Tipografi Monumental & Restorasi Merek NUSA
- **Eskalasi Skala H2**: Mendongkrak volume judul menjadi hierarki Gajah (`text-4xl md:text-5xl lg:text-6xl font-extrabold`). 
- **Injeksi Logo Verbal**: Memotong kata **"NUSA"** pada judul utama agar murni dirender dalam kemurnian huruf `font-righteous tracking-wide`.
- Paragraf pendamping *(subtitle)* akan dipakukan secara simetris di skala `text-lg` maksimum agar tidak pernah membengkak merecoki wibawa H2. Penulisan nama dan jabatan akan memakai skema `COLORS.darkBase` mutlak. *No copywriting changes allowed.*

### B. Arsitektur Ruang, Latar Belakang & Sinkronisasi Wadah
- **Kanvas Monumental**: Melambungkan *padding* udara komponen dari `py-12` kerdil melompat ke standar raksasa Edutech NUSA: `py-24 md:py-32 lg:py-40`. Lebar kontainer penahan juga akan saya kalibrasi murni ke `max-w-6xl` (bukan 7xl) demi menjaga nafas simetris dengan blok Program & Kurikulum.
- **Background Cyber-Mesh**: Latar dasar warna **Primary (`#2C8970`)** dipertahankan, TAPI akan diinjeksi topeng grafis lapisan jaringan digital (*subtle mesh / digital grid dots opacity tipis*). Background hijau gelap takkan bisa lagi membosankan.

### C. Evolusi Kartu "Micro-Bento" & Pembesaran Hierarki Nama 
- **Hierarki Text Anak (Bebas Kerdil)**: Font nama dari Pengajar (H3) yang aslinya tercekik `text-lg` bakal didongkrak membesar menjadi `text-xl md:text-2xl font-extrabold`. Teks Jabatannya yang *claustrophobia* (`text-sm`) akan diregangkan menjadi `text-base opacity-80` agar setara level premium Apple/Design lainnya.
- **Glass-Bento Cerdas**: Menghancurkan desain kubus *rounded-lg bg-white p-6* dan dilarutkan menjadi wujud *Glass-Bento* membulat canggih (`rounded-3xl` bantalan p-8/p-10).
- **Gravitasi Hover**: Menyuntik sistem suspensi kursor: Kartu akan terangkat dramatis `-translate-y-2` dan memancarkan wibawa pendaran bayangan `shadow-2xl` lembut setiap disentuh *hover*.

> **ATURAN MUTLAK DATA**: Semua penataan string di properti *Role*, nama URL foto turunan (*?height=300*), maupun susunan nama akan saya lindungi 100% tanpa dijamah sejengkal pun!

### D. Refaktor Lensa Avatar Berpendar (Ring Glow)
- Menggunting murni kode pembentuk lingkaran kasar (`style={{ border: "4px solid..." }}`) yang menumpuk *tech debt*, agar bisa direkonsiliasi memancarkan CSS purna-standar: `ring-4 ring-accent ring-offset-4 ring-offset-white`. 

## 3. Pertanyaan Konfirmasi (Open Questions)
1. **Struktur Grid Guru**: Jumlah guru berjejer adalah **5 orang**. Konfigurasi `lg:grid-cols-5` menjejerkan 5 guru lurus memanjang dalam 1 baris. Saat dibuka pada Laptop/layar lebih lebar, ukuran kartunya mungkin akan cukup kurus-kurus meramping memanjang. Idealnya grid profil orang paling ciamik jika dijadikan maksimal `grid-cols-3` atau fleksibel dibungkus (sehingga ada 3 orang di atas, lalu 2 diletakkan tersenter mandiri di baris bawahnya). Apakah Anda kepingin *"Mempertahankan 5 jejere lurus lurus"* ATAU *"Otomatis membaris-cantikkan menyilang di desktop (3 atas, 2 senter bawah)"*?
