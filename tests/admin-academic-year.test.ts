import { describe, expect, it } from "vitest"

import {
  buildAdminHref,
  parseAcademicYear,
  parseAdminView,
} from "@/utils/admin-academic-year"

describe("admin academic-year state", () => {
  it("defaults invalid values to the active intake", () => {
    expect(parseAcademicYear(undefined).value).toBe("2027/2028")
    expect(parseAcademicYear("other").slug).toBe("2027-2028")
    expect(parseAdminView("other")).toBe("summary")
  })

  it("accepts the archived intake", () => {
    expect(parseAcademicYear("2026-2027").value).toBe("2026/2027")
    expect(parseAdminView("registrations")).toBe("registrations")
    expect(parseAdminView("academic-years")).toBe("academic-years")
  })

  it("builds links that preserve view and year", () => {
    expect(
      buildAdminHref({
        view: "registrations",
        year: "2026-2027",
        page: "2",
      }),
    ).toBe("/admin?view=registrations&year=2026-2027&page=2")
  })
})
