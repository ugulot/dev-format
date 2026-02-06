import { describe, it, expect } from 'vitest'
import { range } from './range'

describe(`${range.name}()`, () => {
  it('generates ascending range of numbers', () => {
    expect(Array.from(range(0, 5))).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('generates descending range of numbers', () => {
    expect(Array.from(range(3, -3))).toEqual([3, 2, 1, 0, -1, -2, -3])
  })

  describe('option "step"', () => {
    it('determines the value of the increment', () => {
      expect(Array.from(range(0, 5, { step: 2 }))).toEqual([0, 2, 4])
      expect(Array.from(range(0, 6, { step: 2 }))).toEqual([0, 2, 4, 6])
      expect(Array.from(range(0, 7, { step: 2 }))).toEqual([0, 2, 4, 6])

      expect(Array.from(range(0, 5, { step: 3 }))).toEqual([0, 3])
      expect(Array.from(range(0, 6, { step: 3 }))).toEqual([0, 3, 6])
      expect(Array.from(range(0, 7, { step: 3 }))).toEqual([0, 3, 6])

      expect(Array.from(range(3, -3, { step: 2 }))).toEqual([3, 1, -1, -3])
    })

    it('ingores sign of "step" and computes it based on "start" and "end"', () => {
      expect(Array.from(range(0, 5, { step: 2 }))).toEqual(Array.from(range(0, 5, { step: -2 })))
      expect(Array.from(range(3, -2, { step: 2 }))).toEqual(Array.from(range(3, -2, { step: -2 })))
    })
  })

  describe('option "startIncluded"', () => {
    it('determines whether the "start" value should be included', () => {
      expect(Array.from(range(0, 3, { startIncluded: true }))).toEqual([0, 1, 2, 3])
      expect(Array.from(range(0, 3, { startIncluded: false }))).toEqual([1, 2, 3])
    })
  })

  describe('option "endIncluded"', () => {
    it('determines whether the "end" value should be included', () => {
      expect(Array.from(range(0, 3, { endIncluded: true }))).toEqual([0, 1, 2, 3])
      expect(Array.from(range(0, 3, { endIncluded: false }))).toEqual([0, 1, 2])
    })
  })
})
