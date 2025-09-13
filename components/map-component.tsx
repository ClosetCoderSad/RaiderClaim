"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in react-leaflet
const defaultIcon = new Icon({
  iconUrl: "/map-pin-icon.jpg",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
})

interface Pin {
  _id: string
  itemName: string
  description: string
  latitude: number
  longitude: number
  createdAt: string
}

interface MapComponentProps {
  onLocationSelect?: (lat: number, lng: number) => void
  pins?: Pin[]
  selectedLocation?: { lat: number; lng: number } | null
}

function LocationMarker({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition({ lat, lng })
      onLocationSelect?.(lat, lng)
    },
  })

  return position === null ? null : (
    <Marker position={[position.lat, position.lng]} icon={defaultIcon}>
      <Popup>Selected location for lost item</Popup>
    </Marker>
  )
}

export function MapComponent({ onLocationSelect, pins = [], selectedLocation }: MapComponentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  // Texas Tech University coordinates
  const ttuCenter: [number, number] = [33.5843, -101.8783]

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-border">
      <MapContainer center={ttuCenter} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Existing pins */}
        {pins.map((pin) => (
          <Marker key={pin._id} position={[pin.latitude, pin.longitude]} icon={defaultIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{pin.itemName}</h3>
                <p className="text-xs text-gray-600 mt-1">{pin.description}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(pin.createdAt).toLocaleDateString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Selected location marker */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={defaultIcon}>
            <Popup>Selected location for lost item</Popup>
          </Marker>
        )}

        {/* Click handler for new pins */}
        {onLocationSelect && <LocationMarker onLocationSelect={onLocationSelect} />}
      </MapContainer>
    </div>
  )
}
