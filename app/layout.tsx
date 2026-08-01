import type React from "react"
import "@/app/globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"
import { Noto_Serif, Righteous } from "next/font/google"

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  style: "italic",
  weight: "500",
  variable: "--font-noto-serif",
})

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
})

export const metadata = {
  title: "NUSA Boarding School",
  description:
    "Pendaftaran santri baru NUSA Boarding School Semarang tahun pelajaran 2026-2027. Kurikulum terintegrasi antara pendidikan agama dan teknologi.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body
        className={`${GeistSans.variable} ${notoSerif.variable} ${righteous.variable} font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
