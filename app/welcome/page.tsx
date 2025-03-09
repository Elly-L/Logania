"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_O3UZ9Alx_1741458179650_raw.jpg-xl3LF5992A8vGV684w1tTTkdcAVZyF.jpeg"
          alt="Logania Map"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="relative w-24 h-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent" />
              <motion.div
                className="absolute inset-2 rounded-full border-4 border-purple-400 border-b-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
            <motion.p
              className="mt-6 text-white/80 font-cinzel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Entering the realm of Logania...
            </motion.p>
          </div>
        ) : (
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-cinzel">
              Welcome to <span className="text-primary">Logania</span>
            </h1>

            <div className="bg-black/60 backdrop-blur-sm p-6 md:p-8 rounded-xl mb-10">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium font-cinzel">
                A realm of ancient magic, legendary heroes, and untold mysteries awaits your discovery.
              </p>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                In this enchanted land, you'll encounter powerful mages, mystical forests that whisper secrets,
                mountains where dragons dwell, and vast seas hiding ancient civilizations. Your journey through Logania
                will be filled with adventure, danger, and discovery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg group"
                onClick={() => router.push("/introduction")}
              >
                Begin Your Journey
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 text-lg"
                onClick={() => router.push("/worlds")}
              >
                Explore Worlds
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

