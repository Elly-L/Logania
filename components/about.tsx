"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Scroll, Map, Book, Castle } from "lucide-react"
import InteractiveMap from "./interactive-map"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Scroll className="h-10 w-10 text-primary" />,
      title: "Ancient Lore",
      description: "Discover the rich history and mythology that shapes the world of Logania.",
    },
    {
      icon: <Map className="h-10 w-10 text-primary" />,
      title: "Interactive Maps",
      description: "Explore detailed, hand-drawn maps with hidden pathways and secret locations.",
    },
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      title: "Epic Stories",
      description: "Immerse yourself in captivating narratives featuring heroes, villains, and mythical creatures.",
    },
    {
      icon: <Castle className="h-10 w-10 text-primary" />,
      title: "Lost Civilizations",
      description: "Uncover the mysteries of ancient ruins and forgotten kingdoms.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover the World of <span className="text-primary">Logania</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            An expansive, enchanted realm that tells a story of ancient lore and magical wonder.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-900/60 border-gray-800 hover:border-primary transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <motion.div className="mb-4 flex justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Explore the Interactive Map</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Click on locations to discover the secrets and stories of Logania's most iconic places.
            </p>
          </div>
          <InteractiveMap />
        </motion.div>
      </div>
    </section>
  )
}

