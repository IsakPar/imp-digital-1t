"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useMagneticEffect, elasticSpring, bouncySpring, easings } from "@/lib/animation-utils"

interface PlayfulIconProps {
  children: ReactNode
  className?: string
  animation?: "bounce" | "wobble" | "elastic" | "magnetic" | "particles" | "glitch" | "neon" | "extreme" | "random"
  color?: string
  glowColor?: string
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export default function PlayfulIcon({
  children,
  className = "",
  animation = "bounce",
  color = "#9333EA",
  glowColor = "",
  intensity = "medium",
  onClick,
  size = "md",
}: PlayfulIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [randomAnimation, setRandomAnimation] = useState<string>("")
  const iconRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [magneticRef, magneticPosition] = useMagneticEffect(8, 0.2, animation === "magnetic" || animation === "extreme")

  // For particle effects
  const particles = useRef(
    Array.from({ length: 8 }, () => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 0.3,
    })),
  )

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.7,
    medium: 1,
    strong: 1.5,
    extreme: 2.5,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Effective glow color
  const effectiveGlowColor = glowColor || `${color}80`

  // Set random animation on mount
  useState(() => {
    if (animation === "random") {
      const animations = ["bounce", "wobble", "elastic", "magnetic", "particles", "glitch", "neon"]
      setRandomAnimation(animations[Math.floor(Math.random() * animations.length)])
    }
  })

  // Handle hover start
  const handleHoverStart = () => {
    setIsHovered(true)

    // Different animations based on animation type
    switch (animation === "random" ? randomAnimation : animation) {
      case "bounce":
        controls.start({
          scale: 1.3 * intensityMultiplier,
          y: -10 * intensityMultiplier,
          transition: bouncySpring,
        })
        break
      case "wobble":
        controls.start({
          rotate: [0, -15 * intensityMultiplier, 15 * intensityMultiplier, -10 * intensityMultiplier, 0],
          scale: 1.2 * intensityMultiplier,
          transition: { duration: 0.8, ease: easings.wobble },
        })
        break
      case "elastic":
        controls.start({
          scale: 1.4 * intensityMultiplier,
          rotate: 15 * intensityMultiplier,
          transition: elasticSpring,
        })
        break
      case "magnetic":
        // Handled by useMagneticEffect
        controls.start({
          scale: 1.2 * intensityMultiplier,
          transition: { duration: 0.3 },
        })
        break
      case "particles":
        controls.start({
          scale: 1.2 * intensityMultiplier,
          rotate: 360 * intensityMultiplier,
          transition: { duration: 0.8, ease: easings.smooth },
        })
        break
      case "glitch":
        controls.start({
          scale: [1, 1.3 * intensityMultiplier, 0.9 * intensityMultiplier, 1.2 * intensityMultiplier],
          x: [0, -5 * intensityMultiplier, 5 * intensityMultiplier, 0],
          transition: { duration: 0.4, times: [0, 0.3, 0.6, 1] },
        })
        break
      case "neon":
        controls.start({
          scale: 1.2 * intensityMultiplier,
          rotate: 360 * intensityMultiplier,
          transition: { duration: 1, ease: easings.smooth },
        })
        break
      case "extreme":
        controls.start({
          scale: [1, 1.5 * intensityMultiplier, 0.8 * intensityMultiplier, 1.3 * intensityMultiplier],
          rotate: [0, -20 * intensityMultiplier, 380 * intensityMultiplier, 340 * intensityMultiplier],
          transition: { duration: 1.5, ease: easings.elastic, repeat: 1, repeatType: "reverse" },
        })
        break
      default:
        controls.start({
          scale: 1.2 * intensityMultiplier,
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
      rotate: 0,
      x: 0,
      transition: { duration: 0.5, ease: easings.smooth },
    })
  }

  // Get the ref to use based on animation
  const getRef = () => {
    if (animation === "magnetic" || animation === "extreme" || randomAnimation === "magnetic") {
      return magneticRef
    }
    return iconRef
  }

  return (
    <motion.div
      ref={getRef()}
      className={`relative flex items-center justify-center rounded-full ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: `${color}20` }}
      animate={controls}
      style={
        animation === "magnetic" || animation === "extreme" || randomAnimation === "magnetic"
          ? {
              x: magneticPosition.x,
              y: magneticPosition.y,
              backgroundColor: `${color}20`,
            }
          : { backgroundColor: `${color}20` }
      }
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      {/* Icon content */}
      <motion.div className="relative z-10">{children}</motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.8 * intensityMultiplier : 0,
          scale: isHovered ? 1.2 * intensityMultiplier : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 0 ${20 * intensityMultiplier}px ${effectiveGlowColor}`,
        }}
      />

      {/* Particles effect */}
      {(animation === "particles" || animation === "extreme" || randomAnimation === "particles") && (
        <AnimatePresence>
          {isHovered && (
            <>
              {particles.current.map((particle, index) => (
                <motion.div
                  key={`particle-${index}`}
                  className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: particle.x * intensityMultiplier,
                    y: particle.y * intensityMultiplier,
                    scale: particle.scale,
                    opacity: [0, 0.8, 0],
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8 * intensityMultiplier,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    backgroundColor: color,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      )}

      {/* Pulse rings */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: [0.5 * intensityMultiplier, 0],
                scale: [1, 2 * intensityMultiplier],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                repeat: 1,
                repeatType: "loop",
                ease: "easeOut",
              }}
              style={{
                border: `2px solid ${color}`,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Neon effect */}
      {(animation === "neon" || animation === "extreme" || randomAnimation === "neon") && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${effectiveGlowColor}`,
          }}
        />
      )}
    </motion.div>
  )
}
