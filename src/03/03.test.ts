import { describe, expect, it } from 'vitest'

import './index'

function add(this: any, b: number, c: number) {
  const res = this.a + b + c
  return res
}

describe('手写 call apply bind', () => {
  it('call', () => {
    const res = add.myCall({ a: 1 }, 2, 3)
    expect(res).toBe(6)
  })

  it('apply', () => {
    const res = add.myApply({ a: 1 }, [2, 3])
    expect(res).toBe(6)
  })

  it('bind', () => {
    const foo = add.myBind({ a: 1 }, 2, 3)
    const res = foo()
    expect(res).toBe(6)
  })
})
