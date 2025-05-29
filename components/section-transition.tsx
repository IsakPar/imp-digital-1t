"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function SectionTransition({
  children,
  id,
  className = "",
  startColor = "#1e1b4b", // indigo-950
  endColor = "#581c87", // purple-900
  transitionHeight = 100, // Height of the transition area in pixels
}) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Create a spring animation for smoother transitions
  const springScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Transform the scroll progress to control the transition
  const clipPathProgress = useTransform(
    springScrollYProgress,
    [0, 0.5, 1],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    ],
  )

  const backgroundOpacity = useTransform(springScrollYProgress, [0, 0.5, 1], [1, 1, 0])

  // Create a wave effect for the transition
  const waveProgress = useTransform(
    springScrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "polygon(0% 100%, 25% 100%, 50% 100%, 75% 100%, 100% 100%, 100% 100%, 0% 100%)",
      "polygon(0% 95%, 25% 90%, 50% 95%, 75% 90%, 100% 95%, 100% 100%, 0% 100%)",
      "polygon(0% 70%, 25% 75%, 50% 65%, 75% 75%, 100% 70%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 25% 0%, 50% 0%, 75% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  )

  return (
    <div ref={sectionRef} id={id} className={`relative ${className}`}>
      {/* Background color layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: startColor,
          opacity: backgroundOpacity,
        }}
      />

      {/* Wave transition layer */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: endColor,
          clipPath: waveProgress,
        }}
      />

      {/* Content layer */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}
