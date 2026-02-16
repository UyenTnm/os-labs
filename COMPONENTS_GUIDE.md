# OS LABS - Component Documentation & Usage Guide

## Component Hierarchy

```
App (app/page.tsx)
├── Header (components/header.tsx)
│   ├── Logo
│   ├── Navigation Links
│   └── Mobile Menu
├── Hero (components/sections/hero.tsx)
│   ├── Badge
│   ├── Main Heading
│   ├── CTA Buttons
│   └── Scroll Indicator
├── Services (components/sections/services.tsx)
│   └── ServiceCard[] (x4)
│       ├── Icon
│       ├── Title
│       ├── Description
│       └── Features List
├── Portfolio (components/sections/portfolio.tsx)
│   └── ProjectCard[] (x3)
│       ├── Image Placeholder
│       ├── Title
│       ├── Description
│       └── Tags
├── Process (components/sections/process.tsx)
│   ├── StepCard[] (x6)
│   │   ├── Number
│   │   ├── Title
│   │   └── Description
│   └── Timeline Info
├── Pricing (components/sections/pricing.tsx)
│   └── PricingCard[] (x3)
│       ├── Plan Badge
│       ├── Price
│       ├── CTA Button
│       └── Features List
├── Contact (components/sections/contact.tsx)
│   ├── Contact Info
│   │   ├── Email Card
│   │   ├── Phone Card
│   │   ├── Location Card
│   │   └── Social Links
│   └── Contact Form
│       ├── Name Input
│       ├── Email Input
│       ├── Company Input
│       ├── Message Textarea
│       └── Submit Button
├── Footer (components/footer.tsx)
│   ├── Brand Section
│   ├── Navigation Links
│   ├── Resources Links
│   ├── Legal Links
│   ├── Copyright
│   └── Social Links
└── ThemeToggle (components/theme-toggle.tsx)
```

## Section Components

### Hero Section
**File**: `components/sections/hero.tsx`

**Purpose**: Eye-catching entrance with main value proposition

**Props**: None (static content)

**Key Elements**:
- Badge label
- Large heading with gradient accent
- Subheading
- Primary and secondary CTA buttons
- Scroll indicator

**Usage**:
```tsx
<Hero />
```

**Customization**:
- Change heading text
- Update button text and links
- Modify badge text
- Adjust colors via CSS variables

---

### Services Section
**File**: `components/sections/services.tsx`

**Purpose**: Showcase service offerings

**Props**: None (data hardcoded)

**Key Elements**:
- Section header
- 4 service cards in 2x2 grid
- Each card has: icon, title, description, features list

**Usage**:
```tsx
<Services />
```

**Customization**:
```tsx
const services = [
  {
    icon: YourIcon,
    title: 'Service Name',
    description: 'Service description',
    features: ['Feature 1', 'Feature 2'],
  },
  // Add more services
]
```

**Responsive**: 
- Mobile: 1 column
- Tablet: 1 column
- Desktop: 2 columns

---

### Portfolio Section
**File**: `components/sections/portfolio.tsx`

**Purpose**: Display featured projects/work

**Props**: None (data hardcoded)

**Key Elements**:
- Section header
- 3 project cards in asymmetric grid
- Each card has: image, title, category, description, tags

**Usage**:
```tsx
<Portfolio />
```

**Customization**:
```tsx
const projects = [
  {
    id: 1,
    title: 'Project Name',
    category: 'Project Type',
    description: 'Project description',
    tags: ['Tech 1', 'Tech 2'],
    image: 'bg-gradient-to-br from-color to-color',
  },
]
```

**Responsive**:
- Mobile: 1 column
- Desktop: 2 columns with featured item spanning 2 columns

---

### Process Section
**File**: `components/sections/process.tsx`

**Purpose**: Show methodology/workflow

**Props**: None (6 hardcoded steps)

**Key Elements**:
- Section header
- 6 step cards in 3-column grid
- Timeline information box

