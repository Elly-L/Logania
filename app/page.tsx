import Hero from "@/components/hero"
import About from "@/components/about"
import GameDeveloper from "@/components/game-developer"
import Features from "@/components/features"
import CharacterShowcase from "@/components/character-showcase"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet the Characters</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover the heroes, villains, and mysterious beings that inhabit the world of Logania
            </p>
          </div>
          <CharacterShowcase />
        </div>
      </section>
      <GameDeveloper />
      <Features />
    </main>
  )
}

