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
