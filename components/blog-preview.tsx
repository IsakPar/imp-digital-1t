"use client"

import type React from "react"
import { HoverCard } from "./hover-card"
import { HoverImage } from "./hover-image"
import { HoverButton } from "./hover-button"
import { HoverLink } from "./hover-link"
import { ArrowRight } from "lucide-react"

interface BlogPost {
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  link: string
}

interface BlogPreviewProps {
  posts: BlogPost[]
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ posts }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest thoughts, tips, and industry insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <HoverCard
              key={index}
              className="bg-white rounded-xl overflow-hidden h-full flex flex-col"
              animationStyle={index % 3 === 0 ? "lift" : index % 3 === 1 ? "bounce" : "expand"}
              intensity="strong"
              withGlow
            >
              <HoverImage
                src={post.image}
                alt={post.title}
                width={600}
                height={300}
                animationStyle="zoom"
                intensity="medium"
                className="h-48 w-full"
              />
              <div className="p-6 flex-grow">
                <p className="text-sm text-gray-500 mb-2">
                  {post.date} • {post.author}
                </p>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <HoverLink
                  href={post.link}
                  animationStyle="underline"
                  intensity="strong"
                  className="font-medium inline-flex items-center"
                >
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </HoverLink>
              </div>
            </HoverCard>
          ))}
        </div>

        <div className="text-center mt-16">
          <HoverButton animationStyle="pulse" intensity="strong" withGlow withRipple className="px-8 py-4 rounded-full">
            View All Articles
          </HoverButton>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
