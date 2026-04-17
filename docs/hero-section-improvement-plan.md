# Hero Section — Improvement Plan

> **File target:** `components/hero-section.tsx` + `components/promo-banner.tsx`
> **Referensi:** `docs/style.md`, `docs/color-migration-plan.md`, `app/globals.css`, `app/layout.tsx`
> **Terakhir diupdate:** 2026-04-16 (rev 2 — tambah audit konten & ukuran teks)

---

## Konteks Tambahan (Ditemukan Setelah Review Mendalam)

Setelah membaca file `promo-banner.tsx`, `layout.tsx`, `globals.css`, dan `color-migration-plan.md`, ditemukan beberapa hal penting yang **tidak tercakup di plan versi awal**:

1. **`promo-banner.tsx` adalah bagian dari hero** — dirender langsung di dalam `HeroSection` melalui `<PromoBanner />`. Masalah warna di `promo-banner.tsx` secara langsung mempengaruhi tampilan hero.
2. **Font Work Sans sudah dikonfigurasi** di `layout.tsx` dan aktif sebagai `--font-sans` di `globals.css`. Artinya `font-sans` Tailwind sudah mengarah ke Work Sans — class `font-work-sans` terpisah **tidak diperlukan**.
3. **`globals.css` sudah memiliki CSS tokens yang benar** (`--primary = #2C8970`, dst.) — namun `hero-section.tsx` menggunakan inline `COLORS` object yang tidak memanfaatkan tokens ini.
4. **`font-bold` di `globals.css` di-override ke `font-weight: 600`** — artinya `font-bold` bukan 700. Ini berdampak pada `<h1>` dan subheadline hero yang pakai `font-extrabold` (→ 700 di globals.css, bukan 800).
5. **`color-migration-plan.md` baris 69–70** menyatakan hero "sudah sesuai plan" — ini **keliru**, karena hero masih pakai `#1F6F68` sebagai background utama.

---

## Ringkasan Masalah

`HeroSection` dan `PromoBanner` menggunakan warna hardcoded yang tidak sesuai palette resmi `style.md`. Detail lengkap di bawah.

---

## 1. `hero-section.tsx` — Masalah Warna

### 1.1 Hero Background — Warna Salah

| | Saat Ini | Seharusnya (style.md) |
|---|---|---|
| `backgroundColor` | `#1F6F68` (Depth Tone) | `#2C8970` (Primary) |
| Gradient dari | `#1F6F68` | `#2C8970` |
| Gradient ke | `#42CDBA` | `#42CDBA` ✅ |

**Alasan:** `style.md` secara eksplisit menyatakan `#2C8970` (Primary) untuk **hero background**. `#1F6F68` hanya untuk panel gelap, overlay, dan depth — bukan hero utama. Warna ini juga menyebabkan hero terasa lebih **gelap dan dingin** dari yang diinginkan brand.

---

### 1.2 Konstanta `COLORS` — Nama Tidak Sesuai Terminologi Style Guide

Seluruh objek `COLORS` di komponen menggunakan nama yang berbeda dari terminologi resmi di `style.md`, sehingga membingungkan:

```ts
// SEBELUM (tidak sesuai style.md)
const COLORS = {
  primary: "#42CDBA",    // ← sebenarnya Secondary di style.md
  secondary: "#1F6F68",  // ← sebenarnya Depth Tone di style.md
  accent: "#F3B233",     // ✅
  white: "#F7F7F2",      // ✅
  charcoal: "#2B2B2B",   // ✅ (tapi penggunaannya salah — lihat 1.3 & 1.4)
  neonCyan: "#8EF3E7",   // ✅
  // ← darkBase (#134146) dan depthTone tidak terdefinisi sama sekali
}

// SESUDAH (sesuai terminologi style.md)
const COLORS = {
  darkBase: "#134146",   // Dark Base — teks utama, strong anchor
  depthTone: "#1F6F68",  // Depth Tone — panel gelap, overlay, shadow
  primary: "#2C8970",    // Primary — hero bg, section bg berwarna ← KUNCI
  secondary: "#42CDBA",  // Secondary — highlight terang, border dekoratif
  accent: "#F3B233",     // Accent — CTA, badge, urgency
  white: "#F7F7F2",      // White hangat — teks di atas bg gelap, card
  charcoal: "#2B2B2B",   // Charcoal — HANYA icon fill/stroke
  neonCyan: "#8EF3E7",   // Neon Cyan — glow, hover, dekoratif tech
}
```

