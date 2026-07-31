# Landing Image Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve optimized WebP derivatives for the landing-page hero and all 12 gallery images while preserving the source files and current editorial composition.

**Architecture:** A reproducible PowerShell script generates bounded WebP derivatives with FFmpeg. A focused gallery metadata module records optimized paths and intrinsic dimensions, while `GallerySection` and `HeroSection` use Next.js `Image` with explicit responsive sizing. Vitest enforces asset existence, file-size budgets, rendering metadata, and motion constraints.

**Tech Stack:** Next.js 16, React 18, TypeScript, Next.js `Image`, Tailwind CSS 4, Vitest, Testing Library, PowerShell, FFmpeg/libwebp.

---

## File Map

- Create `scripts/generate-landing-images.ps1`: reproducibly generates visitor-facing WebP derivatives from preserved source images.
- Create `components/gallery-content.ts`: owns typed gallery copy, optimized sources, and intrinsic dimensions.
- Modify `components/gallery-section.tsx`: renders metadata with Next.js `Image` and restrained gallery interaction styling.
- Modify `components/hero-section.tsx`: switches the priority hero image to its optimized derivative and accurate `sizes` value.
- Modify `app/globals.css`: gates the subtle gallery image transform to hover-capable fine pointers and removes it for reduced motion.
- Create `tests/landing-image-assets.test.ts`: enforces file existence and delivery-size budgets.
- Create `tests/gallery-images.test.tsx`: verifies gallery metadata, Next.js image rendering, responsive sizing, captions, and source-level motion constraints.
- Create `tests/hero-image.test.tsx`: verifies optimized hero delivery and priority-loading intent.
- Generate `public/images/nusa-hero-image.webp` and `public/images/gallery-*.webp`: optimized visitor-facing assets.

### Task 1: Generate and budget optimized image assets

**Files:**
- Create: `tests/landing-image-assets.test.ts`
- Create: `scripts/generate-landing-images.ps1`
- Create: `public/images/nusa-hero-image.webp`
- Create: `public/images/gallery-1-mpls.webp`
- Create: `public/images/gallery-2-bersukaria-mataram.webp`
- Create: `public/images/gallery-3-itcamp.webp`
- Create: `public/images/gallery-4-itcamp.webp`
- Create: `public/images/gallery-5-nusa-mengajar.webp`
- Create: `public/images/gallery-6-bersukaria-jajan.webp`
- Create: `public/images/gallery-7-googleio.webp`
- Create: `public/images/gallery-8-talk-with-stranger.webp`
- Create: `public/images/gallery-9-takziyah.webp`
- Create: `public/images/gallery-10-jualan.webp`
- Create: `public/images/gallery-11-jualan-cfd.webp`
- Create: `public/images/gallery-12-camp.webp`

- [ ] **Step 1: Write the failing asset-budget test**

Create `tests/landing-image-assets.test.ts`:

```ts
import { existsSync, statSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

const imageDirectory = path.resolve("public/images")
const maxDeliveredBytes = 500 * 1024
const maxGalleryBytes = 3 * 1024 * 1024

const galleryAssets = [
  "gallery-1-mpls.webp",
  "gallery-2-bersukaria-mataram.webp",
  "gallery-3-itcamp.webp",
  "gallery-4-itcamp.webp",
  "gallery-5-nusa-mengajar.webp",
  "gallery-6-bersukaria-jajan.webp",
  "gallery-7-googleio.webp",
  "gallery-8-talk-with-stranger.webp",
  "gallery-9-takziyah.webp",
  "gallery-10-jualan.webp",
  "gallery-11-jualan-cfd.webp",
  "gallery-12-camp.webp",
] as const

const sourceAssets = [
  "nusa-hero-image.png",
  "gallery-1-mpls.jpg",
  "gallery-2-bersukaria-mataram.jpg",
  "gallery-3-itcamp.jpg",
  "gallery-4-itcamp.jpg",
  "gallery-5-nusa-mengajar.jpg",
  "gallery-6-bersukaria-jajan.jpg",
  "gallery-7-googleio.png",
  "gallery-8-talk-with-stranger.jpg",
  "gallery-9-takziyah.jpg",
  "gallery-10-jualan.jpg",
  "gallery-11-jualan-cfd.jpeg",
  "gallery-12-camp.jpg",
] as const

function assetPath(filename: string) {
  return path.join(imageDirectory, filename)
}

describe("optimized landing images", () => {
  it("keeps every original source image available", () => {
    for (const filename of sourceAssets) {
      expect(existsSync(assetPath(filename)), filename).toBe(true)
    }
  })

  it("keeps the optimized hero below 500 KB", () => {
    const heroPath = assetPath("nusa-hero-image.webp")

    expect(existsSync(heroPath)).toBe(true)
    expect(statSync(heroPath).size).toBeLessThanOrEqual(maxDeliveredBytes)
  })

  it("keeps every optimized gallery image below 500 KB", () => {
    for (const filename of galleryAssets) {
      const filenamePath = assetPath(filename)
      expect(existsSync(filenamePath), filename).toBe(true)
      expect(statSync(filenamePath).size, filename).toBeLessThanOrEqual(maxDeliveredBytes)
    }
  })

  it("keeps the combined optimized gallery below 3 MB", () => {
    const totalBytes = galleryAssets.reduce(
      (total, filename) => total + statSync(assetPath(filename)).size,
      0,
    )

    expect(totalBytes).toBeLessThan(maxGalleryBytes)
  })
})
```

