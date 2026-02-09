import { configurableTag } from '@lib/tag/configurable-tag'
import { ASCII, SEQUENCES } from '@lib/util/text/characters'
import {
  reassembleTaggedString,
  processNonNullableArg,
} from '@lib/util/type/template-literal'
import { p } from './p'
import { regexp } from './regexp'

const isEmpty = (line: string) => {
  const { S, TAB } = ASCII
  return regexp`^[${S}${TAB}]*$`.test(line)
}

const indentProperites = (line: string) => {
  const { S, TAB } = ASCII

  const MAYBE_MIXED_SPACES_OR_TABS_INDENT =
    regexp`^(${S}*|${TAB}*)([${S}${TAB}]*)`

  const [_, indent = '', unexpectedOtherTypeIndent = ''] =
    MAYBE_MIXED_SPACES_OR_TABS_INDENT.exec(line)!

  return {
    indent,
    mixedIndent: Boolean(unexpectedOtherTypeIndent.length),
  }
}

export const pre = configurableTag({
  newLineSequence: '\n',
}, ({ newLineSequence }, consts, ...args) => {
  const { EOL } = SEQUENCES

  const text = reassembleTaggedString(consts, args, {
    processArg: processNonNullableArg,
  })
  const lines = text.split(EOL)

  if (lines.length < 3 || !isEmpty(lines[0]!) || !isEmpty(lines.at(-1)!)) {
    throw new SyntaxError(pre`
      Using of tag pre\`...\` should looks like this:

      pre\`
        ...
      \`

      First and last lines should be empty.
    `)
  }

  const contentLines = lines.slice(1, -1)

  let minIndentLength: number

  for (const line of contentLines) {
    const {
      indent,
      mixedIndent,
    } = indentProperites(line)

    // @ts-expect-error Variable 'minIndentLength' is used before being assigned. ts(2454)
    minIndentLength = Math.min(indent.length, minIndentLength ?? Infinity)

    if (mixedIndent) {
      throw new SyntaxError(p`
        Content should be indented using spaces only or tabs only.
      `)
    }
  }

  return contentLines
    .map(line => line.slice(minIndentLength))
    .join(newLineSequence)
})
