'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const feeDetails = [
  {
    category: "BIAYA MASUK",
    amount: "20jt",
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
    amount: "2jt",
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
    amount: "1.25jt",
    period: "per semester",
    details: [
      "Program Muslim Tangguh",
      "Program Entrepreneur",
      "Program Ekskul & Kegiatan Santri",
      "Dibayarkan Saat Naik Kelas pada Tahun ke-2 dan ke-3",
    ],
    note: "Dibayar tiap 1 Juli Setiap Tahun"
  }
]

export function FeeInfoSection() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#134146" }}>
            Informasi Biaya
          </h2>
        </div>
        {/* Card Uang Pendaftaran (Premium Highlight) */}
        <div className="max-w-sm mx-auto mb-14">
          <div
            className="relative rounded-2xl p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFF9ED 100%)",
              border: "1.5px solid rgba(227, 178, 81, 0.45)",
            }}
          >
            {/* Ribbon / Badge */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold rounded-full"
              style={{ backgroundColor: "#E3B251", color: "#fff" }}
            >
              BIAYA PENDAFTARAN
            </div>

            <p
              className="text-4xl font-bold mt-2"
              style={{ color: "#2C8970" }}
            >
              Rp 275.000
            </p>

            <p
              className="text-xs mt-4"
              style={{ color: "#134146" }}
            >
              Dibayar saat calon santri mendaftar
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {feeDetails.map((fee, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#B6CB6C]/40 bg-white"
            >

              {/* Category */}
              <div className="mb-6 text-center py-2 rounded-lg font-semibold"
                style={{ backgroundColor: "#2C8970", color: "white" }}>
                {fee.category}
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <p className="text-5xl font-bold" style={{ color: "#2C8970" }}>{fee.amount}</p>
                <p className="mt-1 text-sm font-medium" style={{ color: "#134146" }}>{fee.period}</p>
              </div>

              {/* Highlight */}
              {fee.highlight && (
                <div className="rounded-lg px-4 py-3 mb-6" style={{ backgroundColor: "#FFF5DA" }}>
                  <p className="text-sm font-medium text-center" style={{ color: "#E3B251" }}>
                    {fee.highlight}
                  </p>
                </div>
              )}

              {/* List */}
              <p className="text-sm font-semibold mb-3" style={{ color: "#134146" }}>Termasuk:</p>
              <ul className="space-y-2">
                {fee.details.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#134146" }}>
                    <Check className="w-4 h-4 mt-1" style={{ color: "#B6CB6C" }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Note */}
              {fee.note && (
                <p className="text-xs mt-6 pt-4 border-t" style={{ color: "#2C8970", borderColor: "#E5E5E5" }}>
                  {fee.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="max-w-xl">
          <p className="text-base font-semibold mb-3 text-[#134146]">Informasi Penting:</p>

          <div className="space-y-2">
            {[
              "Program beasiswa untuk santri berprestasi & kurang mampu",
              "Pembayaran dapat diangsur sesuai kebijakan pondok",
              "Konsultasi gratis dengan tim administrasi"
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-[2px] flex-shrink-0 text-[#B6CB6C]" />
                <p className="text-sm text-[#134146] leading-snug">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
