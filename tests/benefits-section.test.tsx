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
    expect(section.querySelectorAll("svg:not([aria-hidden='true'])")).toHaveLength(
      0,
    )
  })
})
