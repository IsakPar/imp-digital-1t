"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import dynamic from "next/dynamic"
import { ScrollProgress } from "@/components/smooth-scroll-animations"
import AnimatedLogo from "@/components/animated-logo"
import HeroParallax from "@/components/hero-parallax"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import USPSection from "@/components/usp-section"
import SecuritySection from "@/components/security-section"
import BlogTeaser from "@/components/blog-teaser"
import ContactSection from "@/components/contact-section"

// Dynamically import the Spline component to avoid SSR issues
const SplineHero = dynamic(() => import("@/components/spline-hero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
    </div>
  ),
})

export default function HomePage() {
  // Animation controls for preloading animations
  const heroControls = useAnimation()

  // Refs for sections
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)
  const uspRef = useRef(null)
  const securityRef = useRef(null)
  const blogRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    // Start hero animations immediately on page load
    heroControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    })

    // Command palette easter egg
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        alert("Command palette coming soon... 🚀")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [heroControls])

  return (
    <div className="overflow-x-hidden">
      <ScrollProgress color="linear-gradient(to right, #9333EA, #EC4899)" height={4} />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SplineHero />
        </div>

        <div className="text-center z-10 relative">
          <AnimatedLogo startImmediately={true} />
          <HeroParallax />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          <div className="w-10 h-16 border-2 border-white/40 rounded-full flex justify-center relative">
            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-white rounded-full mt-3"
            />
          </div>
          <p className="text-white/60 text-sm mt-2">Scroll to explore</p>
        </motion.div>
      </section>

      {/* Services Section */}
      <div ref={servicesRef}>
        <ServicesSection />
      </div>

      {/* USP Section */}
      <div ref={uspRef}>
        <USPSection />
      </div>

      {/* Portfolio Section */}
      <div ref={projectsRef}>
        <PortfolioSection />
      </div>

      {/* Security Section */}
      <div ref={securityRef}>
        <SecuritySection />
      </div>

      {/* Blog Teaser Section */}
      <div ref={blogRef}>
        <BlogTeaser />
      </div>

      {/* Contact Section */}
      <div ref={contactRef}>
        <ContactSection />
      </div>

      {/* Easter egg hint */}
      <div className="fixed bottom-4 right-4 text-xs text-white/60 flex items-center gap-1 opacity-50">Press ⌘+K</div>
    </div>
  )
}
