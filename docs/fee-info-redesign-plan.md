# Rencana Redesain: Komponen "Informasi Biaya" (fee-info-section.tsx)

Komponen ini krusial untuk mengonversi ketertarikan wali murid (Leads) lewat transparansi harga. Saat ini secara hierarki informasi sudah baik, namun secara kerangka visual masih sangat kaku bergaya "template brosur standar" tanpa daya tarik *Tech Academy* yang sudah kita bangun di halaman atas.

## User Review Required
> [!IMPORTANT]
> Plan ini mengusulkan agar elemen "Biaya Pendaftaran" tidak dibiarkan sebagai kotak kurus menyendiri di atas grid, melainkan disulap menjadi *Horizontal Tech Banner* mewah. Susunan array biaya (`feeDetails`) dipastikan tetap aman. Mohon dibaca dan disetujui.

## 1. Temuan Cacat Visual (Berdasarkan style.md)
1. **Pelanggaran Background Murni**: Memakai warna murni `#FFFFFF` secara harfiah untuk background `section`. Menurut `style.md`, *surface* berlayar terang harus menggunakan bawaan `COLORS.surface` (`#F0FAF7`) atau Putih NUSA (`#F7F7F2`).
2. **Pelanggaran Batas Pembagi (Divider)**: Garis batas catatan bawah (Notes) memakai hex mati `#E5E5E5`, dan teks catatan di bawahnya memakai `Primary #2C8970`. Keduanya melanggar pakem opacity.
3. **Kartu Biaya Pendaftaran Terjepit**: Kotak "Biaya Pendaftaran" selebar `max-w-sm` menyisakan banyak area bolong tak berguna di layar Desktop dan mengganjal alur visual (flow).
4. **Catatan Penting Tumpang Tindih**: Blok "Informasi Penting" mangkrak di sudut kiri bawah layar tanpa pijakan desain yang setara membuat halaman terasa belum usai dirender.

## 2. Cetak Biru Perombakan (Redesign Action Plan)

### A. Revitalisasi Panggung Ruang & Tipografi Proporsional
- Menaikkan skala Padding vertikal kontainer luar ke eselon standar NUSA: `py-24 md:py-32 lg:py-40`.
- Membuang warna putih tengik `#FFFFFF` dan menerapkan `COLORS.surface` (`#F0FAF7`) membanjiri seluruh hamparan dinding belakang komponen.
- H2 "Informasi Biaya" diposisikan proporsional ke ukuran `text-4xl md:text-5xl font-extrabold tracking-tight` (Tidak diekskalasi buta ke 6xl yang mengganggu mata). 
- **Anti-Compound Margin (Jarak Intim Terproteksi)**: Jarak antara Header, Banner Pendaftaran, Base Card Grid, dan Informasi Penting tidak akan dibiarkan meregang puluhan *pixel* (seperti `mb-16` yang konyol aslinya). Saya akan kencangkan jarak aliran turunnya (Flow layout) menggunakan margin moderat yang konsisten `mb-8 md:mb-12`.
- **Eskalasi Teks List Mikro**: Semua kerincian poin turunan paket biaya *(checklists)* akan diamankan dalam skala padat elegan `text-sm leading-relaxed`. Harga pokok dipertahankan raksasa memecah kesunyian di `text-5xl`, dan kategori paket *(Uang Masuk dsb)* ditahan berwibawa di label elegan tanpa berebut hirarki visual.

### B. Inovasi Banner Pendaftaran (Premium Horizontal Banner)
- Mengubah "Biaya Pendaftaran" (Rp 275.000) dari kotak portrait kurus penyendiri *(max-w-sm)* menjadi sebuah *Wide Bento Banner* (persegi horizontal) selebar area Grid!
- Akan dibentangkan melalui `Flexbox` *(di layar desktop)*: deskripsi teks di sisi kiri, nominal raksasa di pelukan sisi kanan.
- Banner dibungkus kelengkungan modis `rounded-3xl` berukiran emas *background rgba* tipis beraksen NUSA, melepaskan keterasingannya.

### C. Pemolesan Bento Pricing Card (Daftar Biaya Utama)
- Grid 3 kolom biaya akan diangkat memakai kerangka pelindung `rounded-3xl` ber-padding `p-8` dengan efek levitasi gawai `hover:-translate-y-2 hover:shadow-2xl`.
- Kotak nama kategori ("UANG BULANAN", dll) yang sekarang kotak padat kaku di atas kartu akan diubah menjadi lencana membulat dinamis (`rounded-full py-1.5 px-4 inline-block font-bold`).
- Harga utama `text-5xl` akan diberikan *drop-shadow* lembut `#42CDBA/20` untuk efek harga yang menyala terang.
- Aturan ketat opacity batas pemisah (`DarkBase 12%`) akan diterapkan total ke ruang *Notes*. Teks keterangan *Notes* dikeraskan kepatuhannya menjadi `DarkBase 70%`.

### D. Kotak "Informasi Penting" (Footer Harga)
- Daripada diletakkan miring ke sudut kiri, ketiga *bullet point* "Informasi Penting" akan dibungkus rapi dalam *Glass Footer Message* (Kotak horizontal melintang penuh) di bawah struktur *grid*, dikunci di posisi rata-tengah (*Center Align*), dipadu pijar *neonCyan* pada ikon centangnya. 

### E. Sistem Subsidi & Urgensi Berlapis (Promo FOMO "10 Pertama")
- **Mutasi Data Pemasaran**: Mengabulkan tata letak diskon! Elemen angka `"20jt"` akan kita formalkan secara halus menjadi **"Jt"** (huruf kapital terpisah) di seluruh kartu agar berkelas. Pada array *Biaya Masuk*, data dimutasi dengan menambahkan parameter `originalAmount: "20 Jt"` dan angka utama yang baru menjadi `amount: "12 Jt"`.
- **Desain Angka Coret (Strikethrough)**: Di atas tulisan **12 Jt** yang super besar, akan diletakkan angka **~~20 Jt~~** yang tercoret tebal dan dipudarkan abunya untuk memberi sensasi urgensi bahwa harga bisa kembali melambung suatu saat *(Marketing Visual Cues)*.
- **Lencana Panas (Scarcity Ribbon)**: Tepat di titik pusat jatuhnya harga *Biaya Masuk*, akan kita tancapkan Lencana Merah/Emas bertuliskan lantang **"DISKON 8 JUTA (10 Pendaftar Pertama)"** dengan pijaran animasi denyut `animate-pulse` ringan agar menjerat fokus calon santri secara instan.

## 3. Pertanyaan Konfirmasi (Pelaksanaan)
Semua persiapan amunisi sudah termuat dalam rencana: Mulai dari proteksi Tipografi, Banner Pendaftaran Horizontal yang melintang *Premium*, Pembersihan Margin Jarak, hingga jurus diskresi *angka coret* 8 Juta lengkap dengan animasinya. **Silakan beri lampu hijau untuk ledakan eksekusinya sekarang!**
