"use client"

import type React from "react"
import { useState, useRef } from "react"
import { animated, useSpring, config } from "react-spring"
import { useTilt, animationPresets, useMagnetic } from "@/lib/hover-effects"

type AnimationStyle = "lift" | "tilt" | "bounce" | "expand" | "glow" | "shake" | "rotate" | "pulse" | "magnetic" | "3d"

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  animationStyle?: AnimationStyle
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  onClick?: () => void
  withBorder?: boolean
  withGlow?: boolean
  withParticles?: boolean
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = "",
  style,
  animationStyle = "lift",
  intensity = "strong",
  onClick,
  withBorder = false,
  withGlow = false,
  withParticles = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const tilt = useTilt(cardRef)
  const magnetic = useMagnetic(cardRef, 30)

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
    extreme: 2.5,
  }

  const intensityFactor = intensityMap[intensity]

  // Base animation properties
  let animationProps: any = {}

  if (animationStyle === "3d") {
    animationProps = {
      transform: isHovered
        ? `perspective(1000px) rotateX(${tilt.x * intensityFactor}deg) rotateY(${tilt.y * intensityFactor}deg) scale(${1 + 0.05 * intensityFactor})`
        : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      boxShadow: isHovered
        ? `0 ${10 * intensityFactor}px ${30 * intensityFactor}px rgba(0,0,0,0.2)`
        : "0 0 0 rgba(0,0,0,0)",
      zIndex: isHovered ? 10 : 1,
    }
  } else if (animationStyle === "magnetic") {
    animationProps = {
      transform: `translate(${magnetic.x * intensityFactor}px, ${magnetic.y * intensityFactor}px) scale(${isHovered ? 1 + 0.08 * intensityFactor : 1})`,
      boxShadow: isHovered
        ? `0 ${10 * intensityFactor}px ${30 * intensityFactor}px rgba(0,0,0,0.2)`
        : "0 0 0 rgba(0,0,0,0)",
      zIndex: isHovered ? 10 : 1,
    }
  } else {
    // Get preset values and apply intensity
    const preset = animationPresets[animationStyle] || animationPresets.lift

    // Apply intensity to preset values
    const scaledPreset = { ...preset }
    if (scaledPreset.scale) scaledPreset.scale = 1 + (scaledPreset.scale - 1) * intensityFactor
    if (scaledPreset.y) scaledPreset.y = scaledPreset.y * intensityFactor
    if (scaledPreset.x) scaledPreset.x = scaledPreset.x * intensityFactor
    if (scaledPreset.rotate) scaledPreset.rotate = scaledPreset.rotate * intensityFactor
    if (scaledPreset.rotateX) scaledPreset.rotateX = scaledPreset.rotateX * intensityFactor
    if (scaledPreset.rotateY) scaledPreset.rotateY = scaledPreset.rotateY * intensityFactor

    // Create animation properties
    animationProps = {
      transform: isHovered
        ? `${scaledPreset.rotateX ? `rotateX(${scaledPreset.rotateX}deg)` : ""} 
           ${scaledPreset.rotateY ? `rotateY(${scaledPreset.rotateY}deg)` : ""} 
           ${scaledPreset.rotate ? `rotate(${scaledPreset.rotate}deg)` : ""} 
           ${scaledPreset.scale ? `scale(${scaledPreset.scale})` : ""} 
           ${scaledPreset.y ? `translateY(${scaledPreset.y}px)` : ""} 
           ${scaledPreset.x ? `translateX(${scaledPreset.x}px)` : ""}`
        : "rotateX(0deg) rotateY(0deg) rotate(0deg) scale(1) translateY(0px) translateX(0px)",
      boxShadow: isHovered
        ? scaledPreset.shadow || `0 ${10 * intensityFactor}px ${30 * intensityFactor}px rgba(0,0,0,0.2)`
        : "0 0 0 rgba(0,0,0,0)",
      zIndex: isHovered ? 10 : 1,
    }
  }

  // Add glow effect if requested
  if (withGlow && isHovered) {
    animationProps.boxShadow = `0 0 ${20 * intensityFactor}px ${10 * intensityFactor}px rgba(66, 153, 225, 0.6), ${animationProps.boxShadow}`
  }

  // Add border effect if requested
  if (withBorder) {
    animationProps.border = isHovered ? "2px solid rgba(66, 153, 225, 0.8)" : "2px solid transparent"
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
      ref={cardRef}
      className={`transition-all duration-300 ${className}`}
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
      {children}

      {/* Particles effect */}
      {withParticles && isHovered && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-400 rounded-full opacity-70"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${isHovered ? 1 : 0})`,
                opacity: isHovered ? 0.7 : 0,
                transition: `all ${Math.random() * 1 + 0.5}s ease-out ${Math.random() * 0.2}s`,
                animation: isHovered ? `particleMove ${Math.random() * 1 + 1}s ease-out forwards` : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Overlay for glow effect */}
      {withGlow && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: isHovered
              ? "radial-gradient(circle at center, rgba(66, 153, 225, 0.15) 0%, rgba(66, 153, 225, 0) 70%)"
              : "none",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        />
      )}
    </animated.div>
  )
}

export default HoverCard