---

### 1.3 Teks Badge "Kuota" — Charcoal Dipakai untuk Teks

```tsx
// SEBELUM
<div className="... bg-white/95 rounded-full ..." style={{ color: COLORS.charcoal }}>
  Kuota 20 Santri Putra
</div>
```

**Masalah:** `style.md` tegas: `charcoal (#2B2B2B)` **hanya** untuk icon fill/stroke, outline, shadow — **bukan teks**. Teks harus pakai `Dark Base (#134146)`.

```tsx
// SESUDAH
<div style={{ color: COLORS.darkBase }}>
```

---

### 1.4 CTA Button Primary — Charcoal untuk Teks Label

```tsx
// SEBELUM
style={{ backgroundColor: COLORS.accent, color: COLORS.charcoal, ... }}
```

**Masalah:** Sama — teks bukan icon, harus `darkBase`.

```tsx
// SESUDAH
style={{ backgroundColor: COLORS.accent, color: COLORS.darkBase, ... }}
```

> **Catatan visual:** Perbedaan `#2B2B2B` vs `#134146` halus tapi penting — `darkBase` punya teal tint yang menyatu lebih baik dengan brand teal.

---

### 1.5 Box Shadow CTA Button — rgba Hardcoded dari Depth Tone

```tsx
// SEBELUM — rgba(31, 111, 104, 0.35) = #1F6F68 (Depth Tone)
boxShadow: `0 6px 18px rgba(31, 111, 104, 0.35)`

// SESUDAH — berbasis Dark Base (#134146) untuk shadow teks di atas Accent
boxShadow: `0 6px 18px rgba(19, 65, 70, 0.4)`
```

---

### 1.6 Image Container Box Shadow — rgba Hardcoded dari Depth Tone

```tsx
// SEBELUM — rgba(31, 111, 104, ...) = Depth Tone
boxShadow: `0 20px 45px rgba(31, 111, 104, 0.4), 0 0 30px rgba(142, 243, 231, 0.15)`

// SESUDAH — berbasis Primary (#2C8970)
boxShadow: `0 20px 45px rgba(44, 137, 112, 0.4), 0 0 30px rgba(142, 243, 231, 0.15)`
```

---

### 1.7 Glow Blob "Medium Circle" — Masih Pakai `COLORS.primary` Lama (#42CDBA)

Setelah rename `COLORS.primary` dari `#42CDBA` ke `#2C8970`, blob ini akan otomatis berubah. Namun perlu dipastikan intent-nya:

```tsx
// Sebelum rename: backgroundColor = #42CDBA (Secondary)
// Setelah rename: backgroundColor = #2C8970 (Primary) ← berubah otomatis
<div style={{ backgroundColor: COLORS.primary, opacity: 0.25, filter: "blur(30px)" }} />
```

**Tentukan intent:** Apakah blob ini harus tetap menggunakan Secondary (`#42CDBA`) atau Primary (`#2C8970`)? Berdasarkan posisi dan fungsinya (blob tengah–kanan yang memberi aksen cerah), **disarankan tetap Secondary** (`#42CDBA`).

```tsx
// SESUDAH (eksplisit):
<div style={{ backgroundColor: COLORS.secondary, opacity: 0.25, filter: "blur(30px)" }} />
```

---

### 1.8 Outline Button Hover — Hardcoded `#8EF3E7`

```tsx
// SEBELUM — hardcoded inline di className string
className="... hover:border-[#8EF3E7] hover:text-[#8EF3E7] ..."
```

Nilai `#8EF3E7` adalah `neonCyan` yang benar secara palette, namun hardcoded. Tidak kritis, namun bisa dicatat sebagai teknikal debt untuk konsistensi dengan `COLORS.neonCyan`.

---

## 2. `promo-banner.tsx` — Masalah Warna (Bagian dari Hero!)

`PromoBanner` dirender langsung di dalam `HeroSection`, sehingga masalah warnanya **termasuk dalam scope perbaikan hero**.

