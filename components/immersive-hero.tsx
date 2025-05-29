"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MousePointer } from "lucide-react"
import dynamic from "next/dynamic"
import AnimatedLogo from "@/components/animated-logo"
import LinkWithTransition from "@/components/link-with-transition"
import { useScrollController } from "@/components/immersive-scroll-controller"

const SplineHero = dynamic(() => import("@/components/spline-hero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
    </div>
  ),
})

export default function ImmersiveHero({ isActive }: { isActive: boolean }) {
  const { nextSection } = useScrollController()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
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

  return (
    <div className="h-full relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-indigo-950"></div>}>
          <SplineHero />
        </Suspense>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="text-center z-10 relative px-6"
      >
        <motion.div variants={itemVariants}>
          <AnimatedLogo />
        </motion.div>

        <motion.h1 variants={itemVariants} className="mt-12 text-5xl md:text-7xl font-light tracking-tight text-white">
          Build smarter. Move faster. Look better.
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
          End-to-end digital services that blend form, function, and future-ready tech.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4 justify-center">
          <LinkWithTransition href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium hover:from-purple-700 hover:to-pink-600 transition-colors shadow-lg shadow-purple-500/20"
            >
              Book a strategy call
            </motion.button>
          </LinkWithTransition>
          <LinkWithTransition href="/services">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium transition-all flex items-center gap-2 text-white"
            >
              See our capabilities <ArrowRight className="w-4 h-4" />
            </motion.button>
          </LinkWithTransition>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={nextSection}
      >
        <div className="w-10 h-16 border-2 border-white/40 rounded-full flex justify-center relative">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-white rounded-full mt-3"
          />
          <MousePointer className="absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-5 text-white/60" />
        </div>
        <p className="text-white/60 text-sm mt-2">Scroll to explore</p>
      </motion.div>
    </div>
  )
}
