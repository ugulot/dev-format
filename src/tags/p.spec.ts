import { describe, it, expect } from 'vitest'
import { p as pTag } from './p'
import { newLineSequenceKey } from '@lib/tag/reusable/options/newLineSequence'

describe(`p\`...\``, () => {
  const newLineSequence = '\n'
  const newParagraph = `${newLineSequence}${newLineSequence}`
  const p = pTag({ [newLineSequenceKey]: newLineSequence })

  it('convert a text into paragraphes', () => {
    expect(p`One two three.`).toBe('One two three.')

    expect(p`
      One two three.
      Four five.
    `).toBe('One two three. Four five.')

    expect(p`
      One two three.

      Four five.
    `).toBe([
      'One two three.',
      'Four five.',
    ].join(newParagraph))

    expect(p`\t\tOne two three.\n\t\tFour five.`)
      .toBe('One two three. Four five.')

    expect(p`
      A1
      A2

      B1
      B2

      C1

      D1
      D2
    `).toBe([
      'A1 A2',
      'B1 B2',
      'C1',
      'D1 D2',
    ].join(newParagraph))
  })

  it('skips nullable values', () => {
    for (const nullable of [null, undefined, '']) {
      expect(p`
        One.
        
        ${nullable}
      `).toBe('One.')

      expect(p`
        One.
        ${nullable}
      `).toBe('One.')

      expect(p`
        ${nullable}
        
        One.
      `).toBe('One.')

      expect(p`
        ${nullable}
        One.
      `).toBe('One.')

      expect(p`
        One.
        
        ${nullable}

        Two. ${nullable} Two-two. ${nullable}${nullable} ${nullable} Two-two-two.

        ${nullable}
        ${nullable}
        
        Three.
        ${nullable}
        Three-three.
        
        ${nullable}

        ${nullable}
        
        ${nullable}
        ${nullable}
        
        Four.
        Four-four.

        Five.
      `).toBe([
        'One.',
        'Two. Two-two. Two-two-two.',
        'Three. Three-three.',
        'Four. Four-four.',
        'Five.',
      ].join(newParagraph))
    }
  })
})
