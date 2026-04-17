# Rencana Redesain: Komponen "Program Section (Jurusan)"

Komponen ini (`components/program-section.tsx`) merupakan panggung utama untuk menjelaskan secara detail apa saja "jeroan" jurusan dan tahapan belajar *(Timeline)* di NUSA. Secara fungsional struktur *Timeline*-nya sudah tertulis dengan baik (menggunakan *alternating left/right view*), namun secara visual ia masih didera "kutukan UI jadul": Sudut tajam bersiku (`rounded-lg`), minim bayangan (*flat*), spasi kerdil, garis SVG mati, dan tipografi judul yang takut-takut. Saatnya kita peras desain ini ke standar UI Apple/Edutech Premium!

## User Review Required
> [!IMPORTANT]
> Plan ini diusulkan untuk mentransformasi komponen raksasa "Timeline Jurusan" kita. Silakan review dan ACC apabila Anda siap mengunci desain premium pada modul tahapan belajar ini.

## 1. Analisis Kelemahan Kode Eksisting
1. **Tipografi Judul yang Kurang Berwibawa**: H2 *"Jurusan Programmer & Designer"* saat ini terjebak di `text-3xl sm:text-4xl`. Teks penjelas di bawahnya tidak dilindungi dari resiko *giant paragraph*. Kepercayaan diri hierarki font kita anjlok di sini.
2. **Kartu Ceking Siku Tajam**: Wadah "Bagaimana Metode Belajarnya" berbentuk balok kaku (`rounded-lg`) dan `padding` dalam yang pelit (`p-6`), sehingga teks terkesan dijepit. Tak ada pantulan cahaya atau respons *hover*.
3. **Simbol SVG Manual**: Penggunaan simbol *checklist* vektor SVG manual dengan skrip panjang justru mengotori kode. Ini tidak efisien selama kita sudah mengadopsi `Lucide React`.
4. **Timeline Kusam**: Garis linimasa pembelah tengahnya hanya sebuah garis lurus polos (`w-1`). Titik lingkarannya *(Node Timeline)* berukuran kecil layaknya kancing kemeja (`w-8 h-8`), dan kartu stage di kanan kirinya mati kutu jika kursor mouse melintas. Tidak ada sensasi *"Journey"* masa depan.

## 2. Cetak Biru Perombakan (Redesign Action Plan)

### A. Tipografi Monumental & Ekstraksi Warna
- **Eskalasi H2 Gajah**: Memompa *"Jurusan Programmer & Designer"* masuk ke dalam radar `text-4xl md:text-5xl lg:text-6xl font-extrabold`. Teks paragraf pendamping takkan dibiarkan melewati `text-lg`.
- **Ekstraksi `COLORS`**: Semua hex membandel (`#134146`, `#2C8970`, dll) akan disedot paksa dan ditransformasikan ke rujukan variabel `COLORS` seperti di komponen lain.

### B. Revitalisasi "Metode Belajar" (Bento Upgrade)
- Kartu "Metode Belajarnya" akan disuntik *rounded-3xl* dan direnggangkan spasinya menjadi `p-8 md:p-10`. 
- Menghapus vektor SVG manual, diganti dengan `<CheckCircle2 />` anggun dari Lucide yang berwujud emas `COLORS.accent` atau *Teal* dalam gelembung lingkaran blur lembut.
- Seluruh kelompok *bullet point* akan diberikan interaksi *micro-hover* (sedikit membesar saat disorot).

### C. Evolusi "Timeline Tahapan Belajar" (Apple Step-Flow & Kalibrasi Sumbu)
- **Garis & Node Berpendar**: Merubah garis pemisah *timeline* menjadi *gradient line* tipis (*teal to transparent*). Titik nomer bulan (`1, 2, 3, 4`) akan diperlebar menjadi lingkaran yang lebih mantap dan megah (`w-12 h-12`), dilapisi cincin luar (*border tebal*).
- **Anti-Break Mobile Offset Rule**: Ingat! Jika besar node dinaikkan jadi 48px (`w-12`), sumbu penarik absolut di versi HP (*mobile*) wajib persis ditarik ke `left-[24px]` atau `left-6`. Gagal melakukan pengereman proporsional ini akan membuat garis timeline mencuat bocor keluar dari lingkarannya! 
- **Glass-Hover Alternating Cards**: Membungkus kartu konten *Stage* di kanan/kiri linimasa menggunakan format organik `rounded-3xl` + `p-8`. Menanam interaksi *Glass-Hover* padanya: saat di-*hover*, kartu bergeser sedikit menjauhi sumbu (`-translate-y-2`), mempertebal pantulan `shadow-xl`, dan perbatasannya memendarkan nyala cyan `#42CDBA/30`. 
- **Sub-Grid Jurusan Premium**: Mengubah daftar *Frontend/Backend* yang awalnya kotak kusam berhiaskan simbol titik *bullet* manual kotor (`<span className="mr-2">•</span>`) menjadi arsitektur *"inner bento"*; dengan menyikat habis titik `•` lalu menggantinya menggunakan vektor ikon esensial spesifik seperti `<Code />` untuk Programmer dan `<Palette />` untuk Designer.

### D. CTA Penutup
- Mengopi spesifikasi `<MoveRight>` panah sentrifugal pada tombol **Daftar Sekarang** persis dengan section ujung sebelum-sebelumnya agar standar interaksi tidak putus.

## 3. Pertanyaan Konfirmasi (Open Questions)
1. **Judul Card "Metode Belajar" & "Tahapan Belajar"**: Saat ini menggunakan format pertanyaan (`"Bagaimana Metode Belajarnya?"` dan `"Bagaimana Tahapan Belajar?"`). Saya menyarankan agar nada bicaranya kita ubah menjadi deklaratif: **"Metode Pembelajaran Mutakhir"** dan **"Peta Perjalanan (Roadmap) 100 Hari"** agar selaras dengan ketegasan wibawa NUSA. Apakah Anda setuju format pertanyaan diubah menjadi format deklarasi megah ini?
