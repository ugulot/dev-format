# Dev Format

A TypeScript micro-library that provides functions for constructing text strings which used only during development, such as code snippets or error messages.

## Fundamentals

1. Use a tagged template literals;
2. Skip `null`, `undefined` and `''` arguments;
3. Remove the excessive indentation, which is used to match the indentation of the outer code;
4. Tags may have options.

## Tag `p`

`p` constructs a paragraph from any text inside. Line breaks and excessive indentation will be removed.

<!-- TODO: add example -->

## Tag `regexp`

`regexp` constructs a RegExp instance.

```ts
const letter = /[A-Z]/
const digit = /[0-9]/
const serialNumber = regexp`^${letter}{2}-${digit}{4}$`

console.assert(serialNumber.test('AB-1234'))
console.assert(!serialNumber.test('ab-1234'))
console.assert(!serialNumber.test('AB-12345'))
console.assert(!serialNumber.test('ABC-1234'))
```

## Tag `pre`

`pre`

<!-- TODO: add example -->

## Tag `code`

`code` is like [`pre`](#tag-pre) but behaves like [`String.raw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw).

### Escaped Characters

“Grave Accent” symbol and `${` should be escaped:

```ts
const ID_PREFIX_CONST_PART = 'abcd'

const codeFragment = code`
  const fn = code\`
    function idPrefix(string, prefix) {
      return \`${ID_PREFIX_CONST_PART}\${typeof prefix === 'function'} ? prefix(string) : prefix}\${string}`
    }
  \`
`
```

Explanation:

- ```
  code`
    ...
  `
  ```
  is a tagged template string; 

- ```
  code\`
    ...
  \`
  ```
  is just a raw part of a tagged template `codeFragment`;

- `${ID_PREFIX_CONST_PART}` is not escaped so it is insertion of outside constant `ID_PREFIX_CONST_PART`;

- `\${typeof prefix === 'function'} ? prefix(string) : prefix}` is escaped so it is just a raw part of a tagged template `codeFragment`;

- `\${string}` is escaped so it is just a raw part of a tagged template `codeFragment`.

<!-- TODO: implement it and uncomment

### Code Generation

`code` can be used for primitive code generation based on the `name` and `toString()` properties of the `Function` class.

```ts
const generatedCode = code`
  ${import('./code').fn}
`
```

**Be careful!** The behavior depends on the environment in which the code is executed.
-->

## Complex Example

```ts
import { bound } from 'dev-format/tags/bound.ts'
import { p } from 'dev-format/tags/p.ts'
import { regexp } from 'dev-format/tags/regexp.ts'

const PERSON_NAME_ALPHABET = /[a-z-. ]/i
const PERSON_NAME_PATTERN = regexp({ flags: 'i' })`^${PERSON_NAME_ALPHABET}+$`

function letter(recipientName?: string) {
  if (recipientName && !PERSON_NAME_PATTERN.test(recipientName)) {
    throw new TypeError(p`
      Argument "recipientName" should be an optional string that contains a name
      of person. The alphabet is ${PERSON_NAME_ALPHABET}.

      But the recieved argument is "${recipientName}".
    `)
  }

  return p`
    Hello${bound`, dear ${recipientName}`}!
    How are you?

    We look forward to seeing you...
  `
}

console.assert(
  letter() === p`
    Hello! How are you?

    We look forward to seeing you...
  `
)

console.assert(
  letter('Alex') === p`
    Hello, dear Alex! How are you?

    We look forward to seeing you...
  `
)
```
