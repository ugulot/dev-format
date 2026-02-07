import { describe, it, expect } from 'vitest'
import { pre } from './pre'

describe(`${pre.name}() the template tag`, () => {
  it('removes common indentation and keeps inner indentation', () => {
    expect(pre`
      first
        second
      third
    `).toBe(['first', '  second', 'third'].join('\n'))
  })

  it('skips nullish and empty arguments', () => {
    expect(pre`
      Hello${null}
      ${undefined}World${''}
    `).toBe(['Hello', 'World'].join('\n'))
  })

  it('keeps single-line indentation', () => {
    expect(pre`  indented`).toBe('  indented')
  })

  it('allows keeping outer blank lines when trim is false', () => {
    expect(pre({ trim: false })`
      line
    `).toBe(['', 'line', ''].join('\n'))
  })
})
