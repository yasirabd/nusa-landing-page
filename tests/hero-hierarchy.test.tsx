import { existsSync, readFileSync } from "node:fs"
import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HeroSection } from "@/components/hero-section"

describe("hero hierarchy", () => {
  it("presents the approved positioning, promotion, and factual trust signals", () => {
    render(<HeroSection />)

    expect(screen.getByText("SPMB 2027/2028 Sudah Dibuka")).toBeVisible()
    expect(screen.getByText("Rp10 juta").closest("p")).toHaveTextContent(
      "Potongan SPI Rp10 juta untuk 10 pendaftar pertama",
    )
    expect(screen.getByText("Boarding School Islami di Kota Semarang")).toBeVisible()
    expect(
      screen.getByRole("heading", { level: 1, name: "Menjadi Muslim Tangguh, Jago IT" }),
    ).toBeVisible()
    expect(
      screen.getByText(
        "Santri menempuh pendidikan kesetaraan SMA sambil memperkuat agama, karakter, dan keterampilan teknologi melalui jalur Programmer atau Designer.",
      ),
    ).toBeVisible()

    for (const fact of [
      "Kesetaraan SMA",
      "Programmer & Designer",
      "Kota Semarang",
    ]) {
      expect(screen.getByText(fact)).toBeVisible()
    }

    const trustList = screen.getByRole("list")
    expect(trustList).toHaveClass(
      "text-white/90",
      "xl:grid-cols-[repeat(3,max-content)]",
      "xl:justify-between",
    )

    for (const item of within(trustList).getAllByRole("listitem")) {
      expect(item).toHaveClass("items-center")
    }
  })

  it("keeps the complete decision message and CTAs before the hero image", () => {
    render(<HeroSection />)

    const orderedElements = [
      screen.getByText("SPMB 2027/2028 Sudah Dibuka"),
      screen.getByText("Boarding School Islami di Kota Semarang"),
      screen.getByRole("heading", { level: 1 }),
      screen.getByText(/Santri menempuh pendidikan kesetaraan SMA/),
      screen.getByRole("link", { name: "Daftar SPMB 2027/2028" }),
      screen.getByRole("link", { name: "Konsultasi via WhatsApp" }),
      screen.getByRole("list"),
      screen.getByRole("img", { name: "Santri NUSA Boarding School" }),
    ]

    for (let index = 0; index < orderedElements.length - 1; index += 1) {
      expect(
        orderedElements[index].compareDocumentPosition(orderedElements[index + 1]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy()
    }
  })

  it("keeps the enrollment capsule compact and separates the offer detail", () => {
    render(<HeroSection />)

    const status = screen.getByText("SPMB 2027/2028 Sudah Dibuka")
    const offer = screen.getByText(
      (_, element) =>
        element?.tagName === "P" &&
        element.textContent === "Potongan SPI Rp10 juta untuk 10 pendaftar pertama",
    )

    expect(status).toHaveClass("rounded-full")
    expect(status.parentElement).toBe(offer.parentElement)
    expect(status).not.toContainElement(offer)
    expect(within(offer).getByText("Rp10 juta")).toHaveClass(
      "font-semibold",
      "text-[#F3B233]",
    )

    const source = readFileSync("components/hero-section.tsx", "utf8")
    expect(source).not.toContain("flex-wrap")
    expect(source).not.toContain(
      'aria-hidden="true" className="hidden text-white/35 sm:inline"',
    )
  })

  it("uses semantic links for registration and WhatsApp without nested buttons", () => {
    render(<HeroSection />)

    const registration = screen.getByRole("link", { name: "Daftar SPMB 2027/2028" })
    expect(registration).toHaveAttribute("href", "/daftar")
    expect(registration).toHaveClass("min-h-12", "focus-visible:ring-2")
    expect(within(registration).queryByRole("button")).not.toBeInTheDocument()

    const consultation = screen.getByRole("link", { name: "Konsultasi via WhatsApp" })
    expect(consultation).toHaveAttribute("href", "https://wa.me/6281392706707")
    expect(consultation).toHaveAttribute("target", "_blank")
    expect(consultation).toHaveAttribute("rel", "noopener noreferrer")
    expect(consultation).toHaveClass("min-h-12", "focus-visible:ring-2")
    expect(within(consultation).queryByRole("button")).not.toBeInTheDocument()
  })

  it("removes the expired promotional widgets and obsolete component", () => {
    render(<HeroSection />)

    expect(screen.queryByText(/Kuota Terbatas/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/IT Expert/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/100% Praktik/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Hari|Jam|Mnt|Dtk/)).not.toBeInTheDocument()

    const source = readFileSync("components/hero-section.tsx", "utf8")
    expect(source).not.toContain("PromoBanner")
    expect(source).not.toContain("whitespace-nowrap")
    expect(source).not.toContain("animate-pulse")
    expect(existsSync("components/promo-banner.tsx")).toBe(false)
  })

  it("uses restrained pointer-aware motion with a reduced-motion fallback", () => {
    const heroSource = readFileSync("components/hero-section.tsx", "utf8")
    const globalStyles = readFileSync("app/globals.css", "utf8")

    expect(heroSource).toContain("hero-action")
    expect(heroSource).not.toContain("transition-all")
    expect(heroSource).not.toContain("duration-300")
    expect(heroSource).not.toContain("duration-500")
    expect(heroSource).not.toContain("duration-700")
    expect(heroSource).not.toContain("group-hover:scale")

    expect(globalStyles).toContain(".hero-action")
    expect(globalStyles).toContain("transition: background-color 150ms")
    expect(globalStyles).toContain("transform: scale(0.97)")

    const finePointerStart = globalStyles.lastIndexOf(
      "@media (hover: hover) and (pointer: fine)",
    )
    const reducedMotionStart = globalStyles.lastIndexOf(
      "@media (prefers-reduced-motion: reduce)",
    )
    const finePointerStyles = globalStyles.slice(finePointerStart, reducedMotionStart)
    const reducedMotionStyles = globalStyles.slice(reducedMotionStart)

    expect(finePointerStart).toBeGreaterThan(-1)
    expect(finePointerStyles).toContain(".hero-action-primary:hover")
    expect(finePointerStyles).toContain(".hero-action-secondary:hover")
    expect(reducedMotionStart).toBeGreaterThan(finePointerStart)
    expect(reducedMotionStyles).toContain(".hero-action:active")
    expect(reducedMotionStyles).toContain("transform: none")
  })
})
