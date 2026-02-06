import { describe, it, expect } from 'vitest'
import { p as pTag } from './p'

describe(`p() the template tag`, () => {
  const newLineSequence = '\n'
  const newParagraph = `${newLineSequence}${newLineSequence}`
  const s = ' '
  const p = pTag({
    newLineSequence,
  })

  it('convert a text into paragraphes', () => {
    expect(p`One two three.`).toBe('One two three.')

    expect(p`
      One two three.
      Four five.
    `).toBe('One two three. Four five.')

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
    `).toBe(`A1${s}A2${newParagraph}B1${s}B2${newParagraph}C1${newParagraph}D1${s}D2`)
  })

  it('skips nullable values', () => {
    expect(p`
      ${undefined}
      One two ${null} three.
      ${null}
      Four ${undefined} five.
      ${null}
    `).toBe('One two three. Four five.')
  })
})
