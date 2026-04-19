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
  User,
  Phone,
  MapPin,
  Calendar,
  School,
  GraduationCap,
  Building2,
  Globe,
  HelpCircle,
  Send,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

const schema = z.object({
  // A. Personal Information
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nomorWhatsapp: z.string().regex(/^62\d{8,13}$/, "Format: 628xxxxxxxxx (diawali 62)"),
  tempatLahir: z.string().min(2, "Tempat lahir wajib diisi"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  asalKota: z.string().min(2, "Asal kota wajib diisi"),
  alamatLengkap: z.string().min(10, "Alamat lengkap minimal 10 karakter"),

  // B. School Information
  sekolahAsal: z.string().min(3, "Nama sekolah minimal 3 karakter"),
  lokasiSekolah: z.string().min(2, "Lokasi sekolah wajib diisi"),

  // C. Tambahan Informasi
  sumberInformasi: z.string().min(1, "Pilih sumber informasi"),
  pilihanProgram: z.string().min(1, "Pilih program terlebih dahulu"),

  // D. Pembayaran
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
            className={`relative flex flex-col items-start gap-2 rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 ${selected
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
  icon: Icon,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean; icon?: React.ElementType }) {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none" style={{ color: "rgba(19, 65, 70, 0.4)" }}>
          <Icon size={18} />
        </div>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-xl py-3 text-sm outline-none transition-all duration-200 placeholder:font-normal font-work-sans ${Icon ? "pl-11 pr-4" : "px-4"}`}
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
    </div>
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
      namaLengkap: "",
      nomorWhatsapp: "62",
      tempatLahir: "",
      tanggalLahir: "",
      asalKota: "",
      alamatLengkap: "",
      sekolahAsal: "",
      lokasiSekolah: "",
      sumberInformasi: "",
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
        nama_lengkap: data.namaLengkap,
        nomor_whatsapp: data.nomorWhatsapp,
        tempat_lahir: data.tempatLahir,
        tanggal_lahir: data.tanggalLahir,
        asal_kota: data.asalKota,
        alamat_lengkap: data.alamatLengkap,
        sekolah_asal: data.sekolahAsal,
        lokasi_sekolah: data.lokasiSekolah,
        sumber_informasi: data.sumberInformasi,
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
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-[0_0_30px_rgba(44,137,112,0.2)]"
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
            Data pendaftaran beserta bukti transfer Infaq Anda telah berhasil kami terima.
          </p>
          <p className="text-sm mb-7" style={{ color: "rgba(19,65,70,0.65)" }}>
            Admin NUSA saat ini sedang memverifikasi data Anda. Kami akan segera menghubungi Anda melalui WhatsApp untuk langkah selanjutnya.
          </p>
          <Link href="/">
            <Button
              className="w-full rounded-full py-5 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(44,137,112,0.3)] font-work-sans"
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
            href="https://wa.me/6281392706707"
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

          {/* ── SEKSI A: Informasi Pribadi ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-[1.5px]" style={{ borderColor: "rgba(19, 65, 70, 0.08)" }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: "#2C8970", color: "#F7F7F2" }}>
                <span className="font-bold text-sm font-work-sans">A</span>
              </div>
              <h3 className="text-lg font-bold font-work-sans" style={{ color: "#134146" }}>Informasi Pribadi</h3>
            </div>

            {/* Nama Lengkap */}
            <FormCard>
              <FieldLabel htmlFor="namaLengkap" hint="Tuliskan nama lengkap sesuai akta / ijazah">
                Nama Lengkap <span style={{ color: "#DC2626" }}>*</span>
              </FieldLabel>
              <TextInput
                id="namaLengkap"
                type="text"
                icon={User}
                placeholder="Contoh: Muhammad Abdullah"
                hasError={!!errors.namaLengkap}
                {...register("namaLengkap")}
              />
              <FieldError message={errors.namaLengkap?.message} />
            </FormCard>

            {/* Nomor WhatsApp */}
            <FormCard>
              <FieldLabel htmlFor="nomorWhatsapp" hint="Pastikan nomor aktif dan terhubung WhatsApp">
                Nomor WhatsApp <span style={{ color: "#DC2626" }}>*</span>
              </FieldLabel>
              <div className="relative w-full">
                {/* Smartphone icon only */}
                <div
                  className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none"
                  style={{ color: "rgba(19, 65, 70, 0.45)" }}
                >
                  <Phone size={18} />
                </div>
                <input
                  id="nomorWhatsapp"
                  type="tel"
                  placeholder="628xxxxxxxxxx"
                  className={`w-full rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-all duration-300 placeholder:font-normal font-work-sans font-medium text-[#134146] bg-[#F0FAF7] hover:bg-white focus:bg-white focus:ring-4 focus:ring-[#8EF3E7]/30 border-[1.5px] ${errors.nomorWhatsapp ? "border-[#DC2626]" : "border-[#134146]/12 focus:border-[#42CDBA]"
                    }`}
                  defaultValue="62"
                  {...register("nomorWhatsapp", {
                    onChange: (e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.startsWith("62")) {
                        e.target.value = val;
                      } else if (val.startsWith("0")) {
                        e.target.value = "62" + val.substring(1);
                      } else if (val) {
                        e.target.value = "62" + val;
                      } else {
                        e.target.value = "62";
                      }
                    }
                  })}
                />
              </div>
              <FieldError message={errors.nomorWhatsapp?.message} />
            </FormCard>



            {/* Tempat & Tanggal Lahir */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
              <FormCard className="mb-4 md:mb-0">
                <FieldLabel htmlFor="tempatLahir">
                  Tempat Lahir <span style={{ color: "#DC2626" }}>*</span>
                </FieldLabel>
                <TextInput
                  id="tempatLahir"
                  type="text"
                  icon={MapPin}
                  placeholder="Contoh: Jakarta"
                  hasError={!!errors.tempatLahir}
                  {...register("tempatLahir")}
                />
                <FieldError message={errors.tempatLahir?.message} />
              </FormCard>

              <FormCard>
                <FieldLabel htmlFor="tanggalLahir">
                  Tanggal Lahir <span style={{ color: "#DC2626" }}>*</span>
                </FieldLabel>
                <TextInput
                  id="tanggalLahir"
                  type="date"
                  icon={Calendar}
                  hasError={!!errors.tanggalLahir}
                  {...register("tanggalLahir")}
                />
                <FieldError message={errors.tanggalLahir?.message} />
              </FormCard>
            </div>

            {/* Asal Kota */}
            <FormCard>
              <FieldLabel htmlFor="asalKota">
                Asal Kota / Kabupaten <span style={{ color: "#DC2626" }}>*</span>
              </FieldLabel>
              <TextInput
                id="asalKota"
                type="text"
                icon={Building2}
                placeholder="Contoh: Kota Bandung"
                hasError={!!errors.asalKota}
                {...register("asalKota")}
              />
              <FieldError message={errors.asalKota?.message} />
            </FormCard>

            {/* Alamat Lengkap */}
            <FormCard>
              <FieldLabel htmlFor="alamatLengkap" hint="Tuliskan alamat domisili saat ini dengan lengkap">
                Alamat Lengkap <span style={{ color: "#DC2626" }}>*</span>
              </FieldLabel>
              <div className="relative w-full">
                <div className="absolute left-4 top-3.5 pointer-events-none" style={{ color: "rgba(19, 65, 70, 0.4)" }}>
                  <MapPin size={18} />
                </div>
                <textarea
                  id="alamatLengkap"
                  rows={3}
                  placeholder="Nama jalan, RT/RW, kelurahan, kecamatan..."
                  className={`w-full rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all duration-300 placeholder:font-normal font-work-sans font-medium text-[#134146] bg-[#F0FAF7] hover:bg-white focus:bg-white focus:ring-4 focus:ring-[#8EF3E7]/30 border-[1.5px] resize-none ${errors.alamatLengkap ? "border-[#DC2626]" : "border-[#134146]/12 focus:border-[#42CDBA]"
                    }`}
                  {...register("alamatLengkap")}
                />
              </div>
              <FieldError message={errors.alamatLengkap?.message} />
            </FormCard>
          </div>

          {/* ── SEKSI B: Informasi Sekolah ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-[1.5px]" style={{ borderColor: "rgba(19, 65, 70, 0.08)" }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: "#2C8970", color: "#F7F7F2" }}>
                <span className="font-bold text-sm font-work-sans">B</span>
              </div>
              <h3 className="text-lg font-bold font-work-sans" style={{ color: "#134146" }}>Informasi Sekolah</h3>
            </div>

            <FormCard>
              <FieldLabel htmlFor="sekolahAsal" hint="Nama SMP/MTs asal">
                Sekolah Asal <span style={{ color: "#DC2626" }}>*</span>
              </FieldLabel>
              <TextInput
                id="sekolahAsal"
                type="text"
                icon={School}
                placeholder="Contoh: SMPN 1 Jakarta"
                hasError={!!errors.sekolahAsal}
                {...register("sekolahAsal")}
              />
              <FieldError message={errors.sekolahAsal?.message} />
            </FormCard>

            <FormCard>
              <FieldLabel htmlFor="lokasiSekolah" hint="Kota/Kabupaten dan Provinsi letak sekolah">
                Lokasi Sekolah <span style={{ color: "#DC2626" }}>*</span>
              </FieldLabel>
              <TextInput
                id="lokasiSekolah"
                type="text"
                icon={MapPin}
                placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                hasError={!!errors.lokasiSekolah}
                {...register("lokasiSekolah")}
              />
              <FieldError message={errors.lokasiSekolah?.message} />
            </FormCard>
          </div>

          {/* ── SEKSI C: Tambahan Informasi ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-[1.5px]" style={{ borderColor: "rgba(19, 65, 70, 0.08)" }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: "#2C8970", color: "#F7F7F2" }}>
                <span className="font-bold text-sm font-work-sans">C</span>
              </div>
              <h3 className="text-lg font-bold font-work-sans" style={{ color: "#134146" }}>Tambahan Informasi</h3>
            </div>

            <FormCard>
              <FieldLabel htmlFor="sumberInformasi">
                Darimana kamu tahu tentang NUSA? <span style={{ color: "#DC2626" }}>*</span>
              </FieldLabel>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none" style={{ color: "rgba(19, 65, 70, 0.4)" }}>
                  <HelpCircle size={18} />
                </div>
                <select
                  id="sumberInformasi"
                  className={`w-full rounded-xl pl-11 pr-10 py-3 text-sm outline-none transition-all duration-300 appearance-none font-work-sans font-medium text-[#134146] bg-[#F0FAF7] hover:bg-white focus:bg-white focus:ring-4 focus:ring-[#8EF3E7]/30 border-[1.5px] ${errors.sumberInformasi ? "border-[#DC2626]" : "border-[#134146]/12 focus:border-[#42CDBA]"
                    }`}
                  {...register("sumberInformasi")}
                >
                  <option value="" disabled>Pilih salah satu...</option>
                  <option value="Sosial Media">Sosial Media</option>
                  <option value="Iklan Digital">Iklan Digital (FB/IG, dll)</option>
                  <option value="Iklan Offline">Iklan Offline (Brosur, Spanduk)</option>
                  <option value="Acara Sekolah">Acara Sekolah</option>
                  <option value="Rekomendasi Orangtua/Saudara">Rekomendasi dari Orangtua / Saudara</option>
                  <option value="Rekomendasi Guru/Sekolah">Rekomendasi dari Guru / Sekolah</option>
                  <option value="Teman/Komunitas">Teman / Komunitas</option>
                  <option value="Berita/Media">Berita / Artikel / Media Online</option>
                  <option value="Lainnya">Lainnya</option>
                  <option value="Tidak Ada">Tidak Ada</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none" style={{ color: "#134146" }}>
                  <ChevronDown size={16} />
                </div>
              </div>
              <FieldError message={errors.sumberInformasi?.message} />
            </FormCard>

            {/* Pilihan Program (card selector) */}
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
          </div>

          {/* ── SEKSI D: Pembayaran Pendaftaran ── */}
          <div className="mb-2">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-[1.5px]" style={{ borderColor: "rgba(19, 65, 70, 0.08)" }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: "#2C8970", color: "#F7F7F2" }}>
                <span className="font-bold text-sm font-work-sans">D</span>
              </div>
              <h3 className="text-lg font-bold font-work-sans" style={{ color: "#134146" }}>Pembayaran Pendaftaran</h3>
            </div>

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
                  className={`group flex w-full flex-col items-center justify-center gap-2 rounded-2xl py-8 transition-all duration-300 hover:bg-[#8EF3E7]/10 hover:border-[#42CDBA] hover:shadow-[0_0_20px_rgba(142,243,231,0.2)] active:scale-[0.99] border-2 border-dashed ${errors.buktTransfer ? "border-[#DC2626] bg-[#DC2626]/5" : "border-[#2C8970]/30 bg-[#2C8970]/5"
                    }`}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-[#42CDBA]/20 bg-[#2C8970]/10"
                  >
                    <Upload size={18} className="text-[#2C8970] transition-colors duration-300 group-hover:text-[#1F6F68]" />
                  </span>
                  <span>
                    <p className="text-sm font-semibold text-[#2C8970] transition-colors duration-300 group-hover:text-[#1F6F68]">
                      Klik untuk upload
                    </p>
                    <p className="text-xs mt-0.5 text-[#134146]/45">
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
          </div>

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
          <div className="flex flex-col-reverse sm:flex-row items-center gap-4 pt-6 mt-8 border-t-[1.5px]" style={{ borderColor: "rgba(19, 65, 70, 0.08)" }}>
            <button
              type="button"
              onClick={handleClear}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold transition-colors duration-200 hover:bg-black/5 font-work-sans"
              style={{ color: "rgba(19,65,70,0.6)" }}
            >
              Reset Form
            </button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 rounded-2xl py-7 font-bold text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(44,137,112,0.3)] disabled:opacity-70 disabled:cursor-not-allowed font-work-sans flex items-center justify-center gap-2 group shadow-[0_8px_20px_rgba(44,137,112,0.2)]"
              style={{ backgroundColor: "#2C8970", color: "#F7F7F2" }}
            >
              {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
              <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
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
