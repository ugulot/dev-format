import { describe, it, expectTypeOf } from 'vitest'

describe('core-js-pure/es/regexp/escape', () => {
  it('is only necessary until TypeScript implements it', () => {
    expectTypeOf<'escape'>().not.toExtend<keyof RegExpConstructor>()
  })
})
