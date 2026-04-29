"use client"

import { useState } from "react"
import { ExternalLink, Brain, Palette, Calculator, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function TestProgrammerDesigner({ registrationId, refParam }: { registrationId?: string; refParam?: string }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    designerUiuxScore: "",
    designerMaxUiuxScore: "6430",
    designerColorScore: "",
    programmerIq: "",
    programmerLogical: "",
    programmerNumerical: "",
    programmerSpatial: "",
  })

  const [result, setResult] = useState<{
    tendency: string
    summary: string
    strengths: string
    suggestions: string
    programmerScore: number
    designerScore: number
  } | null>(null)

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // clear error on input change
  }

  const calculateResult = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const uiux = parseFloat(formData.designerUiuxScore)
    const maxUiux = parseFloat(formData.designerMaxUiuxScore)
    const color = parseFloat(formData.designerColorScore)
    const iq = parseFloat(formData.programmerIq)
    const logical = parseFloat(formData.programmerLogical)
    const numerical = parseFloat(formData.programmerNumerical)
    const spatial = parseFloat(formData.programmerSpatial)

    if (
      isNaN(uiux) ||
      isNaN(maxUiux) ||
      isNaN(color) ||
      isNaN(iq) ||
      isNaN(logical) ||
      isNaN(numerical) ||
      isNaN(spatial)
    ) {
      setError("Lengkapi semua field dengan angka yang valid.")
      setIsSubmitting(false)
      return
    }

    if (maxUiux <= 0) {
      setError("Max score Cantunsee harus lebih dari 0.")
      setIsSubmitting(false)
      return
    }

    if (color < 0 || color > 10) {
      setError("Skor Color Matching harus berada dalam rentang 0 hingga 10.")
      setIsSubmitting(false)
      return
    }

    if (logical < 0 || logical > 100 || numerical < 0 || numerical > 100 || spatial < 0 || spatial > 100) {
      setError("Persentase BRGHT harus berada dalam rentang 0 hingga 100.")
      setIsSubmitting(false)
      return
    }

    // Hitung Designer Score
    const uiuxPct = (uiux / maxUiux) * 100
    const colorPct = (color / 10) * 100
    const designerScore = (uiuxPct + colorPct) / 2

    // Hitung Programmer Score
    const programmerScore = (logical + numerical + spatial) / 3

    // Tentukan Kecenderungan
    const delta = programmerScore - designerScore

    let tendency = ""
    let summary = ""
    let strengths = ""
    let suggestions = ""

    if (delta >= 25) {
      tendency = "Strong Programmer"
      summary = "Kamu menunjukkan pola berpikir logis, struktural, dan problem solving yang sangat dominan."
      strengths = "Analitis tajam, logika sekuensial, abstraksi masalah, debugging."
      suggestions = "Eksplorasi algoritma tingkat lanjut, tapi jangan lupa berlatih sense visual/UI dasar agar solusi teknismu juga ramah pengguna (user-friendly)."
    } else if (delta >= 10) {
      tendency = "Programmer"
      summary = "Pola pikir logis dan matematis kamu lebih menonjol dibandingkan insting visual."
      strengths = "Pemecahan masalah, penyusunan struktur logika, keakuratan."
      suggestions = "Perkuat kemampuan koding, sambil sesekali mencoba mengimplementasi UI/UX design sederhana agar wawasan produk lebih luas."
    } else if (delta > -10) {
      tendency = "Balance (Hybrid)"
      summary = "Minat dan potensimu berada di titik keseimbangan antara logika dan visualisasi."
      strengths = "Adaptif, memahami teknis dan estetika sekaligus, empati user tinggi."
      suggestions = "Sangat cocok untuk peran Frontend UI Engineer atau Technical Product Designer. Pilih satu jalur utama untuk difokuskan di awal, lalu bangun skill pendampingnya."
    } else if (delta > -25) {
      tendency = "Designer"
      summary = "Sense visual, tata letak, dan kepekaanmu terhadap warna lebih dominan."
      strengths = "Kreativitas visual, kepekaan UI/UX, empati pada pengalaman pengguna."
      suggestions = "Asah terus kemampuan desain antarmuka, namun belajarlah dasar logika pemrograman agar kolaborasi dengan developer berjalan lebih mulus."
    } else {
      tendency = "Strong Designer"
      summary = "Kamu memiliki intuisi desain, komposisi warna, dan persepsi visual yang sangat kuat."
      strengths = "Mata desain (design eye) yang tajam, konsistensi visual, perhatian terhadap detail pixel."
      suggestions = "Fokus kembangkan keahlian desain UI/UX ke tingkat master. Memahami dasar HTML/CSS sudah sangat cukup sebagai penyeimbang."
    }

    setResult({
      tendency,
      summary,
      strengths,
      suggestions,
      programmerScore: parseFloat(programmerScore.toFixed(1)),
      designerScore: parseFloat(designerScore.toFixed(1)),
    })
    
    // Simpan ke Supabase jika ada registrationId
    if (registrationId) {
      const supabase = createClient()
      const { error: dbError } = await supabase.from("student_tests").update({
        designer_uiux_score: uiux,
        designer_color_score: color,
        programmer_iq: iq,
        programmer_logical: logical,
        programmer_numerical: numerical,
        programmer_spatial: spatial,
        tendency_result: tendency,
        penjurusan_completed_at: new Date().toISOString()
      }).eq("registration_id", registrationId)

      if (dbError) {
        console.error("Gagal menyimpan hasil tes:", dbError)
      }
    }

    setIsSubmitting(false)
    
    // Scroll to results automatically (simple timeout to wait for render)
    setTimeout(() => {
        document.getElementById('analysis-result')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section className="relative bg-[#F7F7F2] py-24 md:py-32 font-work-sans text-[#134146] min-h-screen overflow-hidden">
      {/* Cyber Mesh / Digital Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#134146 1px, transparent 1px), linear-gradient(90deg, #134146 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Soft Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#42CDBA] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C8970] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-5xl">
        {/* Intro */}
        <div className="text-center mb-20 space-y-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-sm font-semibold text-[#2C8970] border border-[#2C8970]/10 shadow-sm mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>Kenali Potensimu Sejak Dini</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-work-sans font-bold text-[#134146] tracking-tight">
            Kamu Tim <span className="text-[#2C8970] relative whitespace-nowrap">Programmer<svg className="absolute -bottom-2 left-0 w-full h-3 text-[#42CDBA]/30" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></span> atau <span className="text-[#F3B233]">Designer?</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#134146]/70 leading-relaxed">
            Cari tahu kecenderungan bakatmu! Uji penalaran logis dan kepekaan visualmu melalui serangkaian tes interaktif.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full text-sm font-medium border border-yellow-200 mt-4">
            <AlertCircle className="w-4 h-4" />
            <span>Hasil adalah indikasi awal, bukan keputusan mutlak.</span>
          </div>
        </div>

        <div className="space-y-8 mb-20">
          <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-[#2C8970]/20 pb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2C8970] text-white text-sm shadow-[0_0_15px_rgba(44,137,112,0.5)]">1</span>
            Kerjakan Tes Berikut
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://cantunsee.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-8 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-2xl border border-[#42CDBA]/10 hover:border-[#42CDBA]/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#42CDBA]/10 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-[#F0FAF7] text-[#2C8970] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Designer UI/UX</h3>
              <p className="text-sm text-[#134146]/70 mb-4 flex-grow">Uji ketajaman matamu dalam membedakan desain UI yang benar dan salah.</p>
              <div className="flex items-center text-[#2C8970] font-semibold text-sm">
                Buka cantunsee.space <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </a>

            <a
              href="https://color.method.ac/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-8 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-2xl border border-[#42CDBA]/10 hover:border-[#42CDBA]/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#42CDBA]/10 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-[#F0FAF7] text-[#2C8970] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Color Matching</h3>
              <p className="text-sm text-[#134146]/70 mb-4 flex-grow">Tes kepekaanmu dalam mencocokkan warna (Hue, Saturation, dll).</p>
              <div className="flex items-center text-[#2C8970] font-semibold text-sm">
                Buka color.method.ac <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </a>

            <a
              href="https://brght.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-8 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-2xl border border-[#42CDBA]/10 hover:border-[#42CDBA]/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#42CDBA]/10 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-[#F0FAF7] text-[#2C8970] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Programmer Logic</h3>
              <p className="text-sm text-[#134146]/70 mb-4 flex-grow">Ukur kemampuan penalaran logis, numerikal, dan spasialmu.</p>
              <div className="flex items-center text-[#2C8970] font-semibold text-sm">
                Buka brght.org <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </a>
          </div>
        </div>

        {/* Input Form */}
        <div className="relative bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-20 overflow-hidden group/form">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-2xl pointer-events-none"></div>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#42CDBA]/30 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-[#134146]">
              <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#F0FAF7] text-[#2C8970] text-lg shadow-inner">📝</span>
              Masukkan Hasil Tes
            </h2>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={calculateResult} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Designer Inputs */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-lg font-bold text-[#134146] mb-4">
                  <Palette className="w-6 h-6 text-[#42CDBA]" />
                  Hasil Tes Designer
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#134146]/80">Skor Akhir UI/UX (cantunsee.space)</label>
                    <input
                      type="number"
                      name="designerUiuxScore"
                      value={formData.designerUiuxScore}
                      onChange={handleInputChange}
                      placeholder="Contoh: 4000"
                      className="w-full px-4 py-3 bg-[#F0FAF7] border border-[#2C8970]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C8970]/50 focus:border-[#2C8970]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#134146]/80">Skor Color Matching (0-10)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="designerColorScore"
                      value={formData.designerColorScore}
                      onChange={handleInputChange}
                      placeholder="Contoh: 8.5"
                      className="w-full px-4 py-3 bg-[#F0FAF7] border border-[#2C8970]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C8970]/50 focus:border-[#2C8970]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Programmer Inputs */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-lg font-bold text-[#134146] mb-4">
                  <Brain className="w-6 h-6 text-[#42CDBA]" />
                  Hasil Tes Programmer
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#134146]/80">IQ Result (brght.org)</label>
                    <input
                      type="number"
                      name="programmerIq"
                      value={formData.programmerIq}
                      onChange={handleInputChange}
                      placeholder="Contoh: 120"
                      className="w-full px-4 py-3 bg-[#F0FAF7] border border-[#2C8970]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C8970]/50 focus:border-[#2C8970]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#134146]/80">Logical Reasoning (%)</label>
                    <input
                      type="number"
                      name="programmerLogical"
                      value={formData.programmerLogical}
                      onChange={handleInputChange}
                      placeholder="Contoh: 90"
                      className="w-full px-4 py-3 bg-[#F0FAF7] border border-[#2C8970]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C8970]/50 focus:border-[#2C8970]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#134146]/80">Numerical Reasoning (%)</label>
                    <input
                      type="number"
                      name="programmerNumerical"
                      value={formData.programmerNumerical}
                      onChange={handleInputChange}
                      placeholder="Contoh: 85"
                      className="w-full px-4 py-3 bg-[#F0FAF7] border border-[#2C8970]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C8970]/50 focus:border-[#2C8970]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#134146]/80">Spatial Reasoning (%)</label>
                    <input
                      type="number"
                      name="programmerSpatial"
                      value={formData.programmerSpatial}
                      onChange={handleInputChange}
                      placeholder="Contoh: 75"
                      className="w-full px-4 py-3 bg-[#F0FAF7] border border-[#2C8970]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C8970]/50 focus:border-[#2C8970]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-8 bg-[#2C8970] text-white rounded-2xl font-bold text-lg hover:bg-[#236b57] transition-all duration-300 shadow-[0_0_20px_rgba(44,137,112,0.3)] hover:shadow-[#2C8970]/40 flex items-center justify-center gap-3 group mt-8 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              {isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin relative z-10" />
              ) : (
                <Calculator className="w-6 h-6 group-hover:rotate-12 transition-transform relative z-10" />
              )}
              <span className="relative z-10">{isSubmitting ? "Memproses..." : "Lihat Analisis Saya"}</span>
            </button>
          </form>
        </div>
      </div>

        {/* Result Area */}
        {result && (
          <div id="analysis-result" className="bg-[#134146] text-white rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(19,65,70,0.3)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 border border-white/10">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#42CDBA 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            {/* Glowing orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#42CDBA] rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F3B233] rounded-full mix-blend-screen filter blur-[80px] opacity-10"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-[#42CDBA] font-bold tracking-widest uppercase mb-2 text-sm">Hasil Analisis Kecenderungan</h2>
                <div className="text-5xl md:text-6xl font-work-sans font-bold text-[#F3B233] mb-6">
                  {result.tendency}
                </div>
                <p className="text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
                  "{result.summary}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#42CDBA]" />
                    Kekuatan Utama
                  </h3>
                  <p className="opacity-90 leading-relaxed">
                    {result.strengths}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#F3B233]" />
                    Saran Pengembangan
                  </h3>
                  <p className="opacity-90 leading-relaxed">
                    {result.suggestions}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 border-t border-white/20 pt-8 mt-8">
                <div className="text-center px-6">
                  <div className="text-sm opacity-70 mb-1">Skor Programmer</div>
                  <div className="text-3xl font-bold font-work-sans text-[#42CDBA]">{result.programmerScore}%</div>
                </div>
                <div className="w-px bg-white/20"></div>
                <div className="text-center px-6">
                  <div className="text-sm opacity-70 mb-1">Skor Designer</div>
                  <div className="text-3xl font-bold font-work-sans text-[#42CDBA]">{result.designerScore}%</div>
                </div>
                <div className="w-px bg-white/20 hidden md:block"></div>
                <div className="text-center px-6">
                  <div className="text-sm opacity-70 mb-1">IQ Result</div>
                  <div className="text-3xl font-bold font-work-sans text-white">{formData.programmerIq}</div>
                </div>
              </div>
              
              {registrationId && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => router.push(`/test?ref=${refParam}`)}
                    className="inline-flex items-center px-8 py-4 bg-white text-[#134146] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Selesai & Kembali ke Dashboard
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              )}


            </div>
          </div>
        )}
      </div>
    </section>
  )
}
