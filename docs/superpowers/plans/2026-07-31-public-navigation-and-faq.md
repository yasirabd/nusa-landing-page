# Public Navigation and FAQ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accessible desktop and mobile public navigation, reliable landing-page anchors, a registration CTA, and a compact six-question FAQ.

**Architecture:** Keep navigation labels, section IDs, and FAQ copy in small typed data modules. Turn the shared header into a focused client component that progressively enhances ordinary anchor links with active-section tracking and an accessible Radix sheet. Keep landing-page sections server-rendered and add only IDs, scroll offsets, and the new FAQ placement.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 4, Radix Dialog/Accordion, Vitest, Testing Library, jsdom.

---

### Task 1: Add focused component-test infrastructure

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.mts`
- Create: `tests/setup.ts`

- [ ] **Step 1: Install the test dependencies**

Run:

```powershell
npm install --save-dev vitest@3.2.4 jsdom@26.1.0 @testing-library/react@16.3.0 @testing-library/jest-dom@6.6.3
```

Expected: the four packages are added under `devDependencies` and the lockfile updates without changing runtime dependencies.

- [ ] **Step 2: Add the test script**

Add this exact entry to `package.json` scripts:

```json
"test": "vitest run"
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.mts`:

```ts
import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
})
```

- [ ] **Step 4: Add DOM matchers and an IntersectionObserver stub**

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest"

class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = "0px"
  readonly thresholds = [0]
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
  unobserve() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  configurable: true,
  writable: true,
  value: IntersectionObserverStub,
})
```

- [ ] **Step 5: Confirm the test runner starts**

Run: `npm test -- --passWithNoTests`

Expected: exit code 0 with no failures.

### Task 2: Define and test public navigation behavior

**Files:**
- Create: `tests/public-navigation.test.ts`
- Create: `components/public-navigation.ts`

- [ ] **Step 1: Write the failing navigation-data tests**

Create `tests/public-navigation.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { PUBLIC_NAV_ITEMS, getPublicNavigationHref } from "@/components/public-navigation"

describe("public navigation", () => {
  it("defines the approved destinations in order", () => {
    expect(PUBLIC_NAV_ITEMS).toEqual([
      { label: "Program", sectionId: "program" },
      { label: "Kurikulum", sectionId: "kurikulum" },
      { label: "Kehidupan Santri", sectionId: "kehidupan-santri" },
      { label: "Pengajar", sectionId: "pengajar" },
      { label: "Biaya", sectionId: "biaya" },
      { label: "FAQ", sectionId: "faq" },
    ])
  })

  it("uses local hashes on the homepage", () => {
    expect(getPublicNavigationHref("/", "program")).toBe("#program")
  })

  it("returns to homepage sections from secondary pages", () => {
    expect(getPublicNavigationHref("/daftar", "biaya")).toBe("/#biaya")
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/public-navigation.test.ts`

Expected: FAIL because `components/public-navigation.ts` does not exist.

- [ ] **Step 3: Implement the typed navigation data**

Create `components/public-navigation.ts`:

```ts
export const PUBLIC_NAV_ITEMS = [
  { label: "Program", sectionId: "program" },
  { label: "Kurikulum", sectionId: "kurikulum" },
  { label: "Kehidupan Santri", sectionId: "kehidupan-santri" },
  { label: "Pengajar", sectionId: "pengajar" },
  { label: "Biaya", sectionId: "biaya" },
  { label: "FAQ", sectionId: "faq" },
] as const

export type PublicSectionId = (typeof PUBLIC_NAV_ITEMS)[number]["sectionId"]

export function getPublicNavigationHref(pathname: string, sectionId: PublicSectionId) {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`
}
```

- [ ] **Step 4: Run the navigation tests**

Run: `npm test -- tests/public-navigation.test.ts`

Expected: 3 tests pass.

### Task 3: Build and test the accessible shared header

**Files:**
- Create: `tests/header.test.tsx`
- Modify: `components/header.tsx`

- [ ] **Step 1: Write failing header tests**

Create `tests/header.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Header } from "@/components/header"

let pathname = "/"
vi.mock("next/navigation", () => ({ usePathname: () => pathname }))

