"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun, Loader2, FileText } from "lucide-react"
import { useTheme } from "next-themes"
import { useParticleEffect } from "@/hooks/use-particle-effect"
import { useResumeModal } from "@/hooks/use-resume-modal"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { toggleSwirlEffect, isSwirlActive } = useParticleEffect()
  const { openModal } = useResumeModal()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Isaac Thean
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                  pathname === link.href ? "font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FileText className="h-4 w-4" /> Resume
            </button>

            <button
              onClick={toggleSwirlEffect}
              className={`p-2 rounded-full transition-colors ${
                isSwirlActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-label={isSwirlActive ? "Disable swirl effect" : "Enable swirl effect"}
              title="Toggle particle swirl effect"
            >
              <Loader2 className={`h-5 w-5 ${isSwirlActive ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={openModal}
              className="inline-flex items-center mr-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg transition-all duration-300"
            >
              <FileText className="h-5 w-5" />
              <span className="sr-only">Resume</span>
            </button>

            <button
              onClick={toggleSwirlEffect}
              className={`p-2 mr-2 rounded-full transition-colors ${
                isSwirlActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-label={isSwirlActive ? "Disable swirl effect" : "Enable swirl effect"}
            >
              <Loader2 className={`h-5 w-5 ${isSwirlActive ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                    pathname === link.href ? "font-medium" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
