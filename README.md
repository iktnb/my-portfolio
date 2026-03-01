# Yurii Basiuk — Portfolio

Personal portfolio site for **Yurii Basiuk**, Full-Stack Software Engineer. Built with Next.js, TypeScript, and Tailwind CSS. Bilingual (English / Ukrainian), SEO-friendly, and deployable to GitHub Pages.

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI:** React 19, [Motion](https://motion.dev/) (animations), [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** TypeScript
- **i18n:** Custom solution with locale-specific routes (`/` — English, `/ua/` — Ukrainian)

## Features

- **Bilingual:** EN and UA with `LanguageSwitcher` and locale-specific metadata
- **SEO:** Per-locale metadata, Open Graph, Twitter cards, JSON-LD (Person), `sitemap.xml`, `robots.txt`
- **Static export:** `output: 'export'` for hosting on GitHub Pages
- **Build automation:** Scripts generate `CNAME`, `.nojekyll`, `llms.txt`, and an SVG sprite from `public/icons/skills/*.svg`
- **Deploy:** GitHub Actions deploys `dist` to the `gh-pages` branch on push to `main`

## Project structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonts
│   ├── page.tsx            # English home
│   ├── ua/page.tsx         # Ukrainian home
│   ├── metadata.ts         # Locale metadata builder
│   ├── sitemap.ts
│   └── robots.ts
├── src/
│   ├── App.tsx             # Main client app (Hero, About, Projects, TechStack, Contact)
│   ├── components/         # UI components and shared pieces
│   ├── data/               # projects, tech, contacts
│   ├── i18n/               # locales (en, ua), translator, client provider
│   ├── seo/                # siteSeo (URLs, per-locale SEO, JSON-LD)
│   └── hooks/
├── design-system/          # Reusable design system (theme, components, icons)
├── scripts/build/          # Build-time scripts (publicAssets, llms.txt)
├── public/                 # Static assets, favicon, og-cover, icons/skills
└── .github/workflows/      # Deploy to GitHub Pages
```

### Design system

The **`design-system/`** folder contains the shared theme and UI building blocks so you can reuse the same look in another project:

- **theme.css** — Tailwind v4 tokens (colors, fonts), base styles, neon utilities
- **tokens.ts** — Same values in JS (e.g. for charts)
- **components/** — `Card`, `GlowButton`, `SectionReveal`
- **hooks/** — `useInView`
- **icons/** — SVG icons (About, Tech, Projects, Contact, Email, LinkedIn, Github, Telegram)

See **`design-system/README.md`** for how to copy and integrate this into a new project.

To use **design-system as a Git submodule** (separate repo, shared across projects), see **`design-system/SUBMODULE.md`**.

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `/ua/` for the Ukrainian version.

### Environment

For production build and SEO URLs, set:

- **`NEXT_PUBLIC_SITE_URL`** — absolute site URL (e.g. `https://www.iktnb.org`). Required; used for canonical URLs, sitemap, and Open Graph.
- **`GTM_TOKEN`** — optional; Google Tag Manager container ID (e.g. `GTM-XXXXXX`). If set, GTM script and noscript snippet are injected in the root layout.

No `.env` is committed; use `.env.local` locally and GitHub Actions secrets for deploy.

## Scripts

| Command   | Description                          |
|----------|--------------------------------------|
| `npm run dev`   | Start dev server (Next.js)           |
| `npm run build` | Static export to `dist/`             |
| `npm run deploy`| Build and push `dist` to `gh-pages`  |
| `npm run lint`  | Run ESLint                           |

## Deploy (GitHub Pages)

1. **Repository:** Enable GitHub Pages for the repo, source = branch `gh-pages` (or use the `gh-pages` branch created by the workflow).
2. **Secrets:** In repo **Settings → Secrets and variables → Actions**, add `NEXT_PUBLIC_SITE_URL` (production URL, e.g. `https://www.iktnb.org`) and optionally `GTM_TOKEN` (Google Tag Manager container ID, e.g. `GTM-XXXXXX`).
3. **Push:** Pushing to `main` runs the workflow: install → build (with `NEXT_PUBLIC_SITE_URL`) → deploy to `gh-pages`.

The build writes `public/CNAME` from `NEXT_PUBLIC_SITE_URL` so a custom domain works when configured in GitHub.

## License

Private project. All rights reserved.
