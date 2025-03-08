"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Book, Compass, Shield } from "lucide-react"

const worlds = {
  eldoria: {
    name: "Eldoria",
    title: "The Ancient Capital",
    description: "The ancient capital city, known for its towering spires and magical academies.",
    longDescription:
      "Eldoria stands as a testament to both architectural and magical mastery, where towering spires pierce the clouds and enchanted bridges span crystalline waters. The city's renowned magical academies draw aspiring mages from across the realm, while its bustling markets showcase exotic artifacts and mystical wares from every corner of Logania.",
    history:
      "Founded over a thousand years ago by the legendary mage Eldor, the city has survived numerous magical calamities and wars. It was nearly destroyed during the Great Cataclysm, but was saved by the combined efforts of the Archmage Council.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_QbN4CSFr_1741466827278_raw.jpg-FvzkQi4txHRC8ui1SIwjMWTHWWkwxT.jpeg",
    color: "from-amber-600/20 to-orange-600/20",
    features: [
      {
        name: "The Crystal Tower",
        description:
          "Home to the most prestigious magical academy in the realm, where aspiring mages study the arcane arts under the guidance of Archmage Elyndra.",
        icon: <Book className="h-6 w-6 text-amber-400" />,
      },
      {
        name: "The Grand Arcane Market",
        description:
          "A bustling marketplace where magical artifacts, rare ingredients, and enchanted items from across Logania are bought and sold.",
        icon: <Compass className="h-6 w-6 text-amber-400" />,
      },
      {
        name: "The Floating Gardens",
        description:
          "Magnificent gardens suspended in mid-air by ancient magic, featuring rare and exotic plants from all corners of the realm.",
        icon: <MapPin className="h-6 w-6 text-amber-400" />,
      },
      {
        name: "The Bridge of Whispers",
        description:
          "An enchanted bridge that is said to whisper secrets to those who cross it, revealing hidden truths about the past and future.",
        icon: <Shield className="h-6 w-6 text-amber-400" />,
      },
    ],
    mapLocation: "eldoria",
  },
  "whispering-woods": {
    name: "Whispering Woods",
    title: "The Mystical Forest",
    description: "A mystical forest where the trees are said to speak to those who listen carefully.",
    longDescription:
      "Deep within these ancient woods, reality itself seems to bend and shift. The twisted paths lead wanderers through groves of talking trees and past clearings where magical creatures gather. Those who know how to listen can hear the forest's secrets whispered on the wind.",
    history:
      "The woods are said to be as old as Logania itself. Ancient elven texts speak of the forest as a sentient entity, one that has watched over the land since the dawn of time. Many have tried to tame or harvest the woods, but all such attempts have ended in mysterious disappearances.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_TyXCKuWg_1741467111575_raw.jpg-N7KspoemMl6dUT0ZFiaUqOLJefNTFX.jpeg",
    color: "from-green-600/20 to-emerald-600/20",
    features: [
      {
        name: "The Heart Tree",
        description:
          "A massive oak at the center of the forest, said to be the consciousness of the woods. Those who commune with it may gain profound insights.",
        icon: <Book className="h-6 w-6 text-green-400" />,
      },
      {
        name: "The Moonlit Grove",
        description:
          "A clearing where magical creatures gather during full moons to perform ancient rituals and celebrations.",
        icon: <Compass className="h-6 w-6 text-green-400" />,
      },
      {
        name: "The Whispering Path",
        description:
          "A winding trail through the woods where the trees whisper secrets to those who walk it with pure intentions.",
        icon: <MapPin className="h-6 w-6 text-green-400" />,
      },
      {
        name: "The Ancient Shrine",
        description: "An elven temple reclaimed by the forest, now home to nature spirits who guard powerful magic.",
        icon: <Shield className="h-6 w-6 text-green-400" />,
      },
    ],
    mapLocation: "whispering-woods",
  },
  "frostpeak-mountains": {
    name: "Frostpeak Mountains",
    title: "The Dragon's Domain",
    description: "Towering mountains where ancient dragons are rumored to dwell in hidden caves.",
    longDescription:
      "The Frostpeak Mountains pierce the sky like ancient spears of ice, their peaks forever shrouded in swirling snow. Hidden among these treacherous heights are the lairs of ancient dragons and forgotten dwarven cities, their treasures guarded by both natural and magical perils.",
    history:
      "The mountains are said to be the oldest geological formation in Logania. Dwarven chronicles tell of vast underground cities carved beneath the mountains in ages past, abandoned after awakening something deep within the earth. Dragon sightings have been reported for centuries, though few who seek these majestic creatures ever return.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_BWdv44D-_1741467167669_raw.jpg-hyCocKXDqcYSkC8YXvBpeU39nqcjdw.jpeg",
    color: "from-blue-600/20 to-cyan-600/20",
    features: [
      {
        name: "The Dragon's Spire",
        description:
          "The tallest peak in the range, said to be home to the ancient dragon Frostfang, guardian of powerful ice magic.",
        icon: <Book className="h-6 w-6 text-blue-400" />,
      },
      {
        name: "The Lost Dwarven Halls",
        description:
          "Abandoned dwarven cities carved into the mountains, filled with forgotten treasures and ancient technology.",
        icon: <Compass className="h-6 w-6 text-blue-400" />,
      },
      {
        name: "The Eternal Glacier",
        description:
          "A massive ice formation that never melts, said to contain preserved creatures from ancient times.",
        icon: <MapPin className="h-6 w-6 text-blue-400" />,
      },
      {
        name: "The Wind's Pass",
        description:
          "The only reliable route through the mountains, though still dangerous due to unpredictable weather and creatures.",
        icon: <Shield className="h-6 w-6 text-blue-400" />,
      },
    ],
    mapLocation: "frostpeak-mountains",
  },
  "azure-sea": {
    name: "Azure Sea",
    title: "The Endless Waters",
    description: "Vast waters surrounding Logania, home to mysterious islands and ancient sea creatures.",
    longDescription:
      "The Azure Sea holds countless mysteries in its depths, from coral cities inhabited by merfolk to towering spires of rock that pierce the waves. Beneath the crystal-clear waters lie ancient ruins and hidden treasures, while magical creatures dance through the currents.",
    history:
      "Legends speak of a time when the Azure Sea was much smaller, before the Great Cataclysm caused the waters to rise and swallow coastal civilizations. The merfolk kingdom emerged from the depths to rescue drowning humans, forming an alliance that has lasted for generations. Pirates and explorers now sail these waters in search of lost treasures and forgotten islands.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image__svwrz-U_1741467416917_raw.jpg-82IHTqtK9OtkNZ6fUcRPU7AyIuUj1S.jpeg",
    color: "from-blue-600/20 to-teal-600/20",
    features: [
      {
        name: "The Coral Kingdom",
        description:
          "An underwater city ruled by the merfolk, with architecture made of living coral that grows and changes over time.",
        icon: <Book className="h-6 w-6 text-teal-400" />,
      },
      {
        name: "The Siren's Spires",
        description:
          "Towering rock formations that rise from the sea, home to mysterious beings whose songs can control the weather.",
        icon: <Compass className="h-6 w-6 text-teal-400" />,
      },
      {
        name: "The Sunken City",
        description:
          "The ruins of an ancient human city that sank beneath the waves during the Great Cataclysm, now home to magical creatures.",
        icon: <MapPin className="h-6 w-6 text-teal-400" />,
      },
      {
        name: "The Luminous Depths",
        description:
          "The deepest part of the Azure Sea, where bioluminescent creatures create a magical light show that can be seen for miles.",
        icon: <Shield className="h-6 w-6 text-teal-400" />,
      },
    ],
    mapLocation: "azure-sea",
  },
}

