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

  it('can be reconfigurate many times', () => {
    interface Tag1Options {
      /** @default 'a' */
      argPrefix: 'a' | 'b' | 'c'
    }

    interface Tag2Options extends Tag1Options {
      /** @default 'b' */
      argPrefix: 'b' | 'c'
    }

    interface Tag3Options extends Tag1Options {
      /** @default 'c' */
      argPrefix: 'b' | 'c'
    }

    const tag1 = ConfigurableTag(
      { argPrefix: 'a' } as Tag1Options,
      ({ argPrefix }, consts, ...args) =>
        reassembleTaggedString(consts, args.map(arg => `${argPrefix}${arg}`)),
    )
    const tag2 = tag1({ argPrefix: 'b' } as Tag2Options)
    const tag3 = tag2({ argPrefix: 'c' } as Tag3Options)

    expect(tag1`_${1}`).toBe('_a1')
    expect(tag1({ argPrefix: 'b' })`_${1}`).toBe('_b1')
    expect(tag1({ argPrefix: 'c' })`_${1}`).toBe('_c1')

    // @ts-expect-error ... Type '"a"' is not assignable to type '"b" | "c"'. ts(2769)
    tag2({ argPrefix: 'a' })
    expect(tag2`_${1}`).toBe('_b1')
    expect(tag2({ argPrefix: 'c' })`_${1}`).toBe('_c1')

    // @ts-expect-error ... Type '"a"' is not assignable to type '"b" | "c"'. ts(2769)
    tag2({ argPrefix: 'a' })
    expect(tag3({ argPrefix: 'b' })`_${1}`).toBe('_b1')
    expect(tag3`_${1}`).toBe('_c1')
  })
})
