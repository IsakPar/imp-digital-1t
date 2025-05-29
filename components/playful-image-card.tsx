"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { bouncySpring, easings } from "@/lib/animation-utils"

interface PlayfulImageCardProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  animation?: "zoom" | "reveal" | "slide" | "tilt" | "flip" | "glitch" | "extreme" | "random"
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  children?: ReactNode
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "auto"
  onClick?: () => void
  priority?: boolean
}

export default function PlayfulImageCard({
  src,
  alt,
  className = "",
  imageClassName = "",
  animation = "zoom",
  overlay = true,
  overlayColor = "#000000",
  overlayOpacity = 0.5,
  intensity = "medium",
  children,
  aspectRatio = "video",
  onClick,
  priority = false,
}: PlayfulImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [randomAnimation, setRandomAnimation] = useState<string>("")
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const imageControls = useAnimation()
  const overlayControls = useAnimation()
  const contentControls = useAnimation()

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.7,
    medium: 1,
    strong: 1.5,
    extreme: 2.5,
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

  // Set random animation on mount
  useState(() => {
    if (animation === "random") {
      const animations = ["zoom", "reveal", "slide", "tilt", "flip", "glitch"]
      setRandomAnimation(animations[Math.floor(Math.random() * animations.length)])
    }
  })

  // Handle hover start
  const handleHoverStart = () => {
    setIsHovered(true)

    // Different animations based on animation type
    const currentAnimation = animation === "random" ? randomAnimation : animation

    // Card container animations
    switch (currentAnimation) {
      case "tilt":
        controls.start({
          rotateX: 10 * intensityMultiplier,
          rotateY: 10 * intensityMultiplier,
          scale: 1.05 * intensityMultiplier,
          transition: { duration: 0.3 },
        })
        break
      case "flip":
        controls.start({
          rotateY: 180 * intensityMultiplier,
          transition: { duration: 0.6, ease: easings.smooth },
        })
        break
      case "extreme":
        controls.start({
          scale: 1.1 * intensityMultiplier,
          y: -20 * intensityMultiplier,
          transition: bouncySpring,
        })
        break
      default:
        controls.start({
          scale: 1.03 * intensityMultiplier,
          y: -5 * intensityMultiplier,
          transition: { duration: 0.3 },
        })
    }

    // Image animations
    switch (currentAnimation) {
      case "zoom":
        imageControls.start({
          scale: 1.2 * intensityMultiplier,
          transition: { duration: 0.5 },
        })
        break
      case "slide":
        imageControls.start({
          y: -20 * intensityMultiplier,
          transition: { duration: 0.5 },
        })
        break
      case "glitch":
        imageControls.start({
          x: [0, -5 * intensityMultiplier, 5 * intensityMultiplier, 0],
          y: [0, 5 * intensityMultiplier, -5 * intensityMultiplier, 0],
          filter: ["blur(0px)", `blur(${2 * intensityMultiplier}px)`, "blur(0px)"],
          transition: { duration: 0.3, repeat: 2, repeatType: "reverse" },
        })
        break
      case "extreme":
        imageControls.start({
          scale: 1.3 * intensityMultiplier,
          rotate: 5 * intensityMultiplier,
          transition: { duration: 0.8, ease: easings.elastic },
        })
        break
    }

    // Overlay animations
    switch (currentAnimation) {
      case "reveal":
        overlayControls.start({
          opacity: overlayOpacity * intensityMultiplier,
          y: 0,
          transition: { duration: 0.5 },
        })
        break
      case "extreme":
        overlayControls.start({
          opacity: overlayOpacity * intensityMultiplier,
          transition: { duration: 0.3 },
        })
        break
      default:
        overlayControls.start({
          opacity: overlayOpacity * intensityMultiplier,
          transition: { duration: 0.3 },
        })
    }

    // Content animations
    switch (currentAnimation) {
      case "reveal":
        contentControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.1 },
        })
        break
      case "extreme":
        contentControls.start({
          opacity: 1,
          scale: 1.1 * intensityMultiplier,
          y: -10 * intensityMultiplier,
          transition: { duration: 0.5, delay: 0.1 },
        })
        break
      default:
        contentControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3, delay: 0.1 },
        })
    }
  }

  // Handle hover end
  const handleHoverEnd = () => {
    setIsHovered(false)

    controls.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: easings.smooth },
    })

    imageControls.start({
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: easings.smooth },
    })

    overlayControls.start({
      opacity: 0,
      y: animation === "reveal" || randomAnimation === "reveal" ? "100%" : 0,
      transition: { duration: 0.3 },
    })

    contentControls.start({
      opacity: 0,
      y: animation === "reveal" || randomAnimation === "reveal" ? 20 : 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${aspectRatioClasses[aspectRatio]} ${className}`}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : {}}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={imageControls}
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className={`object-cover transition-all duration-500 ${imageClassName}`}
          priority={priority}
        />
      </motion.div>

      {/* Flipped side for flip animation */}
      {(animation === "flip" || randomAnimation === "flip") && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center"
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-white text-center p-6">
            <h3 className="text-2xl font-bold mb-2">{alt}</h3>
            {children && <div className="mt-4">{children}</div>}
          </div>
        </motion.div>
      )}

      {/* Overlay */}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
          initial={{
            opacity: 0,
            y: animation === "reveal" || randomAnimation === "reveal" ? "100%" : 0,
          }}
          animate={overlayControls}
          style={{
            backgroundColor: overlayColor,
          }}
        />
      )}

      {/* Glitch effect */}
      {(animation === "glitch" || animation === "extreme" || randomAnimation === "glitch") && isHovered && (
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 z-0 opacity-50 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "hue-rotate(90deg)",
              mixBlendMode: "difference",
              transform: `translate(${5 * intensityMultiplier}px, ${-5 * intensityMultiplier}px)`,
            }}
          />
        </AnimatePresence>
      )}

      {/* Content */}
      {children && (
        <motion.div
          className="absolute inset-0 flex items-end p-6 z-10"
          initial={{
            opacity: 0,
            y: animation === "reveal" || randomAnimation === "reveal" ? 20 : 0,
            scale: 0.95,
          }}
          animate={contentControls}
        >
          {children}
        </motion.div>
      )}

      {/* Particles effect for extreme animation */}
      {animation === "extreme" && isHovered && (
        <AnimatePresence>
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: (Math.random() * 200 - 100) * intensityMultiplier,
                y: (Math.random() * 200 - 100) * intensityMultiplier,
                opacity: [0, 0.8, 0],
                scale: Math.random() * intensityMultiplier,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 1 * intensityMultiplier,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
              style={{
                top: "50%",
                left: "50%",
              }}
            />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
