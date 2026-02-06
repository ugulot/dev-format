export interface Tag<
  Args extends readonly unknown[] = readonly unknown[],
  Returned = unknown,
> {
  (consts: TemplateStringsArray, ...args: Args): Returned
}

export function tag<
  const Args extends readonly unknown[],
  const Returned,
>(handle: Tag<Args, Returned>) {
  return handle
}
