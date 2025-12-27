export const split = (string: string) => {
  return Array.from(
    new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(string),
    ({ segment }) => segment,
  )
}
