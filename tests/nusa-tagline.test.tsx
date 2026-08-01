import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { NUSATaglineSection } from "@/components/nusa-tagline"

describe("NUSA tagline", () => {
  it("uses the approved faith, technology, and purpose statement", () => {
    render(<NUSATaglineSection />)

    expect(screen.getByText(/Rise as a/i)).toBeVisible()
    expect(screen.getByText(/Muslim Tangguh,/)).toBeVisible()
    expect(screen.getByText(/Jago IT\./)).toBeVisible()
    expect(
      screen.getByText("Faith at Heart. Tech in Hand. Purpose in Action."),
    ).toBeVisible()
    expect(
      screen.queryByText("Lead with faith, knowledge, and courage."),
    ).not.toBeInTheDocument()
  })

  it("keeps the approved tagline in a compact standalone interlude", () => {
    const { container } = render(<NUSATaglineSection />)
    const section = container.querySelector("section")

    expect(section).toHaveClass("py-16", "md:py-20", "lg:py-24")
    expect(section).not.toHaveClass("lg:py-48")
    expect(
      screen.getByText("Faith at Heart. Tech in Hand. Purpose in Action."),
    ).toBeVisible()
  })
})
