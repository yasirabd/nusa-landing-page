import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <link rel="icon" href="icons/logo.png" />
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 font-sans font-extrabold max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-sans font-black text-[rgba(44,137,112,1)]">
            <span className="font-righteous tracking-wider">NUSA </span><span className="text-slate-800 font-extrabold">Boarding School</span>
          </div>
        </Link>
        <div className="hidden md:block">
          <div className="text-[rgba(19,65,70,1)] text-sm font-semibold">#Muslim Tangguh Jago IT</div>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-primary">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
