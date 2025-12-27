import type { Tag } from './tag'

export type UniversalTemplateStringsArray = TemplateStringsArray | readonly string[] | string
export type NonUniversalTemplateStringsArray<T> = T extends UniversalTemplateStringsArray ? never : T

export interface UnivesalTag<Arg, Returned> extends Tag<Arg, Returned> {
  /** Fragments which will be splitted by space symbol. */
  (...fragments: string[]): Returned
  (content: string): Returned
}

export function univesalTag<Arg, Returned>(handle: (fragments: readonly string[]) => Returned): UnivesalTag<Arg, Returned> {
  return tag

  function tag(...fragments: readonly string[]): Returned
  function tag(content: string): Returned
  function tag(first: string | readonly string[], ...rest: readonly string[]): Returned {

  }
}
