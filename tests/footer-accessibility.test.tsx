import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Footer } from "@/components/footer"

describe("Footer accessibility", () => {
  it("uses Indonesian contact labels and separates the map from its link", () => {
    render(<Footer />)

    expect(screen.getByText("Email")).toBeVisible()
    expect(screen.getByText("Kunjungi Kami")).toBeVisible()
    expect(
      screen.getByRole("link", { name: "Buka di Google Maps" }),
    ).toHaveAttribute(
      "href",
      "https://maps.app.goo.gl/pR3KqRYPf84yrZB36",
    )

    const map = screen.getByTitle("Peta lokasi NUSA Boarding School")
    expect(map.closest("a")).toBeNull()
  })
})
