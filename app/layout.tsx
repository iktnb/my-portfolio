import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import React from 'react'
import { Exo_2, Orbitron } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import './globals.css'

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'Yurii Basiuk Portfolio',
  description: 'Full-Stack Software Engineer portfolio',
  manifest: '/favicons/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicons/favicon.ico',
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

interface RootLayoutProps {
  children: ReactNode
}

const GTM_ID = process.env.GTM_TOKEN

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body>{children}</body>
    </html>
  )
}
