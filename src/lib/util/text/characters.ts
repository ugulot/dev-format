import { regexp } from '@tags/regexp'

export const INLINE_SPACE_CHARACTERS = {
  'Space': '\u0020',
  'Horizontal Tabulation': '\t',
  'Vertical Tabulation': '\v',
  'No-Break Space': '\u00a0',
  'Ogham Space Mark': '\u1680',
  'Mongolian Vowel Separator': '\u180e',
  'En Quad': '\u2000',
  'Em Quad': '\u2001',
  'En Space': '\u2002',
  'Em Space': '\u2003',
  'Three-Per-Em Space': '\u2004',
  'Four-Per-Em Space': '\u2005',
  'Six-Per-Em Space': '\u2006',
  'Figure Space': '\u2007',
  'Punctuation Space': '\u2008',
  'Thin Space': '\u2009',
  'Hair Space': '\u200a',
  'Narrow No-Break Space': '\u202f',
  'Medium Mathematical Space': '\u205f',
  'Ideographic Space': '\u3000',
} as const

export const END_OF_LINE_CHARACTERS = {
  'Null': '\0',
  'Form Feed': '\f',
  'New Line': '\n',
  'Carriage Return': '\r',
  'Line Separator': '\u2028',
  'Paragraph Separator': '\u2029',
} as const

export const ASCII = {
  S: INLINE_SPACE_CHARACTERS['Space'],
  TAB: INLINE_SPACE_CHARACTERS['Horizontal Tabulation'],
}

export const SEQUENCES = {
  /** Whitespace */
  WS: /\s+/g,

  /** Optional whitespace pattern */
  OWS: /\s*/g,

  /** End of line */
  EOL: /(?:\r\n|\r|\n)/g,
}

export const PLAIN_TEXT = {
  /** New paragraph */
  get NP() {
    // getter is necessary because "p" and "regexp" are cyclically dependent
    // on each other ??? FIXME
    const { OWS, EOL } = SEQUENCES
    return regexp({ flags: 'g' })`${OWS}${EOL}${OWS}${EOL}${OWS}`
  },
}
