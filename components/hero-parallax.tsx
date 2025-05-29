"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import LinkWithTransition from "@/components/link-with-transition"
import { MultiLayerParallaxCard, FloatingElement, ParallaxText } from "@/components/parallax-hover-effects"
import { EnhancedButton } from "@/components/enhanced-hover-effects"
import { useState, useEffect } from "react"

export default function HeroParallax() {
  const [isHovered, setIsHovered] = useState(false)
  const orbControls = useAnimation()
  const gridControls = useAnimation()

  useEffect(() => {
    const springTransition = { type: "spring", stiffness: 300, damping: 15 }
    if (isHovered) {
      orbControls.start({ scale: 1.1, opacity: 0.95, transition: springTransition })
      gridControls.start({ opacity: 0.1, backgroundSize: "55px 55px", transition: springTransition })
    } else {
      orbControls.start({ scale: 1, opacity: 1, transition: springTransition })
      gridControls.start({ opacity: 0.05, backgroundSize: "50px 50px", transition: springTransition })
    }
  }, [isHovered, orbControls, gridControls])

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative z-10 px-6"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <MultiLayerParallaxCard
        className="max-w-4xl mx-auto"
        maxRotation={5}
        perspective={2000}
        layers={[
          <motion.div key="orb-1-wrapper" animate={orbControls} style={{ willChange: "transform, opacity" }}>
            <FloatingElement depth={3} floatRange={30} duration={6} className="top-0 left-0">
              <div className="w-32 h-32 bg-purple-600/20 rounded-full blur-2xl" />
            </FloatingElement>
          </motion.div>,
          <motion.div key="orb-2-wrapper" animate={orbControls} style={{ willChange: "transform, opacity" }}>
            <FloatingElement depth={2} floatRange={25} duration={8} delay={1} className="bottom-0 right-0">
              <div className="w-40 h-40 bg-pink-600/20 rounded-full blur-2xl" />
            </FloatingElement>
          </motion.div>,
          <motion.div key="orb-3-wrapper" animate={orbControls} style={{ willChange: "transform, opacity" }}>
            <FloatingElement depth={1.5} floatRange={20} duration={7} delay={2} className="top-1/2 left-1/2">
              <div className="w-24 h-24 bg-cyan-600/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
            </FloatingElement>
          </motion.div>,
          <motion.div
            key="grid-wrapper"
            className="absolute inset-0"
            animate={gridControls}
            style={{
              backgroundImage:
                "linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)",
              willChange: "opacity, background-size",
            }}
            initial={{ opacity: 0.05, backgroundSize: "50px 50px" }}
          />,
        ]}
      >
        <div className="text-center py-12">
          <ParallaxText
            text="Build smarter. Move faster. Look better."
            className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6"
            layers={4}
            maxOffset={5}
            colorShift={true}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto mb-10"
          >
            End-to-end digital services that blend form, function, and future-ready tech.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <LinkWithTransition href="/contact">
              <EnhancedButton variant="primary" color="#9333EA" glowColor="rgba(147, 51, 234, 0.7)">
                Book a strategy call
              </EnhancedButton>
            </LinkWithTransition>
            <LinkWithTransition href="/services">
              <EnhancedButton variant="secondary" color="#EC4899" glowColor="rgba(236, 72, 153, 0.7)">
                See our capabilities <ArrowRight className="w-4 h-4" />
              </EnhancedButton>
            </LinkWithTransition>
          </motion.div>
        </div>
      </MultiLayerParallaxCard>
    </motion.div>
  )
}
