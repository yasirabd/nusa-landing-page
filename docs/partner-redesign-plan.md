# Rencana Redesain: Komponen "Partner" (partner-section.tsx)

Komponen ini krusial untuk menanamkan sinyal kepercayaan (Trust Indicator) kepada pendaftar bahwa NUSA berafiliasi dengan entitas teknologi dan industri nyata. Sayangnya, desain aslinya terlihat seperti sisipan *template* rendahan yang tidak ada sentuhan *Edutech*-nya sama sekali.

## User Review Required
> [!IMPORTANT]
> Saya mengusulkan untuk mengganti efek transisi standar "Pudar ke Terang" (Opacity) pada kumpulan logo mitra menjadi efek visual **Grayscale to Color** (Abu-abu mati menjadi Menyala Penuh). Ini adalah standar taktik desain Premium B2B ala *Google/Apple*. Mohon pastikan file gambar logo Anda tidak keberatan untuk diterapkan filter *grayscale* CSS. 

## 1. Temuan Pelanggaran Panduan (`style.md`)
1. **Pelanggaran Padding Kerdil**: Menggunakan `py-12 md:py-16`. Ini di bawah batas minimum nafas panggung NUSA yang harusnya merujuk ke macro-padding `py-24 md:py-32`.
2. **Pelanggaran Pewarnaan Mentah (Hardcoded)**: Menggunakan kelas `bg-white` kaku dan kode hex `#134146`. Kita akan membersihkannya menggunakan abstraksi obyek `COLORS`.
3. **Ketertinggalan Tipografi**: Teks "Partner Kami" menyusut lemah di `text-3xl font-bold`. Resolusi standar NUSA untuk judul harus diselamatkan ke tingkat `text-4xl md:text-5xl font-extrabold tracking-tight`.

## 2. Cetak Biru Eksekusi (Action Plan)

### A. Kalibrasi Panggung & Tipografi Utama
- **Abstraksi Palet**: Mendaratkan objek konstan `COLORS` ke dalam komponen. Latar belakang kanvas diubah menjadi `COLORS.white` (`#F7F7F2`) untuk menenangkan mata dari warna *surface* section sebelumnya.
- **Hierarki Teks**: Judul H2 diekskalasi meraksasa menjadi `text-4xl md:text-5xl font-extrabold`. Teks "Partner Kami" ditambahkan beban profesional menjadi **"Partner Industri & Teknologi"**. Di bawahnya, ditambah *subtitle* kecil (*"Dipercaya & dibina langsung oleh ekosistem startup nasional."*) untuk memvalidasi posisi institusi IT.

### B. Inovasi "Glass Tech Dock" (Dermaga Logo)
Aslinya hanya barisan logo mentah. Saya akan memasukkan kelima logo mitra tersebut ke dalam sebuah "Dermaga" melintang besar:
- Kontainer logo akan diselimuti kapsul *Glassmorphism* raksasa: berupa balok putih tembus pandang bertepi sangat melengkung `rounded-[3rem] p-8 md:p-12`.
- Kontainer dibubuhi efek batas kaca `border border-gray-200` dan jatuhan pantulan siber `shadow-[0_8px_30px_rgb(66,205,186,0.1)]` ke lantai.

### C. Efek "B2B Hover" (Grayscale Transition)
- Mengubah perilaku logo: saat tidak disentuh (pasif), seluruh logo partner akan terlihat mati warnanya dan elegan (`grayscale opacity-50`). 
- Pada interaksi sentuh / *Hover*: Fotonya akan menyala seketika kembali ke warna aslinya memancarkan kebanggaan *(Brand Pride)* melalui kode kontrol CSS `hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500`.

### D. Penguncian Matematis Tipografi & Skala Margin (Anti-Compound Layout)
- **Margin Pagar Pembatas**: Ruang jatuh antara Teks Header ("Partner Industri") menuju atap Kapsul Kaca (Glass Dock) tidak akan dibiarkan meregang puluhan *pixel*. Akan langsung dikunci intim ke `mb-8 md:mb-12`.
- **Eskalasi Dimensi Logo**: Menolak logo partner berukuran raksasa. Foto Logo diborgol ketat pada ukuran mini-elegan `h-10 md:h-12` agar tak sampai memecahkan *padding* kaca pelindungnya.
- **Kerapian Kolom *Mobile***: Pada layar HP kecil, susunan akan dilipat rahasia menjadi `grid-cols-2 gap-6`, sedangkan Desktop direntangkan rata `grid-cols-5`. Ini demi memastikan kelima logo partner industri tidak pernah tumpang tindih sedemikian kumuh.

## 3. Titik Persetujuan Eksekusi
Rencana amandemen ruang Partner ini dijamin akan mengebiri aura murahan yang tertinggal, meratakannya ke panggung desain *Tech Academy* papan atas. Jika Anda setuju dengan ide **Dermaga Kaca (Glass Dock)** beserta sihir efek kemunculan logo **Grayscale to Color**-nya, silakan berikan persetujuan untuk saya mutasikan *source code*-nya sekarang!
