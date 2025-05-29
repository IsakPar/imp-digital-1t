"use client"

import { type ReactNode, createContext, useContext, useState } from "react"

interface TransitionContextType {
  isTransitioning: boolean
  setIsTransitioning: (value: boolean) => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  setIsTransitioning: () => {},
})

export const useTransition = () => useContext(TransitionContext)

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>{children}</TransitionContext.Provider>
  )
}
