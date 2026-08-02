# Perbaikan P1 + P2 — Daftar Edit per File

**Repo:** yasirabd/nusa-landing-page · **Tanggal:** 3 Agustus 2026
File utuh pengganti: `fixes/docs/style.md` → `docs/style.md`, `fixes/components/fee-info-section.tsx` → `components/fee-info-section.tsx`.
Sisanya edit find→replace presisi di bawah (setiap string lama muncul tepat 1×, kecuali ditandai).

---

## Prasyarat (T2 — ganti Romulo → DM Serif Display Italic)

Tidak perlu unduh font. Romulo (CDN Framer) diganti **DM Serif Display Italic** via `next/font/google`.

### app/layout.tsx

CARI:
```tsx
import { Righteous } from "next/font/google"
```
GANTI:
```tsx
import { DM_Serif_Display, Righteous } from "next/font/google"
```

CARI:
```tsx
const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
})
```
GANTI:
```tsx
const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
})

const serifAccent = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-accent",
})
```

CARI:
```tsx
className={`${GeistSans.variable} ${righteous.variable} font-sans`}
```
GANTI:
```tsx
className={`${GeistSans.variable} ${righteous.variable} ${serifAccent.variable} font-sans`}
```

---

## lib/site-config.ts — C1 tagline kanonik

CARI:
```ts
  description:
    "Boarding school islami tingkat SMA di Kota Semarang dengan jurusan Programmer dan Designer. SPMB NUSA Boarding School 2027/2028 sudah dibuka.",
```
GANTI (tambah 1 baris):
```ts
  description:
    "Boarding school islami tingkat SMA di Kota Semarang dengan jurusan Programmer dan Designer. SPMB NUSA Boarding School 2027/2028 sudah dibuka.",
  tagline: "Muslim Tangguh, Jago IT",
```

---

## app/globals.css — W1 token hover, T2 font aksen

1. CARI `  --color-brand-paper: #f7f7f2;` → GANTI:
```css
  --color-brand-paper: #f7f7f2;
  --color-brand-accent-hover: #f6be4d;
  --color-brand-depth-hover: #24745f;
```

2. CARI `  --font-serif: "Romulo", serif;` → GANTI:
```css
  --font-serif: var(--font-serif-accent), Georgia, serif;
```

3. HAPUS seluruh blok berikut:
```css
@font-face {
  font-family: "Romulo";
  src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
```

4. CARI `    background-color: #f6be4d;` → GANTI:
```css
    background-color: var(--color-brand-accent-hover);
```

5. CARI `    background-color: #24745f;` → GANTI:
```css
    background-color: var(--color-brand-depth-hover);
```

---

## components/hero-section.tsx — C4 istilah SPI

CARI:
```tsx
              Potongan SPI <span className="font-semibold text-brand-accent">Rp10 juta</span> untuk 10
              pendaftar pertama
```
GANTI:
```tsx
              Potongan Biaya Masuk (SPI){" "}
              <span className="font-semibold text-brand-accent">Rp10 juta</span> untuk 10
              pendaftar pertama
```

---

## components/nusa-tagline.tsx — W3 hapus putih polos

CARI `<section className="section-spacing-standard bg-white">`
GANTI `<section className="section-spacing-standard bg-brand-paper">`

---

## components/why-choose-section.tsx — T3 preset standard

CARI:
```tsx
className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-dark sm:text-4xl md:text-5xl"
```
GANTI:
```tsx
className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-dark sm:text-4xl"
```

---

## components/curriculum-section.tsx — W1 gray → palet

CARI `rounded-2xl bg-gray-100 shadow-inner`
GANTI `rounded-2xl bg-brand-dark/5 shadow-inner`

---

## components/program-section.tsx — W3, W1, L3

1. Background section (W3, ritme surface→paper):
CARI `<section id="program" className="section-spacing-standard scroll-mt-20 bg-brand-surface">`
GANTI `<section id="program" className="section-spacing-standard scroll-mt-20 bg-brand-paper">`

2. Ring node timeline menyesuaikan background baru:
CARI `ring-4 ring-brand-surface`
GANTI `ring-4 ring-brand-paper`

3. Border pemisah sub-bento (W1):
CARI `border-t border-gray-100 pt-6`
GANTI `border-t border-brand-dark/10 pt-6`

