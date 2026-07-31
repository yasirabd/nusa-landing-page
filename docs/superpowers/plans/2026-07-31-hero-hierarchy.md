# Hero Hierarchy Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the competing hero widgets with a clear SPMB 2027/2028 message, approved NUSA positioning, semantic CTAs, factual trust signals, and restrained motion while preserving the optimized LCP image.

**Architecture:** `HeroSection` becomes a focused server component that owns the complete approved hierarchy and responsive image. A small set of hero-specific CSS classes in `app/globals.css` handles pointer-gated press and hover feedback plus reduced-motion behavior. The obsolete client-side promo countdown component is removed after tests prove it has no remaining role.

**Tech Stack:** Next.js 16, React 18, TypeScript, Next.js `Image` and `Link`, Tailwind CSS 4, Vitest, Testing Library.

---

## File Map

- Create `tests/hero-hierarchy.test.tsx`: verifies approved copy, content order, CTA semantics, removed widgets, restrained motion hooks, and obsolete-file removal.
- Modify `components/hero-section.tsx`: implements the approved hierarchy, semantic links, trust row, restrained visual frame, and preserved responsive image delivery.
- Modify `app/globals.css`: adds explicit hero action feedback gated by input capability and motion preference.
- Delete `components/promo-banner.tsx`: removes the expired countdown and unused full-width banner.
- Preserve `tests/hero-image.test.tsx`: continues enforcing responsive WebP delivery and LCP loading behavior.

### Task 1: Replace the hero content hierarchy and CTA semantics

**Files:**
- Create: `tests/hero-hierarchy.test.tsx`
- Modify: `components/hero-section.tsx`
- Modify: `tests/hero-image.test.tsx`
- Delete: `components/promo-banner.tsx`

- [ ] **Step 1: Write the failing content and semantics test**

Create `tests/hero-hierarchy.test.tsx`:

```tsx
import { existsSync, readFileSync } from "node:fs"
import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HeroSection } from "@/components/hero-section"

describe("hero hierarchy", () => {
  it("presents the approved positioning, promotion, and factual trust signals", () => {
    render(<HeroSection />)

    expect(screen.getByText("SPMB 2027/2028 Sudah Dibuka")).toBeVisible()
    expect(screen.getByText("Potongan SPI Rp10 juta untuk 10 pendaftar pertama")).toBeVisible()
    expect(screen.getByText("Boarding School Islami di Kota Semarang")).toBeVisible()
    expect(
      screen.getByRole("heading", { level: 1, name: "Menjadi Muslim Tangguh, Jago IT" }),
    ).toBeVisible()
    expect(
      screen.getByText(
        "Santri menempuh pendidikan kesetaraan SMA sambil memperkuat agama, karakter, dan keterampilan teknologi melalui jalur Programmer atau Designer.",
      ),
    ).toBeVisible()

    for (const fact of [
      "Kesetaraan SMA",
      "Programmer & Designer",
      "Kota Semarang",
    ]) {
      expect(screen.getByText(fact)).toBeVisible()
    }
  })

  it("uses semantic links for registration and WhatsApp without nested buttons", () => {
    render(<HeroSection />)

    const registration = screen.getByRole("link", { name: "Daftar SPMB 2027/2028" })
    expect(registration).toHaveAttribute("href", "/daftar")
    expect(within(registration).queryByRole("button")).not.toBeInTheDocument()

    const consultation = screen.getByRole("link", { name: "Konsultasi via WhatsApp" })
    expect(consultation).toHaveAttribute("href", "https://wa.me/6281392706707")
    expect(consultation).toHaveAttribute("target", "_blank")
    expect(consultation).toHaveAttribute("rel", "noopener noreferrer")
    expect(within(consultation).queryByRole("button")).not.toBeInTheDocument()
  })

  it("removes the expired promotional widgets and obsolete component", () => {
    render(<HeroSection />)

    expect(screen.queryByText(/Kuota Terbatas/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/IT Expert/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/100% Praktik/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Hari|Jam|Mnt|Dtk/)).not.toBeInTheDocument()

    const source = readFileSync("components/hero-section.tsx", "utf8")
    expect(source).not.toContain("PromoBanner")
    expect(source).not.toContain("whitespace-nowrap")
    expect(source).not.toContain("animate-pulse")
    expect(existsSync("components/promo-banner.tsx")).toBe(false)
  })
})
```

