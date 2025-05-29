"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useSpring } from "framer-motion"

// Magnetic effect - makes elements follow the cursor with a magnetic pull
export function useMagneticEffect(
  strength = 1,
  ease = 0.1,
  enabled = true,
): [React.RefObject<HTMLDivElement>, { x: number; y: number }] {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled || !ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from mouse to center
      const distanceX = clientX - centerX
      const distanceY = clientY - centerY

      // Calculate pull strength based on distance
      const pull = strength * 0.2
      const moveX = distanceX * pull
      const moveY = distanceY * pull

      setPosition({ x: moveX, y: moveY })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength, enabled])

  // Use spring for smoother movement
  const springX = useSpring(position.x, { stiffness: 150, damping: 15 })
  const springY = useSpring(position.y, { stiffness: 150, damping: 15 })

  return [ref, { x: springX, y: springY }]
}

// Generate random points for particle effects
export function generateRandomPoints(
  count: number,
  radius: number,
): { x: number; y: number; scale: number; delay: number }[] {
  const points = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * radius
    points.push({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 0.5,
    })
  }
  return points
}

// Elastic spring configuration for bouncy animations
export const elasticSpring = {
  type: "spring",
  stiffness: 300,
  damping: 10,
  mass: 0.5,
}

// Bouncy spring configuration for playful animations
export const bouncySpring = {
  type: "spring",
  stiffness: 400,
  damping: 8,
  mass: 0.8,
}

// Wobble spring configuration for wobbly animations
export const wobbleSpring = {
  type: "spring",
  stiffness: 300,
  damping: 5,
  mass: 1,
  velocity: 10,
}

// Generate a random color from a palette
export function getRandomColor(palette: string[] = ["#9333EA", "#EC4899", "#06B6D4", "#10B981", "#F59E0B"]) {
  return palette[Math.floor(Math.random() * palette.length)]
}

// Generate a random number between min and max
export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// Easing functions for more dynamic animations
export const easings = {
  elastic: [0.04, 0.62, 0.23, 0.98],
  bounce: [0.22, 1.2, 0.36, 1],
  smooth: [0.43, 0.13, 0.23, 0.96],
  wobble: [0.68, -0.6, 0.32, 1.6],
}
