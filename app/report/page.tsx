"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { MapPin, Package } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map to avoid SSR issues
const DynamicMapComponent = dynamic(() => import("@/components/map-component").then((mod) => mod.MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

export default function ReportPage() {
  const [itemName, setItemName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!itemName || !description) {
      setError("Please fill in all fields")
      return
    }

    if (!selectedLocation) {
      setError("Please select a location on the map")
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/pins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemName,
          description,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Lost item reported successfully!")
        setItemName("")
        setDescription("")
        setSelectedLocation(null)
        setTimeout(() => {
          router.push("/community")
        }, 2000)
      } else {
        setError(data.error || "Failed to report item")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Report <span className="text-accent">Lost Item</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Drop a pin on the map and provide details about your lost item
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-accent" />
                  <span>Item Details</span>
                </CardTitle>
                <CardDescription>Provide information about your lost item</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="border-accent/50 bg-accent/10">
                      <AlertDescription className="text-accent">{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      type="text"
                      placeholder="e.g., iPhone 13, Red Backpack, Keys"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about the item, where you think you lost it, any distinguishing features..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {selectedLocation
                          ? `Selected: ${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`
                          : "Click on the map to select location"}
                      </span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Reporting..." : "Report Lost Item"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>Select Location</span>
                </CardTitle>
                <CardDescription>Click on the map where you lost the item</CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicMapComponent onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                <p className="text-xs text-muted-foreground mt-2">
                  Click anywhere on the Texas Tech campus map to drop a pin
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
