import { describe, it, expect } from 'vitest'
import { range } from './range'

describe(`${range.name}()`, () => {
  describe('range of numbers', () => {
    it('generates range of numbers', () => {
      expect(Array.from(range(0, 5))).toEqual([0, 1, 2, 3, 4, 5, 6])
    })

    describe('option "step"', () => {
      it('', () => {
        expect(Array.from(range(0, 5, { step: 2 }))).toEqual([0, 2, 4])
        expect(Array.from(range(0, 6, { step: 2 }))).toEqual([0, 2, 4, 6])
        expect(Array.from(range(0, 7, { step: 2 }))).toEqual([0, 2, 4, 6])

        expect(Array.from(range(0, 5, { step: 3 }))).toEqual([0, 3])
        expect(Array.from(range(0, 6, { step: 4 }))).toEqual([0, 3, 6])
        expect(Array.from(range(0, 7, { step: 4 }))).toEqual([0, 3, 6])
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

  describe('range of Unicode characters', () => {
    it('generates range of Unicode characters', () => {
      expect(Array.from(range('i', 'k'))).toEqual(['i', 'j', 'k'])
    })
  })
})
