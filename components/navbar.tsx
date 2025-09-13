"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Gift, LogIn, UserPlus } from "lucide-react"

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!localStorage.getItem("token"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">RaiderClaim</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/report"
              className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Report Item</span>
            </Link>
            <Link
              href="/community"
              className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Community</span>
            </Link>
            <Link
              href="/rewards"
              className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Gift className="w-4 h-4" />
              <span>Raider Rewards</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login" className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup" className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
