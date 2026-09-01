#!/usr/bin/env node
/**
 * Pulls the public repos for the configured GitHub user and writes them to
 * src/data/repos.generated.json.
 *
 *   npm run sync                     # refresh the snapshot
 *   npm run sync -- --keep-on-error  # leave the existing snapshot in place if the API is unreachable
 *
 * The result is committed so that `npm run build` works offline and the site
 * still renders if GitHub is down. CI re-runs this on every deploy (and on a
 * schedule), so new repos appear without anyone editing code.
 *
 * Set GITHUB_TOKEN to lift the 60-requests-per-hour anonymous rate limit.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { siteConfig } from '../src/data/site.config.ts'

const here = dirname(fileURLToPath(import.meta.url))
const outFile = resolve(here, '../src/data/repos.generated.json')
const keepOnError = process.argv.includes('--keep-on-error')

const { user, exclude, includeForks, includeArchived, requireDescription } = siteConfig.github

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  forks_count: number
  fork: boolean
  archived: boolean
  private: boolean
  created_at: string
  pushed_at: string
  languages_url: string
}

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

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${user}-portfolio-sync`,
}
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function api<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText} for ${url}`)
  }
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

function keep(repo: GitHubRepo): boolean {
  if (repo.private) return false
  if (exclude.includes(repo.name)) return false
  if (repo.fork && !includeForks) return false
  if (repo.archived && !includeArchived) return false
  // An explicit override means the repo was curated by hand — always keep it.
  if (repo.name in siteConfig.projectOverrides) return true
  if (requireDescription && !repo.description && !repo.topics?.length) return false
  return true
}

/** Language breakdown, biggest first. Best-effort: a failure just means fewer tags. */
async function fetchLanguages(repo: GitHubRepo): Promise<string[]> {
  try {
    const bytes = await api<Record<string, number>>(repo.languages_url)
    return Object.entries(bytes)
      .sort(([, a], [, b]) => b - a)
      .map(([name]) => name)
      .slice(0, 4)
  } catch {
    return repo.language ? [repo.language] : []
  }
}

async function main() {
  const repos = (await fetchAllRepos()).filter(keep)
  const languages = await Promise.all(repos.map(fetchLanguages))

  const snapshot: RepoSnapshot[] = repos.map((repo, i) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    homepage: repo.homepage || null,
    language: repo.language,
    languages: languages[i]!,
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isFork: repo.fork,
    isArchived: repo.archived,
    createdAt: repo.created_at,
    pushedAt: repo.pushed_at,
  }))

  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, `${JSON.stringify(snapshot, null, 2)}\n`)
  console.log(`Synced ${snapshot.length} repo(s) from github.com/${user} -> ${outFile}`)
  for (const repo of snapshot) console.log(`  - ${repo.name}`)
}

try {
  await main()
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  if (!keepOnError) {
    console.error(`Project sync failed: ${message}`)
    process.exit(1)
  }
  // Best effort: fall back to whatever snapshot is already committed.
  try {
    const existing = JSON.parse(await readFile(outFile, 'utf8')) as RepoSnapshot[]
    console.warn(`Project sync failed (${message}); keeping ${existing.length} repo(s) from the committed snapshot.`)
  } catch {
    console.error(`Project sync failed (${message}) and no snapshot exists at ${outFile}.`)
    process.exit(1)
  }
}
