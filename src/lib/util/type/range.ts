import { p } from '@tags/p'
import { split } from './unicode'

export interface RangeOptions<T> {
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

  valueToNumber?(value: T): number

  numberToValue?(index: number): T
}

type IndexedValueRangeOptionsVariant<T> = {} | Readonly<{
  valueToNumber: RangeOptions<T>['valueToNumber']
  numberToValue: RangeOptions<T>['numberToValue']
}>

export function defaultValueToNumber<T>(value: T) {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'bigint') {
    return value
  }

  if (typeof value === 'string') {
    const symbols = split(value)

    const zeroCharacters = symbols.length === 0
    const multipleCharacters = symbols.length >= 2

    if (zeroCharacters || multipleCharacters) {
      throw new TypeError(p`
        Element of range should be a string that contains only single Unicode symbol.
        ${(zeroCharacters || null) && ''}
        ${}
        Combining Unicode characters are not allowed in a range.
      `)
    }

    return symbols[0]?.codePointAt(0)
  }

  if (value instanceof Date) {
    return +value
  }

  throw new TypeError(p`
    An element of the range have unsupportedtype.
    Use one of supported types by default: number or string contained. Ot 
  `)
}

export function defaultNumberToValue<T>(number: number | bigint, type: string | { new (): T }): T {
  if (type === 'number') {
    return number
  }

  if (type === 'bigint') {
    return number
  }

  if (type === 'string') {
    return String.fromCodePoint(number)
  }

  if (typeof type === 'function') {
    const constructor = type
    if (constructor === Date) {
      return Date.
    }
  }

  throw new TypeError(p`
    
  `)
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
 * console.log([...range(1, 5, { endIncluded: false })])
 * // [1, 2, 3, 4]
 * ```
 * 
 * @example Range of Unicode symbols
 * ```
 * console.log([...range('a', 'd')])
 * // ['a', 'b', 'c', 'd']
 * ```
 */
export function* range<T>(
  start: T,
  end: T,
  {
    step = 1,
    startIncluded,
    endIncluded,
    valueToNumber = defaultValueToNumber<T>,
    numberToValue = defaultNumberToValue<T>,
  }: RangeOptions<T> & IndexedValueRangeOptionsVariant<T> = {}
) {
  const sign = valueToNumber(end) - valueToNumber(start) >= 0 ? 1 : -1
  const finalStep = sign * Math.abs(step)

  const constructor = Object.getPrototypeOf(start).constructor
  const validateValueClass = (value: T) => {
    if (Object.getPrototypeOf(value).constructor !== constructor) {
      throw new TypeError(p`
        Types of "start" and "end" arguments are mixed.
      `)
    }
  }

  validateValueClass(Object.getPrototypeOf(end).constructor)

  const nextValue = <T>(value: T) => {
    const increment = value + step
    return 
  }

  for (
    let value = startIncluded ? valueToNumber(start) : startIncluded + start;
    start <= ;
    value += finalStep
  ) {

  }
}
