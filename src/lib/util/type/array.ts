import type { Predicate } from './predicate'

export const isArray = (
  <T>(value: readonly T[] | unknown): value is T[] =>
    /* v8 ignore start -- no need to test the standard Array.isArray */
    Array.isArray(value)
    /* v8 ignore stop */
) satisfies Predicate<unknown>
