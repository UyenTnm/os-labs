import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-sm font-mono font-bold text-accent">OS</span>
              </div>
              <span className="text-lg font-mono font-semibold text-foreground">OS LABS</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              Premium digital solutions for ambitious brands.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-mono font-semibold text-foreground mb-4 uppercase tracking-widest">
              Navigation
            </p>
            <div className="space-y-2">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Work', href: '#portfolio' },
                { label: 'Process', href: '#process' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-sm font-mono font-semibold text-foreground mb-4 uppercase tracking-widest">
              Resources
            </p>
            <div className="space-y-2">
              {[
                { label: 'Blog', href: '/blog' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Documentation', href: '/docs' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-mono font-semibold text-foreground mb-4 uppercase tracking-widest">
              Legal
            </p>
            <div className="space-y-2">
              {[
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground font-mono">
              © {currentYear} OS LABS. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg border border-border bg-card hover:bg-secondary hover:border-accent text-foreground transition-all flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg border border-border bg-card hover:bg-secondary hover:border-accent text-foreground transition-all flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg border border-border bg-card hover:bg-secondary hover:border-accent text-foreground transition-all flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
