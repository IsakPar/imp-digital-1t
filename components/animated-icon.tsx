"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedIconProps {
  children: ReactNode
  className?: string
  animation?: "rotate" | "pulse" | "bounce" | "glow" | "scale" | "full"
  color?: string
  glowColor?: string
  intensity?: "subtle" | "medium" | "strong"
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export default function AnimatedIcon({
  children,
  className = "",
  animation = "full",
  color = "#9333EA",
  glowColor = "",
  intensity = "medium",
  onClick,
  size = "md",
}: AnimatedIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  // Effective glow color
  const effectiveGlowColor = glowColor || `${color}80`

  // Get animation properties based on animation type
  const getAnimationProps = () => {
    const baseProps = {
      whileHover: {},
      transition: { duration: 0.3 },
    }

    switch (animation) {
      case "rotate":
        return {
          ...baseProps,
          whileHover: {
            rotate: 360 * intensityMultiplier,
            transition: { duration: 0.7 * intensityMultiplier },
          },
        }
      case "pulse":
        return {
          ...baseProps,
          whileHover: {
            scale: [1, 1.2 * intensityMultiplier, 1],
            transition: {
              duration: 1.5 * intensityMultiplier,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          },
        }
      case "bounce":
        return {
          ...baseProps,
          whileHover: {
            y: [0, -10 * intensityMultiplier, 0],
            transition: {
              duration: 0.6 * intensityMultiplier,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          },
        }
      case "glow":
        // Glow is handled separately
        return {
          ...baseProps,
          whileHover: {
            scale: 1.1 * intensityMultiplier,
          },
        }
      case "scale":
        return {
          ...baseProps,
          whileHover: {
            scale: 1.2 * intensityMultiplier,
          },
        }
      case "full":
      default:
        return {
          ...baseProps,
          whileHover: {
            scale: 1.15 * intensityMultiplier,
            rotate: 10 * intensityMultiplier,
          },
        }
    }
  }

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: `${color}20` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...getAnimationProps()}
      whileTap={{ scale: 0.9 }}
    >
      {/* Icon content */}
      <motion.div className="relative z-10">{children}</motion.div>

      {/* Glow effect */}
      {(animation === "glow" || animation === "full") && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 0.8 * intensityMultiplier : 0,
            scale: isHovered ? 1.2 * intensityMultiplier : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `0 0 ${15 * intensityMultiplier}px ${effectiveGlowColor}`,
            background: `radial-gradient(circle, ${effectiveGlowColor} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Pulse rings */}
      {(animation === "pulse" || animation === "full") && isHovered && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.5 * intensityMultiplier, 0],
              scale: [1, 1.5 * intensityMultiplier],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
            style={{
              border: `2px solid ${color}`,
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.5 * intensityMultiplier, 0],
              scale: [1, 1.8 * intensityMultiplier],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
              delay: 0.3,
            }}
            style={{
              border: `2px solid ${color}`,
            }}
          />
        </>
      )}
    </motion.div>
  )
}
