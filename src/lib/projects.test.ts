import { describe, expect, it } from 'vitest'

import type { ProjectsConfig } from '../content/projects.config'
import type { RepoSnapshot } from './github-snapshot'
import { prettifyRepoName, tagsInUse, toProjects, topLanguages } from './projects'

function repo(name: string, overrides: Partial<RepoSnapshot> = {}): RepoSnapshot {
  return {
    name,
    description: `${name} description`,
    url: `https://github.com/someone/${name}`,
    homepage: null,
    languages: {},
    topics: [],
    isArchived: false,
    pushedAt: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

function config(overrides: ProjectsConfig['overrides'] = {}): ProjectsConfig {
  return {
    github: { user: 'someone', exclude: [], includeForks: false, includeArchived: true },
    overrides,
    tagLabels: { micropython: 'MicroPython' },
  }
}

describe('toProjects', () => {
  it('turns every Repo into a Project with no Override needed', () => {
    const [project] = toProjects([repo('dots-watch-face')], config())
    expect(project).toMatchObject({
      slug: 'dots-watch-face',
      name: 'Dots Watch Face',
      description: 'dots-watch-face description',
      featured: false,
    })
  })

  it('applies Overrides and drops hidden Projects', () => {
    const projects = toProjects(
      [repo('hive-fi'), repo('scratch')],
      config({
        'hive-fi': { name: 'Hive-Fi', description: 'Better copy', liveUrl: 'https://x.test' },
        scratch: { hidden: true },
      }),
    )
    expect(projects.map((p) => p.slug)).toEqual(['hive-fi'])
    expect(projects[0]).toMatchObject({
      name: 'Hive-Fi',
      description: 'Better copy',
      liveUrl: 'https://x.test',
    })
  })

  it('sorts Featured first, then by Override order, then by most recent push', () => {
    const projects = toProjects(
      [
        repo('old', { pushedAt: '2020-01-01T00:00:00Z' }),
        repo('new', { pushedAt: '2026-06-01T00:00:00Z' }),
        repo('ordered', { pushedAt: '2019-01-01T00:00:00Z' }),
        repo('featured-b'),
        repo('featured-a'),
      ],
      config({
        ordered: { order: 1 },
        'featured-a': { featured: true, order: 1 },
        'featured-b': { featured: true, order: 2 },
      }),
    )
    expect(projects.map((p) => p.slug)).toEqual([
      'featured-a',
      'featured-b',
      'ordered',
      'new',
      'old',
    ])
  })

  it('merges Tags from languages, topics and Overrides by slug', () => {
    const [project] = toProjects(
      [
        repo('pi', {
          languages: { Shell: 10, Python: 500 },
          topics: ['raspberry-pi', 'micropython'],
        }),
      ],
      config({ pi: { tags: ['Raspberry Pi', 'Home Lab'] } }),
    )
    expect(project!.tags.map((t) => t.label)).toEqual([
      'Python',
      'Shell',
      'Raspberry Pi',
      'MicroPython',
      'Home Lab',
    ])
  })

  it('ranks language Tags by total bytes across all Repos', () => {
    const [project] = toProjects(
      [repo('a', { languages: { Shell: 10, Python: 500 } }), repo('b', { languages: { Go: 100 } })],
      config(),
    )
    expect(project!.tags.map((t) => [t.slug, t.languageRank])).toEqual([
      ['python', 0],
      ['shell', 2],
    ])
  })

  it('marks a slug as a language Tag everywhere if it is a language anywhere', () => {
    const projects = toProjects(
      [repo('a', { languages: { Python: 1 } }), repo('b')],
      config({ b: { tags: ['python'] } }),
    )
    for (const project of projects) {
      expect(project.tags.find((t) => t.slug === 'python')?.kind).toBe('language')
    }
  })

  it('caps language Tags at the four biggest languages', () => {
    const [project] = toProjects(
      [repo('poly', { languages: { A: 1, B: 2, C: 3, D: 4, E: 5 } })],
      config(),
    )
    expect(project!.tags.map((t) => t.slug)).toEqual(['e', 'd', 'c', 'b'])
  })

  it('gives a Banner to short names and none to long ones', () => {
    const [short, long] = toProjects(
      [
        repo('short', { pushedAt: '2026-02-01T00:00:00Z' }),
        repo('an-extremely-long-repository-name'),
      ],
      config(),
    )
    expect(short!.banner).not.toBeNull()
    expect(long!.banner).toBeNull()
  })
})

describe('tagsInUse', () => {
  it('lists each Tag once, most common first', () => {
    const projects = toProjects(
      [repo('a', { topics: ['iot', 'audio'] }), repo('b', { topics: ['iot'] })],
      config(),
    )
    expect(tagsInUse(projects).map((u) => [u.tag.slug, u.count])).toEqual([
      ['iot', 2],
      ['audio', 1],
    ])
  })
})

describe('topLanguages', () => {
  it('ranks languages by total bytes across Repos', () => {
    const repos = [
      repo('a', { languages: { Python: 100, Shell: 50 } }),
      repo('b', { languages: { Shell: 80, Go: 10 } }),
    ]
    expect(topLanguages(repos, 2)).toEqual(['Shell', 'Python'])
  })
})

describe('prettifyRepoName', () => {
  it('title-cases hyphenated and underscored names', () => {
    expect(prettifyRepoName('presto_deck-v2')).toBe('Presto Deck V2')
  })
})
