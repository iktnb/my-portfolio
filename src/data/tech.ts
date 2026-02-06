export interface TechCategory {
  title: string
  items: string[]
}

export const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Python', 'Go', 'REST & GraphQL APIs', 'PostgreSQL'],
  },
  {
    title: 'Infrastructure',
    items: ['AWS', 'Docker', 'CI/CD', 'Terraform', 'Linux'],
  },
]
