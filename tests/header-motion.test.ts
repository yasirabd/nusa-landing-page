import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("header motion", () => {
  it("uses scale press feedback only on the primary desktop CTA", () => {
    const source = readFileSync("components/header.tsx", "utf8")
    const pressScales = source.match(/active:scale-\[0\.97\]/g) ?? []

    expect(pressScales).toHaveLength(1)
  })
})
