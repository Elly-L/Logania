"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Music, Play, Pause, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"

// Define music themes with the provided MP3 files
const musicThemes = [
  {
    id: "main-theme",
    title: "Main Theme",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logania%2Btheme%2Bsong%20%281%29-xrxAeix8NgizAiV6jYkkLkKSnaoc3z.mp3",
  },
  {
    id: "adventure-theme",
    title: "Adventure Theme",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logania%2Btheme%2Bsong-LlpktcFvyJe3EGbUvm11ZEfSPhQCUN.mp3",
  },
  {
    id: "mystical-theme",
    title: "Mystical Theme",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logania%2BTheme%2Bsong%2B3-ndLQjKqhJ5MCGxYsocOjlpuTMGkWYu.mp3",
  },
]

interface EnhancedMusicPlayerProps {
  initialTheme?: string
  autoplay?: boolean
  showControls?: boolean
  className?: string
}

export default function EnhancedMusicPlayer({
  initialTheme = "main-theme",
  autoplay = false,
  showControls = true,
  className = "",
}: EnhancedMusicPlayerProps) {
  const [currentTheme, setCurrentTheme] = useState(
    musicThemes.find((theme) => theme.id === initialTheme) || musicThemes[0],
  )
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audio.crossOrigin = "anonymous" // Allow cross-origin loading
    audio.preload = "auto"
    audio.volume = volume
    audio.loop = true

    // Define event handlers
    const handleCanPlayThrough = () => {
      setAudioLoaded(true)
      setAudioError(null)
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      let errorMessage = "Failed to load audio"
      if (audio.error) {
        errorMessage = `Error code ${audio.error.code}: ${audio.error.message}`
      }
      setAudioError(errorMessage)
      setAudioLoaded(false)
      setIsPlaying(false)
    }

    // Set up event listeners
    audio.addEventListener("canplaythrough", handleCanPlayThrough)
    audio.addEventListener("error", handleError)

    // Set initial source
    audio.src = currentTheme.src
    audioRef.current = audio

    // Auto play if autoplay is true
    if (autoplay) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback error:", error)
          setAudioError("Failed to play audio")
          setIsPlaying(false)
        })
      }
    }

    // Clean up on unmount
    return () => {
      audio.pause()
      audio.src = ""
      audio.removeEventListener("canplaythrough", handleCanPlayThrough)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  // Handle theme changes
  useEffect(() => {
    if (!audioRef.current) return

    const wasPlaying = isPlaying
    if (wasPlaying) {
      audioRef.current.pause()
    }

    setAudioLoaded(false)
    audioRef.current.src = currentTheme.src

    if (wasPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback error:", error)
          setAudioError("Failed to play audio")
          setIsPlaying(false)
        })
      }
    }
  }, [currentTheme])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback error:", error)
          setAudioError("Failed to play audio")
          setIsPlaying(false)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0])
  }

  if (!showControls) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Minimized music icon */}
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full bg-black/80 backdrop-blur-sm border border-gray-800 text-white/80 hover:text-white hover:bg-black/90"
        onClick={() => setShowPanel(!showPanel)}
      >
        <Music className="h-5 w-5" />
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.5, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </Button>

      {/* Expanded music panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 right-0 bg-black/90 backdrop-blur-md rounded-lg p-4 shadow-lg border border-gray-800 w-64 max-w-[calc(100vw-2rem)]"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-white">Music Player</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setShowPanel(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            {audioError && (
              <div className="mb-3 p-2 bg-red-900/30 border border-red-800 rounded text-xs text-red-300">
                {audioError}
              </div>
            )}

            <div className="space-y-4">
              {/* Theme selection */}
              <div className="space-y-2">
                <label className="text-xs text-white/70">Select Theme:</label>
                <div className="grid grid-cols-1 gap-1">
                  {musicThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setCurrentTheme(theme)}
                      className={`text-left px-3 py-2 rounded text-sm ${
                        currentTheme.id === theme.id ? "bg-primary/20 text-primary" : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {theme.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-white/70">Volume:</label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                </div>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>

              {/* Play/Pause button */}
              <Button className="w-full" onClick={togglePlay}>
                {isPlaying ? "Pause Music" : "Play Music"}
                {isPlaying ? <Pause className="ml-2 h-4 w-4" /> : <Play className="ml-2 h-4 w-4" />}
              </Button>

              <div className="text-xs text-white/60 text-center">Now Playing: {currentTheme.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

