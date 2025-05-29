"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"
import LinkWithTransition from "@/components/link-with-transition"
import AnimatedCard from "@/components/animated-card"
import AnimatedImageCard from "@/components/animated-image-card"
import AnimatedButton from "@/components/animated-button"

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
  {
    title: "SaaS Analytics Tool",
    category: "Full Stack",
    description: "Business intelligence platform for data-driven decision making.",
    image: "/placeholder.svg?height=600&width=800&query=saas-analytics-dashboard",
    color: "#F59E0B", // amber-500
  },
  {
    title: "Blockchain Platform",
    category: "Web3 Development",
    description: "Decentralized finance platform with smart contract integration.",
    image: "/placeholder.svg?height=600&width=800&query=blockchain-defi-platform",
    color: "#8B5CF6", // violet-500
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 pt-32">
      {/* Hero */}
      <section className="px-6 pb-20">
        <RevealOnScroll className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">Our Work</h1>
          <p className="text-xl text-purple-200">A showcase of our recent projects and digital innovations.</p>
        </RevealOnScroll>
      </section>

      {/* Projects Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedCard
                key={project.title}
                variant="full"
                intensity="medium"
                color={project.color}
                className="cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 group">
                  <AnimatedImageCard
                    src={project.image}
                    alt={project.title}
                    animation="full"
                    aspectRatio="video"
                    overlayColor="black"
                    overlayOpacity={0.4}
                    priority={index < 3}
                  >
                    <div className="flex flex-col justify-end h-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-900" />
                      </motion.div>
                    </div>
                  </AnimatedImageCard>

                  <div className="p-6">
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
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] bg-pink-600/10 rounded-full blur-3xl"
          />
        </div>

        <RevealOnScroll className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Have a project in mind?</h2>
          <p className="text-xl text-purple-200 mb-10">Let's create something extraordinary together.</p>
          <LinkWithTransition href="/contact">
            <AnimatedButton
              variant="primary"
              animation="full"
              color="#9333EA"
              glowColor="rgba(147, 51, 234, 0.5)"
              className="px-10 py-5 text-lg"
            >
              Start your project
            </AnimatedButton>
          </LinkWithTransition>
        </RevealOnScroll>
      </section>
    </div>
  )
}
