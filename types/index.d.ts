type ScrollAlignment = 'start' | 'center' | 'end' | 'auto'

interface ScrollToOptions {
  align: ScrollAlignment
}

interface ScrollToOffsetOptions extends ScrollToOptions {}
interface ScrollToIndexOptions extends ScrollToOptions {}

export type VirtualItem = {
  index: number
  start: number
  end: number
  size: number
  measureRef: (el: HTMLElement | null) => void
  isVisible: boolean
}

export interface Range {
  start: number
  end: number
  overscan: number
  size: number
}

declare function defaultRangeExtractor(range: Range): number[]

declare function useVirtual<T>(options: {
  size: number
  parentRef: React.RefObject<T>
  estimateSize?: (index: number) => number
  overscan?: number
  horizontal?: boolean
  scrollToFn?: (
    offset: number,
    defaultScrollToFn?: (offset: number) => void
  ) => void
  paddingStart?: number
  paddingEnd?: number
  useObserver?: (
    ref: React.RefObject<T>
  ) => {
    width: number
    height: number
    [key: string]: any
  }
  keyExtractor?: (index: number) => number | string
  onScrollElement?: React.RefObject<HTMLElement>
  scrollOffsetFn?: (event?: Event) => number
  rangeExtractor?: (range: Range) => number[]
}): {
  virtualItems: VirtualItem[]
  totalSize: number
  scrollToOffset: (index: number, options?: ScrollToOffsetOptions) => void
  scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void
  measure: () => void
}

export { defaultRangeExtractor, useVirtual }
