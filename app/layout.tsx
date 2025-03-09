import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EnhancedMusicPlayer from "@/components/enhanced-music-player"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Game Logania",
  description: "Explore the enchanted realm of Logania",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <EnhancedMusicPlayer autoplay={false} showControls={true} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'