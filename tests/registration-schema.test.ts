import { describe, expect, it } from "vitest"
import {
  ACCEPTED_RECEIPT_TYPES,
  MAX_RECEIPT_SIZE,
  STEP_FIELDS,
  createRegistrationDraft,
  parseRegistrationDraft,
  registrationSchema,
  type RegistrationFormValues,
} from "@/components/registration/registration-schema"

function validValues(
  overrides: Partial<RegistrationFormValues> = {},
): RegistrationFormValues {
  return {
    namaLengkap: "Muhammad Abdullah",
    nomorWhatsapp: "6281234567890",
    tempatLahir: "Semarang",
    tanggalLahir: "2010-01-15",
    asalKota: "Kota Semarang",
    alamatLengkap: "Jalan Pemuda nomor 10, Kota Semarang",
    sekolahAsal: "SMPN 1 Semarang",
    lokasiSekolah: "Kota Semarang, Jawa Tengah",
    sumberInformasi: "Sosial Media",
    pilihanProgram: "programmer",
    buktTransfer: new File(["receipt"], "receipt.pdf", {
      type: "application/pdf",
    }),
    pernyataan: true,
    ...overrides,
  }
}

describe("registration wizard schema", () => {
  it("allocates no more than six fields to each wizard step", () => {
    expect(STEP_FIELDS[1]).toEqual([
      "namaLengkap",
      "nomorWhatsapp",
      "tempatLahir",
      "tanggalLahir",
      "asalKota",
      "alamatLengkap",
    ])
    expect(STEP_FIELDS[2]).toEqual([
      "sekolahAsal",
      "lokasiSekolah",
      "sumberInformasi",
      "pilihanProgram",
    ])
    expect(STEP_FIELDS[3]).toEqual(["buktTransfer", "pernyataan"])

    for (const fields of Object.values(STEP_FIELDS)) {
      expect(fields.length).toBeLessThanOrEqual(6)
    }
  })

  it.each(ACCEPTED_RECEIPT_TYPES)("accepts a %s receipt", (type) => {
    const extension = type === "application/pdf" ? "pdf" : type.split("/")[1]
    const file = new File(["receipt"], `receipt.${extension}`, { type })

    expect(
      registrationSchema.safeParse(validValues({ buktTransfer: file })).success,
    ).toBe(true)
  })

  it("rejects unsupported receipt formats", () => {
    const file = new File(["receipt"], "receipt.txt", { type: "text/plain" })
    const result = registrationSchema.safeParse(validValues({ buktTransfer: file }))

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.buktTransfer).toContain(
        "Format file harus PNG, JPG, atau PDF",
      )
    }
  })

  it("rejects receipts larger than 10 MB", () => {
    const file = new File([new Uint8Array(MAX_RECEIPT_SIZE + 1)], "receipt.pdf", {
      type: "application/pdf",
    })
    const result = registrationSchema.safeParse(validValues({ buktTransfer: file }))

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.buktTransfer).toContain(
        "Ukuran file maksimal 10 MB",
      )
    }
  })

  it("drops receipt and consent from persisted drafts and caps the step", () => {
    const draft = createRegistrationDraft(validValues(), 3)

    expect(draft.values).not.toHaveProperty("buktTransfer")
    expect(draft.values).not.toHaveProperty("pernyataan")
    expect(draft.step).toBe(2)
  })

  it("restores a valid draft and ignores malformed browser data", () => {
    const draft = createRegistrationDraft(validValues(), 2)

    expect(parseRegistrationDraft(JSON.stringify(draft))).toEqual(draft)
    expect(parseRegistrationDraft("not-json")).toBeNull()
    expect(parseRegistrationDraft(JSON.stringify({ version: 99 }))).toBeNull()
  })
})
