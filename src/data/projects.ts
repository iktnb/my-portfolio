export interface Project {
  title: string
  outcome: string
  description: string
  tech: string[]
  link: string
  linkLabel?: string
}

export const projects: Project[] = [
  {
    title: 'E-commerce platform',
    outcome: '40% faster checkout, 2x conversion lift',
    description:
      'Led end-to-end rebuild of checkout and inventory APIs. Introduced edge caching and optimized payment flow, reducing load time and abandoned carts.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
    link: '#',
    linkLabel: 'View project',
  },
  {
    title: 'Internal tooling dashboard',
    outcome: 'Cut support tickets by 30%',
    description:
      'Built an internal dashboard for ops and support teams to manage customers and run diagnostics without engineering involvement.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    link: '#',
    linkLabel: 'View project',
  },
  {
    title: 'Real-time collaboration API',
    outcome: 'Sub-100ms sync at scale',
    description:
      'Designed and shipped a real-time sync layer used by multiple product teams. WebSockets, conflict resolution, and horizontal scaling.',
    tech: ['Go', 'WebSockets', 'Redis', 'Kubernetes'],
    link: '#',
    linkLabel: 'View code',
  },
  {
    title: 'Developer portal & docs',
    outcome: 'Faster onboarding, fewer integration bugs',
    description:
      'Productized API documentation and self-serve key management. Search, code samples, and interactive playground.',
    tech: ['Next.js', 'MDX', 'OpenAPI', 'Vercel'],
    link: '#',
    linkLabel: 'View project',
  },
]
