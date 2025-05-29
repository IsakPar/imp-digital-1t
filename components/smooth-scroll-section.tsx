"use client"

import { useRef, forwardRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, type AnimationControls } from "framer-motion"

interface SmoothScrollSectionProps {
  children: ReactNode
  id?: string
  className?: string
  threshold?: [number, number] // [start, end] values for the scroll trigger
  fadeIn?: boolean
  slideIn?: "up" | "down" | "left" | "right" | false
  scale?: boolean
  rotate?: boolean
  delay?: number
  duration?: number
  animationControls?: AnimationControls
  preloadThreshold?: number
}

const SmoothScrollSection = forwardRef<HTMLElement, SmoothScrollSectionProps>(
  (
    {
      children,
      id,
      className = "",
      threshold = [0.05, 0.45], // Start earlier and complete faster
      fadeIn = true,
      slideIn = "up",
      scale = false,
      rotate = false,
      delay = 0,
      duration = 0.8,
      animationControls,
      preloadThreshold = 0.05,
    },
    ref,
  ) => {
    const sectionRef = useRef(null)
    const localRef = ref || sectionRef

    const { scrollYProgress } = useScroll({
      target: typeof localRef === "object" && localRef !== null ? localRef : sectionRef,
      offset: ["start end", "end start"],
    })

    // Create transform values based on scroll progress
    const opacityValue = fadeIn ? 0 : 1
    const opacity = useTransform(scrollYProgress, threshold, [opacityValue, 1])

    // Handle slide in animations
    let xValue = 0
    let yValue = 0

    if (slideIn === "left") {
      xValue = -100
    } else if (slideIn === "right") {
      xValue = 100
    } else if (slideIn === "up") {
      yValue = 100
    } else if (slideIn === "down") {
      yValue = -100
    }

    const x = useTransform(scrollYProgress, threshold, [slideIn === "left" || slideIn === "right" ? xValue : 0, 0])
    const y = useTransform(scrollYProgress, threshold, [slideIn === "up" || slideIn === "down" ? yValue : 0, 0])

    // Handle scale animation
    const scaleValueCalc = scale ? 0.8 : 1
    const scaleValue = useTransform(scrollYProgress, threshold, [scaleValueCalc, 1])

    // Handle rotation animation
    const rotateValueCalc = rotate ? 45 : 0
    const rotateValue = useTransform(scrollYProgress, threshold, [rotateValueCalc, 0])

    // If animation controls are provided, use them instead of scroll-based animations
    const animationProps = animationControls
      ? {
          initial: {
            opacity: opacityValue,
            x: slideIn === "left" || slideIn === "right" ? xValue : 0,
            y: slideIn === "up" || slideIn === "down" ? yValue : 0,
            scale: scaleValueCalc,
            rotate: rotateValueCalc,
          },
          animate: animationControls,
        }
      : {
          style: {
            opacity,
            x,
            y,
            scale: scaleValue,
            rotate: rotateValue,
          },
        }

    return (
      <section id={id} ref={localRef as any} className={`relative ${className}`}>
        <motion.div
          {...animationProps}
          transition={{
            duration,
            delay,
            ease: [0.2, 0.05, 0.2, 1], // Adjusted easing for smoother animation
          }}
        >
          {children}
        </motion.div>
      </section>
    )
  },
)

SmoothScrollSection.displayName = "SmoothScrollSection"

export default SmoothScrollSection
