import { AlertCircle, LockKeyhole, Mail } from "lucide-react"

import { loginAdminAction } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Email atau password tidak valid.",
  missing_credentials: "Email dan password wajib diisi.",
  session_required: "Silakan login untuk melanjutkan.",
  unauthorized: "Akun ini tidak memiliki akses admin.",
}

export function AdminLoginForm({ error }: { error?: string }) {
  const errorMessage = error ? ERROR_MESSAGES[error] ?? "Terjadi kesalahan saat login." : null

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#134146]/10 bg-[#F7F7F2] p-8 shadow-[0_20px_60px_rgba(19,65,70,0.08)] md:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(19,65,70,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(19,65,70,0.6) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#42CDBA]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-[#F3B233]/20 blur-3xl" />

      <div className="relative space-y-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2C8970] text-[#F7F7F2] shadow-[0_12px_30px_rgba(44,137,112,0.3)]">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2C8970]">
              Portal Admin
            </p>
            <h1 className="text-3xl font-bold text-[#134146]">Login Dashboard</h1>
            <p className="text-sm leading-6 text-[#134146]/70">
              Akses ini hanya untuk admin NUSA Boarding School yang memiliki akun Supabase dan role admin.
            </p>
          </div>
        </div>

        {errorMessage ? (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        ) : null}

        <form action={loginAdminAction} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#134146]" htmlFor="email">
              Email admin
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#134146]/40" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@nusa.sch.id"
                className="h-12 rounded-2xl border-[#134146]/12 bg-[#F0FAF7] pl-11 text-[#134146] placeholder:text-[#134146]/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#134146]" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#134146]/40" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Masukkan password"
                className="h-12 rounded-2xl border-[#134146]/12 bg-[#F0FAF7] pl-11 text-[#134146] placeholder:text-[#134146]/40"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-2xl bg-[#F3B233] font-semibold text-[#134146] shadow-[0_16px_30px_rgba(243,178,51,0.24)] hover:bg-[#e0a42f]"
          >
            Masuk ke Dashboard
          </Button>
        </form>
      </div>
    </div>
  )
}
