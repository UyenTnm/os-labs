'use client'

import { useEffect } from 'react'
import { Code2, Palette, Zap, TrendingUp } from 'lucide-react'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

const services = [
  {
    icon: Palette,
    title: 'Web Design',
    description: 'Stunning interfaces that balance aesthetics with functionality. We create designs that convert.',
    features: ['UI/UX Design', 'Design Systems', 'Responsive Design'],
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Full-stack development with modern technologies. Fast, scalable, and production-ready.',
    features: ['React & Next.js', 'Backend APIs', 'Database Design'],
  },
  {
    icon: Zap,
    title: 'Digital Products',
    description: 'Complete product strategy, design, and development. From MVP to scale.',
    features: ['Strategy & Planning', 'MVP Development', 'Growth Optimization'],
  },
  {
    icon: TrendingUp,
    title: 'Optimization',
    description: 'Improve performance, conversions, and user experience. Data-driven improvements.',
    features: ['Performance Audit', 'A/B Testing', 'User Analytics'],
  },
]

export function Services() {
  const { trackSectionView, trackSectionClick } = useAnalytics()

  useEffect(() => {
    trackSectionView('services')
  }, [trackSectionView])

  return (
    <section id="services" className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            What we create
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl font-mono">
            From concept through execution, we handle every aspect of digital product creation.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group p-8 rounded-lg border border-border bg-card hover:bg-secondary/30 hover:border-accent/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-mono font-semibold text-foreground mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
