import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PlayBoy } from './'

describe('习题一', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('sayHi fun', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const name = 'Tom'
    const boy = new PlayBoy(name)
    boy.sayHi()
    vi.runAllTimers()
    expect(consoleSpy).toHaveBeenCalledWith(`大家好，我是${name}`)
  })

  it('play fun', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const gameName = 'cs go'
    const body = new PlayBoy('Tom')
    body.play(gameName)
    vi.runAllTimers()
    expect(consoleSpy).toHaveBeenCalledWith(`我在玩${gameName}`)
  })

  it('链式调用', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const boy = new PlayBoy('Tom')
    const instance = boy.sayHi().play('cs go')
    vi.runAllTimers()
    expect(instance instanceof PlayBoy).toBe(true)
    expect(consoleSpy).toHaveBeenCalledTimes(2)
  })

  it('sleep', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const boy = new PlayBoy('Tom')
    boy.sayHi().play('cs go').sleep(1000).play('CF')
    vi.advanceTimersByTime(500)
    expect(consoleSpy).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(500)
    expect(consoleSpy).toHaveBeenCalledTimes(4)
  })
})
