import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'

import { useVirtual as useVirtualImpl } from '../index'

function List({
  size = 200,
  overscan,
  height = 200,
  width = 200,
  onRef,
  parentRef,
  useVirtual,
}) {
  const rowVirtualizer = useVirtual({
    size,
    parentRef,
    overscan,
    useObserver: React.useCallback(() => ({ height, width }), [height, width]),
  })

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height,
          width,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              ref={onRef ? onRef(virtualRow) : undefined}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                height: `${virtualRow.size}px`,
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

describe('useVirtual list', () => {
  let useVirtual, parentRef, props

  beforeEach(() => {
    parentRef = React.createRef()
    useVirtual = jest.fn(props => useVirtualImpl(props))

    props = { parentRef, useVirtual }
  })

  it('should render', () => {
    render(<List {...props} />)

    expect(screen.queryByText('Row 0')).toBeInTheDocument()
    expect(screen.queryByText('Row 4')).toBeInTheDocument()
    expect(screen.queryByText('Row 5')).not.toBeInTheDocument()

    expect(useVirtual).toHaveBeenCalledTimes(3)
  })
  it('should render with overscan', () => {
    render(<List {...props} overscan={0} />)

    expect(screen.queryByText('Row 0')).toBeInTheDocument()
    expect(screen.queryByText('Row 3')).toBeInTheDocument()
    expect(screen.queryByText('Row 4')).not.toBeInTheDocument()

    expect(useVirtual).toHaveBeenCalledTimes(3)
  })
  it('should render given dynamic size', () => {
    const onRef = virtualRow => el => {
      if (el) {
        jest.spyOn(el, 'offsetHeight', 'get').mockImplementation(() => 25)
      }
      virtualRow.measureRef(el)
    }

    render(<List {...props} onRef={onRef} />)

    expect(screen.queryByText('Row 0')).toBeInTheDocument()
    expect(screen.queryByText('Row 8')).toBeInTheDocument()
    expect(screen.queryByText('Row 9')).not.toBeInTheDocument()

    expect(useVirtual).toHaveBeenCalledTimes(9)
  })
  it('should render given dynamic size after scroll', () => {
    const onRef = virtualRow => el => {
      if (el) {
        jest.spyOn(el, 'offsetHeight', 'get').mockImplementation(() => 25)
      }
      virtualRow.measureRef(el)
    }

    render(<List {...props} onRef={onRef} />)

    expect(screen.queryByText('Row 0')).toBeInTheDocument()
    expect(screen.queryByText('Row 8')).toBeInTheDocument()
    expect(screen.queryByText('Row 9')).not.toBeInTheDocument()

    fireEvent.scroll(parentRef.current, { target: { scrollTop: 375 } })

    expect(screen.queryByText('Row 11')).toBeInTheDocument()
    expect(screen.queryByText('Row 16')).toBeInTheDocument()
    expect(screen.queryByText('Row 17')).not.toBeInTheDocument()
  })
})
