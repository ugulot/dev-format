import { describe, it, expectTypeOf } from 'vitest'
import type { RealPropertyKey } from './property-key'

describe(`type RealPropertyKey`, () => {
  it('transforms number to string and pass others', () => {
    expectTypeOf<RealPropertyKey<42>>().toExtend<'42'>()
    expectTypeOf<RealPropertyKey<'42'>>().toExtend<'42'>()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const symbol = Symbol()
    expectTypeOf<RealPropertyKey<typeof symbol>>().toExtend<typeof symbol>()
  })
})
