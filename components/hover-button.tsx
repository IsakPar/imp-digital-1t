"use client"

import type React from "react"
import { useState, useRef } from "react"
import { animated, useSpring, config } from "react-spring"
import { useMagnetic } from "@/lib/hover-effects"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost"
type AnimationStyle = "lift" | "bounce" | "expand" | "glow" | "shake" | "pulse" | "magnetic"

interface HoverButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: ButtonVariant
  animationStyle?: AnimationStyle
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  withGlow?: boolean
  withRipple?: boolean
  disabled?: boolean
}

export const HoverButton: React.FC<HoverButtonProps> = ({
  children,
  className = "",
  onClick,
  variant = "primary",
  animationStyle = "bounce",
  intensity = "strong",
  withGlow = false,
  withRipple = false,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const magnetic = useMagnetic(buttonRef, 15)

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

  if (animationStyle === "magnetic" && !disabled) {
    animationProps = {
      transform: `translate(${magnetic.x * intensityFactor}px, ${magnetic.y * intensityFactor}px) scale(${isHovered ? 1 + 0.05 * intensityFactor : 1})`,
    }
  } else if (animationStyle === "lift" && !disabled) {
    animationProps = {
      transform: isHovered
        ? `translateY(${-5 * intensityFactor}px) scale(${1 + 0.05 * intensityFactor})`
        : "translateY(0px) scale(1)",
      boxShadow: isHovered
        ? `0 ${5 * intensityFactor}px ${15 * intensityFactor}px rgba(0,0,0,0.2)`
        : "0 0 0 rgba(0,0,0,0)",
    }
  } else if (animationStyle === "bounce" && !disabled) {
    animationProps = {
      transform: isHovered
        ? `translateY(${-8 * intensityFactor}px) scale(${1 + 0.05 * intensityFactor})`
        : "translateY(0px) scale(1)",
      config: { tension: 300, friction: 10 },
    }
  } else if (animationStyle === "expand" && !disabled) {
    animationProps = {
      transform: isHovered ? `scale(${1 + 0.1 * intensityFactor})` : "scale(1)",
    }
  } else if (animationStyle === "shake" && !disabled) {
    animationProps = {
      x: isHovered ? [0, -5, 5, -5, 5, 0].map((v) => v * intensityFactor) : 0,
      config: { tension: 500, friction: 10 },
    }
  } else if (animationStyle === "pulse" && !disabled) {
    animationProps = {
      transform: isHovered ? `scale(${1 + 0.08 * intensityFactor})` : "scale(1)",
      config: { tension: 300, friction: 8 },
    }
  } else if (animationStyle === "glow" && !disabled) {
    animationProps = {
      boxShadow: isHovered
        ? `0 0 ${15 * intensityFactor}px ${5 * intensityFactor}px rgba(66, 153, 225, 0.6)`
        : "0 0 0 rgba(0,0,0,0)",
      transform: isHovered ? `scale(${1 + 0.03 * intensityFactor})` : "scale(1)",
    }
  }

  // Add pressed state
  if (isPressed && !disabled) {
    animationProps.transform = "scale(0.95)"
  }

  // Create spring animation
  const springProps = useSpring({
    ...animationProps,
    config:
      animationStyle === "bounce" || animationStyle === "shake" || animationStyle === "pulse"
        ? { tension: 300, friction: 10 }
        : config.gentle,
  })

  // Handle ripple effect
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!withRipple || disabled) return

    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y }])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 1000)
  }

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white"
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800"
      case "outline":
        return "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-800"
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white"
    }
  }

  return (
    <animated.button
      ref={buttonRef}
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${getVariantClasses()} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      style={{
        ...springProps,
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        !disabled && setIsHovered(false)
        !disabled && setIsPressed(false)
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => !disabled && setIsPressed(false)}
      onClick={(e) => {
        handleRipple(e)
        if (!disabled && onClick) onClick()
      }}
      disabled={disabled}
    >
      {children}

      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white bg-opacity-30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "200%",
            height: "200%",
            marginLeft: "-100%",
            marginTop: "-100%",
            transform: "scale(0)",
            animation: "ripple 1s linear",
          }}
        />
      ))}

      {/* Glow overlay */}
      {withGlow && !disabled && (
        <span
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: isHovered
              ? "radial-gradient(circle at center, rgba(66, 153, 225, 0.4) 0%, rgba(66, 153, 225, 0) 70%)"
              : "none",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        />
      )}

      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </animated.button>
  )
}

export default HoverButton
