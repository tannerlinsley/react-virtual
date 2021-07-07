// Based on Joe Lambert (https://gist.github.com/joelambert/1002116#file-requesttimeout-js)

export function cancelTimeout(handle) {
  cancelAnimationFrame(handle.id)
}

export function requestTimeout(fn, delay) {
  const start = Date.now()

  function loop() {
    if (Date.now() - start >= delay) {
      fn.call(null)
    } else {
      handle.id = requestAnimationFrame(loop)
    }
  }

  const handle = {
    id: requestAnimationFrame(loop),
  }

  return handle
}
