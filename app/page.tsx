import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { MapPin, Users, Gift, Zap, Shield, Search } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              <span className="text-foreground">Raider</span>
              <span className="text-accent">Claim</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
              The cyberpunk-powered platform for Texas Tech Raiders to report, track, and reclaim lost items across
              campus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/report">
                  <MapPin className="w-5 h-5 mr-2" />
                  Report Lost Item
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
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
              Powered by <span className="text-accent">Raider Tech</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Advanced features designed for the modern Texas Tech community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border hover:border-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Drop pins on our campus map to mark exact locations where items were lost or found
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:border-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Posts</h3>
                <p className="text-muted-foreground">
                  Share photos and details about lost items with hashtags and student ID verification
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:border-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Raider Rewards</h3>
                <p className="text-muted-foreground">
                  Earn points for helping others and redeem them for exclusive TTU merchandise
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
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                Built for <span className="text-accent">Raiders</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Lightning Fast</h3>
                    <p className="text-muted-foreground">Report items in seconds with our streamlined interface</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Secure & Private</h3>
                    <p className="text-muted-foreground">
                      Student ID verification ensures only Raiders can access the platform
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Gift className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Reward System</h3>
                    <p className="text-muted-foreground">
                      Connect your Solana wallet and earn crypto rewards for community participation
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Ready to <span className="text-accent">Reclaim</span> Your Items?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Join the RaiderClaim community and never lose track of your belongings again
            </p>
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/signup">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2024 RaiderClaim. Built for Texas Tech University Raiders.</p>
        </div>
      </footer>
    </div>
  )
}
