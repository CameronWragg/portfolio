import { EducationItem } from '@/components/molecules/EducationItem'
import type { Education } from '@/content/site.content'

export function EducationList({ education }: { education: Education[] }) {
  return (
    <section aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      {education.map((item) => (
        <EducationItem key={`${item.institution}-${item.start}`} education={item} />
      ))}
    </section>
  )
}
