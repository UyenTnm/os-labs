const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We understand your vision, goals, and audience through in-depth consultation and research.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We develop a comprehensive strategy that aligns with your business objectives and market needs.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Our designers create beautiful, functional designs that users love and products deliver.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build using modern technologies, best practices, and performance optimization.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Seamless deployment with testing, monitoring, and support to ensure success.',
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Ongoing optimization, analytics, and support to ensure sustained success.',
  },
]

export function Process() {
  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-20 space-y-4 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            How we work
          </h2>
          <p className="text-base text-muted-foreground font-mono">
            A proven process that delivers results consistently and keeps projects on track.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group p-8 rounded-lg border border-border bg-card hover:bg-secondary/30 hover:border-accent/50 transition-all duration-300 flex flex-col"
            >
              {/* Number */}
              <div className="text-5xl font-light text-accent/20 group-hover:text-accent/40 transition-colors mb-6">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-mono font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process timeline visualization */}
        <div className="mt-20 p-8 rounded-lg border border-border bg-secondary/20">
          <div className="text-center space-y-4">
            <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Typical project timeline
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <span className="text-muted-foreground">4–8 weeks</span>
              <span className="text-accent">→</span>
              <span className="text-foreground font-mono">Launch Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
