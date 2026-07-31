import type { ReactElement } from "react"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CurriculumSection } from "@/components/curriculum-section"
import { FeeInfoSection } from "@/components/fee-info-section"
import { GallerySection } from "@/components/gallery-section"
import { ProgramSection } from "@/components/program-section"
import { TeachingTeamSection } from "@/components/teaching-team-section"

const anchoredSections: Array<{
  id: string
  component: ReactElement
}> = [
  { id: "program", component: <ProgramSection /> },
  { id: "kurikulum", component: <CurriculumSection /> },
  { id: "kehidupan-santri", component: <GallerySection /> },
  { id: "pengajar", component: <TeachingTeamSection /> },
  { id: "biaya", component: <FeeInfoSection /> },
]

describe("landing-page section anchors", () => {
  it.each(anchoredSections)("renders #$id with sticky-header offset", ({ id, component }) => {
    const { container } = render(component)

    expect(container.querySelector(`#${id}`)).toHaveClass("scroll-mt-20")
  })
})
