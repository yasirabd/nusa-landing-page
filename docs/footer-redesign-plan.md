# Rencana Redesain: Komponen Footer (footer.tsx)

Sesuai perintah eksplisit Anda untuk mengaudit dan merekonstruksi area penutup situs (`Footer`) menggunakan parameter absolut dari `docs/style.md`, berikut adalah bongkaran temuan investigatif beserta peta eksekusinya.

## Keputusan Arsitektur
> [!NOTE]
> *User Decision: Disetujui!* Bentuk asli `Iframe Google Maps` Interaktif akan tetap dihidupkan sepenuhnya. Operasi hanya akan menyuntikkan dan membungkus wujud luar *iframe* tersebut dengan teknologi *Glassmorphism Frame* (*bg-white/5 backdrop-blur-md*) agar rupa visualnya naik derajat selaras dengan identitas B2B NUSA tanpa mengebiri fungsinya.

## 1. Temuan Audit (Pelanggaran `style.md`)
1. **Penistaan Objek `COLORS`**: Warna di seantero dokumen ini mutlak diketik dengan *Hex Code* mentah seperti `#134146` dan `#F3B233`. Ini melanggar perintah wajib sentralisasi warna di panduan utama desain.
2. **Css Objek usang**: Penggunaan rona transparan diketik menggunakan kalkulasi lambat `style={{ backgroundColor: "rgba(255,255,255,0.06)" }}` untuk Ikon Sosial dan Kontak. Hal ini menyalahi esensi *Utility-First* bawaan Tailwind (`bg-white/5`).
3. **Pilar Spasial Kerdil**: Bantalan margin `py-12 md:py-16` di sekujur kakinya terasa kurang epik untuk membendung penutup portal akademik premium. 
4. **Bingkai Peta Telanjang**: *Iframe* Google Maps ditaruh polos begitu saja nyaris tanpa nafas *Glassmorphism Dark Mode* yang dimandatkan *style.md*.

## 2. Cetak Biru Eksekusi (Action Plan)

### A. Sentralisasi Pewarnaan (*Color Migration*)
- Mendeklarasikan utuh parameter `COLORS` di awal *file*.
- Menyapu bersih semua jejak kode *string hex*. Latar belakang disuntik mutlak menjadi `COLORS.darkBase` lalu seluruh semburat emas menjadi `COLORS.accent`.

### B. Revitalisasi Gaya Teks & Interaksi (*Micro-interactions*)
- Seluruh *Hover State* dari tombol Tautan Sosial, Email, dan Telepon yang tadi kaku akan disisipkan transisi pergerakan geser minimalis khas akademi premium (`hover:-translate-y-1` atau rotasi kecil) agar tidak terkesan murahan. 
- Transparasi latar akan menggunakan metode utilitas Tailwind murni (misal: `bg-white/5 border border-white/10`) demi menjaga optimisasi render kilat.

### C. Bingkai Peta Kaca (Glassmorphism Frame)
- Kotak tajam polos dari penyemat peta Google akan kita bungkus menggunakan kulit kapsul B2B: `rounded-2xl bg-white/5 backdrop-blur-md p-2 border border-white/10`. Ini mendongkrak ilusi megah layaknya sistem peranti lunak teknologi masa depan yang digariskan *style.md*.

### D. Pompa Dimensi Makro
- Menaikkan spasi area dasar secara halus menjadi `py-16 md:py-20 lg:py-24` agar pijakannya lebih kokoh menahan beban pendaftaran di bagian atasnya.

## 3. Tahapan Izin Jalan
Bila Anda merestui penghancuran kode usang *Hex* menuju pemurnian objek `COLORS` dan pembungkusan estetika kaca pada dasar bangunan web kita malam ini, silakan terbitkan perintah untuk mengeksekusinya!
