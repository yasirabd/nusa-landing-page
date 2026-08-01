# Benefits Section Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the repetitive `WhyChooseSection` and `Program100Days` sequence with one concise benefits section while keeping the approved NUSA tagline as a compact standalone interlude.

**Architecture:** Keep `NUSATaglineSection` focused on brand copy and reduce only its spacing. Rewrite `WhyChooseSection` as a stateless consolidated component driven by two local content arrays, move the 100-day story into its featured panel, remove the old page render and component, and protect content, structure, motion, and accessibility with focused Vitest tests.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Lucide React, Vitest, Testing Library.

---

### Task 1: Compact the standalone tagline interlude

**Files:**
- Modify: `tests/nusa-tagline.test.tsx`
- Modify: `components/nusa-tagline.tsx`

- [ ] **Step 1: Write the failing spacing test**

Add to `tests/nusa-tagline.test.tsx`:

```tsx
it("keeps the approved tagline in a compact standalone interlude", () => {
  const { container } = render(<NUSATaglineSection />)
  const section = container.querySelector("section")

  expect(section).toHaveClass("py-16", "md:py-20", "lg:py-24")
  expect(section).not.toHaveClass("lg:py-48")
  expect(
    screen.getByText("Faith at Heart. Tech in Hand. Purpose in Action."),
  ).toBeVisible()
})
```

- [ ] **Step 2: Run the test and verify RED**

```powershell
npx vitest run tests/nusa-tagline.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: the new test FAILS because the section still uses `py-24 md:py-32 lg:py-48`.

- [ ] **Step 3: Apply compact spacing only**

In `components/nusa-tagline.tsx`, change the section class to:

```tsx
<section className="bg-white py-16 md:py-20 lg:py-24">
```

Do not change either approved tagline string, typography, alignment, divider, or colors.

- [ ] **Step 4: Run the test and verify GREEN**

Run the command from Step 2. Expected: 2 tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add tests/nusa-tagline.test.tsx components/nusa-tagline.tsx
git commit -m "style: compact NUSA tagline interlude"
```

### Task 2: Consolidate benefits and the 100-day story

**Files:**
- Create: `tests/benefits-section.test.tsx`
- Modify: `components/why-choose-section.tsx`
- Modify: `app/page.tsx`
- Delete: `components/program-100-days.tsx`

- [ ] **Step 1: Write failing content and composition tests**

Create `tests/benefits-section.test.tsx`:

```tsx
import { existsSync, readFileSync } from "node:fs"
import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { WhyChooseSection } from "@/components/why-choose-section"

describe("consolidated benefits section", () => {
  it("presents four core NUSA values and one 100-day story", () => {
    const { container } = render(<WhyChooseSection />)
    const section = container.querySelector("section") as HTMLElement

    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "Mengapa Memilih NUSA?",
      }),
    ).toBeVisible()

    for (const value of [
      "Iman dan Karakter",
      "Skill Industri Teknologi",
      "Bahasa dan Kepemimpinan",
      "Karya dan Entrepreneurship",
    ]) {
      expect(within(section).getByRole("heading", { level: 3, name: value })).toBeVisible()
    }

    expect(
      within(section).getByRole("heading", {
        name: "100 Hari Belajar, Besoknya Gajian",
      }),
    ).toBeVisible()

    for (const stage of ["100 Hari Pertama", "Langsung Berkarya", "Belajar Sambil Praktik"]) {
      expect(within(section).getAllByText(stage)).toHaveLength(1)
    }

    const registrationLink = within(section).getByRole("link", {
      name: "Daftar Sekarang",
    })
    expect(registrationLink).toHaveAttribute("href", "/daftar")
    expect(within(section).getAllByRole("link")).toHaveLength(1)
  })

  it("removes the separate 100-day component from the landing composition", () => {
    const pageSource = readFileSync("app/page.tsx", "utf8")

    expect(pageSource).not.toContain("Program100Days")
    expect(existsSync("components/program-100-days.tsx")).toBe(false)
  })

  it("keeps static benefits calm and the CTA accessible", () => {
    const source = readFileSync("components/why-choose-section.tsx", "utf8")
    const { container } = render(<WhyChooseSection />)
    const section = container.querySelector("section") as HTMLElement
    const cta = within(section).getByRole("link", { name: "Daftar Sekarang" })

    expect(source).not.toContain("hover:-translate-y")
    expect(source).not.toContain("hover:scale-105")
    expect(source).not.toContain("duration-300")
    expect(source).not.toContain("duration-500")
    expect(source).not.toContain("duration-1000")

    expect(cta).toHaveClass(
      "min-h-12",
      "duration-150",
      "focus-visible:ring-2",
      "active:scale-[0.97]",
      "motion-reduce:active:scale-100",
    )
    expect(section.querySelectorAll("svg:not([aria-hidden='true'])")).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run the test and verify RED**

```powershell
npx vitest run tests/benefits-section.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL because the new value headings and CTA contract are absent, the old decorative motion remains, and the old component is still imported/rendered.

