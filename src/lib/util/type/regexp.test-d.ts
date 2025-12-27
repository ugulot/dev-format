import { describe, it, expectTypeOf } from 'vitest'
import type { letter } from './ascii'
import type { RegExpFlags } from './regexp'

describe('type RegExpFlags', () => {
  it('is a map of the RegExp flag property name to a single-letter representation', () => {
    expectTypeOf<RegExpFlags>().toExtend<Partial<{ [key in keyof RegExp]: letter }>>()
  })
})
