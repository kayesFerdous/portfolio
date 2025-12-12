# Fardows Alam Kayes - Portfolio

A lightweight, animated full-stack developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features oversized condensed typography, 3D animated blob, glass UI elements, and smooth horizontal scrolling.

## 🚀 Features

- **Oversized Condensed Hero** with ultra-compressed display typography
- **3D Morphing Blob** using React Three Fiber with iridescent materials
- **Vertical Grid Background** with subtle column lines across viewport
- **Glass Bottom Pill Navigation** with backdrop blur and active indicators
- **Horizontal Scroll Section** with pinned GPU-accelerated transforms
- **Scrollytelling (Cinematic Reveal)** with scroll-triggered scene transitions
- **Corner Marks** with minimal SVG decorative elements
- **Project Showcase** with filtering (Frontend/Backend/AI/Full Stack) and search
- **Scroll Reveal Animations** using Framer Motion with optimized performance
- **About Page** with timeline, skills visualization, and professional summary
- **Contact Form** with serverless API route and optimistic UI
- **Mobile-First Responsive Design** with touch-friendly interactions
- **Dark Theme** with cyan/teal accents and glass morphism effects
- **SEO Optimized** with proper meta tags and structured data
- **Performance Focused** with lazy loading and code splitting
- **Blog Section** with MDX support, animated components, and advanced discovery features

## 🛠️ Tech Stack

- **Framework:** Next.js 15+ (React 19+ with TypeScript)
- **Styling:** Tailwind CSS v4 (utility-first, mobile-first)
- **Animations:** Framer Motion
- **3D Graphics:** React Three Fiber, @react-three/drei
- **Typed Text:** Typed.js
- **Deployment:** Vercel
- **Package Manager:** pnpm (fallback to npm/yarn)

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Getting Started

1. **Clone the repository:**

