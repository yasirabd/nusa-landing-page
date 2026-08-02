import { ExternalLink, MessageCircleQuestion } from "lucide-react"
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
      className="section-spacing-standard scroll-mt-20 bg-brand-paper px-4"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-brand-highlight/15 text-brand-depth">
            <MessageCircleQuestion className="size-5" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            FAQ
          </p>
          <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight text-brand-dark sm:text-4xl">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-brand-dark/75">
            Jawaban singkat untuk membantu orang tua memahami program, biaya,
            dan proses pendaftaran sebelum berkonsultasi dengan admin.
          </p>
        </div>

        <Accordion
          type="multiple"
          className="border-t border-brand-dark/12"
        >
          {FAQ_ITEMS.map(
            ({ id, question, answer, sourceLabel, sourceUrl }) => (
              <AccordionItem
                key={id}
                value={id}
                className="border-brand-dark/12"
              >
                <AccordionTrigger className="py-5 text-base font-semibold leading-6 text-brand-dark transition-colors duration-150 hover:text-brand hover:no-underline focus-visible:ring-brand/40 [&>svg]:transition-transform [&>svg]:duration-150">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-5 pr-8 text-[15px] leading-7 text-brand-dark/[0.72]">
                  <p>
                    {answer}{" "}
                    {sourceLabel && sourceUrl ? (
                      <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-baseline gap-1 font-semibold text-brand underline decoration-brand/35 underline-offset-4 transition-colors hover:text-brand-depth focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                      >
                        {sourceLabel}
                        <ExternalLink
                          className="size-3.5 self-center"
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
      </div>
    </section>
  )
}
