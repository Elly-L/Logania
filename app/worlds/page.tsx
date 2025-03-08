import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const worlds = [
  {
    id: 1,
    name: "Eldoria",
    description: "The ancient capital city, known for its towering spires and magical academies.",
    longDescription:
      "Eldoria stands as a testament to both architectural and magical mastery, where towering spires pierce the clouds and enchanted bridges span crystalline waters. The city's renowned magical academies draw aspiring mages from across the realm, while its bustling markets showcase exotic artifacts and mystical wares from every corner of Logania.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_QbN4CSFr_1741466827278_raw.jpg-FvzkQi4txHRC8ui1SIwjMWTHWWkwxT.jpeg",
    color: "from-amber-600/20 to-orange-600/20",
    features: [
      "The Crystal Tower Academy",
      "The Grand Arcane Market",
      "The Floating Gardens",
      "The Bridge of Whispers",
    ],
  },
  {
    id: 2,
    name: "Whispering Woods",
    description: "A mystical forest where the trees are said to speak to those who listen carefully.",
    longDescription:
      "Deep within these ancient woods, reality itself seems to bend and shift. The twisted paths lead wanderers through groves of talking trees and past clearings where magical creatures gather. Those who know how to listen can hear the forest's secrets whispered on the wind.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_TyXCKuWg_1741467111575_raw.jpg-N7KspoemMl6dUT0ZFiaUqOLJefNTFX.jpeg",
    color: "from-green-600/20 to-emerald-600/20",
    features: ["The Heart Tree", "The Moonlit Grove", "The Whispering Path", "The Ancient Shrine"],
  },
  {
    id: 3,
    name: "Frostpeak Mountains",
    description: "Towering mountains where ancient dragons are rumored to dwell in hidden caves.",
    longDescription:
      "The Frostpeak Mountains pierce the sky like ancient spears of ice, their peaks forever shrouded in swirling snow. Hidden among these treacherous heights are the lairs of ancient dragons and forgotten dwarven cities, their treasures guarded by both natural and magical perils.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_BWdv44D-_1741467167669_raw.jpg-hyCocKXDqcYSkC8YXvBpeU39nqcjdw.jpeg",
    color: "from-blue-600/20 to-cyan-600/20",
    features: ["The Dragon's Spire", "The Lost Dwarven Halls", "The Eternal Glacier", "The Wind's Pass"],
  },
  {
    id: 4,
    name: "Azure Sea",
    description: "Vast waters surrounding Logania, home to mysterious islands and ancient sea creatures.",
    longDescription:
      "The Azure Sea holds countless mysteries in its depths, from coral cities inhabited by merfolk to towering spires of rock that pierce the waves. Beneath the crystal-clear waters lie ancient ruins and hidden treasures, while magical creatures dance through the currents.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image__svwrz-U_1741467416917_raw.jpg-82IHTqtK9OtkNZ6fUcRPU7AyIuUj1S.jpeg",
    color: "from-blue-600/20 to-teal-600/20",
    features: ["The Coral Kingdom", "The Siren's Spires", "The Sunken City", "The Luminous Depths"],
  },
]

export default function WorldsPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore the Worlds of Logania</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover the diverse regions and magical landscapes that make up the enchanted realm of Logania.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 mb-16">
            {worlds.map((world) => (
              <Card
                key={world.id}
                className="bg-gray-900/60 border-gray-800 hover:border-primary transition-all duration-300 overflow-hidden group"
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative h-[400px] overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-b ${world.color} mix-blend-overlay z-10`} />
                      <Image
                        src={world.image || "/placeholder.svg"}
                        alt={world.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-white mb-4">{world.name}</h3>
                      <p className="text-white/70 mb-6 text-lg">{world.longDescription}</p>
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-primary">Notable Features</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {world.features.map((feature, index) => (
                            <li key={index} className="text-white/80 flex items-center">
                              <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="mt-6 group-hover:bg-primary group-hover:text-white transition-colors">
                          Explore {world.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Help Us Expand Logania</h2>
            <p className="text-white/80 mb-6">
              The world of Logania is constantly growing. Join our community of creators to help design new regions,
              characters, and stories.
            </p>
            <Link href="/join">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Join the Creation Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

