"use client"

import type React from "react"
import { useState, useRef } from "react"
import { animated, useSpring, config } from "react-spring"
import { useMagnetic } from "@/lib/hover-effects"

type AnimationStyle = "spin" | "bounce" | "expand" | "glow" | "shake" | "pulse" | "magnetic" | "flip"

interface HoverIconProps {
  icon: React.ReactNode
  className?: string
  onClick?: () => void
  animationStyle?: AnimationStyle
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  withGlow?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
}

export const HoverIcon: React.FC<HoverIconProps> = ({
  icon,
  className = "",
  onClick,
  animationStyle = "bounce",
  intensity = "strong",
  withGlow = false,
  size = "md",
  color = "text-blue-600",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const magnetic = useMagnetic(iconRef, 20)

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
    extreme: 2.5,
  }

  const intensityFactor = intensityMap[intensity]

  // Size classes
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  }

  // Base animation properties based on style
  let animationProps: any = {}

  if (animationStyle === "magnetic") {
    animationProps = {
      transform: `translate(${magnetic.x * intensityFactor}px, ${magnetic.y * intensityFactor}px) scale(${isHovered ? 1 + 0.1 * intensityFactor : 1})`,
    }
  } else if (animationStyle === "spin") {
    animationProps = {
      transform: isHovered
        ? `rotate(${360 * intensityFactor}deg) scale(${1 + 0.1 * intensityFactor})`
        : "rotate(0deg) scale(1)",
      config: { tension: 200, friction: 10 },
    }
  } else if (animationStyle === "bounce") {
    animationProps = {
      transform: isHovered
        ? `translateY(${-8 * intensityFactor}px) scale(${1 + 0.1 * intensityFactor})`
        : "translateY(0px) scale(1)",
      config: { tension: 300, friction: 10 },
    }
  } else if (animationStyle === "expand") {
    animationProps = {
      transform: isHovered ? `scale(${1 + 0.2 * intensityFactor})` : "scale(1)",
    }
  } else if (animationStyle === "shake") {
    animationProps = {
      x: isHovered ? [0, -5, 5, -5, 5, 0].map((v) => v * intensityFactor) : 0,
      config: { tension: 500, friction: 10 },
    }
  } else if (animationStyle === "pulse") {
    animationProps = {
      transform: isHovered ? `scale(${1 + 0.15 * intensityFactor})` : "scale(1)",
      config: { tension: 300, friction: 8 },
    }
  } else if (animationStyle === "glow") {
    animationProps = {
      boxShadow: isHovered
        ? `0 0 ${15 * intensityFactor}px ${5 * intensityFactor}px rgba(66, 153, 225, 0.6)`
        : "0 0 0 rgba(0,0,0,0)",
      transform: isHovered ? `scale(${1 + 0.1 * intensityFactor})` : "scale(1)",
    }
  } else if (animationStyle === "flip") {
    animationProps = {
      transform: isHovered
        ? `rotateY(${180 * intensityFactor}deg) scale(${1 + 0.1 * intensityFactor})`
        : "rotateY(0deg) scale(1)",
      config: { tension: 200, friction: 10 },
    }
  }

  // Create spring animation
  const springProps = useSpring({
    ...animationProps,
    config:
      animationStyle === "bounce" || animationStyle === "shake" || animationStyle === "pulse"
        ? { tension: 300, friction: 10 }
        : config.gentle,
  })

  return (
    <animated.div
      ref={iconRef}
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${color} cursor-pointer ${className}`}
      style={{
        ...springProps,
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {icon}

      {/* Glow overlay */}
      {withGlow && (
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: isHovered
              ? "radial-gradient(circle at center, rgba(66, 153, 225, 0.4) 0%, rgba(66, 153, 225, 0) 70%)"
              : "none",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        />
      )}
    </animated.div>
  )
}

export default HoverIcon
