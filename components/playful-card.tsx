"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { useMagneticEffect, generateRandomPoints, elasticSpring, bouncySpring, easings } from "@/lib/animation-utils"

interface PlayfulCardProps {
  children: ReactNode
  className?: string
  variant?: "bounce" | "wobble" | "elastic" | "magnetic" | "particles" | "glitch" | "neon" | "extreme" | "random"
  color?: string
  glowColor?: string
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  onClick?: () => void
  disabled?: boolean
}

export default function PlayfulCard({
  children,
  className = "",
  variant = "bounce",
  color = "#9333EA",
  glowColor = "",
  intensity = "medium",
  onClick,
  disabled = false,
}: PlayfulCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [randomVariant, setRandomVariant] = useState<string>("")
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [magneticRef, magneticPosition] = useMagneticEffect(3, 0.2, variant === "magnetic" || variant === "extreme")

  // For particle effects
  const particles = useRef(generateRandomPoints(12, 100))

  // For glitch effect
  const glitchInterval = useRef<NodeJS.Timeout | null>(null)
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })

  // For 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

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

  // Set random variant on mount
  useEffect(() => {
    if (variant === "random") {
      const variants = ["bounce", "wobble", "elastic", "magnetic", "particles", "glitch", "neon"]
      setRandomVariant(variants[Math.floor(Math.random() * variants.length)])
    }
  }, [variant])

  // Handle glitch effect
  useEffect(() => {
    if ((variant === "glitch" || variant === "extreme" || randomVariant === "glitch") && isHovered) {
      glitchInterval.current = setInterval(() => {
        setGlitchOffset({
          x: (Math.random() - 0.5) * 10 * intensityMultiplier,
          y: (Math.random() - 0.5) * 10 * intensityMultiplier,
        })
      }, 100)
    }

    return () => {
      if (glitchInterval.current) {
        clearInterval(glitchInterval.current)
      }
    }
  }, [isHovered, variant, randomVariant, intensityMultiplier])

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || disabled) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15 * intensityMultiplier, -15 * intensityMultiplier])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15 * intensityMultiplier, 15 * intensityMultiplier])

  // Handle hover start
  const handleHoverStart = () => {
    setIsHovered(true)

    // Different animations based on variant
    switch (variant === "random" ? randomVariant : variant) {
      case "bounce":
        controls.start({
          scale: 1.1 * intensityMultiplier,
          y: -20 * intensityMultiplier,
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
          transition: { duration: 0.3 },
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
          transition: { duration: 0.8, ease: easings.wobble },
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
      transition: { duration: 0.5, ease: easings.smooth },
    })
  }

  // Get the ref to use based on variant
  const getRef = () => {
    if (variant === "magnetic" || variant === "extreme" || randomVariant === "magnetic") {
      return magneticRef
    }
    return cardRef
  }

  return (
    <motion.div
      ref={getRef()}
      className={`relative overflow-hidden ${className}`}
      animate={controls}
      style={
        variant === "magnetic" || variant === "extreme" || randomVariant === "magnetic"
          ? { x: magneticPosition.x, y: magneticPosition.y }
          : {}
      }
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onMouseMove={handleMouseMove}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {/* Main content with 3D effect */}
      <motion.div
        className="relative z-10"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
      >
        {children}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.8 * intensityMultiplier : 0,
          scale: isHovered ? 1.1 * intensityMultiplier : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 0 ${30 * intensityMultiplier}px ${effectiveGlowColor}`,
          borderRadius: "inherit",
        }}
      />

      {/* Particles effect */}
      {(variant === "particles" || variant === "extreme" || randomVariant === "particles") && (
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
                    backgroundColor: color,
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
                    duration: 1 * intensityMultiplier,
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

      {/* Glitch effect */}
      {(variant === "glitch" || variant === "extreme" || randomVariant === "glitch") && isHovered && (
        <>
          <motion.div
            className="absolute inset-0 z-0 opacity-70 pointer-events-none"
            style={{
              backgroundColor: color,
              transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
              mixBlendMode: "difference",
              filter: "blur(1px)",
            }}
          />
          <motion.div
            className="absolute inset-0 z-0 opacity-70 pointer-events-none"
            style={{
              backgroundColor: effectiveGlowColor,
              transform: `translate(${-glitchOffset.x}px, ${-glitchOffset.y}px)`,
              mixBlendMode: "difference",
              filter: "blur(1px)",
            }}
          />
        </>
      )}

      {/* Neon effect */}
      {(variant === "neon" || variant === "extreme" || randomVariant === "neon") && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${effectiveGlowColor}`,
            borderRadius: "inherit",
          }}
        />
      )}
    </motion.div>
  )
}
