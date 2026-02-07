import { configurableTag } from '@lib/tag/configurable-tag'
import { reassembleTaggedString, processNonNullableArg } from '@lib/util/type/template-literal'

export interface PreOptions {
  trim?: boolean
}

const lineBreakPattern = /\r\n|\r|\n/

const commonPrefix = (a: string, b: string) => {
  const max = Math.min(a.length, b.length)
  let i = 0

  while (i < max && a[i] === b[i]) {
    i++
  }

  return a.slice(0, i)
}

const trimOuterBlankLines = (lines: string[]) => {
  let start = 0
  let end = lines.length

  while (start < end && /^\s*$/.test(lines[start]!)) {
    start++
  }

  while (end > start && /^\s*$/.test(lines[end - 1]!)) {
    end--
  }

  return lines.slice(start, end)
}

const removeCommonIndent = (lines: string[]) => {
  let commonIndent: string | undefined

  for (const line of lines) {
    if (!line.trim()) {
      continue
    }

    const indent = line.match(/^[ \t]*/)?.[0] ?? ''
    commonIndent = commonIndent === undefined ? indent : commonPrefix(commonIndent, indent)

    if (commonIndent === '') {
      break
    }
  }

  return lines.map((line) => {
    if (!line.trim()) {
      return ''
    }

    if (commonIndent && line.startsWith(commonIndent)) {
      return line.slice(commonIndent.length)
    }

    return line
  })
}

export const pre = configurableTag({
  trim: true,
}, ({ trim }, consts, ...args) => {
  const text = reassembleTaggedString(consts, args, {
    processArg: processNonNullableArg,
  })
  const lineBreakMatch = lineBreakPattern.exec(text)

  if (!lineBreakMatch) {
    return text
  }

  const lineBreak = lineBreakMatch[0]
  let lines = text.split(lineBreakPattern)

  if (trim) {
    lines = trimOuterBlankLines(lines)
  }

  lines = removeCommonIndent(lines)

  return lines.join(lineBreak)
})
