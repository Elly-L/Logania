import type React from "react"
import Navbar from "@/components/navbar"
import EnhancedMusicPlayer from "@/components/enhanced-music-player"

export default function WorldsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <EnhancedMusicPlayer autoplay={false} showControls={true} />
    </div>
  )
}

