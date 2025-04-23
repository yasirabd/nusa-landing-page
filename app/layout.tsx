import type React from "react"
import "@/app/globals.css"
import { Work_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
})

export const metadata = {
  title: "NUSA Boarding School Semarang - Penerimaan Santri Baru",
  description:
    "Pendaftaran santri baru NUSA Boarding School Semarang tahun pelajaran 2025-2026. Kurikulum terintegrasi antara pendidikan agama dan teknologi.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${workSans.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
