# thomasc.tech

Personal portfolio website for Thomas Carr — Computer Science Ph.D. researcher specializing in ethical machine learning, privacy, and fairness at UNC Charlotte.

**Live site:** [thomasc.tech](https://thomasc.tech)

## Tech Stack

- **React 19** with Create React App
- **MUI 7** (Material UI) — custom dark theme with glass-morphism
- **Framer Motion** — scroll animations and transitions
- **tsParticles** — interactive emerald particle background (desktop only)
- **Firebase Hosting** — deployment with CDN
- **Firebase Analytics** — usage tracking
- **Formspree** + **reCAPTCHA v3** — contact form

## Getting Started

```bash
npm install
npm start       # Dev server on localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Production build to `build/` |
| `npm test` | Run tests (Jest + React Testing Library) |
| `npx eslint src/` | Lint source files |

## Project Structure

```
src/
├── App.js                          # Shell — BrowserRouter, SEO, particles, Portfolio
├── Portfolio.js                    # Main single-page component (composes all sections)
├── theme.js                        # MUI dark theme (emerald + gold palette)
├── Analytics.js                    # Firebase app initialization
├── sections/
│   ├── Hero.js                     # Full-viewport hero with name, typing, socials
│   ├── About.js                    # Education + experience timelines, skill ticker
│   ├── Stats.js                    # Animated counters (publications, projects, etc.)
│   ├── Projects.js                 # Featured research + other project cards
│   ├── Publications.js             # Publication timeline with scroll-drawing line
│   └── Contact.js                  # Expandable contact form + direct links
├── Components/
│   ├── DotNav.js                   # Fixed right-edge section navigator
│   ├── ScrollReveal.js             # IntersectionObserver scroll-triggered reveal
│   ├── AnimatedCounter.js          # Number counter with viewport trigger
│   ├── SkillTicker.js              # Auto-scrolling skill chip marquee
│   ├── TimelineDrawing.js          # Vertical timeline with scroll-drawing line
│   ├── MagneticButton.js           # Cursor-magnetic hover effect wrapper
│   ├── ParticlesFixed.js           # Global emerald particle background
│   ├── TypingAnimation.js          # Typewriter effect component
│   └── SEO.js                      # Schema.org JSON-LD via react-helmet
├── hooks/
│   ├── useScrollSpy.js             # IntersectionObserver for active section
│   ├── useMouseGlow.js             # Cursor radial gradient effect
│   └── useCountUp.js               # Animated number counter hook
└── Data/
    ├── projects.json                # Portfolio project entries
    ├── publications.json            # Academic papers
    ├── skills.json                  # Skills by category
    └── experience.json              # Work experience
```

## Design System

- **Dark glass-morphism** — semi-transparent cards, backdrop blur, subtle borders
- **Emerald** (`#10b981`) primary accent — particles, links, active states
- **Gold** (`#d4a853`) secondary accent — highlights, badges, conference chips
- **Typography:** DM Serif Display (headings) + Inter (body)
- **CSS custom properties:** `--emerald`, `--gold`, `--bg-deep`, `--mouse-x`, `--mouse-y`
- **Scroll animations:** IntersectionObserver-based reveals, timeline drawing, counter animations

## Deployment

Deployed automatically via GitHub Actions:

- **Push to `main`** — deploys to production (Firebase Hosting live channel)
- **Pull requests** — deploys to a preview channel

Firebase config is in `firebase.json`. All routes rewrite to `index.html` (SPA mode).

## Sections

| Section | Description |
|---------|-------------|
| Hero | Full-viewport intro with particles, name, typing animation, social links |
| About | Education + experience timelines, auto-scrolling skill ticker |
| Stats | Animated counters (publications, projects, years, venues) |
| Projects | Featured research cards + other project grid |
| Publications | Timeline with published papers and in-progress work |
| Contact | Expandable form + direct email/GitHub/LinkedIn links |
