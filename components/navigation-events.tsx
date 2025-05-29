"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useTransition } from "@/components/transition-provider"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsTransitioning } = useTransition()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true)
    }

    const handleRouteChangeComplete = () => {
      // Add a small delay to ensure animations complete smoothly
      setTimeout(() => {
        setIsTransitioning(false)
        // Scroll to top on page change
        window.scrollTo(0, 0)
      }, 400) // Changed from 300 to 400 for slightly longer transition
    }

    // Listen for route changes
    document.addEventListener("beforeNavigate", handleRouteChangeStart)
    document.addEventListener("afterNavigate", handleRouteChangeComplete)

    return () => {
      document.removeEventListener("beforeNavigate", handleRouteChangeStart)
      document.removeEventListener("afterNavigate", handleRouteChangeComplete)
    }
  }, [setIsTransitioning])

  // This effect runs on route changes
  useEffect(() => {
    setIsTransitioning(true)

    // Add a small delay to ensure animations complete smoothly
    setTimeout(() => {
      setIsTransitioning(false)
    }, 400) // Changed from 300 to 400 for slightly longer transition
  }, [pathname, searchParams, setIsTransitioning])

  return null
}
