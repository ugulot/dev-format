import type { MaybeUnknown } from './maybe'
import type { Predicate } from './predicate'

export type NonTemplateStringsArray<T> = T extends TemplateStringsArray ? never : T

export const isTemplateStringsArray = (
  <T>(value: MaybeUnknown<T, readonly string[]> | unknown): value is TemplateStringsArray =>
    Array.isArray(value) && 'raw' in value && Array.isArray(value.raw)
) satisfies Predicate<unknown>

export interface ProcessContext<Arg> {
  readonly i: number
  readonly consts: TemplateStringsArray
  readonly args: readonly Arg[]
}

export interface ProcessContextArg<Arg> extends ProcessContext<Arg> {}

export interface ProcessContextConst<Arg> extends ProcessContext<Arg> {
  readonly raw: string
}

export interface ReassembleTaggedStringOptions<Arg = unknown> {
  readonly raw?: boolean
  readonly processArg?: (arg: Arg, context: ProcessContextArg<Arg>) => string
  readonly processConst?: (constPart: string, context: ProcessContextConst<Arg>) => string
}

export const useNonNullableArg: ReassembleTaggedStringOptions['processArg'] =
  arg => `${arg ?? ''}`

export const useRawConst: ReassembleTaggedStringOptions['processConst'] =
  (_, { raw }) => raw

export function reassembleTaggedString<Arg>(
  consts: TemplateStringsArray,
  args: readonly Arg[] = [],
  {
    processArg = arg => `${arg}`,
    processConst = constPart => constPart,
  }: ReassembleTaggedStringOptions<Arg> = {},
): string {
  const processedArgs = args.map((arg, i) => processArg(arg, { i, args, consts }))

  return consts.reduce(
    (result, s, i) => {
      const processedConst = processConst(
        s,
        {
          i,
          get raw() {
            return this.consts[this.i]
          },
          consts,
          args,
        },
      )

      return result + processedConst + (processedArgs[i] ?? '')
    },
    '',
  )
}
