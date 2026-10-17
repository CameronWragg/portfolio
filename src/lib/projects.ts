import type { Override, ProjectsConfig } from '../content/projects.config'
import { renderBanner } from './banner'
import type { RepoSnapshot } from './github-snapshot'
import { tagLabel, tagSlug } from './tags'

export interface Tag {
  slug: string
  label: string
  /** Language Tags get a colour; every other Tag is neutral. */
  kind: 'language' | 'other'
  /** For language Tags: 0 for the most-used language across all Repos, 1 for the next, … */
  languageRank?: number
}

export interface Project {
  /** The Repo name — unique, and safe to use in URLs and keys. */
  slug: string
  name: string
  description: string | null
  url: string
  liveUrl: string | null
  tags: Tag[]
  featured: boolean
  isArchived: boolean
  pushedAt: string
  /** null when the name is too wide for a Banner. */
  banner: string | null
}

/** Languages shown as Tags per Project, biggest first. */
const LANGUAGE_TAGS_PER_PROJECT = 4

/** "dots-watch-face" -> "Dots Watch Face" */
export function prettifyRepoName(repoName: string): string {
  return repoName
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(' ')
}

function languagesBySize(repo: RepoSnapshot): string[] {
  return Object.entries(repo.languages)
    .sort(([, a], [, b]) => b - a)
    .map(([language]) => language)
}

function uniqueSlugs(raw: string[]): string[] {
  return [...new Set(raw.map(tagSlug).filter(Boolean))]
}

/**
 * Turns synced Repos into Projects: applies Overrides, drops hidden Repos,
 * merges Tags by slug and sorts Featured first, then by Override order, then
 * by most recent push.
 */
export function toProjects(repos: RepoSnapshot[], config: ProjectsConfig): Project[] {
  // A slug is a language Tag everywhere if it is a language anywhere, so one
  // Tag never shows up in two styles.
  const languageRanks = new Map(
    topLanguages(repos, Infinity).map((language, rank) => [tagSlug(language), rank]),
  )

  return repos
    .map((repo) => ({ repo, override: config.overrides[repo.name] ?? ({} as Override) }))
    .filter(({ override }) => !override.hidden)
    .sort(
      (a, b) =>
        Number(b.override.featured ?? false) - Number(a.override.featured ?? false) ||
        (a.override.order ?? Infinity) - (b.override.order ?? Infinity) ||
        b.repo.pushedAt.localeCompare(a.repo.pushedAt),
    )
    .map(({ repo, override }): Project => {
      const name = override.name ?? prettifyRepoName(repo.name)
      const slugs = uniqueSlugs([
        ...languagesBySize(repo).slice(0, LANGUAGE_TAGS_PER_PROJECT),
        ...repo.topics,
        ...(override.tags ?? []),
      ])
      return {
        slug: repo.name,
        name,
        description: override.description ?? repo.description,
        url: repo.url,
        liveUrl: override.liveUrl ?? repo.homepage,
        tags: slugs.map((slug): Tag => {
          const label = tagLabel(slug, config.tagLabels)
          const languageRank = languageRanks.get(slug)
          return languageRank === undefined
            ? { slug, label, kind: 'other' }
            : { slug, label, kind: 'language', languageRank }
        }),
        featured: override.featured ?? false,
        isArchived: repo.isArchived,
        pushedAt: repo.pushedAt,
        banner: renderBanner(name),
      }
    })
}

export interface TagUsage {
  tag: Tag
  count: number
}

/** Every Tag in use with how many Projects carry it, most common first. */
export function tagsInUse(projects: Project[]): TagUsage[] {
  const counts = new Map<string, { tag: Tag; count: number }>()
  for (const tag of projects.flatMap((project) => project.tags)) {
    const entry = counts.get(tag.slug) ?? { tag, count: 0 }
    entry.count++
    counts.set(tag.slug, entry)
  }
  return [...counts.values()].sort(
    (a, b) => b.count - a.count || a.tag.label.localeCompare(b.tag.label),
  )
}

/** Top languages across the given Repos by total bytes of code. */
export function topLanguages(repos: RepoSnapshot[], limit: number): string[] {
  const totals = new Map<string, number>()
  for (const repo of repos) {
    for (const [language, bytes] of Object.entries(repo.languages)) {
      totals.set(language, (totals.get(language) ?? 0) + bytes)
    }
  }
  return [...totals.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([language]) => language)
}
