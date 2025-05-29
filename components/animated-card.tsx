"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  variant?: "lift" | "tilt" | "glow" | "border" | "scale" | "rotate" | "full"
  intensity?: "subtle" | "medium" | "strong"
  color?: string
  glowColor?: string
  borderColor?: string
  hoverScale?: number
  depth?: number
  onClick?: () => void
  disabled?: boolean
}

export default function AnimatedCard({
  children,
  className = "",
  variant = "full",
  intensity = "medium",
  color = "#9333EA",
  glowColor = "",
  borderColor = "",
  hoverScale = 1.05,
  depth = 20,
  onClick,
  disabled = false,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // For 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Calculate rotation based on intensity
  const maxRotation = 10 * intensityMultiplier

  // Spring configs for smoother animations
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }

  // Transform mouse position to rotation values
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxRotation, -maxRotation]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxRotation, maxRotation]), springConfig)

  // Scale spring for smoother scaling
  const scaleSpring = useSpring(isHovered ? hoverScale : 1, springConfig)

  // Effective glow color
  const effectiveGlowColor = glowColor || `${color}80`
  const effectiveBorderColor = borderColor || color

  // Handle mouse movement for tilt effect
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

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  // Get animation properties based on variant
  const getAnimationProps = () => {
    const baseProps = {
      whileHover: { scale: 1 },
      transition: { duration: 0.3 },
    }

    switch (variant) {
      case "lift":
        return {
          ...baseProps,
          whileHover: {
            y: -10 * intensityMultiplier,
            scale: hoverScale,
            boxShadow: `0 ${20 * intensityMultiplier}px ${30 * intensityMultiplier}px -${10 * intensityMultiplier}px rgba(0, 0, 0, 0.2)`,
          },
        }
      case "scale":
        return {
          ...baseProps,
          whileHover: {
            scale: hoverScale,
            boxShadow: `0 ${10 * intensityMultiplier}px ${20 * intensityMultiplier}px -${5 * intensityMultiplier}px rgba(0, 0, 0, 0.15)`,
          },
        }
      case "glow":
        return {
          ...baseProps,
          whileHover: {
            boxShadow: `0 0 ${20 * intensityMultiplier}px ${effectiveGlowColor}`,
            scale: hoverScale * 0.98,
          },
        }
      case "border":
        return {
          ...baseProps,
          whileHover: {
            boxShadow: `0 0 0 2px ${effectiveBorderColor}`,
            scale: hoverScale * 0.98,
          },
        }
      case "rotate":
        return {
          ...baseProps,
          whileHover: {
            rotate: 3 * intensityMultiplier,
            scale: hoverScale,
          },
        }
      case "tilt":
        // Tilt uses the 3D transform logic in the render
        return {
          ...baseProps,
          whileHover: { scale: 1 },
        }
      case "full":
      default:
        // Full combines multiple effects and uses the 3D transform
        return {
          ...baseProps,
          whileHover: { scale: 1 },
        }
    }
  }

  // Get the style for the card based on variant
  const getCardStyle = () => {
    const baseStyle: any = {
      cursor: disabled ? "default" : "pointer",
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
    }

    if (variant === "tilt" || variant === "full") {
      return {
        ...baseStyle,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: variant === "full" ? scaleSpring : 1,
        boxShadow:
          isHovered && variant === "full"
            ? `0 ${10 * intensityMultiplier}px ${20 * intensityMultiplier}px -${5 * intensityMultiplier}px rgba(0, 0, 0, 0.15), 0 0 ${15 * intensityMultiplier}px ${effectiveGlowColor}`
            : "none",
      }
    }

    return baseStyle
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={disabled ? undefined : onClick}
      style={getCardStyle()}
      {...getAnimationProps()}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {/* Inner content with 3D effect */}
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform:
            isHovered && (variant === "tilt" || variant === "full")
              ? `perspective(1000px) translateZ(${depth * intensityMultiplier}px)`
              : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Glow overlay */}
      {(variant === "glow" || variant === "full") && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.15 * intensityMultiplier : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, ${effectiveGlowColor} 0%, transparent 70%)`,
            borderRadius: "inherit",
          }}
        />
      )}

      {/* Border effect */}
      {(variant === "border" || variant === "full") && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `inset 0 0 0 2px ${effectiveBorderColor}`,
            borderRadius: "inherit",
          }}
        />
      )}
    </motion.div>
  )
}
