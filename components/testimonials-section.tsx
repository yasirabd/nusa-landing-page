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

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md h-full flex flex-col min-w-0">
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-2xl" style={{color: '#E3B251'}}>★</span>
      ))}
    </div>

    {/* Quote */}
    <p className="text-sm leading-relaxed flex-grow mb-6" style={{color: '#134146'}}>
      "{testimonial.quote}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t flex-shrink-0" style={{borderColor: '#B6CB6C'}}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{backgroundColor: '#E3B251'}}>
        {testimonial.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-sm truncate" style={{color: '#134146'}}>
          {testimonial.name}
        </h3>
        <p className="text-xs truncate" style={{color: '#2C8970'}}>
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
    <section className="py-16 md:py-24 px-4 md:px-8" style={{backgroundColor: '#2C8970'}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold" style={{color: '#FFFFFF'}}>Testimoni</h2>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Slider Container */}
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={prev}
              disabled={!canGoPrev}
              className={`flex-shrink-0 rounded-full p-3 md:p-3.5 transition-all focus:outline-none ${
                canGoPrev ? 'hover:opacity-80' : 'cursor-not-allowed opacity-50'
              }`}
              style={{backgroundColor: '#B6CB6C'}}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" style={{color: '#134146'}} />
            </button>

            {/* Testimonials Grid */}
            <div className="flex-1 overflow-hidden">
              {/* grid adjusts columns responsively with Tailwind classes,
                  but we render only the slice (getVisibleTestimonials()) so it won't overflow */}
              <div
                className={`grid gap-4 ${
                  perPage === 1 ? 'grid-cols-1' : perPage === 2 ? 'grid-cols-2' : 'grid-cols-3'
                }`}
              >
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <TestimonialCard key={idx + currentIndex} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={next}
              disabled={!canGoNext}
              className={`flex-shrink-0 rounded-full p-3 md:p-3.5 transition-all focus:outline-none ${
                canGoNext ? 'hover:opacity-80' : 'cursor-not-allowed opacity-50'
              }`}
              style={{backgroundColor: '#B6CB6C'}}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" style={{color: '#134146'}} />
            </button>
          </div>

          {/* Small Dots Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: dotsCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-3 h-3'
                    : 'bg-white/50 w-2 h-2 hover:bg-white/75'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
