# Zilla_H3 — Avatar Creator Portfolio & Showcase

Zilla_H3 is a premium web application designed to showcase the work, custom avatar designs, texturing, accessory integrations, and commission availability for the avatar creator **Zilla_H3**.

The site features high-quality, scroll-triggered interactive experiences, blending rich animations (GSAP and Framer Motion) with a clean design system built using Next.js (App Router) and Tailwind CSS v4.

---

## 🛠️ Technology Stack

- **Core**: Next.js 16 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (configured via `@import` in CSS variables)
- **Animations**:
  - **GSAP**: For complex scroll-triggered animations (ScrollTrigger), parallax, and large page entrance timelines.
  - **Framer Motion**: For rapid micro-interactions (button hovers, card hover effects, input focus states).
- **Icons**: `react-icons`

---

## 📁 Directory Structure

```text
src/
├── app/          # View/route wrappers only (contains no page-specific inline logic)
├── components/   # UI components grouped by feature (landingPage, admin, ui)
├── services/     # App business logic, state machines, and OAuth flow handlers
├── styles/       # Global styles (globals.css, fonts.css) & custom scroll triggers
├── types/        # TypeScript declarations matching components' structure
└── utils/        # Generic reusable helper functions
```

---

## ⚙️ Development Instructions

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation
Clone the repository and install the dependencies:
```bash
pnpm install
# or
npm install
```

### Running Locally
To launch the hot-reloading development server:
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build and Compilation Check
To compile the site and run type validation:
```bash
pnpm build
# or
npm run build
```
