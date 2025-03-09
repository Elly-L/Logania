"use client"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eltek-logo%20-%20Copy.jpg-8qOSOcThrJUtAOdJ0BuBuXtGpmFsKM.jpeg"
              alt="Game Logania Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="font-cinzel text-xl font-bold text-white">Game Logania</span>
          </motion.div>

          <motion.p
            className="text-white/50 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {new Date().getFullYear()} Game Logania. All rights reserved.
            <span className="block sm:inline sm:ml-2">
              Developed by{" "}
              <a
                href="https://eltek.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                eltek
              </a>
            </span>
          </motion.p>
          <motion.p
            className="text-white/50 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-primary font-medium">100% Free-to-Play</span> • No Subscription Required • No Sign-Up
            Needed
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

