'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
}

const feeDetails = [
  {
    category: "BIAYA MASUK",
    amount: "12 Jt",
    originalAmount: "20 Jt",
    promoBadge: "DISKON 8 JUTA (10 Pendaftar Pertama)",
    period: "sekali bayar",
    highlight: "Bisa dicicil hingga lulus",
    details: [
      "Biaya Pengembangan Pendidikan",
      "Biaya Organisasi Santri",
      "Sudah Termasuk Uang Semester 1",
      "Pelayanan Kesehatan",
      "Seragam Sekolah",
      "Buku/Modul Pembelajaran",
      "Kebutuhan Asrama"
    ],
    note: "Belum termasuk SPP Bulan Juli 2026"
  },
  {
    category: "UANG BULANAN",
    amount: "2 Jt",
    period: "per bulan",
    details: [
      "Makan 3x Sehari",
      "Fasilitas Kesehatan Dasar",
      "Biaya Pendidikan Bulanan",
      "Biaya Ujian Sekolah atau Ujian Semester",
    ],
    note: "Dibayar paling lambat tanggal 10 setiap bulan"
  },
  {
    category: "UANG SEMESTER",
    amount: "1.25 Jt",
    period: "per semester",
    details: [
      "Program Muslim Tangguh",
      "Program Entrepreneur",
      "Program Ekskul & Kegiatan Santri",
      "Dibayarkan saat Tahun ke-1 Semester 2, Tahun ke-2, dan Tahun ke-3",
    ],
    note: "Dibayarkan tiap awal semester"
  }
]

export function FeeInfoSection() {
  return (
    <section id="biaya" className="scroll-mt-20 py-24 md:py-32 lg:py-40 px-4" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: COLORS.darkBase }}>
            Informasi Biaya
          </h2>
          <p className="text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto opacity-80" style={{ color: COLORS.darkBase }}>
            Investasi terbaik untuk membesarkan generasi masa depan yang gemilang berbasis keimanan dan kepakaran teknologi.
          </p>
        </div>

        {/* Premium Horizontal Banner: Uang Pendaftaran */}
        <div className="mb-8 md:mb-10">
          <div
            className="relative rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(243,178,51,0.08) 100%)",
              border: "1.5px solid rgba(243, 178, 51, 0.3)",
            }}
          >
            <div className="flex flex-col text-center md:text-left mb-4 md:mb-0">
              <span 
                className="inline-block px-4 py-1.5 text-xs font-bold rounded-full mb-3 self-center md:self-start shadow-sm"
                style={{ backgroundColor: COLORS.accent, color: "#fff" }}
              >
                BIAYA PENDAFTARAN
              </span>
              <p className="text-sm md:text-base font-semibold" style={{ color: COLORS.darkBase }}>
                Nominal Administrasi
              </p>
              <p className="text-xs md:text-sm mt-1 opacity-70" style={{ color: COLORS.darkBase }}>
                Dibayarkan secara penuh saat calon santri melengkapi berkas pendaftaran.
              </p>
            </div>
            <div className="text-center md:text-right flex-shrink-0">
              <p className="text-4xl md:text-5xl font-extrabold" style={{ color: COLORS.primary }}>
                Rp 275.000
              </p>
            </div>
          </div>
        </div>

        {/* 3 Bento Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {feeDetails.map((fee, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col rounded-3xl p-8 bg-white border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              style={{ borderColor: "rgba(66, 205, 186, 0.40)" }}
            >
              {/* Special Glow Behind Price for Promo */}
              {fee.originalAmount && (
                <div className="absolute top-12 right-0 w-32 h-32 bg-[#F3B233] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
              )}

              {/* Category Badge */}
              <div className="mb-6 text-center">
                <span className="inline-block py-1.5 px-6 rounded-full font-bold text-sm tracking-wide shadow-sm"
                  style={{ backgroundColor: COLORS.primary, color: "white" }}>
                  {fee.category}
                </span>
              </div>

              {/* Price Block */}
              <div className="text-center mb-8 relative">
                
                {/* FOMO Ribbon / Strikethrough Box */}
                {fee.originalAmount && fee.promoBadge && (
                  <div className="flex flex-col items-center justify-center mb-1">
                    <span className="inline-block whitespace-nowrap px-3 py-1.5 mb-3 text-[11px] lg:text-xs font-bold rounded-full animate-pulse shadow-sm"
                      style={{ backgroundColor: 'rgba(243,178,51,0.15)', color: '#D97706', border: '1px solid rgba(243,178,51,0.3)' }}
                    >
                      🔥 {fee.promoBadge}
                    </span>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-red-500/80 line-through text-2xl md:text-3xl font-black tracking-tight">
                        {fee.originalAmount}
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-5xl md:text-6xl font-extrabold tracking-tight transition-all duration-300 drop-shadow-[0_2px_4px_rgba(66,205,186,0.15)]" style={{ color: COLORS.primary }}>
                  {fee.amount}
                </p>
                <p className="mt-3 text-sm font-bold opacity-70 tracking-wide uppercase" style={{ color: COLORS.darkBase }}>
                  {fee.period}
                </p>
              </div>

              {/* Highlight Box */}
              {fee.highlight && (
                <div className="rounded-2xl px-4 py-3 mb-8 shadow-sm" style={{ backgroundColor: "rgba(243,178,51,0.10)" }}>
                  <p className="text-sm font-semibold text-center" style={{ color: "#D97706" }}>
                    {fee.highlight}
                  </p>
                </div>
              )}

              {/* Base List Box (Fills remaining height so notes align bottom) */}
              <div className="flex-grow flex flex-col">
                <p className="text-sm font-bold mb-4" style={{ color: COLORS.darkBase }}>Rincian Termasuk:</p>
                <ul className="space-y-3 mb-8">
                  {fee.details.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium opacity-90 leading-relaxed" style={{ color: COLORS.darkBase }}>
                      <Check className="w-5 h-5 mt-[1px] flex-shrink-0 drop-shadow-sm" style={{ color: COLORS.secondary }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer Note */}
                <div className="mt-auto pt-5 border-t" style={{ borderColor: 'rgba(19, 65, 70, 0.12)' }}>
                  {fee.note && (
                    <p className="text-xs font-semibold leading-relaxed" style={{ color: 'rgba(19, 65, 70, 0.70)' }}>
                      * {fee.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centralized "Informasi Penting" Ribbon */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-10 border" style={{ backgroundColor: 'white', borderColor: 'rgba(19, 65, 70, 0.08)' }}>
          <div className="flex-shrink-0 text-center md:text-left">
            <p className="text-lg font-bold" style={{ color: COLORS.darkBase }}>Informasi<br className="hidden md:block" />Penting</p>
          </div>
          <div className="w-full h-px md:w-px md:h-12 bg-gray-200"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 w-full">
            {[
              "Program beasiswa untuk santri berprestasi & kurang mampu",
              "Pembayaran dapat diangsur sesuai kebijakan",
              "Konsultasi khusus gratis dengan tim administrasi / CS"
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: COLORS.secondary }} />
                <p className="text-sm font-medium opacity-90 leading-snug" style={{ color: COLORS.darkBase }}>{info}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
