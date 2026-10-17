import { TagFilter } from '@/components/molecules/TagFilter'
import { ProjectListing } from '@/components/organisms/ProjectListing'
import type { Project, TagUsage } from '@/lib/projects'

export function ProjectsTemplate({ projects, tags }: { projects: Project[]; tags: TagUsage[] }) {
  return (
    <>
      <hgroup>
        <h1>Projects</h1>
        <p>Everything public on my GitHub, built in my own time.</p>
      </hgroup>
      <TagFilter usage={tags} total={projects.length} />
      <ProjectListing projects={projects} command="ls ~/projects" />
    </>
  )
}
