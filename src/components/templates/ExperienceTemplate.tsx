import { EducationList } from '@/components/organisms/EducationList'
import { ExperienceTimeline } from '@/components/organisms/ExperienceTimeline'
import type { Education, Experience } from '@/content/site.content'

export function ExperienceTemplate({
  experience,
  education,
}: {
  experience: Experience[]
  education: Education[]
}) {
  return (
    <>
      <h1>Experience</h1>
      <ExperienceTimeline experience={experience} />
      <EducationList education={education} />
    </>
  )
}
