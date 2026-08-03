import { pathToFileURL } from "node:url"

import { createClient } from "@supabase/supabase-js"

export const TARGET_ACADEMIC_YEAR = "2027/2028"
export const RECEIPT_BUCKET = "payment_receipts"
export const CONFIRMATION_TOKEN = "DELETE-2027-2028-DUMMY-DATA"
export const STORAGE_BATCH_SIZE = 1000
const REGISTRATION_PAGE_SIZE = 1000

export function getUniqueReceiptPaths(registrations) {
  return [
    ...new Set(
      registrations
        .map(({ bukti_transfer_url }) => bukti_transfer_url?.trim())
        .filter(Boolean),
    ),
  ]
}

export function chunkPaths(paths) {
  const chunks = []

  for (let index = 0; index < paths.length; index += STORAGE_BATCH_SIZE) {
    chunks.push(paths.slice(index, index + STORAGE_BATCH_SIZE))
  }

  return chunks
}

export function shouldExecuteDeletion(args) {
  return args.includes(`--confirm=${CONFIRMATION_TOKEN}`)
}

function toError(error, fallbackMessage) {
  if (error instanceof Error) return error
  return new Error(error?.message || fallbackMessage)
}

export async function cleanupReceiptStorage(client, { execute = false } = {}) {
  const registrations = []

  for (let from = 0; ; from += REGISTRATION_PAGE_SIZE) {
    const { data, error } = await client
      .from("registrations")
      .select("id,bukti_transfer_url")
      .eq("academic_year", TARGET_ACADEMIC_YEAR)
      .range(from, from + REGISTRATION_PAGE_SIZE - 1)

    if (error) {
      throw toError(error, "Failed to load targeted registrations.")
    }

    const page = data ?? []
    registrations.push(...page)

    if (page.length < REGISTRATION_PAGE_SIZE) break
  }

  const receiptPaths = getUniqueReceiptPaths(registrations)

  if (!execute) {
    return {
      registrations: registrations.length,
      receiptPaths: receiptPaths.length,
      deletedPaths: 0,
      dryRun: true,
    }
  }

  let deletedPaths = 0

  for (const batch of chunkPaths(receiptPaths)) {
    const { error } = await client.storage.from(RECEIPT_BUCKET).remove(batch)

    if (error) {
      throw toError(error, "Failed to delete targeted payment receipts.")
    }

    deletedPaths += batch.length
  }

  return {
    registrations: registrations.length,
    receiptPaths: receiptPaths.length,
    deletedPaths,
    dryRun: false,
  }
}

export async function main(args = process.argv.slice(2), env = process.env) {
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = env.NEXT_SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_SUPABASE_SERVICE_ROLE_KEY are required.",
    )
  }

  const execute = shouldExecuteDeletion(args)
  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  const result = await cleanupReceiptStorage(client, { execute })

  console.log(`Academic year: ${TARGET_ACADEMIC_YEAR}`)
  console.log(`Targeted registrations: ${result.registrations}`)
  console.log(`Targeted receipt paths: ${result.receiptPaths}`)

  if (result.dryRun) {
    console.log("Dry run only. No Storage files were deleted.")
    console.log(
      `To delete them permanently, rerun with --confirm=${CONFIRMATION_TOKEN}`,
    )
  } else {
    console.log(`Deleted receipt paths: ${result.deletedPaths}`)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
