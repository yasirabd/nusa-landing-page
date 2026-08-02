import Link from "next/link"
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { SPMB_WHATSAPP_URL } from "@/lib/public-contact"

type SocialIconProps = {
  href: string
  title: string
  src: string
}

function SocialIcon({ href, title, src }: SocialIconProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-[background-color,border-color] duration-150 hover:border-white/20 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      title={title}
    >
      <img
        src={src}
        alt=""
        className="h-5 w-5 invert transition-[filter] duration-150 group-hover:brightness-110"
      />
      <span className="sr-only">{title}</span>
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container px-4 pt-12 pb-6 md:px-8 md:pt-16 md:pb-8 max-w-7xl mx-auto">
        <div className="grid gap-8 md:gap-7 lg:grid-cols-3">
          
          {/* Kolom 1: Branding NUSA */}
          <div className="lg:pr-8">
            <div className="text-2xl lg:text-3xl font-bold mb-4 shadow-sm">
              <span className="font-righteous tracking-wider drop-shadow-sm">NUSA</span> <span className="text-white">Boarding School</span>
            </div>
            <p className="text-md lg:text-lg mb-5 text-white/70 leading-relaxed font-medium">
              Membentuk Generasi <span className="mt-1 block font-serif text-xl font-normal italic tracking-wide text-brand-accent lg:text-2xl">Muslim Tangguh Jago IT</span>
            </p>
            <div className="flex gap-3">
              <SocialIcon href="https://instagram.com/nusaboardingschool" title="Instagram" src="/icons/instagram.svg" />
              <SocialIcon href="https://youtube.com/nusaboardingschool" title="YouTube" src="/icons/youtube.svg" />
              <SocialIcon href="https://tiktok.com/@nusaboardingschool" title="TikTok" src="/icons/tiktok.svg" />
              <SocialIcon href="https://facebook.com/nusaboardingschool" title="Facebook" src="/icons/facebook.svg" />
            </div>
          </div>

          {/* Kolom 2: Kontak */}
          <div className="lg:pl-4">
            <h3 className="mb-5 text-lg font-bold uppercase tracking-wider text-brand-accent">
              Kontak
            </h3>
            <div className="space-y-5 text-white/80">
              
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-[background-color] duration-150 group-hover:bg-white/10">
                  <Mail className="h-5 w-5 text-brand-accent" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium opacity-60 mb-1 text-white">Email</p>
                  <a href="mailto:info@nusabs.sch.id" className="rounded-sm text-base font-semibold transition-colors duration-200 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                    info@nusabs.sch.id
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-[background-color] duration-150 group-hover:bg-white/10">
                  <Phone className="h-5 w-5 text-brand-accent" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium opacity-60 mb-1 text-white">Telepon & WhatsApp</p>
                  <a href={SPMB_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-sm text-base font-semibold transition-colors duration-200 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                    081392706707
                  </a>
                </div>
              </div>

              {/* Map Direction */}
              <div className="flex items-center gap-4 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-[background-color] duration-150 group-hover:bg-white/10">
                  <MapPin className="h-5 w-5 text-brand-accent" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium opacity-60 mb-1 text-white">Kunjungi Kami</p>
                  <a href="https://maps.app.goo.gl/pR3KqRYPf84yrZB36" target="_blank" rel="noopener noreferrer" className="rounded-sm text-base font-semibold transition-colors duration-200 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                    Petunjuk Arah
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom 3: Interactive Glass Map */}
          <div>
            <h3 className="mb-5 text-lg font-bold uppercase tracking-wider text-brand-accent">
              Lokasi
            </h3>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-inner" style={{ minHeight: 180 }}>
                <iframe
                  title="Peta lokasi NUSA Boarding School"
                  src="https://www.google.com/maps?q=Map+NUSA+Boarding+School&output=embed"
                  className="block h-full w-full border-0 grayscale-[35%] contrast-125"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/pR3KqRYPf84yrZB36"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                Buka di Google Maps
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-8 md:mt-12 pt-5 md:pt-6 text-center text-sm text-white/50 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} NUSA Boarding School Semarang. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
