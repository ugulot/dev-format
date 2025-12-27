import type { UnivesalTag } from './universal-tag'
import type { ConfigurableTag } from './configurable-tag'

interface UnivesalConfigurableTag<Arg, Returned, Options> extends UnivesalTag<Arg, Returned>, ConfigurableTag<Arg, Returned, Options> {}

const x = {} as UnivesalConfigurableTag<string, string, {}>
x()
