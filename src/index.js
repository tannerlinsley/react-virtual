import React from 'react'

import useRect from './useRect'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

const defaultEstimateSize = () => 50

const defaultKeyExtractor = index => index

const defaultMeasureSize = (el, horizontal) => {
  const key = horizontal ? 'offsetWidth' : 'offsetHeight'

  return el[key]
}

export const defaultRangeExtractor = range => {
  const start = Math.max(range.start - range.overscan, 0)
  const end = Math.min(range.end + range.overscan, range.size - 1)

  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

export function useVirtual({
  size = 0,
  estimateSize = defaultEstimateSize,
  overscan = 1,
  paddingStart = 0,
  paddingEnd = 0,
  parentRef,
  horizontal,
  scrollToFn,
  useObserver,
  onScrollElement,
  scrollOffsetFn,
  keyExtractor = defaultKeyExtractor,
  measureSize = defaultMeasureSize,
  rangeExtractor = defaultRangeExtractor,
}) {
  const sizeKey = horizontal ? 'width' : 'height'
  const scrollKey = horizontal ? 'scrollLeft' : 'scrollTop'
  const latestRef = React.useRef({
    scrollOffset: 0,
  })
  const useMeasureParent = useObserver || useRect

  const { [sizeKey]: outerSize } = useMeasureParent(parentRef) || {
    [sizeKey]: 0,
  }

  const defaultScrollToFn = React.useCallback(
    offset => {
      if (parentRef.current) {
        parentRef.current[scrollKey] = offset
      }
    },
    [parentRef, scrollKey]
  )

  const resolvedScrollToFn = scrollToFn || defaultScrollToFn

  scrollToFn = React.useCallback(
    offset => {
      resolvedScrollToFn(offset, defaultScrollToFn)
    },
    [defaultScrollToFn, resolvedScrollToFn]
  )

  const [measuredCache, setMeasuredCache] = React.useState({})

  const measure = React.useCallback(() => setMeasuredCache({}), [])

  const measurements = React.useMemo(() => {
    const measurements = []
    for (let i = 0; i < size; i++) {
      const measuredSize = measuredCache[keyExtractor(i)]
      const start = measurements[i - 1] ? measurements[i - 1].end : paddingStart
      const size =
        typeof measuredSize === 'number' ? measuredSize : estimateSize(i)
      const end = start + size
      measurements[i] = { index: i, start, size, end }
    }
    return measurements
  }, [estimateSize, measuredCache, paddingStart, size, keyExtractor])

  const totalSize = (measurements[size - 1]?.end || 0) + paddingEnd

  latestRef.current.measurements = measurements
  latestRef.current.outerSize = outerSize
  latestRef.current.totalSize = totalSize

  const [range, setRange] = React.useState({ start: 0, end: 0 })

  const element = onScrollElement ? onScrollElement.current : parentRef.current

  const scrollOffsetFnRef = React.useRef(scrollOffsetFn)
  scrollOffsetFnRef.current = scrollOffsetFn

  const rangeTimeoutIdRef = React.useRef(null)

  const cancelAsyncRange = React.useCallback(() => {
    if (rangeTimeoutIdRef.current !== null) {
      clearTimeout(rangeTimeoutIdRef.current)
      rangeTimeoutIdRef.current = null
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    rangeTimeoutIdRef.current = setTimeout(() => {
      setRange(prevRange => calculateRange(latestRef.current, prevRange))
    })
    return () => cancelAsyncRange()
  }, [measurements, outerSize, cancelAsyncRange])

  useIsomorphicLayoutEffect(() => {
    if (!element) {
      setRange({ start: 0, end: 0 })
      latestRef.current.scrollOffset = 0

      return
    }

    const onScroll = event => {
      const scrollOffset = scrollOffsetFnRef.current
        ? scrollOffsetFnRef.current(event)
        : element[scrollKey]

      latestRef.current.scrollOffset = scrollOffset

      cancelAsyncRange()
      setRange(prevRange => calculateRange(latestRef.current, prevRange))
    }

    // Determine initially visible range
    onScroll()

    element.addEventListener('scroll', onScroll, {
      capture: false,
      passive: true,
    })

    return () => {
      element.removeEventListener('scroll', onScroll)
    }
  }, [element, scrollKey, cancelAsyncRange])

  const measureSizeRef = React.useRef(measureSize)
  measureSizeRef.current = measureSize

  const virtualItems = React.useMemo(() => {
    const indexes = rangeExtractor({
      start: range.start,
      end: range.end,
      overscan,
      size: measurements.length,
    })

    const virtualItems = []

    for (let k = 0, len = indexes.length; k < len; k++) {
      const i = indexes[k]
      const measurement = measurements[i]

      const item = {
        ...measurement,
        measureRef: el => {
          if (el) {
            const measuredSize = measureSizeRef.current(el, horizontal)

            if (measuredSize !== item.size) {
              const { scrollOffset } = latestRef.current

              if (item.start < scrollOffset) {
                defaultScrollToFn(scrollOffset + (measuredSize - item.size))
              }

              setMeasuredCache(old => ({
                ...old,
                [keyExtractor(i)]: measuredSize,
              }))
            }
          }
        },
      }

      virtualItems.push(item)
    }

    return virtualItems
  }, [
    defaultScrollToFn,
    horizontal,
    keyExtractor,
    measurements,
    overscan,
    range.end,
    range.start,
    rangeExtractor,
  ])

  const mountedRef = React.useRef()

  useIsomorphicLayoutEffect(() => {
    if (mountedRef.current) {
      if (estimateSize) setMeasuredCache({})
    }
    mountedRef.current = true
  }, [estimateSize])

  const scrollToOffset = React.useCallback(
    (toOffset, { align = 'start' } = {}) => {
      const { scrollOffset, outerSize } = latestRef.current

      if (align === 'auto') {
        if (toOffset <= scrollOffset) {
          align = 'start'
        } else if (toOffset >= scrollOffset + outerSize) {
          align = 'end'
        } else {
          align = 'start'
        }
      }

      if (align === 'start') {
        scrollToFn(toOffset)
      } else if (align === 'end') {
        scrollToFn(toOffset - outerSize)
      } else if (align === 'center') {
        scrollToFn(toOffset - outerSize / 2)
      }
    },
    [scrollToFn]
  )

  const tryScrollToIndex = React.useCallback(
    (index, { align = 'auto', ...rest } = {}) => {
      const { measurements, scrollOffset, outerSize } = latestRef.current

      const measurement = measurements[Math.max(0, Math.min(index, size - 1))]

      if (!measurement) {
        return
      }

      if (align === 'auto') {
        if (measurement.end >= scrollOffset + outerSize) {
          align = 'end'
        } else if (measurement.start <= scrollOffset) {
          align = 'start'
        } else {
          return
        }
      }

      const toOffset =
        align === 'center'
          ? measurement.start + measurement.size / 2
          : align === 'end'
          ? measurement.end
          : measurement.start

      scrollToOffset(toOffset, { align, ...rest })
    },
    [scrollToOffset, size]
  )

  const scrollToIndex = React.useCallback(
    (...args) => {
      // We do a double request here because of
      // dynamic sizes which can cause offset shift
      // and end up in the wrong spot. Unfortunately,
      // we can't know about those dynamic sizes until
      // we try and render them. So double down!
      tryScrollToIndex(...args)
      requestAnimationFrame(() => {
        tryScrollToIndex(...args)
      })
    },
    [tryScrollToIndex]
  )

  return {
    virtualItems,
    totalSize,
    scrollToOffset,
    scrollToIndex,
    measure,
  }
}

const findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    let middle = ((low + high) / 2) | 0
    let currentValue = getCurrentValue(middle)

    if (currentValue < value) {
      low = middle + 1
    } else if (currentValue > value) {
      high = middle - 1
    } else {
      return middle
    }
  }

  if (low > 0) {
    return low - 1
  } else {
    return 0
  }
}

function calculateRange({ measurements, outerSize, scrollOffset }, prevRange) {
  const size = measurements.length - 1
  const getOffset = index => measurements[index].start

  let start = findNearestBinarySearch(0, size, getOffset, scrollOffset)
  let end = start

  while (end < size && measurements[end].end < scrollOffset + outerSize) {
    end++
  }

  if (prevRange.start !== start || prevRange.end !== end) {
    return { start, end }
  }

  return prevRange
}
