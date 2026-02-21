import { describe, test, expect } from 'vitest'
import { stringify } from './stringify'

describe(`${stringify.name}()`, () => {
  const SPACE = '\u0020'

  const NEGATIVE_ZERO = Symbol('NEGATIVE_ZERO')
  const encodeNegativeZero = <T>(value: T extends typeof NEGATIVE_ZERO ? never : T): T | typeof NEGATIVE_ZERO =>
    Object.is(value, -0) ? NEGATIVE_ZERO : value

  const withObjectWrapper = (values: readonly unknown[]) =>
    values.flatMap(value => [value, Object(value)])

  test('make sure that different input makes different output', () => {
    class SameResultVariants<T> extends Array<T> {}
    type DifferentResultVariants<T> = (T | SameResultVariants<T>)[]

    const valueVariants: DifferentResultVariants<unknown> = [
      undefined,
      null,
      ...withObjectWrapper([
        42,
        -42,
        0,
        -0,
        Infinity,
        -Infinity,
        NaN,
        '',
        'abc',
        'xyz',
        Symbol(),
        Symbol('abc'),
        Symbol('xyz'),
        10n,
        0n,
        -10n,
        false,
        true,
      ]),
      SameResultVariants.from([
        function () {},
        () => {},
      ]),
      function fn1() {},
      function fn2() {},
      SameResultVariants.from([
        async function () {},
        async () => {},
      ]),
      async function fn1() {},
      async function fn2() {},
      function*() {},
      function* fn1() {},
      function* fn2() {},
      async function*() {},
      async function* fn1() {},
      async function* fn2() {},
      [],
      [1, 2, 2],
      [1, 2, 4],
      [1, 2, 4, 8],
      new Set([1, 2, 4]),
      new Map([['a', 1], ['b', 2], ['c', 4]]),
      {},
      { a: 1, b: 2 },
      { a: 1, b: 2, [Symbol('a')]: 100 },
      { a: 1, b: 2, [Symbol('b')]: 100 },
    ]

    type input = unknown
    type output = unknown

    const input = new Set<input>()
    const output = new Map<output, input>()

    for (const value of valueVariants) {
      {
        const message =
          [
            `Input values should be unique, but value ${stringify(value)}`,
            `is duplicated.`,
          ].join(SPACE)

        expect(input.has(encodeNegativeZero(value)), message).toBe(false)
        input.add(encodeNegativeZero(value))
      }

      {
        const result = stringify(value)
        const message =
          output.has(result) ?
            [
              `Output values should be unique, but "${result}" is result`,
              `of ${stringify.name}(${stringify(output.get(result))})`,
              `and of ${stringify.name}(${stringify(value)}) at same time.`,
            ].join(SPACE) :
            undefined

        expect(output.has(result), message).toBe(false)
        output.set(result, value)
      }
    }
  })
})
