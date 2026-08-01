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
      const avatar = within(article).getByText(testimonial.initials)
      const quoteMark = article.querySelector(".font-serif")

      expect(avatar).toBeVisible()
      expect(avatar).toHaveAttribute("aria-hidden", "true")
      expect(quoteMark).toHaveAttribute("aria-hidden", "true")
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
    const featuredQuote = featured.querySelector("blockquote") as HTMLElement
    const featuredFooter = featured.querySelector("footer") as HTMLElement

    expect(featured).toHaveAttribute("data-featured", "true")
    expect(featured).toHaveClass("lg:p-10")
    expect(featured).not.toHaveClass("h-full")
    expect(featuredQuote).not.toHaveClass("flex-1")
    expect(featuredFooter).toHaveClass("mt-6")
    expect(supportingGrid).toHaveClass(
      "grid-cols-1",
      "items-start",
      "md:grid-cols-2",
      "lg:grid-cols-3",
    )
    expect(finalCard).toHaveClass("md:col-span-2", "lg:col-span-1")
  })

  it("keeps attribution readable and removes unsupported interaction", () => {
    const source = readFileSync("components/testimonials-section.tsx", "utf8")
    const { container } = render(<TestimonialsSection />)
    const section = container.querySelector("section") as HTMLElement

    expect(section).toHaveClass("bg-brand-dark", "section-spacing-standard")
    expect(section.querySelectorAll("button")).toHaveLength(0)
    expect(section.querySelectorAll("[class*='truncate']")).toHaveLength(0)

    for (const initials of ["ES", "AW", "IF", "MF"]) {
      expect(screen.getByText(initials)).toHaveClass(
        "bg-brand-accent",
        "text-brand-dark",
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
      "transition-all",
      "duration-300",
      "duration-500",
      "duration-700",
      "duration-1000",
    ]) {
      expect(source).not.toContain(forbidden)
    }
  })
})
