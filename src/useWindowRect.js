import React from 'react'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export default function useWindowRect(windowRef) {
  const [element, setElement] = React.useState(windowRef.current)
  const [rect, dispatch] = React.useReducer(rectReducer, null)

  useIsomorphicLayoutEffect(() => {
    if (windowRef.current !== element) {
      setElement(windowRef.current)
    }
  })

  useIsomorphicLayoutEffect(() => {
    dispatch({
      rect: {
        height: element.innerHeight,
        width: element.innerWidth,
      }
    });
  }, [windowRef])

  React.useEffect(() => {
    const resizeHandler = () => {
      dispatch({
        rect: {
          height: element.innerHeight,
          width: element.innerWidth,
        }
      });
    };
    resizeHandler();
    element.addEventListener("resize", resizeHandler);
    return () => {
      element.removeEventListener("resize", resizeHandler);
    };
  }, [element]);

  return rect
}

function rectReducer(state, action) {
  const rect = action.rect
  if (!state || state.height !== rect.height || state.width !== rect.width) {
    return rect
  }
  return state
}
