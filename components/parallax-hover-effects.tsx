"use client"

import type React from "react"

import { useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface ParallaxLayerProps {
  children: ReactNode
  depth?: number
  className?: string
}

export function ParallaxLayer({ children, depth = 1, className = "" }: ParallaxLayerProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translateZ(${depth * 10}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

interface MultiLayerParallaxCardProps {
  children: ReactNode
  className?: string
  layers?: ReactNode[]
  maxRotation?: number
  perspective?: number
  springConfig?: {
    stiffness?: number
    damping?: number
  }
}

export function MultiLayerParallaxCard({
  children,
  className = "",
  layers = [],
  maxRotation = 15,
  perspective = 1000,
  springConfig = { stiffness: 100, damping: 30 },
}: MultiLayerParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxRotation, -maxRotation]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxRotation, maxRotation]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Render parallax layers */}
        {layers.map((layer, index) => (
          <ParallaxLayer key={index} depth={index + 1}>
            {layer}
          </ParallaxLayer>
        ))}

        {/* Main content */}
        <div className="relative z-10">{children}</div>

        {/* Shadow effect */}
        <motion.div
          className="absolute inset-0 bg-black/20 rounded-2xl blur-xl"
          style={{
            transform: "translateZ(-20px) translateY(20px)",
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

interface FloatingElementProps {
  children: ReactNode
  depth?: number
  floatRange?: number
  duration?: number
  delay?: number
  className?: string
}

export function FloatingElement({
  children,
  depth = 1,
  floatRange = 20,
  duration = 3,
  delay = 0,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [-floatRange * depth, floatRange * depth, -floatRange * depth],
        x: [-floatRange * 0.5 * depth, floatRange * 0.5 * depth, -floatRange * 0.5 * depth],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{
        transform: `translateZ(${depth * 20}px)`,
      }}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxTextProps {
  text: string
  className?: string
  layers?: number
  maxOffset?: number
  colorShift?: boolean
}

export function ParallaxText({
  text,
  className = "",
  layers = 3,
  maxOffset = 10,
  colorShift = true,
}: ParallaxTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colors = ["#9333EA", "#EC4899", "#06B6D4", "#10B981"]

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {Array.from({ length: layers }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute inset-0"
          style={{
            color: colorShift ? colors[index % colors.length] : undefined,
            opacity: 1 - index * 0.3,
            mixBlendMode: colorShift ? "screen" : "normal",
          }}
          animate={{
            x: isHovered ? index * maxOffset : 0,
            y: isHovered ? index * maxOffset * 0.5 : 0,
            z: index * 10,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {text}
        </motion.span>
      ))}
      <span className="relative z-10 opacity-0">{text}</span>
    </motion.div>
  )
}

interface ParallaxImageStackProps {
  images: string[]
  className?: string
  maxRotation?: number
  spacing?: number
}

export function ParallaxImageStack({
  images,
  className = "",
  maxRotation = 15,
  spacing = 20,
}: ParallaxImageStackProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const rotateXValues: { [key: number]: any } = {}
  const rotateYValues: { [key: number]: any } = {}

  const getRotateX = (depth: number) => {
    if (rotateXValues[depth]) {
      return rotateXValues[depth]
    }
    rotateXValues[depth] = useTransform(mouseY, [-0.5, 0.5], [maxRotation * depth * 0.5, -maxRotation * depth * 0.5])
    return rotateXValues[depth]
  }

  const getRotateY = (depth: number) => {
    if (rotateYValues[depth]) {
      return rotateYValues[depth]
    }
    rotateYValues[depth] = useTransform(mouseX, [-0.5, 0.5], [-maxRotation * depth * 0.5, maxRotation * depth * 0.5])
    return rotateYValues[depth]
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
        setIsHovered(false)
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {images.map((image, index) => {
        const depth = index + 1
        const rotateX = getRotateX(depth)
        const rotateY = getRotateY(depth)
        const translateZ = isHovered ? depth * spacing : 0

        return (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              rotateX,
              rotateY,
              translateZ,
              transformStyle: "preserve-3d",
            }}
            animate={{
              scale: isHovered ? 1 + index * 0.02 : 1,
              opacity: isHovered ? 1 - index * 0.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover rounded-2xl" />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

interface ParallaxIconProps {
  icon: ReactNode
  className?: string
  layers?: number
  maxOffset?: number
  glowColor?: string
}

export function ParallaxIcon({
  icon,
  className = "",
  layers = 3,
  maxOffset = 5,
  glowColor = "#9333EA",
}: ParallaxIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow layers */}
      {Array.from({ length: layers }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${glowColor}${Math.floor((1 - index * 0.3) * 255)
              .toString(16)
              .padStart(2, "0")} 0%, transparent 70%)`,
            filter: `blur(${index * 4}px)`,
          }}
          animate={{
            scale: isHovered ? 1 + index * 0.3 : 1,
            opacity: isHovered ? 1 - index * 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}

      {/* Icon layers */}
      {Array.from({ length: layers }).map((_, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            x: isHovered ? index * maxOffset : 0,
            y: isHovered ? index * maxOffset * 0.5 : 0,
            z: index * 10,
            opacity: 1 - index * 0.3,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Base icon (invisible, for layout) */}
      <div className="opacity-0">{icon}</div>
    </motion.div>
  )
}
