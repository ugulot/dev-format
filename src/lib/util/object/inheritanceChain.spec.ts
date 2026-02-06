import { describe, it, expect } from 'vitest'
import { inheritanceChain } from './inheritanceChain'

describe(`${inheritanceChain.name}()`, () => {
  it('returns inheritance chain as a list from most superclass to most subclass', () => {
    expect(inheritanceChain(new Object).map(({ name }) => name))
      .toStrictEqual(['Object'])

    expect(inheritanceChain(new Error).map(({ name }) => name))
      .toStrictEqual(['Object', 'Error'])

    expect(inheritanceChain(new RangeError).map(({ name }) => name))
      .toStrictEqual(['Object', 'Error', 'RangeError'])

    expect(inheritanceChain(Object.create(null)).map(({ name }) => name))
      .toStrictEqual([])
  })

  it('can return reversed result by an option', () => {
    expect(inheritanceChain(new RangeError, { reversed: true }).map(({ name }) => name))
      .toStrictEqual(['RangeError', 'Error', 'Object'])
  })
})
