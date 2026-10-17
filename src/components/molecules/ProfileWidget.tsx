import type { ReactNode } from 'react'

import { ExternalLink } from '@/components/atoms/ExternalLink'

export interface ProfileWidgetProps {
  platform: string
  rows: { label: string; value: ReactNode }[]
  link: { href: string; label: string }
}

/** A footer summary of Cameron's presence on one external platform. */
export function ProfileWidget({ platform, rows, link }: ProfileWidgetProps) {
  return (
    <article className="profile-widget">
      <h2>{platform}</h2>
      <dl>
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <ExternalLink href={link.href}>{link.label}</ExternalLink>
    </article>
  )
}