export default function WorldPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const worldId = params.worldId as string

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Check if world exists
  if (!worlds[worldId as keyof typeof worlds]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">World Not Found</h1>
          <p className="text-white/70 mb-6">The world you're looking for doesn't exist in Logania.</p>
          <Button onClick={() => router.push("/worlds")}>Return to Worlds</Button>
        </div>
      </div>
    )
  }

  const world = worlds[worldId as keyof typeof worlds]

  return (
    <main className="min-h-screen pt-20 bg-black">
      {isLoading ? (
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <div className="absolute inset-0">
              <Image src={world.image || "/placeholder.svg"} alt={world.name} fill className="object-cover" priority />
              <div className={`absolute inset-0 bg-gradient-to-b ${world.color} mix-blend-overlay`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white mb-6"
                  onClick={() => router.push("/introduction")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Worlds
                </Button>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 font-cinzel">{world.name}</h1>
                <h2 className="text-2xl md:text-3xl text-primary mb-6 font-cinzel">{world.title}</h2>
                <p className="text-xl text-white/90 max-w-2xl">{world.description}</p>
              </motion.div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 font-cinzel">About {world.name}</h3>
                    <p className="text-white/80 text-lg leading-relaxed">{world.longDescription}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 font-cinzel">History</h3>
                    <p className="text-white/80 text-lg leading-relaxed">{world.history}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="pt-4"
                  >
                    <Link href={`/worlds#${world.mapLocation}`}>
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        <MapPin className="mr-2 h-5 w-5" />
                        Explore on Map
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6 font-cinzel">Notable Features</h3>
                    <div className="space-y-6">
                      {world.features.map((feature, index) => (
                        <motion.div
                          key={feature.name}
                          className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:border-primary/50 transition-colors"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1">{feature.icon}</div>
                            <div>
                              <h4 className="text-lg font-bold text-white mb-2">{feature.name}</h4>
                              <p className="text-white/70">{feature.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}

