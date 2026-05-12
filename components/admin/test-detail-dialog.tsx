"use client"

import { useState } from "react"
import {
  CircleDot,
  Code2,
  Eye,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type PersonalityResult = {
  aspect?: string | null
  score_a?: number | null
  score_b?: number | null
  total?: number | null
  category?: string | null
}

type TestData = {
  personality_completed_at: string | null
  personality_results: PersonalityResult[] | null
  penjurusan_completed_at: string | null
  designer_uiux_score: number | null
  designer_color_score: number | null
  programmer_iq: number | null
  programmer_logical: number | null
  programmer_numerical: number | null
  programmer_spatial: number | null
  tendency_result: string | null
}

const DEFAULT_UIUX_MAX_SCORE = 6430

function fmt(value: number | null | undefined, suffix = "") {
  if (typeof value !== "number" || Number.isNaN(value)) return "-"
  return `${Number.isInteger(value) ? value : value.toFixed(1)}${suffix}`
}

function categoryColor(category: string | null | undefined) {
  switch (category) {
    case "SANGAT TINGGI":
      return "text-[#2C8970] bg-[#2C8970]/10 border-[#2C8970]/20"
    case "TINGGI":
      return "text-[#42CDBA] bg-[#42CDBA]/15 border-[#42CDBA]/25"
    case "SEDANG":
      return "text-[#F3B233] bg-[#F3B233]/15 border-[#F3B233]/30"
    case "RENDAH":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-[#134146]/60 bg-[#134146]/5 border-[#134146]/10"
  }
}
const ASPECT_DEFINITIONS = [
  { name: 'Motivasi berprestasi', desc: 'Kondisi seseorang untuk berkeinginan berprestasi dalam belajar', type: 'positive' },
  { name: 'Keteraturan', desc: 'Kondisi seseorang untuk selalu teratur dan terencana dalam belajar', type: 'positive' },
  { name: 'Kemandirian', desc: 'Kondisi seseorang untuk berusaha melakukan sendiri dalam belajar', type: 'positive' },
  { name: 'Mampu bertahan lama', desc: 'Kondisi seseorang untuk mampu bertahan lama dalam belajar', type: 'positive' },
  { name: 'Keterbukaan', desc: 'Kondisi seseorang untuk berkeinginan menolong orang lain', type: 'positive' },
  { name: 'Dominansi', desc: 'Kondisi seseorang untuk mendominasi dalam berpendapat, maupun berkelompok', type: 'negative' },
  { name: 'Ketergantungan', desc: 'Kondisi seseorang untuk tidak dapat melakukan tugas secara mandiri dan selalu bergantung pada orang lain', type: 'negative' },
  { name: 'Ingin menonjolkan diri', desc: 'Kondisi seseorang untuk dilihat selalu dilihat menonjol dari orang lain', type: 'negative' },
  { name: 'Kecenderungan seksual', desc: 'Kondisi seseorang mempunyai dorongan seksual yang tinggi, termasuk kemungkinan ada kecenderungan homoseksual', type: 'negative' },
  { name: 'Agresivitas', desc: 'Kondisi seseorang untuk melakukan perilaku agresif terhadap orang lain', type: 'negative' },
]

function analyzeTKPI(results: PersonalityResult[]) {
  const positiveAspects = results.slice(0, 5)
  const negativeAspects = results.slice(5, 10)
  
  // Analisis aspek positif (1-5) - RINGKAS
  const positiveAnalysis: string[] = []
  
  positiveAspects.forEach((aspect, index) => {
    const score = aspect.total ?? 0
    const aspectName = aspect.aspect || ASPECT_DEFINITIONS[index].name
    
    let interpretation = ""
    
    // Norma tes: <=5 RENDAH, 6-9 SEDANG, 10-13 TINGGI, >=14 SANGAT TINGGI
    // Untuk aspek positif: skor tinggi = baik
    if (score >= 14) {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang sangat tinggi. Menunjukkan potensi luar biasa dan aspek kepribadian yang sangat baik.`
    } else if (score >= 10) {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang tinggi. Menunjukkan aspek kepribadian yang baik.`
    } else if (score >= 6) {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang sedang. Berada pada tingkat cukup dan dapat dikembangkan lebih lanjut.`
    } else {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang rendah. Memerlukan bimbingan dan dukungan untuk mengembangkan aspek ini.`
    }
    
    positiveAnalysis.push(interpretation)
  })
  
  // Analisis aspek negatif (6-10) - RINGKAS
  const negativeAnalysis: string[] = []
  
  negativeAspects.forEach((aspect, index) => {
    const score = aspect.total ?? 0
    const aspectName = aspect.aspect || ASPECT_DEFINITIONS[index + 5].name
    
    let interpretation = ""
    
    // Norma tes: <=5 RENDAH, 6-9 SEDANG, 10-13 TINGGI, >=14 SANGAT TINGGI
    // Untuk aspek negatif: skor rendah = baik, skor tinggi = buruk
    if (score >= 14) {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang sangat tinggi. Memerlukan perhatian serius dan intervensi untuk mengelola kecenderungan ini.`
    } else if (score >= 10) {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang tinggi. Memerlukan pendampingan khusus untuk mengatasi kecenderungan ini.`
    } else if (score >= 6) {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang sedang. Perlu mendapat perhatian dan bimbingan untuk mengelola aspek ini.`
    } else {
      interpretation = `memiliki ${aspectName.toLowerCase()} yang rendah. Menunjukkan kontrol diri yang baik, tidak ada kecenderungan berlebihan.`
    }
    
    negativeAnalysis.push(interpretation)
  })
  
  // Kesimpulan umum
  const avgPositive = positiveAspects.reduce((sum, r) => sum + (r.total ?? 0), 0) / positiveAspects.length
  const avgNegative = negativeAspects.reduce((sum, r) => sum + (r.total ?? 0), 0) / negativeAspects.length
  
  let summary = ""
  
  // Evaluasi aspek positif (skor tinggi = baik)
  let positiveEval = ""
  if (avgPositive >= 14) {
    positiveEval = "Siswa menunjukkan profil kepribadian yang sangat baik dengan kesiapan tinggi dalam berbagai aspek positif."
  } else if (avgPositive >= 10) {
    positiveEval = "Siswa menunjukkan profil kepribadian yang baik dengan potensi yang dapat terus dikembangkan."
  } else if (avgPositive >= 6) {
    positiveEval = "Siswa menunjukkan profil kepribadian yang cukup dengan beberapa aspek positif yang perlu mendapat perhatian dan pengembangan."
  } else {
    positiveEval = "Siswa menunjukkan profil kepribadian yang kurang baik pada aspek positif dan memerlukan bimbingan intensif untuk mengembangkan berbagai aspek kepribadian."
  }
  
  // Evaluasi aspek negatif (skor rendah = baik, skor tinggi = buruk)
  let negativeEval = ""
  if (avgNegative <= 5) {
    negativeEval = "Siswa menunjukkan kontrol diri yang sangat baik dengan minimnya kecenderungan negatif."
  } else if (avgNegative <= 9) {
    negativeEval = "Siswa menunjukkan kontrol diri yang cukup baik, meskipun beberapa aspek negatif perlu diperhatikan."
  } else if (avgNegative <= 13) {
    negativeEval = "Siswa memerlukan bimbingan untuk mengelola beberapa kecenderungan negatif yang cukup tinggi."
  } else {
    negativeEval = "Siswa memerlukan pendampingan khusus dan intervensi untuk mengatasi kecenderungan negatif yang sangat tinggi."
  }
  
  summary = `${positiveEval} ${negativeEval}`
  
  return { positiveAnalysis, negativeAnalysis, summary }
}


export function TestDetailDialog({
  test,
  studentName,
}: {
  test: TestData | null | undefined
  studentName: string
}) {
  const [open, setOpen] = useState(false)

  const hasAnyTest = test?.personality_completed_at || test?.penjurusan_completed_at
  if (!hasAnyTest) {
    return (
      <p className="text-xs text-[#134146]/50">Belum mengerjakan tes.</p>
    )
  }

  const personalityResults = [...(test?.personality_results ?? [])]
    .filter((r) => typeof r.total === "number")
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))

  const programmerValues = [
    test?.programmer_logical,
    test?.programmer_numerical,
    test?.programmer_spatial,
  ].filter((v): v is number => typeof v === "number")
  const programmerScore =
    programmerValues.length === 3
      ? programmerValues.reduce((s, v) => s + v, 0) / 3
      : null

  const designerValues = [
    typeof test?.designer_uiux_score === "number"
      ? (test.designer_uiux_score / DEFAULT_UIUX_MAX_SCORE) * 100
      : null,
    typeof test?.designer_color_score === "number"
      ? (test.designer_color_score / 10) * 100
      : null,
  ].filter((v): v is number => typeof v === "number")
  const designerScore =
    designerValues.length === 2
      ? designerValues.reduce((s, v) => s + v, 0) / 2
      : null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#2C8970] hover:bg-[#2C8970]/10 hover:text-[#2C8970]"
        >
          <Eye className="h-3.5 w-3.5" />
          Lihat Detail Tes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl border-[#134146]/10 bg-[#F7F7F2]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#134146]">
            Hasil Tes: {studentName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* TKPI */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3B233]/20">
                <Sparkles className="h-4 w-4 text-[#F3B233]" />
              </div>
              <h3 className="text-sm font-bold text-[#134146]">Tes Kepribadian (TKPI)</h3>
              {test?.personality_completed_at ? (
                <span className="rounded-md border border-[#2C8970]/20 bg-[#2C8970]/10 px-2 py-0.5 text-[11px] font-semibold text-[#2C8970]">Selesai</span>
              ) : (
                <span className="rounded-md border border-[#134146]/10 bg-[#134146]/5 px-2 py-0.5 text-[11px] font-semibold text-[#134146]/60">Belum</span>
              )}
            </div>

            {personalityResults.length > 0 ? (
              (() => {
                const analysis = analyzeTKPI(personalityResults)
                
                return (
                  <div className="space-y-4">
                    {/* Tabel Ringkasan - SEMUA 10 Aspek */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#134146]/50">Ringkasan Hasil TKPI</p>
                      <div className="overflow-hidden rounded-xl border border-[#134146]/10 bg-white">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[#134146]/10 bg-[#F0FAF7] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#134146]/50">
                              <th className="px-4 py-2.5 text-left">No</th>
                              <th className="px-4 py-2.5 text-left">Aspek</th>
                              <th className="w-20 px-2 py-2.5 text-center">Total</th>
                              <th className="w-32 px-2 py-2.5 text-center">Kategori</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#134146]/8">
                            {personalityResults.map((result, index) => (
                              <tr key={result.aspect} className={index >= 5 ? "bg-[#FFF9E6]" : ""}>
                                <td className="px-4 py-2.5 text-center font-semibold text-[#134146]/60">{index + 1}</td>
                                <td className="px-4 py-2.5 font-medium text-[#134146]">{result.aspect ?? "-"}</td>
                                <td className="px-2 py-2.5 text-center font-semibold text-[#134146]">{result.total ?? "-"}</td>
                                <td className="px-2 py-2.5 text-center">
                                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold ${categoryColor(result.category)}`}>{result.category ?? "-"}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-2 text-xs text-[#134146]/50 italic">* Aspek 1-5: Aspek Positif | Aspek 6-10: Aspek Negatif (highlight kuning)</p>
                    </div>
                    
                    {/* Analisis Aspek Positif */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#2C8970]">Analisis Aspek Positif (1-5)</p>
                      <div className="space-y-2">
                        {analysis.positiveAnalysis.map((text, i) => (
                          <div key={i} className="rounded-lg border border-[#2C8970]/20 bg-[#2C8970]/5 p-3">
                            <p className="text-sm text-[#134146] leading-relaxed">
                              <span className="font-semibold text-[#2C8970]">#{i + 1}</span> Siswa {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Analisis Aspek Negatif */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#F3B233]">Analisis Aspek Negatif (6-10)</p>
                      <div className="space-y-2">
                        {analysis.negativeAnalysis.map((text, i) => (
                          <div key={i} className="rounded-lg border border-[#F3B233]/30 bg-[#F3B233]/5 p-3">
                            <p className="text-sm text-[#134146] leading-relaxed">
                              <span className="font-semibold text-[#F3B233]">#{i + 6}</span> Siswa {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Kesimpulan */}
                    <div className="rounded-xl border border-[#42CDBA]/30 bg-gradient-to-br from-[#42CDBA]/10 to-[#2C8970]/5 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#2C8970]">Kesimpulan</p>
                      <p className="text-sm text-[#134146] leading-relaxed">{analysis.summary}</p>
                    </div>
                  </div>
                )
              })()
            ) : (
              <p className="rounded-xl border border-[#134146]/10 bg-white px-4 py-3 text-sm text-[#134146]/50">
                {test?.personality_completed_at ? "Hasil TKPI belum tersedia." : "Belum dikerjakan."}
              </p>
            )}
          </div>

          {/* Peminatan */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2C8970]/10">
                <Code2 className="h-4 w-4 text-[#2C8970]" />
              </div>
              <h3 className="text-sm font-bold text-[#134146]">Tes Peminatan</h3>
              {test?.penjurusan_completed_at ? (
                <span className="rounded-md border border-[#2C8970]/20 bg-[#2C8970]/10 px-2 py-0.5 text-[11px] font-semibold text-[#2C8970]">Selesai</span>
              ) : (
                <span className="rounded-md border border-[#134146]/10 bg-[#134146]/5 px-2 py-0.5 text-[11px] font-semibold text-[#134146]/60">Belum</span>
              )}
            </div>

            {test?.penjurusan_completed_at ? (
              <div className="overflow-hidden rounded-xl border border-[#134146]/10 bg-white">
                <div className="border-b border-[#134146]/10 bg-[#F0FAF7] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#134146]/50">Hasil Kecenderungan</p>
                  <p className="mt-1 text-xl font-bold text-[#2C8970]">{test.tendency_result ?? "-"}</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#134146]/8">
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-[#134146]/50">Skor Programmer</p>
                    <p className="mt-1 text-2xl font-bold text-[#134146]">{fmt(programmerScore, "%")}</p>
                    <div className="mt-2 space-y-1 text-xs text-[#134146]/60">
                      <p>Logical: {fmt(test.programmer_logical, "%")}</p>
                      <p>Numerical: {fmt(test.programmer_numerical, "%")}</p>
                      <p>Spatial: {fmt(test.programmer_spatial, "%")}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-[#134146]/50">Skor Designer</p>
                    <p className="mt-1 text-2xl font-bold text-[#134146]">{fmt(designerScore, "%")}</p>
                    <div className="mt-2 space-y-1 text-xs text-[#134146]/60">
                      <p>UI/UX: {fmt(test.designer_uiux_score)} / {DEFAULT_UIUX_MAX_SCORE}</p>
                      <p>Color: {fmt(test.designer_color_score)} / 10</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-[#134146]/10 px-4 py-3">
                  <CircleDot className="h-4 w-4 text-[#42CDBA]" />
                  <span className="text-sm font-semibold text-[#134146]">IQ Result: {fmt(test.programmer_iq)}</span>
                </div>
              </div>
            ) : (
              <p className="rounded-xl border border-[#134146]/10 bg-white px-4 py-3 text-sm text-[#134146]/50">Belum dikerjakan.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}