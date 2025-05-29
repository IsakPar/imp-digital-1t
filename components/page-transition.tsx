"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  // Only animate after the first mount
  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstMount ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 240, // Changed from 260 to 240 for smoother animation
          damping: 25, // Changed from 20 to 25 for less bouncing
          duration: 0.4, // Changed from 0.3 to 0.4 for slightly longer animation
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