**Usage**:
```tsx
<Process />
```

**Customization**:
```tsx
const steps = [
  {
    number: '01',
    title: 'Step Name',
    description: 'Step description',
  },
]
```

**Responsive**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

### Pricing Section
**File**: `components/sections/pricing.tsx`

**Purpose**: Display pricing tiers

**Props**: None (3 tiers hardcoded)

**Key Elements**:
- Section header
- 3 pricing cards
- Popular badge on middle card
- Feature lists with checkmarks
- CTA buttons

**Usage**:
```tsx
<Pricing />
```

**Customization**:
```tsx
const plans = [
  {
    name: 'Plan Name',
    description: 'Plan description',
    price: '$5K',
    features: ['Feature 1', 'Feature 2'],
    popular: false,
  },
]
```

**Responsive**:
- Mobile: 1 column
- Desktop: 3 columns with middle card scaled up

---

### Contact Section
**File**: `components/sections/contact.tsx`

**Props**: None (content hardcoded)

**Key Elements**:
- Left column: contact info + social links
- Right column: contact form
- Contact cards: email, phone, location
- Form fields: name, email, company, message

**Usage**:
```tsx
<Contact />
```

**Key State**:
```tsx
const [formState, setFormState] = useState({
  name: '',
  email: '',
  company: '',
  message: '',
})
```

**Customization**:
- Update contact info
- Change email/phone
- Modify form fields
- Update form handler

**Responsive**:
- Mobile: 1 column (stacked)
- Desktop: 2 columns (side by side)

---

## Reusable Component Templates

### CTA Section
**File**: `components/cta-section.tsx`

**Purpose**: Flexible call-to-action blocks

**Props**:
```tsx
interface CTASectionProps {
  title: string
  description: string
  primaryCTA: { text: string; href: string }
  secondaryCTA?: { text: string; href: string }
}
```

**Usage**:
```tsx
<CTASection
  title="Ready to start?"
  description="Let's build something amazing together"
  primaryCTA={{ text: "Get Started", href: "#contact" }}
  secondaryCTA={{ text: "Learn More", href: "/about" }}
/>
```

**Benefits**:
- Reusable across pages
- Flexible content
- Consistent styling
- Easy to customize

---

### Stats Section
**File**: `components/stats-section.tsx`

**Purpose**: Display metrics and statistics

**Props**:
```tsx
interface StatsSectionProps {
  title: string
  description?: string
  stats: Array<{
    value: string
    label: string
    description?: string
  }>
}
```

**Usage**:
```tsx
<StatsSection
  title="By The Numbers"
  stats={[
    { value: "100+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
  ]}
/>
```

**Responsive**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

---

### Testimonials Section
**File**: `components/testimonials-section.tsx`

**Purpose**: Display client feedback

**Props**:
```tsx
interface TestimonialsSectionProps {
  title: string
  description?: string
  testimonials: Array<{
    quote: string
    author: string
    title: string
    company: string
    rating?: number
  }>
}
```

**Usage**:
```tsx
<TestimonialsSection
  title="What Our Clients Say"
  testimonials={[
    {
      quote: "Great work!",
      author: "Jane Doe",
      title: "CEO",
      company: "Tech Co",
      rating: 5,
    },
  ]}
/>
```

**Features**:
- Star ratings (optional)
- Client information
- Consistent styling

---

## Layout Components

### Header
**File**: `components/header.tsx`

**Features**:
- Fixed/sticky positioning
- Mobile hamburger menu
- Navigation links
- CTA button
- Logo

**Navigation Items** (edit in file):
```tsx
const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]
```

**Customization**:
- Update logo
- Change navigation links
- Modify CTA button
- Adjust colors

---

### Footer
**File**: `components/footer.tsx`

**Features**:
- 4-column layout (brand, nav, resources, legal)
- Social media links
- Copyright notice
- Links structure

