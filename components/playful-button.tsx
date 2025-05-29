"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useMagneticEffect, elasticSpring, bouncySpring, easings } from "@/lib/animation-utils"

interface PlayfulButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  animation?: "bounce" | "wobble" | "elastic" | "magnetic" | "particles" | "glitch" | "neon" | "extreme" | "random"
  color?: string
  glowColor?: string
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function PlayfulButton({
  children,
  className = "",
  variant = "primary",
  animation = "bounce",
  color = "#9333EA",
  glowColor = "",
  intensity = "medium",
  onClick,
  disabled = false,
  type = "button",
}: PlayfulButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [randomAnimation, setRandomAnimation] = useState<string>("")
  const buttonRef = useRef<HTMLButtonElement>(null)
  const controls = useAnimation()
  const [magneticRef, magneticPosition] = useMagneticEffect(5, 0.2, animation === "magnetic" || animation === "extreme")

  // For particle effects
  const particles = useRef(
    Array.from({ length: 10 }, () => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 0.3,
    })),
  )

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

  // Get base styles based on variant
  const getBaseStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
      case "secondary":
        return "bg-white/10 backdrop-blur-md border border-white/20 text-white"
      case "outline":
        return "bg-transparent border-2 border-white/20 text-white"
      case "ghost":
        return "bg-transparent text-white hover:bg-white/10"
      default:
        return "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
    }
  }

  // Handle hover start
  const handleHoverStart = () => {
    setIsHovered(true)

    // Different animations based on animation type
    switch (animation === "random" ? randomAnimation : animation) {
      case "bounce":
        controls.start({
          scale: 1.1 * intensityMultiplier,
          y: -10 * intensityMultiplier,
          transition: bouncySpring,
        })
        break
      case "wobble":
        controls.start({
          rotate: [0, -5 * intensityMultiplier, 5 * intensityMultiplier, -3 * intensityMultiplier, 0],
          scale: 1.05 * intensityMultiplier,
          transition: { duration: 0.8, ease: easings.wobble },
        })
        break
      case "elastic":
        controls.start({
          scale: 1.15 * intensityMultiplier,
          transition: elasticSpring,
        })
        break
      case "magnetic":
        // Handled by useMagneticEffect
        controls.start({
          scale: 1.05 * intensityMultiplier,
          transition: { duration: 0.3 },
        })
        break
      case "particles":
        controls.start({
          scale: 1.05 * intensityMultiplier,
          transition: { duration: 0.3 },
        })
        break
      case "glitch":
        controls.start({
          scale: 1.05 * intensityMultiplier,
          x: [0, -3 * intensityMultiplier, 3 * intensityMultiplier, 0],
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
          rotate: [0, -7 * intensityMultiplier, 7 * intensityMultiplier, -5 * intensityMultiplier, 0],
          transition: { duration: 0.8, ease: easings.wobble, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
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
    return buttonRef
  }

  return (
    <motion.button
      ref={getRef()}
      type={type}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-medium ${getBaseStyles()} ${className}`}
      animate={controls}
      style={
        animation === "magnetic" || animation === "extreme" || randomAnimation === "magnetic"
          ? { x: magneticPosition.x, y: magneticPosition.y }
          : {}
      }
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.9 }}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.8 * intensityMultiplier : 0,
          scale: isHovered ? 1.1 * intensityMultiplier : 1,
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
                  className="absolute w-2 h-2 rounded-full pointer-events-none"
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

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute w-20 h-full bg-white/20 transform -skew-x-20 pointer-events-none"
          initial={{ left: "-100%" }}
          animate={isHovered ? { left: "200%" } : { left: "-100%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ top: 0 }}
        />
      </motion.div>

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

      {/* Glitch effect */}
      {(animation === "glitch" || animation === "extreme" || randomAnimation === "glitch") && isHovered && (
        <>
          <motion.div
            className="absolute inset-0 z-0 opacity-70 pointer-events-none rounded-full"
            animate={{
              x: [0, -5 * intensityMultiplier, 5 * intensityMultiplier, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: 2,
              repeatType: "mirror",
            }}
            style={{
              backgroundColor: color,
              mixBlendMode: "difference",
              filter: "blur(1px)",
            }}
          />
        </>
      )}
    </motion.button>
  )
}
