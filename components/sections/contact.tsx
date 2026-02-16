'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

export function Contact() {
  const { trackSectionView, trackConversion } = useAnalytics()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  useEffect(() => {
    trackSectionView('contact')
  }, [trackSectionView])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Track form conversion
    trackConversion(formState)
    // Handle form submission
    console.log('Form submitted:', formState)
    setFormState({ name: '', email: '', company: '', message: '' })
  }

  return (
    <section id="contact" className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column - Info */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-accent">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
                Let's build something amazing
              </h2>
              <p className="text-base text-muted-foreground font-mono">
                Ready to start your next project? Contact us and let's discuss how we can help bring your vision to life.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-mono font-semibold text-foreground">Email</p>
                  <a
                    href="mailto:hello@oslabs.dev"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    hello@oslabs.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-mono font-semibold text-foreground">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-mono font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">Remote-first, available globally</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-8 border-t border-border/50 space-y-4">
              <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Follow Us</p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg border border-border bg-card hover:bg-secondary hover:border-accent text-foreground transition-all flex items-center justify-center"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg border border-border bg-card hover:bg-secondary hover:border-accent text-foreground transition-all flex items-center justify-center"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-mono font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-mono font-medium text-foreground mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  placeholder="Your Company"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-mono font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
