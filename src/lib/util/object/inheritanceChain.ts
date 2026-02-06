interface Constructor {
  new (): unknown
}

export interface InheritanceChainOptions {
  /**
   * @default false
   *
   * @example
   * ```
   * inheritanceChain(new Array, { reversed: false }) // [[object Object], [object Array]]
   * ```
   *
   * @example
   * ```
   * inheritanceChain(new Array, { reversed: true }) // [[object Array], [object Object]]
   * ```
   */
  reversed?: boolean
}

/**
 * Returns inheritance chain as a list from most superclass to most subclass'.
 */
export const inheritanceChain = (object: object, { reversed = false }: InheritanceChainOptions = {}): Constructor[] => {
  const chain: Constructor[] = []

  let prototype = Object.getPrototypeOf(object)
  if (!prototype) return []
  chain.push(prototype.constructor)

  while ((prototype = Object.getPrototypeOf(prototype))) {
    chain.push(prototype.constructor)
  }

  return reversed ? chain : chain.reverse()
}
