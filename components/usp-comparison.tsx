"use client"

import { motion } from "framer-motion"
import { Check, Zap, Fingerprint, Sparkles, BarChart3 } from "lucide-react"
import { ScrollReveal, ScrollItem, ScrollGradient } from "@/components/advanced-scroll-animations"

const features = [
  {
    title: "No templates, fully custom",
    description: "Every project is built from scratch to meet your specific needs and goals.",
    icon: Fingerprint,
    color: "#9333EA", // purple-600
  },
  {
    title: "Built-in performance + SEO",
    description: "Optimized for speed, search engines, and conversion from day one.",
    icon: Zap,
    color: "#EC4899", // pink-500
  },
  {
    title: "AI & automation-ready",
    description: "Future-proof solutions that leverage the latest in AI and automation.",
    icon: Sparkles,
    color: "#06B6D4", // cyan-500
  },
  {
    title: "Premium design execution",
    description: "Pixel-perfect designs that elevate your brand and delight your users.",
    icon: BarChart3,
    color: "#10B981", // emerald-500
  },
]

export default function UspComparison() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute -top-[20%] -right-[20%] w-[70%] h-[70%] bg-fuchsia-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-3xl"
        />
      </div>

      <ScrollReveal className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-white">Why IMP?</h2>
        <p className="text-xl text-center text-purple-200 mb-20 max-w-3xl mx-auto">
          We don't just build websites and apps. We create digital experiences that drive real business results.
        </p>

        <ScrollReveal staggerChildren={true} staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <ScrollItem key={feature.title}>
              <ScrollGradient
                colors={[`${feature.color}20`, "#ffffff10", `${feature.color}20`]}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg transition-all duration-500 h-full"
              >
                <div className="flex items-start">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                    className="w-12 h-12 mr-6 flex-shrink-0 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-medium mb-3" style={{ color: feature.color }}>
                      {feature.title}
                    </h3>
                    <p className="text-purple-200">{feature.description}</p>

                    <div className="mt-6 flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 mr-3">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-white">IMP Digital</span>
                    </div>

                    <div className="mt-2 flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 mr-3">
                        <span className="w-3 h-0.5 bg-red-500"></span>
                      </div>
                      <span className="text-purple-200">Typical Agencies</span>
                    </div>
                  </div>
                </div>

                {/* Animated gradient border */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-conic from-transparent via-white/10 to-transparent animate-spin-slow" />
                </motion.div>
              </ScrollGradient>
            </ScrollItem>
          ))}
        </ScrollReveal>
      </ScrollReveal>
    </section>
  )
}
