import type { ReactNode } from 'react'

import { SiteFooter, type SiteFooterProps } from '@/components/organisms/SiteFooter'
import { SiteHeader } from '@/components/organisms/SiteHeader'

export function PageShell({ footer, children }: { footer: SiteFooterProps; children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader name={footer.name} />
      <main id="main" className="container">
        {children}
      </main>
      <SiteFooter {...footer} />
    </>
  )
}
