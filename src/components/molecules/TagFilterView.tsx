import Link from 'next/link'

import { Tag } from '@/components/atoms/Tag'
import type { TagUsage } from '@/lib/projects'

export interface TagFilterProps {
  usage: TagUsage[]
  total: number
}

/** The filter's markup, given the active Tag slug (or null for "all"). */
export function TagFilterView({
  usage,
  total,
  active,
}: TagFilterProps & { active: string | null }) {
  const shown = active ? (usage.find((u) => u.tag.slug === active)?.count ?? 0) : total
  return (
    <section className="tag-filter" aria-label="Filter Projects by Tag">
      <ul className="tags">
        <li>
          <Link
            href="/projects"
            className="tag tag--neutral"
            aria-current={active ? undefined : 'true'}
          >
            All
          </Link>
        </li>
        {usage.map(({ tag }) => (
          <li key={tag.slug}>
            <Tag tag={tag} current={tag.slug === active} />
          </li>
        ))}
      </ul>
      <p className="tag-filter__status" role="status">
        Showing {shown} of {total} Projects
      </p>
    </section>
  )
}
