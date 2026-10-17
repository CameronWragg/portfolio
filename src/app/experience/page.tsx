import type { Metadata } from 'next'

import { ExperienceTemplate } from '@/components/templates/ExperienceTemplate'
import { siteContent } from '@/content/site.content'

export const metadata: Metadata = { title: 'Experience' }

export default function ExperiencePage() {
  return (
    <ExperienceTemplate experience={siteContent.experience} education={siteContent.education} />
  )
}
