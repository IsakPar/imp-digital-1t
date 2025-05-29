"use client"

import { useEffect, useRef, useState } from "react"
import lottie from "lottie-web"

interface LottieAnimationProps {
  animationPath: string
  height?: number
  width?: number
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export default function LottieAnimation({
  animationPath,
  height = 200,
  width = 200,
  loop = true,
  autoplay = true,
  className = "",
}: LottieAnimationProps) {
  const animationContainer = useRef<HTMLDivElement>(null)
  const anim = useRef<any>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Default animation data for fallback
    const defaultAnimData = {
      v: "5.7.8",
      fr: 30,
      ip: 0,
      op: 60,
      w: 100,
      h: 100,
      nm: "Default Animation",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "Circle",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: {
              a: 1,
              k: [
                { t: 0, s: [0], e: [360] },
                { t: 60, s: [360] },
              ],
            },
            p: { a: 0, k: [50, 50, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 0, k: [100, 100, 100] },
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "el",
                  p: { a: 0, k: [0, 0] },
                  s: { a: 0, k: [40, 40] },
                },
                {
                  ty: "st",
                  c: { a: 0, k: [0.576, 0.204, 0.922, 1] },
                  o: { a: 0, k: 100 },
                  w: { a: 0, k: 4 },
                  lc: 2,
                  lj: 2,
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0] },
                  a: { a: 0, k: [0, 0] },
                  s: { a: 0, k: [100, 100] },
                  r: { a: 0, k: 0 },
                  o: { a: 0, k: 100 },
                },
              ],
            },
          ],
        },
      ],
    }

    if (animationContainer.current) {
      try {
        // Clean up previous animation if it exists
        if (anim.current) {
          anim.current.destroy()
        }

        // Try to load the animation from path
        fetch(animationPath)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Animation file not found")
            }
            return response.json()
          })
          .then((animData) => {
            if (animationContainer.current) {
              anim.current = lottie.loadAnimation({
                container: animationContainer.current,
                renderer: "svg",
                loop,
                autoplay,
                animationData: animData,
              })
            }
          })
          .catch((err) => {
            console.warn(`Failed to load animation from ${animationPath}:`, err)
            setError(true)

            // Use default animation as fallback
            if (animationContainer.current) {
              anim.current = lottie.loadAnimation({
                container: animationContainer.current,
                renderer: "svg",
                loop,
                autoplay,
                animationData: defaultAnimData,
              })
            }
          })
      } catch (err) {
        console.error("Error initializing Lottie animation:", err)
        setError(true)
      }

      return () => {
        if (anim.current) {
          anim.current.destroy()
        }
      }
    }
  }, [animationPath, loop, autoplay])

  if (error) {
    return (
      <div style={{ height, width }} className={`flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return <div ref={animationContainer} style={{ height, width }} className={className} />
}
