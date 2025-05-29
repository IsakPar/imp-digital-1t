"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code, Palette, Database, Cpu, Shield, Zap, Layers, Smartphone, Globe } from "lucide-react"
import LinkWithTransition from "@/components/link-with-transition"
import { RevealOnScroll, StaggerChildren } from "@/components/scroll-animations"
import SectionTransition from "@/components/section-transition"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900">
      {/* Hero Section */}
      <section className="pt-32 px-6 pb-20">
        <RevealOnScroll className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-gray-100 mb-6">Our Services</h1>
          <p className="text-xl text-purple-200 mb-8">
            We craft digital experiences that transform businesses and delight users. Our team of experts delivers
            end-to-end solutions tailored to your unique needs.
          </p>
          <div className="flex justify-center">
            <LinkWithTransition href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full font-medium text-white shadow-lg shadow-purple-500/20"
              >
                Start your project
              </motion.button>
            </LinkWithTransition>
          </div>
        </RevealOnScroll>
      </section>

      {/* UI/UX Design Section */}
      <SectionTransition startColor="#1e1b4b" endColor="#4c1d95" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

                {/* Design Visual Grid */}
                <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center aspect-square relative group"
                    >
                      <Palette className="w-12 h-12 text-pink-400 mb-3" />
                      <span className="text-sm text-purple-200">Color Theory</span>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-gray-900 text-white rounded-lg shadow-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="text-sm font-medium mb-1">Color Theory</div>
                        <div className="text-xs text-gray-300">
                          We apply color psychology and theory to create harmonious palettes that evoke the right
                          emotions and enhance user experience.
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900"></div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center aspect-square relative group"
                    >
                      <Layers className="w-12 h-12 text-purple-400 mb-3" />
                      <span className="text-sm text-purple-200">Wireframing</span>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-gray-900 text-white rounded-lg shadow-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="text-sm font-medium mb-1">Wireframing</div>
                        <div className="text-xs text-gray-300">
                          We create detailed wireframes to map out user flows and interface structure before moving to
                          high-fidelity designs.
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900"></div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center aspect-square relative group"
                    >
                      <Smartphone className="w-12 h-12 text-indigo-400 mb-3" />
                      <span className="text-sm text-purple-200">Responsive</span>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-gray-900 text-white rounded-lg shadow-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="text-sm font-medium mb-1">Responsive Design</div>
                        <div className="text-xs text-gray-300">
                          We ensure your design looks perfect on all devices, from mobile phones to desktop computers,
                          with fluid layouts and adaptive components.
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900"></div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center aspect-square relative group"
                    >
                      <Globe className="w-12 h-12 text-cyan-400 mb-3" />
                      <span className="text-sm text-purple-200">User Testing</span>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-gray-900 text-white rounded-lg shadow-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="text-sm font-medium mb-1">User Testing</div>
                        <div className="text-xs text-gray-300">
                          We conduct thorough user testing to validate design decisions and ensure the final product
                          meets user needs and expectations.
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900"></div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="flex flex-col">
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: "#EC489920" }}
                >
                  <Palette className="w-8 h-8 text-pink-500" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-light text-white">UI/UX Design</h2>
              </div>

              <p className="text-lg text-purple-200 mb-8">
                We create intuitive, beautiful interfaces that delight users and drive business results. Our design
                process is collaborative, research-driven, and focused on creating meaningful experiences.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "User Research & Testing",
                  "Interface Design",
                  "Design System Creation",
                  "Prototyping & Wireframing",
                  "Brand Identity",
                  "Motion Design",
                ].map((feature) => (
                  <motion.div
                    key={feature}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/15 transition-all"
                  >
                    <p className="text-purple-100">{feature}</p>
                  </motion.div>
                ))}
              </div>

              <LinkWithTransition href="/contact" className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                  style={{ backgroundColor: "#EC489920", color: "#EC4899" }}
                >
                  Design with us <ArrowRight className="w-4 h-4" />
                </motion.button>
              </LinkWithTransition>
            </RevealOnScroll>
          </div>
        </div>
      </SectionTransition>

      {/* Front-end Development Section */}
      <SectionTransition startColor="#4c1d95" endColor="#312e81" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left" className="flex flex-col md:order-2">
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: "#9333EA20" }}
                >
                  <Code className="w-8 h-8 text-purple-600" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-light text-white">Front-end Development</h2>
              </div>

              <p className="text-lg text-purple-200 mb-8">
                We build responsive, performant, and accessible front-end experiences using modern frameworks and best
                practices. Our code is clean, maintainable, and optimized for performance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "React & Next.js",
                  "Progressive Web Apps",
                  "Responsive Design",
                  "Animation & Interaction",
                  "Performance Optimization",
                  "Accessibility (WCAG)",
                ].map((feature) => (
                  <motion.div
                    key={feature}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/15 transition-all"
                  >
                    <p className="text-purple-100">{feature}</p>
                  </motion.div>
                ))}
              </div>

              <LinkWithTransition href="/contact" className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                  style={{ backgroundColor: "#9333EA20", color: "#9333EA" }}
                >
                  Build with us <ArrowRight className="w-4 h-4" />
                </motion.button>
              </LinkWithTransition>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="md:order-1">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

                {/* Code Editor Visual */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-sm text-purple-300">app.tsx</span>
                  </div>
                  <div className="p-6 font-mono text-sm">
                    <>
                      <div>
                        <span className="text-purple-400">{"import"}</span> {"{"}{" "}
                        <span className="text-white">{"useState"}</span> {"}"}{" "}
                        <span className="text-purple-400">{" from "}</span>{" "}
                        <span className="text-white">{"'react'"}</span>;
                      </div>
                      <div>&nbsp;</div>
                      <div>
                        <span className="text-purple-400">{"function "}</span>
                        <span className="text-pink-400">{"Counter"}</span>
                        <span className="text-purple-400">{"() {"}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-purple-400">{"const "}</span>
                        {"["}
                        <span className="text-white">{"count"}</span>, <span className="text-white">{" setCount"}</span>
                        {"]"} <span className="text-purple-400">{" = "}</span>
                        <span className="text-white">{"useState"}</span>(<span className="text-purple-400">0</span>);
                      </div>
                      <div>&nbsp;</div>
                      <div className="ml-4 text-purple-400">{"return ("}</div>
                      <div className="ml-8">
                        <span className="text-pink-400">{"<div"}</span>{" "}
                        <span className="text-cyan-300">{"className"}</span>
                        <span className="text-purple-400">{"="}</span>
                        <span className="text-white">{'"counter-widget"'}</span>
                        <span className="text-pink-400">{">"}</span>
                      </div>
                      <div className="ml-12">
                        <span className="text-pink-400">{"<p>"}</span>
                        <span className="text-white">{"Count: "}</span>
                        <span className="text-purple-400">{"{"}</span>
                        <span className="text-white">{"count"}</span>
                        <span className="text-purple-400">{"}"}</span>
                        <span className="text-pink-400">{"</p>"}</span>
                      </div>
                      <div className="ml-12">
                        <span className="text-pink-400">{"<button"}</span>{" "}
                        <span className="text-cyan-300">{"onClick"}</span>
                        <span className="text-purple-400">{"={"}</span>
                        <span className="text-white">{"() => setCount(count + 1)"}</span>
                        <span className="text-purple-400">{"}"}</span>
                        <span className="text-pink-400">{">"}</span>
                      </div>
                      <div className="ml-16">
                        <span className="text-white">{"Increment"}</span>
                      </div>
                      <div className="ml-12">
                        <span className="text-pink-400">{"</button>"}</span>
                      </div>
                      <div className="ml-12">
                        <span className="text-purple-400">{"{"}</span>
                        <span className="text-white">{"count > 5 "}</span>
                        <span className="text-purple-400">{"&&"}</span>
                        <span className="text-white"> </span>
                        <span className="text-pink-400">{"<p>"}</span>
                        <span className="text-white">{"Getting high!"}</span>
                        <span className="text-pink-400">{"</p>"}</span>
                        <span className="text-purple-400">{"}"}</span>
                      </div>
                      <div className="ml-8">
                        <span className="text-pink-400">{"</div>"}</span>
                      </div>
                      <div className="ml-4 text-purple-400">{");"}</div>
                      <div className="text-purple-400">{"}"}</div>
                    </>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </SectionTransition>

      {/* Back-end Development Section */}
      <SectionTransition startColor="#312e81" endColor="#581c87" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

                {/* Code Editor Visual for Backend */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-sm text-purple-300">pages/api/users.ts</span>
                  </div>
                  <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      <div>
                        <span className="text-gray-400">{"// pages/api/users.ts"}</span>
                      </div>
                      <div>
                        <span className="text-purple-400">{"import"}</span>
                        <span className="text-white">{" type { NextApiRequest, NextApiResponse } "}</span>
                        <span className="text-purple-400">{"from"}</span>
                        <span className="text-white">{" '"}</span>
                        <span className="text-cyan-300">{"next"}</span>
                        <span className="text-white">{"';"}</span>
                      </div>
                      <div>&nbsp;</div>
                      <div>
                        <span className="text-gray-400">{"// A simple in-memory store for demo"}</span>
                      </div>
                      <div>
                        <span className="text-purple-400">{"let"}</span>
                        <span className="text-white">{" users = ["}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-white">
                          {"  { id: 1, name: 'Alice Wonderland', email: 'alice@example.dev' },"}
                        </span>
                      </div>
                      <div className="ml-2">
                        <span className="text-white">
                          {"  { id: 2, name: 'Bob The Builder', email: 'bob@example.dev' },"}
                        </span>
                      </div>
                      <div>
                        <span className="text-white">{"];"}</span>
                      </div>
                      <div>&nbsp;</div>
                      <div>
                        <span className="text-purple-400">{"type"}</span>
                        <span className="text-pink-400">{" User"}</span>
                        <span className="text-white">{" = { id: number; name: string; email: string };"}</span>
                      </div>
                      <div>
                        <span className="text-purple-400">{"type"}</span>
                        <span className="text-pink-400">{" Data"}</span>
                        <span className="text-white">{" = User[] | { message: string };"}</span>
                      </div>
                      <div>&nbsp;</div>
                      <div>
                        <span className="text-purple-400">{"export default async function"}</span>
                        <span className="text-pink-400">{" handler"}</span>
                        <span className="text-white">{"("}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-white">{"req: NextApiRequest,"}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-white">{"res: NextApiResponse<Data>"}</span>
                      </div>
                      <div>
                        <span className="text-white">{") {"}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-gray-400">{"// Simulate database latency"}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-purple-400">{"await new"}</span>
                        <span className="text-pink-400">{" Promise"}</span>
                        <span className="text-white">{"(resolve => "}</span>
                        <span className="text-pink-400">{"setTimeout"}</span>
                        <span className="text-white">{"(resolve, 500));"}</span>
                      </div>
                      <div>&nbsp;</div>
                      <div className="ml-2">
                        <span className="text-purple-400">{"if"}</span>
                        <span className="text-white">{" (req."}</span>
                        <span className="text-cyan-300">{"method"}</span>
                        <span className="text-white">{" === 'GET') {"}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-pink-400">{"res.status"}</span>
                        <span className="text-white">{"(200)."}</span>
                        <span className="text-pink-400">{"json"}</span>
                        <span className="text-white">{"(users);"}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-purple-400">{"} else if"}</span>
                        <span className="text-white">{" (req."}</span>
                        <span className="text-cyan-300">{"method"}</span>
                        <span className="text-white">{" === 'POST') {"}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-purple-400">{"const"}</span>
                        <span className="text-white">{" newUser: User = { ...req."}</span>
                        <span className="text-cyan-300">{"body"}</span>
                        <span className="text-white">{", id: "}</span>
                        <span className="text-pink-400">{"Date.now"}</span>
                        <span className="text-white">{"() };"}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-white">{"users."}</span>
                        <span className="text-pink-400">{"push"}</span>
                        <span className="text-white">{"(newUser);"}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-pink-400">{"res.status"}</span>
                        <span className="text-white">{"(201)."}</span>
                        <span className="text-pink-400">{"json"}</span>
                        <span className="text-white">{"(newUser);"}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-purple-400">{"} else {"}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-pink-400">{"res.setHeader"}</span>
                        <span className="text-white">{"('Allow', ['GET', 'POST']);"}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-pink-400">{"res.status"}</span>
                        <span className="text-white">{"(405)."}</span>
                        <span className="text-pink-400">{"json"}</span>
                        <span className="text-white">{"({ message: "}</span>
                        <span className="text-white">{`\`Method \${req.method} Not Allowed\``}</span>
                        <span className="text-white">{" });"}</span>
                      </div>
                      <div className="ml-2">
                        <span className="text-white">{"}"}</span>
                      </div>
                      <div>
                        <span className="text-white">{"}"}</span>
                      </div>
                    </pre>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="flex flex-col">
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: "#06B6D420" }}
                >
                  <Database className="w-8 h-8 text-cyan-500" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-light text-white">Back-end Development</h2>
              </div>

              <p className="text-lg text-purple-200 mb-8">
                We architect robust, scalable back-end systems that power your applications. Our solutions are secure,
                efficient, and built to handle your business growth.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "API Development",
                  "Database Design",
                  "Cloud Infrastructure",
                  "Authentication & Security",
                  "Serverless Architecture",
                  "Performance Optimization",
                ].map((feature) => (
                  <motion.div
                    key={feature}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/15 transition-all"
                  >
                    <p className="text-purple-100">{feature}</p>
                  </motion.div>
                ))}
              </div>

              <LinkWithTransition href="/contact" className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                  style={{ backgroundColor: "#06B6D420", color: "#06B6D4" }}
                >
                  Engineer with us <ArrowRight className="w-4 h-4" />
                </motion.button>
              </LinkWithTransition>
            </RevealOnScroll>
          </div>
        </div>
      </SectionTransition>

      {/* Additional Services Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6">Additional Services</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Beyond our core offerings, we provide specialized services to address your unique business challenges.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StaggerChildren staggerDelay={0.1}>
              {[
                {
                  icon: <Cpu className="w-10 h-10" />,
                  title: "AI Integration",
                  description: "Leverage the power of artificial intelligence to automate processes and gain insights.",
                  color: "#06B6D4", // cyan-500
                },
                {
                  icon: <Shield className="w-10 h-10" />,
                  title: "Cybersecurity",
                  description: "Protect your digital assets with enterprise-grade security and compliance solutions.",
                  color: "#10B981", // emerald-500
                },
                {
                  icon: <Zap className="w-10 h-10" />,
                  title: "Performance Optimization",
                  description: "Improve speed, efficiency, and user experience with our optimization services.",
                  color: "#F59E0B", // amber-500
                },
              ].map((service, index) => (
                <RevealOnScroll key={service.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, boxShadow: `0 20px 25px -5px ${service.color}30` }}
                    className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-8 h-full flex flex-col"
                  >
                    <div className="mb-6" style={{ color: service.color }}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-light text-white mb-4">{service.title}</h3>
                    <p className="text-purple-200 mb-6 flex-grow">{service.description}</p>
                    <LinkWithTransition href="/contact" className="mt-auto">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center text-sm font-medium"
                        style={{ color: service.color }}
                      >
                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </LinkWithTransition>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </StaggerChildren>
          </div>
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
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">Ready to transform your digital presence?</h2>
          <p className="text-xl text-purple-200 mb-10">Let's discuss how we can help you achieve your goals.</p>
          <LinkWithTransition href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full font-medium text-lg text-white hover:from-purple-700 hover:to-pink-600 transition-colors shadow-lg shadow-purple-500/20"
            >
              Schedule a consultation
            </motion.button>
          </LinkWithTransition>
        </RevealOnScroll>
      </section>
    </div>
  )
}
