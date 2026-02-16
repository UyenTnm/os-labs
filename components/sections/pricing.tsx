import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and landing pages',
    price: '$5K',
    features: [
      'Custom web design',
      'Responsive implementation',
      '5 pages',
      'Mobile optimization',
      'SEO basics',
      '30 days of support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses and startups',
    price: '$15K',
    features: [
      'Full web application',
      'Backend integration',
      'Database design',
      'User authentication',
      'Advanced SEO',
      'Analytics setup',
      '3 months of support',
      'Monthly updates',
    ],
    cta: 'Start Project',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Complete digital transformation solutions',
    price: 'Custom',
    features: [
      'Full-stack platform',
      'Custom infrastructure',
      'Third-party integrations',
      'Team training',
      'Dedicated support',
      'Performance optimization',
      '6+ months of support',
      'Ongoing maintenance',
    ],
    cta: 'Get Proposal',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-20 space-y-4 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            Transparent pricing
          </h2>
          <p className="text-base text-muted-foreground font-mono">
            Choose the plan that fits your project scope. Custom quotes available for unique requirements.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border transition-all duration-300 p-8 ${
                plan.popular
                  ? 'border-accent bg-card ring-2 ring-accent/20 md:scale-105'
                  : 'border-border bg-card hover:border-accent/50'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-accent text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-2xl font-mono font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-light text-foreground">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-muted-foreground text-sm ml-2">starting</span>
                )}
              </div>

              {/* CTA */}
              <Link
                href="#contact"
                className={`block text-center px-6 py-3 rounded-lg font-mono text-sm font-medium mb-8 transition-colors ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border text-foreground hover:bg-secondary/50'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <div className="space-y-4 border-t border-border/50 pt-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
