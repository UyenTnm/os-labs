import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  title: string
  description: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background border-y border-border">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            {title}
          </h2>
          <p className="text-base text-muted-foreground font-mono">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {primaryCTA.text}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-lg font-mono text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
