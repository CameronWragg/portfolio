import type { Experience } from '@/content/site.content'
import { formatRange } from '@/lib/dates'

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <article className="timeline-item">
      <header>
        <h3>{experience.title}</h3>
        <p className="timeline-item__meta">
          {experience.organisation} · {experience.location} ·{' '}
          {formatRange(experience.start, experience.end)}
        </p>
      </header>
      <p>{experience.summary}</p>
      {experience.highlights.length > 0 && (
        <ul>
          {experience.highlights.map((highlight, i) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
      )}
      {experience.technologies.length > 0 && (
        <p className="timeline-item__tech">{experience.technologies.join(' · ')}</p>
      )}
    </article>
  )
}
