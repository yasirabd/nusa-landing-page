"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TKPI_QUESTIONS } from "@/utils/data-tkpi"
import { createClient } from "@/utils/supabase/client"
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const ASPECTS = [
  "Motivasi berprestasi",
  "Keteraturan",
  "Kemandirian",
  "Mampu bertahan lama",
  "Keterbukaan",
  "Dominansi",
  "Ketergantungan",
  "Ingin menonjolkan diri",
  "Kecenderungan seksual",
  "Agresivitas"
]

const SESSION_THEMES = [
  { label: "Mengenal Diri", color: "bg-teal-500", text: "text-teal-600", light: "bg-teal-50", hoverBorder: "hover:border-teal-400", hoverBg: "hover:bg-teal-50/50", groupHoverBg: "group-hover:bg-teal-500", groupHoverBorder: "group-hover:border-teal-500" },
  { label: "Cara Berpikir", color: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50", hoverBorder: "hover:border-emerald-400", hoverBg: "hover:bg-emerald-50/50", groupHoverBg: "group-hover:bg-emerald-500", groupHoverBorder: "group-hover:border-emerald-500" },
  { label: "Hubungan Sosial", color: "bg-indigo-500", text: "text-indigo-600", light: "bg-indigo-50", hoverBorder: "hover:border-indigo-400", hoverBg: "hover:bg-indigo-50/50", groupHoverBg: "group-hover:bg-indigo-500", groupHoverBorder: "group-hover:border-indigo-500" },
  { label: "Cara Bekerja", color: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50", hoverBorder: "hover:border-amber-400", hoverBg: "hover:bg-amber-50/50", groupHoverBg: "group-hover:bg-amber-500", groupHoverBorder: "group-hover:border-amber-500" },
  { label: "Respons & Emosi", color: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50", hoverBorder: "hover:border-rose-400", hoverBg: "hover:bg-rose-50/50", groupHoverBg: "group-hover:bg-rose-500", groupHoverBorder: "group-hover:border-rose-500" }
]

function getQuestionId(row: number, col: number) {
  if (col % 2 !== 0) {
    return (col - 1) * 10 + row
  } else {
    return (col - 1) * 10 + (10 - row + 1)
  }
}

function calculateCategory(score: number) {
  if (score <= 5) return "RENDAH"
  if (score <= 9) return "SEDANG"
  if (score <= 13) return "TINGGI"
  return "SANGAT TINGGI"
}

export function KepribadianQuiz({ registrationId, refParam }: { registrationId: string, refParam: string }) {
  const router = useRouter()
  const supabase = createClient()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [isClient, setIsClient] = useState(false)
  const [showInterstitial, setShowInterstitial] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`tkpi_answers_${registrationId}`)
    if (saved) {
      const parsed = JSON.parse(saved)
      setAnswers(parsed)
      const answeredCount = Object.keys(parsed).length
      if (answeredCount > 0 && answeredCount < 100) {
        setCurrentIndex(answeredCount)
      } else if (answeredCount === 100) {
        setCurrentIndex(99) // Let them submit from the last question
      }
    }
    setIsClient(true)
  }, [registrationId])

  if (!isClient) return null // Avoid hydration mismatch

  const sessionIndex = Math.floor(currentIndex / 20)
  const theme = SESSION_THEMES[sessionIndex] || SESSION_THEMES[4]
  const progressPercent = ((currentIndex) / 100) * 100
  
  const question = TKPI_QUESTIONS[currentIndex]

  const handleAnswer = (option: 'A' | 'B') => {
    if (isSubmitting || animatingOut) return

    const newAnswers = { ...answers, [question.id]: option }
    setAnswers(newAnswers)
    localStorage.setItem(`tkpi_answers_${registrationId}`, JSON.stringify(newAnswers))

    setAnimatingOut(true)

    setTimeout(() => {
      setAnimatingOut(false)
      
      if (currentIndex === 99) {
        handleSubmit(newAnswers)
      } else if ((currentIndex + 1) % 20 === 0) {
        // Show interstitial at the end of a session
        setShowInterstitial(true)
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, 400)
  }

  const handleNextSession = () => {
    setShowInterstitial(false)
    setCurrentIndex(prev => prev + 1)
  }

  const handleSubmit = async (finalAnswers: Record<number, 'A' | 'B'>) => {
    setIsSubmitting(true)
    
    // Calculate 10x10 Matrix
    const results = []
    for (let i = 1; i <= 10; i++) {
      let scoreA = 0
      let scoreB = 0

      // Horizontal (A)
      for (let col = 1; col <= 10; col++) {
        if (col === i) continue
        const qId = getQuestionId(i, col)
        if (finalAnswers[qId] === 'A') scoreA++
      }

      // Vertical (B)
      for (let row = 1; row <= 10; row++) {
        if (row === i) continue
        const qId = getQuestionId(row, i)
        if (finalAnswers[qId] === 'B') scoreB++
      }

      const total = scoreA + scoreB
      results.push({
        aspect: ASPECTS[i - 1],
        score_a: scoreA,
        score_b: scoreB,
        total: total,
        category: calculateCategory(total)
      })
    }

    // Save to Supabase
    const { error } = await supabase
      .from('student_tests')
      .update({
        personality_results: results,
        personality_raw_answers: finalAnswers,
        personality_completed_at: new Date().toISOString()
      })
      .eq('registration_id', registrationId)

    if (error) {
      console.error("Failed to save results:", error)
      alert("Gagal menyimpan hasil. Silakan coba lagi.")
      setIsSubmitting(false)
      return
    }

    localStorage.removeItem(`tkpi_answers_${registrationId}`)
    router.refresh()
    router.push(`/test?ref=${refParam}`)
  }

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-nusa-500 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Menyimpan Jawaban...</h2>
        <p className="text-slate-600">Mohon tunggu sebentar, sistem sedang menghitung profil kepribadianmu secara rahasia.</p>
      </div>
    )
  }

  if (showInterstitial) {
    return (
      <div className={cn("rounded-2xl p-8 sm:p-12 text-center animate-in zoom-in-95 duration-500", theme.light)}>
        <div className={cn("inline-flex items-center justify-center p-4 rounded-full mb-6", theme.color)}>
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className={cn("text-3xl font-bold mb-4", theme.text)}>Hebat! Kamu sudah menyelesaikan Sesi {sessionIndex + 1}</h2>
        <p className="text-slate-700 text-lg mb-8 max-w-lg mx-auto">
          Kamu telah menjawab {(sessionIndex + 1) * 20} pertanyaan dengan baik. Tarik napas panjang, rileks, dan mari kita lanjutkan ke sesi berikutnya.
        </p>
        <button
          onClick={handleNextSession}
          className={cn(
            "inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 active:scale-95",
            theme.color
          )}
        >
          Lanjut ke Sesi {sessionIndex + 2} <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Progress Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-4 sm:p-6">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
          <span>Sesi {sessionIndex + 1} dari 5 <span className="hidden sm:inline">({theme.label})</span></span>
          <span>Soal {currentIndex + 1} / 100</span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-700 ease-out", theme.color)}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Body */}
      <div className="p-6 sm:p-10 min-h-[400px] flex flex-col justify-center relative">
        <div 
          key={currentIndex} 
          className={cn(
            "transition-all duration-300",
            animatingOut ? "opacity-0 -translate-x-4" : "animate-in fade-in slide-in-from-right-8"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <button
              onClick={() => handleAnswer('A')}
              disabled={animatingOut}
              className={cn(
                "group relative p-6 sm:p-8 rounded-3xl border-2 text-left transition-all duration-300 w-full overflow-hidden",
                answers[question.id] === 'A' 
                  ? cn("border-transparent shadow-[0_8px_30px_rgba(0,0,0,0.12)] scale-[1.02]", theme.light)
                  : cn("border-slate-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98]", theme.hoverBorder, theme.hoverBg)
              )}
            >
              {/* Animated background glow for selected state */}
              {answers[question.id] === 'A' && (
                <div className={cn("absolute inset-0 opacity-10", theme.color)} />
              )}
              {answers[question.id] === 'A' && (
                <div className={cn("absolute inset-0 border-2 rounded-3xl opacity-50", theme.color.replace('bg-', 'border-'))} />
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all duration-300",
                    answers[question.id] === 'A' 
                      ? cn("text-white shadow-lg", theme.color)
                      : cn("bg-white border-2 border-slate-200 text-slate-400 group-hover:text-white", theme.groupHoverBorder, theme.groupHoverBg)
                  )}>A</div>
                  
                  {answers[question.id] === 'A' && (
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center animate-in zoom-in duration-300", theme.color)}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  )}
                </div>
                
                <p className={cn(
                  "text-lg sm:text-xl font-semibold leading-relaxed transition-colors duration-300",
                  answers[question.id] === 'A' ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                )}>
                  {question.optionA}
                </p>
              </div>
            </button>

            <button
              onClick={() => handleAnswer('B')}
              disabled={animatingOut}
              className={cn(
                "group relative p-6 sm:p-8 rounded-3xl border-2 text-left transition-all duration-300 w-full overflow-hidden",
                answers[question.id] === 'B' 
                  ? cn("border-transparent shadow-[0_8px_30px_rgba(0,0,0,0.12)] scale-[1.02]", theme.light)
                  : cn("border-slate-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98]", theme.hoverBorder, theme.hoverBg)
              )}
            >
              {/* Animated background glow for selected state */}
              {answers[question.id] === 'B' && (
                <div className={cn("absolute inset-0 opacity-10", theme.color)} />
              )}
              {answers[question.id] === 'B' && (
                <div className={cn("absolute inset-0 border-2 rounded-3xl opacity-50", theme.color.replace('bg-', 'border-'))} />
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all duration-300",
                    answers[question.id] === 'B' 
                      ? cn("text-white shadow-lg", theme.color)
                      : cn("bg-white border-2 border-slate-200 text-slate-400 group-hover:text-white", theme.groupHoverBorder, theme.groupHoverBg)
                  )}>B</div>
                  
                  {answers[question.id] === 'B' && (
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center animate-in zoom-in duration-300", theme.color)}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  )}
                </div>
                
                <p className={cn(
                  "text-lg sm:text-xl font-semibold leading-relaxed transition-colors duration-300",
                  answers[question.id] === 'B' ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                )}>
                  {question.optionB}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
