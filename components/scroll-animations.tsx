"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  className?: string
  preloadMargin?: string
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 50,
  once = true,
  className = "",
  preloadMargin = "-20% 0px", // Increased from -10% to -20% for earlier triggering
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: preloadMargin })

  const directionMap = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
  }

  const initial = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : initial}
      transition={{ duration, delay, ease: [0.2, 0.05, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChildren({
  children,
  staggerDelay = 0.08,
  className = "",
  preloadMargin = "-20% 0px", // Increased for earlier triggering
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: preloadMargin })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.2, 0.05, 0.2, 1] } },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  )
}

// Other components remain the same...
