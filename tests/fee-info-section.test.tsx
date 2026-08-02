import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FeeInfoSection } from "@/components/fee-info-section"

describe("FeeInfoSection", () => {
  it("shows the approved entrance-fee promotion", () => {
    render(<FeeInfoSection />)

    expect(screen.getByText("20 Jt")).toHaveClass("line-through")
    expect(screen.getByText("10 Jt")).toBeVisible()
    expect(
      screen.getByText(/DISKON 10 JUTA \(10 Pendaftar Pertama\)/),
    ).toBeVisible()
    expect(screen.queryByText("12 Jt")).not.toBeInTheDocument()
    expect(screen.queryByText(/DISKON 8 JUTA/)).not.toBeInTheDocument()
  })

  it("shows the semester schedule once with the approved wording", () => {
    render(<FeeInfoSection />)

    expect(
      screen.getAllByText(
        "Dibayarkan saat tiap awal semester pada tahun ke-1, ke-2, dan ke-3",
      ),
    ).toHaveLength(1)
    expect(
      screen.queryByText(
        "Dibayarkan saat Tahun ke-1 Semester 2, Tahun ke-2, dan Tahun ke-3",
      ),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Dibayarkan tiap awal semester"),
    ).not.toBeInTheDocument()
  })
})
