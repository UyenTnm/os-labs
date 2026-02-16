'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

export function Hero() {
  const { trackSectionView, trackSectionClick } = useAnalytics()

  useEffect(() => {
    trackSectionView('hero')
  }, [trackSectionView])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground border border-border rounded-full px-4 py-2">
              Productized service studio
            </span>
          </div>

          {/* Main heading */}
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground text-balance leading-[1.1]">
              Digital solutions crafted with
              <span className="block bg-gradient-to-r from-accent via-accent to-blue-400 bg-clip-text text-transparent">
                precision
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-mono leading-relaxed">
            We design, build, and scale digital products for ambitious brands. From concept to production, we deliver world-class web experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="#services"
              onClick={() => trackSectionClick('hero', 'explore-services')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              onClick={() => trackSectionClick('hero', 'get-in-touch')}
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-lg font-mono text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16 text-muted-foreground">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-xs font-mono uppercase tracking-wider">Scroll to explore</span>
              <div className="w-5 h-8 border border-muted rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-1.5 bg-muted-foreground rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
