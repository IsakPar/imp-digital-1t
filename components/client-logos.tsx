"use client"

import { motion } from "framer-motion"
import { RevealOnScroll } from "@/components/scroll-animations"

export default function ClientLogos() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-indigo-900 to-indigo-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl"
        />
      </div>

      <RevealOnScroll className="max-w-7xl mx-auto text-center relative z-10">
        <p className="text-sm uppercase tracking-wider text-purple-300 mb-8">Trusted by ambitious teams</p>

        <div className="flex flex-wrap justify-center items-center gap-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              className="w-32 h-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 transition-all duration-300"
            />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
