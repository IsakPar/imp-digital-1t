"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Code, Palette, Cpu, Shield } from "lucide-react"
import LinkWithTransition from "@/components/link-with-transition"

const services = [
  {
    icon: Code,
    title: "Web & App Development",
    description: "Cutting-edge applications built with modern frameworks and best practices.",
    color: "#9333EA",
    x: -100,
    y: -50,
  },
  {
    icon: Palette,
    title: "UI/UX & Design Systems",
    description: "Beautiful, intuitive interfaces that users love and businesses trust.",
    color: "#EC4899",
    x: 100,
    y: -50,
  },
  {
    icon: Cpu,
    title: "Automation & AI Integration",
    description: "Smart solutions that streamline operations and unlock new possibilities.",
    color: "#06B6D4",
    x: -100,
    y: 50,
  },
  {
    icon: Shield,
    title: "Cybersecurity & Infrastructure",
    description: "Robust, secure foundations for your digital assets and operations.",
    color: "#10B981",
    x: 100,
    y: 50,
  },
]

export default function ImmersiveServices({ isActive }: { isActive: boolean }) {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const cardVariants = {
    hidden: (custom: { x: number; y: number }) => ({
      opacity: 0,
      x: custom.x,
      y: custom.y,
      scale: 0.8,
      rotate: 15,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <div className="h-full flex items-center justify-center px-6 bg-gradient-to-br from-purple-900 to-indigo-900">
      <motion.div variants={containerVariants} initial="hidden" animate={controls} className="max-w-7xl mx-auto w-full">
        <motion.div variants={titleVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">What we do best</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            We combine cutting-edge technology with exceptional design to create digital experiences that stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.title} custom={{ x: service.x, y: service.y }} variants={cardVariants}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="group relative p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg transition-all duration-500 border border-white/10"
              >
                <div className="flex items-start">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="w-16 h-16 mr-6 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <service.icon className="w-8 h-8" style={{ color: service.color }} />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-medium mb-3 text-white">{service.title}</h3>
                    <p className="text-purple-200 mb-6 group-hover:text-white/90 transition-colors">
                      {service.description}
                    </p>

                    <LinkWithTransition href="/services">
                      <motion.div
                        className="text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                        style={{ color: service.color }}
                        whileHover={{ x: 5 }}
                      >
                        Learn more
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </LinkWithTransition>
                  </div>
                </div>

                {/* Animated gradient overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}20 0%, transparent 50%, ${service.color}20 100%)`,
                      backgroundSize: "200% 200%",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