- [ ] **Step 2: Run the new test and verify it fails**

Run:

```powershell
npm test -- tests/hero-hierarchy.test.tsx
```

Expected: FAIL because the current hero still renders the old school-name headline, countdown banner, badges, nested buttons, and obsolete promo component.

- [ ] **Step 3: Replace the hero with the approved hierarchy**

Replace `components/hero-section.tsx` with:

```tsx
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const HERO_FACTS = [
  "Kesetaraan SMA",
  "Programmer & Designer",
  "Kota Semarang",
] as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#134146_0%,#1F6F68_52%,#2C8970_100%)] py-12 text-[#F7F7F2] md:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(#8EF3E7 1px, transparent 1px), linear-gradient(90deg, #8EF3E7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 size-80 rounded-full bg-[#42CDBA]/15 blur-3xl lg:size-[28rem]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#F3B233]/35 bg-[#F3B233]/10 px-4 py-2 text-sm leading-snug">
            <span className="font-semibold text-[#F3B233]">SPMB 2027/2028 Sudah Dibuka</span>
            <span aria-hidden="true" className="hidden text-white/35 sm:inline">•</span>
            <span className="text-white/85">Potongan SPI Rp10 juta untuk 10 pendaftar pertama</span>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#8EF3E7] sm:text-base">
            Boarding School Islami di Kota Semarang
          </p>

          <h1 className="max-w-[13ch] text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Menjadi Muslim Tangguh, <span className="text-[#F3B233]">Jago IT</span>
          </h1>

          <p className="mt-6 max-w-[62ch] text-base font-medium leading-7 text-white/80 sm:text-lg sm:leading-8">
            Santri menempuh pendidikan kesetaraan SMA sambil memperkuat agama, karakter,
            dan keterampilan teknologi melalui jalur Programmer atau Designer.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/daftar"
              className="hero-action hero-action-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F3B233] px-6 text-sm font-semibold text-[#134146] shadow-[0_10px_28px_rgba(19,65,70,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134146] sm:text-base"
            >
              Daftar SPMB 2027/2028
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>

            <Link
              href="https://wa.me/6281392706707"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-action hero-action-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134146] sm:text-base"
            >
              <span
                aria-hidden="true"
                className="size-5 bg-current"
                style={{
                  maskImage: "url(/icons/whatsapp.svg)",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
              Konsultasi via WhatsApp
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-sm font-medium text-white/75 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
            {HERO_FACTS.map((fact) => (
              <li key={fact} className="flex items-start gap-2.5">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#8EF3E7]" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pl-4">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-2 shadow-[0_28px_70px_rgba(7,42,45,0.4)]">
            <div className="overflow-hidden rounded-[1.5rem]">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/nusa-hero-image-640.webp 640w, /images/nusa-hero-image.webp 1200w"
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 47vw"
                />
                <Image
                  src="/images/nusa-hero-image.webp"
                  alt="Santri NUSA Boarding School"
                  width={1200}
                  height={794}
                  className="h-auto w-full object-cover"
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 47vw"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Remove the obsolete countdown component**

Delete `components/promo-banner.tsx`. Before deletion, verify it has no remaining consumers:

```powershell
rg -n "PromoBanner|PromoCountdown" components app tests
```

Expected before deletion: matches only in `components/promo-banner.tsx`, the old hero source if replacement has not yet been saved, and the new removal assertion. Expected after replacement: no production consumer remains.

- [ ] **Step 5: Update the responsive-image test for the refined desktop column**

In `tests/hero-image.test.tsx`, replace both occurrences of:

```tsx
"(max-width: 1023px) calc(100vw - 2rem), 50vw"
```

with:

```tsx
"(max-width: 1023px) calc(100vw - 2rem), 47vw"
```

- [ ] **Step 6: Run the content test and existing image test**

Run:

```powershell
npm test -- tests/hero-hierarchy.test.tsx tests/hero-image.test.tsx
```

Expected: all hierarchy and image tests PASS.

- [ ] **Step 7: Commit the hierarchy rewrite**

```powershell
git add components/hero-section.tsx components/promo-banner.tsx tests/hero-hierarchy.test.tsx tests/hero-image.test.tsx
git commit -m "feat: clarify landing hero hierarchy"
```

### Task 2: Add restrained, accessible hero interaction feedback

**Files:**
- Modify: `tests/hero-hierarchy.test.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing motion-source test**

