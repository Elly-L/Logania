"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speed: number
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
}

export default function FloatingParticles({
  count = 20,
  colors = ["#8b5cf6", "#6366f1", "#3b82f6", "#0ea5e9"],
  minSize = 2,
  maxSize = 6,
  minSpeed = 20,
  maxSpeed = 60,
}: FloatingParticlesProps) {
  const particles = useRef<Particle[]>([])

  // Generate particles on first render
  useEffect(() => {
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
    }))
  }, [count, colors, minSize, maxSize, minSpeed, maxSpeed])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0.6,
          }}
          animate={{
            y: ["0%", "100%"],
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x}%`,
            ],
          }}
          transition={{
            duration: particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
    </div>
  )
}

