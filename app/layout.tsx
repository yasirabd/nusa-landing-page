import type React from "react"
import "@/app/globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Inter, Work_Sans as V0_Font_Work_Sans, Inconsolata as V0_Font_Inconsolata, Noto_Serif as V0_Font_Noto_Serif, Righteous } from 'next/font/google'

// Initialize fonts
const _workSans = V0_Font_Work_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], variable: '--v0-font-work-sans' })
const _inconsolata = V0_Font_Inconsolata({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"], variable: '--v0-font-inconsolata' })
const _notoSerif = V0_Font_Noto_Serif({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], variable: '--v0-font-noto-serif' })
const _v0_fontVariables = `${_workSans.variable} ${_inconsolata.variable} ${_notoSerif.variable}`

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
})

// Load Righteous — no need for globals.css
const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
});

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
      <body className={`${inter.variable} font-sans ${_v0_fontVariables} ${righteous.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
