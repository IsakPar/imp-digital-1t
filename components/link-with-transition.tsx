"use client"

import type React from "react"

import Link from "next/link"
import { useTransition } from "@/components/transition-provider"
import type { ReactNode } from "react"

interface LinkWithTransitionProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function LinkWithTransition({ href, children, className, onClick }: LinkWithTransitionProps) {
  const { setIsTransitioning } = useTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("http") || href.startsWith("#")) {
      if (onClick) onClick()
      return
    }

    if (href === window.location.pathname) {
      e.preventDefault()
      if (onClick) onClick()
      return
    }

    setIsTransitioning(true)
    if (onClick) onClick()
    // Default link navigation proceeds
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
