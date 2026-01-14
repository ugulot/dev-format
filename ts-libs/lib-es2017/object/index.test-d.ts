import { describe, test, expectTypeOf } from 'vitest'
import { entriesTestCases } from './index.test'

describe('Object.entries()', () => {
  test('return type can be narrowed to simple type', () => {
    type NarrowedResultType = [string, unknown][]

    const { args } = entriesTestCases[0] as typeof entriesTestCases[number]
    // @ts-expect-error A spread argument must either have a tuple type or be passed to a rest parameter. ts(2556)
    expectTypeOf(Object.entries(...args)).toExtend<NarrowedResultType>()
  })

  describe('entriesTestCases', () => {
    {
      const { args, expectedResult } = entriesTestCases[0]

      test('entriesTestCases[0]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }

    {
      const { args, expectedResult } = entriesTestCases[1]

      test('entriesTestCases[1]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }

    {
      const { args, expectedResult } = entriesTestCases[2]

      test('entriesTestCases[2]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }

    {
      const { args, expectedResult } = entriesTestCases[3]

      test('entriesTestCases[3]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }

    {
      const { args, expectedResult } = entriesTestCases[4]

      test('entriesTestCases[4]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }

    {
      const { args, expectedResult } = entriesTestCases[5]

      test('entriesTestCases[5]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }

    {
      const { args, expectedResult } = entriesTestCases[6]

      test('entriesTestCases[6]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }

    {
      const { args, expectedResult } = entriesTestCases[7]

      test('entriesTestCases[7]', () => {
        const entries = Object.entries(...args)
        expectTypeOf(new Set(entries)).toEqualTypeOf(new Set(expectedResult))
      })
    }
  })
})
