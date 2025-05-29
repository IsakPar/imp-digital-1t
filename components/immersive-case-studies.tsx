"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Development",
    description: "A comprehensive financial analytics platform with real-time data visualization.",
    image: "/placeholder.svg?height=600&width=800&query=modern-fintech-dashboard",
    color: "#9333EA",
    delay: 0,
  },
  {
    title: "E-commerce Redesign",
    category: "UI/UX Design",
    description: "Complete redesign of a luxury fashion e-commerce platform.",
    image: "/placeholder.svg?height=600&width=800&query=luxury-ecommerce-design",
    color: "#EC4899",
    delay: 0.2,
  },
  {
    title: "AI Content Platform",
    category: "AI Integration",
    description: "An AI-powered content generation and management system.",
    image: "/placeholder.svg?height=600&width=800&query=ai-content-platform",
    color: "#06B6D4",
    delay: 0.4,
  },
]

export default function ImmersiveCaseStudies({ isActive }: { isActive: boolean }) {
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isActive && !hasAnimated) {
      controls.start("visible")
      setHasAnimated(true)
    } else if (!isActive) {
      controls.start("hidden")
      setHasAnimated(false)
    }
  }, [isActive, controls, hasAnimated])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const cardVariants = {
    hidden: (custom: number) => ({
      opacity: 0,
      x: custom % 2 === 0 ? -200 : 200,
      y: 50,
      rotateY: custom % 2 === 0 ? -45 : 45,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <div className="h-full flex items-center justify-center px-6 bg-gradient-to-br from-indigo-950 to-purple-900">
      <motion.div variants={containerVariants} initial="hidden" animate={controls} className="max-w-7xl mx-auto w-full">
        <motion.div variants={titleVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Selected Work</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              custom={index}
              variants={cardVariants}
              className="group relative"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/10 h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <ExternalLink className="w-6 h-6 text-gray-900" />
                  </motion.div>
                </div>

                <div className="p-6 relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
                    style={{ backgroundImage: `linear-gradient(to right, ${project.color}, transparent)` }}
                  />

                  <span
                    className="text-sm font-medium inline-block px-3 py-1 rounded-full mb-2"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-medium mt-2 mb-3 text-white">{project.title}</h3>
                  <p className="text-purple-200">{project.description}</p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 flex items-center gap-2 text-white/70 group-hover:text-white"
                  >
                    <span>View case study</span>
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={titleVariants} className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium hover:bg-white/20 transition-colors text-white"
          >
            View all projects
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
