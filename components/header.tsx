"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "Login", href: "/login" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-sm font-mono font-bold text-accent">
                OS
              </span>
            </div>
            <span className="text-lg font-mono font-semibold text-foreground hidden sm:inline">
              OS LABS
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="#contact"
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button & theme toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background">
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2.5 rounded-lg text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:bg-primary/90 transition-colors mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
