/**
 * Tag for [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates).
 */
export interface Tag<
  Args extends readonly unknown[] = readonly unknown[],
  Returned = unknown,
> {
  (consts: TemplateStringsArray, ...args: Args): Returned
}

/**
 * Wrap a tag for [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
 * to get better type inference.
 */
export function tag<
  const Args extends readonly unknown[],
  const Returned,
>(handle: Tag<Args, Returned>) {
  return handle
}
