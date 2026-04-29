import { TestProgrammerDesigner } from "@/components/test-programmer-designer"
import { Header } from "@/components/header"
import { validateTestAccess } from '@/utils/test-validation'
import { redirect } from 'next/navigation'

export const metadata = {
  title: "Tes Penjurusan: Programmer atau Designer? | NUSA Boarding School",
}

export default async function PenjurusanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const { registration, testProgress } = await validateTestAccess(params)
  
  // Guard: if personality test isn't done, redirect to dashboard
  if (!testProgress?.personality_completed_at) {
    redirect(`/test?ref=${params?.ref}`)
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-[#F7F7F2]">
      <Header />
      <main className="flex-1">
        <TestProgrammerDesigner registrationId={registration.id} refParam={params?.ref as string} />
      </main>
    </div>
  )
}
