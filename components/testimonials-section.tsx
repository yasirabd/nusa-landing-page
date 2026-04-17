'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: "Dr. Ir. Edy Susilo, MT",
    role: "Ketua Yayasan Islam Nurus Sunnah",
    quote:
      "NUSA membekali anak-anak untuk punya lifeskill dalam bidang IT dan memiliki karakter yang baik.",
  },
  {
    name: "Dr.Eng. Adi Wibowo, S.Si., M.Kom",
    role: "Wali Murid SD Islam Nurus Sunnah",
    quote:
      "Keren banget! NUSA tidak hanya fokus ke ilmu agama dan akhlak mulia sesuai tuntunan Ahlus Sunnah wal Jama’ah, tetapi juga menyiapkan generasi Qur’ani yang menguasai teknologi. Semoga makin sukses dan terus istiqamah!",
  },
  {
    name: "Izzul Fairuz Mahendra",
    role: "Santri Angkatan 1",
    quote:
      "Satu-satunya sekolah IT yang ada di Semarang.",
  },
  {
    name: "Muhammad Fachri",
    role: "Santri Angkatan 1",
    quote:
      "NUSA mengajarkan bisnis hingga dapat uang menggunakan teknologi terbaru.",
  },
]

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
  neonCyan: "#8EF3E7",
}

