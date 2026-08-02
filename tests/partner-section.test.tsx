import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("PartnerSection", () => {
  it("keeps partner logos readable on touch devices", () => {
    const source = readFileSync("components/partner-section.tsx", "utf8")
    const styles = readFileSync("app/globals.css", "utf8")

    expect(source).toContain("partner-logo")
    expect(source).toContain("opacity-75")
    expect(source).not.toContain("hover:grayscale-0 hover:opacity-100")
    expect(styles).toMatch(
      /@media \(hover: hover\) and \(pointer: fine\)[\s\S]*?\.partner-logo:hover/,
    )
  })
})
