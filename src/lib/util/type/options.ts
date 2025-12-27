function options<Opt extends object, const ConstOpt extends object>(defaultOptions: Opt & ConstOpt) {
  return {
    defualtOptions: defaultOptions as ConstOpt,
    example: defaultOptions as Opt,
  }
}

const { defualtOptions, example } = options({
  /**
   * The absolute value of a step. A sign will be computed based on `start`
   * and `end`
   *
   * @default 1
   */
  step: 1,
})

example.step
defualtOptions.step
