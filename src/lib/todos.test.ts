import { describe, expect, it } from 'vitest'

import { findTodos } from './todos'

describe('findTodos', () => {
  it('reports the path of every placeholder string', () => {
    expect(
      findTodos({
        name: 'Real',
        tagline: 'TODO: write me',
        experience: [{ title: 'Engineer', highlights: ['done', 'TODO: more'] }],
      }),
    ).toEqual(['tagline', 'experience[0].highlights[1]'])
  })
})
