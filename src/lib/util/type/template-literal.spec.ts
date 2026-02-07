import { describe, it, expect } from 'vitest'
import {
  type ProcessArg,
  reassembleTaggedString
} from './template-literal'
import { tag } from '@lib/tag/tag'

describe(`${reassembleTaggedString.name}()`, () => {
  const disassemble = tag((consts, ...args) => ({ consts, args }))

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

  it('option "processConst" allows to replace constant part based on the context', { todo: true }, () => {

  })
})
