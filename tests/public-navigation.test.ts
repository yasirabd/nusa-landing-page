import { describe, expect, it } from "vitest"
import {
  PUBLIC_NAV_ITEMS,
  getPublicNavigationHref,
} from "@/components/public-navigation"

describe("public navigation", () => {
  it("defines the approved destinations in order", () => {
    expect(PUBLIC_NAV_ITEMS).toEqual([
      { label: "Program", sectionId: "program" },
      { label: "Kurikulum", sectionId: "kurikulum" },
      { label: "Kehidupan Santri", sectionId: "kehidupan-santri" },
      { label: "Pengajar", sectionId: "pengajar" },
      { label: "Biaya", sectionId: "biaya" },
      { label: "FAQ", sectionId: "faq" },
    ])
  })

  it("uses local hashes on the homepage", () => {
    expect(getPublicNavigationHref("/", "program")).toBe("#program")
  })

  it("returns to homepage sections from secondary pages", () => {
    expect(getPublicNavigationHref("/daftar", "biaya")).toBe("/#biaya")
  })
})
