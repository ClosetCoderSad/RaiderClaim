"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Gift, LogIn, UserPlus, Home } from "lucide-react"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

export function Navbar() {
  const pathname = usePathname();
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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 border-b-violet-900">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-violet-900 rounded-lg flex items-center justify-center">
              <span className="text-violet-900 font-bold text-lg">R</span>
            </div>
            <div className="flex space-x-0">
            <span className="text-xl font-bold text-neon-pink">Raider</span>
            <span className="text-xl font-bold text-neon-bluegreen">Claim</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`flex items-center space-x-2 transition-colors ${pathname === '/' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`}
            >
              <Home className={`w-4 h-4 ${pathname === '/' ? 'text-violet-500' : 'text-gray-300'}`} />
              <span>Home</span>
            </Link>
            <Link
              href="/report"
              className={`flex items-center space-x-2 transition-colors ${pathname === '/report' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`}
            >
              <MapPin className={`w-4 h-4 ${pathname === '/report' ? 'text-violet-500' : 'text-gray-300'}`} />
              <span>Report Item</span>
            </Link>
            <Link
              href="/community"
              className={`flex items-center space-x-2 transition-colors ${pathname === '/community' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`}
            >
              <Users className={`w-4 h-4 ${pathname === '/community' ? 'text-violet-500' : 'text-gray-300'}`} />
              <span>Community</span>
            </Link>
            <Link
              href="/rewards"
              className={`flex items-center space-x-2 transition-colors ${pathname === '/rewards' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`}
            >
              <Gift className={`w-4 h-4 ${pathname === '/rewards' ? 'text-violet-500' : 'text-gray-300'}`} />
              <span>Raider Rewards</span>
            </Link>
            {/* Add Smart Security link */}
            <Link
              href="/smart-security"
              className={`flex items-center space-x-2 transition-colors ${pathname === '/smart-security' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`}
            >
              <span className="material-icons-outlined"></span>
              <span>Smart Security</span>
            </Link>
          </div>

          {/* Mobile hamburger nav as dropdown */}
          <div className="md:hidden flex items-center relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label={dropdownOpen ? "Close menu" : "Open menu"}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="z-[60]"
            >
              {dropdownOpen ? (
                <span className="text-base text-gray-300 font-light">X</span>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
              )}
            </Button>
            {dropdownOpen && (
              <div className="fixed top-0 right-0 h-screen w-1/2 bg-card shadow-lg border-l z-50 flex flex-col pb-8 pt-24 px-6">
                <Link href="/" className={`flex items-center space-x-2 transition-colors mb-4 ${pathname === '/' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`} onClick={() => setDropdownOpen(false)}>
                  <Home className={`w-4 h-4 ${pathname === '/' ? 'text-violet-500' : 'text-gray-300'}`} />
                  <span>Home</span>
                </Link>
                <Link href="/report" className={`flex items-center space-x-2 transition-colors mb-4 ${pathname === '/report' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`} onClick={() => setDropdownOpen(false)}>
                  <MapPin className={`w-4 h-4 ${pathname === '/report' ? 'text-violet-500' : 'text-gray-300'}`} />
                  <span>Report Item</span>
                </Link>
                <Link href="/community" className={`flex items-center space-x-2 transition-colors mb-4 ${pathname === '/community' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`} onClick={() => setDropdownOpen(false)}>
                  <Users className={`w-4 h-4 ${pathname === '/community' ? 'text-violet-500' : 'text-gray-300'}`} />
                  <span>Community</span>
                </Link>
                <Link href="/rewards" className={`flex items-center space-x-2 transition-colors mb-4 ${pathname === '/rewards' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`} onClick={() => setDropdownOpen(false)}>
                  <Gift className={`w-4 h-4 ${pathname === '/rewards' ? 'text-violet-500' : 'text-gray-300'}`} />
                  <span>Raider Rewards</span>
                </Link>
                {/* Add Smart Security link to mobile menu */}
                <Link
                  href="/smart-security"
                  className={`flex items-center space-x-2 transition-colors mb-4 ${pathname === '/smart-security' ? 'text-violet-500' : 'text-gray-300'} hover:text-violet-500`}
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="material-icons-outlined">security</span>
                  <span>Smart Security</span>
                </Link>
                {/* Auth buttons conditionally rendered */}
                {isAuthenticated ? (
                  <Button variant="ghost" size="sm" onClick={() => { handleLogout(); setDropdownOpen(false); }} className="w-full flex justify-start mt-4">
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild className="w-full flex justify-start mt-4" onClick={() => setDropdownOpen(false)}>
                      <Link href="/login" className="flex items-center space-x-2">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="w-full flex justify-start mt-2" onClick={() => setDropdownOpen(false)}>
                      <Link href="/signup" className="flex items-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="items-center space-x-3 hidden sm:block">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:border bg-violet-900 hover:bg-violet-800 text-white hover:cursor-pointer">
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login" className="flex items-center space-x-2 hover:border hover:border-violet-800 hover:bg-transparent hover:text-white">
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
