"use client"

import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Send } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RegistrationProgress } from "@/components/registration/registration-fields"
import {
  PaymentConfirmationStep,
  PersonalDataStep,
  SchoolProgramStep,
} from "@/components/registration/registration-steps"
import {
  DEFAULT_VALUES,
  REGISTRATION_DRAFT_KEY,
  STEP_FIELDS,
  createRegistrationDraft,
  parseRegistrationDraft,
  registrationSchema,
  type RegistrationFormValues,
  type WizardStep,
} from "@/components/registration/registration-schema"

export function RegistrationFormPage() {
  const [step, setStep] = useState<WizardStep>(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [draftReady, setDraftReady] = useState(false)
  const [draftRestored, setDraftRestored] = useState(false)
  const formTopRef = useRef<HTMLDivElement>(null)
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const hasChangedStep = useRef(false)

  const methods = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: DEFAULT_VALUES,
    shouldUnregister: false,
  })

  const {
    handleSubmit,
    reset,
    getFieldState,
    getValues,
    setValue,
    setFocus,
    trigger,
    watch,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    const draft = parseRegistrationDraft(localStorage.getItem(REGISTRATION_DRAFT_KEY))
    if (draft) {
      reset({ ...DEFAULT_VALUES, ...draft.values })
      setStep(draft.step)
      setDraftRestored(true)
    }
    setDraftReady(true)
  }, [reset])

  useEffect(() => {
    if (!draftReady) return

    const persistDraft = (values: RegistrationFormValues) => {
      localStorage.setItem(
        REGISTRATION_DRAFT_KEY,
        JSON.stringify(createRegistrationDraft(values, step)),
      )
    }

    persistDraft({ ...DEFAULT_VALUES, ...getValues() } as RegistrationFormValues)
    const subscription = watch((values) => {
      persistDraft({ ...DEFAULT_VALUES, ...values } as RegistrationFormValues)
    })

    return () => subscription.unsubscribe()
  }, [draftReady, getValues, step, watch])

  useEffect(() => {
    if (!hasChangedStep.current) return
    stepHeadingRef.current?.focus({ preventScroll: true })
    formTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" })
  }, [step])

  const goNext = async () => {
    if (step === 3) return
    const valid = await trigger([...STEP_FIELDS[step]], { shouldFocus: true })
    if (!valid) {
      const firstInvalidField = STEP_FIELDS[step].find(
        (field) => getFieldState(field).invalid,
      )
      if (firstInvalidField) setFocus(firstInvalidField)
      return
    }

    hasChangedStep.current = true
    setStep((step + 1) as WizardStep)
  }

  const goBack = () => {
    if (step === 1 || isSubmitting) return
    hasChangedStep.current = true
    setStep((step - 1) as WizardStep)
  }

  const goToStep = (target: 1 | 2) => {
    if (isSubmitting) return
    hasChangedStep.current = true
    setStep(target)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setValue("buktTransfer", file, { shouldDirty: true, shouldValidate: true })
    setFileName(file.name)

    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (loadEvent) => setFilePreview(loadEvent.target?.result as string)
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  const removeFile = () => {
    setValue("buktTransfer", undefined as unknown as File, {
      shouldDirty: true,
      shouldValidate: false,
    })
    setFileName(null)
    setFilePreview(null)
  }

  const resetForm = () => {
    reset(DEFAULT_VALUES)
    localStorage.removeItem(REGISTRATION_DRAFT_KEY)
    setStep(1)
    setFileName(null)
    setFilePreview(null)
    setSubmitError(null)
    setDraftRestored(false)
  }

  const onSubmit = async (data: RegistrationFormValues) => {
    if (step !== 3) return

    setSubmitError(null)
    const supabase = createClient()
    const file = data.buktTransfer
    const fileExtension = file.name.split(".").pop() || "bin"
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExtension}`

    const { error: uploadError } = await supabase.storage
      .from("payment_receipts")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      setSubmitError(
        `Gagal mengupload bukti transfer: ${uploadError.message}. Silakan coba lagi.`,
      )
      return
    }

    const kodeTes = Math.random().toString(36).substring(2, 8).toUpperCase()
    const { error: insertError } = await supabase.from("registrations").insert({
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
      status: "mendaftar",
      kode_tes: kodeTes,
    })

    if (insertError) {
      try {
        await supabase.storage.from("payment_receipts").remove([filePath])
      } catch {
        // Keep the database error as the actionable message for the applicant.
      }
      setSubmitError(
        `Gagal menyimpan data pendaftaran: ${insertError.message}. Silakan coba lagi.`,
      )
      return
    }

    localStorage.removeItem(REGISTRATION_DRAFT_KEY)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#F0FAF7] px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-[#134146]/10 bg-[#F7F7F2] p-8 text-center shadow-[0_16px_50px_rgba(44,137,112,0.12)] sm:p-10">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-[#2C8970]/10 text-[#2C8970]">
            <CheckCircle2 aria-hidden="true" className="size-10" />
          </div>
          <h2 className="text-2xl font-bold text-[#134146]">Pendaftaran Berhasil!</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#134146]/65">
            Data dan bukti transfer telah diterima. Admin NUSA akan menghubungi Anda
            melalui WhatsApp untuk langkah berikutnya.
          </p>
          <Button asChild className="mt-7 min-h-12 w-full rounded-full bg-[#2C8970]">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleFormKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (step === 3 || event.key !== "Enter") return
    if (event.target instanceof HTMLTextAreaElement) return
    event.preventDefault()
  }

  return (
    <div className="relative bg-[#F0FAF7]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(19,65,70,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(19,65,70,0.28) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-7">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-[#2C8970] outline-none focus-visible:ring-2 focus-visible:ring-[#F3B233]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Kembali ke Beranda
          </Link>
          <div className="mt-5 h-1.5 w-16 rounded-full bg-[#F3B233]" />
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#134146] sm:text-4xl">
            Form Pendaftaran
          </h1>
          <p className="mt-2 text-sm text-[#134146]/65">
            NUSA Boarding School · SPMB 2027/2028
          </p>
          <a
            href="https://wa.me/6281392706707"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[#134146]/15 bg-[#F7F7F2] px-4 text-xs font-semibold text-[#134146] outline-none focus-visible:ring-2 focus-visible:ring-[#F3B233]"
          >
            Butuh bantuan? Hubungi Ustadz Yasir
          </a>
        </div>

        <div ref={formTopRef} className="scroll-mt-28">
          <RegistrationProgress step={step} />

          {draftRestored ? (
            <p
              role="status"
              className="mb-5 rounded-xl border border-[#2C8970]/20 bg-[#2C8970]/8 px-4 py-3 text-sm text-[#134146]"
            >
              {step === 3
                ? "Draft pendaftaran dipulihkan. Demi keamanan, pilih kembali bukti transfer sebelum mengirim pendaftaran."
                : "Draft pendaftaran dipulihkan. Silakan lanjutkan dari data terakhir."}
            </p>
          ) : null}

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={handleFormKeyDown}
              noValidate
            >
              {step === 1 ? <PersonalDataStep headingRef={stepHeadingRef} /> : null}
              {step === 2 ? <SchoolProgramStep headingRef={stepHeadingRef} /> : null}
              {step === 3 ? (
                <PaymentConfirmationStep
                  headingRef={stepHeadingRef}
                  fileName={fileName}
                  filePreview={filePreview}
                  onFileChange={handleFileChange}
                  onRemoveFile={removeFile}
                  onEdit={goToStep}
                  isSubmitting={isSubmitting}
                />
              ) : null}

              {submitError ? (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-red-600/25 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {submitError}
                </div>
              ) : null}

              <div
                className="registration-actions sticky bottom-0 z-20 -mx-4 mt-7 flex flex-col-reverse gap-3 border-t border-[#134146]/10 bg-[#F0FAF7]/95 px-4 pt-4 backdrop-blur-sm sm:static sm:mx-0 sm:flex-row sm:items-center sm:bg-transparent sm:px-0 sm:pt-5 sm:backdrop-blur-none"
              >
                {step === 1 ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        className="registration-action min-h-11 rounded-xl px-5 text-sm font-semibold text-[#134146]/60 focus-visible:ring-2 focus-visible:ring-[#F3B233]"
                      >
                        Reset Form
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-[#134146]/10 bg-[#F7F7F2] text-[#134146] motion-reduce:animate-none">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus data pendaftaran?</AlertDialogTitle>
                        <AlertDialogDescription className="text-[#134146]/65">
                          Semua data yang sudah diisi dan draft yang tersimpan di browser
                          akan dihapus.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={resetForm}
                          className="bg-red-700 text-white hover:bg-red-800"
                        >
                          Ya, hapus data
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={isSubmitting}
                    aria-label={
                      step === 2
                        ? "Kembali ke Data Calon Santri"
                        : "Kembali ke Sekolah dan Program"
                    }
                    className="registration-action registration-action-secondary min-h-12 rounded-xl border border-[#134146]/15 bg-[#F7F7F2] px-5 text-sm font-semibold text-[#134146] focus-visible:ring-2 focus-visible:ring-[#F3B233] disabled:opacity-50"
                  >
                    Kembali
                  </button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    aria-label={
                      step === 1
                        ? "Lanjutkan ke Sekolah dan Program"
                        : "Lanjutkan ke Pembayaran dan Konfirmasi"
                    }
                    className="registration-action registration-action-primary min-h-12 flex-1 rounded-xl bg-[#2C8970] text-base font-bold text-white"
                  >
                    Lanjutkan
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    aria-live="polite"
                    className="registration-action registration-action-primary min-h-12 flex-1 rounded-xl bg-[#2C8970] text-base font-bold text-white"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                    <Send aria-hidden="true" className="size-[18px]" />
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>

          <p className="mt-8 text-center text-xs text-[#134146]/55">
            Data digunakan hanya untuk keperluan pendaftaran NUSA Boarding School.
          </p>
        </div>
      </div>
    </div>
  )
}
