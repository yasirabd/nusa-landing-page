"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ArrowLeft,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Code2,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

const schema = z.object({
  nama: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  noWhatsapp: z
    .string()
    .regex(/^62\d{8,13}$/, "Format nomor: 62xxxxxxxxxxx (diawali 62)"),
  pilihanProgram: z.string().min(1, "Pilih program terlebih dahulu"),
  buktTransfer: z
    .any()
    .refine((f) => f instanceof File, "Bukti transfer wajib diupload")
    .refine((f) => f?.size <= MAX_FILE_SIZE, "Ukuran file maksimal 10 MB"),
  pernyataan: z.literal(true, {
    errorMap: () => ({ message: "Pernyataan wajib disetujui untuk melanjutkan" }),
  }),
})

type FormValues = z.infer<typeof schema>

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const PROGRAM_OPTIONS = [
  {
    value: "programmer",
    label: "Programmer",
    description: "Coding, backend, software engineering",
    icon: Code2,
  },
  {
    value: "designer",
    label: "Designer",
    description: "UI/UX, visual, creative tech",
    icon: Palette,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="flex items-center gap-1.5 text-sm mt-2" style={{ color: "#DC2626" }}>
      <AlertCircle size={14} className="shrink-0" />
      {message}
    </p>
  )
}

function FormCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 mb-4 ${className ?? ""}`}
      style={{
        backgroundColor: "#F7F7F2",
        border: "1.5px solid rgba(19, 65, 70, 0.12)",
        boxShadow: "0 2px 8px rgba(19,65,70,0.05)",
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Program Card Selector (replaces dropdown)
// ---------------------------------------------------------------------------
function ProgramSelector({
  value,
  onChange,
  hasError,
}: {
  value: string
  onChange: (v: string) => void
  hasError?: boolean
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PROGRAM_OPTIONS.map((opt) => {
        const Icon = opt.icon
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative flex flex-col items-start gap-2 rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
              selected
                ? "border-2 border-[#8EF3E7] bg-[#2C8970]/10 shadow-[0_0_15px_rgba(142,243,231,0.4)]"
                : hasError
                ? "border-2 border-[#DC2626] bg-[#F7F7F2] shadow-sm"
                : "border-2 border-[#134146]/10 bg-[#F7F7F2] shadow-[0_2px_8px_rgba(19,65,70,0.05)] hover:border-[#2C8970]/50 hover:shadow-[0_12px_24px_rgba(44,137,112,0.15)] hover:bg-[#F0FAF7]"
            }`}
          >
            {/* Selected dot */}
            {selected && (
              <span
                className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "#2C8970" }}
              />
            )}
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                backgroundColor: selected
                  ? "rgba(44,137,112,0.15)"
                  : "rgba(19,65,70,0.06)",
              }}
            >
              <Icon
                size={18}
                style={{ color: selected ? "#2C8970" : "#134146" }}
              />
            </span>
            <span>
              <p
                className="font-semibold text-sm font-work-sans"
                style={{ color: selected ? "#2C8970" : "#134146" }}
              >
                {opt.label}
              </p>
              <p
                className="text-xs mt-0.5 leading-snug"
                style={{ color: "rgba(19,65,70,0.55)" }}
              >
                {opt.description}
              </p>
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Input component
// ---------------------------------------------------------------------------
function TextInput({
  id,
  type = "text",
  placeholder,
  hasError,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:font-normal font-work-sans"
      style={{
        fontWeight: 500,
        backgroundColor: "#F0FAF7",
        border: hasError
          ? "1.5px solid #DC2626"
          : "1.5px solid rgba(19, 65, 70, 0.12)",
        color: "#134146",
      }}
      {...rest}
    />
  )
}

