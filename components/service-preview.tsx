"use client"

import type React from "react"
import { HoverCard } from "./hover-card"
import { HoverButton } from "./hover-button"
import { HoverLink } from "./hover-link"
import { ArrowRight } from "lucide-react"

interface Service {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

interface ServicePreviewProps {
  services: Service[]
}

export const ServicePreview: React.FC<ServicePreviewProps> = ({ services }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a range of digital services to help your business grow and succeed online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <HoverCard
              key={index}
              className="bg-white rounded-xl p-8 h-full"
              animationStyle={index % 3 === 0 ? "lift" : index % 3 === 1 ? "3d" : "bounce"}
              intensity="strong"
              withGlow
              withBorder
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 text-blue-600">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <div className="mt-auto">
                  <HoverLink
                    href={service.link}
                    animationStyle="underline"
                    intensity="extreme"
                    withGlow
                    className="font-medium inline-flex items-center"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </HoverLink>
                </div>
              </div>
            </HoverCard>
          ))}
        </div>

        <div className="text-center mt-16">
          <HoverButton
            animationStyle="bounce"
            intensity="strong"
            withGlow
            withRipple
            className="px-8 py-4 rounded-full"
          >
            View All Services
          </HoverButton>
        </div>
      </div>
    </section>
  )
}

export default ServicePreview
