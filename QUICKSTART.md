# OS LABS - Quick Start Guide (5 Minutes)

## 🚀 Get Started in 5 Steps

### Step 1: Install Dependencies (30 seconds)
```bash
pnpm install
```

### Step 2: Start Development Server (10 seconds)
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the landing page!

### Step 3: Customize Your Brand (2 minutes)

**Update the title and meta:**
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'OS LABS | Premium Web Solutions',
  description: 'Your company description here',
}
```

**Update colors to match your brand:**
```css
/* app/globals.css - :root section */
--accent: 200 90% 56%;        /* Change this cyan to your color */
--background: 0 0% 3%;        /* Change background if needed */
```

**Update logo/company name:**
```tsx
// components/header.tsx - Find the Logo section
<span className="text-lg font-mono font-semibold text-foreground hidden sm:inline">
  OS LABS  {/* Change this */}
</span>
```

### Step 4: Update Content (1 minute)

**Edit services:**
```tsx
// components/sections/services.tsx
const services = [
  {
    icon: Palette,
    title: 'Your Service',  {/* Edit this */}
    description: 'Service description',  {/* Edit this */}
    features: ['Feature 1', 'Feature 2'],  {/* Edit this */}
  },
  // ... more services
]
```

**Edit pricing:**
```tsx
// components/sections/pricing.tsx
const plans = [
  {
    name: 'Starter',
    price: '$5K',  {/* Update price */}
    features: ['Feature 1', 'Feature 2'],  {/* Update features */}
  },
]
```

**Update contact info:**
```tsx
// components/sections/contact.tsx
href="mailto:hello@oslabs.dev"  {/* Change email */}
href="tel:+1234567890"  {/* Change phone */}
```

### Step 5: Deploy to Vercel (1 minute)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**That's it! Your site is live!** 🎉

---

## 📝 Common Changes

### Change Hero Heading
```tsx
// components/sections/hero.tsx
<h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground text-balance leading-[1.1]">
  Your new heading here  {/* Edit this line */}
  <span className="block bg-gradient-to-r from-accent via-accent to-blue-400 bg-clip-text text-transparent">
    and this accent
  </span>
</h1>
```

### Change Primary Color (Easy!)
Open `app/globals.css` and change the accent color:
```css
:root {
  --accent: 200 90% 56%;  /* Try: 0 100% 50% for red, 120 100% 50% for green */
}
```

### Update Navigation Links
```tsx
// components/header.tsx
const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  // Add your links here
]
```

### Add a New Section
1. Create `components/sections/my-section.tsx`
2. Copy a similar section as template
3. Import in `app/page.tsx`:
```tsx
import { MySection } from '@/components/sections/my-section'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <MySection />  {/* Add here */}
      <Footer />
    </main>
  )
}
```

---

## 🎨 Color Shortcuts

### Popular Color Values (HSL Format)

```css
/* Blues */
--accent: 200 90% 56%;    /* Cyan (current) */
--accent: 210 100% 50%;   /* Bright Blue */
--accent: 230 97% 61%;    /* Purple Blue */

/* Reds */
--accent: 0 100% 50%;     /* Pure Red */
--accent: 5 93% 55%;      /* Coral Red */

/* Greens */
--accent: 120 100% 50%;   /* Bright Green */
--accent: 160 84% 39%;    /* Teal */

/* Oranges */
--accent: 30 100% 50%;    /* Orange */
--accent: 45 93% 58%;     /* Gold */
```

---

## 📱 Preview Sizes

Test your site at these widths:
- **Mobile**: 375px (iPhone SE)
- **Tablet**: 768px (iPad)
- **Desktop**: 1440px (Full HD)
- **Large**: 1920px (Large monitor)

---

## 🔧 Environment Setup (Optional)

If you need to add backend features:

```bash
# Create .env.local file
touch .env.local

# Add your variables
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
DATABASE_URL=your_database_url
```

---

## 📚 Learning Resources

### Quick Reference
- **Colors**: Edit `app/globals.css`
- **Fonts**: Edit `app/layout.tsx`
- **Components**: Edit files in `components/`
- **Pages**: Edit files in `app/`

### File Locations
- Logo: `components/header.tsx`
- Navigation: `components/header.tsx`
- Hero text: `components/sections/hero.tsx`
- Services: `components/sections/services.tsx`
- Pricing: `components/sections/pricing.tsx`
- Contact: `components/sections/contact.tsx`

### Documentation Files
- `ARCHITECTURE.md` - Detailed structure
- `README_OSLABS.md` - Full setup guide
- `COMPONENTS_GUIDE.md` - Component reference
- `DEVELOPMENT_CHECKLIST.md` - Pre-launch checklist

---

## ✅ Before Going Live

Quick checklist:
- [ ] Update company name/email
- [ ] Update colors to match brand
- [ ] Update all service descriptions
- [ ] Update pricing
- [ ] Add your images/logo
- [ ] Test on mobile
- [ ] Deploy to Vercel
- [ ] Set up custom domain

---

## 🆘 Common Issues

### Port Already in Use
```bash
# If port 3000 is busy, use different port:
pnpm dev -- --port 3001
```

### Changes Not Showing
```bash
# Clear cache and restart:
rm -rf .next
pnpm dev
```

### Styling Looks Wrong
- Check that you have `IBM Plex Mono` font loaded
- Check browser DevTools for missing CSS
- Clear browser cache (Ctrl+Shift+Del)

### Deploy Issues
- Make sure all files are committed to Git
- Check GitHub repo is connected to Vercel
- Check environment variables are set (if needed)

---

## 🎯 Next Level

Once basic customization is done:

1. **Add Blog**: Set up headless CMS (Sanity, Contentful)
2. **Add Auth**: Integrate Supabase Auth
3. **Add Database**: Store contact form submissions
4. **Add Analytics**: Enable Vercel Analytics
5. **Add Email**: Set up Resend for notifications

See `ARCHITECTURE.md` for integration guides.

---

## 🚀 You're All Set!

Your premium website is ready. Now:
1. Customize it with your brand
2. Deploy to Vercel
3. Share with the world
4. Monitor performance
5. Iterate and improve

**Questions?** Check the detailed docs or inspect the component files - they're well-commented.

Happy building! 🎉

---

*OS LABS: Built with precision. Designed to scale. Ready for growth.*
