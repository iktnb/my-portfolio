import taskflowImg from '../assets/images/taskflow.svg'
import devmetricsImg from '../assets/images/devmetrics.svg'
import cloudsyncImg from '../assets/images/cloudsync.svg'

export interface Project {
  title: string
  outcome: string
  description: string
  tech: string[]
  link: string
  linkLabel?: string
  image: string
}

export const projects: Project[] = [
  {
    title: 'pomodo',
    outcome: 'Pomodoro timer in the terminal',
    description:
      'CLI tool for focus: 25/5 min sessions, sound on break. Run from any folder, minimal setup.',
    tech: ['Node.js', 'Commander', 'chalk', 'node-notifier'],
    link: '#',
    linkLabel: 'GitHub',
    image: taskflowImg,
  },
  {
    title: 'aromacandles',
    outcome: 'Aromatic candles shop + builder',
    description:
      'Catalog of scented candles and a custom builder: pick wax, fragrance, size, packaging — build and order your own.',
    tech: ['React', 'Vite', 'Tailwind', 'Zustand'],
    link: '#',
    linkLabel: 'Open',
    image: devmetricsImg,
  },
  {
    title: 'random-picker',
    outcome: 'List randomizer',
    description:
      'Add options — spins the wheel and picks one. Who pays for lunch, what to watch tonight.',
    tech: ['Vue 3', 'Vite', 'Tailwind'],
    link: '#',
    linkLabel: 'Play',
    image: cloudsyncImg,
  }
]
