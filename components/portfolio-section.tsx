"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import Image from "next/image"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"
import LinkWithTransition from "@/components/link-with-transition"
import SmoothScrollCard from "@/components/smooth-scroll-card"

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Development",
    description: "A comprehensive financial analytics platform with real-time data visualization.",
    image: "/placeholder.svg?height=600&width=800&query=modern-fintech-dashboard",
    color: "#9333EA", // purple-600
  },
  {
    title: "E-commerce Redesign",
    category: "UI/UX Design",
    description: "Complete redesign of a luxury fashion e-commerce platform.",
    image: "/placeholder.svg?height=600&width=800&query=luxury-ecommerce-design",
    color: "#EC4899", // pink-500
  },
  {
    title: "AI Content Platform",
    category: "AI Integration",
    description: "An AI-powered content generation and management system.",
    image: "/placeholder.svg?height=600&width=800&query=ai-content-platform",
    color: "#06B6D4", // cyan-500
  },
  {
    title: "Healthcare App",
    category: "Mobile Development",
    description: "Secure patient management system with telemedicine capabilities.",
    image: "/placeholder.svg?height=600&width=800&query=healthcare-mobile-app",
    color: "#10B981", // emerald-500
  },
]

export default function PortfolioSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-32 px-6 bg-gradient-to-b from-purple-900 to-indigo-900">
      <RevealOnScroll className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-white">Our Work</h2>
        <p className="text-xl text-center text-purple-200 mb-20 max-w-3xl mx-auto">
          Explore our recent projects and see how we've helped businesses transform their digital presence.
        </p>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <SmoothScrollCard
              key={project.title}
              index={index}
              direction={index % 2 === 0 ? "left" : "right"}
              hover3D={true}
              depth={30}
              className="cursor-pointer"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 h-full group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    priority={index < 2} // Prioritize loading first two images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-900" />
                  </motion.div>
                </div>

                <div className="p-6 relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={activeProject === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 flex items-center gap-2 text-white/70 group-hover:text-white"
                  >
                    <span>View case study</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </SmoothScrollCard>
          ))}
        </StaggerChildren>

        <RevealOnScroll className="text-center mt-16">
          <LinkWithTransition href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium hover:bg-white/20 transition-colors text-white inline-flex items-center gap-2"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </motion.button>
          </LinkWithTransition>
        </RevealOnScroll>
      </RevealOnScroll>
    </section>
  )
}
