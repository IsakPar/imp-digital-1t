"use client"

import { type ReactNode, useEffect } from "react"

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return <>{children}</>
}
