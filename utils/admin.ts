import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export type AdminProfile = {
  id: string
  email: string | null
  full_name: string | null
  role: string | null
}

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAllowedAdminRole(role: string | null | undefined) {
  return role === "admin" || role === "super_admin"
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  if (!email) return false
  return getAdminEmails().includes(email.toLowerCase())
}

export function isAdminIdentity(profile: Pick<AdminProfile, "role" | "email"> | null) {
  if (!profile) return false
  return isAllowedAdminRole(profile.role) || isAllowedAdminEmail(profile.email)
}

export async function getSessionUser() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { supabase, user: null, profile: null }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle<AdminProfile>()

  const normalizedProfile: AdminProfile = {
    id: user.id,
    email: profile?.email ?? user.email ?? null,
    full_name: profile?.full_name ?? user.user_metadata?.full_name ?? null,
    role: profile?.role ?? null,
  }

  return {
    supabase,
    user,
    profile: normalizedProfile,
  }
}

export async function requireAdminUser() {
  const session = await getAdminSession()

  if (!session.user || !isAdminIdentity(session.profile)) {
    redirect("/login?error=unauthorized")
  }

  return session
}

export async function writeAdminAuditLog(
  action: string,
  details: Record<string, unknown> = {},
) {
  const { supabase, user, profile } = await requireAdminUser()

  await supabase.from("admin_audit_logs").insert({
    admin_id: user.id,
    action,
    details: {
      ...details,
      admin_email: profile.email,
    },
  })
}

export function hasConfiguredAdminEmails() {
  return getAdminEmails().length > 0
}
