import { RegistrationFormPage } from "@/components/registration-form-page"
import { Header } from "@/components/header"

export const metadata = {
  title: "SPMB 2027/2028 | NUSA Boarding School",
  description:
    "SPMB NUSA Boarding School 2027/2028 sudah dibuka. Isi form pendaftaran calon santri dan selesaikan proses infaq pendaftaran.",
}

export default function DaftarPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1">
        <RegistrationFormPage />
      </main>
    </div>
  )
}
