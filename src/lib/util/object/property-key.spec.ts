import { describe, it, expect } from 'vitest'
import { propertyKeyToString } from './property-key'

describe(`${propertyKeyToString.name}()`, () => {
  it('returns arbitrary string representation and keeps the information of key', () => {
    expect(propertyKeyToString('xyz')).includes('xyz')
    expect(propertyKeyToString(Symbol('xyz'))).includes('xyz')
    expect(propertyKeyToString(100)).includes(String(100))
  })
})
