export interface Predicate<T> {
  /** Single predicate */
  (value: unknown): value is T

  /** Array element predicate. */
  <E>(value: E, index: number, array: readonly E[]): value is E & T
}
