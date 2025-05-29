"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useAnimation, useScroll, useTransform, useSpring, useInView } from "framer-motion"

// Reveal component that animates when scrolled into view
export function RevealOnScroll({
  children,
  direction = "up",
  threshold = 0.15, // Changed from 0.2 to 0.15 to trigger slightly earlier
  delay = 0,
  duration = 0.7, // Changed from 0.6 to 0.7 for slightly smoother animation
  distance = 50,
  once = true,
  className = "",
}: {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  threshold?: number
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance }
      case "down":
        return { y: -distance }
      case "left":
        return { x: distance }
      case "right":
        return { x: -distance }
      default:
        return { y: distance }
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.2, 0.05, 0.2, 1], // Adjusted easing for smoother animation
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// Staggered children animation component
export function StaggerChildren({
  children,
  staggerDelay = 0.08, // Changed from 0.1 to 0.08 for slightly faster staggering
  containerDelay = 0,
  threshold = 0.15, // Changed from 0.2 to 0.15 to trigger slightly earlier
  once = true,
  className = "",
}: {
  children: ReactNode
  staggerDelay?: number
  containerDelay?: number
  threshold?: number
  once?: boolean
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: containerDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0.05, 0.2, 1] }, // Adjusted duration and easing
    },
  }

  return (
    <motion.div ref={ref} variants={container} initial="hidden" animate={controls} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

// Parallax effect component
export function ParallaxScroll({
  children,
  speed = 0.5,
  direction = "y",
  className = "",
}: {
  children: ReactNode
  speed?: number
  direction?: "x" | "y"
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

  const x = useTransform(scrollYProgress, [0, 1], [0, direction === "x" ? 100 * speed : 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, direction === "y" ? 100 * speed : 0])

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  return (
    <motion.div
      ref={ref}
      style={{ x: direction === "x" ? springX : 0, y: direction === "y" ? springY : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scroll-linked animation component
export function ScrollLinkedAnimation({
  children,
  startOffset = 0,
  endOffset = 1,
  animateFrom,
  animateTo,
  className = "",
}: {
  children: ReactNode
  startOffset?: number
  endOffset?: number
  animateFrom: any
  animateTo: any
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const transforms: { [key: string]: any } = {}

  for (const key in animateFrom) {
    if (animateFrom[key] !== undefined && animateTo[key] !== undefined) {
      transforms[key] = useTransform(scrollYProgress, [startOffset, endOffset], [animateFrom[key], animateTo[key]])
    }
  }

  return (
    <motion.div ref={ref} style={transforms} className={className}>
      {children}
    </motion.div>
  )
}

// 3D card effect with scroll trigger
export function Scroll3DCard({
  children,
  depth = 30,
  threshold = 0.2,
  className = "",
}: {
  children: ReactNode
  depth?: number
  threshold?: number
  className?: string
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const handleMouseMove = (e) => {
    if (!isHovered) return

    const card = ref.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -depth
    const rotateYValue = ((x - centerX) / centerX) * depth

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const resetRotation = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation with character-by-character effect
export function TextReveal({
  text,
  threshold = 0.2,
  staggerDelay = 0.02,
  containerDelay = 0,
  once = true,
  className = "",
  preload = false,
}: {
  text: string
  threshold?: number
  staggerDelay?: number
  containerDelay?: number
  once?: boolean
  className?: string
  preload?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    // If preload is true, start animation immediately
    if (preload) {
      controls.start("visible")
    } else if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once, preload])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: containerDelay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  // Split text into characters
  const characters = text.split("")

  return (
    <motion.div ref={ref} variants={container} initial="hidden" animate={controls} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Scroll progress indicator
export function ScrollProgress({ color = "#9333EA", height = 4 }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 origin-left"
      style={{
        scaleX,
        height,
        backgroundColor: color,
      }}
    />
  )
}

// Section transition component
export function SectionTransition({
  children,
  startColor = "#1e1b4b",
  endColor = "#581c87",
  className = "",
}: {
  children: ReactNode
  startColor?: string
  endColor?: string
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundColor = useTransform(scrollYProgress, [0, 1], [startColor, endColor])

  return (
    <motion.section ref={ref} style={{ backgroundColor }} className={`relative ${className}`}>
      {children}
    </motion.section>
  )
}