**Link Sections** (edit in file):
- Navigation (Services, Work, Process)
- Resources (Blog, Case Studies, Docs)
- Legal (Privacy, Terms, Contact)

**Customization**:
- Update company info
- Change links
- Modify social media URLs
- Update copyright info

---

## Base Components (shadcn/ui)

### Available UI Components
The project includes 50+ shadcn/ui components:

**Form Components**:
- Button
- Input
- Textarea
- Checkbox
- Radio Group
- Select
- Label
- Form

**Display Components**:
- Card
- Badge
- Alert
- Avatar
- Separator

**Navigation Components**:
- Tabs
- Navigation Menu
- Dropdown Menu
- Sheet

**And 35+ more...** See `components/ui/` directory

### Using shadcn/ui Components

```tsx
import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <Button 
      variant="default"
      size="lg"
    >
      Click Me
    </Button>
  )
}
```

---

## Component Styling Patterns

### Using Design Tokens
```tsx
// ✅ DO: Use CSS variable classes
className="bg-background text-foreground border-border"

// ❌ DON'T: Use arbitrary colors
className="bg-white text-black border-gray-300"
```

### Responsive Classes
```tsx
// ✅ DO: Mobile-first with breakpoints
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Common breakpoints:
// md: = 768px
// lg: = 1024px
// xl: = 1280px
```

### Interactive States
```tsx
// ✅ DO: Include hover/focus states
className="hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent"

// Common utilities:
// hover: - mouse over
// focus: - keyboard focus
// active: - being clicked
```

---

## Creating New Components

### Section Template
```tsx
// components/sections/new-section.tsx
interface NewSectionProps {
  // Add props if needed
}

export function NewSection({}: NewSectionProps) {
  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            Label
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            Heading
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Items here */}
        </div>
      </div>
    </section>
  )
}
```

### Component Template
```tsx
// components/my-component.tsx
interface MyComponentProps {
  title: string
  description: string
}

export function MyComponent({
  title,
  description,
}: MyComponentProps) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors">
      <h3 className="text-lg font-mono font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
```

---

## Component Best Practices

### ✅ DO

1. **Use Props for Content**
   ```tsx
   export function Card({ title, description }: CardProps) {
     return <div>{title}</div>
   }
   ```

2. **Keep Components Focused**
   - One responsibility per component
   - Reusable and composable
   - Clear props interface

3. **Use Semantic HTML**
   ```tsx
   <section className="...">
     <h2>Title</h2>
     <p>Description</p>
   </section>
   ```

4. **Apply Design Tokens**
   - Use CSS variable classes
   - Maintain consistency
   - Support dark/light modes

5. **Make Responsive**
   - Mobile-first approach
   - Use Tailwind breakpoints
   - Test all screen sizes

### ❌ DON'T

1. **Hardcode Content**
   ```tsx
   // BAD
   <div>Service Title</div>
   
   // GOOD
   <div>{service.title}</div>
   ```

2. **Use Arbitrary Values**
   ```tsx
   // BAD
   className="p-[25px] text-[#ffffff]"
   
   // GOOD
   className="p-6 text-foreground"
   ```

3. **Forget Accessibility**
   - Always add alt text to images
   - Use semantic HTML
   - Include focus states
   - Proper heading hierarchy

4. **Ignore Responsiveness**
   - Test on mobile
   - Use responsive classes
   - Consider touch targets

---

## Quick Reference

### Common Patterns

**Section Spacing**:
```tsx
className="py-32 bg-background border-t border-border"
```

**Container**:
```tsx
className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12"
```

**Grid (2 columns)**:
```tsx
className="grid grid-cols-1 md:grid-cols-2 gap-8"
```

**Grid (4 columns)**:
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
```

**Card**:
```tsx
className="p-8 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors"
```

**Button**:
```tsx
className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
```

---

**Now you have all the tools to build and scale your OS LABS website! Happy coding! 🚀**
