"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { requireAdminUser } from "@/utils/admin"
import {
  buildAdminHref,
  parseAcademicYear,
} from "@/utils/admin-academic-year"

function getReturnHref(formData: FormData, message: string) {
  const academicYear = parseAcademicYear(String(formData.get("year") ?? ""))
  const query = String(formData.get("q") ?? "").trim()
  const testFilter = String(formData.get("test") ?? "").trim()
  const page = String(formData.get("page") ?? "").trim()

  return buildAdminHref({
    view: "registrations",
    year: academicYear.slug,
    q: query || undefined,
    test: testFilter || undefined,
    page: page || undefined,
    message,
  })
}

export async function updateRegistrationAction(formData: FormData) {
  const { supabase, user, profile } = await requireAdminUser()
  const registrationId = String(formData.get("registrationId") ?? "")
  const status = String(formData.get("status") ?? "").trim()
  const catatanAdmin = String(formData.get("catatanAdmin") ?? "").trim()
  const academicYear = parseAcademicYear(String(formData.get("year") ?? ""))

  if (!registrationId || !status) {
    redirect(getReturnHref(formData, "update_failed"))
  }

  const { error } = await supabase
    .from("registrations")
    .update({
      status,
      catatan_admin: catatanAdmin || null,
    })
    .eq("id", registrationId)
    .eq("academic_year", academicYear.value)

  if (error) {
    redirect(getReturnHref(formData, "update_failed"))
  }

  await supabase.from("admin_audit_logs").insert({
    admin_id: user.id,
    action: "registration_status_updated",
    details: {
      registration_id: registrationId,
      status,
      catatan_admin: catatanAdmin || null,
      academic_year: academicYear.value,
      admin_email: profile.email,
    },
  })

  revalidatePath("/admin")
  redirect(getReturnHref(formData, "updated"))
}
