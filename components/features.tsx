"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Users, Palette, Compass } from "lucide-react"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Sparkles className="h-12 w-12 text-primary" />,
      title: "Magical Realms",
      description: "Explore enchanted forests, ancient ruins, and mystical landscapes filled with wonder and secrets.",
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Character Creation",
      description: "Design and develop unique characters with rich backstories and special abilities.",
    },
    {
      icon: <Palette className="h-12 w-12 text-primary" />,
      title: "Artistic Tools",
      description: "Access powerful world-building tools to bring your creative vision to life with stunning visuals.",
    },
    {
      icon: <Compass className="h-12 w-12 text-primary" />,
      title: "Adventure Mapping",
      description: "Create detailed maps with interactive elements to guide players through your world.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
  }

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">World-Building Features</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Everything you need to create immersive, captivating worlds
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-800/40 border-gray-700 hover:border-primary transition-all duration-300 h-full overflow-hidden group">
                <CardContent className="p-8 relative">
                  <motion.div className="mb-6" whileHover={{ scale: 1.1, rotate: 5 }}>
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-lg">{feature.description}</p>

                  <motion.div
                    className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 p-px rounded-lg">
            <div className="bg-gray-900 rounded-lg px-6 py-4">
              <p className="text-white text-lg">
                <span className="font-bold text-primary">100% Free-to-Play</span> • No Subscription Required • No
                Sign-Up Needed
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

