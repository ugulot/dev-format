// FIXME: rewrite with configurableTag()
// export function ol(items: readonly Nullable<string>[]): string
// export function ol(...items: readonly Nullable<string>[]): string
// export function ol(first: readonly Nullable<string>[] | Nullable<string>, ...rest: typeof first extends Nullable<string> ? readonly Nullable<string>[] : []) {
//   const items = typeof first === 'string' || first === null || first === undefined ? [first, ...rest] : first
//   return items
//     .filter(isNonNullish)
//     .map((value, i, { length }) => `${_options.orderedListMarker({ value, i, length })}`)
//     .join('\n')
// }
