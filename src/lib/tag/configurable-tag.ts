import type { Tag } from './tag'
import {
  type NonTemplateStringsArray,
  isTemplateStringsArray,
} from '@lib/util/type/template-literal'

export interface ConfigurableTag<
  Args extends readonly unknown[] = readonly unknown[],
  Returned = unknown,
  Options = {},
> {
  (consts: TemplateStringsArray, ...args: Args): Returned
  (options: NonTemplateStringsArray<Options>): Tag<Args, Returned>
}

export function configurableTag<
  const Args extends readonly unknown[],
  Returned,
  const Options extends object,
>(
  options: NonTemplateStringsArray<Options>,
  handle: (options: Options, consts: TemplateStringsArray, ...args: Args) => Returned,
): ConfigurableTag<Args, Returned, Options> {
  return tag

  function tag(consts: TemplateStringsArray, ...args: Args): Returned
  function tag(options: Options): Tag<Args, Returned>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function tag(firstArg: any, ...restArgs: any) {
    if (isTemplateStringsArray(firstArg)) {
      const consts = firstArg
      const args = restArgs

      return handle(options, consts, ...args)
    }
    else {
      const options = firstArg
      const tag = (consts: TemplateStringsArray, ...args: Args) =>
        handle(options, consts, ...args)

      return tag
    }
  }
}
