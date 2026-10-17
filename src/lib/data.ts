/**
 * The site's data, assembled once from content and the GitHub snapshot.
 * Route files import from here; components receive plain props.
 */
import { projectsConfig } from '../content/projects.config'
import { siteContent, type Experience } from '../content/site.content'
import snapshot from '../data/github.generated.json'
import type { GitHubSnapshot } from './github-snapshot'
import { tagsInUse, toProjects, topLanguages, type Project } from './projects'

const github = snapshot as GitHubSnapshot

export const projects: Project[] = toProjects(github.repos, projectsConfig)
export const featuredProjects: Project[] = projects.filter((project) => project.featured)
export const projectTags = tagsInUse(projects)

/** The role still in progress, or failing that the most recent one. */
export const currentExperience: Experience | undefined =
  siteContent.experience.find((experience) => !experience.end) ?? siteContent.experience[0]

export interface GitHubWidgetData {
  url: string
  login: string
  publicRepos: number
  topLanguages: string[]
  latestProject: Project | undefined
}

const visibleRepoNames = new Set(projects.map((project) => project.slug))

export const githubWidget: GitHubWidgetData = {
  url: github.profile.url,
  login: github.profile.login,
  publicRepos: github.profile.publicRepos,
  topLanguages: topLanguages(
    github.repos.filter((repo) => visibleRepoNames.has(repo.name)),
    3,
  ),
  latestProject: [...projects].sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))[0],
}
