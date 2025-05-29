"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { elasticSpring, bouncySpring, easings } from "@/lib/animation-utils"

interface PlayfulLinkProps {
  children: ReactNode
  href: string
  className?: string
  animation?: "bounce" | "wobble" | "elastic" | "glitch" | "neon" | "extreme" | "random"
  color?: string
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  external?: boolean
  onClick?: () => void
}

export default function PlayfulLink({
  children,
  href,
  className = "",
  animation = "bounce",
  color = "#9333EA",
  intensity = "medium",
  external = false,
  onClick,
}: PlayfulLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [randomAnimation, setRandomAnimation] = useState<string>("")
  const linkRef = useRef<HTMLSpanElement>(null)
  const controls = useAnimation()

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.7,
    medium: 1,
    strong: 1.5,
    extreme: 2.5,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Set random animation on mount
  useState(() => {
    if (animation === "random") {
      const animations = ["bounce", "wobble", "elastic", "glitch", "neon"]
      setRandomAnimation(animations[Math.floor(Math.random() * animations.length)])
    }
  })

  // Check if the children contain an arrow
  const hasArrow = typeof children === "string" && children.includes("→")

  // Handle hover start
  const handleHoverStart = () => {
    setIsHovered(true)

    // Different animations based on animation type
    switch (animation === "random" ? randomAnimation : animation) {
      case "bounce":
        controls.start({
          y: -5 * intensityMultiplier,
          scale: 1.1 * intensityMultiplier,
          transition: bouncySpring,
        })
        break
      case "wobble":
        controls.start({
          x: [0, -3 * intensityMultiplier, 3 * intensityMultiplier, -2 * intensityMultiplier, 0],
          scale: 1.05 * intensityMultiplier,
          transition: { duration: 0.5, ease: easings.wobble },
        })
        break
      case "elastic":
        controls.start({
          scale: 1.15 * intensityMultiplier,
          transition: elasticSpring,
        })
        break
      case "glitch":
        controls.start({
          x: [0, -3 * intensityMultiplier, 3 * intensityMultiplier, 0],
          opacity: [1, 0.8, 0.9, 1],
          transition: { duration: 0.3, times: [0, 0.3, 0.6, 1] },
        })
        break
      case "neon":
        controls.start({
          scale: 1.05 * intensityMultiplier,
          transition: { duration: 0.3 },
        })
        break
      case "extreme":
        controls.start({
          scale: 1.2 * intensityMultiplier,
          y: -8 * intensityMultiplier,
          x: [0, -5 * intensityMultiplier, 5 * intensityMultiplier, 0],
          transition: { duration: 0.8, ease: easings.elastic },
        })
        break
      default:
        controls.start({
          scale: 1.05 * intensityMultiplier,
          transition: { duration: 0.3 },
        })
    }
  }

  // Handle hover end
  const handleHoverEnd = () => {
    setIsHovered(false)
    controls.start({
      scale: 1,
      y: 0,
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: easings.smooth },
    })
  }

  // Wrap with Link if href is provided
  const content = (
    <motion.span
      ref={linkRef}
      className={`relative inline-flex items-center gap-2 ${className}`}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={onClick}
      style={{
        color: isHovered ? color : undefined,
      }}
    >
      {/* Content */}
      <span className="relative">
        {hasArrow ? children.replace("→", "") : children}

        {/* Underline effect */}
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-current"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(to right, ${color}, transparent)`,
            opacity: intensityMultiplier,
          }}
        />
      </span>

      {/* Arrow animation */}
      {(hasArrow || animation === "extreme") && (
        <motion.span
          animate={
            isHovered
              ? {
                  x: 5 * intensityMultiplier,
                  scale: 1.2 * intensityMultiplier,
                  transition: {
                    x: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 0.3 },
                    scale: { duration: 0.2 },
                  },
                }
              : { x: 0, scale: 1 }
          }
        >
          →
        </motion.span>
      )}

      {/* Neon effect */}
      {(animation === "neon" || animation === "extreme" || randomAnimation === "neon") && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}`,
          }}
        >
          {hasArrow ? children.replace("→", "") : children}
        </motion.span>
      )}
    </motion.span>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex">
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="inline-flex">
      {content}
    </Link>
  )
}
