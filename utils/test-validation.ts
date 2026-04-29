import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function validateTestAccess(searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined }) {
  const searchParams = await searchParamsPromise
  const ref = searchParams?.ref as string

  if (!ref) {
    redirect('/')
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // 1. Verify if ref is a valid registration kode_tes securely via RPC
  const { data: registrations, error: regError } = await supabase
    .rpc('get_test_session', { p_kode_tes: ref })

  const registration = registrations?.[0]

  if (regError || !registration) {
    redirect('/')
  }

  // 2. Fetch or create test progress
  let { data: testProgress, error: testError } = await supabase
    .from('student_tests')
    .select('*')
    .eq('registration_id', registration.id)
    .single()

  if (testError && testError.code === 'PGRST116') {
    // Record not found, create one
    const { data: newTest, error: insertError } = await supabase
      .from('student_tests')
      .insert([{ registration_id: registration.id }])
      .select()
      .single()

    if (!insertError) {
      testProgress = newTest
    }
  }

  return { registration, testProgress }
}
