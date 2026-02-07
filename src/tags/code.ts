// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck FIXME

import { isArray } from '@lib/util/type/array'
import {
  reassembleTaggedString,
  useRawConst,
} from '@lib/util/type/template-literal'
import { p } from './p'

const prepareConsts = (consts: string | readonly string[] | TemplateStringsArray) => {
  if (typeof consts === 'string') {
    return [consts]
  }
  else if ('raw' in consts) {
    const fragments = consts.raw
    const firstLineIsEmpty = /^\s*\n/.test(fragments[0]!)
    const lastLineIsEmpty = /\n\s*$/.test(fragments[fragments.length - 1]!)

    if (!firstLineIsEmpty || !lastLineIsEmpty) {
      throw new SyntaxError(p`
        Content of the template string should look like a block of code
        in the common JavaScript style.
        
        Expected: The opening quotemark should be on the previous line before
        content, and the closing quotemark on the next line after content.
        
        Actual:
        ${!firstLineIsEmpty ? 'The opening quotemark on the same line with content.' : null}
        ${!lastLineIsEmpty ? 'The closing quotemark on the same line with content.' : null}
        
        Correct example:

        console.log(code\`
          const n = 42
          console.log(n)
        \`)

        Incorrect:

        code\`const n = 42
              console.log(n)
            \`
      `)
    }

    return fragments.slice(1, -1)
  }

  return consts
}

const prepareArgs = (args: readonly string[]) =>
  args.flatMap(fragment => fragment.split('\n'))

const removeExtraIndent = (lines: readonly string[]) => {
  const SPACE = '\u0020'
  const TAB = '\t'
  const MIXED_INDENT_ERROR = 'Mixed indentation: tabs and spaces used at same time.'

  let minIndent = Infinity
  let notWhiteSpaceIncluded = false
  let indentType: 'spaces' | 'tabs' | undefined

  for (const [i, line] of lines.entries()) {
    let indent = 0

    for (let i = 0; i < line.length; i++) {
      if (line[i] === SPACE) {
        if (indentType === 'tabs') {
          throw new SyntaxError(MIXED_INDENT_ERROR)
        }

        indentType = 'spaces'
        indent++
      }
      else if (line[i] === TAB) {
        if (indentType === 'spaces') {
          throw new SyntaxError(MIXED_INDENT_ERROR)
        }

        indentType = 'tabs'
        indent++
      }
      else {
        notWhiteSpaceIncluded = true
        break
      }
    }

    if (notWhiteSpaceIncluded) {
      minIndent = Math.min(minIndent, indent)
    }
    else {
      lines[i] = ''
    }
  }

  return lines
}

const reassemble = (consts: readonly string[], ...args: readonly (string | readonly string[])[]) => {
  return removeExtraIndent(consts).reduce((accumulator, s, i) => {
    const indentation = /\n(\s*)$/.exec(s)?.[1] ?? ''
    const arg = args[i]!
    const lines: string[] = []

    if (isArray(arg)) {
      const assertedArg = arg as readonly string[]
      if (assertedArg?.length) {
        const [first, ...rest] = assertedArg.flatMap(s => s.split('\n'))
        lines.push(first!, ...rest.map(s => indentation + s))
      }
    }
    else if (typeof arg === 'string') {
      const [first, ...rest] = arg.split('\n')
      lines.push(first!, ...rest.map(s => indentation + s))
    }

    return accumulator + s + lines.join('\n')
  }, '')
}

export const __codeHelpers = {
  prepareConsts,
  prepareArgs,
  removeExtraIndent,
  reassemble,
}

/**
 * Use escape sequences:
 * - `` \` `` instead of `` ` ``,
 * - `\${` instead of `${`.
 *
 * Other characters will be inserted into the result as is.
 *
 * If you want to use any escape sequences supported in JavaScript, use
 * the similar `pre` tag instead.
 *
 * @example
 *
 * ```ts
 * const codeFragment = code`
 *   const n = 42
 *   console.log(n)
 * `
 * ```
 */
export function code(consts: TemplateStringsArray, ...args: readonly string[]): string {
  throw new Error('No implementation')
  return reassembleTaggedString(consts, args, { processConst: useRawConst }) // FIXME
  // return reassemble(prepareConsts(consts), ...args)
}
