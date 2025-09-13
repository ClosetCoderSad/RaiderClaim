"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
  className?: string
}

export function ImageUpload({ onImageUpload, currentImage, className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<string>(currentImage || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG, PNG, and WebP are allowed.")
      return
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError("File too large. Maximum size is 5MB.")
      return
    }

    setError("")
    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload file
      const formData = new FormData()
      formData.append("file", file)

      const token = localStorage.getItem("token")
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        onImageUpload(data.url)
      } else {
        setError(data.error || "Upload failed")
        setPreview("")
      }
    } catch (error) {
      setError("Network error. Please try again.")
      setPreview("")
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview("")
    onImageUpload("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {preview ? (
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Preview"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemoveImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">Upload an image of your lost item</p>
          <Button type="button" onClick={handleButtonClick} disabled={uploading}>
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Choose Image"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">JPEG, PNG, WebP up to 5MB</p>
        </div>
      )}
    </div>
  )
}
