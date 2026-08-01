import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const publicComponentPaths = [
  "components/header.tsx",
  "components/hero-section.tsx",
  "components/nusa-tagline.tsx",
  "components/why-choose-section.tsx",
  "components/curriculum-section.tsx",
  "components/program-section.tsx",
  "components/teaching-team-section.tsx",
  "components/gallery-section.tsx",
  "components/testimonials-section.tsx",
  "components/fee-info-section.tsx",
  "components/faq-section.tsx",
  "components/partner-section.tsx",
  "components/registration-section.tsx",
  "components/footer.tsx",
]

const publicSource = publicComponentPaths
  .map((path) => readFileSync(path, "utf8"))
  .join("\n")

describe("NUSA public design tokens", () => {
  it("declares the approved semantic palette", () => {
    const styles = readFileSync("app/globals.css", "utf8")

    for (const declaration of [
      "--color-brand: #2c8970;",
      "--color-brand-dark: #134146;",
      "--color-brand-depth: #1f6f68;",
      "--color-brand-accent: #f3b233;",
      "--color-brand-highlight: #42cdba;",
      "--color-brand-surface: #f0faf7;",
      "--color-brand-paper: #f7f7f2;",
    ]) {
      expect(styles).toContain(declaration)
    }
  })

  it("declares compact, standard, and feature section rhythms", () => {
    const styles = readFileSync("app/globals.css", "utf8")

    expect(styles).toMatch(
      /\.section-spacing-compact\s*\{[^}]*padding-block:\s*3rem/s,
    )
    expect(styles).toMatch(
      /\.section-spacing-standard\s*\{[^}]*padding-block:\s*4rem/s,
    )
    expect(styles).toMatch(
      /\.section-spacing-feature\s*\{[^}]*padding-block:\s*4rem/s,
    )
    expect(styles).toContain("@media (min-width: 48rem)")
    expect(styles).toContain("padding-block: 5rem;")
    expect(styles).toContain("padding-block: 6rem;")
  })

  it("removes primary palette literals and local palette maps from public components", () => {
    expect(publicSource).not.toMatch(
      /#(?:134146|2c8970|1f6f68|f3b233|42cdba|f0faf7|f7f7f2)/i,
    )
    expect(publicSource).not.toMatch(/const\s+COLORS\s*=/)
  })

  it("applies semantic section spacing without changing the hero rhythm", () => {
    expect(publicSource).toContain("section-spacing-compact")
    expect(publicSource).toContain("section-spacing-standard")
    expect(publicSource).toContain("section-spacing-feature")

    const hero = readFileSync("components/hero-section.tsx", "utf8")
    expect(hero).toContain("py-10")
    expect(hero).toContain("md:py-12")
    expect(hero).toContain("lg:py-14")
    expect(hero).not.toContain("section-spacing-")
  })

  it("keeps registration, admin, and test-only surfaces outside this migration", () => {
    for (const path of [
      "components/registration-form-page.tsx",
      "components/admin/admin-dashboard.tsx",
      "components/test-programmer-designer.tsx",
    ]) {
      expect(readFileSync(path, "utf8")).toMatch(
        /#(?:134146|2c8970|f3b233|42cdba|f0faf7|f7f7f2)/i,
      )
    }
  })
})