- [ ] **Step 2: Run the asset test and verify it fails**

Run:

```powershell
npm test -- tests/landing-image-assets.test.ts
```

Expected: FAIL because `public/images/nusa-hero-image.webp` and the gallery WebP derivatives do not exist.

- [ ] **Step 3: Add the reproducible FFmpeg conversion script**

Create `scripts/generate-landing-images.ps1`:

```powershell
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imageDirectory = Join-Path $projectRoot "public\images"
$ffmpeg = Get-Command ffmpeg -ErrorAction Stop

$assets = @(
  @{ Source = "nusa-hero-image.png"; Output = "nusa-hero-image.webp"; Bound = 1200 },
  @{ Source = "gallery-1-mpls.jpg"; Output = "gallery-1-mpls.webp"; Bound = 1280 },
  @{ Source = "gallery-2-bersukaria-mataram.jpg"; Output = "gallery-2-bersukaria-mataram.webp"; Bound = 1280 },
  @{ Source = "gallery-3-itcamp.jpg"; Output = "gallery-3-itcamp.webp"; Bound = 1280 },
  @{ Source = "gallery-4-itcamp.jpg"; Output = "gallery-4-itcamp.webp"; Bound = 1280 },
  @{ Source = "gallery-5-nusa-mengajar.jpg"; Output = "gallery-5-nusa-mengajar.webp"; Bound = 1280 },
  @{ Source = "gallery-6-bersukaria-jajan.jpg"; Output = "gallery-6-bersukaria-jajan.webp"; Bound = 1280 },
  @{ Source = "gallery-7-googleio.png"; Output = "gallery-7-googleio.webp"; Bound = 1280 },
  @{ Source = "gallery-8-talk-with-stranger.jpg"; Output = "gallery-8-talk-with-stranger.webp"; Bound = 1280 },
  @{ Source = "gallery-9-takziyah.jpg"; Output = "gallery-9-takziyah.webp"; Bound = 1280 },
  @{ Source = "gallery-10-jualan.jpg"; Output = "gallery-10-jualan.webp"; Bound = 1280 },
  @{ Source = "gallery-11-jualan-cfd.jpeg"; Output = "gallery-11-jualan-cfd.webp"; Bound = 1280 },
  @{ Source = "gallery-12-camp.jpg"; Output = "gallery-12-camp.webp"; Bound = 1280 }
)

foreach ($asset in $assets) {
  $sourcePath = Join-Path $imageDirectory $asset.Source
  $outputPath = Join-Path $imageDirectory $asset.Output
  $scale = "scale=$($asset.Bound):$($asset.Bound):force_original_aspect_ratio=decrease:force_divisible_by=2"

  & $ffmpeg.Source `
    -hide_banner `
    -loglevel error `
    -y `
    -i $sourcePath `
    -vf $scale `
    -frames:v 1 `
    -c:v libwebp `
    -preset photo `
    -quality 76 `
    $outputPath

  if ($LASTEXITCODE -ne 0) {
    throw "Failed to generate $($asset.Output)"
  }
}
```

