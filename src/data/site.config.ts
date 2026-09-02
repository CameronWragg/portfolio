/**
 * Single source of truth for the site.
 *
 * Everything on the Projects page is generated from the GitHub API by
 * `npm run sync` (see scripts/sync-projects.ts). A new public repo shows up
 * automatically on the next build — you only need to touch `projectOverrides`
 * below if you want to change how a specific repo is presented.
 */

export interface ProjectOverride {
  /** Card heading. Defaults to the repo name, prettified ("hive-fi" -> "Hive-Fi"). */
  name?: string
  /** Replaces the repo description from GitHub. */
  description?: string
  /** Path (relative to the site base) or absolute URL of a cover image. */
  image?: string
  /** Alt text for the cover image. */
  imageAlt?: string
  /** Extra tags, merged with the repo's GitHub topics and languages. */
  tags?: string[]
  /** Pin to the top of the grid and show on the home page. */
  featured?: boolean
  /** Manual sort weight. Lower sorts first; unset projects sort by last push. */
  order?: number
  /** Hide from the site without removing the repo from GitHub. */
  hidden?: boolean
  /** A live demo / docs link shown next to the GitHub link. */
  liveUrl?: string
}

export interface SiteConfig {
  profile: {
    name: string
    /** Rendered in the header as a pseudo type signature. */
    role: string
    tagline: string
    about: string[]
    location?: string
    links: { label: string; url: string }[]
  }
  github: {
    /** GitHub account to pull public repos from. */
    user: string
    /** Repo names to never show (this portfolio repo, dotfiles, scratch, ...). */
    exclude: string[]
    includeForks: boolean
    includeArchived: boolean
    /** Skip repos with no description and no topics — usually unfinished scratch work. */
    requireDescription: boolean
  }
  projectOverrides: Record<string, ProjectOverride>
}

export const siteConfig: SiteConfig = {
  profile: {
    name: 'Cameron Wragg',
    role: 'DataEngineer',
    tagline: 'I build data pipelines by day, and things that run on very small computers by night.',
    about: [
      'Data engineer by trade — pipelines, warehouses, and getting messy data into a shape people can actually make decisions with.',
      'Away from work I have a soft spot for the places software meets hardware: Raspberry Pis, microcontrollers, and anything with a screen small enough to be a challenge.',
      'Everything below is a personal project, built in my own time and pushed to GitHub. This page reads that list directly, so it is never out of date.',
    ],
    location: 'United Kingdom',
    links: [
      { label: 'GitHub', url: 'https://github.com/CameronWragg' },
      { label: 'LinkedIn', url: 'https://uk.linkedin.com/in/cameronwragg' },
    ],
  },

  github: {
    user: 'CameronWragg',
    exclude: ['portfolio'],
    includeForks: false,
    includeArchived: true,
    requireDescription: false,
  },

  /**
   * Optional per-repo polish. Keys are repo names exactly as they appear on
   * GitHub. Every field is optional — an empty object is a valid entry, and
   * repos with no entry at all render fine from their GitHub metadata.
   */
  projectOverrides: {
    'hive-fi': {
      name: 'Hive-Fi',
      description:
        'Turns a Raspberry Pi and a Pirate Audio HAT into a high-fidelity streaming endpoint, so Spotify and AirPlay play through an otherwise non-smart audio system.',
      image: 'images/hive-fi.jpeg',
      imageAlt: 'Hive-Fi project logo',
      tags: ['Raspberry Pi', 'Audio', 'Home Lab'],
      featured: true,
    },
    'presto-deck': {
      name: 'Presto Deck',
      description:
        'A collection of projects for the Pimoroni Presto — a touchscreen microcontroller board — written in MicroPython.',
      tags: ['MicroPython', 'Embedded', 'Pimoroni'],
      featured: true,
    },
  },
}

export default siteConfig
