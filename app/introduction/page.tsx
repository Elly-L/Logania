"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Volume2, VolumeX, SkipForward } from "lucide-react"

const worlds = [
  {
    id: "eldoria",
    name: "Eldoria",
    description: "The ancient capital city, known for its towering spires and magical academies.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_QbN4CSFr_1741466827278_raw.jpg-FvzkQi4txHRC8ui1SIwjMWTHWWkwxT.jpeg",
  },
  {
    id: "whispering-woods",
    name: "Whispering Woods",
    description: "A mystical forest where the trees are said to speak to those who listen carefully.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_TyXCKuWg_1741467111575_raw.jpg-N7KspoemMl6dUT0ZFiaUqOLJefNTFX.jpeg",
  },
  {
    id: "frostpeak-mountains",
    name: "Frostpeak Mountains",
    description: "Towering mountains where ancient dragons are rumored to dwell in hidden caves.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_BWdv44D-_1741467167669_raw.jpg-hyCocKXDqcYSkC8YXvBpeU39nqcjdw.jpeg",
  },
  {
    id: "azure-sea",
    name: "Azure Sea",
    description: "Vast waters surrounding Logania, home to mysterious islands and ancient sea creatures.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image__svwrz-U_1741467416917_raw.jpg-82IHTqtK9OtkNZ6fUcRPU7AyIuUj1S.jpeg",
  },
]

const narration = `Long ago, in the mystical realm of Logania, ancient magic wove the fabric of reality. Hidden within its enchanted lands are legends of great heroes, forbidden relics, and untold mysteries. At the heart of this realm stands King Logan—a regal sovereign whose wisdom and might have maintained harmony for generations. Yet, dark omens now stir in the shadows of the Crystal Tower, whisper through the enchanted depths of the Whispering Woods, and echo from the icy corridors of the Frostpeak Mountains. Your destiny is entwined with these fabled lands. Will you dare to uncover the secrets of Logania and forge your own legend, or will the darkness swallow the light of hope? Choose your path, and let your story begin.`

export default function IntroductionPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isNarrationComplete, setIsNarrationComplete] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const typingSpeed = 40 // ms per character
  const router = useRouter()

  // Handle audio loading
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("canplaythrough", () => {
        setIsAudioLoaded(true)
      })

      audioRef.current.addEventListener("play", () => {
        setIsAudioPlaying(true)
      })

      audioRef.current.addEventListener("pause", () => {
        setIsAudioPlaying(false)
      })

      audioRef.current.addEventListener("ended", () => {
        setIsAudioPlaying(false)
        setIsNarrationComplete(true)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Handle typing effect
  useEffect(() => {
    if (isAudioPlaying && displayedText.length < narration.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(narration.substring(0, displayedText.length + 1))
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else if (displayedText.length >= narration.length) {
      const timeout = setTimeout(() => {
        setIsNarrationComplete(true)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [displayedText, isAudioPlaying])

  // Auto-advance slides
  useEffect(() => {
    if (isNarrationComplete) return

    const interval = setInterval(() => {
      if (currentSlide < worlds.length - 1) {
        setCurrentSlide((prev) => prev + 1)
      } else {
        setCurrentSlide(0)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [currentSlide, isNarrationComplete])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const startJourney = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const skipIntroduction = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsNarrationComplete(true)
  }

  const navigateToWorld = (worldId: string) => {
    router.push(`/worlds/${worldId}`)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/voicebooking-speech-iIHVrzkYMJNRy69J5uKNLt82LP0QLK.wav"
        preload="auto"
        className="hidden"
      />

      {/* Background slideshow */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image
              src={worlds[currentSlide].image || "/placeholder.svg"}
              alt={worlds[currentSlide].name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {!isAudioPlaying && !isNarrationComplete ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-cinzel">
              Welcome to <span className="text-primary">Logania</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              A realm of ancient magic, legendary heroes, and untold mysteries awaits your discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg"
                onClick={startJourney}
                disabled={!isAudioLoaded}
              >
                {isAudioLoaded ? "Begin Your Journey" : "Loading..."}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 text-lg"
                onClick={skipIntroduction}
              >
                Skip Introduction
                <SkipForward className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {!isNarrationComplete ? (
              <motion.div
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-black/60 backdrop-blur-sm p-6 md:p-8 rounded-xl">
                  <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-medium font-cinzel tracking-wide">
                    {displayedText}
                    <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse" />
                  </p>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white/80 hover:text-white hover:bg-white/10"
                    onClick={skipIntroduction}
                  >
                    Skip
                    <SkipForward className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="w-full max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 font-cinzel">
                  Choose Your Path
                </h2>
                <p className="text-center text-white/80 max-w-2xl mx-auto mb-12">
                  These are but a few of the many realms within Logania. More lands await discovery on your journey.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {worlds.map((world, index) => (
                    <motion.div
                      key={world.id}
                      className="relative group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigateToWorld(world.id)}
                    >
                      <motion.div
                        className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 blur-sm z-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden z-10">
                        <motion.div
                          className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0, 0.2, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                          }}
                        />
                        <Image
                          src={world.image || "/placeholder.svg"}
                          alt={world.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-2xl font-bold text-white font-cinzel mb-2">{world.name}</h3>
                        <p className="text-white/80 group-hover:text-white transition-colors duration-300">
                          {world.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  )
}

