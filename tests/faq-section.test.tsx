import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { FAQSection } from "@/components/faq-section"

describe("FAQSection", () => {
  it("renders an anchored accessible FAQ with all questions", () => {
    const { container } = render(<FAQSection />)

    expect(container.querySelector("#faq")).toHaveClass("scroll-mt-20")
    expect(
      screen.getByRole("heading", {
        name: "Pertanyaan yang sering diajukan",
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Jawaban singkat untuk membantu orang tua/),
    ).toHaveClass("text-brand-dark/75")
    expect(screen.getAllByRole("button")).toHaveLength(6)
  })

  it("renders the official legalitas source as an external link", () => {
    render(<FAQSection />)

    fireEvent.click(
      screen.getByRole("button", {
        name: "Bagaimana orang tua dapat memeriksa legalitas pendidikannya?",
      }),
    )

    const source = screen.getByRole("link", {
      name: /Lihat data PKBM Cahaya Hikmah di Kemendikdasmen/i,
    })

    expect(source).toHaveAttribute(
      "href",
      "https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/P9998836",
    )
    expect(source).toHaveAttribute("target", "_blank")
    expect(source).toHaveAttribute("rel", "noreferrer")
  })
})
