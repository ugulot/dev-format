import { describe, test, expect } from 'vitest'
import { stringify } from '../../util/stringify'

export interface TestCase {
  readonly args: Parameters<typeof Object.entries>
  readonly expectedResult: ReturnType<typeof Object.entries>
}

export type EntriesTestCases = typeof entriesTestCases

export const entriesTestCases = [{
  args: [true],
  expectedResult: [],
}, {
  args: [10],
  expectedResult: [],
}, {
  args: [10n],
  expectedResult: [],
}, {
  args: ['abc'],
  expectedResult: [['0', 'a'], ['1', 'b'], ['2', 'c']],
}, {
  args: [Symbol()],
  expectedResult: [],
}, {
  args: [{ a: 1, b: 2 }],
  expectedResult: [['a', 1], ['b', 2]],
}, {
  args: [{ a: 1, b: 2, [Symbol()]: 10 }],
  expectedResult: [['a', 1], ['b', 2]],
}, {
  args: [[1, 2, 4, 8]],
  expectedResult: [['0', 1], ['1', 2], ['2', 4], ['3', 8]],
}, {
  args: [new Set([1, 2, 4, 8])],
  expectedResult: [],
}] as const satisfies TestCase[]

describe(`entriesTestCases`, () => {
  for (const [i, { args, expectedResult }] of entriesTestCases.entries()) {
    const description = `[${i}] Object.entries(${stringify(args[0])}) => ${stringify(expectedResult)}`

    test(description, () => {
      const entries = Object.entries(...args as TestCase['args'])
      expect(new Set(entries)).toStrictEqual(new Set<[string, unknown]>(expectedResult))
    })
  }
})