const TestimonialCard = ({ testimonial }) => (
  <div className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-10 flex flex-col min-w-0 h-full transition-all duration-500 ease-out border border-white/40 shadow-sm hover:-translate-y-2 hover:border-[#42CDBA]/40 hover:ring-4 hover:ring-[#42CDBA]/10 hover:shadow-[0_20px_50px_-12px_rgba(66,205,186,0.4)] relative overflow-hidden">
    
    {/* Micro Tech-Node Decoration at Top Right */}
    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden rounded-tr-3xl">
      <div className="absolute top-[-2px] right-[-2px] w-8 h-8 border-t-2 border-r-2 border-[#42CDBA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl"></div>
    </div>

    {/* Stars */}
    <div className="flex gap-1 mb-6 mt-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-xl md:text-2xl" style={{color: COLORS.accent}}>★</span>
      ))}
    </div>

    {/* Quote Lebih Kalem & Proporsional */}
    <p className="text-sm md:text-base font-normal italic leading-relaxed flex-grow mb-8 opacity-90" style={{color: COLORS.darkBase}}>
      "{testimonial.quote}"
    </p>

    {/* Author (Border Opacity 12%) */}
    <div className="flex items-center gap-4 pt-6 mt-auto border-t flex-shrink-0 relative" style={{borderColor: 'rgba(19, 65, 70, 0.12)'}}>
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm relative z-10" style={{backgroundColor: COLORS.accent}}>
        {testimonial.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1 z-10">
        <h3 className="font-bold text-sm md:text-base truncate" style={{color: COLORS.darkBase}}>
          {testimonial.name}
        </h3>
        {/* Role Opacity 70% */}
        <p className="text-xs md:text-sm font-medium truncate" style={{color: 'rgba(19, 65, 70, 0.70)'}}>
          {testimonial.role}
        </p>
      </div>
    </div>
  </div>
)

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const containerRef = useRef(null)

  // determine perPage from window width (sync with Tailwind breakpoints)
  useEffect(() => {
    const calcPerPage = () => {
      if (typeof window === 'undefined') return 3
      const w = window.innerWidth
      // Tailwind default breakpoints: sm = 640, md = 768
      if (w < 640) return 1       // mobile
      if (w >= 640 && w < 768) return 2 // small/tablet
      return 3                    // desktop
    }

    const update = () => {
      const newPer = calcPerPage()
      setPerPage(prev => {
        if (prev !== newPer) return newPer
        return prev
      })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // ensure currentIndex is valid when perPage or testimonials change
  useEffect(() => {
    const maxIndex = Math.max(0, testimonials.length - perPage)
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [perPage, currentIndex])

  const maxIndex = Math.max(0, testimonials.length - perPage)

  const next = () => {
    setCurrentIndex((prev) => {
      const nextIdx = Math.min(prev + 1, maxIndex)
      return nextIdx
    })
  }

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const getVisibleTestimonials = () => {
    // safe slice even if index + perPage > length
    return testimonials.slice(currentIndex, currentIndex + perPage)
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  // --- simple swipe support for touch devices ---
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let startX = 0
    let isPointerDown = false

    const onPointerDown = (e) => {
      isPointerDown = true
      startX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    }
    const onPointerMove = (e) => {
      if (!isPointerDown) return
      // nothing to do here for now
    }
    const onPointerUp = (e) => {
      if (!isPointerDown) return
      const endX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX) || 0
      const dx = endX - startX
      const threshold = 50 // px
      if (dx > threshold) {
        prev()
      } else if (dx < -threshold) {
        next()
      }
      isPointerDown = false
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    // fallback for touch events on some browsers
    el.addEventListener('touchstart', onPointerDown)
    el.addEventListener('touchend', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('touchstart', onPointerDown)
      el.removeEventListener('touchend', onPointerUp)
    }
  }, [containerRef, currentIndex, perPage])

  // number of pagination dots (groups)
  const dotsCount = Math.max(1, testimonials.length - perPage + 1)

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden" style={{backgroundColor: COLORS.primary}}>
      {/* Background Digital Cyber Grid (Kotak-Kotak Seragam dengan Section Lainnya) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, ${COLORS.neonCyan}1A 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.neonCyan}1A 1px, transparent 1px)`,
        backgroundSize: '4rem 4rem'
      }}></div>

      {/* Radial Glow Center Background to soften inner grid area */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#2C8970_100%)] pointer-events-none"></div>

      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mx-auto max-w-4xl text-center mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{color: COLORS.white}}>
            Testimoni
          </h2>
          {/* Subtitle dilebarkan ke max-w-3xl agar satu kalimat panjang memanjang utuh tidak terpelanting di tengah-tengah kalimat */}
          <p className="text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto opacity-90" style={{ color: COLORS.white }}>
            Apa kata mereka yang telah membersamai perjalanan <span className="font-righteous font-normal tracking-wide">NUSA</span> Boarding School?
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          
          {/* Testimonials Grid (Full Width, Free from Squeeze!) 
              - Removed overflow-hidden to fix clipping on translate-y
              - Added pt-8 pb-16 to give massive breathing room for shadow and bounce 
          */}
          <div className="pt-6 pb-14 px-2 -mx-2">
            <div
              className={`grid gap-6 md:gap-8 ${
                perPage === 1 ? 'grid-cols-1' : perPage === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              {getVisibleTestimonials().map((testimonial, idx) => (
                <TestimonialCard key={idx + currentIndex} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Unified Carousel Controls System (Apple-like bottom navigation) */}
          <div className="flex items-center justify-center gap-6 mt-4">
            
            {/* Left Arrow */}
            <button
              onClick={prev}
              disabled={!canGoPrev}
              className={`flex-shrink-0 rounded-full p-3 transition-all focus:outline-none ${
                canGoPrev ? 'hover:scale-110 hover:shadow-lg' : 'cursor-not-allowed opacity-40'
              }`}
              style={{backgroundColor: COLORS.secondary}}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" style={{color: COLORS.darkBase}} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3">
              {Array.from({ length: dotsCount }).map((_, index) => (
                <button
                   key={index}
                   onClick={() => setCurrentIndex(index)}
                   className={`rounded-full transition-all duration-300 ${
                     index === currentIndex ? 'w-8 h-2.5' : 'w-2.5 h-2.5 opacity-40 hover:opacity-100'
                   }`}
                   style={{backgroundColor: COLORS.white}}
                   aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={next}
              disabled={!canGoNext}
              className={`flex-shrink-0 rounded-full p-3 transition-all focus:outline-none ${
                canGoNext ? 'hover:scale-110 hover:shadow-lg' : 'cursor-not-allowed opacity-40'
              }`}
              style={{backgroundColor: COLORS.secondary}}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" style={{color: COLORS.darkBase}} />
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}