describe("Header", () => {
  beforeEach(() => { pathname = "/" })

  it("renders all destinations and the registration CTA", () => {
    render(<Header />)
    expect(screen.getAllByRole("link", { name: "Program" })[0]).toHaveAttribute("href", "#program")
    expect(screen.getAllByRole("link", { name: "FAQ" })[0]).toHaveAttribute("href", "#faq")
    expect(screen.getByRole("link", { name: "Daftar Sekarang" })).toHaveAttribute("href", "/daftar")
  })

  it("opens an accessible mobile navigation sheet", () => {
    render(<Header />)
    const trigger = screen.getByRole("button", { name: "Buka menu navigasi" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    fireEvent.click(trigger)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Navigasi utama" })).toBeInTheDocument()
  })

  it("links secondary pages back to homepage sections", () => {
    pathname = "/daftar"
    render(<Header />)
    expect(screen.getAllByRole("link", { name: "Biaya" })[0]).toHaveAttribute("href", "/#biaya")
  })
})
```

- [ ] **Step 2: Run the header tests to verify they fail**

Run: `npm test -- tests/header.test.tsx`

Expected: FAIL because the current header has no navigation, CTA, or working mobile sheet.

- [ ] **Step 3: Implement the approved header design**

Replace `components/header.tsx` with the complete file in Appendix A.

- [ ] **Step 4: Run the header tests**

Run: `npm test -- tests/header.test.tsx`

Expected: 3 tests pass.

### Task 4: Define verified FAQ content with tests

**Files:**
- Create: `tests/faq-content.test.ts`
- Create: `components/faq-content.ts`

- [ ] **Step 1: Write the failing FAQ content tests**

Create `tests/faq-content.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { FAQ_ITEMS } from "@/components/faq-content"

describe("FAQ content", () => {
  it("contains the six approved parent questions", () => {
    expect(FAQ_ITEMS).toHaveLength(6)
    expect(FAQ_ITEMS.map(({ id }) => id)).toEqual([
      "jenjang", "legalitas", "asrama", "jurusan", "biaya", "pendaftaran",
    ])
  })

  it("does not invent legal credentials", () => {
    const legalitas = FAQ_ITEMS.find(({ id }) => id === "legalitas")
    expect(legalitas?.answer).toContain("dokumen resmi")
    expect(legalitas?.answer).toContain("admin NUSA")
    expect(legalitas?.answer).not.toMatch(/terakreditasi|nomor izin|ijazah nasional/i)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/faq-content.test.ts`

Expected: FAIL because `components/faq-content.ts` does not exist.

- [ ] **Step 3: Add conservative Indonesian FAQ copy**

Create `components/faq-content.ts`:

```ts
export const FAQ_ITEMS = [
  {
    id: "jenjang",
    question: "Jenjang pendidikan apa yang diselenggarakan NUSA?",
    answer: "NUSA Boarding School ditujukan untuk santri tingkat SMA dan menggabungkan pendidikan kesetaraan SMA dengan pembinaan agama, keterampilan teknologi, bahasa Inggris, serta pengembangan karakter di lingkungan asrama.",
  },
  {
    id: "legalitas",
    question: "Bagaimana orang tua dapat memeriksa legalitas pendidikannya?",
    answer: "Orang tua dapat meminta penjelasan dan dokumen resmi terkait penyelenggaraan pendidikan kesetaraan langsung kepada admin NUSA. Kami menyarankan keluarga memeriksa dokumen tersebut sebelum menyelesaikan pendaftaran.",
  },
  {
    id: "asrama",
    question: "Bagaimana sistem kehidupan santri di asrama?",
    answer: "Santri mengikuti kegiatan belajar dan pembinaan di lingkungan boarding school. Program yang ditampilkan meliputi monitoring adab dan ibadah, pembelajaran agama, kegiatan bahasa Inggris, kepemimpinan, kemandirian, dan aktivitas bersama guru asrama.",
  },
  {
    id: "jurusan",
    question: "Apa perbedaan jurusan Programmer dan Designer?",
    answer: "Jalur Programmer berfokus pada kemampuan pengembangan teknologi seperti frontend dan backend. Jalur Designer berfokus pada UI/UX, prototyping, dan visual design. Keduanya menggunakan pembelajaran berbasis proyek dan teknologi terkini.",
  },
  {
    id: "biaya",
    question: "Biaya apa saja yang perlu dipersiapkan?",
    answer: "Rincian biaya pendaftaran, biaya masuk, kebutuhan asrama, dan biaya pendidikan bulanan tersedia pada bagian Informasi Biaya. Nominal promo, skema cicilan, dan beasiswa perlu dikonfirmasi kembali kepada tim administrasi sebelum pembayaran.",
  },
  {
    id: "pendaftaran",
    question: "Bagaimana proses pendaftaran tahun ajaran 2027/2028?",
    answer: "Calon santri mengisi formulir pendaftaran, memilih program, melengkapi data sekolah, dan mengikuti petunjuk pembayaran serta konfirmasi yang tersedia. Setelah data diterima, admin NUSA akan menghubungi calon santri melalui WhatsApp untuk proses berikutnya.",
  },
] as const
```

- [ ] **Step 4: Run the FAQ content tests**

Run: `npm test -- tests/faq-content.test.ts`

Expected: 2 tests pass.

### Task 5: Build and test the FAQ section

**Files:**
- Create: `tests/faq-section.test.tsx`
- Create: `components/faq-section.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the failing FAQ component test**

Create `tests/faq-section.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { FAQSection } from "@/components/faq-section"

describe("FAQSection", () => {
  it("renders an anchored accessible FAQ with all questions", () => {
    const { container } = render(<FAQSection />)
    expect(container.querySelector("#faq")).toHaveClass("scroll-mt-20")
    expect(screen.getByRole("heading", { name: "Pertanyaan yang sering diajukan" })).toBeInTheDocument()
    expect(screen.getAllByRole("button")).toHaveLength(6)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/faq-section.test.tsx`

Expected: FAIL because `components/faq-section.tsx` does not exist.

- [ ] **Step 3: Implement the FAQ section**

Create `components/faq-section.tsx` using the complete file in Appendix B.

- [ ] **Step 4: Place FAQ after fees**

In `app/page.tsx`, import `FAQSection` and render:

```tsx
<FeeInfoSection />
<FAQSection />
<PartnerSection />
```

- [ ] **Step 5: Run the FAQ section test**

Run: `npm test -- tests/faq-section.test.tsx`

Expected: 1 test passes.

### Task 6: Add stable section anchors and reduced-motion safeguards

**Files:**
- Modify: `components/program-section.tsx`
- Modify: `components/curriculum-section.tsx`
- Modify: `components/gallery-section.tsx`
- Modify: `components/teaching-team-section.tsx`
- Modify: `components/fee-info-section.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add the approved IDs and sticky offsets**

Use these exact opening-section attributes:

```tsx
<section id="program" className="scroll-mt-20 py-24 md:py-32 lg:py-40" ...>
<section id="kurikulum" className="scroll-mt-20 py-24 md:py-32 lg:py-40" ...>
<section id="kehidupan-santri" className="scroll-mt-20 py-24 md:py-32 lg:py-40" ...>
<section id="pengajar" className="relative scroll-mt-20 py-24 md:py-32 lg:py-40 overflow-hidden" ...>
<section id="biaya" className="scroll-mt-20 py-24 md:py-32 lg:py-40 px-4" ...>
```

- [ ] **Step 2: Add reduced-motion behavior**

Append to `app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  [data-slot="sheet-content"],
  [data-slot="sheet-overlay"],
  [data-slot="accordion-trigger"] > svg {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
}
```

- [ ] **Step 3: Run all focused tests**

Run: `npm test`

Expected: all navigation, header, FAQ content, and FAQ section tests pass.

## Appendix A: Complete `components/header.tsx`

```tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { PUBLIC_NAV_ITEMS, getPublicNavigationHref, type PublicSectionId } from "@/components/public-navigation"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<PublicSectionId | null>(null)

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null)
      return
    }

    const sections = PUBLIC_NAV_ITEMS.map(({ sectionId }) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.id as PublicSectionId)
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-[#134146]/10 bg-[#F7F7F2]/90 font-sans text-[#134146] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 md:px-6">
        <Link
          href="/"
          aria-label="NUSA Boarding School - Beranda"
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-4"
        >
          <span className="text-lg font-semibold tracking-tight sm:text-xl">
            <span className="font-righteous font-normal tracking-wider text-[#2C8970]">NUSA</span>{" "}
            <span className="hidden sm:inline">Boarding School</span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="ml-auto hidden items-center gap-1 lg:flex">
          {PUBLIC_NAV_ITEMS.map(({ label, sectionId }) => {
            const active = activeSection === sectionId
            return (
              <Link
                key={sectionId}
                href={getPublicNavigationHref(pathname, sectionId)}
                aria-current={active ? "location" : undefined}
                className="relative rounded-md px-2.5 py-2 text-sm font-medium text-[#134146]/75 transition-colors duration-150 hover:text-[#134146] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-2 after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[#2C8970] after:transition-transform after:duration-150 aria-[current=location]:text-[#134146] aria-[current=location]:after:scale-x-100"
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/daftar"
          className="ml-auto hidden min-h-11 items-center justify-center rounded-full bg-[#F3B233] px-5 text-sm font-semibold text-[#134146] shadow-sm transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#F6BE4D] hover:shadow-md active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-2 lg:inline-flex"
        >
          Daftar Sekarang
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Buka menu navigasi"
              className="ml-auto inline-flex size-11 items-center justify-center rounded-full border border-[#134146]/10 bg-white/70 text-[#134146] transition-[background-color,border-color] duration-150 hover:border-[#2C8970]/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-2 lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[min(88vw,24rem)] border-l border-[#134146]/10 bg-[#F7F7F2] p-0 text-[#134146] data-[state=closed]:duration-200 data-[state=open]:duration-[250ms]">
            <SheetHeader className="border-b border-[#134146]/10 px-6 py-6 text-left">
              <SheetTitle className="text-xl font-semibold text-[#134146]">Navigasi utama</SheetTitle>
              <SheetDescription className="text-sm leading-6 text-[#134146]/70">
                Temukan program, kehidupan santri, biaya, dan informasi pendaftaran NUSA.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Navigasi utama mobile" className="flex flex-col px-3 py-4">
              {PUBLIC_NAV_ITEMS.map(({ label, sectionId }) => (
                <SheetClose asChild key={sectionId}>
                  <Link
                    href={getPublicNavigationHref(pathname, sectionId)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-[#134146]/80 transition-colors duration-150 hover:bg-[#2C8970]/[0.08] hover:text-[#134146] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970]"
                  >
                    {label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto border-t border-[#134146]/10 p-6">
              <SheetClose asChild>
                <Link
                  href="/daftar"
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#F3B233] px-5 font-semibold text-[#134146] transition-[background-color,transform] duration-150 hover:bg-[#F6BE4D] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-2"
                >
                  Daftar Sekarang
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
```

## Appendix B: Complete `components/faq-section.tsx`

```tsx
import { MessageCircleQuestion } from "lucide-react"
import { FAQ_ITEMS } from "@/components/faq-content"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-20 bg-[#F7F7F2] px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-[#42CDBA]/15 text-[#1F6F68]">
            <MessageCircleQuestion className="size-5" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2C8970]">FAQ</p>
          <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[#134146] sm:text-4xl">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#134146]/70">
            Jawaban singkat untuk membantu orang tua memahami program, biaya, dan proses pendaftaran sebelum berkonsultasi dengan admin.
          </p>
        </div>

        <Accordion type="multiple" className="border-t border-[#134146]/12">
          {FAQ_ITEMS.map(({ id, question, answer }) => (
            <AccordionItem key={id} value={id} className="border-[#134146]/12">
              <AccordionTrigger className="py-5 text-base font-semibold leading-6 text-[#134146] transition-colors duration-150 hover:text-[#2C8970] hover:no-underline focus-visible:ring-[#2C8970]/40 [&>svg]:transition-transform [&>svg]:duration-150">
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-5 pr-8 text-[15px] leading-7 text-[#134146]/[0.72]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```

### Task 7: Verify the feature and stop for review

**Files:**
- Modify only files already listed if verification exposes a defect.

- [ ] **Step 1: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: Next.js production build exits successfully.

- [ ] **Step 3: Check whitespace and repository state**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only this feature's files are modified; `docs/2026-07-30-ui-ux-audit.md` remains untouched and untracked.

- [ ] **Step 4: Perform manual interaction review**

Verify desktop and mobile section navigation, secondary-page links, URL hashes, Escape behavior, focus trap/restoration, keyboard focus rings, 320 pixel layout, reduced motion, and dark teal CTA text on gold.

- [ ] **Step 5: Commit the feature**

Run:

```powershell
git add package.json package-lock.json vitest.config.mts tests components/header.tsx components/public-navigation.ts components/faq-content.ts components/faq-section.tsx components/program-section.tsx components/curriculum-section.tsx components/gallery-section.tsx components/teaching-team-section.tsx components/fee-info-section.tsx app/page.tsx app/globals.css docs/superpowers/plans/2026-07-31-public-navigation-and-faq.md
git commit -m "feat: add public navigation and faq"
```

- [ ] **Step 6: Stop for user review**

Report fresh test, typecheck, and build evidence plus the exact behaviors to inspect. Do not begin the next audit feature until the user approves this one.
