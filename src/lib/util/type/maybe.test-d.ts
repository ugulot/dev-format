import { describe, it } from 'vitest'
import type { MaybeUnknown } from './maybe'

describe('type MaybeUnknown', () => {
  it('pass subtypes of the parameter and the unknown itself but not other subtypes of unknown', () => {
    function fn<T>(_value: MaybeUnknown<T, string[]>) {}

    fn(['a', 'b'])
    fn({} as unknown)

    // @ts-expect-error readonly string[] is not a string[]
    fn(['a', 'b'] as readonly string[])

    // @ts-expect-error '42' is not a string[]
    fn(42)

    // @ts-expect-error 'abc' is not a string[]
    fn('abc')

    // @ts-expect-error number[] is not a string[]
    fn([1, 2, 3])
  })
})
