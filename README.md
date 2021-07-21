![React Virtual Header](https://github.com/tannerlinsley/react-virtual/raw/master/media/header.png)

<img src='https://github.com/tannerlinsley/react-virtual/raw/master/media/logo.png' width='300'/>

Hooks for virtualizing scrollable elements in React

<a href="https://twitter.com/intent/tweet?button_hashtag=TanStack" target="\_parent">
  <img alt="#TanStack" src="https://img.shields.io/twitter/url?color=%2308a0e9&label=%23TanStack&style=social&url=https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Fbutton_hashtag%3DTanStack">
</a><a href="https://github.com/tannerlinsley/react-virtual/actions?query=workflow%3A%22react-virtual+tests%22">
<img src="https://github.com/tannerlinsley/react-virtual/workflows/react-virtual%20tests/badge.svg" />
</a><a href="https://npmjs.com/package/react-virtual" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/react-virtual.svg" />
</a><a href="https://bundlephobia.com/result?p=react-virtual@latest" target="\_parent">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/react-virtual@latest" />
</a><a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a><a href="https://github.com/tannerlinsley/react-virtual/discussions">
  <img alt="Join the discussion on Github" src="https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue" />
</a><a href="https://github.com/tannerlinsley/react-virtual" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/tannerlinsley/react-virtual.svg?style=social&label=Star" />
</a><a href="https://twitter.com/tannerlinsley" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/tannerlinsley.svg?style=social&label=Follow" />
</a>

Enjoy this library? Try them all! [React Table](https://github.com/tannerlinsley/react-table), [React Query](https://github.com/tannerlinsley/react-query), [React Form](https://github.com/tannerlinsley/react-form),
[React Charts](https://github.com/tannerlinsley/react-charts)

## Quick Features

- Row, Column, and Grid virtualization
- One single **headless** hook
- Fixed, variable and dynamic measurement modes
- Imperative scrollTo control for offset, indices and alignment
- Custom scrolling function support (eg. smooth scroll)
- <a href="https://bundlephobia.com/result?p=react-virtual@latest" target="\_parent">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/react-virtual@latest" />
  </a>

## Examples

- Fixed Rows/Cols/Grid- [CodeSandbox](https://codesandbox.io/s/github/tannerlinsley/react-virtual/tree/master/examples/fixed) - [Source](./examples/fixed)
- Variable Rows/Cols/Grid- [CodeSandbox](https://codesandbox.io/s/github/tannerlinsley/react-virtual/tree/master/examples/variable) - [Source](./examples/variable)
- Dynamic Rows/Cols/Grid- [CodeSandbox](https://codesandbox.io/s/github/tannerlinsley/react-virtual/tree/master/examples/dynamic) - [Source](./examples/dynamic)
- Smooth Scrolling - [CodeSandbox](https://codesandbox.io/s/github/tannerlinsley/react-virtual/tree/master/examples/smooth-scroll) - [Source](./examples/smooth-scroll)
- Infinite Scrolling - [CodeSandbox](https://codesandbox.io/s/github/tannerlinsley/react-virtual/tree/master/examples/infinite-scroll) - [Source](./examples/infinite-scroll)

## Sponsors

This library is being built and maintained by me, @tannerlinsley and I am always in need of more support to keep projects like this afloat. If you would like to get premium support, add your logo or name on this README, or simply just contribute to my open source Sponsorship goal, [visit my Github Sponsors page!](https://github.com/sponsors/tannerlinsley/)

[![Diamond Sponsors](https://raw.githubusercontent.com/tannerlinsley/files/master/sponsorships/diamond.png)](https://github.com/sponsors/tannerlinsley)

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/sponsors/tannerlinsley" target="_blank">
          Get Your Logo Here!
        </a>
      </td>
    </tr>
  </tbody>
</table>

[![Diamond Sponsors](https://raw.githubusercontent.com/tannerlinsley/files/master/sponsorships/gold.png)](https://github.com/sponsors/tannerlinsley)

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/sponsors/tannerlinsley" target="_blank">
          Get Your Logo Here!
        </a>
      </td>
    </tr>
  </tbody>
</table>

[![Diamond Sponsors](https://raw.githubusercontent.com/tannerlinsley/files/master/sponsorships/silver.png)](https://github.com/sponsors/tannerlinsley)

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://nozzle.io" target="_blank">
          <img width='225' src="https://nozzle.io/img/logo-blue.png">
        </a>
      </td>
    </tr>
  </tbody>
</table>

[![Diamond Sponsors](https://raw.githubusercontent.com/tannerlinsley/files/master/sponsorships/bronze.png)](https://github.com/sponsors/tannerlinsley)

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/sponsors/tannerlinsley" target="_blank">
          Get Your Logo Here!
        </a>
      </td>
    </tr>
  </tbody>
</table>

[![Diamond Sponsors](https://raw.githubusercontent.com/tannerlinsley/files/master/sponsorships/supporters.png)](https://github.com/sponsors/tannerlinsley)

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/sponsors/tannerlinsley" target="_blank">
          Get Your Name Here!
        </a>
      </td>
    </tr>
  </tbody>
</table>

[![Diamond Sponsors](https://raw.githubusercontent.com/tannerlinsley/files/master/sponsorships/fans.png)](https://github.com/sponsors/tannerlinsley)

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/sponsors/tannerlinsley" target="_blank">
          Get Your Name Here!
        </a>
      </td>
    </tr>
  </tbody>
</table>

### [Become a Sponsor](https://github.com/sponsors/tannerlinsley/)

# Documentation

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Sample](#sample)
- [API](#api)
  - [`useVirtual`](#usevirtual)
- [Contributors ✨](#contributors-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

```bash
$ npm i --save react-virtual
# or
$ yarn add react-virtual
```

# Why?

React Virtual's most distinguishing feature is that it's just one single custom hook instead of a set of components. In more trendy terms, this means that it is "headless", allowing you to control 100% all of the markup and styles, exactly how you want.

React Virtual supplies you with primitive **utilities** that allow you to build any range of virtualized experiences. **One testament to this** is that you can combine 2 instances of `useVirtual` onto the same markup to achieve a virtualized grid, where with other utilites, you would need to use a dedicated `Grid`-like component.

# Sample

This is just a quick sample of what it looks like to use React Virtual. Please refer to the examples for more usage patterns.

```js
function RowVirtualizerFixed() {
  const parentRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: 10000,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
  })

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `150px`,
          width: `300px`,
          overflow: 'auto',
        }}
      >
        <div
          className="ListInner"
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              Row {virtualRow.index}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
```

# API

## `useVirtual`

```js
const {
  virtualItems: [
    { index, start, size, end, measureRef },
    /* ... */
  ],
  totalSize,
  scrollToIndex,
  scrollToOffset,
} = useVirtual({
  size,
  parentRef,
  estimateSize,
  overscan,
  horizontal,
  scrollToFn,
  useObserver,
})
```

### Options

- `size: Integer`
  - **Required**
  - The total count of elements
- `parentRef: React.useRef(DOMElement)`
  - **Required**
  - The parent element whose inner-content is scrollable
- `estimateSize: Function(index) => Integer`
  - Defaults to `() => 50`
  - **Required**
  - **Must be memoized using `React.useCallback()`**
  - This function receives the index of each item and should return either:
    - A fixed size
    - A variable size per-item
    - A best-guess size (when using dynamic measurement rendering)
  - When this function's memoization changes, the entire list is recalculated
- `overscan: Integer`
  - Defaults to `1`
  - The amount of items to load both behind and ahead of the current window range
- `horizontal: Boolean`
  - Defaults to `false`
  - When `true`, this virtualizer will use `width` and `scrollLeft` instead of `height` and `scrollTop` to determine size and offset of virtualized items.
- `scrollToFn: Function(offset, defaultScrollToFn) => void 0`
  - Optional
  - This function, if passed, is responsible for implementing the scrollTo logic for the parentRef which is used when methods like `scrollToOffset` and `scrollToIndex` are called.
  - Eg. You can use this function to implement smooth scrolling by using the supplied offset and the `defaultScrollToFn` as seen in the sandbox's **Smooth Scroll** example.
- `useObserver: Function(parentRef) => ({ width: number; height: number })`
  - Optional
  - This hook, if passed, is responsible for getting `parentRef`'s dimensions
  - Eg. You can use this hook to replace [@reach/observe-rect](https://github.com/reach/observe-rect) that `react-virtual` uses by default with [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
    - Caution! Depending on your bundling target, you might need to add [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill)
- `paddingStart: Integer`
  - Defaults to `0`
  - The amount of padding in pixels to add to the start of the virtual list
- `paddingEnd: Integer`
  - Defaults to `0`
  - The amount of padding in pixels to add to the end of the virtual list
  - `onScrollElement: React.useRef(DOMElement)`
   - Optional
   - Allows using a different element to bind the `onScroll` event to
 - `scrollOffsetFn: Function(event?: Event) => number`
   - Optional
   - This function, if passed, is called on scroll to get the scroll offest rather than using `parentRef`'s `width` or `height`
- `keyExtractor: Function(index: Integer) => String | Integer`
  - Optional
  - Defaults to `index => index`
  - This function receives the index of each item and should return the item's unique ID.
  - This function should be passed whenever dynamic measurement rendering is enabled and the size or order of items in the list changes.
- `rangeExtractor: Function(range: {start: number; end: number; overscan: number; size: number}) => number[]`
  - Optional
  - Defaults to `defaultRangeExtractor`, is exported
  - **Must be memoized using `React.useCallback()`**
  - This function receives visible range parameters and should return array of indexes to render
### Returns

- `virtualItems: Array<item>`
  - `item: Object`
    - `key: String | Integer`
      - The key of the item, calculated via `keyExtractor`
    - `index: Integer`
      - The index of the item
    - `start: Integer`
      - The starting measurement of the item
      - Most commonly used for positioning elements
    - `size: Integer`
      - The static/variable or, if dynamically rendered, the measured size of the item
    - `end: Integer`
      - The ending measurement of the item
    - `measureRef: React.useRef | Function(el: DOMElement) => void 0`
      - The ref/function to place on the rendered element to enable dynamic measurement rendering
- `totalSize: Integer`
  - The total size of the entire virtualizer
  - When using dynamic measurement refs, this number may change as items are measured after they are rendered.
- `scrollToIndex: Function(index: Integer, { align: String }) => void 0`
  - Call this function to scroll the top/left of the parentRef element to the start of the item located at the passed index.
  - `align: 'start' | 'center' | 'end' | 'auto'`
    - Defaults to `auto`
    - `start` places the item at the top/left of the visible scroll area
    - `center` places the item in the center of the visible scroll area
    - `end` places the item at the bottom/right of the visible scroll area
    - `auto` brings the item into the visible scroll area either at the start or end, depending on which is closer. If the item is already in view, it is placed at the `top/left` of the visible scroll area.
- `scrollToOffset: Function(offsetInPixels: Integer, { align: String }) => void 0`
  - Call this function to scroll the top/left of the parentRef element to the passed pixel offset.
  - `align: 'start' | 'center' | 'end' | 'auto'`
    - Defaults to `start`
    - `start` places the offset at the top/left of the visible scroll area
    - `center` places the offset in the center of the visible scroll area
    - `end` places the offset at the bottom/right of the visible scroll area
    - `auto` brings the offset into the visible scroll area either at the start or end, depending on which is closer. If the offset is already in view, it is placed at the `top/left` of the visible scroll area.

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://tannerlinsley.com"><img src="https://avatars0.githubusercontent.com/u/5580297?v=4" width="100px;" alt=""/><br /><sub><b>Tanner Linsley</b></sub></a><br /><a href="https://github.com/tannerlinsley/react-virtual/commits?author=tannerlinsley" title="Code">💻</a> <a href="#ideas-tannerlinsley" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-tannerlinsley" title="Examples">💡</a> <a href="#maintenance-tannerlinsley" title="Maintenance">🚧</a> <a href="https://github.com/tannerlinsley/react-virtual/pulls?q=is%3Apr+reviewed-by%3Atannerlinsley" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- Force -->
