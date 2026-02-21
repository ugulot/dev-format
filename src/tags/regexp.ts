import escape from 'core-js-pure/es/regexp/escape'
import { ConfigurableTag } from '@lib/tag/ConfigurableTag'
import { reassembleTaggedString } from '@lib/util/type/template-literal'
import { p } from './p'

const FLAGS_AFFECTING_SYNTAX = Object.freeze(new Set([
  'i',
  'm',
  's',
  'u',
  'v',
] as const))

export const regexp = ConfigurableTag({
  flags: '',
}, ({ flags }, consts, ...args) => {
  const pattern = reassembleTaggedString(consts, args, {
    processArg(arg) {
      if (arg instanceof RegExp) {
        for (const flag of FLAGS_AFFECTING_SYNTAX) {
          if (arg.flags.includes(flag) !== flags.includes(flag)) {
            throw new TypeError(p`
              Insertion of a regular expression as argument of template literal
              requires matching of flags that affect the syntax:
              ${Array.from(FLAGS_AFFECTING_SYNTAX).join(', ')}.

              But the flag "${flag}" is incompatible for the argument:
              ${String(arg)}.
            `)
          }
        }

        return arg.source
      }

      return escape(String(arg))
    },
  })

  return new RegExp(pattern, flags)
})
