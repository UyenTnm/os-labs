# OS LABS - Architecture & Scalability Guide

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── globals.css         # Global styles & design tokens
│   └── page.tsx            # Home page composition
├── components/
│   ├── header.tsx          # Navigation header
│   ├── footer.tsx          # Footer with links
│   ├── theme-toggle.tsx    # Dark mode toggle
│   ├── sections/           # Page sections (modular & reusable)
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── portfolio.tsx
│   │   ├── process.tsx
│   │   ├── pricing.tsx
│   │   └── contact.tsx
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── utils.ts            # Helper utilities (cn function)
└── styles/
    └── globals.css         # Additional global styles
```

## Design System

### Color Palette
- **Background**: Dark (#0a0a0a)
- **Foreground**: Light (#fafafa)
- **Accent**: Cyan/Blue (#0099ff)
- **Card**: Elevated dark (#141414)
- **Border**: Subtle dark (#2d2d2d)

### Typography
- **Font Family**: IBM Plex Mono (monospace), Geist (sans)
- **Headlines**: Light weight (300-400), monospace for tech feel
- **Body**: Regular weight, monospace accent for labels
- **Code**: Monospace throughout for consistency

### Spacing & Layout
- Desktop: 1440px max-width
- Mobile-first responsive design
- Consistent 4px/8px/16px/32px spacing scale
- Gap utilities for component spacing

## Scalability Strategy

### Adding New Pages
1. Create new file in `/app/[page]/page.tsx`
2. Reuse sections from `/components/sections/`
3. Use Header/Footer components for consistency
4. Follow same layout structure

### Adding New Sections
1. Create component in `/components/sections/`
2. Export from section file
3. Import and compose in page
4. Follow established patterns (spacing, colors, typography)

### Adding New Components
1. Create in `/components/`
2. Use design tokens from `globals.css`
3. Support light/dark mode via CSS variables
4. Keep components modular & reusable

## Customization Guide

### Changing Colors
Edit `globals.css` in the `:root` and `.dark` sections:
```css
--accent: 200 90% 56%;      /* HSL format */
--background: 0 0% 3%;
--foreground: 0 0% 98%;
```

### Changing Fonts
1. Update `layout.tsx` to import different Google Fonts
2. Add font-family to `tailwind.config.ts`
3. Apply via `font-sans` or `font-mono` classes

### Changing Spacing/Radius
Update `--radius` in `globals.css` and spacing in Tailwind config.

## Database & Backend Integration Ready

### Future Enhancements
- Contact form submission to database (Supabase/Neon)
- Blog/case studies database
- User authentication
- Admin dashboard for content management
- Analytics integration
- Email notifications

### Recommended Integrations
- **Database**: Supabase or Neon (PostgreSQL)
- **Auth**: Supabase Auth or custom with bcrypt
- **Email**: Resend or SendGrid
- **Analytics**: PostHog or Vercel Analytics
- **CMS**: Headless CMS for content management

## Performance Optimizations

- Next.js 16 with Turbopack bundler
- Image optimization via Next.js Image component
- Font optimization (preloaded fonts)
- CSS variables for zero-runtime theming
- Mobile-first responsive design
- Minimal JavaScript (mostly static)

## Deployment

1. Deploy to Vercel (one-click from GitHub)
2. Automatic environment variable setup
3. Zero-config support for integrations
4. CDN distribution for assets
5. Automatic HTTPS and security headers

## Development Workflow

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Run production build locally
pnpm start
```

## Best Practices Applied

✓ Semantic HTML with ARIA roles
✓ Mobile-first responsive design
✓ Component composition over repetition
✓ Design tokens for consistency
✓ Dark mode support
✓ Accessibility-focused
✓ Performance optimized
✓ SEO metadata
✓ Type-safe with TypeScript
✓ Clean, maintainable code structure
