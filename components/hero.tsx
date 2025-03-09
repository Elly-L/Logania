"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const router = useRouter()

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <motion.div className="absolute inset-0 hero-gradient" style={{ y: backgroundY }}></motion.div>

      <motion.div
        className="absolute inset-0 map-overlay"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      ></motion.div>

      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      ></motion.div>

      <motion.div className="container mx-auto px-4 py-20 relative z-10 text-center" style={{ y: textY, opacity }}>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to <span className="text-primary">Game Logania</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore an enchanted realm of ancient lore and magical wonder. Discover hidden pathways, forgotten secrets,
          and mystical landscapes.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg group"
            onClick={() => router.push("/welcome")}
          >
            Begin Your Journey
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              →
            </motion.span>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg">
            Learn More
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.5 },
            y: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <p className="text-sm font-medium mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 text-center py-4 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-white/90 font-medium">
          <span className="text-primary font-bold">100% Free-to-Play</span> • No Subscription Required • No Sign-Up
        </p>
      </motion.div>
    </section>
  )
}

