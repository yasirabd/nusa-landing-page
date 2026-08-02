import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CurriculumSection } from "@/components/curriculum-section"
import { FeeInfoSection } from "@/components/fee-info-section"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ProgramSection } from "@/components/program-section"
import { RegistrationSection } from "@/components/registration-section"
import { WhyChooseSection } from "@/components/why-choose-section"

describe("public CTA accessibility", () => {
  it("prefills the SPMB 2027/2028 WhatsApp consultation", () => {
    const message =
      "Assalamu'alaikum, saya ingin informasi tentang SPMB NUSA Boarding School 2027/2028."
    const expectedUrl = `https://wa.me/6281392706707?text=${encodeURIComponent(message)}`

    render(
      <>
        <HeroSection />
        <Footer />
      </>,
    )

    expect(
      screen.getByRole("link", { name: "Konsultasi via WhatsApp" }),
    ).toHaveAttribute("href", expectedUrl)
    expect(screen.getByRole("link", { name: "081392706707" })).toHaveAttribute(
      "href",
      expectedUrl,
    )
  })

  it("renders the final registration CTA as one link", () => {
    render(<RegistrationSection />)
    const link = screen.getByRole("link", { name: "Daftar Sekarang" })

    expect(link).toHaveAttribute("href", "/daftar")
    expect(link.querySelector("button")).toBeNull()
    expect(
      screen.queryByRole("button", { name: "Daftar Sekarang" }),
    ).not.toBeInTheDocument()
  })

  it("keeps Muslim Tangguh, Jago IT on one line in the final registration heading", () => {
    render(<RegistrationSection />)

    expect(screen.getByText("Muslim Tangguh, Jago IT")).toHaveClass(
      "whitespace-nowrap",
    )
  })

  it.each([
    ["benefits section", <WhyChooseSection />],
    ["program overview", <ProgramSection />],
  ])("renders the %s CTA directly on the link", (_, component) => {
    render(component)
    const link = screen.getByRole("link", { name: "Daftar Sekarang" })

    expect(link).toHaveAttribute("href", "/daftar")
    expect(link.firstElementChild?.tagName).not.toBe("DIV")
  })

  it("removes the inert student-work control", () => {
    render(<CurriculumSection />)

    expect(
      screen.queryByRole("button", { name: "Lihat Karya" }),
    ).not.toBeInTheDocument()
    expect(screen.queryByText("Lihat Karya")).not.toBeInTheDocument()
  })

  it("uses dark teal text on the gold registration-fee badge", () => {
    render(<FeeInfoSection />)

    expect(screen.getByText("BIAYA PENDAFTARAN")).toHaveClass(
      "bg-brand-accent",
      "text-brand-dark",
    )
  })

  it.each([
    ["benefits section", <WhyChooseSection />],
    ["program overview", <ProgramSection />],
    ["final registration", <RegistrationSection />],
  ])("gives the %s CTA visible focus and restrained motion", (_, component) => {
    render(component)
    const link = screen.getByRole("link", { name: "Daftar Sekarang" })

    expect(link).toHaveClass(
      "duration-150",
      "focus-visible:ring-2",
      "active:scale-[0.97]",
      "motion-reduce:active:scale-100",
    )
    expect(link).not.toHaveClass("transition-all", "hover:scale-105")
  })

  it.each([
    [
      "benefits section",
      <WhyChooseSection />,
      [
        "bg-brand-accent",
        "text-brand-dark",
        "transition-[background-color,box-shadow,transform]",
      ],
    ],
    [
      "program overview",
      <ProgramSection />,
      [
        "bg-brand-depth",
        "text-white",
        "hover:bg-brand-accent",
        "hover:text-brand-dark",
        "transition-[background-color,color,box-shadow,transform]",
      ],
    ],
    [
      "final registration",
      <RegistrationSection />,
      [
        "bg-brand-depth",
        "text-brand-paper",
        "hover:bg-brand-accent",
        "hover:text-brand-dark",
        "transition-[background-color,color,box-shadow,transform]",
      ],
    ],
  ])("keeps the %s CTA contrast-safe through color changes", (_, component, classes) => {
    render(component)
    const link = screen.getByRole("link", { name: "Daftar Sekarang" })

    expect(link).toHaveClass(...classes)
  })
})
