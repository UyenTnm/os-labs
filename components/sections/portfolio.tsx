import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack marketplace with real-time inventory management and seamless checkout.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    image: 'bg-gradient-to-br from-accent/20 to-blue-500/20',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Analytics platform with real-time data visualization and custom reporting.',
    tags: ['React', 'Chart.js', 'Design System'],
    image: 'bg-gradient-to-br from-blue-400/20 to-cyan-500/20',
  },
  {
    id: 3,
    title: 'Mobile App Design',
    category: 'Product Design',
    description: 'Native iOS/Android app with intuitive navigation and engaging user experience.',
    tags: ['Figma', 'User Research', 'Prototyping'],
    image: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  },
]

export function Portfolio() {
  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">Recent Work</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            Featured projects
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={`group flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-accent/50 transition-all duration-300 ${
                index === projects.length - 1 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Image placeholder */}
              <div className={`${project.image} h-64 flex items-center justify-center overflow-hidden relative`}>
                <div className="text-center space-y-2">
                  <div className="text-sm font-mono text-muted-foreground opacity-75">
                    {project.category}
                  </div>
                  <div className="text-2xl font-light text-foreground">View Project</div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Content */}
              <div className="flex-1 p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-mono font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
