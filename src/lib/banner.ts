import figlet from 'figlet/browser'
import small from 'figlet/fonts/Small'

/**
 * Widest Banner we render. Past this, the fluid font size gets too small to
 * read on a phone, so the Project falls back to its plain name.
 */
export const BANNER_MAX_COLUMNS = 56

figlet.parseFont('Small', small)

/** A Project's Banner, or null when it would be too wide to show. */
export function renderBanner(name: string): string | null {
  const lines = figlet
    .textSync(name, { font: 'Small' })
    .split('\n')
    .map((line) => line.trimEnd())
  while (lines.length && !lines.at(-1)) lines.pop()
  const columns = Math.max(0, ...lines.map((line) => line.length))
  return columns > 0 && columns <= BANNER_MAX_COLUMNS ? lines.join('\n') : null
}
