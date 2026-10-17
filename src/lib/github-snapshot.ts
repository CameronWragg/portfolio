/** The shape of src/data/github.generated.json, written by scripts/sync-github.ts. */

export interface RepoSnapshot {
  name: string
  description: string | null
  url: string
  homepage: string | null
  /** Bytes of code per language, as reported by GitHub. */
  languages: Record<string, number>
  topics: string[]
  isArchived: boolean
  pushedAt: string
}

export interface GitHubSnapshot {
  profile: {
    login: string
    url: string
    publicRepos: number
  }
  /** Eligible Repos only — excluded, forked and private Repos never get this far. */
  repos: RepoSnapshot[]
}
