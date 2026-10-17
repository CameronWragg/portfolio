import type { Metadata } from 'next'

import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate'

export const metadata: Metadata = { title: 'Not found' }

export default function NotFound() {
  return <NotFoundTemplate />
}
