# Testimonial Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the testimonial carousel with a credible static editorial section that presents one featured voice and three supporting voices with complete attribution.

**Architecture:** Keep the feature in `components/testimonials-section.tsx` as a stateless server-compatible component with typed local testimonial data and one small reusable card component. Add a focused React Testing Library suite that verifies copy, semantic structure, responsive hierarchy, avatar treatment, and removal of unsupported carousel/rating behavior.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Vitest, React Testing Library

---

### Task 1: Define the static testimonial contract with failing tests

**Files:**
- Create: `tests/testimonials-section.test.tsx`
- Test: `tests/testimonials-section.test.tsx`

- [ ] **Step 1: Write the failing testimonial rendering tests**

Create `tests/testimonials-section.test.tsx` with:

```tsx
import { readFileSync } from "node:fs"
import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { TestimonialsSection } from "@/components/testimonials-section"

const testimonials = [
  {
    name: "Dr. Ir. Edy Susilo, MT",
    role: "Ketua Yayasan Islam Nurus Sunnah",
    quote:
      "NUSA membekali anak-anak untuk punya lifeskill dalam bidang IT dan memiliki karakter yang baik.",
    initials: "ES",
  },
  {
    name: "Dr.Eng. Adi Wibowo, S.Si., M.Kom",
    role: "Wali Murid SD Islam Nurus Sunnah",
    quote:
      "Keren banget! NUSA tidak hanya fokus ke ilmu agama dan akhlak mulia sesuai tuntunan Ahlus Sunnah wal Jama’ah, tetapi juga menyiapkan generasi Qur’ani yang menguasai teknologi. Semoga makin sukses dan terus istiqamah!",
    initials: "AW",
  },
  {
    name: "Izzul Fairuz Mahendra",
    role: "Santri Angkatan 1",
    quote: "Satu-satunya sekolah IT yang ada di Semarang.",
    initials: "IF",
  },
  {
    name: "Muhammad Fachri",
    role: "Santri Angkatan 1",
    quote:
      "NUSA mengajarkan bisnis hingga dapat uang menggunakan teknologi terbaru.",
    initials: "MF",
  },
] as const

describe("testimonial quality section", () => {
  it("shows all approved family voices with complete attribution", () => {
    const { container } = render(<TestimonialsSection />)
    const section = container.querySelector("section") as HTMLElement

    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "Cerita dari Keluarga NUSA",
      }),
    ).toBeVisible()
    expect(
      within(section).getByText(
        "Pandangan dari yayasan, wali murid, dan santri yang membersamai perjalanan NUSA.",
      ),
    ).toBeVisible()

    const articles = within(section).getAllByRole("article")
    expect(articles).toHaveLength(4)

    for (const [index, testimonial] of testimonials.entries()) {
      const article = within(section).getByRole("article", {
        name: testimonial.name,
      })

      expect(articles[index]).toBe(article)
      expect(within(article).getByText(testimonial.quote)).toBeVisible()
      expect(within(article).getByText(testimonial.name)).toBeVisible()
      expect(within(article).getByText(testimonial.role)).toBeVisible()
      expect(within(article).getByText(testimonial.initials)).toBeVisible()
      expect(article.querySelector("blockquote")).not.toBeNull()
      expect(article.querySelector("footer")).not.toBeNull()
    }
  })

  it("uses one featured card and a responsive supporting grid", () => {
    render(<TestimonialsSection />)

    const featured = screen.getByRole("article", {
      name: "Dr. Ir. Edy Susilo, MT",
    })
    const supporting = screen.getByRole("article", {
      name: "Dr.Eng. Adi Wibowo, S.Si., M.Kom",
    })
    const finalCard = screen.getByRole("article", { name: "Muhammad Fachri" })
    const supportingGrid = supporting.parentElement as HTMLElement

    expect(featured).toHaveAttribute("data-featured", "true")
    expect(featured).toHaveClass("lg:p-10")
    expect(supportingGrid).toHaveClass(
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
    )
    expect(finalCard).toHaveClass("md:col-span-2", "lg:col-span-1")
  })

  it("keeps attribution readable and removes unsupported interaction", () => {
    const source = readFileSync("components/testimonials-section.tsx", "utf8")
    const { container } = render(<TestimonialsSection />)
    const section = container.querySelector("section") as HTMLElement

    expect(section).toHaveClass("bg-[#134146]")
    expect(section.querySelectorAll("button")).toHaveLength(0)
    expect(section.querySelectorAll("[class*='truncate']")).toHaveLength(0)

    for (const initials of ["ES", "AW", "IF", "MF"]) {
      expect(screen.getByText(initials)).toHaveClass(
        "bg-[#F3B233]",
        "text-[#134146]",
      )
    }

    for (const forbidden of [
      "'use client'",
      '"use client"',
      "useState",
      "useEffect",
      "useRef",
      "ChevronLeft",
      "ChevronRight",
      "pointerdown",
      "touchstart",
      "★",
      "linear-gradient",
      "radial-gradient",
      "backdrop-blur",
      "hover:-translate-y",
      "hover:scale",
      "hover:shadow",
      "duration-500",
    ]) {
      expect(source).not.toContain(forbidden)
    }
  })
})
```

- [ ] **Step 2: Run the focused tests to verify RED**

Run:

```bash
npx vitest run tests/testimonials-section.test.tsx
```

Expected: FAIL because the current component still renders the `Testimoni` heading, carousel controls, one-character avatars, and client-side carousel behavior.

- [ ] **Step 3: Commit the failing test contract**

```bash
git add tests/testimonials-section.test.tsx
git commit -m "test: define testimonial quality contract"
```

