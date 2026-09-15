/** One repo as written to repos.generated.json by scripts/sync-projects.ts. */
export interface RepoSnapshot {
  id: number
  name: string
  description: string | null
  url: string
  homepage: string | null
  /** Up to four languages, biggest first. */
  languages: string[]
  topics: string[]
  stars: number
  isArchived: boolean
  pushedAt: string
}
