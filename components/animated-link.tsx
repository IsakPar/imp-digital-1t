"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface AnimatedLinkProps {
  children: ReactNode
  href: string
  className?: string
  animation?: "underline" | "slide" | "arrow" | "color" | "full"
  color?: string
  intensity?: "subtle" | "medium" | "strong"
  external?: boolean
  onClick?: () => void
}

export default function AnimatedLink({
  children,
  href,
  className = "",
  animation = "full",
  color = "#9333EA",
  intensity = "medium",
  external = false,
  onClick,
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Get animation properties based on animation type
  const getAnimationProps = () => {
    const baseProps = {
      whileHover: {},
      transition: { duration: 0.3 },
    }

    switch (animation) {
      case "slide":
        return {
          ...baseProps,
          whileHover: {
            x: 5 * intensityMultiplier,
          },
        }
      case "color":
        // Color change is handled in the style
        return baseProps
      case "arrow":
        // Arrow animation is handled separately
        return baseProps
      case "underline":
        // Underline is handled separately
        return baseProps
      case "full":
      default:
        return {
          ...baseProps,
          whileHover: {
            x: 3 * intensityMultiplier,
          },
        }
    }
  }

  // Check if the children contain an arrow
  const hasArrow = typeof children === "string" && children.includes("→")

  // Wrap with Link if href is provided
  const content = (
    <motion.span
      className={`relative inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...getAnimationProps()}
      style={{
        color: isHovered && (animation === "color" || animation === "full") ? color : undefined,
      }}
    >
      {/* Content */}
      <span className="relative">
        {hasArrow ? children.replace("→", "") : children}

        {/* Underline effect */}
        {(animation === "underline" || animation === "full") && (
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
        )}
      </span>

      {/* Arrow animation */}
      {(hasArrow || animation === "arrow" || animation === "full") && (
        <motion.span
          animate={isHovered ? { x: 3 * intensityMultiplier } : { x: 0 }}
          transition={{
            duration: 0.3,
            repeat: animation === "arrow" || animation === "full" ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        >
          →
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