### 2.1 Background Gradient PromoBanner — Depth Tone yang Terlalu Gelap

```tsx
// SEBELUM
background: "linear-gradient(135deg, #1F6F68 0%, #134146 50%, #134146 100%)"
```

| Stop | Saat Ini | Seharusnya |
|---|---|---|
| 0% | `#1F6F68` (Depth Tone) | `#2C8970` (Primary) atau tetap Depth Tone sebagai kontras |
| 50%–100% | `#134146` (Dark Base) | `#134146` ✅ |

**Analisis:** Banner promo berada di atas hero background. Jika hero berubah ke `#2C8970`, gradient banner dari `#1F6F68 → #134146` akan terasa lebih gelap dari container-nya — kontras ini bisa disengaja untuk visibilitas, atau dirasa aneh secara mood.

**Rekomendasi:** Pertahankan gradient yang lebih gelap (`#1F6F68 → #134146`) agar banner terlihat seperti "panel" yang terangkat dari hero. Ini **sesuai peran Depth Tone** di `style.md` — panel gelap. **Tidak perlu mengubah ini.**

> Artinya poin ini dihapus dari daftar perubahan — sudah benar secara intent.

### 2.2 Background Countdown Container — Depth Tone OK

```tsx
background: "rgba(31,111,104,0.55)"  // rgba(#1F6F68, 0.55)
```

**Status:** ✅ Ini adalah countdown panel — penggunaan Depth Tone (panel gelap) sudah sesuai.

### 2.3 Warna Teks & Accent di PromoBanner

- `#F3B233` untuk angka countdown, teks promo → ✅ Accent, sudah benar.
- `#F7F7F2` untuk teks body → ✅ White hangat, sudah benar.
- `#8EF3E7` untuk "10 Pendaftar Pertama" → ✅ Neon Cyan sebagai accent sekunder, sudah benar.
- border `rgba(66,205,186,0.35)` → ✅ Secondary tinted, sudah benar.

**Kesimpulan `promo-banner.tsx`:** Warnanya **sudah sesuai style.md**. Tidak ada perubahan yang diperlukan di file ini.

---

## 3. Tipografi — Koreksi dari Plan Sebelumnya

### 3.1 Work Sans Sudah Aktif — Tidak Perlu Class Tambahan

Plan sebelumnya menyarankan menambah class `font-work-sans` atau `font-worksans` ke `<h1>`. Ini **tidak diperlukan** karena:

- `layout.tsx` sudah memuat `Work_Sans` dengan variable `--v0-font-work-sans`
- `globals.css` baris 142 menetapkan `--font-sans: var(--v0-font-work-sans)`
- `body` di `layout.tsx` sudah menggunakan class `font-sans`
- Artinya **semua elemen yang tidak di-override secara eksplisit sudah menggunakan Work Sans** sebagai default

**Koreksi:** Poin 2.1 dari plan sebelumnya (tambah class font) **tidak valid**. `<h1>` sudah otomatis menggunakan Work Sans via inheritance.

---

### 3.2 Perhatian: `font-bold` ≠ 700 di Project Ini

`globals.css` meng-override weight Tailwind:
```css
.font-bold      { font-weight: 600; }  /* bukan 700! */
.font-extrabold { font-weight: 700; }  /* bukan 800! */
.font-black     { font-weight: 800; }  /* bukan 900! */
```

Dampaknya pada hero:
- `<h1 font-extrabold>` = weight **700** (bukan 800) — sesuai rekomendasi style.md (700–800) ✅
- `<p font-bold>` subheadline = weight **600** — sesuai style.md (600–700) ✅
- Tidak ada yang perlu diubah, namun tim harus **sadar soal override ini** agar tidak salah asumsi saat debugging typography.

---

## 4. Koreksi `color-migration-plan.md`

Di `color-migration-plan.md` Fase 2 baris 69–70 terdapat klaim yang keliru:

```
#### `components/hero-section.tsx`
- [ ] Review COLORS object: `primary: "#42CDBA"` — ini naming di kode saja, visual sudah sesuai plan, biarkan atau rename agar jelas
- [ ] Semua warna di hero sudah menggunakan palette resmi ✅
```

