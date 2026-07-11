# PlugPort Landing Page

> **One protocol port. Every database. Verifiable by default.**

A high-performance, animated landing page for **PlugPort** — the verifiable multi-protocol database that bridges MongoDB, SQL, and Redis with the cryptographic guarantees of MonadDb.

Built with **TanStack Start** (SSR), **React 19**, **Vite 8**, **Tailwind CSS v4**, and **GSAP** scroll-driven animations.

---

## ✨ Overview

PlugPort is a conceptual database product that accepts familiar wire protocols (MongoDB, PostgreSQL, MySQL, Redis) and translates every operation into a single verifiable document store anchored on MonadDb — providing Merkle-proof integrity for every read and write.

This project is the **official marketing landing page**, designed to showcase the product narrative through a cinematic scroll experience with:

- A **3D protocol engine scene** (Three.js / React Three Fiber) that animates as the user scrolls
- **Scroll-triggered animations** using GSAP and ScrollTrigger
- Interactive **code samples** for each wire protocol
- A **convergence diagram** illustrating how multiple protocols feed into one core
- A **Merkle tree visualization** that animates into view

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [TanStack Start](https://tanstack.com/start) (SSR) + [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [Lightning CSS](https://lightningcss.dev/) |
| **Animations** | [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| **3D** | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei) / [Three.js](https://threejs.org/) |
| **Typography** | Inter (sans) + JetBrains Mono (mono) via Google Fonts |
| **Routing** | [TanStack Router](https://tanstack.com/router) (file-based) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **UI Components** | [Radix UI](https://radix-ui.com/) primitives + [shadcn/ui](https://ui.shadcn.com/) |
| **Forms** | React Hook Form + Zod |
| **Linting** | ESLint + Prettier |
| **Deploy** | Nitro (Cloudflare Module preset) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 22.12.0
- **npm** or **bun** (optional, bunfig.toml included)

### Installation

```bash
git clone <repo-url>
cd plugport-page-main
npm install
```

### Development

Start the Vite dev server with HMR:

```bash
npm run dev
```

Opens at **http://localhost:8080** (falls back to next available port if busy).

### Production Build

```bash
npm run build
```

Outputs to `dist/` — client, SSR server, and Nitro deploy artifacts.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── landing/
│   │   ├── hero/
│   │   │   ├── hero.tsx                 # Scroll-pinned hero with 3D canvas
│   │   │   └── protocol-engine-scene.tsx # Three.js 3D protocol visualization
│   │   ├── sections/
│   │   │   ├── protocol-chaos.tsx       # "Three worlds, zero proof" — the problem
│   │   │   ├── solution.tsx             # "The port" convergence diagram
│   │   │   ├── architecture.tsx         # Four-layer architecture breakdown
│   │   │   ├── protocol-switcher.tsx    # Interactive MongoDB/SQL/Redis code tabs
│   │   │   ├── verification-engine.tsx  # Merkle tree animation
│   │   │   ├── dev-experience.tsx       # CLI walkthrough + SDK cards
│   │   │   ├── performance.tsx          # Animated counter metrics
│   │   │   ├── integrations-marquee.tsx # Infinite scrolling logo marquee
│   │   │   └── docs-cta.tsx             # Call-to-action card
│   │   ├── primitives/
│   │   │   ├── counter.tsx              # Animated number counter
│   │   │   ├── magnetic-button.tsx       # Hover-follow button
│   │   │   └── split-heading.tsx        # Character-split reveal heading
│   │   ├── background-layer.tsx         # Gradient + noise overlay
│   │   ├── nav.tsx                      # Sticky header navigation
│   │   ├── footer.tsx                   # Site footer
│   │   └── landing.tsx                  # Composes all sections
│   └── ui/                              # shadcn/ui components (accordion, button, card, etc.)
├── hooks/
│   ├── use-lenis.ts                     # Lenis smooth scroll hook
│   ├── use-mobile.tsx                   # Mobile detection
│   └── use-reduced-motion.ts            # prefers-reduced-motion hook
├── lib/
│   ├── error-capture.ts                 # Out-of-band SSR error capture
│   ├── error-page.ts                    # Fallback HTML error page
│   └── utils.ts                         # Tailwind merge utility (cn)
├── routes/
│   ├── __root.tsx                       # Root layout, SEO meta, error/404 boundaries
│   └── index.tsx                        # Home page route
├── router.tsx                           # TanStack Router setup
├── server.ts                            # SSR fetch handler with error wrapping
├── start.ts                             # TanStack Start middleware config
├── styles.css                           # Tailwind v4 + design tokens
├── routeTree.gen.ts                     # Auto-generated route tree
└── ...
```

### Key Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite + TanStack Start + Tailwind + React plugin config |
| `tsconfig.json` | TypeScript config with `@/` path alias |
| `tailwind.config.ts` | n/a — Tailwind v4 uses CSS-based config via `styles.css` |
| `components.json` | shadcn/ui component registry |

---

## 🎨 Design System

The project uses a **dark-first** design system defined in `src/styles.css` using Tailwind v4's `@theme` directive.

### Color Tokens

| Token | Value (Dark) | Usage |
|-------|-------------|-------|
| `--background` | `oklch(0.14 0.018 265)` | Page background |
| `--color-primary` | `oklch(0.62 0.19 260)` | Brand blue (#2563eb) |
| `--color-mongo` | `#10b981` | MongoDB green |
| `--color-sql` | `#60a5fa` | SQL blue |
| `--color-redis` | `#f87171` | Redis red |
| `--color-verified` | `#10b981` | Verified state green |
| `--surface` | `oklch(0.17 0.02 265)` | Card/surface backgrounds |
| `--hairline` | `oklch(1 0 0 / 8%)` | Subtle borders |

### Typography

- **Headings:** Inter, semi-bold, tight tracking
- **UI/Code:** JetBrains Mono, uppercase with letter-spacing
- **Body:** Inter, regular, muted foreground

### Animation Philosophy

- **Scroll-driven:** GSAP ScrollTrigger powers all reveal animations
- **Progressive disclosure:** Content fades, slides, and scales into view
- **Reduced motion:** Respects `prefers-reduced-motion` via `useReducedMotion` hook
- **Smooth scrolling:** Lenis provides the smooth scroll physics

---

## 🧩 Key Components

### Hero (`hero.tsx`)

A scroll-pinned hero section spanning 420vh. As the user scrolls:
1. A 3D scene (Three.js) animates protocol particles converging
2. A beat timeline tracks progress through 7 story beats
3. The headline, subtitle, and CTA morph toward the pin's end

### Protocol Switcher (`protocol-switcher.tsx`)

Interactive code comparison between MongoDB, SQL, and Redis drivers. Each tab shows:
- A syntax-highlighted code snippet for the protocol
- A response panel showing the returned `state_root`, protocol info, latency, and verification status

### Verification Engine (`verification-engine.tsx`)

Animated SVG Merkle Patricia Trie that draws edges and scales in nodes as it scrolls into view. Demonstrates how PlugPort commits every operation into a cryptographic state tree.

### Convergence Diagram (`solution.tsx`)

SVG-based diagram showing three protocol pucks (mongo, sql, redis) with animated dashed wires converging into a central core — illustrating the "one port, every protocol" concept.

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite dev` | Start dev server with HMR |
| `build` | `vite build` | Production build + Nitro deploy artifacts |
| `build:dev` | `vite build --mode development` | Development-mode build |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Lint all source files |
| `format` | `prettier --write .` | Format all files with Prettier |

---

## 🌐 Deployment

The project is configured for deployment via **Nitro** with the **Cloudflare Module** preset. The build pipeline:

1. `vite build` compiles the client, SSR server, and Nitro artifacts
2. Nitro generates a `wrangler.json` for Cloudflare Workers deployment
3. Use `npx nitro deploy --prebuilt` to deploy to Cloudflare

The server entry point (`src/server.ts`) wraps TanStack Start's server entry with SSR error handling, detecting h3-swallowed exceptions and serving a fallback error page when needed.

---

## 🔧 Configuration

### Vite Config (`vite.config.ts`)

Standard TanStack Start setup with:
- `@tanstack/react-start/plugin/vite` — TanStack Start SSR plugin
- `@vitejs/plugin-react` — React Fast Refresh
- `@tailwindcss/vite` — Tailwind CSS v4 JIT engine
- `vite-tsconfig-paths` — `@/` alias resolution
- Lightning CSS transformer for optimized CSS
- React module deduplication to avoid hook mismatch errors

### Server (`server.ts`)

Custom SSR fetch handler that imports `@tanstack/react-start/server-entry` and wraps responses with catastrophic error detection (catches h3-swallowed 500s that would otherwise return opaque JSON).

### Start Middleware (`start.ts`)

TanStack Start middleware layer that catches request handler errors and returns a styled HTML error page instead of a raw 500 JSON response.

---

## 🧪 Error Handling

- **Client-side errors:** Caught by TanStack Router's `errorComponent` in `__root.tsx`
- **404s:** Custom `notFoundComponent` with "This page isn't in the port map" messaging
- **SSR errors:** Captured via `error-capture.ts` and normalized by `server.ts` into a user-friendly error page
- **Request middleware errors:** Caught in `start.ts` and rendered as HTML error pages

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

See the `LICENSE` file for details.

---

<div align="center">
  <sub>Built with ❤️ for the PlugPort team</sub>
</div>
