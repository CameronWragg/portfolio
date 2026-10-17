import { HomeTemplate } from '@/components/templates/HomeTemplate'
import { siteContent } from '@/content/site.content'
import { currentExperience, featuredProjects } from '@/lib/data'

export default function HomePage() {
  return (
    <HomeTemplate
      hero={{
        name: siteContent.name,
        role: siteContent.role,
        tagline: siteContent.tagline,
        about: siteContent.about,
        location: siteContent.location,
      }}
      featuredProjects={featuredProjects}
      currentExperience={currentExperience}
    />
  )
}
