"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"
import LinkWithTransition from "@/components/link-with-transition"
import SmoothScrollCard from "@/components/smooth-scroll-card"

const blogPosts = [
  {
    title: "The Future of AI in Web Development",
    excerpt: "How artificial intelligence is transforming the way we build and interact with websites.",
    date: "May 15, 2023",
    author: "Alex Johnson",
    image: "/placeholder.svg?height=400&width=600&query=ai-web-development",
    color: "#9333EA", // purple-600
  },
  {
    title: "Optimizing Performance for Modern Web Apps",
    excerpt: "Strategies and techniques to ensure your web application loads quickly and runs smoothly.",
    date: "April 22, 2023",
    author: "Sarah Chen",
    image: "/placeholder.svg?height=400&width=600&query=web-performance-optimization",
    color: "#EC4899", // pink-500
  },
  {
    title: "Designing for Accessibility: A Comprehensive Guide",
    excerpt: "Best practices for creating inclusive digital experiences that work for everyone.",
    date: "March 10, 2023",
    author: "Michael Rodriguez",
    image: "/placeholder.svg?height=400&width=600&query=accessibility-design",
    color: "#06B6D4", // cyan-500
  },
]

export default function BlogTeaser() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-indigo-900 to-purple-900 relative overflow-hidden">
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
          className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-3xl"
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
          className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <RevealOnScroll className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-white">Latest Insights</h2>
        <p className="text-xl text-center text-purple-200 mb-20 max-w-3xl mx-auto">
          Thoughts on design, automation, and performance from our team of experts.
        </p>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <SmoothScrollCard
              key={post.title}
              index={index}
              direction={index % 2 === 0 ? "left" : "right"}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-lg h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${post.color}40`,
                      color: "white",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <h3 className="text-xl font-medium mb-3 text-white">{post.title}</h3>
                <p className="text-purple-200 mb-4">{post.excerpt}</p>
                <p className="text-sm text-purple-300">By {post.author}</p>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <LinkWithTransition href="/blog">
                  <motion.div
                    className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Read more <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </LinkWithTransition>
              </div>
            </SmoothScrollCard>
          ))}
        </StaggerChildren>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <RevealOnScroll direction="left">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
              <h3 className="text-2xl font-medium mb-4 text-white">Subscribe to our newsletter</h3>
              <p className="text-purple-200 mb-6">
                Get the latest insights on design, automation, and performance delivered to your inbox.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-white font-medium"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <LinkWithTransition href="/blog">
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-medium mb-4 text-white">Explore all articles</h3>
                  <p className="text-purple-200">
                    Browse our complete collection of articles, tutorials, and case studies.
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.div
                    className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    View all <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            </LinkWithTransition>
          </RevealOnScroll>
        </div>
      </RevealOnScroll>
    </section>
  )
}
