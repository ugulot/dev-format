import { describe, it, expect } from 'vitest'
import { isTemplateStringsArray, reassembleTaggedString } from './template-literal'

describe(`${isTemplateStringsArray.name}()`, () => {
  it('returns true for "consts" argument of template string tag', () => {
    const getConsts = (
      consts: TemplateStringsArray,
      ..._args: readonly unknown[]
    ) => consts

    expect(isTemplateStringsArray(getConsts``)).toBe(true)
    expect(isTemplateStringsArray(getConsts`abc`)).toBe(true)
    expect(isTemplateStringsArray(getConsts`abc${'def'}`)).toBe(true)
    expect(isTemplateStringsArray(getConsts`abc${'def'}ghi`)).toBe(true)
    expect(isTemplateStringsArray(getConsts`${'abc'}def${'ghi'}`)).toBe(true)
  })

  it('returns false otherwise', () => {
    expect(isTemplateStringsArray([])).toBe(false)
    expect(isTemplateStringsArray(['abc'])).toBe(false)
    expect(isTemplateStringsArray(['abc', 'def'])).toBe(false)
    expect(isTemplateStringsArray('')).toBe(false)
    expect(isTemplateStringsArray('abc')).toBe(false)
  })
})

describe(`${reassembleTaggedString.name}()`, () => {
  it('', () => {
    expect(reassembleTaggedString`One two three`).toBe('One two three')
    expect(reassembleTaggedString`${'One'} two three`).toBe('One two three')
    expect(reassembleTaggedString`One ${'two'} three`).toBe('One two three')
    expect(reassembleTaggedString`One two ${'three'}`).toBe('One two three')
  })
})
