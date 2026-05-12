"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { requireAdminUser } from "@/utils/admin"

export async function updateRegistrationAction(formData: FormData) {
  const { supabase, user, profile } = await requireAdminUser()
  const registrationId = String(formData.get("registrationId") ?? "")
  const status = String(formData.get("status") ?? "").trim()
  const catatanAdmin = String(formData.get("catatanAdmin") ?? "").trim()

  if (!registrationId || !status) {
    redirect("/admin?message=update_failed")
  }

  const { error } = await supabase
    .from("registrations")
    .update({
      status,
      catatan_admin: catatanAdmin || null,
    })
    .eq("id", registrationId)

  if (error) {
    redirect("/admin?message=update_failed")
  }

  await supabase.from("admin_audit_logs").insert({
    admin_id: user.id,
    action: "registration_status_updated",
    details: {
      registration_id: registrationId,
      status,
      catatan_admin: catatanAdmin || null,
      admin_email: profile.email,
    },
  })

  revalidatePath("/admin")
  redirect("/admin?message=updated")
}
