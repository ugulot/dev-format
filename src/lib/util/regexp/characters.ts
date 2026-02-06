export const INLINE_SPACE_CHARACTERS = [
  '\u0020', // Space
  '\t', // Horizontal Tabulation
  '\v', // Vertical Tabulation
  '\u00a0', // No-Break Space
  '\u1680', // Ogham Space Mark
  '\u180e', // Mongolian Vowel Separator
  '\u2000', // En Quad
  '\u2001', // Em Quad
  '\u2002', // En Space
  '\u2003', // Em Space
  '\u2004', // Three-Per-Em Space
  '\u2005', // Four-Per-Em Space
  '\u2006', // Six-Per-Em Space
  '\u2007', // Figure Space
  '\u2008', // Punctuation Space
  '\u2009', // Thin Space
  '\u200a', // Hair Space
  '\u202f', // Narrow No-Break Space
  '\u205f', // Medium Mathematical Space
  '\u3000', // Ideographic Space
] as const

export const END_OF_LINE_CHARACTERS = [
  '\0', // Null
  '\f', // Form Feed
  '\n', // New Line
  '\r', // Carriage Return
  '\u2028', // Line Separator
  '\u2029', // Paragraph Separator
] as const

export const REGEXP_CHARACTERS = {
  /** space character, but not end of line */
  S: '[' + INLINE_SPACE_CHARACTERS.join('') + ']',
  /** not space character, but maybe EOL */
  NOT_S: '[^' + INLINE_SPACE_CHARACTERS.join('') + ']',
  /** end of line character */
  EOL: '(?:\r\n|[' + END_OF_LINE_CHARACTERS.join('') + '])',
  /** not end of line character */
  NOT_EOL: '[^' + END_OF_LINE_CHARACTERS.join('') + ']',
}
