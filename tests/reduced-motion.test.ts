import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("reduced motion styles", () => {
  it("removes movement from the new sheet and accordion interactions", () => {
    const css = readFileSync("app/globals.css", "utf8")

    expect(css).toContain("scroll-behavior: smooth")
    expect(css).toContain("@media (prefers-reduced-motion: reduce)")
    expect(css).toContain('[data-slot="sheet-content"]')
    expect(css).toContain('[data-slot="sheet-overlay"]')
    expect(css).toContain('[data-slot="accordion-content"]')
    expect(css).toContain('[data-slot="accordion-trigger"] > svg')
  })
})
