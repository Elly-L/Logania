"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"

// Dynamically import the StoryExperience component
const StoryExperience = dynamic(() => import("@/components/story-experience"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
        <p className="text-lg">Loading experience...</p>
      </div>
    </div>
  ),
})

export default function StudyPage() {
  const [showExperience, setShowExperience] = useState(true)

  return <AnimatePresence>{showExperience && <StoryExperience />}</AnimatePresence>
}