**Ini tidak akurat.** Hero background menggunakan `#1F6F68` (Depth Tone), bukan `#2C8970` (Primary). Perlu dikoreksi di plan migrasi agar tidak terlewat saat eksekusi.

---

## 5. Audit Konten & Ukuran Teks (Tambahan Rev 2)

### 5.1 CTA Button — Terlalu Besar

Kedua button saat ini menggunakan padding dan font yang terlalu besar sehingga mendominasi dan terasa berat:

| Property | Primary CTA | Secondary CTA |
|---|---|---|
| Padding | `px-8 py-4` (32px / 16px) | `px-8 py-4` |
| Font size | `text-lg` (18px) | `text-base sm:text-lg` (16–18px) |
| Icon | `w-6 h-6` (24px) | `h-6 w-6` (24px) |
| Gap | `gap-3` (12px) | `gap-3` (12px) |

**Perbandingan dengan standar landing page:** Padding `px-8 py-4` biasanya digunakan untuk hero button yang menjadi satu-satunya elemen di viewport. Di sini ada dua button berdampingan plus promo banner, sehingga ukuran ini membuat area button terlalu padat.

**Rekomendasi ukuran:**

```diff
- px-8 py-4
+ px-6 py-3        /* lebih proporsional dengan body teks sekitarnya */

- text-lg           /* 18px */
+ text-sm sm:text-base  /* 14px → 16px, biar responsive */

- gap-3            /* 12px ikon–teks */
+ gap-2            /* 8px */

- w-6 h-6          /* icon 24px */
+ w-5 h-5          /* icon 20px, proporsional dengan text-base */
```

> **Alasan:** `style.md` menetapkan button label menggunakan Work Sans `weight 500–600`. Ukuran font tidak disebutkan spesifik, namun hierarki visual mengharuskan button **lebih kecil dari subheadline** (`text-2xl`–`text-3xl`) agar CTA tidak bersaing dengan headline.

---

### 5.2 Label CTA Secondary — Terlalu Panjang & Redundan

```tsx
// SEBELUM
Daftar Sekarang &amp; Dapatkan Diskon!
// Panjang: ~35 karakter — terlalu panjang untuk button pill
// Risiko: text wrap di mobile meski ada whitespace-nowrap
// Redundan: diskon sudah dipromosikan di PromoBanner tepat di atasnya
```

**Rekomendasi label:** Persingkat menjadi label yang aksi-oriented dan tidak redundan:

```tsx
// SESUDAH — pilih salah satu:
"Daftar Sekarang"              // paling bersih, universal
"Daftar & Raih Diskon"         // masih ada urgensi, lebih pendek (~20 char)
"Mulai Pendaftaran"            // alternatif lebih formal
```

> **Rekomendasi utama:** `"Daftar Sekarang"` — singkat, aksi-oriented, tidak redundan dengan banner.

---

### 5.3 Subheadline "Now Open" — Campur Bahasa

```tsx
<span style={{ color: COLORS.accent }}>SPMB 2026–2027</span>
<span className="opacity-95">Now Open</span>
```

**Masalah:** "Now Open" mencampurkan bahasa Inggris di antara konten bahasa Indonesia. Ini bisa disengaja sebagai brand voice tech-forward, namun perlu konsistensi.

**Evaluasi berdasarkan style.md:** Brand voice adalah *modern, tech-savvy, edukatif, ramah untuk remaja dan orang tua*. Mencampur "Now Open" bisa diterima untuk nuansa modern, namun jika target audience orang tua juga, bahasa Indonesia lebih inklusif.

**Rekomendasi:**

```tsx
// Opsi A — Bahasa Indonesia (lebih inklusif untuk ortu)
<span>Pendaftaran Dibuka</span>

// Opsi B — Pertahankan English (tech-savvy, lebih energik)
<span>Now Open</span>  // ← tetap, tidak perlu diubah jika ini intent brand
```

> Tandai sebagai **keputusan editorial** yang perlu dikonfirmasi tim — bukan bug teknis.

---

### 5.4 Body Text — `opacity-85` Non-Standard Tailwind

```tsx
// SEBELUM
<p className="text-sm sm:text-base md:text-lg opacity-85" ...>
```

