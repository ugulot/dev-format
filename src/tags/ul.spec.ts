import { describe, it, expect } from 'vitest'
import { ul } from './ul'

describe(`ul()`, () => {
  it('', () => {
    const item2 = null
    const item3 = undefined
    const item4 = ''
    const item5 = 'Item 5'

    expect(ul`
      - Item 1
      - ${item2}
      - ${item3}
      - ${item4}
      - ${item5}
      - Item 6
    `).toBe('- Item 1\n- Item 5\n- Item 6')
  })

  describe('option "markerInput"', { todo: true }, () => {})
  describe('option "markerOutput"', { todo: true }, () => {})
  describe('option "nestedLevels"', { todo: true }, () => {})
  describe('option "paragraphSpacing"', { todo: true }, () => {})
})
