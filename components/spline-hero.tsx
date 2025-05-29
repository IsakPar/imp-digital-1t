"use client"

import { useState, useEffect } from "react"
import Spline from "@splinetool/react-spline"

export default function SplineHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  function onLoad() {
    setIsLoaded(true)
  }

  // Add error handling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setIsError(true)
      }
    }, 10000) // 10 seconds timeout

    return () => clearTimeout(timer)
  }, [isLoaded])

  if (isError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-white text-4xl">3D</span>
          </div>
          <p className="text-white/60">Interactive 3D experience</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        onLoad={onLoad}
        onError={() => setIsError(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-950">
          <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
        </div>
      )}
    </div>
  )
}
