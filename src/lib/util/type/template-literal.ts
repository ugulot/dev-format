import type { MaybeUnknown } from './maybe'
import type { Predicate } from './predicate'

export type NonTemplateStringsArray<T> = T extends TemplateStringsArray ? never : T

export const isTemplateStringsArray = (
  <T>(value: MaybeUnknown<T, readonly string[]> | unknown): value is TemplateStringsArray =>
    Array.isArray(value) && 'raw' in value && Array.isArray(value.raw)
) satisfies Predicate<unknown>

export function reassembleTaggedString<Args extends unknown[]>(consts: readonly string[], ...args: Args): string {
  return consts.reduce((result, s, i) => result + s + (args[i] ?? ''), '')
}
