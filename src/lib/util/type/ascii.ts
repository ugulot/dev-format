export type letter = lowerCaseLetter | upperCaseLetter

export type lowerCaseLetter = Lowercase<
  // Keep Lowercase<...> wrap for clearer display in IDE for the case:
  // an union-type that contains this type.
  | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
  | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
>

export type upperCaseLetter = Uppercase<lowerCaseLetter>
