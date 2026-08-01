"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import {
  PUBLIC_NAV_ITEMS,
  getPublicNavigationHref,
  type PublicSectionId,
} from "@/components/public-navigation"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<PublicSectionId | null>(null)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null)
      return
    }

    const sections = PUBLIC_NAV_ITEMS.map(({ sectionId }) =>
      document.getElementById(sectionId),
    ).filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveSection(visible.target.id as PublicSectionId)
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-brand-dark/10 bg-brand-paper/90 font-sans text-brand-dark backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 md:px-6">
        <Link
          href="/"
          aria-label="NUSA Boarding School - Beranda"
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
        >
          <span className="text-lg font-semibold tracking-tight sm:text-xl">
            <span className="font-righteous font-normal tracking-wider text-brand">
              NUSA
            </span>{" "}
            <span className="hidden sm:inline">Boarding School</span>
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {PUBLIC_NAV_ITEMS.map(({ label, sectionId }) => {
            const active = activeSection === sectionId

            return (
              <Link
                key={sectionId}
                href={getPublicNavigationHref(pathname, sectionId)}
                aria-current={active ? "location" : undefined}
                className="relative rounded-md px-2.5 py-2 text-sm font-medium text-brand-dark/75 transition-colors duration-150 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-150 aria-[current=location]:text-brand-dark aria-[current=location]:after:scale-x-100"
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/daftar"
          className="ml-2 hidden min-h-11 items-center justify-center rounded-full bg-brand-accent px-5 text-sm font-semibold text-brand-dark shadow-sm transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#F6BE4D] hover:shadow-md active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:inline-flex"
        >
          Daftar Sekarang
        </Link>

        {hydrated ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Buka menu navigasi"
                className="ml-auto inline-flex size-11 items-center justify-center rounded-full border border-brand-dark/10 bg-white/70 text-brand-dark transition-[background-color,border-color] duration-150 hover:border-brand/30 hover:bg-white active:border-brand/40 active:bg-[#EAF5F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent className="w-[min(88vw,24rem)] border-l border-brand-dark/10 bg-brand-paper p-0 text-brand-dark data-[state=closed]:duration-200 data-[state=open]:duration-[250ms]">
              <SheetHeader className="border-b border-brand-dark/10 px-6 py-6 text-left">
                <SheetTitle className="text-xl font-semibold text-brand-dark">
                  Navigasi utama
                </SheetTitle>
                <SheetDescription className="text-sm leading-6 text-brand-dark/75">
                  Temukan program, kehidupan santri, biaya, dan informasi pendaftaran NUSA.
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Navigasi utama mobile"
                className="flex flex-col px-3 py-4"
              >
                {PUBLIC_NAV_ITEMS.map(({ label, sectionId }) => (
                  <SheetClose asChild key={sectionId}>
                    <Link
                      href={getPublicNavigationHref(pathname, sectionId)}
                      className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-brand-dark/80 transition-colors duration-150 hover:bg-brand/[0.08] hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto border-t border-brand-dark/10 p-6">
                <SheetClose asChild>
                  <Link
                    href="/daftar"
                    className="flex min-h-12 w-full items-center justify-center rounded-full bg-brand-accent px-5 font-semibold text-brand-dark transition-colors duration-150 hover:bg-[#F6BE4D] active:bg-[#E9A51F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    Daftar Sekarang
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ) : null}

        <noscript className="ml-auto lg:hidden">
          <details className="relative">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-brand-dark/10 bg-white/70 text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Navigasi tanpa JavaScript</span>
            </summary>
            <nav
              aria-label="Navigasi tanpa JavaScript"
              className="absolute top-12 right-0 z-50 w-72 rounded-2xl border border-brand-dark/10 bg-brand-paper p-3 shadow-xl"
            >
              {PUBLIC_NAV_ITEMS.map(({ label, sectionId }) => (
                <a
                  key={sectionId}
                  href={getPublicNavigationHref(pathname, sectionId)}
                  className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-brand-dark"
                >
                  {label}
                </a>
              ))}
              <a
                href="/daftar"
                className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-brand-accent px-4 font-semibold text-brand-dark"
              >
                Daftar Sekarang
              </a>
            </nav>
          </details>
        </noscript>
      </div>
    </header>
  )
}
