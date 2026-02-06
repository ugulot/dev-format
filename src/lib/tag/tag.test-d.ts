import { describe, it } from 'vitest'
import type { Tag } from './tag'

describe('interface Tag', () => {
  it('describes a tag for template literal', () => {
    const tag: Tag = () => ''
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    tag``
  })
})
