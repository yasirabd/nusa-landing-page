# Public SEO Metadata Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accurate canonical metadata, social previews, organization structured data, crawl rules, and a two-page sitemap for the NUSA Boarding School public site.

**Architecture:** A typed `lib/site-config.ts` module owns every verified public fact and asset path. Next.js metadata routes and a focused JSON-LD component consume that module, while one Vitest contract verifies the emitted values and prevents unsupported claims or private routes from entering public discovery.

**Tech Stack:** Next.js 16 App Router metadata APIs, React 18, TypeScript, Vitest

---

### Task 1: Define The Failing Public SEO Contract

**Files:**
- Create: `tests/public-seo-metadata.test.ts`

- [ ] **Step 1: Write the failing SEO contract test**

Create `tests/public-seo-metadata.test.ts` with imports for the future site configuration, JSON-LD object and serializer, robots route, and sitemap route. Assert the exact canonical domain, verified identity and contact fields, approved homepage and registration copy, safe JSON-LD serialization, private-route exclusions, and the exact two public sitemap entries:

```ts
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

import {
  educationalOrganizationJsonLd,
  serializeJsonLd,
} from "@/components/educational-organization-json-ld"
import robots from "@/app/robots"
import { siteConfig } from "@/lib/site-config"

describe("NUSA public SEO metadata", () => {
  it("keeps verified public identity in one canonical configuration", () => {
    expect(siteConfig.url.toString()).toBe("https://nusabs.sch.id/")
    expect(siteConfig.name).toBe("NUSA Boarding School")
    expect(siteConfig.alternateName).toBe("NUSA Boarding School Semarang")
    expect(siteConfig.title).toBe(
      "NUSA Boarding School Semarang | Sekolah IT Islami",
    )
    expect(siteConfig.description).toBe(
      "Boarding school islami tingkat SMA di Kota Semarang dengan jurusan Programmer dan Designer. SPMB NUSA Boarding School 2027/2028 sudah dibuka.",
    )
    expect(siteConfig.email).toBe("info@nusabs.sch.id")
    expect(siteConfig.telephone).toBe("+62 813-9270-6707")
    expect(siteConfig.location).toEqual({
      locality: "Semarang",
      region: "Jawa Tengah",
      country: "Indonesia",
    })
    expect(siteConfig.socialLinks).toEqual([
      "https://instagram.com/nusaboardingschool",
      "https://youtube.com/nusaboardingschool",
      "https://tiktok.com/@nusaboardingschool",
      "https://facebook.com/nusaboardingschool",
    ])
    expect(siteConfig.registration).toEqual({
      title: "SPMB 2027/2028 | NUSA Boarding School",
      description:
        "SPMB NUSA Boarding School 2027/2028 sudah dibuka. Isi formulir pendaftaran calon santri laki-laki untuk jurusan Programmer atau Designer.",
    })
  })

  it("declares complete root and registration metadata", () => {
    const rootLayout = readFileSync("app/layout.tsx", "utf8")
    const registrationPage = readFileSync("app/daftar/page.tsx", "utf8")

    expect(rootLayout).toContain("metadataBase: siteConfig.url")
    expect(rootLayout).toContain("title: siteConfig.title")
    expect(rootLayout).toContain("description: siteConfig.description")
    expect(rootLayout).toContain('canonical: "/"')
    expect(rootLayout).toContain('locale: "id_ID"')
    expect(rootLayout).toContain('type: "website"')
    expect(rootLayout).toContain('card: "summary_large_image"')
    expect(rootLayout).toContain("siteConfig.assets.logo")
    expect(rootLayout).toContain("siteConfig.assets.socialImage")
    expect(rootLayout).not.toContain("v0.app")

    expect(registrationPage).toContain("siteConfig.registration.title")
    expect(registrationPage).toContain("siteConfig.registration.description")
    expect(registrationPage).toContain('canonical: "/daftar"')
    expect(registrationPage).toContain('url: "/daftar"')
  })

  it("emits safe EducationalOrganization structured data", () => {
    expect(educationalOrganizationJsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "NUSA Boarding School",
      alternateName: "NUSA Boarding School Semarang",
      url: "https://nusabs.sch.id/",
      logo: "https://nusabs.sch.id/icons/logo.png",
      image: "https://nusabs.sch.id/images/nusa-hero-image.webp",
      description:
        "Boarding school islami tingkat SMA di Kota Semarang dengan jurusan Programmer dan Designer. SPMB NUSA Boarding School 2027/2028 sudah dibuka.",
      email: "info@nusabs.sch.id",
      telephone: "+62 813-9270-6707",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Semarang",
        addressRegion: "Jawa Tengah",
        addressCountry: "Indonesia",
      },
      sameAs: [
        "https://instagram.com/nusaboardingschool",
        "https://youtube.com/nusaboardingschool",
        "https://tiktok.com/@nusaboardingschool",
        "https://facebook.com/nusaboardingschool",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "admissions",
        telephone: "+62 813-9270-6707",
        email: "info@nusabs.sch.id",
        availableLanguage: "Indonesian",
      },
    })
    expect(JSON.parse(serializeJsonLd(educationalOrganizationJsonLd))).toEqual(
      educationalOrganizationJsonLd,
    )
    expect(serializeJsonLd({ value: "</script>" })).toContain(
      "\\u003c/script>",
    )
  })

  it("allows public crawling while excluding internal surfaces", () => {
    expect(robots()).toEqual({
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [
            "/admin",
            "/login",
            "/reset-password",
            "/test",
            "/test-supabase",
          ],
        },
      ],
      host: "https://nusabs.sch.id",
      sitemap: "https://nusabs.sch.id/sitemap.xml",
    })
  })

  it("publishes exactly the homepage and registration page", async () => {
    const { default: sitemap } = await import("@/app/sitemap")

    expect(sitemap()).toEqual([
      {
        url: "https://nusabs.sch.id/",
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://nusabs.sch.id/daftar",
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ])
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/public-seo-metadata.test.ts`

