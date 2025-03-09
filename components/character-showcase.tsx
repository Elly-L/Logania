"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

type Character = {
  id: number
  name: string
  role: string
  description: string
  fullBio: string
  abilities: string[]
  backstory: string
  image: string
  alternateImage?: string
}

// Update the characters array with more detailed content
const characters: Character[] = [
  {
    id: 1,
    name: "Elyndra",
    role: "Archmage of the Crystal Tower",
    description:
      "A powerful sorceress who guards the ancient knowledge of Logania. Her mastery of elemental magic is unrivaled throughout the realm.",
    fullBio:
      "Elyndra was born with an extraordinary connection to the arcane energies that flow through Logania. As a child, she could manipulate light and create small illusions before she could even speak. Recognized for her talents, she was brought to the Crystal Tower at the age of seven, where she quickly surpassed students twice her age.",
    abilities: [
      "Elemental Mastery - Complete control over the four primal elements",
      "Arcane Sight - The ability to see magical auras and hidden enchantments",
      "Time Manipulation - Limited ability to slow or accelerate time in a small area",
      "Telepathic Communication - Can speak directly to the minds of others",
    ],
    backstory:
      "After becoming the youngest Archmage in the history of the Crystal Tower, Elyndra discovered ancient prophecies foretelling the return of a primordial darkness. She has dedicated her life to preparing Logania for this coming threat, gathering powerful artifacts and training a new generation of mages who will stand against the darkness when it arrives.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_xzWiB8By_1741459604014_raw.jpg-LU0MjCSLahLvY7rupQcsKz8MbaW61z.jpeg",
    alternateImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_2ZMkMWYy_1741459616738_raw.jpg-Jz6pVZEE3oBrMgkZXfgNbLvwu8GN0H.jpeg",
  },
  {
    id: 2,
    name: "Thorne",
    role: "Guardian of the Whispering Woods",
    description:
      "Half-elf ranger who protects the mystical forest and its inhabitants. He can communicate with the spirits of nature.",
    fullBio:
      "Born to an elven mother and human father, Thorne has always existed between two worlds. His mixed heritage gave him a unique perspective and an unusual affinity for the natural world. The spirits of the Whispering Woods called to him from a young age, and he eventually abandoned civilization to become their protector.",
    abilities: [
      "Nature Speech - The ability to communicate with plants, animals, and nature spirits",
      "Verdant Magic - Can manipulate plant life and call upon the forest for aid",
      "Perfect Tracking - Never loses a trail once found",
      "Camouflage - Can become nearly invisible when standing still in natural surroundings",
    ],
    backstory:
      "Thorne's father was a renowned ranger who died protecting a village from a rampaging beast. His mother, an elven priestess, raised him with stories of both human courage and elven wisdom. When dark forces began corrupting parts of the Whispering Woods, Thorne took up his father's bow and his mother's teachings to become the forest's champion, fighting to maintain the balance between civilization and wild magic.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_sNHa5cez_1741459798351_raw.jpg-hBcXJqO57U1cmphuOYE9rxxhqsINwF.jpeg",
    alternateImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_zWn84W6t_1741459811245_raw.jpg-vAd7flcG0RVwuhjQBgIZ42Ddi3eM8r.jpeg",
  },
  {
    id: 3,
    name: "Grimshaw",
    role: "Dwarven Runesmith",
    description:
      "Master craftsman who forges magical artifacts in the depths of the Frostpeak Mountains. His creations are sought after by heroes across the land.",
    fullBio:
      "Grimshaw comes from a long line of dwarven craftsmen, but he was the first in generations to rediscover the ancient art of runesmithing. By infusing metal with magical runes during the forging process, he creates weapons and armor with extraordinary properties. His workshop deep in the Frostpeak Mountains is said to contain forges that burn with the fire of a  His workshop deep in the Frostpeak Mountains is said to contain forges that burn with the fire of a captured star.",
    backstory:
      "As a young dwarf, Grimshaw was considered odd for his obsession with ancient texts rather than traditional mining. When he discovered a sealed chamber containing the lost runesmithing techniques of his ancestors, he became determined to revive the art. His first masterpiece—an axe that could cut through any material—brought warriors from across Logania to his door. Now he creates only for those he deems worthy, using his gifts to ensure balance in the realm.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_zdyato3M_1741460108870_raw.jpg-jqORe16FJabZELVVuPNUT1X1LUzqHe.jpeg",
    alternateImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_-X6USIXX_1741460119369_raw.jpg-amXiyh7YcTEANmWkirylEv5XZb30fq.jpeg",
  },
  {
    id: 4,
    name: "King Elly Logan",
    role: "Sovereign of Logania",
    description:
      "The wise and benevolent ruler of Logania, known for his fair judgment and magical foresight. His golden crown is said to grant him visions of possible futures.",
    fullBio:
      "King Elly Logan ascended to the throne during Logania's darkest hour, when the realm was fractured by conflict and threatened by forces beyond comprehension. Through a combination of diplomatic genius, strategic thinking, and genuine compassion for his people, he united the warring factions and established an era of unprecedented peace and prosperity.",
    abilities: [
      "Crown of Foresight - His enchanted crown grants glimpses of possible futures",
      "Royal Authority - His words carry magical weight, compelling truth and honoring oaths",
      "Diplomatic Genius - Can find common ground between even the most bitter enemies",
      "Ancient Bloodline - Descended from the first rulers of Logania, with latent magical abilities",
    ],
    backstory:
      "Though born to nobility, Elly Logan spent his youth traveling incognito throughout the realm, learning the struggles of common folk firsthand. When the previous royal line ended in tragedy during the Great Cataclysm, he revealed his heritage and united the fractured noble houses. His crown—an artifact from Logania's founding—chose him as worthy, illuminating with golden light when placed upon his head. He now rules from the restored capital of Eldoria, but still frequently travels in disguise to ensure he never loses touch with his people's needs.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_RDUZwSfW_1741462231472_raw.webp-NUTyBsd7hr58mfwcuD6t4coNBfm1qm.png",
  },
]

