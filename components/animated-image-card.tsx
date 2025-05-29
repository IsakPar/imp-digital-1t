"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface AnimatedImageCardProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  animation?: "zoom" | "reveal" | "slide" | "tilt" | "full"
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  intensity?: "subtle" | "medium" | "strong"
  children?: ReactNode
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "auto"
  onClick?: () => void
  priority?: boolean
}

export default function AnimatedImageCard({
  src,
  alt,
  className = "",
  imageClassName = "",
  animation = "full",
  overlay = true,
  overlayColor = "#000000",
  overlayOpacity = 0.5,
  intensity = "medium",
  children,
  aspectRatio = "video",
  onClick,
  priority = false,
}: AnimatedImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
    auto: "",
  }

  // Get animation properties for the container
  const getContainerAnimationProps = () => {
    const baseProps = {
      whileHover: {},
      transition: { duration: 0.3 },
    }

    switch (animation) {
      case "tilt":
        return {
          ...baseProps,
          whileHover: {
            rotateX: 5 * intensityMultiplier,
            rotateY: 5 * intensityMultiplier,
            scale: 1.05 * intensityMultiplier,
          },
        }
      case "reveal":
      case "slide":
      case "zoom":
        // These are handled on the image itself
        return baseProps
      case "full":
      default:
        return {
          ...baseProps,
          whileHover: {
            scale: 1.03 * intensityMultiplier,
            y: -5 * intensityMultiplier,
          },
        }
    }
  }

  // Get animation properties for the image
  const getImageAnimationProps = () => {
    const baseProps = {
      initial: {},
      animate: {},
      transition: { duration: 0.5 },
    }

    switch (animation) {
      case "zoom":
        return {
          ...baseProps,
          animate: {
            scale: isHovered ? 1.1 * intensityMultiplier : 1,
          },
        }
      case "slide":
        return {
          ...baseProps,
          animate: {
            y: isHovered ? -10 * intensityMultiplier : 0,
          },
        }
      case "reveal":
        // Reveal is handled with the overlay
        return baseProps
      case "tilt":
        // Tilt is handled on the container
        return baseProps
      case "full":
      default:
        return {
          ...baseProps,
          animate: {
            scale: isHovered ? 1.08 * intensityMultiplier : 1,
          },
        }
    }
  }

  // Get animation properties for the overlay
  const getOverlayAnimationProps = () => {
    const baseProps = {
      initial: { opacity: 0 },
      animate: { opacity: isHovered ? overlayOpacity * intensityMultiplier : 0 },
      transition: { duration: 0.3 },
    }

    switch (animation) {
      case "reveal":
        return {
          ...baseProps,
          initial: { opacity: overlayOpacity, y: "100%" },
          animate: {
            opacity: overlayOpacity * intensityMultiplier,
            y: isHovered ? 0 : "100%",
          },
        }
      case "slide":
      case "zoom":
      case "tilt":
        return baseProps
      case "full":
      default:
        return {
          ...baseProps,
          initial: { opacity: 0 },
          animate: {
            opacity: isHovered ? overlayOpacity * intensityMultiplier : 0,
          },
        }
    }
  }

  // Get animation properties for the content
  const getContentAnimationProps = () => {
    const baseProps = {
      initial: { opacity: 0 },
      animate: { opacity: isHovered ? 1 : 0 },
      transition: { duration: 0.3, delay: 0.1 },
    }

    switch (animation) {
      case "reveal":
        return {
          ...baseProps,
          initial: { opacity: 0, y: 20 },
          animate: {
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          },
        }
      case "slide":
        return {
          ...baseProps,
          initial: { opacity: 0, y: 10 },
          animate: {
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          },
        }
      case "zoom":
      case "tilt":
        return baseProps
      case "full":
      default:
        return {
          ...baseProps,
          initial: { opacity: 0, scale: 0.95 },
          animate: {
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95,
          },
        }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${aspectRatioClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...getContainerAnimationProps()}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {/* Image */}
      <motion.div className="absolute inset-0" {...getImageAnimationProps()}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className={`object-cover transition-all duration-500 ${imageClassName}`}
          priority={priority}
        />
      </motion.div>

      {/* Overlay */}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
          {...getOverlayAnimationProps()}
          style={{
            backgroundColor: overlayColor,
          }}
        />
      )}

      {/* Content */}
      {children && (
        <motion.div className="absolute inset-0 flex items-end p-6 z-10" {...getContentAnimationProps()}>
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
