import { readFileSync } from "node:fs"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HeroSection } from "@/components/hero-section"

function getImageSourcePath(image: HTMLElement) {
  const source = new URL(image.getAttribute("src") ?? "", "http://localhost")

  return source.pathname === "/_next/image" ? source.searchParams.get("url") : source.pathname
}

describe("optimized hero image", () => {
  it("serves the WebP hero with responsive dimensions", () => {
    render(<HeroSection />)

    const image = screen.getByRole("img", { name: "Santri NUSA Boarding School" })
    expect(getImageSourcePath(image)).toBe("/images/nusa-hero-image.webp")
    expect(image).toHaveAttribute("width", "1200")
    expect(image).toHaveAttribute("height", "794")
    expect(image).toHaveAttribute("loading", "eager")
    expect(image).toHaveAttribute("sizes", "(max-width: 1023px) calc(100vw - 2rem), 47vw")
  })

  it("keeps priority loading intent for the LCP image", () => {
    const source = readFileSync("components/hero-section.tsx", "utf8")

    expect(source).toContain('fetchPriority="high"')
    expect(source).not.toContain('src="/images/nusa-hero-image.png"')
  })

  it("provides a responsive source set without runtime optimization", () => {
    const { container } = render(<HeroSection />)
    const source = container.querySelector("picture source[type='image/webp']")

    expect(source).toHaveAttribute(
      "srcset",
      "/images/nusa-hero-image-640.webp 640w, /images/nusa-hero-image.webp 1200w",
    )
    expect(source).toHaveAttribute("sizes", "(max-width: 1023px) calc(100vw - 2rem), 47vw")
  })
})
