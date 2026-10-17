import '@picocss/pico/css/pico.min.css'
import './globals.css'

import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import { PageShell } from '@/components/templates/PageShell'
import { siteContent } from '@/content/site.content'
import { currentExperience, githubWidget } from '@/lib/data'
import { siteUrl } from '@/lib/site-url'

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteContent.name, template: `%s — ${siteContent.name}` },
  description: `${siteContent.name}, ${siteContent.role}. Projects, experience and education.`,
  openGraph: { type: 'website', siteName: siteContent.name },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Dark-only by design: the palette is Monokai Pro Ristretto, which has no light variant.
    <html lang="en-GB" data-theme="dark" className={mono.variable}>
      <body>
        <PageShell
          footer={{
            name: siteContent.name,
            github: githubWidget,
            linkedin: siteContent.linkedin,
            currentExperience,
          }}
        >
          {children}
        </PageShell>
      </body>
    </html>
  )
}
