/**
 * How Repos become Projects. Every eligible public Repo on the account is a
 * Project automatically; this file only narrows that down and adds Overrides.
 *
 * Imported by scripts/sync-github.ts, which Node runs with type stripping, so
 * keep it to erasable TypeScript (types and plain values only).
 */

export interface Override {
  /** Display name. Defaults to the Repo name, prettified ("hive-fi" -> "Hive Fi"). */
  name?: string
  /** Replaces the Repo description from GitHub. */
  description?: string
  /** Extra Tags, merged with the Repo's languages and topics. */
  tags?: string[]
  /** Featured Projects sort first and appear on Home. */
  featured?: boolean
  /** Manual sort weight. Lower sorts first; unset sorts by last push. */
  order?: number
  /** Keep the Repo on GitHub but off the site. */
  hidden?: boolean
  /** A live demo or docs link shown next to the GitHub link. */
  liveUrl?: string
}

export interface ProjectsConfig {
  github: {
    user: string
    /** Repo names that are never Projects. */
    exclude: string[]
    includeForks: boolean
    includeArchived: boolean
  }
  /** Keyed by the exact Repo name. */
  overrides: Record<string, Override>
  /**
   * Display names for Tag slugs whose title-cased form reads wrong.
   * Slugs not listed here are title-cased ("home-lab" -> "Home Lab").
   */
  tagLabels: Record<string, string>
}

export const projectsConfig: ProjectsConfig = {
  github: {
    user: 'CameronWragg',
    exclude: ['portfolio'],
    includeForks: false,
    includeArchived: true,
  },

  overrides: {
    'hive-fi': {
      name: 'Hive-Fi',
      tags: ['Raspberry Pi', 'Audio', 'Home Lab'],
      featured: true,
    },
    'presto-deck': {
      name: 'Presto Deck',
      tags: ['MicroPython', 'Embedded', 'Pimoroni'],
      featured: true,
    },
  },

  tagLabels: {
    micropython: 'MicroPython',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    'c-plus-plus': 'C++',
    'c-sharp': 'C#',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    sql: 'SQL',
    hcl: 'HCL',
    'jupyter-notebook': 'Jupyter Notebook',
  },
}
