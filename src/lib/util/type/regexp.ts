export interface RegExpFlags {
  /** Generate indices for substring matches. */
  hasIndices: 'd'

  /** Global search. */
  global: 'g'

  /** Case-insensitive search. */
  ignoreCase: 'i'

  /** Makes ^ and $ match the start and end of each line instead of those of the entire string. */
  multiline: 'm'

  /** Allows . to match newline characters. */
  dotAll: 's'

  /** "Unicode"; treat a pattern as a sequence of Unicode code points. */
  unicode: 'u'

  /** An upgrade to the u mode with more Unicode features. */
  unicodeSets: 'v'

  /** Perform a "sticky" search that matches starting at the current position in the target string. */
  sticky: 'y'
}

export type RegExpPartFlagsMixin<SupportedFlagName extends keyof RegExpFlags> = {
  [name in keyof RegExpFlags]: name extends SupportedFlagName ? RegExp[name] : never
}

export type RegExpPartFlags<SupportedFlagName extends keyof RegExpFlags> =
  RegExp & RegExpPartFlagsMixin<SupportedFlagName>
