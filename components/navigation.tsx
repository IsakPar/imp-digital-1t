"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import PlayfulLink from "@/components/playful-link"
// Removed ThemeToggle import

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.05, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-effect-dark shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold gradient-text-vibrant"
            >
              IMP
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <PlayfulLink
                  href={item.href}
                  animation="extreme"
                  color="#9333EA"
                  intensity="strong"
                  className={
                    pathname === item.href ? "text-purple-300" : "text-white" // Adjusted for permanent dark theme
                  }
                >
                  {item.label}
                </PlayfulLink>
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
            {/* Removed ThemeToggle from desktop */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Removed ThemeToggle from mobile */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white" // Adjusted for permanent dark theme
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -15 }}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.2, 0.05, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-gradient-secondary md:hidden" // bg-gradient-secondary will use dark theme variables
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <PlayfulLink
                    href={item.href}
                    animation="extreme"
                    color="#9333EA"
                    intensity="strong"
                    className={`text-3xl font-light ${pathname === item.href ? "text-purple-300" : "text-white"}`} // Adjusted for permanent dark theme
                  >
                    {item.label}
                  </PlayfulLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
