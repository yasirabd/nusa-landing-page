import { MessageCircleQuestion } from "lucide-react"
import { FAQ_ITEMS } from "@/components/faq-content"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-[#F7F7F2] px-4 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-[#42CDBA]/15 text-[#1F6F68]">
            <MessageCircleQuestion className="size-5" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2C8970]">
            FAQ
          </p>
          <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[#134146] sm:text-4xl">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#134146]/70">
            Jawaban singkat untuk membantu orang tua memahami program, biaya,
            dan proses pendaftaran sebelum berkonsultasi dengan admin.
          </p>
        </div>

        <Accordion
          type="multiple"
          className="border-t border-[#134146]/12"
        >
          {FAQ_ITEMS.map(({ id, question, answer }) => (
            <AccordionItem
              key={id}
              value={id}
              className="border-[#134146]/12"
            >
              <AccordionTrigger className="py-5 text-base font-semibold leading-6 text-[#134146] transition-colors duration-150 hover:text-[#2C8970] hover:no-underline focus-visible:ring-[#2C8970]/40 [&>svg]:transition-transform [&>svg]:duration-150">
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-5 pr-8 text-[15px] leading-7 text-[#134146]/[0.72]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
