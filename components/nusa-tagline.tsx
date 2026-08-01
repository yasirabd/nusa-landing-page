const COLORS = {
  darkBase: "#134146",
  accent: "#F3B233",
}

export function NUSATaglineSection() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center flex flex-col items-center justify-center space-y-8 sm:space-y-10 md:space-y-12">

          {/* Statement Pertama: Bold & Gigantic */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.15] tracking-tight" style={{color: COLORS.darkBase}}>
            Rise as a <br className="hidden sm:block" />
            <span className="font-serif italic font-medium tracking-wide" style={{ color: COLORS.accent }}>
              <span className="whitespace-nowrap">Muslim Tangguh,</span>{' '}
              <span className="whitespace-nowrap">Jago IT.</span>
            </span>
          </h2>

          {/* Pemisah Elegan ala Kutipan Minimalis */}
          <div className="w-12 sm:w-16 h-1 sm:h-1.5 rounded-full opacity-80" style={{ backgroundColor: COLORS.accent }} />

          {/* Statement Kedua: Secondary Motto (Bukan Paragraf Artikel) */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-medium leading-relaxed tracking-tight opacity-75 mx-auto max-w-4xl" style={{color: COLORS.darkBase}}>
            Faith at Heart. Tech in Hand. Purpose in Action.
          </h3>
          
        </div>
      </div>
    </section>
  );
}
