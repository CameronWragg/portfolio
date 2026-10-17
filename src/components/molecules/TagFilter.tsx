import { Suspense } from 'react'

import { TagFilterClient } from './TagFilterClient'
import { TagFilterView, type TagFilterProps } from './TagFilterView'

/**
 * Every Project is in the static HTML; the filter only hides rows. The active
 * Tag lives in the URL (?tag=) so a filtered view can be shared.
 */
export function TagFilter(props: TagFilterProps) {
  return (
    <Suspense fallback={<TagFilterView {...props} active={null} />}>
      <TagFilterClient {...props} />
    </Suspense>
  )
}
