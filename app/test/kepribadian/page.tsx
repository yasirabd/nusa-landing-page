import { validateTestAccess } from '@/utils/test-validation'
import { Header } from '@/components/header'
import { KepribadianQuiz } from '@/components/test/kepribadian-quiz'
import { redirect } from 'next/navigation'

export const metadata = {
  title: "Tes Kepribadian (TKPI) | NUSA Boarding School",
}

export default async function KepribadianPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const { registration, testProgress } = await validateTestAccess(params)

  // Guard: if personality test is already done, redirect to dashboard
  if (testProgress?.personality_completed_at) {
    redirect(`/test?ref=${params?.ref}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tes Kepribadian (TKPI)</h1>
          <p className="text-slate-600 mt-2">
            Pilihlah salah satu pernyataan yang kamu anggap paling sesuai dengan diri kamu. Tidak ada pernyataan yang salah.
          </p>
        </div>

        <KepribadianQuiz registrationId={registration.id} refParam={params?.ref as string} />
      </main>
    </div>
  )
}
