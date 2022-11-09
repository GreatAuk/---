export function debounce<T extends Function = Function>(fn: T, wait: number) {
  let timer: NodeJS.Timeout | null
  return function (this: any, ...args: any[]) {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}

export function throttle(fn: Function, wait: number) {
  let timer: NodeJS.Timeout | null
  return function (this: any, ...args: any[]) {
    if (timer)
      return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}
