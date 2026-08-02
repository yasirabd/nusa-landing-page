# FAQ Legalitas Source Design

## Goal

Clarify NUSA Boarding School's institutional relationship in the public FAQ and provide an official Kemendikdasmen reference link without making additional legal-status claims.

## Content

The `legalitas` FAQ answer will state:

> NUSA Boarding School merupakan bagian dari PKBM Cahaya Hikmah yang berada di bawah Yayasan Islam Nurus Sunnah. Informasi lembaga dapat diperiksa melalui situs Referensi Data Kemendikdasmen.

The answer will include a link labeled `Lihat data PKBM Cahaya Hikmah di Kemendikdasmen` pointing to:

`https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/P9998836`

The copy will not add accreditation, permit, diploma, or other legal claims beyond the relationship supplied by the user.

## Data Model

FAQ entries remain plain content objects. An entry may optionally include:

- `sourceLabel`: visible link text;
- `sourceUrl`: external evidence URL.

Only the `legalitas` entry needs these fields. This keeps evidence metadata reusable without embedding special handling for a particular FAQ ID.

## Rendering

`FAQSection` will render the existing answer text first. When both source fields are present, it will render a clearly styled external link immediately after the answer.

The external link will:

- open in a new tab;
- use `rel="noreferrer"`;
- retain visible keyboard focus styling;
- identify itself as an external reference through its wording and an external-link icon.

FAQ entries without source fields will render exactly as before.

## Verification

Tests will verify that:

- the legalitas answer names PKBM Cahaya Hikmah and Yayasan Islam Nurus Sunnah;
- the official Kemendikdasmen URL and link label are stored in the FAQ content;
- the FAQ section renders the evidence link with the expected URL and new-tab behavior;
- prohibited unverified legal claims remain absent.

