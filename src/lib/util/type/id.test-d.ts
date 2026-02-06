import { describe, it, expectTypeOf } from 'vitest'
import type { AsciiIdentifier } from './id'

describe('type PropertyName', () => {
  it('pass correct identifier names', () => {
    expectTypeOf<AsciiIdentifier<'abc'>>().toEqualTypeOf<'abc'>()
    expectTypeOf<AsciiIdentifier<'a'>>().toEqualTypeOf<'a'>()
    expectTypeOf<AsciiIdentifier<'b'>>().toEqualTypeOf<'b'>()
    expectTypeOf<AsciiIdentifier<'_'>>().toEqualTypeOf<'_'>()
    expectTypeOf<AsciiIdentifier<'__'>>().toEqualTypeOf<'__'>()
    expectTypeOf<AsciiIdentifier<'_123'>>().toEqualTypeOf<'_123'>()
    expectTypeOf<AsciiIdentifier<'_a'>>().toEqualTypeOf<'_a'>()
    expectTypeOf<AsciiIdentifier<'_a3'>>().toEqualTypeOf<'_a3'>()
    expectTypeOf<AsciiIdentifier<'_a3$'>>().toEqualTypeOf<'_a3$'>()
    expectTypeOf<AsciiIdentifier<'_abc_'>>().toEqualTypeOf<'_abc_'>()
    expectTypeOf<AsciiIdentifier<'__abc__'>>().toEqualTypeOf<'__abc__'>()
    expectTypeOf<AsciiIdentifier<'$'>>().toEqualTypeOf<'$'>()
    expectTypeOf<AsciiIdentifier<'$$'>>().toEqualTypeOf<'$$'>()
    expectTypeOf<AsciiIdentifier<'$123'>>().toEqualTypeOf<'$123'>()
    expectTypeOf<AsciiIdentifier<'$_'>>().toEqualTypeOf<'$_'>()
    expectTypeOf<AsciiIdentifier<'$_a'>>().toEqualTypeOf<'$_a'>()
    expectTypeOf<AsciiIdentifier<'$_1'>>().toEqualTypeOf<'$_1'>()
    expectTypeOf<AsciiIdentifier<'$_a1'>>().toEqualTypeOf<'$_a1'>()
    expectTypeOf<AsciiIdentifier<'_$'>>().toEqualTypeOf<'_$'>()
    expectTypeOf<AsciiIdentifier<'_$a1'>>().toEqualTypeOf<'_$a1'>()
    expectTypeOf<AsciiIdentifier<''>>().toEqualTypeOf<''>()
  })

  it('do not pass non-identifier names', () => {
    expectTypeOf<AsciiIdentifier<'abc#'>>().toBeNever()
    expectTypeOf<AsciiIdentifier<'2a'>>().toBeNever()
    expectTypeOf<AsciiIdentifier<'#a'>>().toBeNever()
  })

  it('works with highly long names', () => {
    type X10<S extends string> = `${S}${S}${S}${S}${S}${S}${S}${S}${S}${S}`
    type X1000<S extends string> = X10<X10<X10<S>>>

    expectTypeOf<AsciiIdentifier<X1000<'a'>>>().toEqualTypeOf<X1000<'a'>>()
  })
})
