import { readFileSync } from "node:fs"
import { describe, expect, it }
  from "vitest"

describe("admin year-scoped data", () => {
  it("filters registrations before rendering", () => {
    const source = readFileSync("app/admin/page.tsx", "utf8")

    expect(source).toContain("academic_year")
    expect(source).toContain('.eq("academic_year", academicYear.value)')
  })
})
