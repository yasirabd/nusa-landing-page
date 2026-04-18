import { RegistrationFormPage } from "@/components/registration-form-page"
import { Header } from "@/components/header"

export const metadata = {
  title: "Form Pendaftaran | NUSA Boarding School",
  description:
    "Daftarkan diri kamu sebagai calon santri NUSA Boarding School tahun pelajaran 2026-2027. Isi form pendaftaran dan selesaikan proses infaq pendaftaran.",
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
