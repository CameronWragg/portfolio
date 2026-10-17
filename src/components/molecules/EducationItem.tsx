import type { Education } from '@/content/site.content'
import { formatRange } from '@/lib/dates'

export function EducationItem({ education }: { education: Education }) {
  return (
    <article className="timeline-item">
      <header>
        <h3>
          {education.qualification} {education.subject}
        </h3>
        <p className="timeline-item__meta">
          {education.institution} · {formatRange(education.start, education.end)}
        </p>
      </header>
      {education.grade && <p>{education.grade}</p>}
      {education.dissertation && (
        <p>
          <span className="muted">Dissertation:</span> {education.dissertation}
        </p>
      )}
    </article>
  )
}
