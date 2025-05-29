"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

// Context for the scroll controller
interface ScrollContextType {
  currentSection: number
  nextSection: () => void
  prevSection: () => void
  goToSection: (index: number) => void
  isTransitioning: boolean
  sections: string[]
}

const ScrollContext = createContext<ScrollContextType>({
  currentSection: 0,
  nextSection: () => {},
  prevSection: () => {},
  goToSection: () => {},
  isTransitioning: false,
  sections: [],
})

// Hook to use the scroll controller
export const useScrollController = () => useContext(ScrollContext)

interface ScrollControllerProviderProps {
  children: ReactNode
  sections: string[]
  transitionDuration?: number
}

// Provider component for the scroll controller
export function ScrollControllerProvider({
  children,
  sections,
  transitionDuration = 1000,
}: ScrollControllerProviderProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lastScrollTime = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Function to go to the next section
  const nextSection = () => {
    if (isTransitioning) return
    if (currentSection < sections.length - 1) {
      setIsTransitioning(true)
      setCurrentSection(currentSection + 1)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
      }, transitionDuration)
    }
  }

  // Function to go to the previous section
  const prevSection = () => {
    if (isTransitioning) return
    if (currentSection > 0) {
      setIsTransitioning(true)
      setCurrentSection(currentSection - 1)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
      }, transitionDuration)
    }
  }

  // Function to go to a specific section
  const goToSection = (index: number) => {
    if (isTransitioning || index === currentSection) return
    if (index >= 0 && index < sections.length) {
      setIsTransitioning(true)
      setCurrentSection(index)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
      }, transitionDuration)
    }
  }

  // Handle wheel events for scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime.current < transitionDuration) return
      lastScrollTime.current = now

      if (e.deltaY > 0) {
        nextSection()
      } else {
        prevSection()
      }
    }

    // Handle keyboard events for navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault()
          nextSection()
          break
        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          prevSection()
          break
        default:
          break
      }
    }

    // Handle touch events for mobile
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) {
        e.preventDefault()
        return
      }

      const touchY = e.touches[0].clientY
      const diff = touchStartY - touchY

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSection()
        } else {
          prevSection()
        }
        touchStartY = touchY
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [currentSection, isTransitioning])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        currentSection,
        nextSection,
        prevSection,
        goToSection,
        isTransitioning,
        sections,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

// Component for each immersive section
interface ImmersiveSectionProps {
  children: ReactNode
  index: number
}

export function ImmersiveSection({ children, index }: ImmersiveSectionProps) {
  const { currentSection } = useScrollController()

  return (
    <div
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        Math.abs(currentSection - index) > 1 ? "opacity-0 pointer-events-none" : ""
      }`}
      style={{ zIndex: currentSection === index ? 10 : 5 }}
    >
      {children}
    </div>
  )
}

// Component for the scroll indicator
export function ScrollIndicator() {
  const { sections, currentSection, goToSection, isTransitioning } = useScrollController()

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4">
      {sections.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSection(index)}
          disabled={isTransitioning}
          className="relative w-3 h-3 rounded-full bg-white/30 hover:bg-white/70 transition-colors"
          aria-label={`Go to section ${index + 1}`}
        >
          {currentSection === index && (
            <motion.div
              layoutId="activeSectionIndicator"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
