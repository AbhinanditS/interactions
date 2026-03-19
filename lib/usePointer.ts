'use client'

import { useEffect, useRef, useState } from 'react'

interface PointerState {
  x: number
  y: number
  clientX: number
  clientY: number
  isActive: boolean
}

export function usePointer() {
  const [pointer, setPointer] = useState<PointerState>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    isActive: false,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPointer((prev) => ({
        ...prev,
        clientX: e.clientX,
        clientY: e.clientY,
        isActive: true,
      }))
    }

    const handleMouseLeave = () => {
      setPointer((prev) => ({
        ...prev,
        isActive: false,
      }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const getRelativePosition = (element: HTMLElement | SVGSVGElement | null) => {
    if (!element) return { x: 0, y: 0 }
    
    const rect = element.getBoundingClientRect()
    return {
      x: pointer.clientX - rect.left,
      y: pointer.clientY - rect.top,
    }
  }

  return {
    pointer,
    getRelativePosition,
  }
}
