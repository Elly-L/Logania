"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, BookOpen, Map, Compass } from "lucide-react"

interface WorldInteractiveCardProps {
  title: string
  description: string
  type: "quest" | "lore" | "location" | "artifact"
  difficulty?: "easy" | "medium" | "hard"
  reward?: string
  color: string
}

export default function WorldInteractiveCard({
  title,
  description,
  type,
  difficulty = "medium",
  reward,
  color,
}: WorldInteractiveCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showQuestAnimation, setShowQuestAnimation] = useState(false)

  const getIcon = () => {
    switch (type) {
      case "quest":
        return <Compass className={`h-6 w-6 ${color}`} />
      case "lore":
        return <BookOpen className={`h-6 w-6 ${color}`} />
      case "location":
        return <Map className={`h-6 w-6 ${color}`} />
      case "artifact":
        return <Sparkles className={`h-6 w-6 ${color}`} />
      default:
        return <Compass className={`h-6 w-6 ${color}`} />
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "hard":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  const handleBeginQuest = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowQuestAnimation(true)

    // Reset animation after it completes
    setTimeout(() => {
      setShowQuestAnimation(false)
    }, 3000)
  }

  return (
    <>
      <motion.div
        className="perspective-1000 cursor-pointer"
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative w-full h-full preserve-3d transition-all duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front of card */}
          <Card className="absolute w-full h-full backface-hidden bg-gray-900/60 border-gray-800 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="mt-1 p-2 rounded-full bg-gray-800/50">{getIcon()}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className={`text-sm font-medium ${getDifficultyColor()}`}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}{" "}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </p>
                </div>
              </div>

              <p className="text-white/70 text-sm flex-grow">{description}</p>

              <motion.div className="mt-4 text-center text-sm text-white/50" animate={{ opacity: isHovered ? 1 : 0.5 }}>
                Click to reveal details
              </motion.div>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card className="absolute w-full h-full backface-hidden rotateY-180 bg-gray-900/60 border-gray-800 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col h-full">
              <h3 className="text-lg font-bold text-white mb-4">Details</h3>

              <div className="space-y-3 flex-grow">
                <div>
                  <h4 className={`text-sm font-medium ${color}`}>Type</h4>
                  <p className="text-white/80">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                </div>

                <div>
                  <h4 className={`text-sm font-medium ${color}`}>Difficulty</h4>
                  <p className={getDifficultyColor()}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
                </div>

                {reward && (
                  <div>
                    <h4 className={`text-sm font-medium ${color}`}>Reward</h4>
                    <p className="text-white/80">{reward}</p>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                className={`mt-4 border-${color.split("-")[0]}-500/50 hover:bg-${color.split("-")[0]}-500/20`}
                onClick={handleBeginQuest}
              >
                Begin{" "}
                {type === "quest"
                  ? "Quest"
                  : type === "lore"
                    ? "Study"
                    : type === "location"
                      ? "Exploration"
                      : "Discovery"}
              </Button>

              <motion.div className="mt-2 text-center text-sm text-white/50" animate={{ opacity: isHovered ? 1 : 0.5 }}>
                Click to flip back
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quest Animation Overlay */}
      <AnimatePresence>
        {showQuestAnimation && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute -inset-20 rounded-full"
                style={{
                  backgroundColor: color.includes("amber")
                    ? "#f59e0b"
                    : color.includes("green")
                      ? "#10b981"
                      : color.includes("blue")
                        ? "#3b82f6"
                        : color.includes("teal")
                          ? "#14b8a6"
                          : "#8b5cf6",
                }}
                initial={{ opacity: 0.2, scale: 0 }}
                animate={{
                  opacity: [0.2, 0.4, 0.1],
                  scale: [0, 1.5, 3],
                }}
                transition={{ duration: 2 }}
              />

              <motion.div
                className="text-white text-2xl md:text-4xl font-bold font-cinzel text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {type === "quest"
                  ? "Quest"
                  : type === "lore"
                    ? "Study"
                    : type === "location"
                      ? "Exploration"
                      : "Discovery"}{" "}
                Begun!
              </motion.div>

              <motion.div
                className="text-white/80 mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {title}
              </motion.div>

              {/* Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full w-2 h-2"
                  style={{
                    backgroundColor: color.includes("amber")
                      ? "#fbbf24"
                      : color.includes("green")
                        ? "#34d399"
                        : color.includes("blue")
                          ? "#60a5fa"
                          : color.includes("teal")
                            ? "#2dd4bf"
                            : "#a78bfa",
                    top: "50%",
                    left: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

