'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

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
    <section id="biaya" className="section-spacing-feature scroll-mt-20 bg-brand-surface px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-brand-dark md:text-5xl">
            Informasi Biaya
          </h2>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-brand-dark opacity-80 sm:text-lg">
            Investasi terbaik untuk membesarkan generasi masa depan yang gemilang berbasis keimanan dan kepakaran teknologi.
          </p>
        </div>

        {/* Premium Horizontal Banner: Uang Pendaftaran */}
        <div className="mb-8 md:mb-10">
          <div
            className="relative flex flex-col items-center justify-between rounded-3xl p-6 shadow-sm transition-shadow duration-[180ms] hover:shadow-xl md:flex-row md:p-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(243,178,51,0.08) 100%)",
              border: "1.5px solid rgba(243, 178, 51, 0.3)",
            }}
          >
            <div className="flex flex-col text-center md:text-left mb-4 md:mb-0">
              <span 
                className="mb-3 inline-block self-center rounded-full bg-brand-accent px-4 py-1.5 text-xs font-bold text-brand-dark shadow-sm md:self-start"
              >
                BIAYA PENDAFTARAN
              </span>
              <p className="text-sm font-semibold text-brand-dark md:text-base">
                Nominal Administrasi
              </p>
              <p className="mt-1 text-xs text-brand-dark opacity-70 md:text-sm">
                Dibayarkan secara penuh saat calon santri melengkapi berkas pendaftaran.
              </p>
            </div>
            <div className="text-center md:text-right flex-shrink-0">
              <p className="text-4xl font-extrabold text-brand md:text-5xl">
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
              className="group relative flex flex-col overflow-hidden rounded-3xl border bg-white p-8 shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:shadow-2xl"
              style={{ borderColor: "rgba(66, 205, 186, 0.40)" }}
            >
              {/* Special Glow Behind Price for Promo */}
              {fee.originalAmount && (
                <div className="pointer-events-none absolute right-0 top-12 h-32 w-32 rounded-full bg-brand-accent opacity-5 blur-3xl"></div>
              )}

              {/* Category Badge */}
              <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-brand px-6 py-1.5 text-sm font-bold tracking-wide text-white shadow-sm">
                  {fee.category}
                </span>
              </div>

              {/* Price Block */}
              <div className="text-center mb-8 relative">
                
                {/* FOMO Ribbon / Strikethrough Box */}
                {fee.originalAmount && fee.promoBadge && (
                  <div className="flex flex-col items-center justify-center mb-1">
                    <span className="mb-3 inline-block whitespace-nowrap rounded-full border border-brand-accent/30 bg-brand-accent/15 px-3 py-1.5 text-[11px] font-bold text-brand-dark shadow-sm lg:text-xs">
                      🔥 {fee.promoBadge}
                    </span>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-red-500/80 line-through text-2xl md:text-3xl font-bold tracking-tight">
                        {fee.originalAmount}
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-5xl font-extrabold tracking-tight text-brand drop-shadow-[0_2px_4px_rgba(66,205,186,0.15)] md:text-6xl">
                  {fee.amount}
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-brand-dark opacity-70">
                  {fee.period}
                </p>
              </div>

              {/* Highlight Box */}
              {fee.highlight && (
                <div className="mb-8 rounded-2xl bg-brand-accent/10 px-4 py-3 shadow-sm">
                  <p className="text-center text-sm font-semibold text-brand-dark">
                    {fee.highlight}
                  </p>
                </div>
              )}

              {/* Base List Box (Fills remaining height so notes align bottom) */}
              <div className="flex-grow flex flex-col">
                <p className="mb-4 text-sm font-bold text-brand-dark">Rincian Termasuk:</p>
                <ul className="space-y-3 mb-8">
                  {fee.details.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-brand-dark opacity-90">
                      <Check className="mt-[1px] h-5 w-5 flex-shrink-0 text-brand-highlight drop-shadow-sm" />
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
            <p className="text-lg font-bold text-brand-dark">Informasi<br className="hidden md:block" />Penting</p>
          </div>
          <div className="w-full h-px md:w-px md:h-12 bg-gray-200"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 w-full">
            {[
              "Program beasiswa untuk santri berprestasi & kurang mampu",
              "Pembayaran dapat diangsur sesuai kebijakan",
              "Konsultasi khusus gratis dengan tim administrasi / CS"
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-highlight" />
                <p className="text-sm font-medium leading-snug text-brand-dark opacity-90">{info}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
