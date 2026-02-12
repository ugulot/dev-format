import { ConfigurableTagOptions } from '@lib/tag/ConfigurableTag'

export const newLineSequenceKey = Symbol('newLineSequence')

export const newLineSequenceDefaultOptions = ConfigurableTagOptions({
  [newLineSequenceKey]: '\n',
})
