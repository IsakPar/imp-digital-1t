"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Calendar, Mail, MessageSquare } from "lucide-react"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 pt-32">
      {/* Hero */}
      <section className="px-6 pb-20">
        <RevealOnScroll className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">Let's make your idea inevitable</h1>
          <p className="text-xl text-purple-200">Tell us about your project and we'll bring it to life.</p>
        </RevealOnScroll>
      </section>

      {/* Contact Form */}
      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto">
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
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium text-lg hover:from-purple-700 hover:to-pink-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                Send Message <Send className="w-5 h-5" />
              </motion.button>
            </motion.form>
          </RevealOnScroll>

          {/* Quick Actions */}
          <StaggerChildren className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="mailto:hello@impdigital.com"
              whileHover={{ y: -10, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)" }}
              className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500"
            >
              <Mail className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="font-medium text-white">Email Us</h3>
                <p className="text-sm text-purple-200">hello@impdigital.com</p>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -10, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)" }}
              className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500"
            >
              <Calendar className="w-8 h-8 text-pink-400" />
              <div>
                <h3 className="font-medium text-white">Book a Call</h3>
                <p className="text-sm text-purple-200">Schedule a consultation</p>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -10, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)" }}
              className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500"
            >
              <MessageSquare className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="font-medium text-white">Live Chat</h3>
                <p className="text-sm text-purple-200">Get instant support</p>
              </div>
            </motion.a>
          </StaggerChildren>
        </div>
      </section>
    </div>
  )
}
