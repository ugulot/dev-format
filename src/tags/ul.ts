import { configurableTag } from '@lib/tag/configurable-tag'
import { isNonNullish } from '@lib/util/type/nullable'
import { range } from '@lib/util/type/range'
import type { RegExpPartFlags } from '@lib/util/type/regexp'

export const UL_DEFAULT_OPTIONS = {
  /**
   * Marker in a tagged literal.
   */
  markerInLiteral: '-' as string | RegExpPartFlags<'ignoreCase' | 'unicode' | 'unicodeSets'>,

  /**
   * Marker in the produced result of tag calling.
   */
  marker: '-' as string | ((item: string, i: number, items: readonly string[]) => string),

  /**
   * Maximum of nested levels.
   *
   * @default 0
   */
  nestedLevels: 0,

  /**
   * Number of empty lines between items.
   *
   * If `'auto', then the value will be selected depending on the number
   * of line breaks in the content of the items.
   *
   * @default 'auto'
   */
  paragraphSpacing: 'auto' as 'auto' | number,
}

// export type UlDefaultOptions = typeof UL_DEFAULT_OPTIONS
// const OPTION_VALIDATORS: { [key in keyof UlDefaultOptions]: (value: UlDefaultOptions[key]) => boolean } = {
//   markerInLiteral(value) {

//   },
// }

export const ul = configurableTag(UL_DEFAULT_OPTIONS, ({
  markerInLiteral,
  marker,
  nestedLevels,
  paragraphSpacing,
}, consts, ...args) => {
  const WS = '\\s*'
  const NL = '\\n'

  const flags = ['g']
  const regexp = new RegExp(`(^|${WS}${NL})${WS}${markerInLiteral}(.*)${WS}`, 'g')
  const items: string[] = []


  const indices = (array: readonly never[]) => range(0, array.length - 1)
  // const pairs = <T>(array: readonly T[]) => 

  const validateIndentUnit = (...indents) => 

  for (const [i, part] of consts.entries()) {
    const itemsX = part.matchAll(regexp).map(([_match, _before, item]) => item!)

    items.push(...itemsX)
    if (isNonNullish(args[i]) && args[i] !== '') {
      items[items.length - 1] += String(args[i])
    }
  }

  return items.map(item => `${marker} ${item}`).join('\n')
})
