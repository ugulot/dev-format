import { describe, it, expect } from 'vitest'
import {
  type ProcessArg,
  type ProcessConst,
  type ProcessContextArg,
  type ProcessContextConst,
  reassembleTaggedString,
  useNonNullableArg,
  useRawConst
} from './template-literal'
import { tag } from '@lib/tag/tag'

const disassemble = tag((consts, ...args) => ({ consts, args }))

describe(`${reassembleTaggedString.name}()`, () => {
  it('assemble simple ', () => {
    {
      const { consts, args } = disassemble`ab${123}cd${456}ef`
      expect(reassembleTaggedString(consts, args)).toStrictEqual('ab123cd456ef')
    }

    {
      const { consts, args } = disassemble`${0}ab${123}cd${456}ef`
      expect(reassembleTaggedString(consts, args)).toStrictEqual('0ab123cd456ef')
    }

    {
      const { consts, args } = disassemble`ab${123}cd${456}ef${789}`
      expect(reassembleTaggedString(consts, args)).toStrictEqual('ab123cd456ef789')
    }
  })

  it('option "processArg" allows to replace argument based on the context', () => {
    {
      const processArg: ProcessArg<unknown> =
        arg => `${arg ?? ''}`
      const { consts, args } = disassemble`ab${123}cd${456}ef${null}gh${undefined}ij`
      expect(reassembleTaggedString(consts, args, { processArg })).toStrictEqual('ab123cd456efghij')
    }

    {
      const processArg: ProcessArg<unknown> =
        (arg, { i, consts }) => consts[i]?.endsWith('@') ? String(arg ?? '').toLowerCase() : String(arg ?? '')

      const userName = 'Alex123'
      const { consts, args } = disassemble`Hello @${userName}`
      expect(reassembleTaggedString(consts, args, { processArg })).toStrictEqual('Hello @alex123')
    }
  })

  it('option "processArg" provides entire context', () => {
    const contexts: ProcessContextArg<unknown>[] = []
    const processArg: ProcessArg<unknown> = (arg, context) => {
      contexts.push(context)
      return ''
    }

    const { consts, args } = disassemble`ab${123}cd${456}ef`
    reassembleTaggedString(consts, args, { processArg })

    expect(contexts[0]?.i).toBe(0)
    expect(contexts[1]?.i).toBe(1)
    expect(contexts[0]?.args).toBe(args)
    expect(contexts[1]?.args).toBe(args)
    expect(contexts[0]?.consts).toBe(consts)
    expect(contexts[1]?.consts).toBe(consts)
  })

  it('option "processConst" allows to replace constant part based on the context', () => {
    const uppercase = tag((consts, ...args) => {
      return reassembleTaggedString(consts, args, {
        processConst: constPart => constPart.toUpperCase(),
      })
    })

    expect(uppercase`AB${'cd'}ef`).toStrictEqual('ABcdEF')
  })

  it('option "processConst" provides entire context', () => {
    const contexts: ProcessContextConst<unknown>[] = []
    const processConst: ProcessConst<unknown> = (arg, context) => {
      contexts.push(context)
      return ''
    }

    const { consts, args } = disassemble`a\n${'b'}c`
    reassembleTaggedString(consts, args, { processConst })

    expect(contexts[0]?.i).toBe(0)
    expect(contexts[1]?.i).toBe(1)
    expect(contexts[0]?.args).toBe(args)
    expect(contexts[1]?.args).toBe(args)
    expect(contexts[0]?.consts).toBe(consts)
    expect(contexts[1]?.consts).toBe(consts)
    expect(contexts[0]?.raw).toBe('a\\n')
    expect(contexts[1]?.raw).toBe('c')
  })
})

describe(`${useNonNullableArg.name}()`, () => {
  it('processes nullable arguments as empty string', () => {
    const { consts, args } = disassemble`a${null}b`
    expect(reassembleTaggedString(consts, args, { processArg: useNonNullableArg })).toStrictEqual('ab')
  })
})

describe(`${useRawConst.name}()`, () => {
  it('processes raw characters of template literal', () => {
    const { consts, args } = disassemble`a\n${'b'}c`
    expect(reassembleTaggedString(consts, args, { processConst: useRawConst })).toStrictEqual('a\\nbc')
  })
})
