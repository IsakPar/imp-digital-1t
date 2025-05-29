"use client"

import type React from "react"
import { useState, useRef } from "react"
import { animated, useSpring, config } from "react-spring"
import { useTilt } from "@/lib/hover-effects"
import Image from "next/image"

type AnimationStyle = "3d-tilt" | "zoom" | "reveal" | "glow" | "float" | "parallax"

interface HoverImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
  animationStyle?: AnimationStyle
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  onClick?: () => void
  withBorder?: boolean
  withGlow?: boolean
  withOverlay?: boolean
  overlayContent?: React.ReactNode
}

export const HoverImage: React.FC<HoverImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  style,
  animationStyle = "3d-tilt",
  intensity = "strong",
  onClick,
  withBorder = false,
  withGlow = false,
  withOverlay = false,
  overlayContent,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const tilt = useTilt(imageRef)

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
    extreme: 2.5,
  }

  const intensityFactor = intensityMap[intensity]

  // Base animation properties based on style
  let animationProps: any = {}
  let innerImageProps: any = {}

  if (animationStyle === "3d-tilt") {
    animationProps = {
      transform: isHovered
        ? `perspective(1000px) rotateX(${tilt.x * intensityFactor}deg) rotateY(${tilt.y * intensityFactor}deg) scale(${1 + 0.05 * intensityFactor})`
        : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      boxShadow: isHovered
        ? `0 ${10 * intensityFactor}px ${30 * intensityFactor}px rgba(0,0,0,0.3)`
        : "0 0 0 rgba(0,0,0,0)",
    }
  } else if (animationStyle === "zoom") {
    innerImageProps = {
      transform: isHovered ? `scale(${1 + 0.15 * intensityFactor})` : "scale(1)",
    }
    animationProps = {
      boxShadow: isHovered
        ? `0 ${10 * intensityFactor}px ${30 * intensityFactor}px rgba(0,0,0,0.3)`
        : "0 0 0 rgba(0,0,0,0)",
    }
  } else if (animationStyle === "reveal") {
    animationProps = {
      transform: isHovered ? `translateY(${-5 * intensityFactor}px)` : "translateY(0px)",
      boxShadow: isHovered
        ? `0 ${10 * intensityFactor}px ${30 * intensityFactor}px rgba(0,0,0,0.3)`
        : "0 0 0 rgba(0,0,0,0)",
    }
  } else if (animationStyle === "glow") {
    animationProps = {
      boxShadow: isHovered
        ? `0 0 ${20 * intensityFactor}px ${10 * intensityFactor}px rgba(66, 153, 225, 0.6)`
        : "0 0 0 rgba(0,0,0,0)",
      transform: isHovered ? `scale(${1 + 0.05 * intensityFactor})` : "scale(1)",
    }
  } else if (animationStyle === "float") {
    animationProps = {
      transform: isHovered
        ? `translateY(${-15 * intensityFactor}px) scale(${1 + 0.05 * intensityFactor})`
        : "translateY(0px) scale(1)",
      boxShadow: isHovered
        ? `0 ${20 * intensityFactor}px ${40 * intensityFactor}px rgba(0,0,0,0.2)`
        : "0 0 0 rgba(0,0,0,0)",
    }
  } else if (animationStyle === "parallax") {
    animationProps = {
      transform: isHovered ? `scale(${1 + 0.05 * intensityFactor})` : "scale(1)",
      boxShadow: isHovered
        ? `0 ${10 * intensityFactor}px ${30 * intensityFactor}px rgba(0,0,0,0.3)`
        : "0 0 0 rgba(0,0,0,0)",
    }
    innerImageProps = {
      transform: isHovered
        ? `translateX(${tilt.y * -3 * intensityFactor}px) translateY(${tilt.x * -3 * intensityFactor}px) scale(1.1)`
        : "translateX(0px) translateY(0px) scale(1.05)",
    }
  }

  // Add border effect if requested
  if (withBorder) {
    animationProps.border = isHovered ? "3px solid rgba(66, 153, 225, 0.8)" : "3px solid transparent"
  }

  // Create spring animations
  const springProps = useSpring({
    ...animationProps,
    config: config.gentle,
  })

  const innerSpringProps = useSpring({
    ...innerImageProps,
    config: config.gentle,
  })

  // Overlay animation
  const overlaySpringProps = useSpring({
    opacity: isHovered && withOverlay ? 1 : 0,
    transform: isHovered && withOverlay ? "translateY(0%)" : "translateY(100%)",
    config: { tension: 280, friction: 20 },
  })

  return (
    <animated.div
      ref={imageRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{
        ...style,
        ...springProps,
        willChange: "transform, box-shadow, border",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <animated.div
        className="w-full h-full overflow-hidden"
        style={{
          ...innerSpringProps,
          willChange: "transform",
          transition: "transform 0.3s ease-out",
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      </animated.div>

      {/* Overlay content */}
      {withOverlay && (
        <animated.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-end p-4"
          style={overlaySpringProps}
        >
          {overlayContent}
        </animated.div>
      )}

      {/* Glow overlay */}
      {withGlow && (
        <animated.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? "radial-gradient(circle at center, rgba(66, 153, 225, 0.3) 0%, rgba(66, 153, 225, 0) 70%)"
              : "none",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease-out",
            mixBlendMode: "screen",
          }}
        />
      )}
    </animated.div>
  )
}

export default HoverImage
