# Plan: Halaman Tes Kecenderungan Programmer vs Designer (`/test`)

## 1) Tujuan
Membuat halaman tes di route **`/test`** untuk membantu calon santri NUSA Boarding School mengetahui kecenderungan:
- **Programmer** (berdasarkan hasil dari https://brght.org/)
- **Designer** (berdasarkan hasil dari https://cantunsee.space/ dan https://color.method.ac/)

Output akhir:
1. Kecenderungan utama (Strong Programmer / Programmer / Balance / Designer / Strong Designer)
2. Skor per kategori
3. Analisis singkat yang mudah dipahami

## 2) Ruang Lingkup
- Menyediakan UI landing untuk memulai tes
- Menyediakan akses link ke dua tes eksternal
- Menyediakan form input hasil tes oleh peserta
- Melakukan normalisasi skor agar adil dibandingkan
- Menampilkan hasil analisis kecenderungan

## 3) Alur Pengguna (User Flow)
1. User buka **`/test`**
2. User membaca penjelasan singkat tujuan tes
3. User klik:
   - “Mulai Tes Designer UI/UX” (ke cantunsee.space)
   - “Mulai Tes Designer Color Matching” (ke color.method.ac)
   - “Mulai Tes Programmer” (ke brght.org)
4. Setelah selesai, user kembali ke **`/test`**
5. User mengisi form hasil:
   - Skor/hasil tes Designer
   - Skor/hasil tes Programmer
6. User klik **“Lihat Analisis”**
7. Sistem menampilkan:
   - Persentase kecenderungan
   - Rekomendasi utama
   - Penjelasan kekuatan dan area pengembangan

## 4) Struktur Halaman `/test`
### A. Hero/Intro
- Judul: “Tes Minat: Programmer atau Designer?”
- Deskripsi singkat (1–2 paragraf)
- Disclaimer: hasil adalah indikasi awal, bukan keputusan final

### B. Section Tes Eksternal
- Card 1: Designer Test UI/UX (cantunsee.space)
- Card 2: Designer Test Color Matching (color.method.ac)
- Card 3: Programmer Test (brght.org)
- Tombol buka di tab baru (`target="_blank"`)

### C. Section Input Hasil
Field minimum:
- Designer:
  - `designer_raw_score` (contoh: 4500 dari cantunsee.space)
  - `designer_max_score` (default: 6430, dari Cantunsee)
  - `color_matching_score` (0-10, dari color.method.ac; sempurna: 10)
- Programmer (berdasarkan hasil BRGHT):
  - `iq_result` (contoh: 128)
  - `logical_reasoning_percent` (contoh: 99%)
  - `numerical_reasoning_percent` (contoh: 96%)
  - `spatial_reasoning_percent` (contoh: 75%)

### D. Section Hasil Analisis
- Skor normalisasi Designer (%)
- Skor normalisasi Programmer (%)
- Label kecenderungan:
  - Strong Programmer
  - Programmer
  - Balance
  - Designer
  - Strong Designer
- Insight teks otomatis

## 5) Logika Penilaian
### Normalisasi
Gunakan formula:
`normalized_score = (raw_score / max_score) * 100`

Jika max score tidak tersedia dari platform:
- Tetapkan asumsi default yang jelas di UI
- Minta user input manual max score agar lebih akurat

### Skor Designer dari Cantunsee
Komponen nilai Cantunsee:
- tutorial → `10 * 3 = 30`
- easy → `100 * 18 = 1800`
- medium → `200 * 18 = 3600`
- hard → target minimum bagus: `200 * 5 = 1000` (untuk lulusan SMP)

Total **max score Cantunsee (SMP-friendly)**: `6430`

Implementasi yang disarankan:
- `designer_raw_score` diisi dari skor akhir user di Cantunsee.
- `designer_max_score` default ke `6430`.

### Skor Color Matching (Designer)
- Sumber tes: `https://color.method.ac/`
- Rentang nilai: `0` sampai `10`
- Nilai sempurna: `10`
- Normalisasi: `color_matching_percent = (color_matching_score / 10) * 100`

### Skor Akhir Designer
Agar aspek visual dan UI sama-sama terhitung:
- Jika `designer_raw_score` melebihi `designer_max_score`, tetap hitung sesuai formula (tanpa clamp) agar performa di atas baseline tetap terbaca.
- `designer_uiux_percent = (designer_raw_score / designer_max_score) * 100`
- `designer_score = (designer_uiux_percent + color_matching_percent) / 2`

### Skor Programmer dari BRGHT
Gunakan rata-rata dari 3 komponen reasoning agar konsisten dalam skala persen:
`programmer_score = (logical_reasoning_percent + numerical_reasoning_percent + spatial_reasoning_percent) / 3`

Catatan:
- `iq_result` tetap ditampilkan dalam hasil analisis sebagai indikator tambahan.
- Jika dibutuhkan pembobotan berbeda di fase lanjutan, dokumentasikan bobot secara eksplisit.

### Penentuan Kecenderungan
- `delta = programmer_score - designer_score`

Alasan penggunaan ambang `10`:
- `10` dipakai sebagai **buffer awal** agar selisih kecil (noise) tidak langsung mengubah label.
- Dengan skala persen (0–100), selisih di bawah 10 poin masih dianggap zona abu-abu/overlap minat.
- Angka ini adalah **heuristik awal MVP**, bukan angka baku psikometrik.

Aturan awal MVP (5 klasifikasi):
- Jika `delta >= 25` → **Strong Programmer**
- Jika `10 <= delta < 25` → **Programmer**
- Jika `-10 < delta < 10` → **Balance**
- Jika `-25 < delta <= -10` → **Designer**
- Jika `delta <= -25` → **Strong Designer**

Rencana kalibrasi setelah data terkumpul:
- Simpan data batch awal (mis. 100–200 peserta).
- Evaluasi distribusi delta dan kecocokan dengan observasi mentor/wawancara.
- Sesuaikan ambang (mis. 8/12/15) berdasarkan akurasi klasifikasi.

## 6) Template Analisis Hasil
Contoh output:
- **Kecenderungan:** Programmer (atau Strong Programmer, Balance, Designer, Strong Designer)
- **Ringkasan:** “Kamu menunjukkan pola berpikir logis dan problem solving yang lebih dominan.”
- **Kekuatan utama:** analitis, struktur, debugging
- **Saran pengembangan:** tetap latih sense visual/UI agar solusi teknis lebih user-friendly

Untuk Designer:
- Fokus pada kreativitas visual, empati user, konsistensi UI
- Saran pengembangan: dasar logika pemrograman untuk kolaborasi produk

Untuk Balance:
- Cocok ke role hybrid (Product Designer teknis / Frontend UI Engineer)
- Saran: pilih jalur awal lalu bangun skill pendamping

## 7) Validasi & Edge Cases
- Jika salah satu skor kosong → tampilkan validasi “Lengkapi kedua hasil tes”
- Jika input bukan angka → tampilkan error
- Untuk field persen, nilai wajib 0–100
- Untuk Cantunsee, jika `designer_raw_score > designer_max_score` → **boleh** (jangan ditolak), karena skor bisa melebihi baseline max internal
- Jika max score = 0 → tolak input

## 8) Teknis Implementasi (High-Level)
- Route: **`/test`**
- Komponen:
  - `TestIntro`
  - `ExternalTestLinks`
  - `ResultInputForm`
  - `AnalysisResult`
- Utility:
  - `normalizeScore(raw, max)`
  - `getTendency(programmerScore, designerScore)`
  - `generateAnalysis(tendency, programmerScore, designerScore)`

## 9) Copywriting (Ringkas)
- CTA utama: **“Mulai Tes Sekarang”**
- CTA hasil: **“Lihat Analisis Saya”**
- Disclaimer: “Hasil ini adalah pemetaan awal minat dan potensi, bukan penilaian final.”

## 10) Rencana Pengembangan Bertahap
### Phase 1 (MVP)
- Halaman `/test`
- Link dua tes eksternal
- Input skor manual (designer) + input hasil BRGHT (IQ, logical, numerical, spatial)
- Hasil kecenderungan + analisis singkat

### Phase 2
- Simpan hasil ke database
- Histori hasil per calon santri
- Export PDF ringkasan hasil

### Phase 3
- Dashboard admin
- Insight agregat cohort
- Rekomendasi kelas awal berdasarkan kecenderungan
