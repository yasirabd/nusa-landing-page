export const PUBLIC_NAV_ITEMS = [
  { label: "Program", sectionId: "program" },
  { label: "Kurikulum", sectionId: "kurikulum" },
  { label: "Kehidupan Santri", sectionId: "kehidupan-santri" },
  { label: "Pengajar", sectionId: "pengajar" },
  { label: "Biaya", sectionId: "biaya" },
  { label: "FAQ", sectionId: "faq" },
] as const

export type PublicSectionId = (typeof PUBLIC_NAV_ITEMS)[number]["sectionId"]

export function getPublicNavigationHref(
  pathname: string,
  sectionId: PublicSectionId,
) {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`
}
