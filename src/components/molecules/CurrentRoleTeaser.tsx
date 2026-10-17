import Link from 'next/link'

import type { Experience } from '@/content/site.content'

export function CurrentRoleTeaser({ experience }: { experience: Experience }) {
  return (
    <p className="current-role">
      <span className="muted">{experience.end ? 'Most recently' : 'Currently'}</span>{' '}
      {experience.title} at {experience.organisation}.{' '}
      <Link href="/experience">Full experience →</Link>
    </p>
  )
}
