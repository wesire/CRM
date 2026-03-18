import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quote Flow — Simple Quote Management for Trades',
  description: 'A beautifully simple quote-tracking and follow-up platform for small UK trades and service businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 antialiased`}>{children}</body>
    </html>
  )
}
