import { describe, it, expect } from 'vitest'
import { p } from './p'

describe(`${p.name}() (universal tagged template handle)`, () => {
  it('1) works as tagged template handle', () => {
    expect(p`One two three.`).toBe('One two three.')

    expect(p`
      One two three.
      Four five.
    `).toBe('One two three. Four five.')

    expect(p`\t\tOne two three.\n\t\tFour five.`).toBe('One two three. Four five.')
  })

  it('2) just join a lot of strings', () => {
    expect(p([
      'One two three.',
      'Four five.',
    ])).toBe('One two three. Four five.')

    expect(p(
      'One two three.',
      'Four five.',
    )).toBe('One two three. Four five.')
  })

  it('skip nullable values', () => {
    expect(p([
      'first',
      null,
      undefined,
      'second',
      'third',
    ]), 'skip nullable values').toBe('first second third')
  })
})
