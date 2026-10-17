import { ProfileWidget } from '@/components/molecules/ProfileWidget'
import type { Experience } from '@/content/site.content'
import type { GitHubWidgetData } from '@/lib/data'

export interface SiteFooterProps {
  name: string
  github: GitHubWidgetData
  linkedin: { url: string; headline: string }
  currentExperience: Experience | undefined
}

export function SiteFooter({ name, github, linkedin, currentExperience }: SiteFooterProps) {
  return (
    <footer className="container site-footer">
      <div className="profile-widgets">
        <ProfileWidget
          platform="GitHub"
          rows={[
            { label: 'Public repos', value: github.publicRepos },
            { label: 'Top languages', value: github.topLanguages.join(', ') || '—' },
            ...(github.latestProject
              ? [{ label: 'Latest push', value: github.latestProject.name }]
              : []),
          ]}
          link={{ href: github.url, label: `@${github.login}` }}
        />
        <ProfileWidget
          platform="LinkedIn"
          rows={[
            { label: 'Headline', value: linkedin.headline },
            ...(currentExperience
              ? [
                  {
                    label: 'Role',
                    value: `${currentExperience.title} at ${currentExperience.organisation}`,
                  },
                ]
              : []),
          ]}
          link={{ href: linkedin.url, label: 'Connect' }}
        />
      </div>
      <p className="muted">
        © {new Date().getFullYear()} {name}
      </p>
    </footer>
  )
}
