import { describe, it, expect } from 'vitest'
import { configurableTag } from './configurable-tag'
import { reassembleTaggedString } from '../util/type/template-literal'

describe(`${configurableTag.name}()`, () => {
  const tag = configurableTag({
    digitsOnly: false,
  }, ({ digitsOnly }, consts, ...args) => {
    const result = reassembleTaggedString(consts, ...args)

    if (digitsOnly && !/^\d*$/.test(result)) {
      throw new TypeError
    }

    return result
  })

  it('creates a tag, that can be used with defualt options', () => {
    expect(tag`abc123${'def'}`).toBe('abc123def')
  })

  it('creates a tag, that can be used with overrided options', () => {
    expect(() => tag({ digitsOnly: true })`abc123`).throw(TypeError)
    expect(tag({ digitsOnly: true })`123${'456'}`).toBe('123456')
  })
})
