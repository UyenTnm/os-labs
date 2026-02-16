import { Star } from 'lucide-react'

interface Testimonial {
  quote: string
  author: string
  title: string
  company: string
  rating?: number
}

interface TestimonialsSectionProps {
  title: string
  description?: string
  testimonials: Testimonial[]
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="py-32 bg-background border-y border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-20 space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            {title}
          </h2>
          {description && (
            <p className="text-base text-muted-foreground font-mono">{description}</p>
          )}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors space-y-6"
            >
              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>
              )}

              {/* Quote */}
              <p className="text-foreground leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border/50 space-y-1">
                <p className="text-sm font-mono font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.title} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
