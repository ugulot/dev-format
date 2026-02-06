import { tag } from '@lib/tag/tag'

/**
 * Bind constant text to an optional argument.
 *
 * @example
 * ```
 * const hello = (name?: string) => `Hello${bound`, ${name}`}!`
 *
 * console.assert(hello() === 'Hello!')
 * console.assert(hello('Alex') === 'Hello, Alex!')
 * ```
 */
export const bound = tag(([before = '', after = ''], arg) => {
  if (arg === '' || arg === null || arg === undefined) {
    return ''
  }

  return `${before}${arg}${after}`
})
