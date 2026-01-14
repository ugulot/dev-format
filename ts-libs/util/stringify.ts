/**
 * @param value value to convert into string
 * @param _index unused, but reserved for safe use as callback for `Array.map`
 * @param _array unused, but reserved for safe use as callback for `Array.map`
 * @returns arbitrary string representation of the `value`
 */
export const stringify = (value: unknown, _index?: number, _array?: unknown[]) =>
  value === null ?
    'null' :
  value === undefined ?
    'undefined' :
  typeof value === 'boolean' ?
    String(value) :
  typeof value === 'number' ?
    Object.is(value, -0) ? '-0' : String(value) :
  typeof value === 'bigint' ?
    `${String(value)}n` :
  typeof value === 'string' ?
    `"${value}"` :
  typeof value === 'symbol' ?
    (() => {
      const standardSymbolName = Object.getOwnPropertyNames(Symbol).find(name => Symbol[name] === value)
      return (
        standardSymbolName ?
          `Symbol.${standardSymbolName}` :
        typeof value.description === 'string' ?
          `Symbol("${value.description}")` :
          `Symbol()`
      )
    })() :
  value instanceof Boolean
  || value instanceof Number
  || value instanceof BigInt
  || value instanceof String
  || value instanceof Symbol ?
    `Object(${stringify(value.valueOf())})` :
  typeof value === 'function' ?
    [value.constructor.name, `${value.name ? `{ name: ${value.name} }` : ''}`].join(' ') :
  typeof value !== 'object' ?
    (() => {
      console.error('An unknown type was encountered. Perhaps a new primitive type was implemented in ECMAScript.')
      return '<unknown type value>'
    })() :
  value instanceof Array ?
    `[${value.map(stringify).join(', ')}]` :
  value instanceof Set ?
    `Set ${stringify(Array.from(value.values()))}` :
  value instanceof Map ?
    `Map ${stringify(Array.from(value.entries()))}` :
    `{ ${
      [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)]
        .map((key) => {
          const descriptor = Object.getOwnPropertyDescriptor(value, key)

          if (descriptor.get) {
            return `get ${typeof key === 'symbol' ? `[${String(key)}]` : key}: <...>`
          }

          return `${typeof key === 'symbol' ? `[${String(key)}]` : key}: ${stringify(descriptor.value)}`
        })
        .join(', ')
    } }`
