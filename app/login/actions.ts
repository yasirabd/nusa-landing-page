"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { isAdminIdentity } from "@/utils/admin"
import { createClient } from "@/utils/supabase/server"

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    redirect("/login?error=missing_credentials")
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    redirect("/login?error=invalid_credentials")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?error=session_required")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle()

  if (
    !isAdminIdentity({
      role: profile?.role ?? null,
      email: profile?.email ?? user.email ?? null,
    })
  ) {
    await supabase.auth.signOut()
    redirect("/login?error=unauthorized")
  }

  await supabase.from("admin_audit_logs").insert({
    admin_id: user.id,
    action: "admin_login_success",
    details: {
      source: "login_form",
      email: profile?.email ?? user.email ?? null,
    },
  })

  redirect("/admin")
}

export async function logoutAdminAction() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.from("admin_audit_logs").insert({
      admin_id: user.id,
      action: "admin_logout",
      details: {
        source: "admin_dashboard",
      },
    })
  }

  await supabase.auth.signOut()
  redirect("/login")
}
