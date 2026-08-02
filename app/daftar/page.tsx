import type { Metadata } from "next"

import { Header } from "@/components/header"
import { RegistrationFormPage } from "@/components/registration-form-page"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: siteConfig.registration.title,
  description: siteConfig.registration.description,
  alternates: { canonical: "/daftar" },
  openGraph: {
    title: siteConfig.registration.title,
    description: siteConfig.registration.description,
    url: "/daftar",
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: siteConfig.assets.socialImage,
        width: 1200,
        height: 794,
        alt: "Kegiatan santri NUSA Boarding School",
      },
    ],
  },
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
