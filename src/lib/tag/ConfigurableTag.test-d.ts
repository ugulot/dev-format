import { describe, it, expectTypeOf } from 'vitest'
import type { Tag } from './Tag'
import type { ConfigurableTag } from './ConfigurableTag'

describe('interface ConfigurableTag', () => {
  it('extends Tag', <Args extends readonly unknown[], Returned, Options>() => {
    expectTypeOf<ConfigurableTag<Args, Returned, Options>>().toExtend<Tag<Args, Returned>>()
    // It cannot be expressed using "interface ... extends ..." in the interface
    // definition because this construction does not allow determining the order
    // of function overloads.
  })
})
