import { isNonNullish } from '@lib/util/type/nullable'

/**
 * Values `''`, `null`, `undefined` will be skipped.
 *
 * Named by analogy with the `<div>` HTML-element.
 */
export function div(...paragraphs: (string | undefined | null)[]) {
  return paragraphs.filter(isNonNullish).join('\n\n')
}
