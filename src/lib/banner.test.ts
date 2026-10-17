import { describe, expect, it } from 'vitest'

import { BANNER_MAX_COLUMNS, renderBanner } from './banner'

describe('renderBanner', () => {
  it('renders a short name as trimmed ASCII art', () => {
    const banner = renderBanner('Hive-Fi')
    expect(banner).not.toBeNull()
    const lines = banner!.split('\n')
    expect(lines.length).toBeGreaterThan(1)
    expect(lines.every((line) => line === line.trimEnd())).toBe(true)
    expect(lines.at(-1)).not.toBe('')
  })

  it('falls back to null when the name is too wide', () => {
    expect(renderBanner('Advent Of Code 2021')).toBeNull()
  })

  it('never returns a Banner wider than the limit', () => {
    for (const name of ['A', 'Presto Deck', 'Dots Watch Face', 'Something Fairly Long']) {
      const banner = renderBanner(name)
      if (banner) {
        expect(Math.max(...banner.split('\n').map((l) => l.length))).toBeLessThanOrEqual(
          BANNER_MAX_COLUMNS,
        )
      }
    }
  })
})
