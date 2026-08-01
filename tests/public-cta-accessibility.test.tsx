import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CurriculumSection } from "@/components/curriculum-section"
import { FeeInfoSection } from "@/components/fee-info-section"
import { Program100Days } from "@/components/program-100-days"
import { ProgramSection } from "@/components/program-section"
import { RegistrationSection } from "@/components/registration-section"

describe("public CTA accessibility", () => {
  it("renders the final registration CTA as one link", () => {
    render(<RegistrationSection />)
    const link = screen.getByRole("link", { name: "Daftar Sekarang" })

    expect(link).toHaveAttribute("href", "/daftar")
    expect(link.querySelector("button")).toBeNull()
    expect(
      screen.queryByRole("button", { name: "Daftar Sekarang" }),
    ).not.toBeInTheDocument()
  })

  it.each([
    ["100-day program", <Program100Days />],
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

    expect(screen.getByText("BIAYA PENDAFTARAN")).toHaveStyle({
      backgroundColor: "#F3B233",
      color: "#134146",
    })
  })

  it.each([
    ["100-day program", <Program100Days />],
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
})
