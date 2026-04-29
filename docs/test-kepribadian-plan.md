# Rencana Implementasi `/test-kepribadian` — Tes TKPI NUSA

## Latar Belakang

Tes yang digunakan adalah **TKPI (Tes Kepribadian Pelajar Indonesia)** oleh Dr. Trubus Raharjo — sebuah tes psikometri yang mengukur berbagai dimensi kepribadian pelajar. Terdapat **100 pertanyaan** dengan dua pilihan jawaban **(A atau B)**.

Instruksi asli dari PDF:
> *"Pilihlah salah satu pernyataan yang kamu anggap paling sesuai dengan diri kamu. Tidak ada pernyataan yang salah. Apabila kedua pernyataan tidak sesuai, tetap pilih yang kamu anggap paling kecil ketidaksesuaiannya."*

---

## 1. Arsitektur Halaman

### Rute yang Akan Dibuat

```
app/
  test/
    page.tsx               ← Portal utama (Dashboard progres)
    kepribadian/
      page.tsx             ← Tes TKPI (100 soal, Multi-Step)
    penjurusan/
      page.tsx             ← Tes Programmer vs Designer (sudah ada, pindah)
    selesai/
      page.tsx             ← Halaman ringkasan hasil akhir
```

### Komponen yang Akan Dibuat

```
components/
  test/
    test-portal.tsx              ← Dashboard progres (Langkah 1 aktif, Langkah 2 terkunci)
    kepribadian/
      kepribadian-quiz.tsx       ← Komponen Multi-Step Quiz utama
      kepribadian-result.tsx     ← Ringkasan hasil kepribadian
    penjurusan/
      (komponen yang sudah ada, dipindah ke sini)
```

---

## 2. UX Design — Anti-Bosan Strategy

100 pertanyaan adalah angka besar. Strategi berikut dirancang agar santri tetap engage hingga soal terakhir.

### Strategi 1: Pembagian Menjadi 5 Sesi (20 soal/sesi)
Bukan scroll panjang, melainkan **5 "halaman" soal** yang terasa seperti babak berbeda:

| Sesi | Soal | Label | Warna Tema |
|------|------|-------|-----------|
| 1 | 1–20 | Mengenal Diri | Teal `#42CDBA` |
| 2 | 21–40 | Cara Berpikir | Green `#2C8970` |
| 3 | 41–60 | Hubungan Sosial | Indigo `#6366f1` |
| 4 | 61–80 | Cara Bekerja | Amber `#F3B233` |
| 5 | 81–100 | Respons & Emosi | Coral `#ef4444` |

### Strategi 2: Progress Bar Animatif
- Progress bar di atas halaman yang terisi secara real-time setiap kali soal dijawab.
- Tampilkan: `"Soal 34 dari 100 · Sesi 2 dari 5"`.
- Warna progress bar berubah sesuai tema sesi aktif.

### Strategi 3: UI Soal "1 Per 1" dengan Transisi
Setiap soal muncul satu per satu dengan animasi `slide-in` (bukan scroll), pilihan A/B ditampilkan sebagai **dua kartu besar yang bisa diklik**. Setelah dijawab, kartu "terpilih" berkilau dan soal berikutnya muncul otomatis setelah 400ms.

### Strategi 4: Milestone & Micro-Reward
Setiap selesai satu sesi, tampilkan layar interstitial kecil:
> *"Hebat! Kamu sudah menyelesaikan Sesi 1. Masih 4 sesi lagi. Lanjut yuk!"*
> — Dengan tombol "Lanjut ke Sesi Berikutnya".

### Strategi 5: Simpan Otomatis (Auto-Save)
Jawaban disimpan ke `localStorage` setiap soal dijawab. Jika santri menutup browser dan membuka kembali, mereka tidak perlu mengulang dari awal.

---

## 3. Logika Penilaian & Algoritma Skoring

Skoring TKPI menggunakan model matriks ipsatif (mirip dengan EPPS). Terdapat 10 Aspek kepribadian yang diukur.

### Matriks Pertanyaan
Terdapat 10 baris (mewakili 10 Aspek) dan 10 kolom.
Pertanyaan disusun sedemikian rupa sehingga setiap aspek memiliki deret horizontal dan deret vertikal.

**Daftar 10 Aspek:**
1. Motivasi berprestasi
2. Keteraturan
3. Kemandirian
4. Mampu bertahan lama
5. Keterbukaan
6. Dominansi
7. Ketergantungan
8. Ingin menonjolkan diri
9. Kecenderungan seksual
10. Agresivitas

