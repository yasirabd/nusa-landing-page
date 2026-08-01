export function NUSATaglineSection() {
  return (
    <section className="section-spacing-standard bg-white">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center flex flex-col items-center justify-center space-y-8 sm:space-y-10 md:space-y-12">

          {/* Statement Pertama: Bold & Gigantic */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.15] tracking-tight text-brand-dark">
            Rise as a <br className="hidden sm:block" />
            <span className="font-serif italic font-normal tracking-wide text-brand-accent">
              <span className="whitespace-nowrap">Muslim Tangguh,</span>{' '}
              <span className="whitespace-nowrap">Jago IT.</span>
            </span>
          </h2>

          {/* Pemisah Elegan ala Kutipan Minimalis */}
          <div className="h-1 w-12 rounded-full bg-brand-accent opacity-80 sm:h-1.5 sm:w-16" />

          {/* Statement Kedua: Secondary Motto (Bukan Paragraf Artikel) */}
          <h3 className="mx-auto max-w-4xl text-xl font-medium leading-relaxed tracking-tight text-brand-dark opacity-75 sm:text-2xl md:text-3xl lg:text-[34px]">
            Faith at Heart. Tech in Hand. Purpose in Action.
          </h3>
          
        </div>
      </div>
    </section>
  );
}
