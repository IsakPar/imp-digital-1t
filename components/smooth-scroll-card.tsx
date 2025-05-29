"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

interface SmoothScrollCardProps {
  children: ReactNode
  className?: string
  index?: number
  direction?: "left" | "right"
  threshold?: number
  delay?: number
  duration?: number
  depth?: number
  hover3D?: boolean
  preloadThreshold?: number
}

export default function SmoothScrollCard({
  children,
  className = "",
  index = 0,
  direction = "left",
  threshold = 0.15,
  delay = 0,
  duration = 0.7,
  depth = 30,
  hover3D = true,
  preloadThreshold = 0.1,
}: SmoothScrollCardProps) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: false, amount: threshold })
  const isPreloading = useInView(cardRef, { once: false, amount: preloadThreshold })
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  // 3D hover effect state
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  // Start animation when element is in preload threshold
  useEffect(() => {
    if (isPreloading) {
      setShouldAnimate(true)
    }
  }, [isPreloading])

  // Create transform values based on scroll progress and direction
  const x = useTransform(scrollYProgress, [0, 0.5], [direction === "left" ? -200 : 200, 0])

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const rotate = useTransform(scrollYProgress, [0, 0.5], [direction === "left" ? -30 : 30, 0])

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!isHovered || !hover3D) return

    const card = cardRef.current
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
      ref={cardRef}
      className={className}
      initial={{
        opacity: 0,
        x: direction === "left" ? -200 : 200,
        scale: 0.8,
        rotateZ: direction === "left" ? -30 : 30,
      }}
      animate={
        shouldAnimate
          ? {
              opacity: 1,
              x: 0,
              scale: 1,
              rotateZ: 0,
            }
          : {}
      }
      whileHover={
        !hover3D
          ? {
              scale: 1.15,
              y: -20,
              rotate: 2,
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25), 0 0 20px rgba(147, 51, 234, 0.3)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
                mass: 0.8,
              },
            }
          : {}
      }
      style={{
        transformStyle: "preserve-3d",
        transform:
          hover3D && isHovered
            ? `perspective(1000px) rotateX(${rotateX * 1.5}deg) rotateY(${rotateY * 1.5}deg) scale(1.15) translateY(-20px) rotate(${rotateY > 0 ? 2 : -2}deg)`
            : undefined,
        transition: isHovered
          ? "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1.2)"
          : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: isHovered ? "0 30px 60px rgba(0, 0, 0, 0.25), 0 0 20px rgba(147, 51, 234, 0.3)" : "none",
      }}
      transition={{
        duration,
        delay: delay + index * 0.08,
        ease: [0.2, 0.05, 0.2, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
    >
      {children}

      {/* Subtle hover animation overlay */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.15,
              background: "radial-gradient(circle at center, white 0%, transparent 70%)",
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -inset-1 pointer-events-none rounded-inherit z-[-1]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.7,
              scale: 1.05,
            }}
            transition={{ duration: 0.4 }}
            style={{
              background: "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))",
              filter: "blur(15px)",
            }}
          />
        </>
      )}
    </motion.div>
  )
}
