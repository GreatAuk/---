import { describe, expect, it } from 'vitest'

import { deepClone } from '.'

describe('08', () => {
  it('number', () => {
    const val = 10
    expect(deepClone(val)).toEqual(val)
  })
  it('string', () => {
    const val = 'hello'
    expect(deepClone(val)).toEqual(val)
  })
  it('boolean', () => {
    const val = true
    expect(deepClone(val)).toEqual(val)
  })
  it('undefined', () => {
    const val = undefined
    expect(deepClone(val)).toEqual(val)
  })
  it('null', () => {
    const val = null
    expect(deepClone(val)).toEqual(val)
  })
  it('Date', () => {
    const val = new Date()
    expect(deepClone(val)).toEqual(val)
  })
  it('RegExp', () => {
    const val = /[0-9]/g
    expect(deepClone(val)).toEqual(val)
  })
  it('Function', () => {
    const val = (a: number, b: number) => a + b
    expect(deepClone(val)).toEqual(val)
  })
  it('async Function', () => {
    const val = async (a: number, b: number) => a + b
    expect(deepClone(val)).toEqual(val)
  })
  it('generator Function', () => {
    const val = function * () {}
    expect(deepClone(val)).toEqual(val)
  })
  it('shadow object', () => {
    const val = { a: 1, b: 2 }
    expect(deepClone(val)).toEqual(val)
  })
  it('deep object', () => {
    const val = { nest: { a: 1, b: 2 } }
    expect(deepClone(val)).toEqual(val)
  })
  it('循环引用 object', () => {
    const val: any = { name: 'Jack' }
    val.a = val // 循环引用
    expect(deepClone(val)).toEqual(val)
  })
  it('shadow array', () => {
    const val = [1, 2]
    expect(deepClone(val)).toEqual(val)
  })
  it('deep array', () => {
    const val = [{ a: 1, b: 2 }, [3]]
    expect(deepClone(val)).toEqual(val)
    expect(deepClone(val)).toMatchInlineSnapshot(`
      [
        {
          "a": 1,
          "b": 2,
        },
        [
          3,
        ],
      ]
    `)
  })
  it('Map', () => {
    const val = new Map([['a', 2]])
    expect(deepClone(val)).toEqual(val)
    expect(deepClone(val)).toMatchInlineSnapshot(`
      Map {
        "a" => 2,
      }
    `)
  })
  it('nested Map', () => {
    const val = { m: new Map([['a', 1]]) }
    expect(deepClone(val).m).toEqual(val.m)
  })
  it('Set', () => {
    const val = new Set([1])
    expect(deepClone(val)).toEqual(val)
    expect(deepClone(val)).toMatchInlineSnapshot(`
      Set {
        1,
      }
    `)
  })
  it('nested Set', () => {
    const val = { s: new Set([1]) }
    expect(deepClone(val)).toEqual(val)
  })
})
