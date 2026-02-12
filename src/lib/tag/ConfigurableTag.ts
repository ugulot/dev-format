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
  <const OverridedOptions extends Options>(
    options: NonTemplateStringsArray<OverridedOptions>
  ): ConfigurableTag<Args, Returned, OverridedOptions>
}

export function ConfigurableTagOptions<const Options extends {}>(options: NonTemplateStringsArray<Options>) {
  return options
}

export function ConfigurableTag<
  const Args extends readonly unknown[],
  Returned,
  const Options extends {},
>(
  options: NonTemplateStringsArray<Options>,
  handle: (options: Options, consts: TemplateStringsArray, ...args: Args) => Returned,
): ConfigurableTag<Args, Returned, Options> {
  return ReconfigurableTag

  function ReconfigurableTag(consts: TemplateStringsArray, ...args: Args): Returned
  function ReconfigurableTag<const OverridedOptions extends Options>(
    options: NonTemplateStringsArray<OverridedOptions>,
  ): ConfigurableTag<Args, Returned, OverridedOptions>
  function ReconfigurableTag(firstArg: TemplateStringsArray | Options, ...restArgs: Args | readonly never[]) {
    if (isTemplateStringsArray(firstArg)) {
      const consts = firstArg
      const args = restArgs as Args

      return handle(options, consts, ...args)
    }
    else {
      const overridedOptions = firstArg

      return ConfigurableTag({ ...options, ...overridedOptions }, handle)
    }
  }
}