### Task 2: Implement the static editorial testimonial section

**Files:**
- Modify: `components/testimonials-section.tsx`
- Test: `tests/testimonials-section.test.tsx`

- [ ] **Step 1: Replace the carousel with the complete typed static component**

Replace `components/testimonials-section.tsx` with:

```tsx
type Testimonial = {
  name: string
  role: string
  quote: string
  initials: string
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: "Dr. Ir. Edy Susilo, MT",
    role: "Ketua Yayasan Islam Nurus Sunnah",
    quote:
      "NUSA membekali anak-anak untuk punya lifeskill dalam bidang IT dan memiliki karakter yang baik.",
    initials: "ES",
  },
  {
    name: "Dr.Eng. Adi Wibowo, S.Si., M.Kom",
    role: "Wali Murid SD Islam Nurus Sunnah",
    quote:
      "Keren banget! NUSA tidak hanya fokus ke ilmu agama dan akhlak mulia sesuai tuntunan Ahlus Sunnah wal Jama’ah, tetapi juga menyiapkan generasi Qur’ani yang menguasai teknologi. Semoga makin sukses dan terus istiqamah!",
    initials: "AW",
  },
  {
    name: "Izzul Fairuz Mahendra",
    role: "Santri Angkatan 1",
    quote: "Satu-satunya sekolah IT yang ada di Semarang.",
    initials: "IF",
  },
  {
    name: "Muhammad Fachri",
    role: "Santri Angkatan 1",
    quote:
      "NUSA mengajarkan bisnis hingga dapat uang menggunakan teknologi terbaru.",
    initials: "MF",
  },
]

type TestimonialCardProps = {
  testimonial: Testimonial
  featured?: boolean
  className?: string
}

function TestimonialCard({
  testimonial,
  featured = false,
  className = "",
}: TestimonialCardProps) {
  return (
    <article
      aria-label={testimonial.name}
      className={`flex h-full flex-col rounded-3xl border border-[#134146]/10 bg-[#F7F7F2] p-6 sm:p-7 ${
        featured ? "lg:p-10" : "lg:p-8"
      } ${className}`}
      data-featured={featured ? "true" : undefined}
    >
      <span
        aria-hidden="true"
        className={`font-serif leading-none text-[#F3B233] ${
          featured ? "text-6xl md:text-7xl" : "text-5xl"
        }`}
      >
        &ldquo;
      </span>

      <blockquote className="mt-1 flex-1">
        <p
          className={`font-medium text-[#134146] ${
            featured
              ? "max-w-4xl text-xl leading-relaxed md:text-2xl"
              : "text-base leading-7"
          }`}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="mt-8 flex items-center gap-4 border-t border-[#134146]/12 pt-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F3B233] text-sm font-bold tracking-wide text-[#134146]">
          {testimonial.initials}
        </span>
        <div className="min-w-0">
          <p className="font-bold leading-snug text-[#134146]">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm font-medium leading-snug text-[#134146]/70">
            {testimonial.role}
          </p>
        </div>
      </footer>
    </article>
  )
}

export function TestimonialsSection() {
  const [featured, ...supporting] = TESTIMONIALS

  return (
    <section className="bg-[#134146] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#F7F7F2] md:text-4xl lg:text-5xl">
            Cerita dari Keluarga NUSA
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#F7F7F2]/80 md:text-lg">
            Pandangan dari yayasan, wali murid, dan santri yang membersamai
            perjalanan NUSA.
          </p>
        </div>

        <div className="mt-10">
          <TestimonialCard featured testimonial={featured} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {supporting.map((testimonial, index) => (
            <TestimonialCard
              className={
                index === supporting.length - 1
                  ? "md:col-span-2 lg:col-span-1"
                  : undefined
              }
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

This removes `'use client'`, hooks, refs, event listeners, carousel calculations, Lucide imports, stars, hover motion, large shadows, backdrop blur, and decorative grid/radial backgrounds.

- [ ] **Step 2: Run the focused tests to verify GREEN**

Run:

```bash
npx vitest run tests/testimonials-section.test.tsx
```

Expected: PASS with 3 tests and no warnings.

- [ ] **Step 3: Run the full regression suite**

Run:

```bash
npm test
```

Expected: PASS with the existing 83 tests plus the 3 new testimonial tests.

- [ ] **Step 4: Commit the implementation**

```bash
git add components/testimonials-section.tsx
git commit -m "feat: present testimonials as credible family voices"
```

### Task 3: Verify implementation quality and readiness for visual review

**Files:**
- Verify: `components/testimonials-section.tsx`
- Verify: `tests/testimonials-section.test.tsx`
- Verify: `docs/superpowers/specs/2026-08-01-testimonial-quality-design.md`

- [ ] **Step 1: Run TypeScript checking**

Run:

```bash
npx tsc --noEmit
```

Expected: the previous testimonial component errors are gone. Only the documented unrelated baseline errors in `app/admin/page.tsx` and `components/footer.tsx` may remain.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 3: Run final repository checks**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors; only the user-owned untracked `docs/2026-07-30-ui-ux-audit.md` may remain outside committed feature work.

- [ ] **Step 4: Request independent code review**

Review the complete feature diff against `docs/superpowers/specs/2026-08-01-testimonial-quality-design.md`. Fix all Critical and Important findings, rerun affected tests, then rerun the full verification suite.

- [ ] **Step 5: Stop for user visual review**

Report the branch, commits, test/build evidence, and known unrelated TypeScript baseline errors. Do not merge to `main` until the user approves the visual result.
