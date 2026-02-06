export interface RangeOptions {
  /**
   * The absolute value of a step. A sign will be computed based on `start`
   * and `end`
   *
   * @default 1
   */
  step?: number

  /** @default true */
  startIncluded?: boolean

  /** @default true */
  endIncluded?: boolean
}

/**
 * @example Simple range
 * ```
 * console.log([...range(1, 5)])
 * // [1, 2, 3, 4, 5]
 * ```
 *
 * @example Range with step = 2
 * ```
 * console.log([...range(10, 20, { step: 2 })])
 * // [10, 12, 14, 16, 18, 20]
 * ```
 *
 * @example Range that not includes end value
 * ```
 * const array = ['a', 'b', 'c']
 * console.log([...range(0, array.length, { endIncluded: false })])
 * // [0, 1, 2]
 * ```
 */
export function* range(
  start: number,
  end: number,
  {
    step: optionStep = 1,
    startIncluded = true,
    endIncluded = true,
  }: RangeOptions = {},
) {
  const sign = start <= end ? 1 : -1
  const step = sign * Math.abs(optionStep)

  const endCondition =
    sign === 1 ?
      endIncluded ?
        (n: number) => n <= end :
        (n: number) => n < end :
      endIncluded ?
        (n: number) => n >= end :
        (n: number) => n > end

  for (let n = startIncluded ? start : start + step; endCondition(n); n += step) {
    yield n
  }
}
