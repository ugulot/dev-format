import { describe, it, expect } from 'vitest'
import { tag } from './tag'
import { reassembleTaggedString } from '@lib/util/type/template-literal'

describe(`${tag.name}()`, () => {
  it('just defines a tag for tagged string template literal', () => {
    const t = tag((consts, ...args) => reassembleTaggedString(consts, args))
    expect(t`ab${123}`).toStrictEqual('ab123')
  })
})
