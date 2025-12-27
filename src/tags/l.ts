import { isNonNullish, type Nullable } from '@lib/util/type/nullable'

export function l(items: readonly Nullable<string>[]): string
export function l(...items: readonly Nullable<string>[]): string
export function l(first: readonly Nullable<string>[] | Nullable<string>, ...rest: typeof first extends Nullable<string> ? readonly Nullable<string>[] : []) {
  const items = typeof first === 'string' || first === null || first === undefined ? [first, ...rest] : first
  return items
    .filter(isNonNullish)
    .join('\n')
}
