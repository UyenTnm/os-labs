'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

interface AnalyticsWrapperProps {
  sectionName: string
  children: ReactNode
}

export function AnalyticsWrapper({ sectionName, children }: AnalyticsWrapperProps) {
  const { trackScroll, trackSectionView } = useAnalytics()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    trackSectionView(sectionName)
  }, [sectionName, trackSectionView])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const element = sectionRef.current
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Calculate scroll depth as a percentage
      const elementHeight = element.offsetHeight
      const elementTop = rect.top
      const elementBottom = rect.bottom

      if (elementBottom > 0 && elementTop < viewportHeight) {
        // Element is in viewport
        const visibleHeight = Math.min(elementBottom, viewportHeight) - Math.max(elementTop, 0)
        const scrollDepth = (visibleHeight / elementHeight) * 100

        if (scrollDepth > 0) {
          trackScroll(sectionName, Math.min(100, Math.round(scrollDepth)))
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionName, trackScroll])

  return <div ref={sectionRef}>{children}</div>
}
