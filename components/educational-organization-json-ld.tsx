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
