export interface Tag<Arg, Returned> {
  (consts: TemplateStringsArray, ...args: readonly Arg[]): Returned
}
