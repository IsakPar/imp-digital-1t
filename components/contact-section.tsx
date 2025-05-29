"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Calendar, Mail, MessageSquare, Check } from "lucide-react"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"
import SmoothScrollCard from "@/components/smooth-scroll-card"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    message: "",
  })

  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormState("success")
      console.log("Form submitted:", formData)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState("idle")
        setFormData({
          name: "",
          email: "",
          company: "",
          project: "",
          budget: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-b from-purple-900 to-indigo-950">
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
          className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <RevealOnScroll className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-white">Let's make your idea inevitable</h2>
        <p className="text-xl text-center text-purple-200 mb-20 max-w-3xl mx-auto">
          Tell us about your project and we'll bring it to life.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RevealOnScroll>
              <motion.form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 border border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Project Type</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                    >
                      <option value="" className="bg-indigo-950">
                        Select a service
                      </option>
                      <option value="web" className="bg-indigo-950">
                        Web Development
                      </option>
                      <option value="design" className="bg-indigo-950">
                        UI/UX Design
                      </option>
                      <option value="ai" className="bg-indigo-950">
                        AI & Automation
                      </option>
                      <option value="security" className="bg-indigo-950">
                        Cybersecurity
                      </option>
                      <option value="other" className="bg-indigo-950">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-purple-200 mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                  >
                    <option value="" className="bg-indigo-950">
                      Select budget range
                    </option>
                    <option value="10-25" className="bg-indigo-950">
                      $10,000 - $25,000
                    </option>
                    <option value="25-50" className="bg-indigo-950">
                      $25,000 - $50,000
                    </option>
                    <option value="50-100" className="bg-indigo-950">
                      $50,000 - $100,000
                    </option>
                    <option value="100+" className="bg-indigo-950">
                      $100,000+
                    </option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-purple-200 mb-2">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-white"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState === "submitting"}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium text-lg hover:from-purple-700 hover:to-pink-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-70"
                >
                  {formState === "submitting" ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : formState === "success" ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </RevealOnScroll>
          </div>

          <div>
            <StaggerChildren className="space-y-6">
              <SmoothScrollCard className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0"
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-white">Email Us</h3>
                    <p className="text-purple-200">hello@impdigital.com</p>
                  </div>
                </div>
              </SmoothScrollCard>

              <SmoothScrollCard className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0"
                  >
                    <Calendar className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-white">Book a Call</h3>
                    <p className="text-purple-200">Schedule a consultation</p>
                  </div>
                </div>
              </SmoothScrollCard>

              <SmoothScrollCard className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0"
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-white">Live Chat</h3>
                    <p className="text-purple-200">Get instant support</p>
                  </div>
                </div>
              </SmoothScrollCard>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                <h3 className="font-medium text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-purple-200">
                  <p>Monday - Friday: 9am - 6pm EST</p>
                  <p>Saturday: By appointment</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </StaggerChildren>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
