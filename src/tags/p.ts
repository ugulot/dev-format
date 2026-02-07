import { configurableTag } from '@lib/tag/configurable-tag'
import {
  type ReassembleTaggedStringOptions,
  reassembleTaggedString,
} from '@lib/util/type/template-literal'
import { regexp } from './regexp'

const PATTERNS = {
  /** Optional whitespace pattern */
  WS: /\s+/g,

  /** Optional whitespace pattern */
  OWS: /\s*/g,

  /** New line pattern */
  NL: /(?:\r\n|\r|\n)/g,

  /** New paragraph pattern */
  get NP() {
    // a getter is necessary because "p" and "regexp" are cyclically dependent
    // on each other
    const { OWS, NL } = this
    return regexp({ flags: 'g' })`${OWS}${NL}${OWS}${NL}${OWS}`
  },
}

const SPACE = '\u0020'

const endWsToS = (string: string) => {
  const trimmed = string.trimEnd()
  return string.length === trimmed.length ? string : `${trimmed}${SPACE}`
}

/**
 * Process a template string literal as a paragraphes.
 *
 * This works in a similar way to how paragraphs are processed in Markdown:
 *
 * - A sequence of whitespace characters containing two or more line breaks
 * separates the paragraphs. It will be replaced with dobule line breaks.
 *
 * - Every other sequence of whitespace characters separates parts of paragraph.
 * It will be replaced with single space.
 *
 * `null`, and `undefined`, and `''` of `args` will be skipped.
 */
export const p = configurableTag({
  newLineSequence: '\n',
}, ({ newLineSequence }, consts, ...args) => {
  const { WS, NL, NP } = PATTERNS
  const newParagraphSequence = `${newLineSequence}${newLineSequence}`

  const processArg: ReassembleTaggedStringOptions['processArg'] =
    arg => `${arg ?? ''}`

  const processConst: ReassembleTaggedStringOptions['processConst'] =
    (constPart, { i, args }) =>
      (args[i] ?? '') === '' ?
        endWsToS(constPart) :
        constPart

  return reassembleTaggedString(consts, args, { processArg, processConst })
    .trim()
    .split(NP)
    .map(paragraph =>
      paragraph
        .split(NL)
        .filter(s => s)
        .join(newLineSequence)
        .replaceAll(WS, SPACE),
    )
    .join(newParagraphSequence)
})