- [ ] **Step 4: Generate the derivatives**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\generate-landing-images.ps1
```

Expected: exit code 0 and 13 new `.webp` files in `public/images`.

- [ ] **Step 5: Run the asset-budget test**

Run:

```powershell
npm test -- tests/landing-image-assets.test.ts
```

Expected: 4 tests PASS. If any derivative exceeds the budget, lower the script's `quality` value in increments of 4, regenerate all derivatives, and rerun until the fixed budget passes without changing dimensions.

- [ ] **Step 6: Record generated dimensions**

Run:

```powershell
$files = Get-ChildItem -LiteralPath public\images -Filter *.webp | Where-Object { $_.Name -eq 'nusa-hero-image.webp' -or $_.Name -like 'gallery-*' }; foreach ($file in $files) { $dimensions = & ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 $file.FullName; Write-Output "$($file.Name) $dimensions $($file.Length)" }
```

Expected dimensions:

```text
nusa-hero-image.webp 1200x794
gallery-1-mpls.webp 1280x720
gallery-2-bersukaria-mataram.webp 1280x960
gallery-3-itcamp.webp 1280x720
gallery-4-itcamp.webp 1280x720
gallery-5-nusa-mengajar.webp 1280x720
gallery-6-bersukaria-jajan.webp 1280x720
gallery-7-googleio.webp 1280x848
gallery-8-talk-with-stranger.webp 1280x960
gallery-9-takziyah.webp 1280x720
gallery-10-jualan.webp 1280x960
gallery-11-jualan-cfd.webp 960x1280
gallery-12-camp.webp 1280x960
```

- [ ] **Step 7: Commit the generated asset set**

```powershell
git add scripts/generate-landing-images.ps1 tests/landing-image-assets.test.ts public/images/*.webp
git commit -m "perf: generate optimized landing images"
```

### Task 2: Render the gallery from typed optimized metadata

**Files:**
- Create: `components/gallery-content.ts`
- Create: `tests/gallery-images.test.tsx`
- Modify: `components/gallery-section.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing gallery image tests**

Create `tests/gallery-images.test.tsx`:

```tsx
import { readFileSync } from "node:fs"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { GALLERY_ITEMS, GALLERY_IMAGE_SIZES } from "@/components/gallery-content"
import { GallerySection } from "@/components/gallery-section"

describe("optimized gallery rendering", () => {
  it("defines 12 optimized gallery entries with intrinsic dimensions", () => {
    expect(GALLERY_ITEMS).toHaveLength(12)

    for (const item of GALLERY_ITEMS) {
      expect(item.image).toMatch(/^\/images\/gallery-.+\.webp$/)
      expect(item.width).toBeGreaterThan(0)
      expect(item.height).toBeGreaterThan(0)
      expect(item.name.length).toBeGreaterThan(0)
      expect(item.description.length).toBeGreaterThan(0)
    }
  })

  it("renders descriptive responsive images and visible captions", () => {
    render(<GallerySection />)

    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(12)

    for (const item of GALLERY_ITEMS) {
      const image = screen.getByRole("img", { name: item.name })
      expect(image).toHaveAttribute("src", expect.stringContaining(item.image))
      expect(image).toHaveAttribute("width", String(item.width))
      expect(image).toHaveAttribute("height", String(item.height))
      expect(image).toHaveAttribute("sizes", GALLERY_IMAGE_SIZES)
      expect(screen.getByText(item.description)).toBeVisible()
    }
  })

  it("uses Next Image and restrained motion classes", () => {
    const source = readFileSync("components/gallery-section.tsx", "utf8")

    expect(source).toContain('import Image from "next/image"')
    expect(source).not.toContain("<img")
    expect(source).not.toContain("transition-all")
    expect(source).not.toContain("duration-500")
    expect(source).not.toContain("duration-700")
    expect(source).toContain("gallery-card")
    expect(source).toContain("gallery-image")
  })
})
```

- [ ] **Step 2: Run the gallery tests and verify they fail**

Run:

```powershell
npm test -- tests/gallery-images.test.tsx
```

Expected: FAIL because `components/gallery-content.ts` does not exist and the gallery still uses raw `<img>` markup.

- [ ] **Step 3: Add typed gallery metadata**

Create `components/gallery-content.ts`:

```ts
export const GALLERY_IMAGE_SIZES =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 3rem), 584px"

export interface GalleryItem {
  name: string
  description: string
  image: string
  width: number
  height: number
  objectPosition?: string
}

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    name: "MPLS",
    description: "Masa Pengenalan Lingkungan Sekolah untuk Santri Baru.",
    image: "/images/gallery-1-mpls.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Bersukaria: City Tour Mataram",
    description: "Kegiatan keliling kota sambil belajar sejarah Mataram di Kota Semarang",
    image: "/images/gallery-2-bersukaria-mataram.webp",
    width: 1280,
    height: 960,
  },
  {
    name: "IT Camp",
    description: "Mengajar materi IT seperti Design, Game Development, dan Programming untuk anak-anak.",
    image: "/images/gallery-3-itcamp.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "IT Camp: Outbond",
    description: "Melatih kerjasama tim dan kepemimpinan.",
    image: "/images/gallery-4-itcamp.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "NUSA Mengajar",
    description: "Mengajar materi IT ke sekolah lain atau masyarakat.",
    image: "/images/gallery-5-nusa-mengajar.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Bersukaria: City Tour Legend Culinary (English)",
    description: "Belajar sejarah kuliner legendaris di Semarang dalam bahasa Inggris.",
    image: "/images/gallery-6-bersukaria-jajan.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Google I/O Extended Semarang",
    description: "Belajar teknologi terbaru dari Google I/O Extended Semarang.",
    image: "/images/gallery-7-googleio.webp",
    width: 1280,
    height: 848,
  },
  {
    name: "Talking to Stranger",
    description: "Ngobrol dengan orang seluruh dunia dengan Bahasa Inggris.",
    image: "/images/gallery-8-talk-with-stranger.webp",
    width: 1280,
    height: 960,
  },
  {
    name: "Takziah Tetangga",
    description: "Takziah ke tetangga yang berduka.",
    image: "/images/gallery-9-takziyah.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Jualan di Market Day",
    description: "Berani jualan menawarkan jasa buat website.",
    image: "/images/gallery-10-jualan.webp",
    width: 1280,
    height: 960,
  },
  {
    name: "Jualan di Car Free Day",
    description: "Berani jualan di Car Free Day.",
    image: "/images/gallery-11-jualan-cfd.webp",
    width: 960,
    height: 1280,
  },
  {
    name: "Leadership Camp",
    description: "Kegiatan untuk mengembangkan karakter dan leadership.",
    image: "/images/gallery-12-camp.webp",
    width: 1280,
    height: 960,
  },
]
```

- [ ] **Step 4: Migrate the gallery to Next.js Image and restrained motion**

Replace `components/gallery-section.tsx` with:

```tsx
import Image from "next/image"
import { GALLERY_IMAGE_SIZES, GALLERY_ITEMS } from "@/components/gallery-content"

const COLORS = {
  darkBase: "#134146",
  surface: "#F0FAF7",
}

export function GallerySection() {
  return (
    <section
      id="kehidupan-santri"
      className="scroll-mt-20 py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: COLORS.surface }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
          <h2
            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: COLORS.darkBase }}
          >
            Galeri Kegiatan
          </h2>
          <p
            className="mx-auto max-w-2xl text-base font-medium leading-relaxed opacity-80 sm:text-lg"
            style={{ color: COLORS.darkBase }}
          >
            Momen-momen berharga kegiatan{" "}
            <span className="font-righteous font-normal tracking-wide">NUSA</span> Boarding School
          </p>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {GALLERY_ITEMS.map((item) => (
            <article
              key={item.image}
              className="gallery-card group relative overflow-hidden rounded-3xl border border-transparent bg-black shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:border-[#42CDBA]/50 hover:shadow-xl"
              aria-label={item.name}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  sizes={GALLERY_IMAGE_SIZES}
                  className="gallery-image h-full w-full object-cover transition-transform duration-[180ms]"
                  style={{ objectPosition: item.objectPosition }}
                />

                <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,rgba(19,65,70,0.95),rgba(19,65,70,0.6)_40%,rgba(0,0,0,0)_80%)] p-6 text-left md:p-8">
                  <div className="w-full">
                    <h3 className="mb-2 text-lg font-semibold text-white drop-shadow-sm md:text-xl">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-white/90 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Gate the decorative image scale by input capability and motion preference**

Append to `app/globals.css`:

```css
@media (hover: hover) and (pointer: fine) {
  .gallery-card:hover .gallery-image {
    transform: scale(1.025);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-image {
    transition: none;
    transform: none !important;
  }
}
```

- [ ] **Step 6: Run the focused gallery tests**

Run:

```powershell
npm test -- tests/gallery-images.test.tsx tests/section-anchors.test.tsx
```

Expected: gallery image tests and the existing section anchor tests PASS.

- [ ] **Step 7: Commit the gallery migration**

```powershell
git add components/gallery-content.ts components/gallery-section.tsx app/globals.css tests/gallery-images.test.tsx
git commit -m "perf: serve optimized gallery images"
```

### Task 3: Switch the hero to its optimized derivative

**Files:**
- Create: `tests/hero-image.test.tsx`
- Modify: `components/hero-section.tsx`

- [ ] **Step 1: Write the failing hero image test**

Create `tests/hero-image.test.tsx`:

```tsx
import { readFileSync } from "node:fs"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HeroSection } from "@/components/hero-section"

describe("optimized hero image", () => {
  it("serves the WebP hero with responsive dimensions", () => {
    render(<HeroSection />)

    const image = screen.getByRole("img", { name: "Santri NUSA Boarding School" })
    expect(image).toHaveAttribute("src", expect.stringContaining("/images/nusa-hero-image.webp"))
    expect(image).toHaveAttribute("width", "1200")
    expect(image).toHaveAttribute("height", "794")
    expect(image).toHaveAttribute("sizes", "(max-width: 1023px) calc(100vw - 2rem), 50vw")
  })

  it("keeps priority loading intent for the LCP image", () => {
    const source = readFileSync("components/hero-section.tsx", "utf8")

    expect(source).toContain("priority")
    expect(source).not.toContain('src="/images/nusa-hero-image.png"')
  })
})
```

- [ ] **Step 2: Run the hero test and verify it fails**

Run:

```powershell
npm test -- tests/hero-image.test.tsx
```

Expected: FAIL because the component still references the PNG with `600x400` dimensions and the old `sizes` value.

- [ ] **Step 3: Update the hero Image props**

In `components/hero-section.tsx`, replace only the hero `Image` props:

```tsx
<Image
  src="/images/nusa-hero-image.webp"
  alt="Santri NUSA Boarding School"
  width={1200}
  height={794}
  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
  priority
  sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
/>
```

Do not rewrite hero copy, CTA structure, badges, or surrounding motion in this feature. Those belong to the next hero-specific audit checkpoint.

- [ ] **Step 4: Run the focused hero and asset tests**

Run:

```powershell
npm test -- tests/hero-image.test.tsx tests/landing-image-assets.test.ts
```

Expected: 6 tests PASS.

- [ ] **Step 5: Commit the hero asset migration**

```powershell
git add components/hero-section.tsx tests/hero-image.test.tsx
git commit -m "perf: serve optimized hero image"
```

### Task 4: Verify the feature and stop for review

**Files:**
- Modify only files already listed if verification exposes a defect.

- [ ] **Step 1: Run the full automated suite**

Run:

```powershell
npm test
```

Expected: all existing and new tests PASS with zero failures.

- [ ] **Step 2: Run TypeScript validation**

Run:

```powershell
npx tsc --noEmit
```

Expected: only the previously approved baseline errors in `app/admin/page.tsx`, `components/footer.tsx`, and `components/testimonials-section.tsx`. No new error may reference gallery content, gallery rendering, image tests, or the hero.

- [ ] **Step 3: Run the production build**

Run:

```powershell
npm run build
```

Expected: Next.js production build exits successfully and writes a fresh `.next/BUILD_ID`.

- [ ] **Step 4: Verify budgets and generated dimensions**

Run:

```powershell
npm test -- tests/landing-image-assets.test.ts
```

Expected: hero and gallery files exist, every delivered image is at most 500 KB, and the gallery set is below 3 MB.

- [ ] **Step 5: Check whitespace and repository scope**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors. Only this feature's planned files are changed or committed; `docs/2026-07-30-ui-ux-audit.md` remains untouched and untracked.

- [ ] **Step 6: Perform the text-only review checklist**

Report:

```text
- Original and optimized byte totals.
- Per-file optimized dimensions and sizes.
- Hero and gallery source paths used by the components.
- Next Image responsive sizes values.
- Touch caption and reduced-motion behavior.
```

If visual inspection is available locally, check representative landscape, portrait, and 4:3 images for subject cropping without creating or sending screenshots.

- [ ] **Step 7: Stop for user review**

Do not begin the hero hierarchy rewrite. Report fresh test/build evidence and the exact image-performance improvements for the user to review.
