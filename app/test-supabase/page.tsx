import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function TestSupabasePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: registrations, error } = await supabase.from('registrations').select()

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-[#134146]">Test Koneksi Supabase</h1>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          <p className="font-bold">Error fetching data:</p>
          <p>{error.message}</p>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Status:</h2>
        {!error ? (
          <div className="text-green-600 font-medium mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Koneksi ke Supabase Berhasil!
          </div>
        ) : (
          <div className="text-red-600 font-medium mb-4 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Koneksi Gagal / Error
          </div>
        )}

        <h3 className="font-medium text-gray-700 mb-2">Isi Tabel 'registrations':</h3>
        <ul className="list-disc pl-5">
          {registrations && registrations.length > 0 ? (
            registrations.map((reg: any) => (
              <li key={reg.id} className="mb-2 text-gray-800">{reg.nama} - {reg.pilihan_program}</li>
            ))
          ) : (
            <p className="text-gray-500 italic">
              {error ? "Tidak dapat memuat tabel karena error di atas." : "Tabel 'registrations' kosong atau belum ada data pendaftar."}
            </p>
          )}
        </ul>
      </div>
    </div>
  )
}