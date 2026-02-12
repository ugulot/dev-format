import { describe, it, expect } from 'vitest'
import { Tag } from './Tag'
import { reassembleTaggedString } from '@lib/util/type/template-literal'

describe(`${Tag.name}()`, () => {
  it('just defines a tag for tagged string template literal', () => {
    const t = Tag((consts, ...args) => reassembleTaggedString(consts, args))
    expect(t`ab${123}`).toStrictEqual('ab123')
  })
})
