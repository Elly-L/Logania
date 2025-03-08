import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Palette, Gamepad2, BookOpen, Users } from "lucide-react"

export default function JoinPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join the Logania Community</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Help us build the enchanted realm of Logania. We're looking for passionate creators to join our
              world-building adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/60 border-gray-800 hover:border-primary transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Gamepad2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Game Designers</h3>
                <p className="text-white/70 mb-6 flex-grow">
                  Help design game mechanics, character abilities, and progression systems that will bring the world of
                  Logania to life.
                </p>
                <Button className="w-full">
                  Apply as Designer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-gray-800 hover:border-primary transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Developers</h3>
                <p className="text-white/70 mb-6 flex-grow">
                  Join our development team to build the technical foundation of Logania. Experience with game engines,
                  web development, or AR/VR is a plus.
                </p>
                <Button className="w-full">
                  Apply as Developer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-gray-800 hover:border-primary transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Artists</h3>
                <p className="text-white/70 mb-6 flex-grow">
                  Create concept art, character designs, environment illustrations, and UI elements that capture the
                  magical essence of Logania.
                </p>
                <Button className="w-full">
                  Apply as Artist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-gray-800 hover:border-primary transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Writers & Lore Masters</h3>
                <p className="text-white/70 mb-6 flex-grow">
                  Craft the stories, histories, and mythologies that give depth to the world of Logania. Develop
                  character backstories and quest narratives.
                </p>
                <Button className="w-full">
                  Apply as Writer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-gray-800 hover:border-primary transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Community Builders</h3>
                <p className="text-white/70 mb-6 flex-grow">
                  Help grow and nurture our community of players and creators. Organize events, moderate forums, and
                  create engaging content.
                </p>
                <Button className="w-full">
                  Apply as Community Builder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Development Process</h2>
            <p className="text-white/80 mb-6">
              Game Logania is being built with a community-first approach. We believe that the best worlds are created
              collaboratively, with diverse perspectives and talents coming together to create something truly magical.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <div className="text-primary font-bold text-xl mb-1">Phase 1</div>
                <div className="text-white">World Building</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <div className="text-primary font-bold text-xl mb-1">Phase 2</div>
                <div className="text-white">Prototype Development</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <div className="text-primary font-bold text-xl mb-1">Phase 3</div>
                <div className="text-white">Community Testing</div>
              </div>
            </div>
            <p className="text-white/80 mb-6">
              We're currently in Phase 1, focusing on building the lore, characters, and environments that will make
              Logania a rich and immersive world. Join us now to have the biggest impact on shaping this magical realm!
            </p>
            <div className="text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Join Our Discord Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

