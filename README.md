# Dev Format

A TypeScript micro-library that provides functions for constructing text strings which used only during development, such as code snippets or error messages.

## Fundamentals

1. Use a tagged template literals;
2. Skip `null`, `undefined` and `''` arguments;
3. Remove the excessive indentation, which is used to match the indentation of the outer code;
4. Some tags may have options.

### Tag

<!-- TODO: add description -->

```ts
interface Tag<Arg, Returned> {
  (consts: TemplateStringsArray, ...args: readonly Arg[]): Returned
}
```

### Universal Tag

<!-- TODO: add description -->

```ts
interface UnivesalTag<Arg, Returned> extends Tag<Arg, Returned> {
  (...sentences: Arg): Returned
  (content: Arg): Returned
}
```

```ts
declare const universalTag = (tag: UniveralTag<T>)
```

`universalTag()` defines a new univesal tag function.

### Tag with Options

<!-- TODO: add description -->

`tagWithOptions()`

```ts
interface TagWithOptions<Arg, Returned, Options> extends Tag<Arg, Returned> {
  (options: NonTemplateStringsArray<Options>): Tag<Arg, Returned>
}
```

## Tags `p`, `div`, `section`

<a href="#p"></a>
### `p`

`p` constructs a paragraph from any text inside. Line breaks and excessive indentation will be removed.

<!-- TODO: add example -->

<a href="#div"></a>
### `div`

`div`

<!-- TODO: add example -->

<a href="#section"></a>
### `section`

<!-- TODO: add example -->

## Tags `pre` and `code`

<a href="#pre"></a>
### `pre`

<!-- TODO: add example -->

<a href="#code"></a>
### `code`

Same as [`pre`](#pre) but behaves like [`String.raw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw).

<!-- TODO: add example -->

#### Options
