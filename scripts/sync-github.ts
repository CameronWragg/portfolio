#!/usr/bin/env node
/**
 * Pulls the GitHub profile and eligible public Repos, and writes them to
 * src/data/github.generated.json.
 *
 *   npm run sync                     # refresh the snapshot
 *   npm run sync -- --keep-on-error  # keep the committed snapshot if GitHub is unreachable
 *
 * The snapshot is committed so builds work offline and survive GitHub outages.
 * Set GITHUB_TOKEN to lift the 60-requests-per-hour anonymous rate limit.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { projectsConfig } from '../src/content/projects.config.ts'
import type { GitHubSnapshot, RepoSnapshot } from '../src/lib/github-snapshot.ts'

const here = dirname(fileURLToPath(import.meta.url))
const outFile = resolve(here, '../src/data/github.generated.json')
const keepOnError = process.argv.includes('--keep-on-error')

const { user, exclude, includeForks, includeArchived } = projectsConfig.github

interface GitHubUser {
  login: string
  html_url: string
  public_repos: number
}

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics?: string[]
  fork: boolean
  archived: boolean
  private: boolean
  pushed_at: string
  languages_url: string
}

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${user}-portfolio-sync`,
}
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function api<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText} for ${url}`)
  return (await res.json()) as T
}

async function fetchAllRepos(): Promise<GitHubRepo[]> {
  const all: GitHubRepo[] = []
  for (let page = 1; page <= 10; page++) {
    const batch = await api<GitHubRepo[]>(
      `https://api.github.com/users/${user}/repos?per_page=100&type=owner&sort=pushed&page=${page}`,
    )
    all.push(...batch)
    if (batch.length < 100) break
  }
  return all
}

function isEligible(repo: GitHubRepo): boolean {
  if (repo.private) return false
  if (exclude.includes(repo.name)) return false
  if (repo.fork && !includeForks) return false
  if (repo.archived && !includeArchived) return false
  return true
}

async function main() {
  const [profile, allRepos] = await Promise.all([
    api<GitHubUser>(`https://api.github.com/users/${user}`),
    fetchAllRepos(),
  ])
  const repos = allRepos.filter(isEligible)
  const languages = await Promise.all(
    repos.map((repo) => api<Record<string, number>>(repo.languages_url)),
  )

  const snapshot: GitHubSnapshot = {
    profile: { login: profile.login, url: profile.html_url, publicRepos: profile.public_repos },
    repos: repos.map((repo, i): RepoSnapshot => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage || null,
      languages: languages[i]!,
      topics: repo.topics ?? [],
      isArchived: repo.archived,
      pushedAt: repo.pushed_at,
    })),
  }

  await writeFile(outFile, `${JSON.stringify(snapshot, null, 2)}\n`)
  console.log(`Synced ${snapshot.repos.length} Repo(s) from github.com/${user}`)
  for (const repo of snapshot.repos) console.log(`  - ${repo.name}`)
}

try {
  await main()
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  if (!keepOnError) {
    console.error(`GitHub sync failed: ${message}`)
    process.exit(1)
  }
  try {
    const existing = JSON.parse(await readFile(outFile, 'utf8')) as GitHubSnapshot
    console.warn(
      `GitHub sync failed (${message}); keeping ${existing.repos.length} Repo(s) from the committed snapshot.`,
    )
  } catch {
    console.error(`GitHub sync failed (${message}) and no snapshot exists at ${outFile}.`)
    process.exit(1)
  }
}
