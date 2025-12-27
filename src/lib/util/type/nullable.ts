import type { Predicate } from './predicate'

export type nullish = null | undefined
export type Nullable<T> = T | nullish

export const isNonNullish = (
  <T>(value: T): value is NonNullable<T> =>
    value !== null && value !== undefined
) satisfies Predicate<unknown>
