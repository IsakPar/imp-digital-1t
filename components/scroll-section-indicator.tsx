"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollSectionIndicator({ sections }) {
  const [activeSection, setActiveSection] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show indicator after scrolling down a bit
      setIsVisible(window.scrollY > 200)

      // Determine which section is currently in view
      const viewportHeight = window.innerHeight
      const scrollPosition = window.scrollY + viewportHeight / 2

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i].id)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(i)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4"
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="relative w-3 h-3 rounded-full bg-white/30 hover:bg-white/70 transition-colors"
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              {activeSection === index && (
                <motion.div
                  layoutId="activeSectionIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="sr-only">{section.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
