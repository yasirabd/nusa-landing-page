import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { kode_tes } = await request.json()

    console.log("[complete-test] Received kode_tes:", kode_tes)

    if (!kode_tes) {
      return NextResponse.json(
        { error: "Kode tes tidak ditemukan" },
        { status: 400 }
      )
    }

    // Call Supabase Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[complete-test] Missing Supabase environment variables")
      return NextResponse.json(
        { error: "Konfigurasi server tidak valid" },
        { status: 500 }
      )
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/complete-test`
    
    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify({ kode_tes })
    })

    const result = await response.json()
    console.log("[complete-test] Edge function response:", result)

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error || "Gagal mengupdate status" },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { success: true, message: "Status berhasil diupdate" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[complete-test] Unexpected error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
