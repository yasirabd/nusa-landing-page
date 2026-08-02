import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const read = (path: string) => readFileSync(path, "utf8")

describe("landing-page spacing density", () => {
  it("uses the approved balanced section-spacing scale", () => {
    const styles = read("app/globals.css")

    expect(styles).toMatch(
      /\.section-spacing-compact\s*\{\s*padding-block:\s*2\.5rem;/,
    )
    expect(styles).toMatch(
      /\.section-spacing-standard\s*\{\s*padding-block:\s*3\.5rem;/,
    )
    expect(styles).toMatch(
      /\.section-spacing-feature\s*\{\s*padding-block:\s*5rem;/,
    )
    expect(styles).toContain("padding-block: 6.5rem;")
    expect(styles).toContain("padding-block: 8rem;")
    expect(styles).not.toContain("padding-block: 10rem;")
  })

  it("tightens the landing statement without changing its copy", () => {
    const tagline = read("components/nusa-tagline.tsx")

    expect(tagline).toContain("space-y-6 sm:space-y-8 md:space-y-9")
    expect(tagline).not.toContain("space-y-8 sm:space-y-10 md:space-y-12")
    expect(tagline).toContain("Faith at Heart. Tech in Hand. Purpose in Action.")
  })

  it("removes the largest compounding gaps from feature sections", () => {
    const curriculum = read("components/curriculum-section.tsx")
    const program = read("components/program-section.tsx")
    const teaching = read("components/teaching-team-section.tsx")

    expect(curriculum).toContain("mb-12 md:mb-14")
    expect(curriculum).not.toContain("mb-16 md:mb-20")
    expect(program).toContain("mt-12 md:mt-16")
    expect(program).toContain("mt-14 md:mt-20")
    expect(program).toContain("mb-10 md:mb-16 last:mb-0")
    expect(program).not.toMatch(/md:mt-(?:24|32)|md:mb-(?:20|24)/)
    expect(teaching).toContain("mb-10 md:mb-14")
    expect(teaching).not.toContain("mb-16 md:mb-24")
  })

  it("normalizes supporting sections without shrinking controls", () => {
    const faq = read("components/faq-section.tsx")
    const fees = read("components/fee-info-section.tsx")
    const partner = read("components/partner-section.tsx")
    const registration = read("components/registration-section.tsx")
    const footer = read("components/footer.tsx")

    expect(faq).toContain("gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12")
    expect(faq).toContain("py-4")
    expect(fees).toContain("mb-8 md:mb-12")
    expect(partner).toContain("p-6 md:p-8 lg:p-10")
    expect(registration).toContain("p-6")
    expect(registration).toContain("md:p-10")
    expect(registration).toContain("py-7")
    expect(footer).toContain("pt-12")
    expect(footer).toContain("md:pt-16")
    expect(footer).not.toContain("md:pt-24")
  })
})
