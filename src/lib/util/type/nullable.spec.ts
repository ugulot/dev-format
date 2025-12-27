import { describe, it, expect } from 'vitest'
import { isNonNullish } from './nullable'

describe(`${isNonNullish.name}()`, () => {
  it('returns false for null and undefined', () => {
    expect(isNonNullish(null)).toBe(false)
    expect(isNonNullish(undefined)).toBe(false)
  })

  it('returns true for any another value', () => {
    expect(isNonNullish(true)).toBe(true)
    expect(isNonNullish(false)).toBe(true)
    expect(isNonNullish(0)).toBe(true)
    expect(isNonNullish(1)).toBe(true)
    expect(isNonNullish(-1)).toBe(true)
    expect(isNonNullish(NaN)).toBe(true)
    expect(isNonNullish(0n)).toBe(true)
    expect(isNonNullish('')).toBe(true)
    expect(isNonNullish('abc')).toBe(true)
    expect(isNonNullish(Symbol())).toBe(true)
    expect(isNonNullish({})).toBe(true)
    expect(isNonNullish([])).toBe(true)
    expect(isNonNullish(function () {})).toBe(true)
  })
})