4. Hover kartu Designer (W1):
CARI `hover:bg-yellow-50/50`
GANTI `hover:bg-brand-accent/5`

5. CTA primer → accent (L3):
CARI:
```tsx
className="group/btn inline-flex items-center gap-2 rounded-full bg-brand-depth px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/20 transition-[background-color,color,box-shadow,transform] duration-150 hover:bg-brand-accent hover:text-brand-dark hover:shadow-xl hover:shadow-accent/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-10 sm:py-4 sm:text-lg"
```
GANTI:
```tsx
className="group/btn inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-base font-bold text-brand-dark shadow-lg shadow-accent/20 transition-[background-color,box-shadow,transform] duration-150 hover:bg-brand-accent/90 hover:shadow-xl hover:shadow-accent/25 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-10 sm:py-4 sm:text-lg"
```

---

## components/registration-section.tsx — C1 koma, L3 CTA accent

1. CARI `Muslim Tangguh Jago IT` → GANTI `Muslim Tangguh, Jago IT`

2. CARI:
```tsx
className="h-auto w-full rounded-full bg-brand-depth px-10 py-7 text-lg font-semibold text-brand-paper shadow-[0_8px_20px_rgba(44,137,112,0.30)] transition-[background-color,color,box-shadow,transform] duration-150 hover:bg-brand-accent hover:text-brand-dark hover:shadow-[0_12px_24px_rgba(243,178,51,0.28)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto md:py-8"
```
GANTI:
```tsx
className="h-auto w-full rounded-full bg-brand-accent px-10 py-7 text-lg font-semibold text-brand-dark shadow-[0_8px_20px_rgba(243,178,51,0.30)] transition-[background-color,box-shadow,transform] duration-150 hover:bg-brand-accent/90 hover:shadow-[0_12px_24px_rgba(243,178,51,0.28)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto md:py-8"
```

---

## components/footer.tsx — C1 koma, W2 kontras copyright

1. CARI `Muslim Tangguh Jago IT` → GANTI `Muslim Tangguh, Jago IT`
2. CARI `text-white/50` → GANTI `text-white/60`

---

## components/partner-section.tsx — W1 border, T3 preset display

1. CARI `border border-gray-100` → GANTI `border border-brand-dark/10`
2. CARI:
```tsx
className="mb-3 text-4xl font-bold tracking-tight text-brand-dark md:text-5xl"
```
GANTI:
```tsx
className="mb-3 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl"
```

---

## components/gallery-section.tsx — T3 preset standard

CARI:
```tsx
className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
```
GANTI:
```tsx
className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
```

---

## components/testimonials-section.tsx — T3 preset standard

CARI:
```tsx
className="text-3xl font-bold tracking-tight text-brand-paper md:text-4xl lg:text-5xl"
```
GANTI:
```tsx
className="text-3xl font-bold tracking-tight text-brand-paper sm:text-4xl"
```

---

## components/faq-section.tsx — T3 bobot heading

CARI:
```tsx
className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight text-brand-dark sm:text-4xl"
```
GANTI:
```tsx
className="mt-3 max-w-md text-3xl font-bold leading-tight tracking-tight text-brand-dark sm:text-4xl"
```

---

## Ringkasan pemetaan audit → edit

| Temuan | File |
| --- | --- |
| T1 style guide → Geist | fixes/docs/style.md (utuh) |
| T2 font aksen → DM Serif Display Italic | app/layout.tsx, globals.css |
| T3 preset heading | why-choose, gallery, testimonials, faq, partner |
| C1 tagline kanonik | site-config, registration, footer |
| C4 istilah & format biaya | hero, fixes/components/fee-info-section.tsx |
| C6 emoji 🔥 → ikon Flame | fixes/components/fee-info-section.tsx |
| W1 warna non-palet | fee-info, program, curriculum, partner, globals.css |
| W2/A1 kontras check & copyright | fee-info, footer |
| W3 ritme background | nusa-tagline, program |
| L3 CTA primer selalu accent | program, registration |

## Backlog P3 (menunggu materi)
- C2 strategi bilingual section tagline
- C3 kurasi testimoni & disclaimer klaim finansial
- C5 kurasi daftar Kurikulum Tangguh (6 butir)
- U2 section "Karya Santri" (butuh 3–4 project nyata)
- U3 foto testimoni figur publik
- L4 partner logo tampil penuh di touch device
