"use client"

import { useEffect, useState } from "react"
import { Zap, Clock } from "lucide-react"

// ── Config ─────────────────────────────────────────────────────────────────
// Ganti nilai ini saat tanggal deadline promo final sudah tersedia.
const PROMO_TARGET_DATE = new Date("2026-05-15T23:59:59+07:00").getTime()
// ───────────────────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

function calcTimeLeft(): TimeLeft {
  const diff = PROMO_TARGET_DATE - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[36px]">
      <span
        className="text-xl sm:text-2xl font-extrabold leading-none tabular-nums"
        style={{ color: "#F3B233", textShadow: "0 0 8px rgba(243,178,51,0.6)" }}
      >
        {value}
      </span>
      <span className="text-[9px] uppercase tracking-widest font-semibold opacity-70 mt-0.5" style={{ color: "#F7F7F2" }}>
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span
      className="text-xl sm:text-2xl font-extrabold pb-3 opacity-50"
      style={{ color: "#F3B233" }}
    >
      :
    </span>
  )
}

export function PromoCountdown() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setTime(calcTimeLeft())
    const id = setInterval(() => setTime(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border"
      style={{
        background: "rgba(31,111,104,0.55)",
        borderColor: "rgba(243,178,51,0.30)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 16px rgba(243,178,51,0.12), inset 0 0 12px rgba(66,205,186,0.05)",
      }}
    >
      <Clock className="h-4 w-4 shrink-0" style={{ color: "#F3B233" }} />
      <div className="flex items-end gap-1">
        <CountdownUnit value={pad(time.days)} label="Hari" />
        <Separator />
        <CountdownUnit value={pad(time.hours)} label="Jam" />
        <Separator />
        <CountdownUnit value={pad(time.minutes)} label="Mnt" />
        <Separator />
        <CountdownUnit value={pad(time.seconds)} label="Dtk" />
      </div>
    </div>
  )
}

export function PromoBanner() {
  return (
    <div
      className="w-full rounded-2xl mb-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1F6F68 0%, #134146 50%, #134146 100%)",
        border: "1.5px solid rgba(66,205,186,0.35)",
        boxShadow:
          "0 4px 32px rgba(66,205,186,0.15), 0 1px 0 rgba(243,178,51,0.10) inset",
      }}
    >
      {/* Decorative glow blobs */}
      <div
        className="absolute -left-8 -top-8 w-40 h-40 rounded-full opacity-20 blur-2xl pointer-events-none"
        style={{ background: "#42CDBA" }}
      />
      <div
        className="absolute right-4 bottom-0 w-24 h-24 rounded-full opacity-15 blur-2xl pointer-events-none"
        style={{ background: "#F3B233" }}
      />

      {/* Digital grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(66,205,186,1) 1px, transparent 1px), linear-gradient(90deg, rgba(66,205,186,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3 sm:px-6">
        {/* Left: icon + promo text */}
        <div className="flex items-center gap-3">
          <div
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background: "rgba(243,178,51,0.15)",
              border: "1px solid rgba(243,178,51,0.40)",
              boxShadow: "0 0 12px rgba(243,178,51,0.20)",
            }}
          >
            <Zap className="w-5 h-5" style={{ color: "#F3B233", fill: "#F3B233" }} />
          </div>

          <p className="text-sm sm:text-base leading-snug font-medium" style={{ color: "#F7F7F2" }}>
            <span
              className="font-extrabold text-sm sm:text-base uppercase tracking-wide"
              style={{ color: "#F3B233", textShadow: "0 0 10px rgba(243,178,51,0.5)" }}
            >
              PROMO TERBATAS!
            </span>{" "}
            Potongan{" "}
            <span
              className="font-extrabold text-lg sm:text-xl"
              style={{ color: "#F3B233", textShadow: "0 0 10px rgba(243,178,51,0.5)" }}
            >
              Rp 8 JUTA
            </span>{" "}
            untuk{" "}
            <span className="font-bold" style={{ color: "#8EF3E7" }}>
              10 Pendaftar Pertama!
            </span>
          </p>
        </div>

        {/* Right: countdown — rendered only on client via PromoCountdown */}
        <div className="shrink-0">
          <PromoCountdown />
        </div>
      </div>
    </div>
  )
}
