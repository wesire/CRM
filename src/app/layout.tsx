import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quote Flow — Simple Quote Management for Trades',
  description:
    'A beautifully simple quote-tracking and follow-up platform for small UK trades and service businesses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ fontFamily: 'var(--font-inter)' }}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">{children}</body>
    </html>
  )
}