- [ ] **Step 3: Rewrite the consolidated component**

Replace `components/why-choose-section.tsx` with a stateless component using these content arrays:

```tsx
import Link from "next/link"
import {
  BriefcaseBusiness,
  Code2,
  Languages,
  MoveRight,
  ShieldCheck,
} from "lucide-react"

const benefits = [
  {
    title: "Iman dan Karakter",
    description:
      "Adab, ibadah, disiplin, dan kemandirian dibentuk melalui pendampingan keseharian.",
    icon: ShieldCheck,
  },
  {
    title: "Skill Industri Teknologi",
    description:
      "Belajar IT secara intensif dengan tools terkini, AI, dan project yang relevan dengan kebutuhan industri.",
    icon: Code2,
  },
  {
    title: "Bahasa dan Kepemimpinan",
    description:
      "Melatih bahasa Inggris, leadership, public speaking, dan soft skills untuk berkomunikasi dengan percaya diri.",
    icon: Languages,
  },
  {
    title: "Karya dan Entrepreneurship",
    description:
      "Membangun portofolio, mental berjualan, serta pengalaman freelance dan project berbayar.",
    icon: BriefcaseBusiness,
  },
] as const

const stages = [
  {
    title: "100 Hari Pertama",
    description: "Belajar intensif dengan fokus pada skill praktis yang dibutuhkan industri.",
  },
  {
    title: "Langsung Berkarya",
    description: "Mulai membangun portofolio melalui freelance atau project berbayar.",
  },
  {
    title: "Belajar Sambil Praktik",
    description: "Memperdalam kemampuan dengan mengerjakan project nyata secara berkelanjutan.",
  },
] as const
```

Render one section with:

- `bg-[#F0FAF7] py-16 md:py-20 lg:py-24`.
- A left-aligned eyebrow `Keunggulan NUSA`, `h2` `Mengapa Memilih NUSA?`, and concise supporting paragraph.
- A semantic `ul` grid containing the four benefits. Each item uses a decorative icon with `aria-hidden="true"`, an `h3`, and its description.
- A dark `#134146` featured panel with the 100-day heading, the clarification `Gajian berarti mulai mendapat peluang penghasilan dari karya, freelance, atau project berbayar; hasil setiap santri dapat berbeda.`, and a semantic `ol` containing the three stages.
- One gold registration link after the stages.

Use this CTA contract:

```tsx
<Link
  href="/daftar"
  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F3B233] px-6 text-sm font-semibold text-[#134146] shadow-sm transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#F6BE4D] hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134146] motion-reduce:transition-none motion-reduce:active:scale-100 sm:text-base"
>
  Daftar Sekarang
  <MoveRight
    aria-hidden="true"
    className="size-5 transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
  />
</Link>
```

- [ ] **Step 4: Remove the old page composition and source file**

In `app/page.tsx`, delete:

```tsx
import { Program100Days } from "@/components/program-100-days"
```

and:

```tsx
<Program100Days />
```

Delete `components/program-100-days.tsx` after its approved content exists in `WhyChooseSection`.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run the command from Step 2. Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```powershell
git add app/page.tsx components/why-choose-section.tsx tests/benefits-section.test.tsx
git add -u components/program-100-days.tsx
git commit -m "feat: consolidate NUSA benefits section"
```

### Task 3: Verify the integrated feature

**Files:**
- Verify: all files changed in Tasks 1-3

- [ ] **Step 1: Run the full test suite**

```powershell
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all tests PASS.

- [ ] **Step 2: Run TypeScript checking**

```powershell
npx tsc --noEmit
```

Expected: no new errors in changed files. Report only known unrelated baseline errors if they remain.

- [ ] **Step 3: Run the production build**

```powershell
$env:NEXT_TELEMETRY_DISABLED='1'; npm run build
```

Expected: build completes and generates a fresh `.next/BUILD_ID`.

- [ ] **Step 4: Check the final diff**

```powershell
git diff main...HEAD --check
git status --short
git diff --stat main...HEAD
```

Expected: no whitespace errors; only the approved plan, tagline, consolidated benefits section, landing composition, deleted legacy component, and focused tests differ. The untracked audit file remains untouched.

- [ ] **Step 5: Stop for user review**

Report content hierarchy, removed duplication, motion choices, test/build evidence, commits, and unchanged baseline errors. Do not merge until the user explicitly approves.
