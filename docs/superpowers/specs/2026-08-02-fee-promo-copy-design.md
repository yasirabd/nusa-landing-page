# Fee Promo Copy Design

**Date:** 2026-08-02
**Status:** Approved direction, pending written-spec review

## Objective

Correct the fee information so the displayed calculation matches the active
SPMB promotion and the semester-payment timing is easier to understand.

## Fee Promotion

The `BIAYA MASUK` card keeps `20 Jt` as the original struck-through price.
The promotional price changes from `12 Jt` to `10 Jt`, and the promotion badge
changes from `DISKON 8 JUTA (10 Pendaftar Pertama)` to
`DISKON 10 JUTA (10 Pendaftar Pertama)`.

This expresses one consistent calculation:

- Original fee: `20 Jt`
- Discount: `10 Jt`
- Fee after discount: `10 Jt`
- Eligibility: the first 10 registrants

## Semester Fee Copy

Replace the existing semester schedule detail with this exact sentence:

`Dibayarkan saat tiap awal semester pada tahun ke-1, ke-2, dan ke-3`

Remove the separate footer note `Dibayarkan tiap awal semester` from the
semester card because the approved sentence already communicates the timing.
This prevents the same information from appearing twice in one card.

## Scope

Only fee data and its focused tests change. Card layout, typography, colors,
spacing, animation, other fee items, and visible section structure remain
unchanged. The user-owned audit file is not modified or committed.

## Testing

Add a focused rendering test for `FeeInfoSection` that verifies:

- `20 Jt` remains visible with the line-through treatment.
- `10 Jt` is the visible promotional fee.
- The badge states the exact `10 JUTA` discount and first-10 eligibility.
- The old `12 Jt` fee and `DISKON 8 JUTA` badge are absent.
- The approved semester schedule appears exactly once.
- The old semester schedule wording is absent.
