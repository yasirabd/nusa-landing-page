# Public SEO Metadata Design

**Date:** 2026-08-02
**Audit item:** UX-13 — Open Graph and structured data
**Status:** Approved design

## Objective

Give NUSA Boarding School accurate, consistent search and social-sharing
metadata without inventing organizational facts. The implementation should
make the homepage and registration page understandable to search engines,
messaging applications, and social platforms while keeping private and test
routes out of search results.

## Verified Public Data

- Official website: `https://nusabs.sch.id`
- Organization name: `NUSA Boarding School`
- Location: Semarang, Jawa Tengah, Indonesia
- Email: `info@nusabs.sch.id`
- Admissions phone and WhatsApp: `+62 813-9270-6707`
- Instagram: `https://instagram.com/nusaboardingschool`
- YouTube: `https://youtube.com/nusaboardingschool`
- TikTok: `https://tiktok.com/@nusaboardingschool`
- Facebook: `https://facebook.com/nusaboardingschool`
- Logo: `/icons/logo.png`, 500 by 500 pixels
- Social image: `/images/nusa-hero-image.webp`, 1200 by 794 pixels

The schema must not include an unverified street address, legal status,
accreditation, rating, tuition amount, opening hours, or guaranteed student
outcome.

## Architecture

Create one site configuration module as the source of truth for the canonical
URL, organization identity, contact details, social links, and image paths.
Root metadata, page metadata, sitemap, robots, and JSON-LD consume this module
so public facts cannot drift between files.

Use these units:

- `lib/site-config.ts`: immutable verified public constants.
- `components/educational-organization-json-ld.tsx`: serializes and renders the
  organization schema safely.
- `app/layout.tsx`: root Next.js metadata and site-wide JSON-LD.
- `app/daftar/page.tsx`: registration-specific metadata and canonical URL.
- `app/robots.ts`: crawl rules, canonical host, and sitemap location.
- `app/sitemap.ts`: public URL discovery for `/` and `/daftar`.

No visible component, copy, layout, styling, or navigation changes are part of
this feature.

## Root Metadata

Use Next.js `Metadata` with `metadataBase` set to
`https://nusabs.sch.id`.

The root metadata uses:

- Title: `NUSA Boarding School Semarang | Sekolah IT Islami`
- Description: `Boarding school islami tingkat SMA di Kota Semarang dengan
  jurusan Programmer dan Designer. SPMB NUSA Boarding School 2027/2028 sudah
  dibuka.`
- Canonical: `/`
- Application name and site name: `NUSA Boarding School`
- Locale: `id_ID`
- Open Graph type: `website`
- Open Graph image: the verified 1200 by 794 hero WebP
- Twitter card: `summary_large_image`
- Favicon and Apple icon: the verified square NUSA logo
- Robots metadata: index and follow enabled for the public site

Remove `generator: "v0.app"`. Do not replace it with another generator label.

## Registration Metadata

The `/daftar` page retains its SPMB focus and overrides:

- Title: `SPMB 2027/2028 | NUSA Boarding School`
- Description: `SPMB NUSA Boarding School 2027/2028 sudah dibuka. Isi formulir
  pendaftaran calon santri laki-laki untuk jurusan Programmer atau Designer.`
- Canonical: `/daftar`
- Open Graph URL: `/daftar`
- Open Graph title and description matching the registration page

Shared logo, social image, locale, and site name continue to inherit from the
root metadata where Next.js inheritance is reliable. Explicitly repeat fields
that Next.js replaces rather than merges.

## EducationalOrganization JSON-LD

Render one site-wide JSON-LD object with:

- `@context`: `https://schema.org`
- `@type`: `EducationalOrganization`
- `name`: `NUSA Boarding School`
- `alternateName`: `NUSA Boarding School Semarang`
- `url`: `https://nusabs.sch.id`
- Absolute logo and hero image URLs
- The approved root description
- Email and international-format telephone
- Postal address containing only address locality, region, and country
- `sameAs` containing the four existing public social destinations
- Admissions `contactPoint` with Indonesian as the supported language

Serialize with `JSON.stringify` and replace `<` with `\u003c` before assigning
the content through `dangerouslySetInnerHTML`. This prevents an injected
closing script sequence if configuration values are changed in the future.

The schema is organization-level and may appear site-wide. Do not add Product,
Course, Review, AggregateRating, Offer, or FAQ schema in this feature.

## Robots And Sitemap

`app/robots.ts` should:

- Allow `/` and other normal public pages.
- Disallow `/admin`, `/login`, `/reset-password`, `/test`, and
  `/test-supabase` including their descendants.
- Declare host `https://nusabs.sch.id`.
- Declare sitemap `https://nusabs.sch.id/sitemap.xml`.

`app/sitemap.ts` should expose only:

- `https://nusabs.sch.id/` with weekly change frequency and priority 1.
- `https://nusabs.sch.id/daftar` with weekly change frequency and priority
  0.9.

Do not include authentication, administration, testing, password reset, or API
routes.

## Error And Data Handling

The feature contains static configuration and has no runtime network request.
Invalid URL construction should fail during development or build rather than
silently emit malformed metadata. JSON-LD must be rendered from the same site
configuration used by metadata and sitemap generation.

## Testing

Add source and value-level tests covering:

- The canonical site URL and verified organization fields.
- Absence of `v0.app` from root layout metadata.
- Root title, description, canonical, Open Graph, Twitter Card, and icon paths.
- Registration canonical and SPMB-specific metadata.
- A parseable `EducationalOrganization` JSON-LD object with only approved
  properties and absolute URLs.
- Robots allow/disallow rules, host, and sitemap URL.
- Sitemap containing exactly `/` and `/daftar`.

Run the focused SEO tests, the full test suite, TypeScript validation, and the
production build. Existing unrelated TypeScript baseline errors remain outside
this feature.

## Acceptance Criteria

- Search engines receive a canonical URL for both public conversion pages.
- Shared links display a meaningful NUSA title, description, and real activity
  image.
- The browser receives the NUSA logo through Next.js icon metadata.
- Valid organization JSON-LD is present without unsupported claims.
- Sitemap contains only the homepage and registration page.
- Robots exclude internal, authentication, and test surfaces.
- `v0.app` no longer appears in public metadata.
- The visible website remains unchanged.