**Masalah:** `opacity-85` tidak ada di skala default Tailwind (skala: 0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100). Tailwind v4 mungkin ignore ini secara silent.

**Perbaikan:**

```tsx
// SESUDAH — gunakan arbitrary value
<p className="text-sm sm:text-base md:text-lg opacity-[0.85]" ...>
```

---

### 5.5 Body Text — `md:text-lg` Terlalu Besar untuk Body

```tsx
// SEBELUM
<p className="text-sm sm:text-base md:text-lg ...">
  // md:text-lg = 18px body → besar untuk paragraf pendukung
```

**Analisis:** Subheadline di atasnya adalah `md:text-3xl` (30px). Body `md:text-lg` (18px) terlalu berdekatan nilainya dengan subheadline, sehingga hierarki terasa tidak tajam.

**Rekomendasi:** Cap body di `md:text-base` (16px) untuk menjaga hierarchy yang jelas:

```tsx
// SESUDAH
<p className="text-sm sm:text-base opacity-[0.85]" ...>
// atau tetap text-lg di md jika spacing antar paragraf sudah cukup membedakan
```

---

### 5.6 `whitespace-nowrap` di `<h1>` — Risiko Overflow Mobile

```tsx
<h1 className="... text-3xl sm:text-4xl md:text-5xl whitespace-nowrap ...">
  NUSA Boarding School
</h1>
```

**Masalah:** `whitespace-nowrap` mencegah teks wrap. Di `text-3xl` pada layar <360px (beberapa HP lama/kecil), "NUSA Boarding School" (20 karakter) bisa overflow container `max-w-xl`.

**Rekomendasi:** Hapus `whitespace-nowrap` dan biarkan teks wrap natural, atau pastikan `<h1>` cukup kecil pada xs:

```tsx
// SESUDAH — hapus whitespace-nowrap, cukupkan dengan responsive sizing
<h1 className="leading-tight text-white font-extrabold text-3xl sm:text-4xl md:text-5xl [text-shadow:_0_4px_12px_rgba(0,0,0,0.45)]">
```

> **Catatan:** `text-3xl` (30px) untuk teks 20 karakter = ±600px lebar. Pada layar xs (320–375px) ini memang berisiko. Hapus `whitespace-nowrap` atau tambahkan `overflow-hidden` pada container sebagai safeguard.

---

## 6. Ringkasan Perubahan yang Perlu Dilakukan

| No | File | Komponen | Jenis Perubahan | Prioritas |
|---|---|---|---|---|
| 1 | `hero-section.tsx` | `COLORS` object | Refactor semua nama & nilai sesuai terminologi style.md | 🔴 Kritis |
| 2 | `hero-section.tsx` | Hero `background` | `#1F6F68` → `#2C8970` sebagai hero bg & gradient start | 🔴 Kritis |
| 3 | `hero-section.tsx` | Badge teks `color` | `COLORS.charcoal` → `COLORS.darkBase` | 🟠 Tinggi |
| 4 | `hero-section.tsx` | CTA button teks `color` | `COLORS.charcoal` → `COLORS.darkBase` | 🟠 Tinggi |
| 5 | `hero-section.tsx` | CTA button size | Kurangi padding, font size, icon size | 🟠 Tinggi |
| 6 | `hero-section.tsx` | Label CTA secondary | Persingkat dari 35 karakter → "Daftar Sekarang" | 🟠 Tinggi |
| 7 | `hero-section.tsx` | Medium glow blob | Eksplisit gunakan `COLORS.secondary` (bukan primary) | 🟠 Tinggi |
| 8 | `hero-section.tsx` | `opacity-85` | Ganti ke `opacity-[0.85]` (arbitrary value valid) | 🟡 Sedang |
| 9 | `hero-section.tsx` | `whitespace-nowrap` di `<h1>` | Hapus — risiko overflow di xs screen | 🟡 Sedang |
| 10 | `hero-section.tsx` | CTA button `boxShadow` | rgba Depth Tone → rgba Dark Base | 🟡 Sedang |
| 11 | `hero-section.tsx` | Image container `boxShadow` | rgba Depth Tone → rgba Primary | 🟡 Sedang |
| 12 | `hero-section.tsx` | Body text size | Cap `md:text-base` untuk jaga hierarki | 🟢 Minor |
| 13 | Keputusan editorial | Subheadline "Now Open" | Konfirmasi apakah pakai EN atau IN | 🟢 Minor |
| 14 | `color-migration-plan.md` | Fase 2 hero | Koreksi klaim "sudah sesuai" yang keliru | 🟡 Sedang |
| ~~—~~ | ~~`hero-section.tsx`~~ | ~~`<h1>` font class~~ | ~~Tambah font-work-sans~~ | ~~Tidak perlu~~ |
| ~~—~~ | ~~`promo-banner.tsx`~~ | ~~Gradient bg~~ | ~~Sesuaikan ke Primary~~ | ~~Tidak perlu~~ |

