"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, KeyRound, Loader2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"

function getRecoveryTokensFromHash() {
  if (typeof window === "undefined") return null

  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash

  if (!hash) return null

  const params = new URLSearchParams(hash)
  const accessToken = params.get("access_token")
  const refreshToken = params.get("refresh_token")
  const type = params.get("type")

  if (!accessToken || !refreshToken || type !== "recovery") {
    return null
  }

  return { accessToken, refreshToken }
}

export function ResetPasswordForm() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    let mounted = true

    async function prepareRecoverySession() {
      const recoveryTokens = getRecoveryTokensFromHash()

      if (recoveryTokens) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: recoveryTokens.accessToken,
          refresh_token: recoveryTokens.refreshToken,
        })

        if (!mounted) return

        if (sessionError) {
          setError("Link reset password tidak valid atau sudah kedaluwarsa.")
          setIsReady(false)
          return
        }

        window.history.replaceState({}, document.title, window.location.pathname)
        setIsReady(true)
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (session) {
        setIsReady(true)
        return
      }

      setError("Session recovery tidak ditemukan. Buka ulang link reset password dari email.")
    }

    void prepareRecoverySession()

    return () => {
      mounted = false
    }
  }, [supabase])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError("Password baru minimal 8 karakter.")
      return
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.")
      return
    }

    setIsSubmitting(true)

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      setError(updateError.message || "Gagal memperbarui password.")
      setIsSubmitting(false)
      return
    }

    setIsSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => {
      router.push("/login")
      router.refresh()
    }, 1500)
  }

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
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2C8970]">
              Password Recovery
            </p>
            <h1 className="text-3xl font-bold text-[#134146]">Atur Ulang Password</h1>
            <p className="text-sm leading-6 text-[#134146]/70">
              Masukkan password baru untuk akun admin Anda. Setelah berhasil, Anda akan diarahkan kembali ke halaman login.
            </p>
          </div>
        </div>

        {error ? (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        {isSuccess ? (
          <div className="flex items-start gap-3 rounded-2xl border border-[#2C8970]/20 bg-[#2C8970]/10 px-4 py-3 text-sm text-[#134146]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2C8970]" />
            <p>Password berhasil diperbarui. Anda akan diarahkan ke halaman login admin.</p>
          </div>
        ) : null}

        {!isReady && !error ? (
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-[#134146]/10 bg-white/80 px-4 py-8 text-sm text-[#134146]/70">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Memverifikasi link reset password...</p>
          </div>
        ) : null}

        {isReady ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#134146]" htmlFor="password">
                Password baru
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#134146]/40" />
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="h-12 rounded-2xl border-[#134146]/12 bg-[#F0FAF7] pl-11 text-[#134146] placeholder:text-[#134146]/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#134146]" htmlFor="confirmPassword">
                Konfirmasi password baru
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#134146]/40" />
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Ulangi password baru"
                  className="h-12 rounded-2xl border-[#134146]/12 bg-[#F0FAF7] pl-11 text-[#134146] placeholder:text-[#134146]/40"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-2xl bg-[#F3B233] font-semibold text-[#134146] shadow-[0_16px_30px_rgba(243,178,51,0.24)] hover:bg-[#e0a42f]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan password...
                </>
              ) : (
                "Simpan Password Baru"
              )}
            </Button>
          </form>
        ) : null}
      </div>
    </div>
  )
}
