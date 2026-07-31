"use client"

import type { ChangeEvent, RefObject } from "react"
import {
  Building2,
  Calendar,
  ChevronDown,
  HelpCircle,
  MapPin,
  Phone,
  School,
  Upload,
  User,
  X,
} from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import {
  ACCEPTED_RECEIPT_TYPES,
  type RegistrationFormValues,
} from "@/components/registration/registration-schema"
import {
  FieldError,
  FieldGroup,
  FieldLabel,
  ProgramSelector,
  TextInput,
} from "@/components/registration/registration-fields"

function StepHeader({
  headingRef,
  title,
  description,
}: {
  headingRef: RefObject<HTMLHeadingElement>
  title: string
  description: string
}) {
  return (
    <div className="mb-5">
      <h2
        id="registration-step-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-bold tracking-tight text-[#134146] outline-none sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#134146]/65">
        {description}
      </p>
    </div>
  )
}

function FormField({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function PersonalDataStep({
  headingRef,
}: {
  headingRef: RefObject<HTMLHeadingElement>
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>()
  const whatsapp = register("nomorWhatsapp")

  return (
    <section aria-labelledby="registration-step-heading">
      <StepHeader
        headingRef={headingRef}
        title="Data Calon Santri"
        description="Siapkan data identitas calon santri. Bagian ini biasanya selesai dalam sekitar 2 menit."
      />
      <FieldGroup>
        <FormField>
          <FieldLabel
            htmlFor="namaLengkap"
            hint="Tuliskan nama lengkap sesuai akta atau ijazah."
          >
            Nama Lengkap
          </FieldLabel>
          <TextInput
            id="namaLengkap"
            icon={User}
            placeholder="Contoh: Muhammad Abdullah"
            autoComplete="name"
            hasHint
            hasError={!!errors.namaLengkap}
            {...register("namaLengkap")}
          />
          <FieldError id="namaLengkap-error" message={errors.namaLengkap?.message} />
        </FormField>

        <FormField>
          <FieldLabel
            htmlFor="nomorWhatsapp"
            hint="Nomor aktif ini digunakan admin untuk menghubungi keluarga."
          >
            Nomor WhatsApp
          </FieldLabel>
          <TextInput
            id="nomorWhatsapp"
            type="tel"
            inputMode="numeric"
            icon={Phone}
            placeholder="628xxxxxxxxxx"
            autoComplete="tel"
            hasHint
            hasError={!!errors.nomorWhatsapp}
            {...whatsapp}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "")
              event.target.value = digits.startsWith("62")
                ? digits
                : digits.startsWith("0")
                  ? `62${digits.slice(1)}`
                  : digits
                    ? `62${digits}`
                    : "62"
              void whatsapp.onChange(event)
            }}
          />
          <FieldError
            id="nomorWhatsapp-error"
            message={errors.nomorWhatsapp?.message}
          />
        </FormField>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField>
            <FieldLabel htmlFor="tempatLahir">Tempat Lahir</FieldLabel>
            <TextInput
              id="tempatLahir"
              icon={MapPin}
              placeholder="Contoh: Semarang"
              hasError={!!errors.tempatLahir}
              {...register("tempatLahir")}
            />
            <FieldError id="tempatLahir-error" message={errors.tempatLahir?.message} />
          </FormField>
          <FormField>
            <FieldLabel htmlFor="tanggalLahir">Tanggal Lahir</FieldLabel>
            <TextInput
              id="tanggalLahir"
              type="date"
              icon={Calendar}
              hasError={!!errors.tanggalLahir}
              {...register("tanggalLahir")}
            />
            <FieldError
              id="tanggalLahir-error"
              message={errors.tanggalLahir?.message}
            />
          </FormField>
        </div>

        <FormField>
          <FieldLabel htmlFor="asalKota">Asal Kota / Kabupaten</FieldLabel>
          <TextInput
            id="asalKota"
            icon={Building2}
            placeholder="Contoh: Kota Semarang"
            hasError={!!errors.asalKota}
            {...register("asalKota")}
          />
          <FieldError id="asalKota-error" message={errors.asalKota?.message} />
        </FormField>

        <FormField>
          <FieldLabel
            htmlFor="alamatLengkap"
            hint="Tuliskan alamat domisili saat ini dengan lengkap."
          >
            Alamat Lengkap
          </FieldLabel>
          <textarea
            id="alamatLengkap"
            rows={4}
            placeholder="Nama jalan, RT/RW, kelurahan, kecamatan..."
            aria-invalid={!!errors.alamatLengkap || undefined}
            aria-describedby={
              errors.alamatLengkap
                ? "alamatLengkap-hint alamatLengkap-error"
                : "alamatLengkap-hint"
            }
            className={`w-full resize-y rounded-xl border bg-[#F0FAF7] px-4 py-3 text-sm font-medium text-[#134146] outline-none placeholder:font-normal placeholder:text-[#134146]/40 focus-visible:border-[#2C8970] focus-visible:ring-2 focus-visible:ring-[#F3B233] ${
              errors.alamatLengkap ? "border-red-600" : "border-[#134146]/15"
            }`}
            {...register("alamatLengkap")}
          />
          <FieldError
            id="alamatLengkap-error"
            message={errors.alamatLengkap?.message}
          />
        </FormField>
      </FieldGroup>
    </section>
  )
}

