"use client"

import { motion } from "framer-motion"
import { Code, Palette, Cpu, Shield, ArrowRight } from "lucide-react"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"
import LinkWithTransition from "@/components/link-with-transition"
import SmoothScrollCard from "@/components/smooth-scroll-card"

const services = [
  {
    icon: Code,
    title: "Web & App Development",
    description:
      "From concept to deployment, we build scalable, performant applications using cutting-edge technologies.",
    features: [
      "Next.js & React Development",
      "Progressive Web Apps",
      "API Design & Integration",
      "Real-time Applications",
      "E-commerce Solutions",
      "Cloud Infrastructure",
    ],
    color: "#9333EA", // purple-600
  },
  {
    icon: Palette,
    title: "UI/UX & Design Systems",
    description: "We craft intuitive, beautiful interfaces that delight users and drive business results.",
    features: [
      "User Research & Testing",
      "Interface Design",
      "Design System Creation",
      "Prototyping & Wireframing",
      "Brand Identity",
      "Motion Design",
    ],
    color: "#EC4899", // pink-500
  },
  {
    icon: Cpu,
    title: "Automation & AI Integration",
    description: "Leverage the power of AI and automation to transform your business operations.",
    features: [
      "Custom AI Solutions",
      "Process Automation",
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics",
    ],
    color: "#06B6D4", // cyan-500
  },
  {
    icon: Shield,
    title: "Cybersecurity & Infrastructure",
    description: "Protect your digital assets with enterprise-grade security and robust infrastructure.",
    features: [
      "Security Audits",
      "Penetration Testing",
      "Infrastructure Design",
      "DevOps & CI/CD",
      "Cloud Security",
      "Compliance & GDPR",
    ],
    color: "#10B981", // emerald-500
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 bg-gradient-to-b from-indigo-950 to-purple-900">
      <RevealOnScroll className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-white">Our Services</h2>
        <p className="text-xl text-center text-purple-200 mb-20 max-w-3xl mx-auto">
          End-to-end digital solutions that drive real business value and transform your online presence.
        </p>

        <StaggerChildren className="space-y-24">
          {services.map((service, index) => (
            <div key={service.title} className="relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"} className="h-full flex flex-col">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="w-20 h-20 mb-8 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <service.icon className="w-10 h-10" style={{ color: service.color }} />
                    </motion.div>

                    <h3 className="text-3xl md:text-4xl font-light mb-4 text-white">{service.title}</h3>
                    <p className="text-lg text-purple-200 mb-8">{service.description}</p>

                    <LinkWithTransition href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: `0 10px 25px -5px ${service.color}50` }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all mt-auto"
                        style={{
                          backgroundColor: `${service.color}20`,
                          color: service.color,
                        }}
                      >
                        Let's build it <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </LinkWithTransition>
                  </RevealOnScroll>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} delay={0.2}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <SmoothScrollCard
                          key={feature}
                          index={featureIndex}
                          direction={index % 2 === 0 ? "right" : "left"}
                          className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10"
                        >
                          <p className="text-purple-100">{feature}</p>
                        </SmoothScrollCard>
                      ))}
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </RevealOnScroll>
    </section>
  )
}
