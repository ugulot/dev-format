import { describe, it, expect } from 'vitest'
import { ConfigurableTag } from './ConfigurableTag'
import { reassembleTaggedString } from '@lib/util/type/template-literal'

describe(`${ConfigurableTag.name}()`, () => {
  const tag = ConfigurableTag({
    digitsOnly: false,
  }, ({ digitsOnly }, consts, ...args) => {
    const result = reassembleTaggedString(consts, args)

    if (digitsOnly && !/^\d*$/.test(result)) {
      throw new TypeError
    }

    return result
  })

  it('can be used with defualt options', () => {
    expect(tag`abc123${'def'}`).toBe('abc123def')
  })

  it('can be used with specified options', () => {
    expect(() => tag({ digitsOnly: true })`abc123`).throw(TypeError)
    expect(tag({ digitsOnly: true })`123${'456'}`).toBe('123456')
  })
})
