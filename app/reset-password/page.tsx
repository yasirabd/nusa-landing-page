import type { Metadata } from "next"

import { ResetPasswordForm } from "@/components/admin/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password | NUSA Boarding School",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResetPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F0FAF7] px-4 py-16 font-sans">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(19,65,70,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(19,65,70,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#42CDBA]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#F3B233]/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </main>
  )
}
