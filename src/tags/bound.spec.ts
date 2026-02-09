import { describe, it, expect } from 'vitest'
import { bound } from './bound'

describe(`bound\`...\``, () => {
  it('allows to insert optional argument in a template literal without conditions', () => {
    const hello = (name?: string) => `Hello${bound`, ${name}`}!`

    expect(hello()).toStrictEqual('Hello!')
    expect(hello('Alex')).toStrictEqual('Hello, Alex!')
  })
})
