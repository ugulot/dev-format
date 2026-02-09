// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck FIXME

import { describe, it, expect } from 'vitest'
import { __codeHelpers, code } from './code'

describe(`code\`...\``, { todo: true }, () => {
  describe('helpers', () => {
    const {
      prepareConsts,
      prepareArgs,
      removeExtraIndent,
      reassemble,
    } = __codeHelpers

    describe(`${prepareConsts.name}()`, () => {
      it('1', () => {
        expect(prepareConsts('qwerty')).toEqual(['qwerty'])
        // expect(prepareConsts('abc\ndef')).toEqual(['abc', 'def'])
      })
      it('2', () => {
        expect(prepareConsts(['abc', 'xyz'])).toEqual(['abc', 'xyz'])
        expect(prepareConsts(['abc\ndef', 'xyz'])).toEqual(['abc', 'def', 'xyz'])
      })
      it('3', () => {
        expect(prepareConsts`
          abc${null}klmn${null}xyz
          ${null}
          123${null}
        `.map(s => s.trim())).toEqual(['abc', 'klmn', 'xyz', '', '123'])
      })
    })
  })

  it('removes excessive indentation in simple frament (without nested)', { skip: true }, () => {
    expect(code`
      const a = 42
      const b = 100

      console.log(sum(a, b))
    `).toBe(l([
      'const a = 42',
      'const b = 100',
      '',
      'console.log(sum(a, b))',
    ]))
  })

  it('handles empty lines correctly', () => {
    const S = '\u0020' // space
    const T = '\t'
    const indentUnitVariants = [
      `${T}`,
      `${S}${S}`,
      `${S}${S}${S}${S}`,
    ]
    const fragmentIndentVariants = [
      '',
      ...indentUnitVariants,
      ...indentUnitVariants.map(s => s.repeat(2)),
      ...indentUnitVariants.map(s => s.repeat(3)),
    ]
    const emptyLineVariants = [
      '',
      ...indentUnitVariants,
      ...indentUnitVariants.map(s => s.repeat(2)),
      ...indentUnitVariants.map(s => s.repeat(3)),
      ...indentUnitVariants.map(s => s.repeat(4)),
    ]

    const codeFromLines = (lines: string[]) => code(l(lines))
    expect(true).toBe(true)

    // for (const indent of fragmentIndentVariants) {
    //   for (const emptyLine of emptyLineVariants) {
    //     expect(codeFromLines([
    //       `${indent}const a = 42`,
    //       `${indent}const b = 100`,
    //       emptyLine,
    //       `${indent}function negSum(a, b) {`,
    //       `${indent}  const sum = a + b`,
    //       emptyLine,
    //       `${indent}  return -sum`,
    //       `${indent}}`,
    //       emptyLine,
    //       `${indent}console.log(sum(a, b))`,
    //     ])).toBe(l([
    //       'const a = 42',
    //       'const b = 100',
    //       '',
    //       'function negSum(a, b) {',
    //       '  const sum = a + b',
    //       '',
    //       '  return -sum',
    //       '}',
    //       '',
    //       'console.log(sum(a, b))',
    //     ]))
    //   }
    // }
  })

  // it('removes excessive indentation code frament with nested', () => {
  //   expect(code`
  //     const a = 42
  //     const b = 100

  //     function sum(a, b) {
  //       return a + b
  //     }

  //     console.log(sum(a, b))
  //   `).toBe([
  //     'const a = 42',
  //     'const b = 100',
  //     '',
  //     'function sum(a, b) {',
  //     '  return a + b',
  //     '}',
  //     '',
  //     'console.log(sum(a, b))',
  //   ].join('\n'))
  // })

  it('throw error if ', () => {
    expect(() => code`const n = 42`).throws(SyntaxError)

    expect(() => code`const n = 42
      console.log(n)
    `).throws(SyntaxError)

    expect(() => code`
      const n = 42
      console.log(n)`,
    ).throws(SyntaxError)
  })

  it('allow to insert multiline fragments as arguments of template literal, the indentation will be set automatically', { skip: true }, () => {
    const variants = ['VariantA', 'VariantB', 'VariantC']
    const sample = code`
      type Union =
        | 'VariantA'
        | 'VariantB'
        | 'VariantC'
    `

    expect(code`
      type Union =
        ${variants.map(variant => `| '${variant}'`)}
    `).toBe(sample)

    const sampleFn1 = code`
      function f() {
        // ...
      }
    `

    const sampleFn2 = code`
      function g() {
        function f() {
          // ...
        }
      }
    `

    expect(code`
      function g() {
        ${sampleFn1}
      }
    `).toBe(sampleFn2)
  })
})
