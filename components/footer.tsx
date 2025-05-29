"use client"

import type React from "react"
import Link from "next/link"
import PlayfulLink from "@/components/playful-link"
import PlayfulButton from "@/components/playful-button"

export default function Footer() {
  const LinkWithTransition = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <Link href={href} passHref>
      {children}
    </Link>
  )

  return (
    <footer className="bg-gradient-secondary text-primary py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text-vibrant">IMP</h3>
            <p className="text-secondary">Premium digital services for forward-thinking companies.</p>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-primary">Services</h4>
            <ul className="space-y-2 text-secondary">
              <li>
                <PlayfulLink href="/services" animation="bounce" color="#9333EA" intensity="strong">
                  Web Development
                </PlayfulLink>
              </li>
              <li>
                <PlayfulLink href="/services" animation="elastic" color="#9333EA" intensity="strong">
                  UI/UX Design
                </PlayfulLink>
              </li>
              <li>
                <PlayfulLink href="/services" animation="wobble" color="#9333EA" intensity="strong">
                  AI & Automation
                </PlayfulLink>
              </li>
              <li>
                <PlayfulLink href="/services" animation="neon" color="#9333EA" intensity="strong">
                  Cybersecurity
                </PlayfulLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-secondary">
              <li>
                <PlayfulLink href="/about" animation="bounce" color="#9333EA" intensity="strong">
                  About
                </PlayfulLink>
              </li>
              <li>
                <PlayfulLink href="/portfolio" animation="elastic" color="#9333EA" intensity="strong">
                  Portfolio
                </PlayfulLink>
              </li>
              <li>
                <PlayfulLink href="/contact" animation="wobble" color="#9333EA" intensity="strong">
                  Contact
                </PlayfulLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-primary">Let's connect</h4>
            <LinkWithTransition href="/contact">
              <PlayfulButton
                variant="primary"
                animation="extreme"
                color="#EC4899"
                glowColor="rgba(236, 72, 153, 0.7)"
                intensity="strong"
              >
                Start a project
              </PlayfulButton>
            </LinkWithTransition>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-purple-800 pt-8 text-center text-secondary">
          <p>&copy; 2024 IMP Digital Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
