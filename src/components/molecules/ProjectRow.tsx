import { Banner } from '@/components/atoms/Banner'
import { ExternalLink } from '@/components/atoms/ExternalLink'
import { Marker } from '@/components/atoms/Marker'
import { Tag } from '@/components/atoms/Tag'
import { formatDate } from '@/lib/dates'
import type { Project } from '@/lib/projects'

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="project" data-project-tags={project.tags.map((t) => t.slug).join(' ')}>
      {project.banner && <Banner text={project.banner} />}
      <h3 className={project.banner ? 'visually-hidden' : 'project__name'}>{project.name}</h3>
      <p className="project__meta">
        {project.featured && <Marker tone="featured">featured</Marker>}
        {project.isArchived && <Marker tone="muted">archived</Marker>}
        <span>
          pushed <time dateTime={project.pushedAt}>{formatDate(project.pushedAt)}</time>
        </span>
      </p>
      {project.description && <p>{project.description}</p>}
      {project.tags.length > 0 && (
        <ul className="tags" aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag.slug}>
              <Tag tag={tag} />
            </li>
          ))}
        </ul>
      )}
      <p className="project__links">
        <ExternalLink href={project.url}>GitHub</ExternalLink>
        {project.liveUrl && <ExternalLink href={project.liveUrl}>Live</ExternalLink>}
      </p>
    </article>
  )
}
