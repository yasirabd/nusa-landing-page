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
      expect(
        within(section).getByRole("heading", { level: 3, name: value }),
      ).toBeVisible()
    }
    expect(section.querySelectorAll("ul > li")).toHaveLength(4)

    expect(
      within(section).getByRole("heading", {
        name: "100 Hari Belajar, Besoknya Gajian",
      }),
    ).toBeVisible()

    for (const stage of [
      "100 Hari Pertama",
      "Langsung Berkarya",
      "Belajar Sambil Praktik",
    ]) {
      expect(within(section).getAllByText(stage)).toHaveLength(1)
    }
    expect(section.querySelectorAll("ol > li")).toHaveLength(3)

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

  it("does not promise guaranteed income elsewhere on the landing page", () => {
    const curriculumSource = readFileSync(
      "components/curriculum-section.tsx",
      "utf8",
    )

    expect(curriculumSource).not.toContain("Punya penghasilan sendiri")
    expect(curriculumSource).toContain(
      "Berpeluang memperoleh penghasilan dari karya atau project berbayar",
    )
  })

  it("uses the approved editorial layout without changing its copy", () => {
    const source = readFileSync("components/why-choose-section.tsx", "utf8")
    const { container } = render(<WhyChooseSection />)
    const section = container.querySelector("section") as HTMLElement
    const benefitsList = section.querySelector("ul") as HTMLElement
    const cta = within(section).getByRole("link", { name: "Daftar Sekarang" })

    expect(section).toHaveClass("bg-[#F7F7F2]")
    expect(source).toContain(
      "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]",
    )
    expect(benefitsList).toHaveClass("md:grid-cols-2", "lg:mt-0")
    expect(cta).toHaveClass("w-full", "sm:w-fit")
    expect(source).not.toContain("rounded-[2rem]")
    expect(source).not.toContain("shadow-[0_24px_70px")

    for (const copy of [
      "Keunggulan NUSA",
      "Mengapa Memilih NUSA?",
      "Pendidikan yang menyatukan pembentukan iman, keterampilan teknologi,",
      "Adab, ibadah, disiplin, dan kemandirian dibentuk melalui pendampingan keseharian.",
      "Belajar IT secara intensif dengan tools terkini, AI, dan project yang relevan dengan kebutuhan industri.",
      "Melatih bahasa Inggris, leadership, public speaking, dan soft skills untuk berkomunikasi dengan percaya diri.",
      "Membangun portofolio, mental berjualan, serta pengalaman freelance dan project berbayar.",
      "Dari Belajar Menjadi Karya",
      "100 Hari Belajar, Besoknya Gajian",
      "Gajian berarti mulai mendapat peluang penghasilan dari karya,",
      "Belajar intensif dengan fokus pada skill praktis yang dibutuhkan industri.",
      "Mulai membangun portofolio melalui freelance atau project berbayar.",
      "Memperdalam kemampuan dengan mengerjakan project nyata secara berkelanjutan.",
      "Daftar Sekarang",
    ]) {
      expect(source).toContain(copy)
    }
  })

  it("uses explicit calm dividers across mobile and desktop layouts", () => {
    const { container } = render(<WhyChooseSection />)
    const items = Array.from(container.querySelectorAll("ul > li"))

    expect(items).toHaveLength(4)
    for (const item of items) {
      expect(item).toHaveClass("border-[#134146]/15")
    }

    expect(items[0]).toHaveClass("border-b", "md:border-r")
    expect(items[1]).toHaveClass("border-b", "md:pl-8")
    expect(items[2]).toHaveClass(
      "border-b",
      "md:border-b-0",
      "md:border-r",
    )
    expect(items[3]).toHaveClass("md:pl-8")
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
    expect(section.querySelectorAll("svg:not([aria-hidden='true'])")).toHaveLength(
      0,
    )
  })
})
