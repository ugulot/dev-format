export type Maybe<T> = T | null | undefined

/** Pass a `Type` and `unknown` but not other subtypes of `unknown` */
export type MaybeUnknown<T, Type> =
  T extends Type ?
    T :
  unknown extends T ?
    T :
    never
