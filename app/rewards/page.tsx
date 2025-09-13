"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { Gift, Wallet, Coins, Star, ShoppingBag, Shirt, Coffee, Zap } from "lucide-react"

interface Reward {
  id: string
  name: string
  pointsCost: number
  description: string
  category: string
  available: boolean
  icon: React.ReactNode
}

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState(1250) // Placeholder balance
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  // Mock rewards data
  const rewards: Reward[] = [
    {
      id: "1",
      name: "TTU Red Raiders T-Shirt",
      pointsCost: 500,
      description: "Official Texas Tech Red Raiders t-shirt in various sizes",
      category: "apparel",
      available: true,
      icon: <Shirt className="w-6 h-6" />,
    },
    {
      id: "2",
      name: "Starbucks Gift Card ($10)",
      pointsCost: 800,
      description: "$10 gift card for Starbucks locations on campus",
      category: "food",
      available: true,
      icon: <Coffee className="w-6 h-6" />,
    },
    {
      id: "3",
      name: "TTU Hoodie",
      pointsCost: 1200,
      description: "Premium Texas Tech hoodie with Red Raiders logo",
      category: "apparel",
      available: true,
      icon: <Shirt className="w-6 h-6" />,
    },
    {
      id: "4",
      name: "Campus Bookstore Voucher ($25)",
      pointsCost: 1500,
      description: "$25 voucher for the Texas Tech campus bookstore",
      category: "voucher",
      available: true,
      icon: <ShoppingBag className="w-6 h-6" />,
    },
    {
      id: "5",
      name: "Premium TTU Water Bottle",
      pointsCost: 300,
      description: "Insulated water bottle with Texas Tech branding",
      category: "accessories",
      available: true,
      icon: <Gift className="w-6 h-6" />,
    },
    {
      id: "6",
      name: "Dining Hall Credit ($15)",
      pointsCost: 1000,
      description: "$15 credit for any dining hall on campus",
      category: "food",
      available: false,
      icon: <Coffee className="w-6 h-6" />,
    },
  ]

  const categories = [
    { id: "all", name: "All Items" },
    { id: "apparel", name: "Apparel" },
    { id: "food", name: "Food & Drinks" },
    { id: "accessories", name: "Accessories" },
    { id: "voucher", name: "Vouchers" },
  ]

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const connectWallet = async () => {
    try {
      // Mock wallet connection - in real implementation, use Solana wallet adapter
      if (typeof window !== "undefined" && (window as any).solana) {
        // Simulate wallet connection
        setWalletConnected(true)
        setWalletAddress("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM") // Mock address
      } else {
        alert("Please install a Solana wallet like Phantom to connect")
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress("")
  }

  const redeemReward = (reward: Reward) => {
    if (userPoints >= reward.pointsCost && reward.available) {
      setUserPoints(userPoints - reward.pointsCost)
      alert(`Successfully redeemed ${reward.name}!`)
    }
  }

  const filteredRewards = rewards.filter((reward) => selectedCategory === "all" || reward.category === selectedCategory)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              <span className="text-accent">Raider</span> Rewards
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Earn points by helping the community and redeem them for exclusive TTU merchandise
            </p>
          </div>

          {/* Points and Wallet Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span>Your Points</span>
                </CardTitle>
                <CardDescription>Points earned from community participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-4">{userPoints.toLocaleString()}</div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Posts created:</span>
                    <span>+50 pts each</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items found:</span>
                    <span>+100 pts each</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Community help:</span>
                    <span>+25 pts each</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-accent" />
                  <span>Solana Wallet</span>
                </CardTitle>
                <CardDescription>Connect your wallet for crypto rewards</CardDescription>
              </CardHeader>
              <CardContent>
                {walletConnected ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm text-muted-foreground">Connected</span>
                    </div>
                    <div className="text-sm font-mono bg-muted p-2 rounded text-center">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                    </div>
                    <Button variant="outline" onClick={disconnectWallet} className="w-full bg-transparent">
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <Zap className="h-4 w-4" />
                      <AlertDescription>
                        Connect your Solana wallet to earn crypto rewards for exceptional community contributions!
                      </AlertDescription>
                    </Alert>
                    <Button onClick={connectWallet} className="w-full">
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Rewards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <Card
                key={reward.id}
                className={`bg-card/50 border-border transition-all hover:border-accent/50 ${
                  !reward.available ? "opacity-60" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        {reward.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{reward.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <Coins className="w-3 h-3 mr-1" />
                            {reward.pointsCost}
                          </Badge>
                          {!reward.available && (
                            <Badge variant="destructive" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{reward.description}</p>
                  <Button
                    className="w-full"
                    disabled={!reward.available || userPoints < reward.pointsCost}
                    onClick={() => redeemReward(reward)}
                  >
                    {userPoints < reward.pointsCost
                      ? `Need ${reward.pointsCost - userPoints} more points`
                      : !reward.available
                        ? "Out of Stock"
                        : "Redeem"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How to Earn Points */}
          <Card className="bg-card/50 border-border mt-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent" />
                <span>How to Earn Points</span>
              </CardTitle>
              <CardDescription>Participate in the community to earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Report Lost Items</h3>
                  <p className="text-sm text-muted-foreground">Earn 50 points for each lost item you report</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Help Others</h3>
                  <p className="text-sm text-muted-foreground">Earn 100 points when you help someone find their item</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Community Engagement</h3>
                  <p className="text-sm text-muted-foreground">Earn 25 points for helpful comments and interactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
