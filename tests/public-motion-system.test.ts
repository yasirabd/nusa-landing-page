import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const publicMotionPaths = [
  "components/header.tsx",
  "components/curriculum-section.tsx",
  "components/program-section.tsx",
  "components/teaching-team-section.tsx",
  "components/fee-info-section.tsx",
  "components/partner-section.tsx",
  "components/gallery-section.tsx",
  "components/registration-section.tsx",
  "components/footer.tsx",
]

const publicMotionSource = publicMotionPaths
  .map((path) => readFileSync(path, "utf8"))
  .join("\n")

describe("NUSA public motion system", () => {
  it("uses explicit, fast transitions on public landing components", () => {
    expect(publicMotionSource).not.toContain("transition-all")

    const durations = [
      ...publicMotionSource.matchAll(/duration-(?:\[(\d+)ms\]|(\d+))/g),
    ].map((match) => Number(match[1] ?? match[2]))

    expect(durations.every((duration) => duration <= 250)).toBe(true)
  })

  it("keeps informational surfaces spatially stable", () => {
    expect(publicMotionSource).not.toMatch(/hover:-translate-[xy]/)
    expect(publicMotionSource).not.toMatch(
      /(?:group-)?hover(?:\/[\w-]+)?:scale-/,
    )
    expect(publicMotionSource).not.toMatch(
      /group-hover(?:\/[\w-]+)?:rotate-/,
    )
  })

  it("removes looping promotion motion and false partner affordance", () => {
    expect(publicMotionSource).not.toContain("animate-pulse")

    const partner = readFileSync("components/partner-section.tsx", "utf8")
    expect(partner).not.toContain("cursor-pointer")
  })

  it("preserves reduced-motion fallbacks for press feedback", () => {
    for (const path of [
      "components/header.tsx",
      "components/program-section.tsx",
      "components/gallery-section.tsx",
      "components/registration-section.tsx",
    ]) {
      const source = readFileSync(path, "utf8")
      expect(source).toContain("motion-reduce:transition-none")
    }

    const css = readFileSync("app/globals.css", "utf8")
    expect(css).toContain("@media (prefers-reduced-motion: reduce)")
  })
})
