import type { Metadata } from 'next'

import { ProjectsTemplate } from '@/components/templates/ProjectsTemplate'
import { projects, projectTags } from '@/lib/data'

export const metadata: Metadata = { title: 'Projects' }

export default function ProjectsPage() {
  return <ProjectsTemplate projects={projects} tags={projectTags} />
}