---

## 7. Diff Kode Final

### `hero-section.tsx` — COLORS object

```diff
 const COLORS = {
-  primary: "#42CDBA",
-  secondary: "#1F6F68",
+  darkBase: "#134146",
+  depthTone: "#1F6F68",
+  primary: "#2C8970",
+  secondary: "#42CDBA",
   accent: "#F3B233",
   white: "#F7F7F2",
   charcoal: "#2B2B2B",
   neonCyan: "#8EF3E7",
 }
```

### Hero `<section>` background

```diff
-  backgroundColor: COLORS.secondary,
-  backgroundImage: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.primary} 100%)`
+  backgroundColor: COLORS.primary,
+  backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`
```

### Medium glow blob (eksplisit ke secondary)

```diff
-  style={{ backgroundColor: COLORS.primary, opacity: 0.25, filter: "blur(30px)" }}
+  style={{ backgroundColor: COLORS.secondary, opacity: 0.25, filter: "blur(30px)" }}
```

### Badge teks

```diff
-  style={{ color: COLORS.charcoal }}
+  style={{ color: COLORS.darkBase }}
```

### CTA Button Primary

```diff
   style={{
     backgroundColor: COLORS.accent,
-    color: COLORS.charcoal,
-    boxShadow: `0 6px 18px rgba(31, 111, 104, 0.35)`
+    color: COLORS.darkBase,
+    boxShadow: `0 6px 18px rgba(19, 65, 70, 0.4)`
   }}
```

### Image container shadow

```diff
-  boxShadow: `0 20px 45px rgba(31, 111, 104, 0.4), 0 0 30px rgba(142, 243, 231, 0.15)`
+  boxShadow: `0 20px 45px rgba(44, 137, 112, 0.4), 0 0 30px rgba(142, 243, 231, 0.15)`
```

---

## 8. Yang Sudah Benar — Tidak Perlu Diubah ✅

- Grid overlay digital menggunakan `neonCyan` → ✅
- Decorative stars & diamond shapes menggunakan `accent (#F3B233)` → ✅
- Large glow blob (kanan) menggunakan `neonCyan` → ✅
- Seluruh warna di `promo-banner.tsx` → ✅
- Work Sans aktif secara global via `font-sans` → ✅
- Font weight override di `globals.css` → tidak masalah, sesuai style.md ✅
- Icon mask `charcoal` di CTA button → ✅ (icon, bukan teks)
- `accent` untuk badge urgency dot → ✅

---

## 9. Verification Plan

Setelah perubahan diterapkan:

1. **Jalankan** `npm run dev`, buka di browser desktop dan mobile.
2. **Cek hero background** — harus terasa lebih cerah dan hijau-teal (`#2C8970`), tidak gelap-biru seperti sebelumnya (`#1F6F68`).
3. **Cek promo banner** — harus tetap terbaca sebagai "panel gelap" terangkat dari hero. Jika kontras terlalu kuat, pertimbangkan menurunkan opacity border.
4. **Cek teks badge "Kuota"** — warna teks harus `#134146`, tidak terlihat berbeda jauh dari mata tapi technically benar.
5. **Cek CTA button** — teks harus `#134146`, icon mask tetap `#2B2B2B`.
6. **Cross-check tidak ada warna legacy** (`#E3B251`, `#B6CB6C`, `#0e3238`) di kedua file.
7. **Update `color-migration-plan.md`** — tandai Fase 2 hero sebagai selesai setelah perbaikan diimplementasikan.
