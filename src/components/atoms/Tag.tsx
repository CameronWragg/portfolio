import Link from 'next/link'

import type { Tag as TagData } from '@/lib/projects'

/**
 * Language Tags cycle through three accent colours by how much each language
 * is used, so the top three are always distinct and a language keeps its
 * colour everywhere on the site.
 */
const LANGUAGE_HUES = ['green', 'cyan', 'purple'] as const

export function Tag({ tag, current = false }: { tag: TagData; current?: boolean }) {
  const tone =
    tag.kind === 'language'
      ? `tag--${LANGUAGE_HUES[(tag.languageRank ?? 0) % LANGUAGE_HUES.length]}`
      : 'tag--neutral'
  return (
    <Link
      href={`/projects?tag=${tag.slug}`}
      className={`tag ${tone}`}
      aria-current={current ? 'true' : undefined}
    >
      {tag.label}
    </Link>
  )
}
