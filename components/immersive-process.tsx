"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

const processSteps = [
  {
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and competitive landscape.",
    color: "#9333EA",
    icon: "🔍",
    position: { x: -200, y: -100 },
  },
  {
    title: "Design",
    description: "We craft intuitive interfaces and experiences that align with your brand and user needs.",
    color: "#EC4899",
    icon: "✏️",
    position: { x: 200, y: -100 },
  },
  {
    title: "Build",
    description: "We develop robust, scalable solutions using cutting-edge technologies and best practices.",
    color: "#06B6D4",
    icon: "🛠️",
    position: { x: 0, y: 0 },
  },
  {
    title: "Test",
    description: "We rigorously test every aspect to ensure quality, performance, and security.",
    color: "#10B981",
    icon: "🧪",
    position: { x: -200, y: 100 },
  },
  {
    title: "Scale",
    description: "We help you grow and evolve your digital presence to meet changing needs.",
    color: "#F59E0B",
    icon: "📈",
    position: { x: 200, y: 100 },
  },
]

export default function ImmersiveProcess({ isActive }: { isActive: boolean }) {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isActive, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const stepVariants = {
    hidden: (custom: { x: number; y: number }) => ({
      opacity: 0,
      x: custom.x,
      y: custom.y,
      scale: 0,
      rotate: -180,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <div className="h-full flex items-center justify-center px-6 bg-gradient-to-br from-violet-900 to-fuchsia-900">
      <motion.div variants={containerVariants} initial="hidden" animate={controls} className="max-w-7xl mx-auto w-full">
        <motion.div variants={titleVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Our Process</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            A structured approach that delivers consistent results and exceptional quality.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {processSteps.map((step, index) => (
              <motion.line
                key={`line-${index}`}
                x1="50%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke={step.color}
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isActive
                    ? {
                        pathLength: 1,
                        opacity: 0.3,
                        x2: `${50 + (index % 2 === 0 ? -20 : 20)}%`,
                        y2: `${50 + (index < 2 ? -20 : index === 2 ? 0 : 20)}%`,
                      }
                    : {}
                }
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              />
            ))}
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                custom={step.position}
                variants={stepVariants}
                className={`relative ${index === 2 ? "md:col-span-3 md:max-w-md md:mx-auto" : ""}`}
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                  }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <span className="text-5xl">{step.icon}</span>
                  </motion.div>

                  <h3 className="text-2xl font-medium mb-3" style={{ color: step.color }}>
                    {step.title}
                  </h3>
                  <p className="text-purple-200">{step.description}</p>

                  {/* Animated pulse */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                    className="absolute -inset-4 rounded-3xl"
                    style={{ backgroundColor: `${step.color}10` }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
