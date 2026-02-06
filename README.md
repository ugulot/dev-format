# Dev Format

A TypeScript micro-library that provides functions for constructing text strings which used only during development, such as code snippets or error messages.

## Fundamentals

1. Use a tagged template literals;
2. Skip `null`, `undefined` and `''` arguments;
3. Remove the excessive indentation, which is used to match the indentation of the outer code;
4. Tags may have options.

<div id="p"></div>

## Tag `p`

`p` constructs a paragraph from any text inside. Line breaks and excessive indentation will be removed.

<!-- TODO: add example -->

<div id="pre-and-code"></div>

## Tags `pre` and `code`

<div id="pre"></div>

`pre`

<!-- TODO: add example -->

<div id="code"></div>

`code` is like [`pre`](#pre) but behaves like [`String.raw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw).

“Grave Accent” symbol and `${` should be escaped.

```ts
const fragment = code`
  const fn = code\`
    function fn(a, b) {
      return a + b
    }
  \`
`
```

```ts
const generatedCode = code`
  ${import('./code').fn}
`
```

## Examples

```ts
import { bound } from 'dev-format/tags/bound.ts'
import { p } from 'dev-format/tags/p.ts'

function letter(recipientName?: string) {
  return p`
    Hello${bound`, dear ${recipientName}`}!
    How are you?

    We look forward to seeing you...
  `
}

console.assert(
  letter() === p`
    Hello!

    We look forward to seeing you...
  `
)

console.assert(
  letter('Alex') === p`
    Hello, dear Alex!

    We look forward to seeing you...
  `
)
```
