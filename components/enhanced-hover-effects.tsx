"use client"

import { motion } from "framer-motion"
import type { ReactNode, MouseEvent, KeyboardEvent } from "react" // Added MouseEvent, KeyboardEvent

interface EnhancedButtonProps {
  children: ReactNode
  className?: string
  onClick?: (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void // Updated event type
  color?: string
  glowColor?: string
  variant?: "primary" | "secondary" | "outline"
  // animation and intensity props are not used by this EnhancedButton's internal logic
  // but are kept if they are intended for future use or a different component
  animation?: string
  intensity?: "subtle" | "medium" | "strong"
}

export function EnhancedButton({
  children,
  className = "",
  onClick, // This onClick is crucial, it comes from the <Link> component
  color = "#9333EA",
  glowColor = "rgba(147, 51, 234, 0.7)",
  variant = "primary",
}: EnhancedButtonProps) {
  const baseStyles =
    variant === "primary"
      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
      : variant === "secondary"
        ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
        : "bg-transparent border-2 border-white/20 text-white"

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault() // Prevent default space scroll, etc.
      onClick(event)
    }
  }

  return (
    <motion.div
      role="button" // Accessibility: Inform assistive technologies this div acts as a button
      tabIndex={0} // Accessibility: Make it focusable
      onClick={onClick} // Apply the onClick handler passed from the Link component
      onKeyDown={handleKeyDown} // Accessibility: Allow activation with Enter/Space
      className={`px-8 py-4 rounded-full font-medium relative overflow-hidden inline-flex items-center justify-center cursor-pointer select-none ${baseStyles} ${className}`}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 25px ${glowColor}`,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
    >
      {/* Gradient overlay effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r"
        style={{
          backgroundImage:
            variant === "primary"
              ? "linear-gradient(to right, #9333EA, #EC4899)"
              : "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.2))",
          opacity: 0,
          pointerEvents: "none", // CRITICAL: Allows clicks to pass through
        }}
        whileHover={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
      />
      {/* Radial glow effect */}
      <motion.span
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          opacity: 0,
          pointerEvents: "none", // CRITICAL: Allows clicks to pass through
        }}
        whileHover={{
          opacity: 0.4,
          scale: 1.5,
          transition: { duration: 0.5 },
        }}
      />
      {/* Button content - should be on top */}
      <motion.span className="relative z-10 flex items-center justify-center gap-2">{children}</motion.span>
    </motion.div>
  )
}

// --- EnhancedCard, EnhancedIcon, EnhancedLink remain unchanged from your previous version ---
// (Make sure they also have pointer-events: none on their decorative overlays if they are clickable)

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  color?: string
  hoverScale?: number
  rotateOnHover?: boolean
  glowOnHover?: boolean
  depth?: number
}

export function EnhancedCard({
  children,
  className = "",
  onClick,
  color = "#9333EA",
  hoverScale = 1.05,
  rotateOnHover = true,
  glowOnHover = true,
  depth = 10,
}: EnhancedCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 ${className}`}
      whileHover={{
        scale: hoverScale,
        rotateY: rotateOnHover ? 5 : 0,
        rotateX: rotateOnHover ? -2 : 0,
        y: -10,
        boxShadow: glowOnHover ? `0 20px 40px -15px ${color}50, 0 0 20px ${color}30` : undefined,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, ${color}40, transparent)`,
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
          }}
        />
      </motion.div>
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${color}30 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}
      <motion.div
        className="relative z-10"
        style={{ transform: "translateZ(10px)" }}
        whileHover={{
          z: depth,
          transition: { duration: 0.3 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface EnhancedIconProps {
  children: ReactNode
  className?: string
  color?: string
  size?: "sm" | "md" | "lg"
  rotateOnHover?: boolean
  pulseOnHover?: boolean
}

export function EnhancedIcon({
  children,
  className = "",
  color = "#9333EA",
  size = "md",
  rotateOnHover = true,
  pulseOnHover = true,
}: EnhancedIconProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }
  return (
    <motion.div
      className={`relative rounded-2xl flex items-center justify-center ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: `${color}20` }}
      whileHover={{
        scale: 1.2,
        rotate: rotateOnHover ? 360 : 0,
        backgroundColor: `${color}40`,
        boxShadow: `0 0 20px ${color}50`,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.9 }}
    >
      {pulseOnHover && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundColor: color,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 1.5],
            transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" },
          }}
        />
      )}
      <motion.div className="relative z-10">{children}</motion.div>
    </motion.div>
  )
}

interface EnhancedLinkProps {
  children: ReactNode
  className?: string
  color?: string
  underlineOnHover?: boolean
  moveOnHover?: boolean
}

export function EnhancedLink({
  children,
  className = "",
  color = "#9333EA",
  underlineOnHover = true,
  moveOnHover = true,
}: EnhancedLinkProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center gap-2 ${className}`}
      whileHover={{
        x: moveOnHover ? 5 : 0,
        color: color,
        transition: { duration: 0.2 },
      }}
    >
      {underlineOnHover && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, ${color}, transparent)`,
            pointerEvents: "none",
          }}
          initial={{ width: "0%" }}
          whileHover={{
            width: "100%",
            transition: { duration: 0.3 },
          }}
        />
      )}
      <span>{children}</span>
      {typeof children === "string" && children.includes("→") ? (
        <motion.span
          initial={{ x: 0 }}
          whileHover={{
            x: 5,
            transition: { duration: 0.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
        >
          →
        </motion.span>
      ) : null}
    </motion.div>
  )
}
