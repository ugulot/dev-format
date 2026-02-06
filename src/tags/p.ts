import { configurableTag } from '@lib/tag/configurable-tag'
import {
  type ReassembleTaggedStringOptions,
  reassembleTaggedString,
} from '@lib/util/type/template-literal'

/** Optional whitespace pattern */
const WS = /\s+/g
/** Optional whitespace pattern */
const OWS = /\s*/g
/** New line pattern */
const NL = /(?:\r\n|\r|\n)/g
/** New paragraph pattern */
const NP = new RegExp(`${OWS.source}${NL.source}${OWS.source}${NL.source}${OWS.source}`, 'g')

const SPACE = '\u0020'

const endWsToS = (string: string) => {
  const trimmed = string.trimEnd()

  if (string.length === trimmed.length) {
    return string
  }

  return trimmed + SPACE
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
 * Elements `null` and `undefined` of `args` will be skipped.
 */
export const p = configurableTag({
  newLineSequence: '\n',
}, ({ newLineSequence }, consts, ...args) => {
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
