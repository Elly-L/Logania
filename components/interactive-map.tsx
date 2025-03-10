"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Location = {
  id: string
  name: string
  description: string
  position: { x: number; y: number }
  type: "city" | "ruin" | "forest" | "mountain" | "island" | "desert" | "shadow" | "celestial"
  status: "available" | "coming-soon"
}

const locations: Location[] = [
  {
    id: "eldoria",
    name: "Eldoria",
    description: "The ancient capital city, known for its towering spires and magical academies.",
    position: { x: 50, y: 18 },
    type: "city",
    status: "available",
  },
  {
    id: "whispering-woods",
    name: "Whispering Woods",
    description: "A mystical forest where the trees are said to speak to those who listen carefully.",
    position: { x: 48, y: 45 },
    type: "forest",
    status: "available",
  },
  {
    id: "frostpeak-mountains",
    name: "Frostpeak Mountains",
    description: "Towering mountains where ancient dragons are rumored to dwell in hidden caves.",
    position: { x: 80, y: 20 },
    type: "mountain",
    status: "available",
  },
  {
    id: "azure-sea",
    name: "Azure Sea",
    description: "Vast waters surrounding Logania, home to mysterious islands and ancient sea creatures.",
    position: { x: 55, y: 93 },
    type: "island",
    status: "available",
  },
  {
    id: "ruins-of-azkarath",
    name: "Ruins of Azkarath",
    description: "Ancient city ruins where powerful artifacts remain hidden beneath crumbling towers.",
    position: { x: 28, y: 60 },
    type: "ruin",
    status: "coming-soon",
  },
  {
    id: "island-sanctuary",
    name: "Island Sanctuary",
    description: "A peaceful haven in the Azure Sea where magical creatures find refuge.",
    position: { x: 85, y: 75 },
    type: "island",
    status: "coming-soon",
  },
  {
    id: "shadowlands",
    name: "The Shadowlands",
    description: "A mysterious realm between worlds where reality shifts and changes.",
    position: { x: 15, y: 25 },
    type: "shadow",
    status: "coming-soon",
  },
  {
    id: "sunfire-desert",
    name: "The Sunfire Desert",
    description: "Vast dunes of golden sand hiding ancient temples and magical oases.",
    position: { x: 35, y: 80 },
    type: "desert",
    status: "coming-soon",
  },
  {
    id: "celestial-isles",
    name: "The Celestial Isles",
    description: "Floating islands high above the clouds, home to sky-dwelling civilizations.",
    position: { x: 10, y: 10 },
    type: "celestial",
    status: "coming-soon",
  },
]

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isMapZoomed, setIsMapZoomed] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })

  // Update map dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (mapContainerRef.current) {
        setMapDimensions({
          width: mapContainerRef.current.offsetWidth,
          height: mapContainerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const getMarkerColor = (type: Location["type"], status: Location["status"]) => {
    if (status === "coming-soon") {
      return "bg-gray-400/80"
    }

    switch (type) {
      case "city":
        return "bg-amber-400"
      case "ruin":
        return "bg-red-400"
      case "forest":
        return "bg-green-400"
      case "mountain":
        return "bg-slate-400"
      case "island":
        return "bg-blue-400"
      case "desert":
        return "bg-yellow-400"
      case "shadow":
        return "bg-purple-400"
      case "celestial":
        return "bg-cyan-400"
      default:
        return "bg-blue-400"
    }
  }

  const getMarkerSize = (type: Location["type"]) => {
    switch (type) {
      case "city":
        return "w-4 h-4 md:w-6 md:h-6"
      case "ruin":
        return "w-3 h-3 md:w-5 md:h-5"
      default:
        return "w-3 h-3 md:w-4 md:h-4"
    }
  }

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
  }

  const renderLocation = (location: Location, index: number) => {
    return (
      <motion.div
        key={location.id}
        className={`absolute cursor-pointer group`}
        style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => handleLocationClick(location)}
      >
        <div className="relative">
          {location.status === "coming-soon" ? (
            // Coming soon location marker
            <div className="w-6 h-6 rounded-full bg-gray-500/50 flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-gray-400/80 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400/80 flex items-center justify-center text-[8px] font-bold">
                !
              </div>
            </div>
          ) : (
            // Regular location marker
            <div className="w-6 h-6 rounded-full bg-primary/50 flex items-center justify-center">
              <div className={`w-4 h-4 rounded-full ${getMarkerColor(location.type, location.status)} animate-pulse`} />
            </div>
          )}

          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full -top-1 bg-black/80 text-white text-xs font-medium py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {location.name}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        ref={mapContainerRef}
        className="relative w-full max-w-4xl mx-auto aspect-square rounded-lg overflow-hidden border-2 border-primary/30"
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isMapZoomed ? 1.5 : 1,
            x: isMapZoomed && selectedLocation && !isMobile ? `${50 - selectedLocation.position.x}%` : 0,
            y: isMapZoomed && selectedLocation && !isMobile ? `${50 - selectedLocation.position.y}%` : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_rjZsySEL_1741590693653_raw.jpg-eHT3g30LyGTQozcg1903WcgKT8ZM1i.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            cursor: "grab",
            overflow: "hidden",
          }}
          drag={!selectedLocation || isMobile}
          dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
        >
          {locations.map((location, index) => renderLocation(location, index))}
        </motion.div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/10"
            onClick={() => setIsMapZoomed(!isMapZoomed)}
          >
            {isMapZoomed ? <Minimize className="h-4 w-4 mr-1" /> : <Maximize className="h-4 w-4 mr-1" />}
            {isMapZoomed ? "Zoom Out" : "Zoom In"}
          </Button>

          {selectedLocation && (
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={() => setSelectedLocation(null)}
            >
              <X className="h-4 w-4 mr-1" />
              Close
            </Button>
          )}
        </div>

        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded px-3 py-1.5 text-white/90 text-sm">
          <span className="font-cinzel">Realm of Logania</span>
        </div>
      </div>

      {/* Location Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border border-primary/30 rounded-xl max-w-md w-full mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">{selectedLocation.name}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={() => setSelectedLocation(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6">
                <p className="text-white/80 mb-6">{selectedLocation.description}</p>

                {selectedLocation.status === "coming-soon" ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-yellow-500/20 text-yellow-400 text-sm font-medium py-1 px-3 rounded-full">
                      Coming Soon
                    </div>
                    <p className="text-white/70 text-sm text-center">
                      This location is currently being developed and will be available in a future update.
                    </p>
                    <Button variant="outline" className="mt-2" onClick={() => setSelectedLocation(null)}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <Link href={`/worlds/${selectedLocation.id}`}>
                    <Button className="w-full">
                      Explore {selectedLocation.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

