import { configurableTag } from '@lib/tag/configurable-tag'
import { reassembleTaggedString } from '@lib/util/type/template-literal'

const FLAGS_AFFECTING_SYNTAX = Object.freeze(new Set([
  'i',
  'm',
  's',
  'u',
  'v',
]))

export const regexp = configurableTag({
  flags: '',
}, ({ flags }, consts, ...args) => {
  const pattern = reassembleTaggedString(consts, args, {
    processArg(arg) {
      if (arg instanceof RegExp) {
        for (const flag of flags) {
          if (!FLAGS_AFFECTING_SYNTAX.has(flag)) {
            throw new TypeError()
          }
        }

        return arg.source
      }

      return String(arg)
    },
  })

  return new RegExp(pattern, flags)
})
