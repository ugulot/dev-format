import { describe, it, expect } from 'vitest'
import { pre as preTag } from './pre'
import { newLineSequenceKey } from '@lib/tag/reusable/options/newLineSequence'

describe(`pre\`...\` the template tag`, () => {
  const newLineSequence = '\n'
  const pre = preTag({ [newLineSequenceKey]: newLineSequence })

  it('removes outer and keeps inner indentation', () => {
    expect(pre`
      first
        second
      third
    `).toBe([
      'first',
      '  second',
      'third',
    ].join(newLineSequence))
  })

  it('skips nullish and empty arguments', () => {
    expect(pre`
      Hello${null}
      ${undefined}World${''}
    `).toBe([
      'Hello',
      'World',
    ].join(newLineSequence))
  })
})
