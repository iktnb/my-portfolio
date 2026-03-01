export const en = {
  hero: {
    name: 'Yurii Basiuk',
    role: 'Full-Stack Software Engineer',
    tagline: 'Building products that scale.',
    cta: 'View my work',
  },
  about: {
    title: 'About',
    paragraph: `I'm a full-stack engineer with a strong product mindset, focused on building systems that remain clear, reliable, and scalable as they grow. I approach development as an end-to-end responsibility that spans user experience, application logic, infrastructure, and delivery pipelines — ensuring that ideas move from concept to production without accumulating unnecessary complexity or technical debt.

My work connects product thinking with technical execution. I start by understanding business goals, user journeys, and operational constraints, then translate those insights into a pragmatic architecture and delivery plan. This includes defining milestones, surfacing risks early, and creating measurable outcomes so teams can move quickly while staying confident in what they ship. The goal is not just to deliver features, but to build a foundation that allows products to evolve without costly rewrites.

I care deeply about maintainability and long-term reliability. That means readable, well-structured code, strong typing, thoughtful abstractions, and test coverage that protects behavior without slowing development. I invest in consistent engineering standards, automated quality checks, and CI/CD workflows that make releases predictable and repeatable. Performance, accessibility, SEO fundamentals, and observability are treated as integral parts of the system, not afterthoughts, so product decisions can be guided by real data.

Across backend services, APIs, and infrastructure, I focus on designing solutions that scale operationally as well as technically — systems that are easy to reason about, monitor, and extend by other engineers. I enjoy improving developer experience through tooling, automation, and clear documentation, because fast teams depend on frictionless environments.

I collaborate closely with founders, designers, and cross-functional teams, helping translate ideas into deliverable increments while maintaining technical clarity. If you need an engineer who can take ownership from discovery through production, communicate trade-offs transparently, and deliver stable, scalable results, I'd be glad to contribute.`,
  },
  contact: {
    title: 'Get in touch',
    cta: "Let's build something together",
    buttons: {
      email: 'Email',
      telegram: 'Telegram',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
    },
  },
  projects: {
    title: 'Featured projects',
    defaultLinkLabel: 'View project',
    comingSoonTitle: 'Coming soon',
    comingSoonCta: 'Want your project to be the first one? Message me.',
    comingSoonButton: 'Message me',
    items: {
      pomodo: {
        title: 'pomodo',
        outcome: 'Pomodoro timer in the terminal',
        description:
          'CLI tool for focus: 25/5 min sessions, sound on break. Run from any folder, minimal setup.',
        linkLabel: 'GitHub',
      },
      aromacandles: {
        title: 'aromacandles',
        outcome: 'Aromatic candles shop + builder',
        description:
          'Catalog of scented candles and a custom builder: pick wax, fragrance, size, packaging - build and order your own.',
        linkLabel: 'Open',
      },
      randomPicker: {
        title: 'random-picker',
        outcome: 'List randomizer',
        description:
          'Add options - spins the wheel and picks one. Who pays for lunch, what to watch tonight.',
        linkLabel: 'Play',
      },
    },
  },
  tech: {
    title: 'Tech I work with',
    subtitle: 'Stacks and tools I use in production',
    categories: {
      reactEcosystem: 'React & Ecosystem',
      vueNuxt: 'Vue & Nuxt',
      pythonFastApi: 'Python & FastAPI',
      backendDatabases: 'Backend & Databases',
      devOpsTools: 'DevOps & Tools',
      stylingBuild: 'Styling & Build',
    },
  },
} as const
