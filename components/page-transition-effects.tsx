"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageTransitionEffects() {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {/* Top reveal effect */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="fixed top-0 left-0 right-0 h-screen bg-purple-600 origin-top z-[101]"
      />

      {/* Bottom reveal effect */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 h-screen bg-indigo-900 origin-bottom z-[100]"
      />

      {/* Page entry animation */}
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-[99]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl font-bold gradient-text-vibrant"
            >
              {pathname === "/" ? "Home" : pathname.substring(1).charAt(0).toUpperCase() + pathname.slice(2)}
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  )
}