Append inside the existing `describe` block in `tests/hero-hierarchy.test.tsx`:

```tsx
  it("uses restrained pointer-aware motion with a reduced-motion fallback", () => {
    const heroSource = readFileSync("components/hero-section.tsx", "utf8")
    const globalStyles = readFileSync("app/globals.css", "utf8")

    expect(heroSource).toContain("hero-action")
    expect(heroSource).not.toContain("transition-all")
    expect(heroSource).not.toContain("duration-300")
    expect(heroSource).not.toContain("duration-500")
    expect(heroSource).not.toContain("duration-700")
    expect(heroSource).not.toContain("group-hover:scale")

    expect(globalStyles).toContain(".hero-action")
    expect(globalStyles).toContain("transition: background-color 150ms")
    expect(globalStyles).toContain("@media (hover: hover) and (pointer: fine)")
    expect(globalStyles).toContain("transform: scale(0.97)")
    expect(globalStyles).toContain("@media (prefers-reduced-motion: reduce)")
    expect(globalStyles).toContain(".hero-action:active")
    expect(globalStyles).toContain("transform: none")
  })
```

- [ ] **Step 2: Run the motion test and verify it fails**

Run:

```powershell
npm test -- tests/hero-hierarchy.test.tsx
```

Expected: FAIL because `.hero-action` behavior is not yet defined in `app/globals.css`.

- [ ] **Step 3: Add explicit hero action styles**

Append to `app/globals.css`:

```css
.hero-action {
  transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease,
    transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
}

.hero-action:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .hero-action-primary:hover {
    background-color: #f6be4d;
    box-shadow: 0 12px 32px rgba(19, 65, 70, 0.4);
  }

  .hero-action-secondary:hover {
    border-color: rgba(255, 255, 255, 0.42);
    background-color: rgba(255, 255, 255, 0.16);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-action {
    transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
  }

  .hero-action:active {
    transform: none;
  }
}
```

- [ ] **Step 4: Run focused hero and accessibility tests**

Run:

```powershell
npm test -- tests/hero-hierarchy.test.tsx tests/hero-image.test.tsx tests/reduced-motion.test.ts tests/section-anchors.test.tsx
```

Expected: all focused tests PASS.

- [ ] **Step 5: Commit the interaction polish**

```powershell
git add app/globals.css tests/hero-hierarchy.test.tsx
git commit -m "style: restrain hero interaction feedback"
```

### Task 3: Verify the hero feature and stop for review

**Files:**
- Modify only planned files if verification exposes a defect.

- [ ] **Step 1: Run the complete automated suite**

Run:

```powershell
npm test
```

Expected: all tests PASS with zero failures.

- [ ] **Step 2: Run TypeScript validation**

Run:

```powershell
npx tsc --noEmit
```

Expected: only the approved baseline errors in `app/admin/page.tsx`, `components/footer.tsx`, and `components/testimonials-section.tsx`. No new error may reference the hero or its tests.

- [ ] **Step 3: Run the production build**

Run:

```powershell
npm run build
```

Expected: the build exits successfully and writes a fresh `.next/BUILD_ID`.

- [ ] **Step 4: Inspect production hero output**

Run:

