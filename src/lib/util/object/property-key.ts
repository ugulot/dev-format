export type RealPropertyKey<Key extends PropertyKey> =
  Key extends number ?
    `${Key}` :
    Key

export const propertyKeyToString = <Key extends PropertyKey>(key: Key): string => {
  if (typeof key === 'string') {
    return `"${key}"`
  }

  return String(key)
}
