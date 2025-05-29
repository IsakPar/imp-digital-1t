"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Server, Globe } from "lucide-react"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"

const securityFeatures = [
  {
    icon: Globe,
    title: "Edge CDN",
    description: "Global content delivery for lightning-fast load times.",
  },
  {
    icon: Lock,
    title: "HTTPS Encryption",
    description: "Secure data transmission with industry-standard encryption.",
  },
  {
    icon: Server,
    title: "Secure Architecture",
    description: "Built with security best practices from the ground up.",
  },
  {
    icon: Shield,
    title: "Regular Audits",
    description: "Continuous monitoring and security testing.",
  },
]

export default function SecurityFeatures() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-pink-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <RevealOnScroll className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-white">Security & Infrastructure</h2>
        <p className="text-xl text-center text-purple-200 mb-20 max-w-3xl mx-auto">
          We build on a foundation of best-in-class technology to ensure your digital assets are secure, performant, and
          reliable.
        </p>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg text-center transition-all duration-500"
            >
              <motion.div
                whileHover={{
                  rotate: 360,
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
                }}
                transition={{ duration: 0.7 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl font-medium mb-3 text-white">{feature.title}</h3>
              <p className="text-purple-200">{feature.description}</p>

              {/* Animated underline on hover */}
              <motion.div
                initial={{ width: "0%" }}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.3 }}
                className="h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-4"
              />
            </motion.div>
          ))}
        </StaggerChildren>

        <RevealOnScroll direction="up" delay={0.3} className="mt-16 text-center">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px -10px rgba(147, 51, 234, 0.3)",
            }}
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/10"
          >
            <span className="text-white">Our tech stack:</span>
            <div className="flex gap-4">
              <motion.span whileHover={{ color: "#9333EA" }} className="text-purple-200 transition-colors">
                Next.js
              </motion.span>
              <span className="text-purple-200">•</span>
              <motion.span whileHover={{ color: "#EC4899" }} className="text-purple-200 transition-colors">
                Vercel
              </motion.span>
              <span className="text-purple-200">•</span>
              <motion.span whileHover={{ color: "#06B6D4" }} className="text-purple-200 transition-colors">
                Supabase
              </motion.span>
              <span className="text-purple-200">•</span>
              <motion.span whileHover={{ color: "#10B981" }} className="text-purple-200 transition-colors">
                Sanity
              </motion.span>
            </div>
          </motion.div>
        </RevealOnScroll>
      </RevealOnScroll>
    </section>
  )
}
