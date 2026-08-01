import { validateTestAccess } from '@/utils/test-validation'
import { Header } from '@/components/header'
import { redirect } from 'next/navigation'
import { SelesaiButton } from '@/components/test/selesai-button'
import { Sparkles, Trophy, Brain } from 'lucide-react'

export const metadata = {
  title: "Tes Selesai | NUSA Boarding School",
}

export default async function SelesaiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const { registration, testProgress } = await validateTestAccess(params)

  const isKepribadianDone = !!testProgress?.personality_completed_at
  const isPenjurusanDone = !!testProgress?.penjurusan_completed_at

  if (!isKepribadianDone || !isPenjurusanDone) {
    redirect(`/test?ref=${params?.ref}`)
  }

  

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F0FAF7] relative">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgb(31,111,104,0.06)] border border-[#2C8970]/10 text-center relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#F3B233]/20 to-transparent rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#42CDBA]/20 to-transparent rounded-full translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#F3B233]/20 to-[#F3B233]/5 rounded-full mb-8 shadow-inner border border-[#F3B233]/20">
            <Trophy className="w-12 h-12 text-[#F3B233] drop-shadow-sm" />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#134146] via-[#2C8970] to-[#42CDBA]">
            Selamat, <br className="md:hidden" /><span className="font-bold text-[#F3B233] px-3 py-1 bg-[#F3B233]/10 border border-[#F3B233]/20 rounded-xl shadow-sm inline-block mt-2 md:mt-0">{registration.full_name}</span>!
          </h1>
          <p className="text-lg text-[#134146]/70 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
            Kamu telah menyelesaikan seluruh rangkaian tes seleksi NUSA Boarding School dengan sangat baik. 
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {/* Kartu Tes Kepribadian */}
            <div className="p-8 bg-gradient-to-b from-white to-[#F0FAF7] border border-[#2C8970]/20 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-[0_10px_40px_rgb(31,111,104,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="p-4 bg-gradient-to-br from-[#2C8970] to-[#134146] rounded-2xl shadow-[0_8px_20px_rgba(44,137,112,0.3)] mb-5">
                <Sparkles className="w-7 h-7 text-[#F3B233]" />
              </div>
              <h3 className="font-bold text-[#134146] text-xl mb-3">Tes Kepribadian</h3>
              <p className="text-sm text-[#134146]/70 font-medium leading-relaxed">
                100 soal Tes Kepribadian Pelajar Indonesia (TKPI) milikmu telah direkam dan siap untuk kami pelajari.
              </p>
            </div>

            {/* Kartu Tes Penjurusan */}
            <div className="p-8 bg-gradient-to-b from-white to-[#F0FAF7] border border-[#2C8970]/20 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-[0_10px_40px_rgb(31,111,104,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="p-4 bg-gradient-to-br from-[#2C8970] to-[#134146] rounded-2xl shadow-[0_8px_20px_rgba(44,137,112,0.3)] mb-5">
                <Brain className="w-7 h-7 text-[#8EF3E7]" />
              </div>
              <h3 className="font-bold text-[#134146] text-xl mb-3">Tes Penjurusan</h3>
              <p className="text-sm text-[#134146]/70 font-medium leading-relaxed">
                Kecenderungan logis dan kreatifmu telah terekam. Sebagai pengingat, ini baru tes awal untuk memetakan potensimu, jadi tetap semangat dan tidak perlu berkecil hati jika hasilnya nanti belum sesuai dengan pilihan programmu.
              </p>
            </div>
          </div>

          <div className="border-t border-[#2C8970]/10 pt-10 relative">
            <p className="text-[#134146]/80 mb-6 text-lg max-w-2xl mx-auto">
              <span className="font-bold text-[#134146]">Langkah Terakhir:</span> <br className="sm:hidden" />
              <span className="font-medium leading-relaxed block mt-2 text-sm md:text-base">
                Konfirmasi kesiapanmu untuk menuju tahap wawancara. Tidak perlu khawatir, sesi ini dapat dilakukan secara online dengan jadwal yang fleksibel menyesuaikan ketersediaan waktumu. Silakan konfirmasi, dan tim Admin kami akan segera menghubungimu!
              </span>
            </p>
            
            <SelesaiButton kodeTes={registration.kode_tes} />
          </div>
        </div>
      </main>

      {/* Decorative Sci-Fi Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-[#42CDBA]/5 to-transparent rounded-full -translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#134146 1px, transparent 1px), linear-gradient(90deg, #134146 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
    </div>
  )
}

