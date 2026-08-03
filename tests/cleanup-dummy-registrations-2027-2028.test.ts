import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import {
  CONFIRMATION_TOKEN,
  TARGET_ACADEMIC_YEAR,
  chunkPaths,
  cleanupReceiptStorage,
  getUniqueReceiptPaths,
  shouldExecuteDeletion,
} from "../scripts/cleanup-dummy-registrations-2027-2028.mjs"

type Registration = {
  id: string
  bukti_transfer_url: string | null
}

function makeFakeClient({
  registrations,
  queryError = null,
  removeError = null,
}: {
  registrations: Registration[]
  queryError?: Error | null
  removeError?: Error | null
}) {
  const queryCalls: Array<Record<string, unknown>> = []
  const removeCalls: string[][] = []

  return {
    queryCalls,
    removeCalls,
    from(table: string) {
      return {
        select(columns: string) {
          return {
            eq(column: string, value: string) {
              return {
                async range(from: number, to: number) {
                  queryCalls.push({ table, columns, column, value, from, to })
                  return {
                    data: queryError ? null : registrations.slice(from, to + 1),
                    error: queryError,
                  }
                },
              }
            },
          }
        },
      }
    },
    storage: {
      from(bucket: string) {
        return {
          async remove(paths: string[]) {
            removeCalls.push(paths)
            return { data: removeError ? null : paths, error: removeError, bucket }
          },
        }
      },
    },
  }
}

describe("2027/2028 dummy receipt cleanup", () => {
  it("targets only the approved academic year", () => {
    expect(TARGET_ACADEMIC_YEAR).toBe("2027/2028")
  })

  it("deduplicates non-empty receipt paths", () => {
    expect(
      getUniqueReceiptPaths([
        { bukti_transfer_url: "first.jpg" },
        { bukti_transfer_url: null },
        { bukti_transfer_url: "first.jpg" },
        { bukti_transfer_url: " second.png " },
      ]),
    ).toEqual(["first.jpg", "second.png"])
  })

  it("chunks Storage deletions at the API limit", () => {
    const paths = Array.from({ length: 1001 }, (_, index) => `${index}.jpg`)
    const chunks = chunkPaths(paths)

    expect(chunks).toHaveLength(2)
    expect(chunks[0]).toHaveLength(1000)
    expect(chunks[1]).toHaveLength(1)
  })

  it("requires the exact destructive confirmation token", () => {
    expect(shouldExecuteDeletion([`--confirm=${CONFIRMATION_TOKEN}`])).toBe(true)
    expect(shouldExecuteDeletion([])).toBe(false)
    expect(shouldExecuteDeletion(["--confirm=yes"])).toBe(false)
  })

  it("queries only 2027/2028 registrations and stays dry-run by default", async () => {
    const client = makeFakeClient({
      registrations: [{ id: "registration-1", bukti_transfer_url: "receipt.jpg" }],
    })

    const result = await cleanupReceiptStorage(client, { execute: false })

    expect(client.queryCalls[0]).toMatchObject({
      table: "registrations",
      column: "academic_year",
      value: "2027/2028",
    })
    expect(client.removeCalls).toEqual([])
    expect(result).toEqual({
      registrations: 1,
      receiptPaths: 1,
      deletedPaths: 0,
      dryRun: true,
    })
  })

  it("deletes selected receipt paths in Storage API batches", async () => {
    const client = makeFakeClient({
      registrations: Array.from({ length: 1001 }, (_, index) => ({
        id: `registration-${index}`,
        bukti_transfer_url: `${index}.jpg`,
      })),
    })

    const result = await cleanupReceiptStorage(client, { execute: true })

    expect(client.removeCalls).toHaveLength(2)
    expect(client.removeCalls[0]).toHaveLength(1000)
    expect(client.removeCalls[1]).toHaveLength(1)
    expect(result.deletedPaths).toBe(1001)
  })

  it("stops when a registration query fails", async () => {
    const client = makeFakeClient({
      registrations: [],
      queryError: new Error("query failed"),
    })

    await expect(cleanupReceiptStorage(client, { execute: true })).rejects.toThrow(
      "query failed",
    )
  })

  it("stops when a Storage deletion fails", async () => {
    const client = makeFakeClient({
      registrations: [{ id: "registration-1", bukti_transfer_url: "receipt.jpg" }],
      removeError: new Error("remove failed"),
    })

    await expect(cleanupReceiptStorage(client, { execute: true })).rejects.toThrow(
      "remove failed",
    )
  })
})

describe("2027/2028 relational cleanup migration", () => {
  const migration = readFileSync(
    "supabase/migrations/20260803011445_cleanup_dummy_registrations_2027_2028.sql",
    "utf8",
  )

  it("targets registrations through the exact academic year", () => {
    expect(migration).toContain("where academic_year = '2027/2028'")
    expect(migration).toContain("cleanup_2027_2028_registrations")
  })

  it("requires receipt files to be removed through the Storage API first", () => {
    expect(migration).toContain("join storage.objects")
    expect(migration).toContain("object.bucket_id = 'payment_receipts'")
    expect(migration).not.toMatch(/delete\s+from\s+storage\.objects/i)
  })

  it("deletes related rows before registrations in one transaction", () => {
    const testsDelete = migration.indexOf("delete from public.student_tests")
    const auditDelete = migration.indexOf("delete from public.admin_audit_logs")
    const registrationsDelete = migration.indexOf("delete from public.registrations")

    expect(migration.trimStart().startsWith("begin;")).toBe(true)
    expect(testsDelete).toBeGreaterThan(0)
    expect(auditDelete).toBeGreaterThan(testsDelete)
    expect(registrationsDelete).toBeGreaterThan(auditDelete)
    expect(migration.trimEnd().endsWith("commit;")).toBe(true)
  })
})
