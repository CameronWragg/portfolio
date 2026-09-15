import type { RepoSnapshot } from './repo-snapshot'
import repos from './repos.generated.json'
import { siteConfig, type ProjectOverride } from './site.config'

export interface Project {
  id: number
  slug: string
  name: string
  description: string
  url: string
  liveUrl: string | null
  image: string | null
  imageAlt: string
  imageFit: 'cover' | 'contain'
  tags: string[]
  stars: number
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
  const name = override.name ?? prettify(repo.name)
  return {
    id: repo.id,
    slug: repo.name,
    name,
    description: override.description ?? repo.description ?? 'No description yet — the code speaks for itself.',
    url: repo.url,
    liveUrl: override.liveUrl ?? repo.homepage,
    image: override.image ?? null,
    imageAlt: override.imageAlt ?? `${name} cover image`,
    imageFit: override.imageFit ?? 'cover',
    tags: unique([...repo.languages, ...repo.topics, ...(override.tags ?? [])]),
    stars: repo.stars,
    isArchived: repo.isArchived,
    featured: override.featured ?? false,
    pushedAt: repo.pushedAt,
  }
}

/**
 * By `order` (lower first, unset last), then featured, then most recently
 * pushed. Adding a repo on GitHub is enough to get it here.
 */
export const projects: Project[] = (repos as RepoSnapshot[])
  .filter((repo) => !siteConfig.projectOverrides[repo.name]?.hidden)
  .map((repo) => {
    const override = siteConfig.projectOverrides[repo.name] ?? {}
    return { project: toProject(repo, override), order: override.order ?? Number.MAX_SAFE_INTEGER }
  })
  .sort(
    (a, b) =>
      a.order - b.order ||
      Number(b.project.featured) - Number(a.project.featured) ||
      b.project.pushedAt.localeCompare(a.project.pushedAt),
  )
  .map(({ project }) => project)

export const featuredProjects: Project[] = projects.filter((p) => p.featured)

const tagCounts = new Map<string, number>()
for (const tag of projects.flatMap((p) => p.tags)) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)

/** Every tag in use, most common first — powers the filter bar. */
export const allTags: string[] = [...tagCounts.keys()].sort(
  (a, b) => tagCounts.get(b)! - tagCounts.get(a)! || a.localeCompare(b),
)
