import { ProjectRow } from '@/components/molecules/ProjectRow'
import type { Project } from '@/lib/projects'

/** Projects as a terminal-style listing. `command` is the decorative prompt line above it. */
export function ProjectListing({ projects, command }: { projects: Project[]; command: string }) {
  return (
    <div className="project-listing">
      <p className="prompt" aria-hidden="true">
        $ {command}
      </p>
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  )
}
