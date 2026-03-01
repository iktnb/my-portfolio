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
├── scripts/build/          # Build-time scripts (publicAssets, llms.txt)
├── public/                 # Static assets, favicon, og-cover, icons/skills
└── .github/workflows/      # Deploy to GitHub Pages
```

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
2. **Secret:** In repo **Settings → Secrets and variables → Actions**, add `NEXT_PUBLIC_SITE_URL` with your production URL (e.g. `https://www.iktnb.org`).
3. **Push:** Pushing to `main` runs the workflow: install → build (with `NEXT_PUBLIC_SITE_URL`) → deploy to `gh-pages`.

The build writes `public/CNAME` from `NEXT_PUBLIC_SITE_URL` so a custom domain works when configured in GitHub.

## License

Private project. All rights reserved.
