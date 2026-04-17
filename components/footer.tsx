import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
}

// Reusable component to wrap the social media icon link
function SocialIcon({ href, title, src }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:-translate-y-1 bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20"
      title={title}
    >
      <img
        src={src}
        alt={title}
        className="w-5 h-5 invert group-hover:brightness-110 transition-all duration-300"
      />
      <span className="sr-only">{title}</span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: COLORS.darkBase }}>
      <div className="container px-4 pt-16 pb-6 md:px-8 md:pt-24 md:pb-8 max-w-7xl mx-auto">
        <div className="grid gap-10 md:gap-8 lg:grid-cols-3">
          
          {/* Kolom 1: Branding NUSA */}
          <div className="lg:pr-8">
            <div className="text-2xl lg:text-3xl font-bold mb-5 shadow-sm">
              <span className="font-righteous tracking-wider drop-shadow-sm">NUSA</span> <span className="text-white">Boarding School</span>
            </div>
            <p className="text-md lg:text-lg mb-6 text-white/70 leading-relaxed font-medium">
              Membentuk Generasi <span className="font-romulo-italic font-normal tracking-wide text-xl lg:text-2xl mt-1 block" style={{ color: COLORS.accent }}>Muslim Tangguh Jago IT</span>
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
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wider" style={{ color: COLORS.accent }}>
              Kontak
            </h3>
            <div className="space-y-6 text-white/80">
              
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10">
                  <Mail className="w-5 h-5" style={{ color: COLORS.accent }} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium opacity-60 mb-1 text-white">Email us</p>
                  <a href="mailto:info@nusabs.sch.id" className="text-base font-semibold hover:text-[#F3B233] transition-colors duration-200">
                    info@nusabs.sch.id
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10">
                  <Phone className="w-5 h-5" style={{ color: COLORS.accent }} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium opacity-60 mb-1 text-white">Telepon & WhatsApp</p>
                  <a href="https://wa.me/6281392706707" target="_blank" rel="noopener noreferrer" className="text-base font-semibold hover:text-[#F3B233] transition-colors duration-200">
                    081392706707
                  </a>
                </div>
              </div>

              {/* Map Direction */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10">
                  <MapPin className="w-5 h-5" style={{ color: COLORS.accent }} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium opacity-60 mb-1 text-white">Visit us</p>
                  <a href="https://maps.app.goo.gl/pR3KqRYPf84yrZB36" target="_blank" rel="noopener noreferrer" className="text-base font-semibold hover:text-[#F3B233] transition-colors duration-200">
                    Get Direction
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom 3: Interactive Glass Map */}
          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wider" style={{ color: COLORS.accent }}>
              Lokasi
            </h3>
            <div className="p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10">
              <a
                href="https://maps.app.goo.gl/pR3KqRYPf84yrZB36"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden shadow-inner group relative"
                aria-label="Buka peta NUSA Boarding School di Google Maps"
              >
                {/* Visual Glint on Map hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none z-10"></div>
                <div className="w-full relative z-0 aspect-video" style={{ minHeight: 180 }}>
                  <iframe
                    title="Map NUSA Boarding School"
                    src="https://www.google.com/maps?q=Map+NUSA+Boarding+School&output=embed"
                    className="w-full h-full border-0 grayscale-[50%] contrast-125 group-hover:grayscale-0 transition-all duration-500 block"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 md:mt-16 pt-6 md:pt-8 text-center text-sm text-white/50 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} NUSA Boarding School Semarang. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}