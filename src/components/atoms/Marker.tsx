import type { ReactNode } from 'react'

/** A short status label next to a Project, e.g. "featured" or "archived". */
export function Marker({ tone, children }: { tone: 'featured' | 'muted'; children: ReactNode }) {
  return <span className={`marker marker--${tone}`}>{children}</span>
}
