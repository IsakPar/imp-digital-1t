"use client"

import { motion } from "framer-motion"

interface AnimatedLogoProps {
  startImmediately?: boolean
}

export default function AnimatedLogo({ startImmediately = false }: AnimatedLogoProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 1.2,
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: startImmediately ? 0 : 0.2,
      }}
      className="relative w-32 h-32 mx-auto"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 opacity-30 blur-xl" />
      </motion.div>

      {/* Pulsing effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/30 blur-lg"
      />

      {/* Logo container */}
      <motion.div
        whileHover={{
          scale: 1.15,
          rotate: 10,
          transition: { duration: 0.4, type: "spring", stiffness: 300 },
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Rotating border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            background:
              "linear-gradient(45deg, #9333ea33, #ec489933) padding-box, linear-gradient(45deg, #9333ea, #ec4899) border-box",
          }}
        />

        {/* Logo */}
        <motion.div
          whileHover={{
            boxShadow: "0 0 30px rgba(147, 51, 234, 0.8)",
            transition: { duration: 0.3 },
          }}
          className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl"
        >
          <motion.span
            className="text-white text-3xl font-bold"
            whileHover={{
              scale: 1.2,
              textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
              transition: { duration: 0.2, yoyo: 5 },
            }}
          >
            IMP
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
