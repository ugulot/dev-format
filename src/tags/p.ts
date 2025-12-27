import { isNonNullish, type Nullable } from '@lib/util/type/nullable'
import { reassembleTaggedString } from '@lib/util/type/template-literal'

/**
 * This is 1) a tagged template handle and 2) simply a function that make
 * a paragraph from parts, typically sentences.
 *
 * Works in a similar way to the HTML-code of a block element, such as `<p>`.
 *
 * It converts multiline string with unnecessary indentations into string
 * without line breaks.
 *
 * @example
 * ```
 * const text = p`
 *   One two three.
 *   ${null} ${undefined}
 *   Four five.
 * `
 * console.assert(text === 'One two three. Four five.')
 * ```
 *
 * @example
 * ```
 * const text = p(
 *   'One two three.',
 *   'Four five.',
 * )
 * console.assert(text === 'One two three. Four five.')
 * ```
 *
 * @example
 * ```
 * const text = p([
 *   'One two three.',
 *   'Four five.',
 * ])
 * console.assert(text === 'One two three. Four five.')
 * ```
 */
export function p(consts: readonly string[], ...args: readonly Nullable<string>[]): string
export function p(consts: readonly Nullable<string>[]): string
export function p(...parts: readonly Nullable<string>[]): string
export function p(first: readonly Nullable<string>[] | Nullable<string>, ...rest: readonly Nullable<string>[]): string {
  const SPACE = '\u0020'

  const nonNullishRestStrings = (xs: readonly unknown[]) =>
    xs.filter(isNonNullish).map(x => String(x))

  // TODO: refactor
  const string =
    typeof first === 'string' ?
      [first, ...nonNullishRestStrings(rest)].filter(s => s).join(SPACE) :
    !rest.length ?
      first?.filter(s => s).join(SPACE) ?? '' :
      first ? reassembleTaggedString(first.filter(isNonNullish), ...nonNullishRestStrings(rest)) : ''

  return string.split(/\n\s*/).join(SPACE).trim()
}
