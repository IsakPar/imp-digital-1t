"use client"

import type React from "react"
import { useState, useRef } from "react"
import { animated, useSpring, config } from "react-spring"
import Link from "next/link"

type AnimationStyle = "underline" | "expand" | "glow" | "shift" | "color" | "bounce"

interface HoverLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  animationStyle?: AnimationStyle
  intensity?: "subtle" | "medium" | "strong" | "extreme"
  withGlow?: boolean
  external?: boolean
  color?: string
  hoverColor?: string
}

export const HoverLink: React.FC<HoverLinkProps> = ({
  href,
  children,
  className = "",
  animationStyle = "underline",
  intensity = "strong",
  withGlow = false,
  external = false,
  color = "text-blue-600",
  hoverColor = "text-blue-800",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)

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

  if (animationStyle === "underline") {
    animationProps = {
      textDecoration: "none",
      backgroundSize: isHovered ? "100% 2px" : "0% 2px",
      backgroundPosition: "0 100%",
      backgroundRepeat: "no-repeat",
      backgroundImage: `linear-gradient(to right, currentColor, currentColor)`,
      transition: "background-size 0.3s ease-in-out",
      paddingBottom: "2px",
    }
  } else if (animationStyle === "expand") {
    animationProps = {
      transform: isHovered ? `scale(${1 + 0.1 * intensityFactor})` : "scale(1)",
    }
  } else if (animationStyle === "glow") {
    animationProps = {
      textShadow: isHovered ? `0 0 ${8 * intensityFactor}px rgba(66, 153, 225, 0.8)` : "0 0 0 rgba(0,0,0,0)",
    }
  } else if (animationStyle === "shift") {
    animationProps = {
      transform: isHovered
        ? `translateY(${-3 * intensityFactor}px) translateX(${3 * intensityFactor}px)`
        : "translateY(0px) translateX(0px)",
    }
  } else if (animationStyle === "color") {
    // This is handled with CSS classes
  } else if (animationStyle === "bounce") {
    animationProps = {
      transform: isHovered ? `translateY(${-5 * intensityFactor}px)` : "translateY(0px)",
      config: { tension: 300, friction: 10 },
    }
  }

  // Create spring animation
  const springProps = useSpring({
    ...animationProps,
    config: animationStyle === "bounce" ? { tension: 300, friction: 10 } : config.gentle,
  })

  // Determine color classes
  const colorClass = isHovered && animationStyle === "color" ? hoverColor : color

  const LinkComponent = external ? "a" : Link
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <animated.span
      style={{
        display: "inline-block",
        position: "relative",
        ...springProps,
        willChange: "transform, text-shadow, background-size",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LinkComponent
        href={href}
        className={`relative inline-block transition-colors duration-300 ${colorClass} ${className}`}
        {...externalProps}
        ref={linkRef}
      >
        {children}

        {/* Glow overlay */}
        {withGlow && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isHovered
                ? "radial-gradient(circle at center, rgba(66, 153, 225, 0.4) 0%, rgba(66, 153, 225, 0) 70%)"
                : "none",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease-out",
            }}
          />
        )}
      </LinkComponent>
    </animated.span>
  )
}

export default HoverLink
