"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"
import LinkWithTransition from "@/components/link-with-transition"

const values = [
  {
    title: "Excellence",
    description: "We pursue perfection in every pixel and every line of code.",
  },
  {
    title: "Innovation",
    description: "We embrace cutting-edge technologies to solve complex problems.",
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients to bring their vision to life.",
  },
  {
    title: "Impact",
    description: "We create solutions that drive real business value and growth.",
  },
]

const milestones = [
  { year: "2020", event: "Founded IMP Digital Services" },
  { year: "2021", event: "Launched first enterprise solution" },
  { year: "2022", event: "Expanded to AI & automation services" },
  { year: "2023", event: "Reached 50+ successful projects" },
  { year: "2024", event: "Leading digital transformation" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 pt-32">
      {/* Hero */}
      <section className="px-6 pb-20">
        <RevealOnScroll className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">About IMP</h1>
          <p className="text-xl text-purple-200">
            We're a team of digital craftspeople obsessed with creating exceptional experiences.
          </p>
        </RevealOnScroll>
      </section>

      {/* Story */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll className="prose prose-lg mx-auto">
            <p className="text-xl text-purple-200 leading-relaxed">
              Founded with a vision to bridge the gap between cutting-edge technology and beautiful design, IMP Digital
              Services has grown from a small team of passionate developers and designers into a full-service digital
              agency that partners with ambitious companies worldwide.
            </p>
            <p className="text-xl text-purple-200 leading-relaxed mt-6">
              We believe that great digital products aren't just functional—they're delightful. Every project we
              undertake is an opportunity to push boundaries, challenge conventions, and create something that stands
              out in a crowded digital landscape.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 pb-32 bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl font-light text-center mb-16 text-white">Our Values</h2>
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-500"
              >
                <h3 className="text-2xl font-medium mb-3 text-white">{value.title}</h3>
                <p className="text-purple-200">{value.description}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-4xl font-light text-center mb-16 text-white">Our Journey</h2>
          </RevealOnScroll>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-600 via-pink-500 to-indigo-500 rounded-full hidden md:block" />

            {milestones.map((milestone, index) => (
              <RevealOnScroll
                key={milestone.year}
                direction={index % 2 === 0 ? "left" : "right"}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "pl-8"}`}>
                  <h3 className="text-2xl font-medium text-purple-400 mb-2">{milestone.year}</h3>
                  <p className="text-purple-200">{milestone.event}</p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
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

        <div className="max-w-7xl mx-auto relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl font-light text-center mb-16 text-white">Our Team</h2>
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <motion.div key={member} whileHover={{ y: -10 }} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-500"
                >
                  <Image
                    src={`/placeholder.svg?height=128&width=128&query=team-member-${member}`}
                    alt={`Team member ${member}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="font-medium text-white">Team Member</h3>
                <p className="text-sm text-purple-200">Role</p>
              </motion.div>
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
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Join our team</h2>
          <p className="text-xl text-purple-200 mb-10">We're always looking for talented people to join our team.</p>
          <LinkWithTransition href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium text-lg hover:from-purple-700 hover:to-pink-600 transition-colors shadow-lg shadow-purple-500/20"
            >
              View open positions
            </motion.button>
          </LinkWithTransition>
        </RevealOnScroll>
      </section>
    </div>
  )
}
