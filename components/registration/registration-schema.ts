import { z } from "zod"

export const MAX_RECEIPT_SIZE = 10 * 1024 * 1024
export const ACCEPTED_RECEIPT_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
] as const
export const REGISTRATION_DRAFT_KEY = "nusa-registration-draft-v1"

const receiptSchema = z
  .custom<File>(
    (file) => typeof File !== "undefined" && file instanceof File,
    "Bukti transfer wajib diupload",
  )
  .refine(
    (file) => ACCEPTED_RECEIPT_TYPES.includes(
      file.type as (typeof ACCEPTED_RECEIPT_TYPES)[number],
    ),
    "Format file harus PNG, JPG, atau PDF",
  )
  .refine((file) => file.size <= MAX_RECEIPT_SIZE, "Ukuran file maksimal 10 MB")

export const registrationSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nomorWhatsapp: z.string().regex(/^62\d{8,13}$/, "Format: 628xxxxxxxxx (diawali 62)"),
  tempatLahir: z.string().min(2, "Tempat lahir wajib diisi"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  asalKota: z.string().min(2, "Asal kota wajib diisi"),
  alamatLengkap: z.string().min(10, "Alamat lengkap minimal 10 karakter"),
  sekolahAsal: z.string().min(3, "Nama sekolah minimal 3 karakter"),
  lokasiSekolah: z.string().min(2, "Lokasi sekolah wajib diisi"),
  sumberInformasi: z.string().min(1, "Pilih sumber informasi"),
  pilihanProgram: z.enum(["programmer", "designer"], {
    errorMap: () => ({ message: "Pilih program terlebih dahulu" }),
  }),
  buktTransfer: receiptSchema,
  pernyataan: z.literal(true, {
    errorMap: () => ({ message: "Pernyataan wajib disetujui untuk melanjutkan" }),
  }),
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>
export type WizardStep = 1 | 2 | 3

export const STEP_FIELDS = {
  1: [
    "namaLengkap",
    "nomorWhatsapp",
    "tempatLahir",
    "tanggalLahir",
    "asalKota",
    "alamatLengkap",
  ],
  2: ["sekolahAsal", "lokasiSekolah", "sumberInformasi", "pilihanProgram"],
  3: ["buktTransfer", "pernyataan"],
} as const satisfies Record<WizardStep, readonly (keyof RegistrationFormValues)[]>

export const DEFAULT_VALUES: Partial<RegistrationFormValues> = {
  namaLengkap: "",
  nomorWhatsapp: "62",
  tempatLahir: "",
  tanggalLahir: "",
  asalKota: "",
  alamatLengkap: "",
  sekolahAsal: "",
  lokasiSekolah: "",
  sumberInformasi: "",
  pilihanProgram: undefined,
  buktTransfer: undefined,
  pernyataan: undefined,
}

const draftValuesSchema = z.object({
  namaLengkap: z.string(),
  nomorWhatsapp: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.string(),
  asalKota: z.string(),
  alamatLengkap: z.string(),
  sekolahAsal: z.string(),
  lokasiSekolah: z.string(),
  sumberInformasi: z.string(),
  pilihanProgram: z.enum(["programmer", "designer"]).optional(),
})

const registrationDraftSchema = z.object({
  version: z.literal(1),
  step: z.union([z.literal(1), z.literal(2)]),
  values: draftValuesSchema,
})

export type RegistrationDraft = z.infer<typeof registrationDraftSchema>

export function createRegistrationDraft(
  values: RegistrationFormValues,
  step: WizardStep,
): RegistrationDraft {
  const { buktTransfer: _file, pernyataan: _consent, ...serializable } = values

  return {
    version: 1,
    step: Math.min(step, 2) as 1 | 2,
    values: serializable,
  }
}

export function parseRegistrationDraft(raw: string | null): RegistrationDraft | null {
  if (!raw) return null

  try {
    const result = registrationDraftSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : null
  } catch {
    return null
  }
}
