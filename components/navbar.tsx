"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Function to determine if we're on the homepage
  const isHomePage = pathname === "/"

  // Create proper links based on current page
  const getLink = (hash: string) => {
    if (isHomePage) {
      return hash // On homepage, just use the hash
    } else {
      return `/${hash.substring(1)}` // On other pages, convert #about to /about
    }
  }

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eltek-logo%20-%20Copy.jpg-8qOSOcThrJUtAOdJ0BuBuXtGpmFsKM.jpeg"
            alt="Game Logania Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="font-cinzel text-xl font-bold text-white">Game Logania</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href={isHomePage ? "#about" : "/#about"} className="text-white/80 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/worlds" className="text-white/80 hover:text-primary transition-colors">
            Worlds
          </Link>
          <Link href="/introduction" className="text-white/80 hover:text-primary transition-colors">
            Introduction
          </Link>
          <Link
            href={isHomePage ? "#developer" : "/#developer"}
            className="text-white/80 hover:text-primary transition-colors"
          >
            Developer
          </Link>
          <Link
            href={isHomePage ? "#features" : "/#features"}
            className="text-white/80 hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link href="/join" className="text-white/80 hover:text-primary transition-colors">
            Join Us
          </Link>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/introduction")}>
            Explore Now
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href={isHomePage ? "#about" : "/#about"}
              className="text-white/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/worlds"
              className="text-white/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Worlds
            </Link>
            <Link
              href="/introduction"
              className="text-white/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Introduction
            </Link>
            <Link
              href={isHomePage ? "#developer" : "/#developer"}
              className="text-white/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Developer
            </Link>
            <Link
              href={isHomePage ? "#features" : "/#features"}
              className="text-white/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/join"
              className="text-white/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Us
            </Link>
            <Button
              className="bg-primary hover:bg-primary/90 w-full"
              onClick={() => {
                router.push("/introduction")
                setIsMenuOpen(false)
              }}
            >
              Explore Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

