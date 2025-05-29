"use client"

import { motion } from "framer-motion"
import { ScrollReveal, ParallaxEffect, ScrollFloat } from "@/components/advanced-scroll-animations"
import { MultiLayerParallaxCard, ParallaxIcon, FloatingElement } from "@/components/parallax-hover-effects"

const processSteps = [
  {
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and competitive landscape.",
    color: "#9333EA", // purple-600
    icon: "🔍",
    bgGradient: "from-purple-600/20 to-indigo-600/20",
  },
  {
    title: "Design",
    description: "We craft intuitive interfaces and experiences that align with your brand and user needs.",
    color: "#EC4899", // pink-500
    icon: "✏️",
    bgGradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Build",
    description: "We develop robust, scalable solutions using cutting-edge technologies and best practices.",
    color: "#06B6D4", // cyan-500
    icon: "🛠️",
    bgGradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Test",
    description: "We rigorously test every aspect to ensure quality, performance, and security.",
    color: "#10B981", // emerald-500
    icon: "🧪",
    bgGradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Scale",
    description: "We help you grow and evolve your digital presence to meet changing needs.",
    color: "#F59E0B", // amber-500
    icon: "📈",
    bgGradient: "from-amber-500/20 to-orange-500/20",
  },
]

export default function ProcessTimeline() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxEffect speed={0.3} direction="y">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-3xl"
          />
        </ParallaxEffect>

        <ParallaxEffect speed={-0.2} direction="y">
          <motion.div
            animate={{
              y: [0, 30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-3xl"
          />
        </ParallaxEffect>
      </div>

      <ScrollReveal className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-white">Our Process</h2>
        <p className="text-xl text-center text-purple-200 mb-20 max-w-3xl mx-auto">
          A structured approach that delivers consistent results and exceptional quality.
        </p>

        <div className="relative">
          {/* Timeline line with parallax */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-pink-500 to-amber-500 rounded-full hidden md:block" />

          {processSteps.map((step, index) => (
            <ScrollReveal
              key={step.title}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.1}
              className="relative mb-20 md:mb-32 flex flex-col md:flex-row items-center"
            >
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"}`}>
                <h3 className="text-3xl font-medium mb-4" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="text-purple-200 text-lg">{step.description}</p>
              </div>

              <div className={`my-6 md:my-0 ${index % 2 === 0 ? "md:order-2" : ""}`}>
                <MultiLayerParallaxCard
                  className="relative"
                  maxRotation={25}
                  layers={[
                    // Background gradient
                    <div
                      key="bg"
                      className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} rounded-full scale-150 blur-xl`}
                    />,
                    // Floating particles
                    <FloatingElement
                      depth={2}
                      floatRange={5}
                      duration={3}
                      delay={index * 0.2}
                      className="top-0 right-0"
                    >
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                    </FloatingElement>,
                    <FloatingElement
                      depth={1.5}
                      floatRange={8}
                      duration={4}
                      delay={index * 0.2 + 0.5}
                      className="bottom-2 left-2"
                    >
                      <div className="w-3 h-3 bg-white/20 rounded-full" />
                    </FloatingElement>,
                  ]}
                >
                  <ScrollFloat amplitude={10} period={3} delay={index * 0.5}>
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 15,
                        boxShadow: `0 0 40px ${step.color}70`,
                        transition: { duration: 0.5 },
                      }}
                      className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center z-10 relative border border-white/20"
                    >
                      <ParallaxIcon
                        icon={<span className="text-4xl">{step.icon}</span>}
                        layers={3}
                        maxOffset={3}
                        glowColor={step.color}
                      />
                    </motion.div>
                  </ScrollFloat>
                </MultiLayerParallaxCard>

                {/* Connecting line for mobile */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 h-16 w-1 bg-gradient-to-b from-purple-600 to-pink-500 md:hidden" />
                )}
              </div>

              {/* Animated pulse effect with parallax */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                style={{ backgroundColor: `${step.color}30`, transform: `translateZ(${-20}px)` }}
              />
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
