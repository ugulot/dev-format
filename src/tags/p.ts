import { ConfigurableTag } from '@lib/tag/ConfigurableTag'
import { ASCII, PLAIN_TEXT, SEQUENCES } from '@lib/util/text/characters'
import {
  type ProcessConst,
  reassembleTaggedString,
  processNonNullableArg,
} from '@lib/util/type/template-literal'

const endWsToS = (string: string) => {
  const { S } = ASCII
  const trimmed = string.trimEnd()
  return string.length === trimmed.length ? string : `${trimmed}${S}`
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
export const p = ConfigurableTag({
  newLineSequence: '\n',
}, ({ newLineSequence }, consts, ...args) => {
  const { S } = ASCII
  const { NP } = PLAIN_TEXT
  const { WS, EOL } = SEQUENCES
  const newParagraphSequence = `${newLineSequence}${newLineSequence}`

  const processConst: ProcessConst =
    (constPart, { i, args }) =>
      (args[i] ?? '') === '' ?
        endWsToS(constPart) :
        constPart

  return reassembleTaggedString(consts, args, {
    processArg: processNonNullableArg,
    processConst,
  })
    .trim()
    .split(NP)
    .map(paragraph =>
      paragraph
        .split(EOL)
        .filter(s => s)
        .join(newLineSequence)
        .replaceAll(WS, S),
    )
    .join(newParagraphSequence)
})
