interface Stat {
  value: string
  label: string
  description?: string
}

interface StatsSectionProps {
  title: string
  description?: string
  stats: Stat[]
}

export function StatsSection({ title, description, stats }: StatsSectionProps) {
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

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3 p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors">
              <div className="text-4xl md:text-5xl font-light text-accent">
                {stat.value}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-mono font-semibold text-foreground">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
