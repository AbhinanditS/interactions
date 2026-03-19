'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const element = containerRef.current
      const elementRect = element.getBoundingClientRect()
      const elementHeight = element.clientHeight
      const windowHeight = window.innerHeight

      const scrollStart = elementRect.top
      const scrollEnd = elementRect.bottom

      let calculatedProgress = 0

      if (scrollStart < windowHeight && scrollEnd > 0) {
        const visibleDistance = Math.min(windowHeight, scrollEnd) - Math.max(0, scrollStart)
        const totalDistance = windowHeight + elementHeight
        calculatedProgress = visibleDistance / totalDistance
      }

      setProgress(Math.max(0, Math.min(1, calculatedProgress)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, containerRef }
}
