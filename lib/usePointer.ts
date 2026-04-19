'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface PointerState {
  clientX: number
  clientY: number
  isActive: boolean
}

export function usePointer() {
  const [pointer, setPointer] = useState<PointerState>({
    clientX: 0,
    clientY: 0,
    isActive: false,
  })

  const latestPointerRef = useRef(pointer)
  const pendingCoordsRef = useRef<{ clientX: number; clientY: number } | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    latestPointerRef.current = pointer
  }, [pointer])

  useEffect(() => {
    const flushPointerUpdate = () => {
      rafIdRef.current = null
      if (!pendingCoordsRef.current) return

      const { clientX, clientY } = pendingCoordsRef.current
      pendingCoordsRef.current = null

      setPointer((prev) => ({
        ...prev,
        clientX,
        clientY,
        isActive: true,
      }))
    }

    const handlePointerMove = (e: PointerEvent) => {
      pendingCoordsRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
      }

      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(flushPointerUpdate)
      }
    }

    const handlePointerLeave = () => {
      pendingCoordsRef.current = null

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }

      setPointer((prev) => ({ ...prev, isActive: false }))
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  const getRelativePosition = useCallback(
    (element: HTMLElement | SVGSVGElement | null) => {
      if (!element) return { x: 0, y: 0 }

      const rect = element.getBoundingClientRect()
      const { clientX, clientY } = latestPointerRef.current

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    },
    []
  )

  return {
    pointer,
    getRelativePosition,
  }
}