### Aturan Perhitungan Skor
Setiap Aspek (1-10) dihitung dengan cara berikut:
1. **Pengecualian (Garis Merah):** Ada 10 soal diagonal yang **TIDAK DIHITUNG** sama sekali, yaitu nomor: **1, 19, 23, 37, 45, 55, 67, 73, 89, 91**.
2. **Hitung Bagian A (Horizontal):** Pada baris mendatar yang bersesuaian dengan nomor aspek, hitung berapa jumlah jawaban **A** (abaikan soal diagonal).
3. **Hitung Bagian B (Vertikal):** Pada kolom menurun yang bersesuaian dengan nomor aspek, hitung berapa jumlah jawaban **B** (abaikan soal diagonal).
4. **Total Skor Aspek:** Jumlahkan hasil perhitungan A dan B. (Nilai maksimal per aspek adalah 18).

**Contoh untuk Aspek 1 (Motivasi berprestasi):**
- Baris Horizontal 1: Soal 1, 20, 21, 40, 41, 60, 61, 80, 81, 100. (Hitung yang dijawab **A**, soal 1 diabaikan).
- Kolom Vertikal 1: Soal 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. (Hitung yang dijawab **B**, soal 1 diabaikan).
- Skor Aspek 1 = (Jumlah A horizontal) + (Jumlah B vertikal).

### Norma Kategori
Total skor tiap aspek kemudian dikategorikan:
- **< atau = 5** : RENDAH
- **6 sampai 9** : SEDANG
- **10 sampai 13** : TINGGI
- **>= 14** : SANGAT TINGGI

> [!IMPORTANT]
> **Privasi Hasil Tes:** Seluruh hasil perhitungan skor mentah, skor per aspek, dan norma kategori dari Tes Kepribadian ini **TIDAK AKAN DITAMPILKAN** kepada calon santri. Setelah selesai mengisi 100 soal, sistem hanya akan menyimpannya secara rahasia (di latar belakang) ke Supabase dan santri langsung diarahkan ke tes berikutnya.

---

## 4. Integrasi Supabase

### Skema Tabel `student_tests`

```sql
CREATE TABLE student_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,

  -- Kepribadian (Disimpan secara rahasia)
  personality_results JSONB,         -- Array of objects: [{ aspect: "Motivasi berprestasi", score_a: 5, score_b: 6, total: 11, category: "TINGGI" }, ...]
  personality_completed_at TIMESTAMP,

  -- Penjurusan
  designer_uiux_score INT,
  designer_color_score FLOAT,
  programmer_iq INT,
  programmer_logical FLOAT,
  programmer_numerical FLOAT,
  programmer_spatial FLOAT,
  tendency_result VARCHAR(30),
  penjurusan_completed_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW()
);
```

### Mekanisme Simpan
- Selama santri mengerjakan, progress disimpan ke `localStorage`.
- Saat semua 100 soal selesai, sistem menghitung matriks A/B per aspek dan hanya `personality_results` yang dikirim (UPSERT) ke Supabase.
- Atur `personality_completed_at`.

### Validasi Keamanan (UUID)
- Seluruh rute `/test` (termasuk `/test/kepribadian` dan `/test/penjurusan`) membutuhkan parameter `?ref=UUID`.
- Halaman akan memvalidasi UUID ini ke tabel `registrations`. Jika UUID tidak valid atau tidak ditemukan, halaman akan menampilkan pesan *Error/Unauthorized*.

---

## 5. Proposed Changes

### Database
- **[NEW]** Tabel `student_tests` di Supabase (SQL migration di atas).

### Routing (Next.js App Router)
- **[NEW]** `app/test/kepribadian/page.tsx` — Halaman tes TKPI Multi-Step.
- **[MODIFY]** `app/test/page.tsx` — Diubah menjadi Portal Dashboard Progres dengan validasi UUID.
- **[NEW]** `app/test/penjurusan/page.tsx` — Komponen tes penjurusan dipindah ke sini.
- **[NEW]** `app/test/selesai/page.tsx` — Halaman ringkasan akhir (tanpa membocorkan hasil tes kepribadian).

### Komponen
- **[NEW]** `components/test/kepribadian-quiz.tsx` — Logika perhitungan skor ipsatif matriks 10x10, auto-save localStorage, animasi transisi soal.

---

## 6. Verification Plan

1. Buat migration Supabase → cek tabel `student_tests` terbentuk.
2. Akses `/test?ref=<UUID invalid>` → cek muncul pesan penolakan.
3. Akses `/test?ref=<UUID valid>` → cek nama santri muncul.
4. Jawab semua 100 soal → cek `personality_results` tersimpan dengan format JSON struktur hasil perhitungan yang benar di Supabase.
5. Cek Auto-save: tutup browser di soal ke-45, buka kembali → soal lanjut dari 45.
6. Selesaikan kedua tes → cek `/test/selesai` menampilkan ringkasan akhir (hanya tes penjurusan yang terlihat).
