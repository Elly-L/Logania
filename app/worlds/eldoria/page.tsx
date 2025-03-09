"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Book, Compass, Shield } from "lucide-react"
import WorldInteractiveCard from "@/components/world-interactive-card"
import FloatingParticles from "@/components/floating-particles"

export default function EldoriaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen pt-20 bg-black">
      {isLoading ? (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <motion.div
            className="relative w-24 h-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent" />
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-purple-400 border-b-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
          <motion.p
            className="mt-6 text-white/80 font-cinzel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Entering Eldoria...
          </motion.p>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            {/* Add floating particles with world-specific colors */}
            <FloatingParticles colors={["#f59e0b", "#d97706", "#b45309", "#92400e"]} />
            <div className="absolute inset-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_QbN4CSFr_1741466827278_raw.jpg-FvzkQi4txHRC8ui1SIwjMWTHWWkwxT.jpeg"
                alt="Eldoria"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600/20 to-orange-600/20 mix-blend-overlay" />
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

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 font-cinzel">Eldoria</h1>
                <h2 className="text-2xl md:text-3xl text-primary mb-6 font-cinzel">The Ancient Capital</h2>
                <p className="text-xl text-white/90 max-w-2xl">
                  The ancient capital city, known for its towering spires and magical academies.
                </p>
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
                    <h3 className="text-2xl font-bold text-white mb-4 font-cinzel">About Eldoria</h3>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Eldoria stands as a testament to both architectural and magical mastery, where towering spires
                      pierce the clouds and enchanted bridges span crystalline waters. The city's renowned magical
                      academies draw aspiring mages from across the realm, while its bustling markets showcase exotic
                      artifacts and mystical wares from every corner of Logania.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 font-cinzel">History</h3>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Founded over a thousand years ago by the legendary mage Eldor, the city has survived numerous
                      magical calamities and wars. It was nearly destroyed during the Great Cataclysm, but was saved by
                      the combined efforts of the Archmage Council.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="pt-4"
                  >
                    <Link href={`/worlds#eldoria`}>
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
                      <motion.div
                        className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:border-primary/50 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            <Book className="h-6 w-6 text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">The Crystal Tower</h4>
                            <p className="text-white/70">
                              Home to the most prestigious magical academy in the realm, where aspiring mages study the
                              arcane arts under the guidance of Archmage Elyndra.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:border-primary/50 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            <Compass className="h-6 w-6 text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">The Grand Arcane Market</h4>
                            <p className="text-white/70">
                              A bustling marketplace where magical artifacts, rare ingredients, and enchanted items from
                              across Logania are bought and sold.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:border-primary/50 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            <MapPin className="h-6 w-6 text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">The Floating Gardens</h4>
                            <p className="text-white/70">
                              Magnificent gardens suspended in mid-air by ancient magic, featuring rare and exotic
                              plants from all corners of the realm.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:border-primary/50 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            <Shield className="h-6 w-6 text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">The Bridge of Whispers</h4>
                            <p className="text-white/70">
                              An enchanted bridge that is said to whisper secrets to those who cross it, revealing
                              hidden truths about the past and future.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Activities Section */}
          <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-3 font-cinzel">Activities & Adventures</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Discover quests, lore, and mysteries throughout Eldoria. Click on the cards to reveal more details.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WorldInteractiveCard
                  title="The Archmage's Request"
                  description="Elyndra, the Archmage of the Crystal Tower, seeks assistance with a magical anomaly that threatens the city's protective wards."
                  type="quest"
                  difficulty="medium"
                  reward="Access to the Crystal Tower Library"
                  color="text-amber-400"
                />
                <WorldInteractiveCard
                  title="Secrets of the Eternal Gardens"
                  description="Ancient texts speak of a hidden chamber beneath the Eternal Gardens where powerful artifacts were stored during the Great Cataclysm."
                  type="location"
                  difficulty="hard"
                  color="text-amber-400"
                />
                <WorldInteractiveCard
                  title="The First Mage"
                  description="Learn about Eldor, the legendary founder of Eldoria and the first human to master the arcane arts in Logania."
                  type="lore"
                  difficulty="easy"
                  color="text-amber-400"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}

