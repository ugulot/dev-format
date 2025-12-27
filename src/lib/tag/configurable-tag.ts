import type { Tag } from './tag'
import {
  type NonTemplateStringsArray,
  isTemplateStringsArray,
} from '../util/type/template-literal'

export interface ConfigurableTag<Arg, Returned, Options> extends Tag<Arg, Returned> {
  (options: NonTemplateStringsArray<Options>): Tag<Arg, Returned>
}

/**
 * @example
 * ```
 * const tag = tagWithOptions({
 *   digitsOnly: false,
 * }, ({ digitsOnly }, consts, ...args) => {
 *   const result = reassembleTaggedString(consts, ...args)
 *
 *   if (digitsOnly && !/^\d*$/.test(result)) {
 *     throw new TypeError
 *   }
 *
 *   return result
 * })
 *
 * {
 *   let catchedError: Error | undefined
 *   try {
 *     console.log(tag`T1000`)
 *   } catch (error) {
 *     catchedError = error
 *   } finally {
 *     console.assert(catchedError === undefined)
 *   }
 * }
 *
 * {
 *   let catchedError: Error | undefined
 *   try {
 *     console.log(tag({ digitsOnly: true })`T1000`)
 *   } catch (error) {
 *     catchedError = error
 *   } finally {
 *     console.assert(catchedError instanceof Error)
 *   }
 * }
 * ```
 */
export function configurableTag<Arg, Returned, Options>(
  defaultOptions: NonTemplateStringsArray<Options>,
  handle: (options: Options, consts: TemplateStringsArray, ...args: readonly Arg[]) => Returned,
): ConfigurableTag<Arg, Returned, Options> {
  return tag

  function tag(consts: TemplateStringsArray, ...args: readonly Arg[]): Returned
  function tag(options: NonTemplateStringsArray<Options>): Tag<Arg, Returned>
  function tag(first: TemplateStringsArray | Options, ...rest: readonly Arg[]) {
    if (isTemplateStringsArray(first)) {
      return handle(defaultOptions, first, ...rest)
    }
    else {
      return (consts: TemplateStringsArray, ...args: readonly Arg[]) => handle(first, consts, ...args)
    }
  }
}
