import type { Digit, Letter } from './ascii'

export type AsciiIdentifierFirstCharacter = '_' | '$' | Letter
export type AsciiIdentifierContinuationCharacter =
  | AsciiIdentifierFirstCharacter
  | Digit

/**
 * Validate whether the string is an identifier used in practice.
 */
export type AsciiIdentifier<Name extends string> =
  Name extends ReservedWord ?
    never :
  Name extends '' ?
    '' :
  Name extends `${AsciiIdentifierFirstCharacter}${infer Rest}` ?
    __AsciiIdentifierContinuation<Name, Rest> extends true ?
      Name :
      never :
  never

/** @internal */
type __AsciiIdentifierContinuation<FullName extends string, Continuation extends string> =
  Continuation extends '' ?
    true :
  Continuation extends `${AsciiIdentifierContinuationCharacter}${infer Rest}` ?
      __AsciiIdentifierContinuation<FullName, Rest> :
    false

/** @link https://tc39.es/ecma262/#prod-ReservedWord */
export type ReservedWord = __ReservedWordES2026

/** @internal */
type __ReservedWordES2026 =
  | 'await' | 'break' | 'case' | 'catch' | 'class' | 'const' | 'continue'
  | 'debugger' | 'default' | 'delete' | 'do' | 'else' | 'enum' | 'export'
  | 'extends' | 'false' | 'finally' | 'for' | 'function' | 'if' | 'import'
  | 'in' | 'instanceof' | 'new' | 'null' | 'return' | 'super' | 'switch'
  | 'this' | 'throw' | 'true' | 'try' | 'typeof' | 'var' | 'void' | 'while'
  | 'with' | 'yield'
