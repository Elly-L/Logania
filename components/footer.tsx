"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
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
              className="text-white/70 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A world-building hub for creators, storytellers, and adventurers.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-primary hover:bg-transparent p-0">
                Terms
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-primary hover:bg-transparent p-0">
                Privacy
              </Button>
            </motion.div>
          </div>

          <div>
            <motion.h3
              className="font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore
            </motion.h3>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <li>
                <Link href="/worlds" className="text-white/70 hover:text-primary transition-colors">
                  Worlds
                </Link>
              </li>
              <li>
                <Link
                  href={isHomePage ? "#about" : "/#about"}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Characters
                </Link>
              </li>
              <li>
                <Link
                  href={isHomePage ? "#about" : "/#about"}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Maps
                </Link>
              </li>
              <li>
                <Link
                  href={isHomePage ? "#about" : "/#about"}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Stories
                </Link>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h3
              className="font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Resources
            </motion.h3>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <li>
                <Link href="/join" className="text-white/70 hover:text-primary transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-white/70 hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-white/70 hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-white/70 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h3
              className="font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Join Our Community
            </motion.h3>
            <motion.p
              className="text-white/70 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stay updated with the latest features and world-building tools.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/join">
                <Button className="w-full bg-primary hover:bg-primary/90">Subscribe</Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <motion.p
            className="text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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

