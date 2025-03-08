"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"

type Location = {
  id: number
  name: string
  description: string
  longDescription: string
  history: string
  pointsOfInterest: string[]
  x: number
  y: number
  type: "city" | "ruin" | "forest" | "mountain" | "island"
}

const locations: Location[] = [
  {
    id: 1,
    name: "Eldoria",
    description: "The ancient capital city, known for its towering spires and magical academies.",
    longDescription:
      "Eldoria stands as the jewel of Logania, a city where magic and architecture blend in breathtaking harmony. The city is built around the Crystal Tower, a structure that reaches impossibly high into the sky, its surfaces reflecting the light in mesmerizing patterns.",
    history:
      "Founded over a thousand years ago by the legendary mage Eldor, the city has survived numerous magical calamities and wars. It was nearly destroyed during the Great Cataclysm, but was saved by the combined efforts of the Archmage Council.",
    pointsOfInterest: [
      "The Crystal Tower - Home to the most prestigious magical academy in the realm",
      "The Eternal Gardens - Plants from all corners of Logania thrive here, some with magical properties",
      "The Whispering Library - Contains ancient tomes and scrolls of forgotten knowledge",
    ],
    x: 75,
    y: 25,
    type: "city",
  },
  {
    id: 2,
    name: "Whispering Woods",
    description: "A mystical forest where the trees are said to speak to those who listen carefully.",
    longDescription:
      "The Whispering Woods is a vast, ancient forest where reality seems to bend and shift. Travelers report hearing voices in the rustling leaves, and some claim the trees themselves move when no one is watching. The forest is home to many magical creatures and is protected by powerful nature spirits.",
    history:
      "The woods are said to be as old as Logania itself. Ancient elven texts speak of the forest as a sentient entity, one that has watched over the land since the dawn of time. Many have tried to tame or harvest the woods, but all such attempts have ended in mysterious disappearances.",
    pointsOfInterest: [
      "The Heart Tree - A massive oak at the center of the forest, said to be the consciousness of the woods",
      "Moonlit Glade - A clearing where magical creatures gather during full moons",
      "The Forgotten Shrine - An ancient elven temple reclaimed by the forest",
    ],
    x: 40,
    y: 45,
    type: "forest",
  },
  {
    id: 3,
    name: "Ruins of Azkarath",
    description: "Once a mighty fortress, now reduced to ruins after the Great Cataclysm.",
    longDescription:
      "The Ruins of Azkarath stand as a somber reminder of the Great Cataclysm's destructive power. Once the mightiest fortress in all of Logania, its shattered walls and collapsed towers now serve as home to scavengers and those seeking to uncover artifacts from a bygone era.",
    history:
      "Azkarath was built by the warlord Kazrath as an impenetrable stronghold. For centuries it stood as a symbol of military might, until the magical backlash of the Great Cataclysm tore through its enchanted walls. Legends say the fortress fell not due to the cataclysm itself, but because Kazrath's descendants had awakened something ancient beneath the fortress.",
    pointsOfInterest: [
      "The Broken Gate - Massive enchanted doors, now shattered but still humming with residual magic",
      "The Sundered Tower - Half of the central tower remains, precariously balanced",
      "The Vault - Rumored to still contain treasures, if one can navigate the collapsed passages",
    ],
    x: 25,
    y: 30,
    type: "ruin",
  },
  {
    id: 4,
    name: "Frostpeak Mountains",
    description: "Towering mountains where ancient dragons are rumored to dwell in hidden caves.",
    longDescription:
      "The Frostpeak Mountains form a formidable natural barrier along the northern edge of Logania. Their snow-capped peaks are shrouded in clouds and mystery, with treacherous passes that few dare to traverse. Those who live in the foothills speak of roars echoing from the highest peaks and massive shadows passing overhead.",
    history:
      "The mountains are said to be the oldest geological formation in Logania. Dwarven chronicles tell of vast underground cities carved beneath the mountains in ages past, abandoned after awakening something deep within the earth. Dragon sightings have been reported for centuries, though few who seek these majestic creatures ever return.",
    pointsOfInterest: [
      "The Frozen Pass - The only reliable route through the mountains, though still dangerous",
      "Dragonmaw Cavern - An enormous cave opening resembling a dragon's open mouth",
      "The Eternal Glacier - A massive ice formation that never melts, said to contain preserved creatures from ancient times",
    ],
    x: 15,
    y: 80,
    type: "mountain",
  },
  {
    id: 5,
    name: "Island Sanctuary",
    description: "A mysterious island fortress surrounded by the Azure Sea, home to ancient secrets.",
    longDescription:
      "The Island Sanctuary rises from the Azure Sea like a dream, its white towers gleaming in the sunlight. Accessible only by enchanted boats that know the way through the perpetual mists surrounding it, the island serves as both a fortress and a place of learning for those seeking enlightenment away from the mainland's distractions.",
    history:
      "Created by a conclave of mages seeking refuge during the Age of Chaos, the island was raised from the seabed through powerful magic. For centuries it remained hidden from the world, revealed only after the Great Cataclysm altered the magical currents of Logania. Now it serves as a neutral ground where different factions can meet in peace.",
    pointsOfInterest: [
      "The Lighthouse of Souls - A magical beacon that guides lost ships and, some say, lost spirits",
      "The Tranquil Gardens - Meditation spaces where reality seems particularly malleable",
      "The Observatory - A tower with instruments that can see beyond the physical realm",
    ],
    x: 15,
    y: 40,
    type: "island",
  },
]

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isMapZoomed, setIsMapZoomed] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
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

  const getMarkerColor = (type: Location["type"]) => {
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

  const handleLocationClick = (location: Location, e: React.MouseEvent) => {
    // Get the click position relative to the map container
    const rect = e.currentTarget.getBoundingClientRect()
    const mapContainer = mapContainerRef.current
    const mapRect = mapContainer?.getBoundingClientRect()

    if (mapRect) {
      if (isMobile) {
        // On mobile, we'll position the modal below the map
        setModalPosition({ x: 0, y: 0 })
      } else {
        // On desktop, position near the clicked location
        let x = rect.left - mapRect.left + rect.width + 10
        let y = rect.top - mapRect.top

        // Ensure modal stays within map boundaries
        const modalWidth = 300
        const modalHeight = 400

        // Adjust if too close to the right edge
        if (x + modalWidth > mapRect.width) {
          x = rect.left - mapRect.left - modalWidth - 10
        }

        // Adjust if too close to the bottom edge
        if (y + modalHeight > mapRect.height) {
          y = mapRect.height - modalHeight - 10
        }

        // Adjust if too close to the top edge
        if (y < 10) {
          y = 10
        }

        setModalPosition({ x, y })
      }

      setSelectedLocation(location)
    }
  }

  return (
    <div className="space-y-4">
      <div
        ref={mapContainerRef}
        className="relative w-full max-w-4xl mx-auto aspect-[4/3] rounded-lg overflow-hidden border-2 border-primary/30"
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isMapZoomed ? 1.5 : 1,
            x: isMapZoomed && selectedLocation && !isMobile ? `${50 - selectedLocation.x}%` : 0,
            y: isMapZoomed && selectedLocation && !isMobile ? `${50 - selectedLocation.y}%` : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_O3UZ9Alx_1741458179650_raw.jpg-xl3LF5992A8vGV684w1tTTkdcAVZyF.jpeg')`,
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
          {locations.map((location) => (
            <motion.div
              key={location.id}
              className={`absolute cursor-pointer ${getMarkerSize(location.type)} rounded-full ${getMarkerColor(location.type)} shadow-lg shadow-black/20 flex items-center justify-center z-10`}
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleLocationClick(location, e)}
            >
              <motion.div
                className={`absolute ${getMarkerColor(location.type)} rounded-full opacity-50`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          ))}

          {/* Desktop modal - shown inside the map */}
          {!isMobile && (
            <AnimatePresence>
              {selectedLocation && (
                <motion.div
                  className="absolute bg-black/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-primary/30 w-72 md:w-80 z-20 overflow-auto"
                  style={{
                    left: `${modalPosition.x}px`,
                    top: `${modalPosition.y}px`,
                    maxHeight: "400px",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="flex justify-between items-start mb-2 sticky top-0 bg-black/90 pt-1 pb-2 z-10">
                    <h3 className="text-xl font-bold text-primary">{selectedLocation.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/70 hover:text-white hover:bg-white/10 -mr-2 -mt-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedLocation(null)
                      }}
                      aria-label="Close location details"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-4 text-white/90 text-sm">
                    <p className="font-medium text-white">{selectedLocation.longDescription}</p>

                    <div>
                      <h4 className="text-primary font-bold mb-1">History</h4>
                      <p>{selectedLocation.history}</p>
                    </div>

                    <div>
                      <h4 className="text-primary font-bold mb-1">Points of Interest</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedLocation.pointsOfInterest.map((poi, index) => (
                          <li key={index}>{poi}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 pb-1">
                      <Link
                        href={`/worlds/${
                          selectedLocation.type === "city"
                            ? "eldoria"
                            : selectedLocation.type === "forest"
                              ? "whispering-woods"
                              : selectedLocation.type === "mountain"
                                ? "frostpeak-mountains"
                                : selectedLocation.type === "island"
                                  ? "azure-sea"
                                  : ""
                        }`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-primary/50 text-primary hover:bg-primary/20"
                        >
                          Explore {selectedLocation.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
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

      {/* Mobile modal - shown below the map */}
      {isMobile && (
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              className="bg-black/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-primary/30 w-full max-w-4xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex justify-between items-start mb-4 sticky top-0 bg-black/90 pt-1 pb-2 z-10">
                <h3 className="text-2xl font-bold text-primary">{selectedLocation.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={() => setSelectedLocation(null)}
                  aria-label="Close location details"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4 text-white/90">
                <p className="font-medium text-white">{selectedLocation.longDescription}</p>

                <div>
                  <h4 className="text-primary font-bold mb-1 text-lg">History</h4>
                  <p>{selectedLocation.history}</p>
                </div>

                <div>
                  <h4 className="text-primary font-bold mb-1 text-lg">Points of Interest</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedLocation.pointsOfInterest.map((poi, index) => (
                      <li key={index}>{poi}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 pb-1">
                  <Link
                    href={`/worlds/${
                      selectedLocation.type === "city"
                        ? "eldoria"
                        : selectedLocation.type === "forest"
                          ? "whispering-woods"
                          : selectedLocation.type === "mountain"
                            ? "frostpeak-mountains"
                            : selectedLocation.type === "island"
                              ? "azure-sea"
                              : ""
                    }`}
                  >
                    <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/20">
                      Explore {selectedLocation.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

