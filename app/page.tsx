import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NUSATaglineSection } from "@/components/nusa-tagline"
import { WhyChooseSection } from "@/components/why-choose-section"
import { ProgramSection } from "@/components/program-section"
import { CurriculumSection } from "@/components/curriculum-section"
import { TeachingTeamSection } from "@/components/teaching-team-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FeeInfoSection } from "@/components/fee-info-section"
import { FAQSection } from "@/components/faq-section"
import { PartnerSection } from "@/components/partner-section"
import { RegistrationSection } from "@/components/registration-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <NUSATaglineSection />
        <WhyChooseSection />
        <CurriculumSection />
        <ProgramSection />
        <TeachingTeamSection />
        <GallerySection />
        <TestimonialsSection />
        <FeeInfoSection />
        <FAQSection />
        <PartnerSection />
        <RegistrationSection />
      </main>

      <Footer />
    </div>
  )
}
