"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react"

export function SelesaiButton({ kodeTes }: { kodeTes: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSelesai = async () => {
    setIsSubmitting(true)
    setErrorMsg("")

    try {
      const response = await fetch("/api/complete-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ kode_tes: kodeTes })
      })

      if (!response.ok) {
        throw new Error("Gagal mengirim data")
      }

      setIsSuccess(true)
    } catch (err) {
      console.error(err)
      setErrorMsg("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-[#E6F8F5] to-[#F0FAF7] border border-[#2C8970]/30 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-700 shadow-sm">
        <div className="inline-flex bg-gradient-to-br from-[#2C8970] to-[#134146] rounded-full p-4 mb-5 shadow-[0_8px_20px_rgba(44,137,112,0.3)]">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-black text-[#134146] mb-3 tracking-tight">Pendaftaran Terkirim!</h3>
        <p className="text-[#134146]/80 font-medium">
          Data tes Anda telah kami terima dengan baik. Tim Admin akan segera menghubungi Anda melalui WhatsApp untuk penjadwalan Wawancara.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center mt-8 space-y-4">
      <button
        onClick={handleSelesai}
        disabled={isSubmitting}
        className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-[#134146] hover:bg-[#1F6F68] text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgb(19,65,70,0.3)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-6 h-6 mr-3 animate-spin text-[#42CDBA]" />
            Memproses...
          </>
        ) : (
          <>
            Saya Siap untuk Tahap Wawancara
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform text-[#42CDBA]" />
          </>
        )}
      </button>
      {errorMsg && (
        <p className="text-red-500 font-medium text-sm animate-in fade-in">{errorMsg}</p>
      )}
    </div>
  )
}
