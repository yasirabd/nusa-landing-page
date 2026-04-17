# Rencana Redesain: Komponen "Program 100 Hari"

Komponen `components/program-100-days.tsx` merupakan salah satu senjata *copywriting* paling mematikan (*hook*) di sekujur *Landing Page* ini (Slogan: "Besoknya Gajian"). Namun sayangnya, bungkus visualnya saat ini masih terlihat pas-pasan—terutama kotak *gradient flat* tanpa nyawa dan tipografi yang tak menonjolkan bobot penawaran tersebut. Desain ini perlu dibawa ke kasta mahakarya premium dengan estetika *Sleek Tech Dark-Mode*.

## User Review Required
> [!IMPORTANT]
> Plan ini diusulkan untuk dieksekusi menyempurnakan rentetan "Aesthetic Overhaul" kita. Silakan review dan ACC via tombol/konfirmasi jika Anda setuju dengan elevasi gaya visual *premium dark-mode card* ini.

## 1. Analisis Kelemahan Kode Eksisting
1. **Kartu Gelap yang 'Mati'**: Komponen bersandar pada bungkus gradasi datar `linear-gradient(135deg, #2C8970, #134146)`. Tanpa adanya refleksi cahaya (glow) atau tekstur, kartu itu terlihat pejal dan mematikan kesan elegan.
2. **Tipografi 'Kurang Gigit'**: Kalimat emas `"100 Hari Belajar, Besoknya Gajian"` dibiarkan statis dengan `text-3xl`. Sangat kecil dan hambar untuk menopang slogan seheboh itu.
3. **Ikon Mainan**: Tiga ikon (TrendingUp, Coins, Hammer) dibungkus bulat kuning polos beringas `#F3B233`. Gaya ikon padat semacam ini di atas kanvas gelap terkesan kurang dewasa *(kurang premium)* dibanding ikon-ikon bercahaya *glassmorphism*.
4. **Hardcoded Hex**: Masih menggunakan heksadesimal mentah, mengabaikan konsensus abstrak objek `COLORS`.

## 2. Cetak Biru Perombakan (Redesign Action Plan)

### A. Tipografi Monumental & Slogan Locking
- **Upgrade Tulang Punggung H2**: Judul utama akan dinaikkan levelnya menjadi hierarki Gajah (`text-4xl md:text-5xl lg:text-6xl font-extrabold`). Paragraf penjelas di bawahnya ("Program pembelajaran intensif...") akan dipatok batas maksimal `text-base sm:text-lg` demi mempertahankan pakem *anti-giant-paragraph* dari sesi sebelumnya.
- **Suntikan Identitas Merek (Anti-Wrap)**: Saya membelah kalimatnya. Frasa **"100 Hari Belajar,"** akan tetap tegap *(Work Sans)* putih. Namun, *punchline* **"Besoknya Gajian"** akan disulap dengan kuning `COLORS.accent`, dimiringkan secara elitis dengan `font-romulo-italic`, dan—paling krusial—dirantai menggunakan `whitespace-nowrap` agar "Besoknya" dan "Gajian" pantang patah ke baris bawah saat merespons sempitnya layar HP.

### B. Tekstur Visual Premium & Arsitektur Wadah
- Latar `linear-gradient` akan dipertahankan, TETAPI diberikan injeksi trik CSS berupa lapisan grafis bintang mikro *(subtle grid pattern/radial pendar)* yang tembus pandang 5%. Kotak tidak lagi bersikap tajam kaku (`rounded-xl`), melainkan direbusik menjadi super membulat organik ala gawai terbaru (`rounded-3xl`), dengan bayangan dramatis `shadow-2xl`.
- Hamparan Section luar harus disesuaikan ruang vertikal spasinya (`py-24 md:py-32`) agar lega seperti blok Section Kurikulum dkk; serta diamankan murni `bg-white` agar *dark-card* ini berkontras ekstrem memisahkan diri dari Kurikulum (`bg-surface`).

### C. Glassmorphism pada Atribut 3 Kolom
- **Elemen Ikon Premium**: Menelanjangi warna kuning penuh dari bola pembungkus ikon, lalu menukarnya menjadi kaca transparan tipis `bg-white/10 backdrop-blur-md` *(glassmorphism)*. Vektor ikonnya *(Coins, Hammer, dll)* justru yang akan memancarkan warna emas `COLORS.accent`. Trik ini murni terinspirasi standar desain antarmuka Fintech mahal.
- **Hover Responsif Modul**: Tiap elemen kolom *(Card 1, 2, 3)* tidak lagi flat jika disentuh. Mereka akan mendapat serpihan *hover effect* (contoh: ngangkat sedikit dan nyala di tombol).

### D. Pemolesan CTA Magnetik
- Tombol "Daftar Sekarang" akan diselaraskan format panggilannya: menggunakan *hover shadow* dan transisi skala `hover:scale-105` serta panah dinamis.

## 3. Pertanyaan Konfirmasi (Open Questions)
1. **Wording Slogan Kunci**: Saat ini kalimat *"100 Hari Belajar, Besoknya Gajian"* dibungkus tanda kutip `"..."` ganda di dalam kode aslinya. Apakah Anda ingin tetap mempertahankan tanda kutip tersebut, atau dicopot saja diganti lepas murni tanpa kutip? (Saran saya: lepaskan kutipannya). Setuju?
