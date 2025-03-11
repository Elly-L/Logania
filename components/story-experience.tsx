"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, X } from "lucide-react"

interface AudioTrack {
  id: string
  src: string
  volume: number
  loop?: boolean
}

interface Scene {
  id: string
  image: string
  text: string[]
  narration?: string
}

const scenes: Scene[] = [
  {
    id: "entrance",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crystal%202tower-3sA8PDCF4p9VhYy7CnEYEcUhHDURYk.jpeg",
    text: [
      "Welcome to the Crystal Tower, seeker of knowledge.",
      "Here, within these ancient walls, you'll discover the tale of Eldor, the First Mage of Logania.",
      "Touch the glowing door to begin your journey into the past...",
    ],
    narration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.1-rgLPquD894nceDz4dZMoIUpsQWcnF2.mp3",
  },
  // Add more scenes here as needed
]

const audioTracks: AudioTrack[] = [
  {
    id: "background",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Crystal%20Tower-pcBJMqh9FqgRNdlmGH88nkUkyJ2bjU.mp3",
    volume: 0.3,
    loop: true,
  },
]

interface StoryExperienceProps {
  onClose: () => void
}

export default function StoryExperience({ onClose }: StoryExperienceProps) {
  console.log("StoryExperience rendered") // Debug log

  const [currentScene, setCurrentScene] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const narrationRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize audio
  useEffect(() => {
    console.log("StoryExperience useEffect") // Debug log
    const bgMusic = new Audio(audioTracks[0].src)
    bgMusic.volume = audioTracks[0].volume
    bgMusic.loop = true
    backgroundMusicRef.current = bgMusic

    const narration = new Audio(scenes[0].narration)
    narrationRef.current = narration

    const loadAudio = async () => {
      try {
        await Promise.all([
          new Promise((resolve) => {
            bgMusic.addEventListener("canplaythrough", resolve, { once: true })
            bgMusic.load()
          }),
          new Promise((resolve) => {
            narration.addEventListener("canplaythrough", resolve, { once: true })
            narration.load()
          }),
        ])
        console.log("Audio loaded successfully") // Debug log
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading audio:", error)
        setIsLoading(false) // Ensure loading state is updated even if there's an error
      }
    }

    loadAudio()

    return () => {
      console.log("StoryExperience cleanup") // Debug log
      bgMusic.pause()
      narration.pause()
      bgMusic.src = ""
      narration.src = ""
    }
  }, [])

  // Handle scene progression
  const progressScene = () => {
    if (currentTextIndex < scenes[currentScene].text.length - 1) {
      setCurrentTextIndex((prev) => prev + 1)
    } else if (currentScene < scenes.length - 1) {
      setCurrentScene((prev) => prev + 1)
      setCurrentTextIndex(0)
    }
  }

  // Start the experience
  const startExperience = () => {
    setIsReady(true)
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.play()
    }
    if (narrationRef.current) {
      narrationRef.current.play()
    }
    setShowExit(true)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = !isMuted
    }
    if (narrationRef.current) {
      narrationRef.current.muted = !isMuted
    }
  }

  // Exit experience
  const exitExperience = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause()
    }
    if (narrationRef.current) {
      narrationRef.current.pause()
    }
    onClose()
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-white text-center">
            <motion.div
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-lg">Preparing your journey...</p>
          </div>
        </div>
      ) : !isReady ? (
        <div className="h-full flex items-center justify-center">
          <motion.div
            className="text-center p-6 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl text-white font-bold mb-4">The Tale of the First Mage</h2>
            <p className="text-white/80 mb-6">
              You are about to enter the Crystal Tower to learn about Eldor, the legendary founder of Eldoria. This
              experience includes audio narration and music.
            </p>
            <Button onClick={startExperience} className="bg-primary hover:bg-primary/90">
              Begin the Story
            </Button>
          </motion.div>
        </div>
      ) : (
        <div className="relative h-full">
          {/* Background Image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
          >
            <Image
              src={scenes[currentScene].image || "/placeholder.svg"}
              alt="Crystal Tower"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Text Overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentScene}-${currentTextIndex}`}
              className="absolute inset-x-4 bottom-20 md:bottom-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto" onClick={progressScene}>
                <p className="text-white text-lg md:text-xl text-center">
                  {scenes[currentScene].text[currentTextIndex]}
                </p>
                <p className="text-white/60 text-sm text-center mt-4">Click to continue</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
            </Button>
            {showExit && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                onClick={exitExperience}
              >
                <X className="h-5 w-5 text-white" />
              </Button>
            )}
          </div>

          {/* Interactive Elements */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-32 h-32 rounded-full bg-primary/20 blur-xl" />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

