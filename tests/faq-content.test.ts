import { describe, expect, it } from "vitest"
import { FAQ_ITEMS } from "@/components/faq-content"

describe("FAQ content", () => {
  it("contains the six approved parent questions", () => {
    expect(FAQ_ITEMS).toHaveLength(6)
    expect(FAQ_ITEMS.map(({ id }) => id)).toEqual([
      "jenjang",
      "legalitas",
      "asrama",
      "jurusan",
      "biaya",
      "pendaftaran",
    ])
  })

  it("does not invent legal credentials", () => {
    const legalitas = FAQ_ITEMS.find(({ id }) => id === "legalitas")

    expect(legalitas?.answer).toContain("dokumen resmi")
    expect(legalitas?.answer).toContain("admin NUSA")
    expect(legalitas?.answer).not.toMatch(
      /terakreditasi|nomor izin|ijazah nasional/i,
    )
  })
})
