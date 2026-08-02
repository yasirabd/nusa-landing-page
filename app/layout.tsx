import type { Metadata } from "next"
import type React from "react"
import "@/app/globals.css"

import { EducationalOrganizationJsonLd } from "@/components/educational-organization-json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/site-config"
import { GeistSans } from "geist/font/sans"
import { DM_Serif_Display, Righteous } from "next/font/google"

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
})

const serifAccent = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-accent",
})

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
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
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.assets.socialImage],
  },
  icons: {
    icon: [
      { url: siteConfig.assets.logo, type: "image/png", sizes: "500x500" },
    ],
    apple: [{ url: siteConfig.assets.logo, sizes: "500x500" }],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <EducationalOrganizationJsonLd />
      </head>
      <body
        className={`${GeistSans.variable} ${righteous.variable} ${serifAccent.variable} font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
