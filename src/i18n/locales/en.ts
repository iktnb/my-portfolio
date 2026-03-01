export const en = {
  hero: {
    name: 'Yurii Basiuk',
    role: 'Full-Stack Software Engineer',
    tagline: 'Building products that scale.',
    cta: 'View my work',
  },
  about: {
    title: 'Why this site',
    readMore: 'Read more',
    readLess: 'Show less',
    paragraph: `This site is built to find people who want to create useful things together. Real projects, real collaboration, and real impact.

The focus here is not self-promotion. The focus is shared building: products that solve meaningful problems, improve everyday life, and make technology more human.

Inside, you will find projects, stack, and execution style so it is easy to see how we can work as one team from idea to production.

The goal is to connect with founders, engineers, designers, and product people who care about quality, speed, and long-term value.

If you believe software should do more than ship features, if you want to build products that help people and leave things better than they were, this space is for you.

Let us connect and build something that matters.`,
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