Expected: FAIL because `lib/site-config.ts`, `components/educational-organization-json-ld.tsx`, and `app/sitemap.ts` do not exist.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/public-seo-metadata.test.ts
git commit -m "test: define public SEO metadata contract"
```

### Task 2: Add Verified Site Configuration And JSON-LD

**Files:**
- Create: `lib/site-config.ts`
- Create: `components/educational-organization-json-ld.tsx`
- Test: `tests/public-seo-metadata.test.ts`

- [ ] **Step 1: Create the verified public site configuration**

Create `lib/site-config.ts` with immutable values and a real `URL` object so malformed canonical configuration fails during development or build:

```ts
export const siteConfig = {
  url: new URL("https://nusabs.sch.id"),
  name: "NUSA Boarding School",
  alternateName: "NUSA Boarding School Semarang",
  title: "NUSA Boarding School Semarang | Sekolah IT Islami",
  description:
    "Boarding school islami tingkat SMA di Kota Semarang dengan jurusan Programmer dan Designer. SPMB NUSA Boarding School 2027/2028 sudah dibuka.",
  email: "info@nusabs.sch.id",
  telephone: "+62 813-9270-6707",
  location: {
    locality: "Semarang",
    region: "Jawa Tengah",
    country: "Indonesia",
  },
  socialLinks: [
    "https://instagram.com/nusaboardingschool",
    "https://youtube.com/nusaboardingschool",
    "https://tiktok.com/@nusaboardingschool",
    "https://facebook.com/nusaboardingschool",
  ],
  assets: {
    logo: "/icons/logo.png",
    socialImage: "/images/nusa-hero-image.webp",
  },
  registration: {
    title: "SPMB 2027/2028 | NUSA Boarding School",
    description:
      "SPMB NUSA Boarding School 2027/2028 sudah dibuka. Isi formulir pendaftaran calon santri laki-laki untuk jurusan Programmer atau Designer.",
  },
} as const
```

- [ ] **Step 2: Create the safe structured-data component**

Create `components/educational-organization-json-ld.tsx`. Build all absolute URLs from `siteConfig.url`, export the data and serializer for focused tests, and render one `application/ld+json` script:

```tsx
import { siteConfig } from "@/lib/site-config"

export const educationalOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.url.toString(),
  logo: new URL(siteConfig.assets.logo, siteConfig.url).toString(),
  image: new URL(siteConfig.assets.socialImage, siteConfig.url).toString(),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.telephone,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.locality,
    addressRegion: siteConfig.location.region,
    addressCountry: siteConfig.location.country,
  },
  sameAs: siteConfig.socialLinks,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "admissions",
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    availableLanguage: "Indonesian",
  },
} as const

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function EducationalOrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(educationalOrganizationJsonLd),
      }}
    />
  )
}
```

- [ ] **Step 3: Run the focused test and confirm only route and metadata assertions remain RED**

Run: `npm test -- tests/public-seo-metadata.test.ts`

Expected: FAIL because `app/sitemap.ts` is still absent. Vite resolves the dynamic route import during collection, so the remaining assertions run after the metadata routes are added in Task 3.

- [ ] **Step 4: Commit the verified data layer**

```bash
git add lib/site-config.ts components/educational-organization-json-ld.tsx
git commit -m "feat: add verified NUSA structured data"
```

### Task 3: Add Public Metadata, Robots, And Sitemap

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/daftar/page.tsx`
- Modify: `app/robots.ts`
- Create: `app/sitemap.ts`
- Test: `tests/public-seo-metadata.test.ts`

