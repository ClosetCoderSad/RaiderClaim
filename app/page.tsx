import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { MapPin, Users, Gift, Zap, Shield, Search } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    <div className="absolute inset-0
  bg-[radial-gradient(circle_1200px_at_90%_20%,oklch(0.7_0.25_320_/_0.1)_0%,transparent_50%)]
  bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
/>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden sm:h-[100vh] flex items-center h-[65vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1
                className="text-5xl md:text-7xl font-bold mb-6 text-balance"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <span className="text-neon-pink">Raider</span>
                <span className="text-neon-bluegreen">Claim</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-pretty text-gray-300">
                Our advanced platform for Texas Tech Raiders to report,
                track, and reclaim lost items across campus
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/report">
                    <MapPin className="w-5 h-5 mr-2" />
                    Report Lost Item
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-6 bg-transparent hover:border-violet-500 hover:text-violet-500 hover:bg-transparent"
                >
                  <Link href="/community">
                    <Search className="w-5 h-5 mr-2" />
                    Browse Found Items
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Powered by <span className="text-violet-500">Raider Tech</span>
              </h2>
              <p
                className="text-lg text-gray-300 max-w-2xl mx-auto text-pretty"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                Advanced features designed for the modern Texas Tech community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card
                className="bg-card/50  border-violet-500 hover:border-violet-800 transition-colors"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-violet-900 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Interactive Map
                  </h3>
                  <p className="text-muted-foreground">
                    Drop pins on our campus map to mark exact locations where
                    items were lost or found
                  </p>
                </CardContent>
              </Card>

              <Card
                className="bg-card/50 border-violet-500 hover:border-violet-800 transition-colors"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-violet-900 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Community Posts
                  </h3>
                  <p className="text-muted-foreground">
                    Share photos and details about lost items with hashtags and
                    student ID verification
                  </p>
                </CardContent>
              </Card>

              <Card
                className="bg-card/50  border-violet-500 hover:border-violet-800 transition-colors"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-violet-900 rounded-lg flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Raider Rewards</h3>
                  <p className="text-muted-foreground">
                    Earn points for helping others and redeem them for exclusive
                    TTU merchandise
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tech Features */}
        <section className="py-20 px-4 bg-card/20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right" data-aos-delay="300">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                  Built for <span className="text-violet-500">Raiders</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-violet-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Lightning Fast</h3>
                      <p className="text-muted-foreground">
                        Report items in seconds with our streamlined interface
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-violet-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Secure & Private</h3>
                      <p className="text-muted-foreground">
                        Student ID verification ensures only Raiders can access
                        the platform
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-violet-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Gift className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Reward System</h3>
                      <p className="text-muted-foreground">
                        Connect your Solana wallet and earn crypto rewards for
                        community participation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="relative"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl font-bold text-accent/50">TTU</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-balance"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Ready to <span className="text-violet-500">Reclaim</span> Your
                Items?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Join the RaiderClaim community and never lose track of your
                belongings again
              </p>
              <Button
                size="lg"
                asChild
                className="text-lg px-8 py-6"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <Link href="/signup">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4">
          <div className="container mx-auto text-center">
            <p className="text-muted-foreground">
              © 2024 RaiderClaim. Built for Texas Tech University Raiders.
            </p>
          </div>
        </footer>
        {/* ElevenLabs Convai Widget - Fixed Bottom Right */}
        <div
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
          dangerouslySetInnerHTML={{
            __html:
              '<elevenlabs-convai agent-id="agent_1901k4393zgef249h0xngj83htha"></elevenlabs-convai>',
          }}
        />
        <script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          async
          type="text/javascript"
        ></script>
      </div>
    </div>
  );
}
