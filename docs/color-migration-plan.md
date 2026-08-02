# Color Migration Plan

Migrasi warna legacy ke palette resmi `style.md`, dilakukan bertahap per section.

## Palette Resmi (Referensi Cepat)

| Token | Hex | Peran |
|---|---|---|
| Dark Base | `#134146` | Footer bg, **teks utama** di surface terang |
| Depth Tone | `#1F6F68` | Panel gelap, overlay, shadow berwarna |
| Primary | `#2C8970` | Brand utama, hero bg, section bg berwarna |
| Secondary | `#42CDBA` | Tint terang, highlight cerah, border dekoratif |
| Neon Cyan | `#8EF3E7` | Glow, hover, elemen dekoratif tech |
| Surface | `#F0FAF7` | Section bg terang (alternatif dari putih polos) |
| White | `#F7F7F2` | Teks di atas bg gelap, card bg |
| Charcoal | `#2B2B2B` | **Hanya** icon fill/stroke, outline, shadow |
| Accent | `#F3B233` | CTA, badge, highlight urgency |

## Mapping Warna Legacy → Baru

| Lama | Baru | Catatan |
|---|---|---|
| `#E3B251` / `#e3b251` | `#F3B233` | Accent — hue shift minor |
| `#B6CB6C` | `#42CDBA` atau `#2C8970` | Olive green → teal. Pilih per konteks |
| `#0e3238` | `#134146` | Dark variant → Dark Base |
| `rgba(182,203,108,0.15)` | `rgba(66,205,186,0.10)` | B6CB6C card bg → Secondary tinted |
| `text-slate-800` | `text-[#134146]` | Gunakan Dark Base bukan Tailwind generic |
| `text-slate-800/70` | `text-[#134146]/70` | Opacity pattern untuk muted text |
| `text-gray-600/700/900` | `text-[#134146]` atau opacify | Konsistenkan ke palette |
| `bg-slate-50` | `bg-[#F0FAF7]` | Sesuaikan ke Surface |
| `#F7FCF9` (hardcoded) | `#F0FAF7` | Surface — section bg terang |
| `#F0F0F0` | `#F7F7F2` | White — teks pendukung |

## Tambahan Fix Non-Warna

| File | Issue | Fix |
|---|---|---|
| `app/layout.tsx` | Metadata "2025-2026" | Ganti ke "2027-2028" |
| `components/header.tsx` | Typo `fo  nt-semibold` | Fix jadi `font-semibold` |
| `components/curriculum-section.tsx` | Dead import `de` dari date-fns | Hapus import |
| `styles/globals.css` | File CSS duplikat tidak terpakai | Pertimbangkan hapus/arsip |
| `app/globals.css` | CSS tokens tidak sinkron dgn palette | Sinkronkan di fase terakhir |

---

## Rencana Migrasi Per Section

Urutan berdasarkan prioritas visual: mulai dari yang paling terlihat, turun ke detail.

### Fase 1: Header & Footer (Frame Halaman)

#### `components/header.tsx`
- [ ] Fix typo `fo  nt-semibold` → `font-semibold`
- [ ] `rgba(19,65,70,1)` → sudah `#134146` ✅ (tetap)
- [ ] `rgba(44,137,112,1)` → sudah `#2C8970` ✅ (tetap)

#### `components/footer.tsx`
- [ ] `#134146` bg → ✅ (sudah sesuai, Dark Base resmi)
- [ ] `#e3b251` → `#F3B233` (headline "Kontak", "Lokasi", tagline accent)
- [ ] `hover:text-[#e3b251]` di SocialIcon → `hover:text-[#F3B233]`
- [ ] `rgba(255,255,255,0.06)` social icon bg → tetap ✅

#### `app/layout.tsx`
- [ ] Metadata description "2025-2026" → "2027-2028"

### Fase 2: Hero Area (Sudah Sebagian Besar Selesai)

#### `components/hero-section.tsx`
- [x] Refactor nama & nilai `COLORS` object sesuai terminologi `style.md`
- [x] Background hero berubah ke `#2C8970` (Primary) (sebelumnya `#1F6F68`)
- [x] Perbaikan warna badge, text CTA, glow blob, dan ukuran CTA button

#### `components/promo-banner.tsx`
- [ ] `#134146` di gradient → ganti ke `#134146` ✅ (sudah Dark Base resmi)
- [ ] `#0e3238` di gradient → ganti ke `#134146`

### Fase 3: Section Konten Utama

