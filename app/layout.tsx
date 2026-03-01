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
  icons: {
    icon: '/favicon.svg',
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