export default function CharacterShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAllCharacters, setShowAllCharacters] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"bio" | "abilities" | "backstory">("bio")
  const modalRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const currentCharacter = characters[currentIndex]

  const nextCharacter = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length)
  }

  const prevCharacter = () => {
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
    setSelectedImageIndex(0)
    setActiveTab("bio")
  }

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (!currentCharacter.alternateImage) return
    setSelectedImageIndex(direction === "next" ? 1 : 0)
  }

  return (
    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 mix-blend-overlay" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10">
        <div className="flex flex-col justify-center">
          <motion.div
            key={`text-${currentCharacter.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold text-white">{currentCharacter.name}</h3>
            <p className="text-primary font-medium">{currentCharacter.role}</p>
            <p className="text-white/80">{currentCharacter.description}</p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 hover:border-primary/80 hover:bg-primary/20"
                onClick={prevCharacter}
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 hover:border-primary/80 hover:bg-primary/20"
                onClick={nextCharacter}
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/20 hover:border-primary/80 hover:bg-primary/20"
                onClick={() => setShowDetailModal(true)}
              >
                <span className="text-white">View Details</span>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/20 hover:border-primary/80 hover:bg-primary/20 ml-auto"
                onClick={() => setShowAllCharacters(true)}
              >
                <Users className="h-4 w-4 mr-2 text-white" />
                <span className="text-white">View All</span>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="relative h-80 md:h-96 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentCharacter.id}`}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={currentCharacter.image || "/placeholder.svg"}
                  alt={currentCharacter.name}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {characters.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-white/30"}`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* All Characters Modal */}
      <AnimatePresence>
        {showAllCharacters && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border border-primary/30 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                <h2 className="text-2xl font-bold text-white">Characters of Logania</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={() => setShowAllCharacters(false)}
                  aria-label="Close characters list"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {characters.map((character) => (
                  <motion.div
                    key={character.id}
                    className="bg-black/50 rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-60">
                      <Image
                        src={character.image || "/placeholder.svg"}
                        alt={character.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{character.name}</h3>
                        <p className="text-primary text-sm">{character.role}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-white/80 text-sm line-clamp-3">{character.description}</p>
                      <Button
                        variant="ghost"
                        className="w-full mt-3 text-primary hover:bg-primary/10"
                        onClick={() => {
                          setCurrentIndex(character.id - 1)
                          setShowAllCharacters(false)
                        }}
                      >
                        View Character
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Detail Modal - Using version 9 style for desktop with scrollbar */}
      <AnimatePresence>
        {showDetailModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-gray-900 border border-primary/30 rounded-xl w-full max-w-4xl my-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                <h2 className="text-2xl font-bold text-white">{currentCharacter.name}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={handleCloseModal}
                  aria-label="Close character details"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[70vh] overflow-y-auto">
                <div>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={
                        selectedImageIndex === 0
                          ? currentCharacter.image
                          : currentCharacter.alternateImage || currentCharacter.image
                      }
                      alt={currentCharacter.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {currentCharacter.alternateImage && (
                    <div className="flex gap-4 justify-center mt-4">
                      <button
                        className={`w-16 h-16 relative rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === 0 ? "border-primary" : "border-transparent"
                        }`}
                        onClick={() => setSelectedImageIndex(0)}
                        aria-label="First image"
                      >
                        <Image
                          src={currentCharacter.image || "/placeholder.svg"}
                          alt={`${currentCharacter.name} 1`}
                          fill
                          className="object-cover"
                        />
                      </button>
                      <button
                        className={`w-16 h-16 relative rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === 1 ? "border-primary" : "border-transparent"
                        }`}
                        onClick={() => setSelectedImageIndex(1)}
                        aria-label="Second image"
                      >
                        <Image
                          src={currentCharacter.alternateImage || "/placeholder.svg"}
                          alt={`${currentCharacter.name} 2`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    </div>
                  )}

                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-primary mb-1">Role</h3>
                    <p className="text-white/90">{currentCharacter.role}</p>
                  </div>
                </div>

                <div>
                  <div className="flex border-b border-gray-700 mb-4">
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeTab === "bio" ? "text-primary border-b-2 border-primary" : "text-white/70"
                      }`}
                      onClick={() => setActiveTab("bio")}
                    >
                      Biography
                    </button>
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeTab === "abilities" ? "text-primary border-b-2 border-primary" : "text-white/70"
                      }`}
                      onClick={() => setActiveTab("abilities")}
                    >
                      Abilities
                    </button>
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeTab === "backstory" ? "text-primary border-b-2 border-primary" : "text-white/70"
                      }`}
                      onClick={() => setActiveTab("backstory")}
                    >
                      Backstory
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activeTab === "bio" && (
                      <div>
                        <p className="text-white/90">{currentCharacter.fullBio}</p>
                      </div>
                    )}

                    {activeTab === "abilities" && (
                      <div>
                        <ul className="list-disc pl-5 space-y-2 text-white/90">
                          {currentCharacter.abilities.map((ability, index) => (
                            <li key={index}>{ability}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === "backstory" && (
                      <div>
                        <p className="text-white/90">{currentCharacter.backstory}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-800 flex justify-between">
                <Button variant="outline" onClick={handleCloseModal}>
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={prevCharacter}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Character
                  </Button>
                  <Button variant="outline" onClick={nextCharacter}>
                    Next Character
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

