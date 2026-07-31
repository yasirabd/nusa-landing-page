"use client"

import { forwardRef, type ElementType, type InputHTMLAttributes, type ReactNode } from "react"
import { AlertCircle, Check, Code2, Palette } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import type {
  RegistrationFormValues,
  WizardStep,
} from "@/components/registration/registration-schema"

export function FieldGroup({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-[#134146]/10 bg-[#F7F7F2] p-5 shadow-[0_8px_30px_rgba(19,65,70,0.06)] sm:p-7">
      <div className="space-y-6">{children}</div>
    </div>
  )
}

export function FieldLabel({
  htmlFor,
  children,
  hint,
  required = true,
}: {
  htmlFor?: string
  children: ReactNode
  hint?: string
  required?: boolean
}) {
  return (
    <div className="mb-2.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[#134146]">
        {children}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </label>
      {hint ? (
        <p id={`${htmlFor}-hint`} className="mt-1 text-xs leading-relaxed text-[#134146]/65">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  )
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  icon?: ElementType
  hasError?: boolean
  hasHint?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { id, icon: Icon, hasError, hasHint, className, ...props },
    ref,
  ) {
    const describedBy = [
      hasHint ? `${id}-hint` : null,
      hasError ? `${id}-error` : null,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <div className="relative">
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#134146]/45"
          />
        ) : null}
        <input
          ref={ref}
          id={id}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "min-h-11 w-full rounded-xl border bg-[#F0FAF7] py-3 text-sm font-medium text-[#134146] outline-none placeholder:font-normal placeholder:text-[#134146]/40 focus-visible:border-[#2C8970] focus-visible:ring-2 focus-visible:ring-[#F3B233]",
            Icon ? "pl-11 pr-4" : "px-4",
            hasError ? "border-red-600" : "border-[#134146]/15",
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)

const PROGRAM_OPTIONS = [
  {
    value: "programmer" as const,
    label: "Programmer",
    description: "Coding, backend, software engineering",
    icon: Code2,
  },
  {
    value: "designer" as const,
    label: "Designer",
    description: "UI/UX, visual, creative tech",
    icon: Palette,
  },
]

export function ProgramSelector() {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>()

  return (
    <Controller
      name="pilihanProgram"
      control={control}
      render={({ field }) => (
        <fieldset
          aria-describedby={errors.pilihanProgram ? "pilihanProgram-error" : undefined}
        >
          <legend className="mb-1 text-sm font-semibold text-[#134146]">
            Pilihan Program <span className="text-red-600">*</span>
          </legend>
          <p id="pilihanProgram-hint" className="mb-3 text-xs text-[#134146]/65">
            Pilih jalur studi yang ingin kamu tekuni.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROGRAM_OPTIONS.map((option) => {
              const Icon = option.icon
              const selected = field.value === option.value

              return (
                <label
                  key={option.value}
                  className={cn(
                    "relative flex min-h-28 cursor-pointer flex-col items-start rounded-2xl border-2 p-4 text-left outline-none focus-within:ring-2 focus-within:ring-[#F3B233]",
                    selected
                      ? "border-[#2C8970] bg-[#2C8970]/10"
                      : "border-[#134146]/10 bg-white",
                    errors.pilihanProgram && "border-red-600",
                  )}
                >
                  <input
                    ref={field.ref}
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={selected}
                    onBlur={field.onBlur}
                    onChange={() => field.onChange(option.value)}
                    className="sr-only"
                  />
                  <span className="mb-3 flex w-full items-start justify-between">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#134146]/5 text-[#134146]">
                      <Icon aria-hidden="true" className="size-[18px]" />
                    </span>
                    {selected ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-[#2C8970] text-white">
                        <Check aria-hidden="true" className="size-3" />
                      </span>
                    ) : null}
                  </span>
                  <span className="font-semibold text-[#134146]">{option.label}</span>
                  <span className="mt-1 text-xs leading-snug text-[#134146]/60">
                    {option.description}
                  </span>
                </label>
              )
            })}
          </div>
          <FieldError
            id="pilihanProgram-error"
            message={errors.pilihanProgram?.message}
          />
        </fieldset>
      )}
    />
  )
}

const STEP_LABELS = [
  "Data Calon Santri",
  "Sekolah dan Program",
  "Pembayaran dan Konfirmasi",
] as const

export function RegistrationProgress({ step }: { step: WizardStep }) {
  return (
    <nav aria-label="Progres pendaftaran" className="mb-7">
      <p className="mb-3 text-sm font-semibold text-[#2C8970]">Langkah {step} dari 3</p>
      <ol className="grid grid-cols-3 gap-2">
        {STEP_LABELS.map((label, index) => {
          const number = (index + 1) as WizardStep
          const current = number === step
          const complete = number < step

          return (
            <li key={label} className="min-w-0">
              <span
                aria-current={current ? "step" : undefined}
                className={cn(
                  "block border-t-4 pt-2 text-xs leading-tight",
                  current || complete
                    ? "border-[#2C8970] font-semibold text-[#134146]"
                    : "border-[#134146]/15 text-[#134146]/50",
                )}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