\`\`\`bash
git clone https://github.com/kayesFerdous/portfolio.git
cd portfolio
\`\`\`

2. **Install dependencies:**

\`\`\`bash
pnpm install
# or
npm install
# or
yarn install
\`\`\`

3. **Run development server:**

\`\`\`bash
pnpm dev
# or
npm run dev
# or
yarn dev
\`\`\`

4. **Open in browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── about/              # About page with timeline & skills
│   ├── contact/            # Contact page with form
│   ├── projects/           # Projects listing and detail pages
│   │   └── [slug]/        # Dynamic project detail pages
│   ├── blog/               # Blog listing and detail pages
│   │   ├── posts/          # Blog post MDX files
│   │   ├── api/            # Blog-related API routes
│   │   ├── globals.css     # Blog-specific styles
│   │   ├── layout.tsx      # Blog layout with navigation
│   │   └── page.tsx        # Blog homepage with tag constellation and story card grid
│   ├── api/
│   │   └── contact/       # Serverless contact form endpoint
│   ├── globals.css        # Global styles and design tokens
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Homepage with hero
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── animated-nav.tsx   # Sticky navigation with animations
│   ├── hero.tsx           # Hero section with terminal
│   ├── project-card.tsx   # Project card with hover effects
│   ├── timeline.tsx       # Animated timeline
│   ├── hero-blob.tsx      # 3D animated blob
│   ├── bottom-pill-nav.tsx # Glass bottom pill navigation
│   ├── horizontal-scroll-section.tsx # Horizontal scroll section
│   ├── corner-marks.tsx   # Corner marks
│   ├── scroll-cinematic.tsx # Scrollytelling component
│   ├── blog/
│   │   ├── tag-constellation.tsx # Interactive tag constellation
│   │   ├── reader-panel.tsx      # Article reader with controls
│   │   ├── storyboard.tsx        # Story card grid
│   │   └── blog-discovery.tsx  # Blog discovery components
│   └── ...                # Other components
├── data/
│   ├── projects.ts        # Project data
│   ├── skills.ts          # Skills data
│   ├── timeline.ts        # Timeline events
│   ├── cinematic-scenes.ts # Scrollytelling scene data
│   └── blog.ts            # Blog post data
├── types/
│   └── index.ts           # TypeScript type definitions
└── public/                # Static assets and images
\`\`\`

## 📝 Customization

### Update Personal Information

Edit the files in the `data/` directory:

**Projects (`data/projects.ts`):**

\`\`\`typescript
export const projects: Project[] = [
  {
    slug: "your-project-slug",
    title: "Your Project Title",
    shortDescription: "Brief description",
    fullDescription: "Detailed description",
    category: ["Frontend"], // or "Backend", "AI", "Full Stack"
    tech: ["Next.js", "TypeScript", "etc"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    imageUrl: "/path/to/image.jpg",
    responsibilities: ["List", "of", "responsibilities"],
    featured: true, // Show on homepage
  },
  // Add more projects...
]
\`\`\`

**Skills (`data/skills.ts`):**

\`\`\`typescript
export const skills: Skill[] = [
  { name: "React", category: "frontend", level: 90 },
  { name: "Python", category: "backend", level: 85 },
  // Add more skills...
]
\`\`\`

**Timeline (`data/timeline.ts`):**

\`\`\`typescript
export const timeline: TimelineEvent[] = [
  {
    year: "2026",
    title: "Your Event",
    organization: "Organization Name",
    description: "Event description",
    type: "education", // or "work", "involvement"
  },
  // Add more events...
]
\`\`\`

**Scrollytelling Scenes (`data/cinematic-scenes.ts`):**

\`\`\`typescript
export const cinematicScenes = [
  {
    title: "Scene Title",           // Large condensed headline
    subtitle: "Optional subtitle",  // Supporting text
    visual: <YourComponent />,      // Optional React component or element
    action: {                       // Optional CTA button
      label: "Button Text",
      href: "/destination"
    }
  },
  // Add more scenes...
]
\`\`\`

**Blog Posts (`data/blog.ts`):**

\`\`\`typescript
export const blogPosts: BlogPost[] = [
  {
    slug: "your-post-slug",
    title: "Your Post Title",
    date: "2024-12-15",
    tags: ["React", "TypeScript", "Tutorial"],
    readingTime: 8,
    coverImage: "/blog/your-cover.jpg",
    excerpt: "A brief description of your post that appears in previews",
  },
  // Add more blog posts...
]
\`\`\`

**Example: Adding a new scene**

\`\`\`typescript
{
  title: "New Achievement",
  subtitle: "Celebrating a milestone in my development journey",
  visual: (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass p-6 rounded-lg">
        <h3 className="text-primary">Metric 1</h3>
        <p className="text-2xl font-bold">100+</p>
      </div>
      <div className="glass p-6 rounded-lg">
        <h3 className="text-primary">Metric 2</h3>
        <p className="text-2xl font-bold">50+</p>
      </div>
    </div>
  ),
  action: {
    label: "Learn More",
    href: "/about"
  }
}
\`\`\`

### Update Contact Information

Edit personal details in:
- `components/about-hero.tsx`
- `components/contact-info.tsx`
- `components/footer.tsx`

### Customize Theme

Edit design tokens in `app/globals.css`:

\`\`\`css
:root {
  --primary: oklch(0.75 0.15 195); /* Cyan accent */
  --background: oklch(0.125 0.01 240); /* Dark blue-gray */
  /* ... other tokens */
}
\`\`\`

## 🔌 Contact Form Integration

### Current Setup (Development)

The contact form currently logs submissions to the Vercel function console.

### Production Options

#### Option 1: SMTP Email (Recommended)

Add environment variables to your Vercel project:

\`\`\`
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
\`\`\`

Update `app/api/contact/route.ts` to use Nodemailer:

\`\`\`typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: process.env.CONTACT_EMAIL,
  subject: `Portfolio Contact: ${name}`,
  text: message,
  replyTo: email,
})
\`\`\`

#### Option 2: FastAPI Backend

Update `app/api/contact/route.ts`:

\`\`\`typescript
const response = await fetch('https://your-fastapi-backend.com/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
})
\`\`\`

#### Option 3: Third-Party Services

- Resend (resend.com)
- SendGrid
- Mailgun
- Postmark

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**

\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Connect to Vercel:**

- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel will automatically detect Next.js and configure build settings

3. **Add Environment Variables** (if using contact form with SMTP):

Go to Project Settings → Environment Variables in Vercel dashboard

### Build for Production Locally

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## ⚡ Performance

- **Lazy Loading:** Images and heavy components (3D blob) are lazy-loaded
- **Code Splitting:** Dynamic imports for non-critical components
- **Optimized Animations:** GPU-accelerated transforms, respects `prefers-reduced-motion`
- **3D Graphics:** Lazy loaded with SSR disabled, hidden on mobile
- **Horizontal Scroll:** Uses `will-change: transform` for smooth 60fps
- **Bundle Size:** Minimal runtime dependencies
- **Image Optimization:** Next.js Image component with WebP/AVIF
- **Static Generation:** All blog posts use `getStaticProps` for optimal performance
- **Lazy Images:** Cover images lazy-load with Next.js Image component
- **Code Splitting:** MDX and syntax highlighting are dynamically imported
- **Search:** Client-side filtering with no backend required

## 📱 Responsive Behavior

- **Hero:** Condensed text scales down on mobile
- **3D Blob:** Hidden on mobile devices (displays gradient instead)
- **Bottom Pill Nav:** Hidden on mobile (top nav shown)
- **Horizontal Scroll:** Becomes vertical stack on mobile
- **Grid Background:** Maintains across all screen sizes
- **Corner Marks:** Scales proportionally
- **Blog Section:** Responsive layout with tag constellation and story card grid

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios (WCAG AA compliant)
- Skip-to-content link
- Focus indicators
- **Reduced Motion:** All animations respect `prefers-reduced-motion`

## 🎬 Scrollytelling (Scroll Cinematic Reveal)

The portfolio features a professional scrollytelling experience that creates a cinematic narrative as users scroll. On desktop, scenes are pinned horizontally while scrolling vertically. On mobile, scenes stack vertically with simple reveal animations.

### Features

- **Pinned Horizontal Scrolling** on desktop (scenes slide left as you scroll down)
- **Vertical Stacking** on mobile for accessibility
- **Progress Indicator** with glass pill navigation showing current scene
- **Keyboard Navigation** using arrow keys to jump between scenes
- **Screen Reader Support** with ARIA labels and live regions
- **Reduced Motion Compliance** automatically falls back to simple animations

### Editing Scenes

Scenes are configured in `app/page.tsx`. Each scene can contain:

\`\`\`typescript
const cinematicScenes = [
  {
    title: "Scene Title",           // Large condensed headline
    subtitle: "Optional subtitle",  // Supporting text
    visual: <YourComponent />,      // Optional React component or element
    action: {                       // Optional CTA button
      label: "Button Text",
      href: "/destination"
    }
  },
  // Add more scenes...
]
\`\`\`

**Example: Adding a new scene**

\`\`\`typescript
{
  title: "New Achievement",
  subtitle: "Celebrating a milestone in my development journey",
  visual: (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass p-6 rounded-lg">
        <h3 className="text-primary">Metric 1</h3>
        <p className="text-2xl font-bold">100+</p>
      </div>
      <div className="glass p-6 rounded-lg">
        <h3 className="text-primary">Metric 2</h3>
        <p className="text-2xl font-bold">50+</p>
      </div>
    </div>
  ),
  action: {
    label: "Learn More",
    href: "/about"
  }
}
\`\`\`

### Customization Options

**In `app/page.tsx`:**

\`\`\`typescript
<ScrollCinematic 
  scenes={cinematicScenes}
  heightMultiplier={3.5}      // How much scroll height (3.5 = 3.5x viewport height)
  progressIndicator={true}     // Show/hide progress dots
/>
\`\`\`

**Tuning scroll timing:**
- Increase `heightMultiplier` (e.g., 4 or 5) for slower, more dramatic scene transitions
- Decrease `heightMultiplier` (e.g., 2.5 or 3) for faster pacing

**Disabling scrollytelling:**

To remove the feature entirely, delete or comment out the `<ScrollCinematic>` import and component in `app/page.tsx`:

\`\`\`typescript
// Remove these lines:
// import { ScrollCinematic } from "@/components/scroll-cinematic"
// <ScrollCinematic scenes={cinematicScenes} ... />
\`\`\`

### Mobile Behavior

On screens smaller than 768px or when `prefers-reduced-motion` is enabled:
- Pinning is disabled
- Scenes stack vertically
- Simple fade-up animations replace complex motion
- Progress indicator is hidden
- Keyboard navigation is disabled

### Performance

- Uses GPU-accelerated transforms (`translateX`, `opacity` only)
- Implements `will-change` hints for smooth 60fps
- Respects `contain: paint` for layout optimization
- No layout thrashing (avoids reflow/repaint)

### Accessibility

- `role="region"` and `aria-label` on pinned container
- `aria-live="polite"` announces scene changes to screen readers
- Keyboard navigation with arrow keys (↑↓ or ←→)
- All interactive elements are keyboard accessible
- Fully compatible with `prefers-reduced-motion`

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contact

Fardows Alam Kayes
- Email: kayesfardows@gmail.com
- GitHub: [@kayesFerdous](https://github.com/kayesFerdous)
- LinkedIn: [kayees-ferdous](https://linkedin.com/in/kayees-ferdous)
- Website: [kayees.me](https://kayees.me)

---

Built with ❤️ using Next.js, TypeScript, Framer Motion, and React Three Fiber
