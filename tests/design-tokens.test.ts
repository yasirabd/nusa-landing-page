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
      /\.section-spacing-compact\s*\{[\s\S]*?padding-block:\s*2\.5rem/,
    )
    expect(styles).toMatch(
      /\.section-spacing-standard\s*\{[\s\S]*?padding-block:\s*3\.5rem/,
    )
    expect(styles).toMatch(
      /\.section-spacing-feature\s*\{[\s\S]*?padding-block:\s*5rem/,
    )
    expect(styles).toMatch(
      /@media \(min-width: 48rem\)[\s\S]*?\.section-spacing-compact\s*\{[\s\S]*?padding-block:\s*3\.5rem/,
    )
    expect(styles).toMatch(
      /@media \(min-width: 48rem\)[\s\S]*?\.section-spacing-standard\s*\{[\s\S]*?padding-block:\s*4\.5rem/,
    )
    expect(styles).toMatch(
      /@media \(min-width: 48rem\)[\s\S]*?\.section-spacing-feature\s*\{[\s\S]*?padding-block:\s*6\.5rem/,
    )
    expect(styles).toMatch(
      /@media \(min-width: 64rem\)[\s\S]*?\.section-spacing-compact\s*\{[\s\S]*?padding-block:\s*4rem/,
    )
    expect(styles).toMatch(
      /@media \(min-width: 64rem\)[\s\S]*?\.section-spacing-standard\s*\{[\s\S]*?padding-block:\s*5rem/,
    )
    expect(styles).toMatch(
      /@media \(min-width: 64rem\)[\s\S]*?\.section-spacing-feature\s*\{[\s\S]*?padding-block:\s*8rem/,
    )
  })

  it("preserves the Tangguh section color composition", () => {
    expect(readFileSync("components/hero-section.tsx", "utf8")).toContain(
      "var(--color-brand-dark)_0%",
    )
    expect(
      readFileSync("components/teaching-team-section.tsx", "utf8"),
    ).toContain("bg-brand")
    expect(
      readFileSync("components/testimonials-section.tsx", "utf8"),
    ).toContain("bg-brand-dark")

    for (const path of [
      "components/curriculum-section.tsx",
      "components/program-section.tsx",
      "components/fee-info-section.tsx",
    ]) {
      expect(readFileSync(path, "utf8")).toContain("bg-brand-surface")
    }

    for (const path of [
      "components/why-choose-section.tsx",
      "components/faq-section.tsx",
      "components/partner-section.tsx",
    ]) {
      expect(readFileSync(path, "utf8")).toContain("bg-brand-paper")
    }
  })

  it("removes primary palette literals and local palette maps from public components", () => {
    expect(publicSource).not.toMatch(/#[0-9a-f]{6}/i)
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

  it("uses standard spacing for the supporting partner section", () => {
    const partner = readFileSync("components/partner-section.tsx", "utf8")

    expect(partner).toContain("section-spacing-standard")
    expect(partner).not.toContain("section-spacing-feature")
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
