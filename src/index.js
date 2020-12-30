import React from 'react'

import useRect from './useRect'
import useWindowRect from './useWindowRect'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

const defaultEstimateSize = () => 50

export function useVirtualWindow({
  windowRef,
  scrollToFn,
  horizontal,
  parentRef,
  ...rest
}) {
  const scrollKey = horizontal ? 'scrollX' : 'scrollY'
  const defaultScrollToFn = React.useCallback(
    offset => {
      if (windowRef.current) {
        windowRef.current[scrollKey] = offset
      }
    },
    [scrollKey, windowRef]
  )

  return useVirtual({
    ...rest,
    horizontal,
    parentRef,
    scrollToFn: scrollToFn || defaultScrollToFn,
    onScrollElement: windowRef,
    scrollOffsetFn() {
      const bounds = parentRef.current.getBoundingClientRect();
      return horizontal ? bounds.left * -1 : bounds.top * -1;
    },
    useObserver: () => useWindowRect(windowRef),
  });
}

export function useVirtual({
  size = 0,
  estimateSize = defaultEstimateSize,
  overscan = 0,
  paddingStart = 0,
  paddingEnd = 0,
  parentRef,
  horizontal,
  scrollToFn,
  useObserver,
  onScrollElement,
  scrollOffsetFn,
}) {
  const sizeKey = horizontal ? 'width' : 'height'
  const scrollKey = horizontal ? 'scrollLeft' : 'scrollTop'
  const latestRef = React.useRef({})
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

  const measurements = React.useMemo(() => {
    const measurements = []
    for (let i = 0; i < size; i++) {
      const measuredSize = measuredCache[i]
      const start = measurements[i - 1] ? measurements[i - 1].end : paddingStart
      const size =
        typeof measuredSize === 'number' ? measuredSize : estimateSize(i)
      const end = start + size
      measurements[i] = { index: i, start, size, end }
    }
    return measurements
  }, [estimateSize, measuredCache, paddingStart, size])

  const totalSize = (measurements[size - 1]?.end || 0) + paddingEnd

  Object.assign(latestRef.current, {
    overscan,
    measurements,
    outerSize,
    totalSize,
  })

  const [range, setRange] = React.useState({ start: 0, end: 0 })

  const element = onScrollElement ? onScrollElement.current : parentRef.current
  useIsomorphicLayoutEffect(() => {
    if (!element) { return }

    const onScroll = () => {
      const scrollOffset = scrollOffsetFn ? scrollOffsetFn() : element[scrollKey]
      latestRef.current.scrollOffset = scrollOffset
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
  }, [element, scrollKey, size /* required */, outerSize /* required */])

  const virtualItems = React.useMemo(() => {
    const virtualItems = []
    const end = Math.min(range.end, measurements.length - 1)

    for (let i = range.start; i <= end; i++) {
      const measurement = measurements[i]

      const item = {
        ...measurement,
        measureRef: el => {
          const { scrollOffset } = latestRef.current

          if (el) {
            const { [sizeKey]: measuredSize } = el.getBoundingClientRect()

            if (measuredSize !== item.size) {
              if (item.start < scrollOffset) {
                defaultScrollToFn(scrollOffset + (measuredSize - item.size))
              }

              setMeasuredCache(old => ({
                ...old,
                [i]: measuredSize,
              }))
            }
          }
        },
      }

      virtualItems.push(item)
    }

    return virtualItems
  }, [range.start, range.end, measurements, sizeKey, defaultScrollToFn])

  const mountedRef = React.useRef()

  useIsomorphicLayoutEffect(() => {
    if (mountedRef.current) {
      if (estimateSize || size) setMeasuredCache({})
    }
    mountedRef.current = true
  }, [estimateSize, size])

  const scrollToOffset = React.useCallback(
    (toOffset, { align = 'start' } = {}) => {
      const { scrollOffset, outerSize } = latestRef.current

      if (align === 'auto') {
        if (toOffset <= scrollOffset) {
          align = 'start'
        } else if (scrollOffset >= scrollOffset + outerSize) {
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
  }
}

function calculateRange({
  overscan,
  measurements,
  outerSize,
  scrollOffset,
}, prevRange) {
  const total = measurements.length
  let start = total - 1
  while (start > 0 && measurements[start].end >= scrollOffset) {
    start -= 1
  }
  let end = 0
  while (end < total - 1 && measurements[end].start <= scrollOffset + outerSize) {
    end += 1
  }

  // Always add at least one overscan item, so focus will work
  start = Math.max(start - overscan, 0)
  end = Math.min(end + overscan, total - 1)

  if (!prevRange || prevRange.start !== start || prevRange.end !== end) {
    return { start, end }
  }

  return prevRange
}