// ---------------------------------------------------------------------------
// Field label
// ---------------------------------------------------------------------------
function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className="mb-3">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold mb-0.5 font-work-sans"
        style={{
          color: "#134146",
        }}
      >
        {children}
      </label>
      {hint && (
        <p
          className="text-xs"
          style={{ color: "rgba(19,65,70,0.55)" }}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export function RegistrationFormPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: "",
      noWhatsapp: "",
      pilihanProgram: "",
      pernyataan: undefined,
    },
  })

  // ── Submit → Supabase ──
  const onSubmit = async (data: FormValues) => {
    setSubmitError(null)
    const supabase = createClient()

    // 1. Upload bukti transfer ke storage bucket
    const file = data.buktTransfer as File
    const fileExt = file.name.split(".").pop()
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("payment_receipts")
      .upload(filePath, file, { upsert: false })

    if (uploadError) {
      setSubmitError("Gagal mengupload bukti transfer. Silakan coba lagi.")
      return
    }

    // 2. Simpan data pendaftaran ke tabel registrations
    const { error: insertError } = await supabase
      .from("registrations")
      .insert({
        nama: data.nama,
        no_whatsapp: data.noWhatsapp,
        pilihan_program: data.pilihanProgram,
        bukti_transfer_url: filePath,
        pernyataan_setuju: true,
        status: "pending",
      })

    if (insertError) {
      setSubmitError("Gagal menyimpan data pendaftaran. Silakan coba lagi.")
      return
    }

    setSubmitted(true)
  }

  const handleClear = () => {
    reset()
    setFilePreview(null)
    setFileName(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setValue("buktTransfer", file, { shouldValidate: true })
    setFileName(file.name)
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (ev) => setFilePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  const removeFile = () => {
    setValue("buktTransfer", undefined as any, { shouldValidate: false })
    setFilePreview(null)
    setFileName(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // ── Success State ──
  if (submitted) {
    return (
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-16"
        style={{ backgroundColor: "#F0FAF7" }}
      >
        {/* Digital Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(142,243,231,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(142,243,231,0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        
        <div
          className="max-w-sm w-full rounded-3xl p-10 text-center"
          style={{
            backgroundColor: "#F7F7F2",
            border: "1.5px solid rgba(19,65,70,0.12)",
            boxShadow: "0 8px 40px rgba(44,137,112,0.12)",
          }}
        >
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(44,137,112,0.1)" }}
          >
            <CheckCircle2 size={38} style={{ color: "#2C8970" }} />
          </div>
          <h2
            className="text-2xl font-bold mb-2 font-work-sans"
            style={{ color: "#134146" }}
          >
            Pendaftaran Berhasil!
          </h2>
          <p className="text-sm mb-1" style={{ color: "rgba(19,65,70,0.65)" }}>
            Data kamu sudah kami terima dengan sukses.
          </p>
          <p className="text-sm mb-7" style={{ color: "rgba(19,65,70,0.65)" }}>
            Admin NUSA akan segera menghubungi kamu melalui WhatsApp untuk konfirmasi pendaftaran.
          </p>
          <div
            className="rounded-xl p-4 mb-7 text-left"
            style={{
              backgroundColor: "rgba(243,178,51,0.1)",
              border: "1.5px solid rgba(243,178,51,0.3)",
              borderLeft: "3px solid #F3B233",
            }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "rgba(19,65,70,0.7)" }}>
              Infaq Pendaftaran
            </p>
            <p className="text-sm font-semibold" style={{ color: "#134146" }}>
              Rp 275.000 → BSI 5579994446
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(19,65,70,0.7)" }}>
              a.n. Sekolah Nurus Sunnah
            </p>
          </div>
          <Link href="/">
            <Button
              className="w-full rounded-full py-5 font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(44,137,112,0.3)]"
              style={{ backgroundColor: "#2C8970", color: "#F7F7F2" }}
            >
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ── Form ──
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#F0FAF7" }}>
      {/* Digital Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(142,243,231,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(142,243,231,0.2) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Sticky mini nav ── */}
      <div
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{
          backgroundColor: "rgba(247,247,242,0.88)",
          borderColor: "rgba(19,65,70,0.08)",
        }}
      >
        <div className="container max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-60 font-work-sans"
            style={{ color: "#2C8970" }}
          >
            <ArrowLeft size={15} />
            Kembali
          </Link>
          <span style={{ color: "rgba(19,65,70,0.2)" }}>|</span>
          <span
            className="text-sm font-semibold font-work-sans"
            style={{ color: "#134146" }}
          >
            Form Pendaftaran
          </span>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 pt-8 pb-20">

        {/* ── Hero Title Block ── */}
        <div className="mb-7">
          {/* Top accent bar */}
          <div
            className="h-1.5 w-16 rounded-full mb-5"
            style={{ backgroundColor: "#F3B233" }}
          />
          <h1
            className="text-3xl font-bold tracking-tight leading-tight mb-2 font-work-sans"
            style={{
              color: "#134146",
            }}
          >
            Form Pendaftaran
          </h1>
          <p className="text-sm" style={{ color: "rgba(19,65,70,0.55)" }}>
            NUSA Boarding School · Tahun Pelajaran 2026/2027
          </p>

          <a
            href="https://wa.me/6281139270707"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 hover:opacity-80 font-work-sans"
            style={{
              backgroundColor: "rgba(19,65,70,0.05)",
              color: "#134146",
              border: "1px solid rgba(19,65,70,0.12)",
            }}
          >
            <div
              className="w-4 h-4 shrink-0"
              style={{
                backgroundColor: "#2B2B2B",
                maskImage: "url(/icons/whatsapp.svg)",
                maskRepeat: "no-repeat",
                maskSize: "contain",
              }}
            />
            Hubungi Ustadz Yasir via WhatsApp
          </a>
        </div>

        {/* Required note */}
        <p className="text-xs mb-5" style={{ color: "rgba(19,65,70,0.45)" }}>
          <span style={{ color: "#DC2626" }}>*</span> Semua field wajib diisi
        </p>

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-0">

          {/* Field 1 — Nama */}
          <FormCard>
            <FieldLabel htmlFor="nama" hint="Tuliskan nama lengkap sesuai akta / ijazah">
              Nama Calon Peserta Didik <span style={{ color: "#DC2626" }}>*</span>
            </FieldLabel>
            <TextInput
              id="nama"
              type="text"
              placeholder="Nama lengkap"
              hasError={!!errors.nama}
              {...register("nama")}
            />
            <FieldError message={errors.nama?.message} />
          </FormCard>

          {/* Field 2 — Nomor WhatsApp */}
          <FormCard>
            <FieldLabel htmlFor="noWhatsapp" hint="Diawali kode negara 62, contoh: 6281392706707">
              Nomor WhatsApp <span style={{ color: "#DC2626" }}>*</span>
            </FieldLabel>
            <TextInput
              id="noWhatsapp"
              type="tel"
              placeholder="62xxxxxxxxxxx"
              hasError={!!errors.noWhatsapp}
              {...register("noWhatsapp")}
            />
            <FieldError message={errors.noWhatsapp?.message} />
          </FormCard>

          {/* Field 3 — Pilihan Program (card selector) */}
          <FormCard>
            <FieldLabel hint="Pilih jalur studi yang ingin kamu tekuni">
              Pilihan Program <span style={{ color: "#DC2626" }}>*</span>
            </FieldLabel>
            <Controller
              name="pilihanProgram"
              control={control}
              render={({ field }) => (
                <ProgramSelector
                  value={field.value}
                  onChange={field.onChange}
                  hasError={!!errors.pilihanProgram}
                />
              )}
            />
            <FieldError message={errors.pilihanProgram?.message} />
          </FormCard>

          {/* Info Box — Pembayaran */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{
              backgroundColor: "rgba(243,178,51,0.1)",
              border: "1.5px solid rgba(243,178,51,0.25)",
              borderLeft: "3px solid #F3B233",
            }}
          >
            <p
              className="font-bold text-sm mb-3 font-work-sans"
              style={{ color: "#134146" }}
            >
              Panduan Pembayaran Infaq Pendaftaran
            </p>
            <p className="text-xs mb-1" style={{ color: "rgba(19,65,70,0.7)" }}>
              Nominal infaq pendaftaran yang harus dibayarkan
            </p>
            <p
              className="text-2xl font-bold mb-4 font-work-sans"
              style={{ color: "#134146" }}
            >
              Rp 275.000
            </p>
            <div
              className="rounded-xl p-3 mb-4"
              style={{ backgroundColor: "rgba(243,178,51,0.15)" }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(19,65,70,0.7)" }}>
                Transfer ke:
              </p>
              <p className="text-sm font-bold" style={{ color: "#134146" }}>
                Bank Syariah Indonesia
              </p>
              <p className="text-lg font-bold tracking-widest mt-0.5" style={{ color: "#134146" }}>
                5579994446
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(19,65,70,0.7)" }}>
                a.n. Sekolah Nurus Sunnah · Kode Bank: 451
              </p>
            </div>
            <p className="text-xs" style={{ color: "rgba(19,65,70,0.7)" }}>
              Setelah transfer, lampirkan <strong>Bukti Transfer</strong> pada field di bawah ini.
            </p>
          </div>

          {/* Field 4 — Upload Bukti Transfer */}
          <FormCard>
            <FieldLabel hint="Upload 1 file (foto/PDF). Maks 10 MB.">
              Upload Bukti Transfer Infaq <span style={{ color: "#DC2626" }}>*</span>
            </FieldLabel>

            {!fileName ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group flex w-full flex-col items-center justify-center gap-2 rounded-2xl py-8 transition-all duration-200 hover:bg-opacity-80 active:scale-[0.99]"
                style={{
                  border: errors.buktTransfer
                    ? "2px dashed #DC2626"
                    : "2px dashed rgba(44,137,112,0.3)",
                  backgroundColor: "rgba(44,137,112,0.03)",
                }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-opacity-90"
                  style={{ backgroundColor: "rgba(44,137,112,0.1)" }}
                >
                  <Upload size={18} style={{ color: "#2C8970" }} />
                </span>
                <span>
                  <p className="text-sm font-semibold" style={{ color: "#2C8970" }}>
                    Klik untuk upload
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(19,65,70,0.45)" }}>
                    PNG, JPG, atau PDF · Maks 10 MB
                  </p>
                </span>
              </button>
            ) : (
              <div
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{
                  backgroundColor: "rgba(44,137,112,0.06)",
                  border: "1.5px solid rgba(44,137,112,0.25)",
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {filePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={filePreview}
                      alt="preview"
                      className="h-12 w-12 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                      style={{ backgroundColor: "rgba(44,137,112,0.12)" }}
                    >
                      <Upload size={18} style={{ color: "#2C8970" }} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "#134146" }}
                    >
                      {fileName}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(19,65,70,0.5)" }}>
                      File terpilih
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-3 shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-red-50"
                  aria-label="Hapus file"
                  style={{ color: "#64748B" }}
                >
                  <X size={15} />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <FieldError message={errors.buktTransfer?.message as string | undefined} />
          </FormCard>

          {/* Field 5 — Pernyataan */}
          <FormCard>
            <p
              className="text-sm font-semibold mb-4 font-work-sans"
              style={{ color: "#134146" }}
            >
              Pernyataan <span style={{ color: "#DC2626" }}>*</span>
            </p>
            <Controller
              name="pernyataan"
              control={control}
              render={({ field }) => (
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={!!field.value}
                      onChange={(e) =>
                        field.onChange(e.target.checked ? true : undefined)
                      }
                      className="sr-only"
                      id="pernyataan"
                    />
                    <div
                      className="h-5 w-5 rounded-md flex items-center justify-center transition-all duration-200"
                      style={{
                        border: errors.pernyataan
                          ? "2px solid #DC2626"
                          : field.value
                          ? "2px solid #2C8970"
                          : "2px solid rgba(19,65,70,0.25)",
                        backgroundColor: field.value ? "#2C8970" : "transparent",
                      }}
                    >
                      {field.value && (
                        <svg viewBox="0 0 12 10" fill="none" className="h-3 w-3">
                          <path
                            d="M1 5l3.5 3.5L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span
                    className="text-sm leading-relaxed select-none"
                    style={{ color: "#134146" }}
                  >
                    Saya setuju dengan pernyataan bahwa{" "}
                    <span className="font-semibold" style={{ color: "#DC2626" }}>
                      &apos;Uang Yang Sudah Ditransfer Tidak Dapat Dikembalikan Dengan
                      Alasan Dan Kondisi Apapun&apos;
                    </span>
                  </span>
                </label>
              )}
            />
            <FieldError message={errors.pernyataan?.message} />
          </FormCard>

          {/* ── Submit Error ── */}
          {submitError && (
            <div
              className="rounded-xl px-4 py-3 mb-2 flex items-center gap-2 text-sm"
              style={{
                backgroundColor: "rgba(220,38,38,0.07)",
                border: "1.5px solid rgba(220,38,38,0.25)",
                color: "#DC2626",
              }}
            >
              <AlertCircle size={15} className="shrink-0" />
              {submitError}
            </div>
          )}

          {/* ── Action Buttons ── */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full px-5 font-semibold text-sm transition-all duration-200 hover:opacity-70 font-work-sans"
                  style={{
                    borderColor: "rgba(19,65,70,0.12)",
                    color: "#134146",
                    backgroundColor: "transparent",
                  }}
                >
                  Back
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full px-8 py-5 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] shadow-[0_6px_20px_rgba(243,178,51,0.3)] hover:shadow-[0_10px_28px_rgba(243,178,51,0.45)] disabled:opacity-60 disabled:cursor-not-allowed font-work-sans"
                style={{
                  backgroundColor: "#F3B233",
                  color: "#134146",
                }}
              >
                {isSubmitting ? "Mengirim..." : "Submit"}
              </Button>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-semibold transition-opacity hover:opacity-50 font-work-sans"
              style={{ color: "rgba(19,65,70,0.4)" }}
            >
              Clear form
            </button>
          </div>
        </form>

        <p
          className="text-center text-xs mt-10"
          style={{ color: "rgba(19,65,70,0.35)" }}
        >
          Data digunakan hanya untuk keperluan pendaftaran NUSA Boarding School.
        </p>
      </div>
    </div>
  )
}
