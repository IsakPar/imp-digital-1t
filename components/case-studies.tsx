"use client"

import type React from "react"
import { HoverImage } from "./hover-image"
import { HoverButton } from "./hover-button"
import { HoverLink } from "./hover-link"
import { ArrowRight } from "lucide-react"

interface CaseStudy {
  title: string
  category: string
  description: string
  image: string
  link: string
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[]
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ caseStudies }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped our clients achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="flex flex-col h-full">
              <HoverImage
                src={study.image}
                alt={study.title}
                width={600}
                height={400}
                animationStyle={index % 3 === 0 ? "3d-tilt" : index % 3 === 1 ? "parallax" : "zoom"}
                intensity="strong"
                withOverlay
                withGlow
                className="h-64 mb-6"
                overlayContent={
                  <div className="text-white">
                    <p className="text-sm font-medium text-blue-300 mb-1">{study.category}</p>
                    <h3 className="text-xl font-bold">{study.title}</h3>
                  </div>
                }
              />
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                <p className="text-sm text-blue-600 mb-3">{study.category}</p>
                <p className="text-gray-600 mb-4">{study.description}</p>
              </div>
              <div className="mt-auto">
                <HoverLink
                  href={study.link}
                  animationStyle="shift"
                  intensity="strong"
                  className="font-medium inline-flex items-center"
                >
                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </HoverLink>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <HoverButton
            animationStyle="expand"
            intensity="strong"
            withGlow
            withRipple
            className="px-8 py-4 rounded-full"
          >
            View All Case Studies
          </HoverButton>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
