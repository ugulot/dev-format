import { describe, it, expect } from 'vitest'
import { range } from './range'

describe(`${range.name}()`, () => {
  describe('range of numbers', () => {
    it('', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5, 6])
    })
  })

  describe('range of numbers', () => {
    it('', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5, 6])
    })
  })

  describe('range of Unicode characters', () => {
    it('', () => {
      expect(range('i', 'k')).toEqual(['i', 'j', 'k'])
    })
  })
})
