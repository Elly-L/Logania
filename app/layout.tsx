import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Game Logania - World-Building Hub",
  description: "Explore the enchanted realm of Game Logania, a free-to-play hub for world-building and storytelling.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'