export function SchoolProgramStep({
  headingRef,
}: {
  headingRef: RefObject<HTMLHeadingElement>
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>()

  return (
    <section aria-labelledby="registration-step-heading">
      <StepHeader
        headingRef={headingRef}
        title="Sekolah dan Program"
        description="Lengkapi sekolah asal dan pilih jalur belajar yang paling sesuai. Estimasi waktu 1 menit."
      />
      <FieldGroup>
        <FormField>
          <FieldLabel htmlFor="sekolahAsal" hint="Nama SMP atau MTs asal.">
            Sekolah Asal
          </FieldLabel>
          <TextInput
            id="sekolahAsal"
            icon={School}
            placeholder="Contoh: SMPN 1 Semarang"
            hasHint
            hasError={!!errors.sekolahAsal}
            {...register("sekolahAsal")}
          />
          <FieldError id="sekolahAsal-error" message={errors.sekolahAsal?.message} />
        </FormField>

        <FormField>
          <FieldLabel
            htmlFor="lokasiSekolah"
            hint="Kota atau kabupaten dan provinsi sekolah."
          >
            Lokasi Sekolah
          </FieldLabel>
          <TextInput
            id="lokasiSekolah"
            icon={MapPin}
            placeholder="Contoh: Kota Semarang, Jawa Tengah"
            hasHint
            hasError={!!errors.lokasiSekolah}
            {...register("lokasiSekolah")}
          />
          <FieldError
            id="lokasiSekolah-error"
            message={errors.lokasiSekolah?.message}
          />
        </FormField>

        <FormField>
          <FieldLabel htmlFor="sumberInformasi">
            Dari mana kamu tahu tentang NUSA?
          </FieldLabel>
          <div className="relative">
            <HelpCircle
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#134146]/45"
            />
            <select
              id="sumberInformasi"
              aria-invalid={!!errors.sumberInformasi || undefined}
              aria-describedby={
                errors.sumberInformasi ? "sumberInformasi-error" : undefined
              }
              className={`min-h-11 w-full appearance-none rounded-xl border bg-[#F0FAF7] py-3 pl-11 pr-10 text-sm font-medium text-[#134146] outline-none focus-visible:border-[#2C8970] focus-visible:ring-2 focus-visible:ring-[#F3B233] ${
                errors.sumberInformasi ? "border-red-600" : "border-[#134146]/15"
              }`}
              {...register("sumberInformasi")}
            >
              <option value="" disabled>
                Pilih salah satu...
              </option>
              <option value="Sosial Media">Sosial Media</option>
              <option value="Iklan Digital">Iklan Digital (FB/IG, dll)</option>
              <option value="Iklan Offline">Iklan Offline (brosur, spanduk)</option>
              <option value="Acara Sekolah">Acara Sekolah</option>
              <option value="Rekomendasi Orangtua/Saudara">
                Rekomendasi orang tua atau saudara
              </option>
              <option value="Rekomendasi Guru/Sekolah">
                Rekomendasi guru atau sekolah
              </option>
              <option value="Teman/Komunitas">Teman atau komunitas</option>
              <option value="Berita/Media">Berita atau media online</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#134146]"
            />
          </div>
          <FieldError
            id="sumberInformasi-error"
            message={errors.sumberInformasi?.message}
          />
        </FormField>

        <ProgramSelector />
      </FieldGroup>
    </section>
  )
}

export function PaymentConfirmationStep({
  headingRef,
  fileName,
  filePreview,
  onFileChange,
  onRemoveFile,
}: {
  headingRef: RefObject<HTMLHeadingElement>
  fileName: string | null
  filePreview: string | null
  onFileChange(event: ChangeEvent<HTMLInputElement>): void
  onRemoveFile(): void
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>()

  return (
    <section aria-labelledby="registration-step-heading">
      <StepHeader
        headingRef={headingRef}
        title="Pembayaran dan Konfirmasi"
        description="Periksa petunjuk pembayaran, unggah bukti transfer, lalu kirim pendaftaran."
      />
      <div className="space-y-4">
        <div className="rounded-3xl border border-[#F3B233]/35 bg-[#F3B233]/15 p-5 text-[#134146] sm:p-7">
          <h3 className="font-bold">Panduan Pembayaran Infaq Pendaftaran</h3>
          <p className="mt-4 text-xs text-[#134146]/70">Nominal yang harus dibayarkan</p>
          <p className="mt-1 text-3xl font-bold">Rp275.000</p>
          <div className="mt-5 rounded-2xl bg-[#F3B233]/20 p-4">
            <p className="text-xs font-semibold text-[#134146]/70">Transfer ke</p>
            <p className="mt-1 font-bold">Bank Syariah Indonesia</p>
            <p className="mt-1 text-xl font-bold tracking-[0.12em]">5579994446</p>
            <p className="mt-1 text-xs text-[#134146]/70">
              a.n. Sekolah Nurus Sunnah · Kode Bank: 451
            </p>
          </div>
        </div>

        <FieldGroup>
          <FormField>
            <FieldLabel
              htmlFor="buktTransfer"
              hint="PNG, JPG, atau PDF. Ukuran maksimal 10 MB."
            >
              Upload Bukti Transfer
            </FieldLabel>
            <label
              htmlFor="buktTransfer"
              className={`flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center focus-within:ring-2 focus-within:ring-[#F3B233] ${
                errors.buktTransfer
                  ? "border-red-600 bg-red-50"
                  : "border-[#2C8970]/35 bg-[#2C8970]/5"
              }`}
            >
              <Upload aria-hidden="true" className="size-6 text-[#2C8970]" />
              <span className="mt-2 text-sm font-semibold text-[#2C8970]">
                {fileName ?? "Pilih bukti transfer"}
              </span>
              <input
                id="buktTransfer"
                type="file"
                accept={ACCEPTED_RECEIPT_TYPES.join(",")}
                onChange={onFileChange}
                aria-invalid={!!errors.buktTransfer || undefined}
                aria-describedby={
                  errors.buktTransfer
                    ? "buktTransfer-hint buktTransfer-error"
                    : "buktTransfer-hint"
                }
                className="sr-only"
              />
            </label>
            {fileName ? (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#2C8970]/5 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  {filePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={filePreview}
                      alt="Pratinjau bukti transfer"
                      className="size-12 rounded-lg object-cover"
                    />
                  ) : (
                    <Upload aria-hidden="true" className="size-5 text-[#2C8970]" />
                  )}
                  <span className="truncate text-sm font-medium text-[#134146]">
                    {fileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onRemoveFile}
                  aria-label="Hapus bukti transfer"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full text-[#134146]/60 focus-visible:ring-2 focus-visible:ring-[#F3B233]"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
            ) : null}
            <FieldError
              id="buktTransfer-error"
              message={errors.buktTransfer?.message as string | undefined}
            />
          </FormField>

          <Controller
            name="pernyataan"
            control={control}
            render={({ field }) => (
              <div>
                <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl focus-within:ring-2 focus-within:ring-[#F3B233]">
                  <input
                    id="pernyataan"
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(event) =>
                      field.onChange(event.target.checked ? true : undefined)
                    }
                    aria-invalid={!!errors.pernyataan || undefined}
                    aria-describedby={
                      errors.pernyataan ? "pernyataan-error" : undefined
                    }
                    className="mt-1 size-5 shrink-0 accent-[#2C8970]"
                  />
                  <span className="text-sm leading-relaxed text-[#134146]">
                    Saya setuju bahwa uang yang sudah ditransfer tidak dapat
                    dikembalikan dengan alasan dan kondisi apa pun.
                  </span>
                </label>
                <FieldError
                  id="pernyataan-error"
                  message={errors.pernyataan?.message}
                />
              </div>
            )}
          />
        </FieldGroup>
      </div>
    </section>
  )
}
