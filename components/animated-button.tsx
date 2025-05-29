"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  animation?: "scale" | "lift" | "glow" | "pulse" | "shine" | "full"
  color?: string
  glowColor?: string
  intensity?: "subtle" | "medium" | "strong"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function AnimatedButton({
  children,
  className = "",
  variant = "primary",
  animation = "full",
  color = "#9333EA",
  glowColor = "",
  intensity = "medium",
  onClick,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Effective glow color
  const effectiveGlowColor = glowColor || `${color}80`

  // Handle mouse movement for shine effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

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

  // Get animation properties based on animation type
  const getAnimationProps = () => {
    const baseProps = {
      whileHover: {},
      transition: { duration: 0.3 },
    }

    switch (animation) {
      case "scale":
        return {
          ...baseProps,
          whileHover: {
            scale: 1.05 * intensityMultiplier,
          },
        }
      case "lift":
        return {
          ...baseProps,
          whileHover: {
            y: -5 * intensityMultiplier,
            boxShadow: `0 ${10 * intensityMultiplier}px ${15 * intensityMultiplier}px -${5 * intensityMultiplier}px rgba(0, 0, 0, 0.2)`,
          },
        }
      case "glow":
        return {
          ...baseProps,
          whileHover: {
            boxShadow: `0 0 ${15 * intensityMultiplier}px ${effectiveGlowColor}`,
          },
        }
      case "pulse":
        return {
          ...baseProps,
          whileHover: {
            scale: [1, 1.05 * intensityMultiplier, 1],
            transition: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          },
        }
      case "shine":
        // Shine uses a separate overlay element
        return baseProps
      case "full":
      default:
        return {
          ...baseProps,
          whileHover: {
            scale: 1.05 * intensityMultiplier,
            boxShadow: `0 ${8 * intensityMultiplier}px ${15 * intensityMultiplier}px -${5 * intensityMultiplier}px rgba(0, 0, 0, 0.2), 0 0 ${15 * intensityMultiplier}px ${effectiveGlowColor}`,
          },
        }
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-medium ${getBaseStyles()} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...getAnimationProps()}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Shine effect overlay */}
      {(animation === "shine" || animation === "full") && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
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
      )}

      {/* Pulse glow effect */}
      {(animation === "pulse" || animation === "full") && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={
            isHovered
              ? {
                  opacity: [0, 0.2 * intensityMultiplier, 0],
                  scale: [0.8, 1.2, 0.8],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${effectiveGlowColor} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Mouse follow glow */}
      {(animation === "glow" || animation === "full") && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 * intensityMultiplier : 0 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${effectiveGlowColor} 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.button>
  )
}
