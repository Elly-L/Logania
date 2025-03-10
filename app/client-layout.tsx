"use client"
import type React from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EnhancedMusicPlayer from "@/components/enhanced-music-player"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showFooter = !pathname.startsWith("/worlds")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      {showFooter && <Footer />}
      <EnhancedMusicPlayer autoplay={false} showControls={true} />
    </div>
  )
}