- [ ] **Step 1: Replace root metadata and mount site-wide JSON-LD**

In `app/layout.tsx`, import `Metadata`, `EducationalOrganizationJsonLd`, and `siteConfig`. Type the metadata export, remove `generator`, set canonical and social metadata from verified configuration, and render `<EducationalOrganizationJsonLd />` inside `<head>`:

```tsx
import type { Metadata } from "next"
import type React from "react"
import "@/app/globals.css"

import { EducationalOrganizationJsonLd } from "@/components/educational-organization-json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/site-config"
import { GeistSans } from "geist/font/sans"
import { Righteous } from "next/font/google"

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
})

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: siteConfig.assets.socialImage,
        width: 1200,
        height: 794,
        alt: "Kegiatan santri NUSA Boarding School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.assets.socialImage],
  },
  icons: {
    icon: [{ url: siteConfig.assets.logo, type: "image/png", sizes: "500x500" }],
    apple: [{ url: siteConfig.assets.logo, sizes: "500x500" }],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <EducationalOrganizationJsonLd />
      </head>
      <body
        className={`${GeistSans.variable} ${righteous.variable} font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Add registration-specific metadata**

In `app/daftar/page.tsx`, import `Metadata` and `siteConfig`, type the export, use the approved registration copy, and explicitly repeat the Open Graph fields replaced at page level:

```tsx
import type { Metadata } from "next"

import { Header } from "@/components/header"
import { RegistrationFormPage } from "@/components/registration-form-page"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: siteConfig.registration.title,
  description: siteConfig.registration.description,
  alternates: { canonical: "/daftar" },
  openGraph: {
    title: siteConfig.registration.title,
    description: siteConfig.registration.description,
    url: "/daftar",
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: siteConfig.assets.socialImage,
        width: 1200,
        height: 794,
        alt: "Kegiatan santri NUSA Boarding School",
      },
    ],
  },
}
```

Preserve the existing `DaftarPage` JSX unchanged below the metadata export.

- [ ] **Step 3: Complete robots and sitemap metadata routes**

Replace `app/robots.ts` with rules derived from the canonical origin:

```ts
import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/login",
          "/reset-password",
          "/test",
          "/test-supabase",
        ],
      },
    ],
    host: siteConfig.url.origin,
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  }
}
```

Create `app/sitemap.ts` with exactly two public conversion pages:

```ts
import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/daftar", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/public-seo-metadata.test.ts`

Expected: PASS with 5 passing tests.

- [ ] **Step 5: Commit the public discovery metadata**

```bash
git add app/layout.tsx app/daftar/page.tsx app/robots.ts app/sitemap.ts
git commit -m "feat: publish public SEO metadata"
```

### Task 4: Verify The Feature

**Files:**
- Verify: `tests/public-seo-metadata.test.ts`
- Verify: `app/layout.tsx`
- Verify: `app/daftar/page.tsx`
- Verify: `app/robots.ts`
- Verify: `app/sitemap.ts`
- Verify: `lib/site-config.ts`
- Verify: `components/educational-organization-json-ld.tsx`

- [ ] **Step 1: Run the complete test suite**

Run: `npm test`

Expected: all Vitest suites pass.

- [ ] **Step 2: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: no new errors in the UX-13 files. If the known pre-existing errors in `app/admin/page.tsx` or `components/footer.tsx` remain, record them exactly rather than changing unrelated code.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: Next.js production build succeeds and emits `/robots.txt` and `/sitemap.xml` routes.

- [ ] **Step 4: Check whitespace and branch scope**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short --branch`

Expected: branch `feat/public-seo-metadata` contains only the user-owned untracked `docs/2026-07-30-ui-ux-audit.md`; do not add or modify that file.

- [ ] **Step 5: Stop for user review**

Report the SEO changes and verification evidence. Do not merge into `main` until the user explicitly approves the feature.
