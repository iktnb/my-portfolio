import taskflowImg from '../assets/images/taskflow.svg'
import devmetricsImg from '../assets/images/devmetrics.svg'
import cloudsyncImg from '../assets/images/cloudsync.svg'

export interface Project {
  id: 'pomodo' | 'aromacandles' | 'randomPicker'
  tech: string[]
  link: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'pomodo',
    tech: ['Node.js', 'Commander', 'chalk', 'node-notifier'],
    link: '#',
    image: taskflowImg,
  },
  {
    id: 'aromacandles',
    tech: ['React', 'Vite', 'Tailwind', 'Zustand'],
    link: '#',
    image: devmetricsImg,
  },
  {
    id: 'randomPicker',
    tech: ['Vue 3', 'Vite', 'Tailwind'],
    link: '#',
    image: cloudsyncImg,
  }
]
