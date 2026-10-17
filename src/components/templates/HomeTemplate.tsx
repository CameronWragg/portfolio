import Link from 'next/link'

import { CurrentRoleTeaser } from '@/components/molecules/CurrentRoleTeaser'
import { Hero, type HeroProps } from '@/components/organisms/Hero'
import { ProjectListing } from '@/components/organisms/ProjectListing'
import type { Experience } from '@/content/site.content'
import type { Project } from '@/lib/projects'

export interface HomeTemplateProps {
  hero: HeroProps
  featuredProjects: Project[]
  currentExperience: Experience | undefined
}

export function HomeTemplate({ hero, featuredProjects, currentExperience }: HomeTemplateProps) {
  return (
    <>
      <Hero {...hero} />
      {featuredProjects.length > 0 && (
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading">Featured Projects</h2>
          <ProjectListing projects={featuredProjects} command="ls ~/projects --featured" />
          <p>
            <Link href="/projects">All Projects →</Link>
          </p>
        </section>
      )}
      {currentExperience && (
        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          <CurrentRoleTeaser experience={currentExperience} />
        </section>
      )}
    </>
  )
}
