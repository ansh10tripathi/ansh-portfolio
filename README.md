# Ansh Tripathi — Portfolio

Elite, animated, full-stack portfolio built with Next.js 14, Framer Motion, and TailwindCSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** TailwindCSS v3 + CSS custom properties
- **Animations:** Framer Motion + CSS keyframes
- **Particles:** Canvas 2D API (neural network topology)
- **Theming:** next-themes (dark default, light toggle)
- **Icons:** Lucide React + React Icons
- **Fonts:** Syne, DM Sans, JetBrains Mono, Outfit (Google Fonts)

## 📁 Project Structure

```
app/                    # Next.js App Router
  api/github/           # GitHub stats proxy (1hr cache)
  api/contact/          # Contact form handler (EmailJS)
  layout.tsx            # Root layout + metadata + JSON-LD
  page.tsx              # Main page orchestrator
  globals.css           # Design system CSS variables

components/
  layout/               # Navbar, Footer, ThemeToggle
  sections/             # Hero, About, Skills, Projects, etc.
  ui/                   # Reusable: CursorTrail, GlowCard, etc.
  providers/            # ThemeProvider

lib/
  constants.ts          # All data (projects, skills, etc.)
  animations.ts         # Shared Framer Motion variants
  github.ts             # GitHub API helpers
  utils.ts              # Utility functions

types/index.ts          # TypeScript interfaces
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# EmailJS (for contact form)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PRIVATE_KEY=your_private_key
```

### Setting up EmailJS:
1. Create account at [emailjs.com](https://emailjs.com)
2. Create an Email Service (Gmail recommended)
3. Create an Email Template with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Copy Service ID, Template ID, and Public Key to `.env.local`

## 📄 Resume

Place your resume PDF at:
```
public/resume/Ansh_Tripathi_Resume.pdf
```

## 🖼️ Open Graph Image

Place a 1200×630 PNG at:
```
public/images/og-image.png
```

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy — auto-deploys on every push to `main`
5. Add custom domain via Vercel dashboard → Domains

The `vercel.json` is pre-configured with:
- Mumbai region (`bom1`) for low latency in India
- Security headers (X-Frame-Options, XSS Protection)
- Resume PDF caching (24hr)

## 🎨 Design System

The "Neural Dark" design system uses CSS custom properties defined in `globals.css`:

- **Primary accent:** `#00F5FF` (electric cyan)
- **Secondary accent:** `#7C3AED` (deep violet)
- **Background:** `#050508` (near-black)
- **Glassmorphism:** `rgba(255,255,255,0.04)` + `backdrop-blur`

## ⚡ Performance

- Dynamic import for ParticleField (no SSR)
- GitHub API cached for 1 hour
- All animations use `transform` + `opacity` only
- `prefers-reduced-motion` respected
- Custom cursor disabled on touch devices

## 📝 License

MIT — Open source, feel free to fork and customize.

---

Built with 💙 by **Ansh Tripathi** · 2026
