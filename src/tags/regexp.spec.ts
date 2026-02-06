import { describe, it, expect } from 'vitest'
import { regexp } from './regexp'

describe(`regexp\`...\``, () => {
  it('allows to insert RegExp as argument of template literal', () => {
    const letter = /[A-Z]/
    const digit = /[0-9]/
    const { letter: l, digit: d } = { letter, digit }

    const serialNumber = regexp`${l}${l}-${d}${d}${d}${d}`

    expect(serialNumber.test('AB-1234')).toStrictEqual(true)
    expect(serialNumber.test('AB-123A')).toStrictEqual(false)
  })

  it('allows to use any other data (not only RegExp) as argument', () => {
    const prefix = 'RTX'
    const model = { toString: () => '5090' }
    const memory = 32
    const productName = regexp`${prefix} ${model} ${memory}GB`

    expect(productName.test('RTX 5090 32GB')).toBe(true)
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

  it('escapes input data', () => {
    const firstName = 'Alex'
    const fullName = `${firstName} Jones`
    const data = `name=${fullName},password=SECRET`

    const unsafeFindFullName = (firstName: string) => {
      const dataPattern = new RegExp(`name=(${firstName}[^,]*)`)
      return dataPattern.exec(data)?.[1]
    }

    const safeFindFullName = (firstName: string) => {
      const dataPattern = regexp`name=(${firstName}[^,]*)`
      return dataPattern.exec(data)?.[1]
    }

    const firstNameWithInjection = 'Alex.*'

    expect(safeFindFullName(firstName)).toStrictEqual(unsafeFindFullName(firstName))
    expect(unsafeFindFullName(firstNameWithInjection) ?? '').includes('SECRET')
    expect(safeFindFullName(firstNameWithInjection) ?? '').not.includes('SECRET')
  })
})
