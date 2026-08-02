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

    expect(legalitas?.answer).toContain("PKBM Cahaya Hikmah")
    expect(legalitas?.answer).toContain("Yayasan Islam Nurus Sunnah")
    expect(legalitas?.sourceLabel).toBe(
      "Lihat data PKBM Cahaya Hikmah di Kemendikdasmen",
    )
    expect(legalitas?.sourceUrl).toBe(
      "https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/P9998836",
    )
    expect(legalitas?.answer).not.toMatch(
      /terakreditasi|nomor izin|ijazah nasional/i,
    )
  })

  it("uses the 2027/2028 registration year", () => {
    const registration = FAQ_ITEMS.find(({ id }) => id === "pendaftaran")

    expect(registration?.question).toContain("2027/2028")
    expect(registration?.question).not.toMatch(/2026[/-]2027/)
  })
})
