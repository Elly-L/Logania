"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function GameDeveloper() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.section id="developer" className="py-20 forest-bg" ref={ref} style={{ opacity, scale }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-black/80 backdrop-blur-sm rounded-xl p-8 md:p-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet the Visionary</h2>
                <h3 className="text-2xl text-primary font-bold mb-6">Elly Logan Odhiambo</h3>
              </motion.div>

              <motion.p
                className="text-white/80 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                As the creative force behind Game Logania, Elly Logan Odhiambo brings his passion for world-building and
                storytelling to life. With a background in game development and a love for fantasy worlds, Elly has
                crafted an immersive experience that captivates the imagination.
              </motion.p>

              <motion.p
                className="text-white/80 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                His vision for Game Logania extends beyond just a digital platform—it's a community where creators and
                explorers can come together to share stories, build worlds, and embark on epic adventures.
              </motion.p>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 hover:border-primary/80 hover:bg-primary/20"
                  >
                    <Github className="h-5 w-5 text-white" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 hover:border-primary/80 hover:bg-primary/20"
                  >
                    <Twitter className="h-5 w-5 text-white" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 hover:border-primary/80 hover:bg-primary/20"
                  >
                    <Linkedin className="h-5 w-5 text-white" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-70 blur-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 0.5, 0.7],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
                <motion.div
                  className="relative rounded-full overflow-hidden border-4 border-primary/50 w-64 h-64 md:w-80 md:h-80"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ME.jpg-81jYEK2e4h2qO7izioxKE0B7MHAwPj.jpeg"
                    alt="Elly Logan Odhiambo"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

