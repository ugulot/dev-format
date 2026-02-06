import { range } from '@lib/util/range'

export type Letter = LowercaseLetter | UppercaseLetter

export type LowercaseLetter = Lowercase<
  // Keep Lowercase<...> wrap for clearer display in IDE for the case:
  // an union-type that contains this type.
  | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
  | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
>

export type UppercaseLetter = Uppercase<LowercaseLetter>

export const letters = new Set(
  [
    ...range('a'.charCodeAt(0), 'z'.charCodeAt(0)),
    ...range('A'.charCodeAt(0), 'Z'.charCodeAt(0)),
  ].map(charCode => String.fromCharCode(charCode)) as Letter[],
)

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
