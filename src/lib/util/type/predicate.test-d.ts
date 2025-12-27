import { describe, it, expectTypeOf } from 'vitest'
import type { Predicate } from './predicate'

describe('type Predicate', () => {
  it('compatible with standard Array methods', <T, E>() => {
    expectTypeOf<Predicate<T>>().toExtend<Parameters<Array<E>['filter']>[0]>()
    expectTypeOf<Predicate<T>>().toExtend<Parameters<Array<E>['every']>[0]>()
    expectTypeOf<Predicate<T>>().toExtend<Parameters<Array<E>['some']>[0]>()
    expectTypeOf<Predicate<T>>().toExtend<Parameters<Array<E>['map']>[0]>()
  })
})
