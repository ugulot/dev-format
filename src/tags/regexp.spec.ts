import { describe, it, expect } from 'vitest'
import { regexp } from './regexp'

describe(`regexp\`...\``, () => {
  it('creates RegExp instance from template literal', () => {
    const letter = /[A-Z]/
    const digit = /[0-9]/
    const { letter: l, digit: d } = { letter, digit }

    const serialNumber = regexp`${l}${l}-${d}${d}${d}${d}`

    expect(serialNumber.test('AB-1234')).toStrictEqual(true)
    expect(serialNumber.test('AB-123A')).toStrictEqual(false)
  })

  it('prevents inserting of RegExp with incompatible flags', () => {
    {
      const letter = /[A-Z]/i
      const digit = /[0-9]/
      const { letter: l, digit: d } = { letter, digit }

      expect(() => regexp`${l}${l}-${d}${d}${d}${d}`).toThrowError(TypeError)
    }

    {
      const letter = /[A-Z]/
      const digit = /[0-9]/
      const { letter: l, digit: d } = { letter, digit }

      expect(() => regexp({ flags: 'i' })`${l}${l}-${d}${d}${d}${d}`).toThrowError(TypeError)
    }

    {
      const letter = /[A-Z]/i
      const digit = /[0-9]/i
      const { letter: l, digit: d } = { letter, digit }

      expect(() => regexp({ flags: 'i' })`${l}${l}-${d}${d}${d}${d}`).not.toThrowError()
    }
  })
})
