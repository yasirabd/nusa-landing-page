import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

// Reusable component to wrap the social media icon link
function SocialIcon({ href, title, src }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/15 hover:text-[#e3b251]"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
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
    <footer className="text-white" style={{ backgroundColor: "#134146" }}>
      <div className="container px-4 py-12 md:px-6 md:py-16 max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-2xl font-bold">
              <span className="font-righteous tracking-wider">NUSA</span> <span className="text-white">Boarding School</span>
            </div>
            <p className="text-md mt-4 text-white/70">
              Membentuk Generasi <span className="font-romulo-italic tracking-wide text-xl" style={{ color: "#e3b251" }}>Muslim Tangguh Jago IT</span>
            </p>
            <div className="mt-6 flex space-x-4">

              <SocialIcon
                href="https://instagram.com/nusaboardingschool"
                title="Instagram"
                src="/icons/instagram.svg"
              />

              <SocialIcon
                href="https://youtube.com/nusaboardingschool"
                title="YouTube"
                src="/icons/youtube.svg"
              />

              <SocialIcon
                href="https://tiktok.com/@nusaboardingschool"
                title="TikTok"
                src="/icons/tiktok.svg"
              />

              <SocialIcon
                href="https://facebook.com/nusaboardingschool"
                title="Facebook"
                src="/icons/facebook.svg"
              />

            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold" style={{ color: "#e3b251" }}>
              Kontak
            </h3>

            <div className="space-y-4 text-white/80">

              {/* Email */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <Mail className="w-5 h-5" style={{ color: "#e3b251" }} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm text-white/60">Email us</p>
                  <a
                    href="mailto:info@nusabs.sch.id"
                    className="text-base font-medium hover:text-white transition-colors duration-200"
                  >
                    info@nusabs.sch.id
                  </a>
                </div>
              </div>

              {/* WhatsApp / Phone */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <Phone className="w-5 h-5" style={{ color: "#e3b251" }} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm text-white/60">Contact us</p>
                  <a
                    href="https://wa.me/6281392706707"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium hover:text-white transition-colors duration-200"
                  >
                    081392706707
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "#e3b251" }} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm text-white/60">Visit us</p>
                  <a
                    href="https://maps.app.goo.gl/pR3KqRYPf84yrZB36"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium hover:text-white transition-colors duration-200"
                  >
                    Get Direction
                  </a>
                </div>
              </div>

            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold" style={{ color: "#e3b251" }}>
              Lokasi
            </h3>
            {/* MAP CLICKABLE */}
            <a
              href="https://maps.app.goo.gl/pR3KqRYPf84yrZB36"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden shadow-sm transition-transform duration-200 hover:scale-[1.02]"
              aria-label="Buka peta NUSA Boarding School di Google Maps"
            >
              <div className="w-full" style={{ aspectRatio: "7/3", minHeight: 70 }}>
                <iframe
                  title="Map NUSA Boarding School"
                  src="https://www.google.com/maps?q=Map+NUSA+Boarding+School&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ display: "block" }}
                />
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 text-center text-sm text-white/60 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} NUSA Boarding School Semarang. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}