#### `components/nusa-tagline.tsx`
- [ ] `#134146` teks → ✅ (Dark Base resmi)
- [ ] `#e3b251` accent → `#F3B233`

#### `components/why-choose-section.tsx`
- [ ] `#2C8970` bg → ✅
- [ ] `#F0F0F0` supporting text → `#F7F7F2`
- [ ] `bg-slate-50` class → hapus, ganti inline `#2C8970` (sudah ada ✅)

#### `components/curriculum-section.tsx`
- [ ] Hapus dead import `de` dari date-fns
- [ ] `rgba(182,203,108,0.15)` card bg → `rgba(66,205,186,0.10)` (Secondary tinted)
- [ ] `#134146` teks → ✅ (Dark Base resmi)
- [ ] `text-green-500` check icon → `text-[#2C8970]`
- [ ] `hover:bg-[#e3b251]` button → `hover:bg-[#F3B233]`

#### `components/program-100-days.tsx`
- [ ] `#134146` di gradient & icon → ✅ (Dark Base resmi)
- [ ] `#E3B251` icon bg & btn → `#F3B233`
- [ ] `hover:bg-[#B6CB6C]` button → `hover:bg-[#42CDBA]`
- [ ] `text-[#134146]` icon → ✅ (Dark Base resmi)

#### `components/program-section.tsx`
- [ ] `#F7FCF9` section bg → `#F0FAF7` (Surface)
- [ ] `#134146` teks → ✅ (Dark Base resmi)
- [ ] `#B6CB6C` bullet dots → `#42CDBA`
- [ ] `hover:bg-[#E3B251]` button → `hover:bg-[#F3B233]`

### Fase 4: Social Proof & Info

#### `components/teaching-team-section.tsx`
- [ ] `#2C8970` bg → ✅
- [ ] `#E3B251` photo ring & shadow → `#F3B233`
- [ ] `text-slate-800` → `text-[#134146]`
- [ ] `text-slate-800/70` → `text-[#134146]/70`

#### `components/gallery-section.tsx`
- [ ] `#F7FCF9` section bg → `#F0FAF7` (Surface)
- [ ] `#134146` teks → ✅ (Dark Base resmi)
- [ ] `rgba(227,178,81,...)` overlay gradient → `rgba(243,178,51,...)` (F3B233 rgba)

#### `components/testimonials-section.tsx`
- [ ] `#E3B251` stars & avatar bg → `#F3B233`
- [ ] `#B6CB6C` border & nav buttons → `#42CDBA`
- [ ] `#134146` teks → ✅ (Dark Base resmi)

#### `components/fee-info-section.tsx`
- [ ] `#E3B251` badge & highlight → `#F3B233`
- [ ] `#B6CB6C` check icons & card border → `#42CDBA`
- [ ] `#FFF5DA` highlight bg → `rgba(243,178,51,0.10)` (Accent tinted)
- [ ] `#FFF9ED` gradient bg → `rgba(243,178,51,0.05)`
- [ ] `#134146` teks → ✅ (Dark Base resmi)

#### `components/partner-section.tsx`
- [ ] `text-slate-800` heading → `text-[#134146]`

#### `components/registration-section.tsx`
- [ ] `#F7FCF9` section bg → `#F0FAF7` (Surface)
- [ ] `#e3b251` accent text & hover → `#F3B233`
- [ ] `#134146` hover text → ✅ (Dark Base resmi)
- [ ] `#B6CB6C33` border → `rgba(66,205,186,0.20)` (Secondary tinted)

### Fase 5: CSS Tokens & Cleanup

#### `app/globals.css`
- [ ] Sinkronkan CSS custom properties dengan palette resmi:
  - `--primary` → HSL equivalent of `#2C8970`
  - `--secondary` → `#42CDBA`
  - `--accent` → `#F3B233`
  - etc.
- [ ] Evaluasi apakah dark mode tokens masih relevan

#### `styles/globals.css`
- [ ] Konfirmasi file ini tidak dipakai (tidak di-import)
- [ ] Hapus atau arsipkan

---

## Catatan Penting

1. **Migrasi tidak mengubah layout atau struktur** — hanya warna dan atribut visual terkait.
2. **Setiap fase bisa di-commit terpisah** agar mudah di-review dan di-rollback.
3. **Setelah setiap fase, verifikasi visual** di browser untuk memastikan tidak ada regresi.
4. **Fase 5 (CSS tokens)** paling berdampak luas karena token digunakan oleh shadcn/ui components — lakukan terakhir dan hati-hati.
