"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import LinkWithTransition from "@/components/link-with-transition"

export default function ImmersiveCTA({ isActive }: { isActive: boolean }) {
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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <div className="h-full flex items-center justify-center px-6 bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-light text-white mb-6">
          Ready to elevate your digital presence?
        </motion.h2>

        <motion.p variants={itemVariants} className="text-xl text-purple-200 mb-10">
          Let's create something extraordinary together.
        </motion.p>

        <motion.div variants={itemVariants}>
          <LinkWithTransition href="/contact">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium text-lg hover:from-purple-700 hover:to-pink-600 transition-colors shadow-lg shadow-purple-500/20"
            >
              Start your project
            </motion.button>
          </LinkWithTransition>
        </motion.div>

        {/* Floating elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
