/* eslint-disable no-console */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { debounce, throttle } from './index'

describe('06', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('debounce', () => {
    const mockFoo = vi.fn((x: string) => console.log(x))
    const debounceFoo = debounce(mockFoo, 1000)

    debounceFoo('hello')
    debounceFoo('hello')
    setTimeout(() => {
      debounceFoo('hello2')
    }, 2000)
    vi.runAllTimers()
    expect(mockFoo).toHaveBeenCalledTimes(2)
    // 第一次调用函数时的第一个参数是 hello
    expect(mockFoo.mock.calls[0][0]).toEqual('hello')
    // 第二次调用函数时的第一个参数是 hello2
    expect(mockFoo.mock.calls[1][0]).toEqual('hello2')
  })

  it('throttle', () => {
    const mockFoo = vi.fn((x: string) => console.log(x))
    const throttleFoo = throttle(mockFoo, 1000)

    throttleFoo('hello')
    throttleFoo('hello2')
    setTimeout(() => {
      throttleFoo('hello3')
      setTimeout(() => {
        throttleFoo('hello4')
        throttleFoo('hello5')
      }, 1100)
    }, 1100)

    vi.runAllTimers()
    expect(mockFoo).toHaveBeenCalledTimes(3)
    // 第一次调用函数时的第一个参数是 hello
    expect(mockFoo.mock.calls[0][0]).toEqual('hello')
    expect(mockFoo.mock.calls[2][0]).toEqual('hello4')
    expect(mockFoo.mock.calls[1][0]).toEqual('hello3')
  })
})
