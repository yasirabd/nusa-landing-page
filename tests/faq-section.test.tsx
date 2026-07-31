import { render, screen } from "@testing-library/react"
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
    ).toHaveClass("text-[#134146]/75")
    expect(screen.getAllByRole("button")).toHaveLength(6)
  })
})
