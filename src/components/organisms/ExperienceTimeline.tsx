import { ExperienceItem } from '@/components/molecules/ExperienceItem'
import type { Experience } from '@/content/site.content'

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <section aria-labelledby="experience-heading">
      <h2 id="experience-heading">Work</h2>
      {experience.map((item) => (
        <ExperienceItem key={`${item.organisation}-${item.start}`} experience={item} />
      ))}
    </section>
  )
}
