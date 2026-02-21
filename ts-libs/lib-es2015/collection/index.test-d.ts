import { describe, it, expectTypeOf } from 'vitest'

describe(`namespace __Utils`, () => {
  describe(`type IsLiteralPrimitive<T>`, () => {
    it('check is T an union of literal primitives', () => {
      expectTypeOf<__Utils.IsLiteralPrimitive<never>>().toExtend<never>()

      expectTypeOf<__Utils.IsLiteralPrimitive<number>>().toExtend<false>()
      expectTypeOf<__Utils.IsLiteralPrimitive<1>>().toExtend<true>()
      expectTypeOf<__Utils.IsLiteralPrimitive<1 | 2>>().toExtend<true>()
      expectTypeOf<__Utils.IsLiteralPrimitive<1 | 2 | 3>>().toExtend<true>()

      expectTypeOf<__Utils.IsLiteralPrimitive<bigint>>().toExtend<false>()
      expectTypeOf<__Utils.IsLiteralPrimitive<1n>>().toExtend<true>()
      expectTypeOf<__Utils.IsLiteralPrimitive<1n | 2n>>().toExtend<true>()
      expectTypeOf<__Utils.IsLiteralPrimitive<1n | 2n | 3n>>().toExtend<true>()

      expectTypeOf<__Utils.IsLiteralPrimitive<string>>().toExtend<false>()
      expectTypeOf<__Utils.IsLiteralPrimitive<'a'>>().toExtend<true>()
      expectTypeOf<__Utils.IsLiteralPrimitive<'a' | 'b'>>().toExtend<true>()
      expectTypeOf<__Utils.IsLiteralPrimitive<'a' | 'b' | 'c'>>().toExtend<true>()
    })
  })
})

describe(`interface Set`, () => {
  describe(`has()`, () => {
    it('check values of same internal type (number or bigint or string) when type of element norrowed to union of literal primitives', () => {
      const set = new Set(['a', 'b', 'c'] as const)

      // Fix wishful standard behavior:
      set.has('a')
      // @ts-expect-error Value of another type
      set.has(true)
      // @ts-expect-error Value of another type
      set.has(10)
      // @ts-expect-error Value of another type
      set.has(10n)
      // @ts-expect-error Value of another type
      set.has(new Object)
      // @ts-expect-error Value of another type
      set.has(new Function)

      // In the standard library causes an error, but it shouldn't:
      set.has('z')
      set.has('z' as string)
    })
  })
})

describe(`interface ReadonlySet`, () => {
  describe(`has()`, () => {
    it('check values of same internal type (number or bigint or string) when type of element norrowed to union of literal primitives', () => {
      const set = Object.freeze(new Set(['a', 'b', 'c'] as const))

      // Fix wishful standard behavior:
      set.has('a')
      // @ts-expect-error Value of another type
      set.has(true)
      // @ts-expect-error Value of another type
      set.has(10)
      // @ts-expect-error Value of another type
      set.has(10n)
      // @ts-expect-error Value of another type
      set.has(new Object)
      // @ts-expect-error Value of another type
      set.has(new Function)

      // In the standard library causes an error, but it shouldn't:
      set.has('z')
      set.has('z' as string)
    })
  })
})
