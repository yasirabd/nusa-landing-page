import { validateTestAccess } from '@/utils/test-validation'
import { Header } from '@/components/header'
import Link from 'next/link'

export const metadata = {
  title: "Portal Tes | NUSA Boarding School",
}

export default async function TestDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const { registration, testProgress } = await validateTestAccess(params)
  const ref = params?.ref as string

  const isKepribadianDone = !!testProgress?.personality_completed_at
  const isPenjurusanDone = !!testProgress?.penjurusan_completed_at

  const totalTests = 2;
  const completedTests = [isKepribadianDone, isPenjurusanDone].filter(Boolean).length;
  const progressPercent = (completedTests / totalTests) * 100;

  return (
    <div className="flex min-h-screen flex-col font-sans bg-[#F0FAF7]">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 relative">
        <div className="relative z-10 animate-in fade-in duration-700">
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-[#E6F8F5] border border-[#2C8970]/20 text-[#2C8970] text-xs font-bold tracking-widest uppercase">
            NUSA Boarding School
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#134146] via-[#2C8970] to-[#42CDBA] tracking-tight">
            Portal Tes Calon Santri
          </h1>
          <p className="text-lg text-[#134146]/70 mb-8 font-medium">
            Selamat datang, <span className="font-extrabold text-[#F3B233] px-2.5 py-1 bg-[#F3B233]/10 border border-[#F3B233]/20 rounded-md shadow-sm">{registration.full_name}</span>. Silakan selesaikan rangkaian tes di bawah ini secara berurutan.
          </p>

          {/* Overall Progress */}
          <div className="mb-10 bg-white p-5 rounded-2xl border border-[#134146]/5 shadow-[0_4px_20px_rgb(31,111,104,0.03)]">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-bold text-[#134146]/70 uppercase tracking-wider">Progress Rangkaian Tes</span>
              <span className="text-xl font-black text-[#2C8970]">{progressPercent}%</span>
            </div>
            <div className="w-full h-3.5 bg-[#F0FAF7] rounded-full overflow-hidden border border-[#2C8970]/10">
              <div 
                className="h-full bg-gradient-to-r from-[#42CDBA] to-[#2C8970] rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>

          {(!isKepribadianDone || !isPenjurusanDone) && (
            <div className="bg-gradient-to-br from-[#E6F8F5] to-[#F0FAF7] border border-[#42CDBA]/40 rounded-2xl p-5 mb-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-[#2C8970] to-[#134146] text-white p-1.5 rounded-lg shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-[#134146]">Adab Mengerjakan Tes</h3>
              </div>
              <ul className="space-y-2.5 text-[#134146]/80 font-medium pl-2">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2C8970] mt-2.5 shrink-0 shadow-[0_0_8px_#2C8970]"></div>
                  <span>Mengawali dengan membaca <span className="italic font-bold text-[#2C8970]">Bismillah</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2C8970] mt-2.5 shrink-0 shadow-[0_0_8px_#2C8970]"></div>
                  <span>Mengerjakan dengan <span className="font-bold text-[#2C8970]">jujur</span> sesuai dengan keadaan dan kata hati sendiri.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2C8970] mt-2.5 shrink-0 shadow-[0_0_8px_#2C8970]"></div>
                  <span>Mengerjakan secara <span className="font-bold text-[#2C8970]">perlahan, tenang, dan teliti</span>. Tidak perlu terburu-buru.</span>
                </li>
              </ul>
            </div>
          )}
          
          <div className="space-y-6">
            {/* Tes 1 */}
            <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 delay-200 fill-mode-both ${isKepribadianDone ? 'bg-[#F0FAF7] border-[#2C8970]/20 opacity-90' : 'bg-white border-[#42CDBA] shadow-[0_8px_30px_rgb(31,111,104,0.08)] hover:-translate-y-1 relative'}`}>
              {!isKepribadianDone && (
                <div className="absolute -top-3 -right-3 bg-[#F3B233] text-[#134146] text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(243,178,51,0.5)] animate-pulse border border-white">
                  Tersedia
                </div>
              )}
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-[#E6F8F5] text-[#2C8970] shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </div>
                <div className="w-full">
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-[#134146]">1. Tes Kepribadian (TKPI)</h2>
                  </div>
                  <p className="text-[#134146]/70 mb-6 font-medium">Tes ini akan mengungkap potensi dan kecenderungan karaktermu. Terdiri dari 100 pertanyaan ringan yang tidak ada jawaban benar atau salah.</p>
                  
                  {isKepribadianDone ? (
                    <div className="inline-flex items-center w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#E6F8F5] to-[#F0FAF7] text-[#2C8970] rounded-xl font-bold border border-[#2C8970]/30 shadow-inner">
                      <div className="bg-[#2C8970] text-white rounded-full p-1 mr-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      Telah Selesai
                    </div>
                  ) : (
                    <Link href={`/test/kepribadian?ref=${ref}`} className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-[#F3B233] text-[#134146] rounded-xl font-bold hover:bg-[#eab345] hover:shadow-[0_0_20px_rgba(243,178,51,0.4)] transition-all active:scale-95 group">
                      Mulai Tes Kepribadian
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Tes 2 */}
            <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 delay-300 fill-mode-both ${isPenjurusanDone ? 'bg-[#F0FAF7] border-[#2C8970]/20 opacity-90' : !isKepribadianDone ? 'bg-white border-slate-200 grayscale opacity-70 shadow-sm' : 'bg-white border-[#42CDBA] shadow-[0_8px_30px_rgb(31,111,104,0.08)] hover:-translate-y-1 relative'}`}>
              {isKepribadianDone && !isPenjurusanDone && (
                <div className="absolute -top-3 -right-3 bg-[#F3B233] text-[#134146] text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(243,178,51,0.5)] animate-pulse border border-white">
                  Tersedia
                </div>
              )}
              <div className="flex items-start gap-5">
                <div className={`hidden sm:flex items-center justify-center w-14 h-14 rounded-full shrink-0 ${isKepribadianDone ? 'bg-[#E6F8F5] text-[#2C8970]' : 'bg-slate-100 text-slate-400'}`}>
                  {isKepribadianDone ? (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  )}
                </div>
                <div className="w-full">
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-[#134146]">2. Tes Penjurusan</h2>
                  </div>
                  <p className="text-[#134146]/70 mb-6 font-medium">Uji dirimu untuk mengetahui apakah kamu lebih cocok sebagai Programmer yang logis atau Designer yang kreatif.</p>
                  
                  {isPenjurusanDone ? (
                    <div className="inline-flex items-center w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#E6F8F5] to-[#F0FAF7] text-[#2C8970] rounded-xl font-bold border border-[#2C8970]/30 shadow-inner">
                      <div className="bg-[#2C8970] text-white rounded-full p-1 mr-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      Telah Selesai
                    </div>
                  ) : !isKepribadianDone ? (
                    <div className="inline-flex items-center w-full sm:w-auto px-6 py-3.5 bg-slate-100 text-slate-500 rounded-xl font-bold border border-slate-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      Terkunci (Selesaikan Tes 1)
                    </div>
                  ) : (
                    <Link href={`/test/penjurusan?ref=${ref}`} className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-[#F3B233] text-[#134146] rounded-xl font-bold hover:bg-[#eab345] hover:shadow-[0_0_20px_rgba(243,178,51,0.4)] transition-all active:scale-95 group">
                      Mulai Tes Penjurusan
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            {/* Selesai Semua */}
            {isKepribadianDone && isPenjurusanDone && (
              <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                 <Link href={`/test/selesai?ref=${ref}`} className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-[#134146] text-white rounded-2xl font-bold text-lg hover:bg-[#1F6F68] hover:scale-105 transition-all shadow-[0_10px_30px_rgb(19,65,70,0.3)] group">
                  Selesaikan Rangkaian Tes
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform text-[#8EF3E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Sci-Fi Grid Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#8EF3E7]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#134146 1px, transparent 1px), linear-gradient(90deg, #134146 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
      </main>
    </div>
  )
}