```powershell
$html = Get-Content -LiteralPath .next\server\app\index.html -Raw
[regex]::Match($html, '<h1[^>]*>.*?</h1>').Value
[regex]::Match($html, '<img[^>]+nusa-hero-image.webp[^>]+>').Value
[regex]::Matches($html, '<a[^>]+href="(?:/daftar|https://wa.me/6281392706707)"[^>]*>').Value
```

Expected: production HTML contains the approved headline, an eager high-priority optimized hero image, and both semantic CTA links.

- [ ] **Step 5: Verify whitespace and repository scope**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors. Only planned hero files and documentation are committed or modified; `docs/2026-07-30-ui-ux-audit.md` remains untouched and untracked.

- [ ] **Step 6: Perform the text-only review checkpoint**

Report:

```text
- Final promotion, eyebrow, headline, supporting copy, CTA, and trust-fact hierarchy.
- Removed countdown, quota badge, floating badges, pulse, nested buttons, and long hero motion.
- CTA destinations and accessibility behavior.
- Mobile wrapping safeguards and restrained interaction timings.
- Preserved responsive WebP and LCP loading behavior.
```

If local visual inspection is available, inspect the hero at a narrow mobile width and desktop width without sending screenshots.

- [ ] **Step 7: Stop for user review**

Do not begin the registration wizard, landing-page restructuring, or another audit feature. Present the verified hero improvement for user review first.

### Task 4: Apply the approved enrollment and trust-copy refinement

**Files:**
- Modify: `tests/hero-hierarchy.test.tsx`
- Modify: `components/hero-section.tsx`

- [ ] **Step 1: Update the hierarchy regression test first**

In `tests/hero-hierarchy.test.tsx`, replace the previous promotion detail, eyebrow, and trust facts with these exact expectations:

```tsx
expect(screen.getByText("Potongan SPI Rp10 juta untuk 10 pendaftar pertama")).toBeVisible()
expect(screen.getByText("Boarding School Islami di Kota Semarang")).toBeVisible()

for (const fact of ["Kesetaraan SMA", "Programmer & Designer", "Kota Semarang"]) {
  expect(screen.getByText(fact)).toBeVisible()
}
```

Also update the DOM-order expectation to use `Boarding School Islami di Kota Semarang`.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run tests/hero-hierarchy.test.tsx --maxWorkers=1 --reporter=verbose
```

Expected: FAIL because `HeroSection` still renders the previous promotion detail, eyebrow, and trust facts.

- [ ] **Step 3: Apply the minimal approved copy changes**

In `components/hero-section.tsx`, use:

```tsx
const HERO_FACTS = ["Kesetaraan SMA", "Programmer & Designer", "Kota Semarang"] as const
```

Change the promotion detail and eyebrow to:

```tsx
<span className="text-white/85">Potongan SPI Rp10 juta untuk 10 pendaftar pertama</span>

<p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#8EF3E7] sm:text-base">
  Boarding School Islami di Kota Semarang
</p>
```

Do not add `whitespace-nowrap`, reduce the trust-fact contrast, or change the established hero motion and responsive-image behavior.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run:

```powershell
npx vitest run tests/hero-hierarchy.test.tsx tests/hero-image.test.tsx --maxWorkers=1 --reporter=verbose
```

Expected: both files PASS with the approved copy and existing image guarantees intact.

- [ ] **Step 5: Run full verification**

Run:

```powershell
npx vitest run --maxWorkers=1 --reporter=verbose
npx tsc --noEmit
npm run build
git diff --check
git status --short
```

Expected: all tests pass; TypeScript reports only the known baseline errors outside hero scope; the build writes a fresh `.next/BUILD_ID`; no whitespace errors occur; the user-owned audit document remains untracked.

- [ ] **Step 6: Commit and stop for text-only review**

```powershell
git add components/hero-section.tsx tests/hero-hierarchy.test.tsx
git commit -m "copy: clarify hero enrollment offer"
```

Report the final promotion, eyebrow, and compact trust facts. Do not start another audit feature.
