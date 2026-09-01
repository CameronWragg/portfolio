import repos from './repos.generated.json'
import { siteConfig, type ProjectOverride } from './site.config'

export interface RepoSnapshot {
  id: number
  name: string
  fullName: string
  description: string | null
  url: string
  homepage: string | null
  language: string | null
  languages: string[]
  topics: string[]
  stars: number
  forks: number
  isFork: boolean
  isArchived: boolean
  createdAt: string
  pushedAt: string
}

export interface Project {
  id: number
  slug: string
  name: string
  description: string
  url: string
  liveUrl: string | null
  image: string | null
  imageAlt: string
  language: string | null
  tags: string[]
  stars: number
  forks: number
  isArchived: boolean
  featured: boolean
  pushedAt: string
}

/** "advent-of-code-2021" -> "Advent Of Code 2021" */
function prettify(repoName: string): string {
  return repoName
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .split(' ')
    .filter(Boolean)
    .map((word) => (word === word.toUpperCase() ? word : word[0]!.toUpperCase() + word.slice(1)))
    .join(' ')
}

function unique(values: string[]): string[] {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))]
}

function toProject(repo: RepoSnapshot, override: ProjectOverride = {}): Project {
  return {
    id: repo.id,
    slug: repo.name,
    name: override.name ?? prettify(repo.name),
    description: override.description ?? repo.description ?? 'No description yet — the code speaks for itself.',
    url: repo.url,
    liveUrl: override.liveUrl ?? repo.homepage,
    image: override.image ?? null,
    imageAlt: override.imageAlt ?? `${override.name ?? prettify(repo.name)} cover image`,
    language: repo.language,
    tags: unique([...repo.languages, ...repo.topics, ...(override.tags ?? [])]),
    stars: repo.stars,
    forks: repo.forks,
    isArchived: repo.isArchived,
    featured: override.featured ?? false,
    pushedAt: repo.pushedAt,
  }
}

/**
 * Curated projects first (by `order`, then by name), then everything else by
 * most recently pushed. Adding a repo on GitHub is enough to get it here.
 */
export const projects: Project[] = (repos as RepoSnapshot[])
  .filter((repo) => !siteConfig.projectOverrides[repo.name]?.hidden)
  .map((repo) => {
    const override = siteConfig.projectOverrides[repo.name] ?? {}
    return { project: toProject(repo, override), order: override.order }
  })
  .sort((a, b) => {
    if (a.order !== undefined || b.order !== undefined) {
      return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
    }
    if (a.project.featured !== b.project.featured) return a.project.featured ? -1 : 1
    return b.project.pushedAt.localeCompare(a.project.pushedAt)
  })
  .map(({ project }) => project)

export const featuredProjects: Project[] = projects.filter((p) => p.featured)

/** Every tag in use, most common first — powers the filter bar. */
export const allTags: string[] = [...new Set(projects.flatMap((p) => p.tags))].sort((a, b) => {
  const count = (tag: string) => projects.filter((p) => p.tags.includes(tag)).length
  return count(b) - count(a) || a.localeCompare(b)
})
