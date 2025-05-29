"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useSpring, useInView, useAnimation } from "framer-motion"

// Enhanced reveal component with more animation options
export function ScrollReveal({
  children,
  direction = "up",
  distance = 100,
  duration = 0.8,
  delay = 0,
  staggerChildren = 0,
  staggerDelay = 0.1,
  threshold = 0.1,
  ease = [0.25, 0.1, 0.25, 1],
  className = "",
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: threshold })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  // Map direction to initial animation properties
  const getDirectionAnimation = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 }
      case "down":
        return { y: -distance, opacity: 0 }
      case "left":
        return { x: distance, opacity: 0 }
      case "right":
        return { x: -distance, opacity: 0 }
      case "scale":
        return { scale: 0.8, opacity: 0 }
      case "rotate":
        return { rotate: 15, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const variants = {
    hidden: getDirectionAnimation(),
    visible: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease,
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: staggerChildren ? delay : 0,
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// Component for staggered child animations
export function ScrollItem({ children, className = "" }) {
  const variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// Parallax effect component with enhanced options
export function ParallaxEffect({ children, speed = 0.5, direction = "y", reverse = false, className = "" }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const [transformX, setTransformX] = useState(0)
  const [transformY, setTransformY] = useState(0)
  const [transformRotate, setTransformRotate] = useState(0)
  const [transformScale, setTransformScale] = useState(1)

  useEffect(() => {
    const factor = reverse ? -speed : speed
    const range = factor * 100

    if (direction === "x") {
      scrollYProgress.onChange((value) => {
        setTransformX(value * range)
      })
    } else if (direction === "rotate") {
      scrollYProgress.onChange((value) => {
        setTransformRotate(value * range * 3.6)
      })
    } else if (direction === "scale") {
      scrollYProgress.onChange((value) => {
        setTransformScale(1 + value * (range / 100))
      })
    } else {
      scrollYProgress.onChange((value) => {
        setTransformY(value * range)
      })
    }
  }, [scrollYProgress, speed, direction, reverse])

  const springTransformX = useSpring(transformX, { stiffness: 100, damping: 30 })
  const springTransformY = useSpring(transformY, { stiffness: 100, damping: 30 })
  const springTransformRotate = useSpring(transformRotate, { stiffness: 100, damping: 30 })
  const springTransformScale = useSpring(transformScale, { stiffness: 100, damping: 30 })

  const style = {}
  if (direction === "x") {
    style.x = springTransformX
  } else if (direction === "rotate") {
    style.rotate = springTransformRotate
  } else if (direction === "scale") {
    style.scale = springTransformScale
  } else {
    style.y = springTransformY
  }

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  )
}

// Scroll-triggered section with background color transition
export function ScrollSection({
  children,
  startColor = "#1e1b4b", // indigo-950
  endColor = "#581c87", // purple-900
  className = "",
}) {
  const ref = useRef(null)
  const [color, setColor] = useState(startColor)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Simple linear interpolation between colors
      const r1 = Number.parseInt(startColor.slice(1, 3), 16)
      const g1 = Number.parseInt(startColor.slice(3, 5), 16)
      const b1 = Number.parseInt(startColor.slice(5, 7), 16)

      const r2 = Number.parseInt(endColor.slice(1, 3), 16)
      const g2 = Number.parseInt(endColor.slice(3, 5), 16)
      const b2 = Number.parseInt(endColor.slice(5, 7), 16)

      const r = Math.round(r1 + (r2 - r1) * latest)
      const g = Math.round(g1 + (g2 - g1) * latest)
      const b = Math.round(b1 + (b2 - b1) * latest)

      setColor(
        `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
      )
    })
  }, [scrollYProgress, startColor, endColor])

  return (
    <div ref={ref} className={`transition-colors duration-300 ${className}`} style={{ backgroundColor: color }}>
      {children}
    </div>
  )
}

// Scroll-triggered text reveal with character animation
export function ScrollTextReveal({ text, className = "", delay = 0, duration = 0.5 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  // Split text into characters for animation
  const characters = text.split("")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <motion.div ref={ref} className={className} variants={container} initial="hidden" animate={controls}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
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

// Scroll-triggered 3D card effect
export function Scroll3DCard({ children, className = "", depth = 30 }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

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

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
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

// Scroll-triggered floating animation
export function ScrollFloat({ children, className = "", amplitude = 20, period = 4, delay = 0 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: [0, -amplitude, 0, amplitude, 0],
        transition: {
          delay,
          duration: period,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
        },
      })
    } else {
      controls.stop()
    }
  }, [controls, isInView, amplitude, period, delay])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scroll-triggered mask reveal effect
export function ScrollMaskReveal({ children, direction = "left", duration = 1.2, delay = 0, className = "" }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  // Map direction to animation properties
  const getDirectionAnimation = () => {
    switch (direction) {
      case "left":
        return { x: "-100%", y: 0 }
      case "right":
        return { x: "100%", y: 0 }
      case "up":
        return { x: 0, y: "-100%" }
      case "down":
        return { x: 0, y: "100%" }
      default:
        return { x: "-100%", y: 0 }
    }
  }

  const maskVariants = {
    hidden: getDirectionAnimation(),
    visible: {
      x: "100%",
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.77, 0, 0.18, 1], // Custom easing for smooth reveal
      },
    },
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div className="relative z-10">{children}</div>
      <motion.div
        className="absolute inset-0 bg-indigo-950 z-20"
        variants={maskVariants}
        initial="hidden"
        animate={controls}
      />
    </div>
  )
}

// Scroll-triggered gradient background animation
export function ScrollGradient({
  children,
  className = "",
  colors = ["#4338ca", "#6d28d9", "#7e22ce", "#a21caf"],
  duration = 8,
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start({
        backgroundPosition: ["0% 0%", "100% 100%"],
        transition: {
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        },
      })
    } else {
      controls.stop()
    }
  }, [controls, isInView, duration])

  const gradientString = `linear-gradient(45deg, ${colors.join(", ")})`

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className={className}
      style={{
        backgroundImage: gradientString,
        backgroundSize: "400% 400%",
      }}
    >
      {children}
    </motion.div>
  )
}
