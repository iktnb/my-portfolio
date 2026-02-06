/** Icon ID from skillicons.dev - https://skillicons.dev */
export interface TechItem {
  name: string
  icon: string // skillicons.dev icon ID, e.g. 'react', 'vue'
}

export interface TechCategory {
  title: string
  items: TechItem[]
}

const icon = (name: string, id: string): TechItem => ({ name, icon: id })

export const techCategories: TechCategory[] = [
  {
    title: 'React & Ecosystem',
    items: [
      icon('React', 'react'),
      icon('TypeScript', 'ts'),
      icon('Next.js', 'nextjs'),
      icon('Vite', 'vite'),
      icon('Redux', 'redux'),
      icon('React Query', 'react'), // TanStack - use react as base
      icon('Zustand', 'react'),
      icon('React Router', 'react'),
    ],
  },
  {
    title: 'Vue & Nuxt',
    items: [
      icon('Vue 2', 'vue'),
      icon('Vue 3', 'vue'),
      icon('Nuxt 2', 'nuxtjs'),
      icon('Nuxt 3', 'nuxtjs'),
      icon('Pinia', 'pinia'),
      icon('Vuex', 'vue'),
      icon('Vue Router', 'vue'),
    ],
  },
  {
    title: 'Python & FastAPI',
    items: [
      icon('Python', 'py'),
      icon('FastAPI', 'fastapi'),
      icon('Pydantic', 'py'),
      icon('SQLAlchemy', 'py'),
      icon('Celery', 'py'),
      icon('pytest', 'py'),
      icon('Alembic', 'py'),
    ],
  },
  {
    title: 'Backend & Databases',
    items: [
      icon('Node.js', 'nodejs'),
      icon('PostgreSQL', 'postgres'),
      icon('MongoDB', 'mongodb'),
      icon('Redis', 'redis'),
      icon('REST API', 'postman'),
      icon('GraphQL', 'graphql'),
    ],
  },
  {
    title: 'DevOps & Tools',
    items: [
      icon('Docker', 'docker'),
      icon('Git', 'git'),
      icon('Linux', 'linux'),
      icon('CI/CD', 'githubactions'),
      icon('Nginx', 'nginx'),
      icon('AWS', 'aws'),
    ],
  },
  {
    title: 'Styling & Build',
    items: [
      icon('Tailwind CSS', 'tailwind'),
      icon('SASS', 'sass'),
      icon('CSS3', 'css'),
      icon('Webpack', 'webpack'),
      icon('Vite', 'vite'),
      icon('Bootstrap', 'bootstrap'),
    ],
  },
]
