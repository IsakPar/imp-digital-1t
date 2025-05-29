"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { RevealOnScroll } from "@/components/scroll-animations"
import { MultiLayerParallaxCard, FloatingElement, ParallaxText } from "@/components/parallax-hover-effects"

const testimonials = [
  {
    quote:
      "IMP Digital transformed our online presence. Their attention to detail and innovative approach exceeded our expectations.",
    author: "Sarah Johnson",
    position: "CEO, TechStart",
    color: "#9333EA", // purple-600
    avatar: "/placeholder.svg?height=100&width=100&query=avatar-sarah",
  },
  {
    quote:
      "Working with IMP was a game-changer for our business. They delivered a solution that not only looks great but performs exceptionally well.",
    author: "Michael Chen",
    position: "Marketing Director, GrowthCo",
    color: "#EC4899", // pink-500
    avatar: "/placeholder.svg?height=100&width=100&query=avatar-michael",
  },
  {
    quote:
      "The team at IMP Digital understood our vision from day one and brought it to life in ways we couldn't have imagined.",
    author: "Alex Rodriguez",
    position: "Founder, InnovateLab",
    color: "#06B6D4", // cyan-500
    avatar: "/placeholder.svg?height=100&width=100&query=avatar-alex",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 6000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-rose-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl"
        />
      </div>

      <RevealOnScroll className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-20 text-white">What Our Clients Say</h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.2, 0.05, 0.2, 1] }}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <MultiLayerParallaxCard
                className="max-w-4xl mx-auto"
                maxRotation={10}
                layers={[
                  // Background gradient
                  <div
                    key="bg-gradient"
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl"
                  />,
                  // Floating quote marks
                  <FloatingElement depth={2} floatRange={10} duration={4} className="top-8 left-8">
                    <Quote className="w-16 h-16 opacity-10" style={{ color: testimonials[current].color }} />
                  </FloatingElement>,
                  <FloatingElement depth={1.5} floatRange={15} duration={5} delay={1} className="bottom-8 right-8">
                    <Quote className="w-12 h-12 opacity-5 rotate-180" style={{ color: testimonials[current].color }} />
                  </FloatingElement>,
                  // Decorative elements
                  <FloatingElement depth={1} floatRange={5} duration={3} delay={0.5} className="top-1/2 right-4">
                    <div className="w-2 h-2 bg-white/20 rounded-full" />
                  </FloatingElement>,
                ]}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <Quote className="w-16 h-16 mb-6 opacity-20" style={{ color: testimonials[current].color }} />
                  </motion.div>

                  <ParallaxText
                    text={`"${testimonials[current].quote}"`}
                    className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed"
                    layers={2}
                    maxOffset={2}
                    colorShift={false}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 mr-4 overflow-hidden"
                    >
                      <img
                        src={testimonials[current].avatar || "/placeholder.svg"}
                        alt={testimonials[current].author}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <p className="font-medium text-white">{testimonials[current].author}</p>
                      <p className="text-purple-200">{testimonials[current].position}</p>
                    </div>
                  </motion.div>
                </div>
              </MultiLayerParallaxCard>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full mx-2 transition-colors ${
                current === index ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
