import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CosmicBadge from '@/components/CosmicBadge'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'Finovate360 - Enterprise Management Platform',
  description: 'Complete business management solution with RBAC, client management, inventory, invoicing, and quotations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body>
        <SessionProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <CosmicBadge bucketSlug={bucketSlug} />
        </SessionProvider>
      </body>
    </html>
  )
}