import type { NextConfig } from 'next'
import { preparePublicAssets } from './scripts/build/publicAssets'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
}

export default async function config(phase: string): Promise<NextConfig> {
  await preparePublicAssets(phase)

  return nextConfig
}
