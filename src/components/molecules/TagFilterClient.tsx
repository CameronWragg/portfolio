'use client'

import { useSearchParams } from 'next/navigation'

import { TagFilterView, type TagFilterProps } from './TagFilterView'

export function TagFilterClient(props: TagFilterProps) {
  const requested = useSearchParams().get('tag')
  // Only a known slug ever reaches the stylesheet below.
  const active = props.usage.some((u) => u.tag.slug === requested) ? requested : null
  return (
    <>
      {active && (
        <style>{`[data-project-tags]:not([data-project-tags~="${active}"]) { display: none; }`}</style>
      )}
      <TagFilterView {...props} active={active} />
    </>
  )
}
