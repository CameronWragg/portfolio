/**
 * Every piece of hand-written copy on the site. Strings starting with "TODO"
 * are placeholders: they render as-is, and dev/build print a list of any
 * that remain (see src/lib/todos.ts).
 */

/** "YYYY-MM" */
export type YearMonth = `${number}-${number}`

export interface Experience {
  organisation: string
  title: string
  start: YearMonth
  /** Omit for a current role. */
  end?: YearMonth
  location: string
  summary: string
  highlights: string[]
  technologies: string[]
}

export interface Education {
  institution: string
  /** e.g. "BSc (Hons)" */
  qualification: string
  subject: string
  start: YearMonth
  /** Omit while still studying. */
  end?: YearMonth
  /** Grade or classification, e.g. "First Class". */
  grade?: string
  dissertation?: string
}

export interface SiteContent {
  name: string
  role: string
  tagline: string
  about: string[]
  location: string
  /** Newest first. */
  experience: Experience[]
  education: Education[]
  linkedin: {
    url: string
    headline: string
  }
}

export const siteContent: SiteContent = {
  name: 'Cameron Wragg',
  role: 'Data Engineer',
  tagline: 'TODO: one-line tagline for the hero.',
  about: ['TODO: first about paragraph.', 'TODO: second about paragraph.'],
  location: 'United Kingdom',

  experience: [
    {
      organisation: 'TODO: organisation',
      title: 'TODO: job title',
      start: '2024-01',
      location: 'TODO: location',
      summary: 'TODO: one or two sentences on the role.',
      highlights: ['TODO: highlight', 'TODO: highlight'],
      technologies: ['TODO: technology'],
    },
  ],

  education: [
    {
      institution: 'TODO: university',
      qualification: 'TODO: qualification',
      subject: 'TODO: subject',
      start: '2018-09',
      end: '2021-06',
      grade: 'TODO: classification',
      dissertation: 'TODO: dissertation title',
    },
  ],

  linkedin: {
    url: 'https://uk.linkedin.com/in/cameronwragg',
    headline: 'TODO: LinkedIn headline.',
  },
}
