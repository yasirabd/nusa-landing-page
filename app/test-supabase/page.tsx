import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function TestSupabasePage() {
  const cookieStore = await cookies()
  // Tambahkan await pada cookies() sesuai update terbaru Next.js
  const supabase = await createClient(cookieStore)

  // Mengambil data dari tabel 'todos'
  const { data: todos, error } = await supabase.from('todos').select()

  if (error) {
    return <div className="p-10 text-red-500">Error fetching data: {error.message}</div>
  }

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-[#134146]">Test Koneksi Supabase</h1>
      <ul className="list-disc pl-5">
        {todos?.length ? (
          todos.map((todo) => (
            <li key={todo.id} className="mb-2">{todo.name}</li>
          ))
        ) : (
          <p className="text-gray-500">Tabel todos kosong atau belum dibuat.</p>
        )}
      </ul>
    </div>
  )
}
