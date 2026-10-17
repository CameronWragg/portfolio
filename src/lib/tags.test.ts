import { describe, expect, it } from 'vitest'

import { tagLabel, tagSlug } from './tags'

describe('tagSlug', () => {
  it('gives GitHub topics and hand-written Tags the same slug', () => {
    expect(tagSlug('raspberry-pi')).toBe('raspberry-pi')
    expect(tagSlug('Raspberry Pi')).toBe('raspberry-pi')
    expect(tagSlug(' raspberry_pi ')).toBe('raspberry-pi')
  })

  it('keeps symbols that distinguish languages', () => {
    expect(tagSlug('C++')).toBe('c-plus-plus')
    expect(tagSlug('C#')).toBe('c-sharp')
    expect(tagSlug('C')).toBe('c')
  })
})

describe('tagLabel', () => {
  it('prefers the label map', () => {
    expect(tagLabel('micropython', { micropython: 'MicroPython' })).toBe('MicroPython')
  })

  it('title-cases anything unmapped', () => {
    expect(tagLabel('home-lab', {})).toBe('Home Lab')
  })
})
