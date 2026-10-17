import type { ReactNode } from 'react'

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden="true">{' \u2197\uFE0E'}</span>
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  )
}
