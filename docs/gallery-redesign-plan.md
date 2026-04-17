# Rencana Redesain: Komponen "Galeri Kegiatan" (Gallery Section)

Komponen ini memajang 12 momen *epic* santri NUSA. Namun kondisinya saat ini mirip seperti *grid template blog 2 kolom* biasa. Warnanya cukup "kotor" akibat *gradient overlay* kuning tebal, spasi udaranya kerdil, dan hierarki tipografinya belum selaras dengan kelas raksasa NUSA Premium. Serta yang paling krusial: persembunyian teks deskripsi via trik `max-h-0 hover` sangat membahayakan aksesibilitas untuk perangkat gawai/Mobile!

## User Review Required
> [!IMPORTANT]
> Plan ini diusulkan untuk membongkar total sistem layout 2 kolom yang membosankan menjadi **Gallery Grid 3-Kolom** dinamis bernapas lega, sekaligus mengganti lapisan gradasi warna kuning tua yang merusak estetika gambar asli menjadi **Glass-Teal Overlay (Dark Base)**. Mohon ulas rancangan ini karena berpengaruh besar pada cara audiens merespons foto kegiatan.

## 1. Analisis Kelemahan Eksisting
1. **Layout 2 Kolom (Monoton)**: Jumlah foto ada 12 buah, dirender paksa dalam format 2 kolom (`md:grid-cols-2`). Ini akan menciptakan lorong _scroll_ yang terlampau panjang ke bawah dan kartu gambar yang kelewat raksasa mekar melebar, tidak padat/terarah.
2. **Polusi Gradien Kuning**: Lapisan warna tembus pandang (`rgba(243,178,51,0.95)`) pada latar foto terlalu "mendominasi emas". Ia merusak saturasi warna asli _tone_ foto anak-anak dan bertabrakan secara murahan dengan konsep 'bersih'.
3. **Bug Navigasi Layar Sentuh *(Mobile Trap)*:** Manipulasi CSS *(hover)* melebarkan tinggi teks (`max-h-0` ke `max-h-40`). Di layar sentuh HP, orang tidak bisa nge-*hover* gambar dengan leluasa. Ini mengakibatkan audiens di _smartphone_ dipastikan **Gagal Total** membaca deskripsinya tanpa mengkliknya secara sengaja (yang mana aneh karena ini bukan tombol tautan).
4. **Hierarki Kerdil & Wadah Asimetris**: Batas komponen memakai lebar asimetris `max-w-7xl` yang tidak sinkron, dan H2 tertinggal di ukuran kecil `text-3xl`.

## 2. Cetak Biru Perombakan (Redesign Action Plan)

### B. Arsitektur Sinematik Lebar (Ekspansi 2-Kolom)
- **Kanvas Panoramic Asli**: Wadah kontainer berlebar penuh `max-w-7xl` akan kita pertahankan aslinya. Lebar maksimum ini sangat krusial di Gallery untuk menjamin foto-foto tak menjadi kerdil di layar raksasa.
- **Rasio Raksasa 2-Kolom**: Susunan *grid* dipertahankan dalam format lebar **2 baris lurus (`md:grid-cols-2 gap-6`)**. Formasi 2 kolom memberikan wewenang ruang yang membentang besar dan sangat memuaskan (*satisfying*) secara visual layaknya figura lukisan untuk setiap momen foto.
- Setiap bingkai foto akan direndam memakai kurva estetika kekinian `rounded-3xl` dengan efek zoom internal `scale-105` (transisi halus 700ms) saat disorot kursor.
- **DNA Tech Academy**: Mengacu tegas pada `style.md` ("Gunakan outline terang, panel atau frame digital"), saya menanam jaring kaca digital pelindung: Bingkai luarnya adalah tembusan pendaran redup `border border-transparent` yang memancarkan laser biru energi `#42CDBA/50` diiris cahaya `ring-offset-2` apabila fotonya dielus kursor *(Premium Neon Border)*.

### C. Revitalisasi Overlay Kaca & Tipografi Kalem (Mobile-First)
- **Tirani Kuning Terhapus**: Lapisan gradien emas transparan dibantai, diganti dengan gradasi peneduh dari Keluarga Teal murni: Gelap `COLORS.darkBase` di bawah lurus memudar ke _transparent_ di atas. 
- **Skala Teks Santai**: Tidak ada lagi pompanisasi font di dalam kartu! Judul Acara (Dalam Card) diposisikan kalem tertahan proporsional ke sedia kalanya: `text-lg md:text-xl font-semibold`. Deskripsi acara dijaga di `text-base md:text-lg`. Ini menjamin teks tidak menutupi kecantikan foto utama!
- **Kesetaraan Gawai (Mobile Bug-Fix)**: 
  - Judul setiap momen *(mis. "MPLS")* statis berakar di bawah (tak perlu hover).
  - Deskripsi tetap terbaca utuh penuh *(visible)* di mode *Mobile* di atas panel blur dark-glass.
  - Namun khusus Layar Komputer *(LG/Desktop)*, deskripsi diset Ninja mode: tersembunyi `opacity-0 translate-y-4` yang licin merayap naik muncul `opacity-100 translate-y-0` hanya saat _kursor mouse_ membelainya.

> **ATURAN MUTLAK DATA**: URL link gambar (`?text=`), judul acara, dan nilai *subtitle* di array **tidak akan dimanipulasi sama sekali**. Fokus bedah 100% pada struktur DOM antarmukanya saja.

## 3. Pertanyaan Konfirmasi (Open Questions)
Saat ini aspek rasio setiap foto saya seragamkan terkunci di kuncian layar lebar **16:9 (`aspect-video`)**. Bentuk ini paling *"Aman dan Ciamik"* tanpa gambar pecah. Apakah Anda kepingin saya bereksperimen dengan **Formasi Masonry/Pinterest** (Ukuran foto beda-beda tingginya) atau Anda lebih bahagia melihat **Grid Kotak Rata 16:9** layaknya bingkai foto Apple premium yang stabil?
