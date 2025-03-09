"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

// Theme songs for the game
const themeSongs = [
  {
    id: "main-theme",
    title: "Logania Main Theme",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logania-main-theme-Kd9Kd9Kd9Kd9Kd9Kd9Kd9Kd9Kd9Kd9.mp3-Kd9Kd9Kd9Kd9Kd9Kd9Kd9Kd9Kd9Kd9.mp3",
  },
  {
    id: "adventure-theme",
    title: "Adventure Awaits",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logania-adventure-theme-Vf6Vf6Vf6Vf6Vf6Vf6Vf6Vf6Vf6Vf6.mp3-Vf6Vf6Vf6Vf6Vf6Vf6Vf6Vf6Vf6Vf6.mp3",
  },
  {
    id: "mystical-theme",
    title: "Mystical Encounters",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logania-mystical-theme-Rh3Rh3Rh3Rh3Rh3Rh3Rh3Rh3Rh3Rh3.mp3-Rh3Rh3Rh3Rh3Rh3Rh3Rh3Rh3Rh3Rh3.mp3",
  },
]

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Function to get random duration between min and max
const getRandomDuration = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000 // Convert to milliseconds
}

interface ThemeMusicPlayerProps {
  autoplay?: boolean
  showControls?: boolean
  className?: string
}

export default function ThemeMusicPlayer({
  autoplay = false,
  showControls = true,
  className = "",
}: ThemeMusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [shuffledPlaylist, setShuffledPlaylist] = useState<typeof themeSongs>([])
  const [currentSongTitle, setCurrentSongTitle] = useState("")
  const [showTitle, setShowTitle] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const nextAudioRef = useRef<HTMLAudioElement>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const songTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize shuffled playlist
  useEffect(() => {
    setShuffledPlaylist(shuffleArray(themeSongs))
  }, [])

  // Handle audio playback and transitions
  useEffect(() => {
    if (shuffledPlaylist.length === 0) return

    const currentSong = shuffledPlaylist[currentSongIndex]
    setCurrentSongTitle(currentSong.title)

    if (isPlaying) {
      // Show title briefly when song changes
      setShowTitle(true)
      setTimeout(() => setShowTitle(false), 3000)

      // Set up the current audio
      if (audioRef.current) {
        audioRef.current.src = currentSong.src
        audioRef.current.volume = isMuted ? 0 : 1
        audioRef.current.play()
      }

      // Preload the next song
      const nextIndex = (currentSongIndex + 1) % shuffledPlaylist.length
      if (nextAudioRef.current) {
        nextAudioRef.current.src = shuffledPlaylist[nextIndex].src
        nextAudioRef.current.load()
      }

      // Set a timer for song transition
      const duration = getRandomDuration(30, 80)
      songTimerRef.current = setTimeout(() => {
        fadeToNextSong()
      }, duration)
    } else {
      // Pause playback if not playing
      if (audioRef.current) {
        audioRef.current.pause()
      }

      // Clear any active timers
      if (songTimerRef.current) {
        clearTimeout(songTimerRef.current)
      }

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }

    return () => {
      // Cleanup timers
      if (songTimerRef.current) {
        clearTimeout(songTimerRef.current)
      }

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }
  }, [currentSongIndex, isPlaying, isMuted, shuffledPlaylist])

  // Fade out current song and fade in next song
  const fadeToNextSong = () => {
    if (!audioRef.current || !nextAudioRef.current) return

    // Start playing the next song at 0 volume
    nextAudioRef.current.currentTime = 0
    nextAudioRef.current.volume = 0
    nextAudioRef.current.play()

    let fadeStep = 0
    const totalSteps = 50 // Total steps for the crossfade

    // Clear any existing fade interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    // Create crossfade effect
    fadeIntervalRef.current = setInterval(() => {
      fadeStep++

      if (audioRef.current && nextAudioRef.current) {
        // Gradually decrease volume of current song
        audioRef.current.volume = Math.max(0, 1 - fadeStep / totalSteps)

        // Gradually increase volume of next song
        nextAudioRef.current.volume = Math.min(1, fadeStep / totalSteps)

        // When fade is complete
        if (fadeStep >= totalSteps) {
          // Stop the interval
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
            fadeIntervalRef.current = null
          }

          // Stop the current audio
          audioRef.current.pause()

          // Swap the audio elements (next becomes current)
          const tempAudio = audioRef.current
          audioRef.current = nextAudioRef.current
          nextAudioRef.current = tempAudio

          // Move to the next song in the playlist
          setCurrentSongIndex((prevIndex) => (prevIndex + 1) % shuffledPlaylist.length)
        }
      }
    }, 40) // 40ms intervals for smooth transition (50 steps * 40ms = 2 second crossfade)
  }

  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
    }
    if (nextAudioRef.current) {
      nextAudioRef.current.muted = !nextAudioRef.current.muted
    }
  }

  // Skip to next song
  const skipToNextSong = () => {
    if (songTimerRef.current) {
      clearTimeout(songTimerRef.current)
    }
    fadeToNextSong()
  }

  return (
    <div className={`relative ${className}`}>
      {/* Hidden audio elements */}
      <audio ref={audioRef} preload="auto" className="hidden" />
      <audio ref={nextAudioRef} preload="auto" className="hidden" />

      {/* Song title notification */}
      {showTitle && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-black/80 text-white text-sm py-1 px-3 rounded-md backdrop-blur-sm transition-opacity duration-300">
          Now Playing: {currentSongTitle}
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            <Music className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}

