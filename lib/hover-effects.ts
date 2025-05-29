"use client"

import type React from "react"
import { useState, useEffect } from "react"

// Animation presets with exaggerated values
export const animationPresets = {
  lift: {
    scale: 1.12,
    y: -20,
    shadow: "0 30px 60px rgba(0,0,0,0.4)",
  },
  tilt: {
    rotateX: 10,
    rotateY: 15,
    scale: 1.08,
  },
  bounce: {
    y: -25,
    scale: 1.1,
    config: { tension: 300, friction: 10 },
  },
  expand: {
    scale: 1.15,
    config: { tension: 200, friction: 12 },
  },
  glow: {
    boxShadow: "0 0 25px 10px rgba(66, 153, 225, 0.6)",
    scale: 1.05,
  },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    config: { tension: 500, friction: 10 },
  },
  rotate: {
    rotate: 5,
    scale: 1.1,
  },
  pulse: {
    scale: [1, 1.12, 1.08],
    config: { tension: 300, friction: 8 },
  },
}

// Hook for tracking mouse position
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updatePosition)
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return position
}

// Hook for 3D tilt effect
export const useTilt = (ref: React.RefObject<HTMLElement>) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const tiltX = ((y - centerY) / (rect.height / 2)) * 20
      const tiltY = ((centerX - x) / (rect.width / 2)) * 20

      setTilt({ x: tiltX, y: tiltY })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref])

  return tilt
}

// Hook for magnetic effect
export const useMagnetic = (ref: React.RefObject<HTMLElement>, strength = 40) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const deltaX = ((x - centerX) / (rect.width / 2)) * strength
      const deltaY = ((y - centerY) / (rect.height / 2)) * strength

      setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref, strength])

  return position
}

// Generate random particles
export const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 1 + 0.5,
    delay: Math.random() * 0.2,
  }))
}
