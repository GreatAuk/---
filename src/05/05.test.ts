import { assert, describe, expect, it } from 'vitest'

import { deepClone } from './index'

describe('习题05', () => {
  it('基础类型', () => {
    let res: any
    res = deepClone(1)
    expect(res).toMatchInlineSnapshot('1')
    res = deepClone(true)
    expect(res).toMatchInlineSnapshot('true')
    res = deepClone('string')
    expect(res).toMatchInlineSnapshot('"string"')
    res = deepClone(null)
    expect(res).toMatchInlineSnapshot('null')
    res = deepClone(undefined)
    expect(res).toMatchInlineSnapshot('undefined')
    res = deepClone(Symbol(1))
    expect(res).toMatchInlineSnapshot('Symbol(1)')
  })
  it('function', () => {
    function foo(val: number) { return val + 1 }
    const res = deepClone(foo)
    expect(res).toBe(foo)
  })

  it('should clone a regex', () => {
    assert.deepEqual(deepClone(/foo/g), /foo/g)
  })

  it('should clone a date', () => {
    const date = new Date()
    assert(date !== deepClone(date))
    assert(date.toLocaleString() === deepClone(date).toLocaleString())
  })

  it('should deeply clone an array', () => {
    const fixture = [[{ a: 'b' }], [{ a: 'b' }]]
    const result = deepClone(fixture)
    assert(fixture !== result)
    assert(fixture[0] !== result[0])
    assert(fixture[1] !== result[1])
    assert.deepEqual(fixture, result)
  })
  it('should clone arrays', () => {
    assert.deepEqual(deepClone(['alpha', 'beta', 'gamma']), ['alpha', 'beta', 'gamma'])
    assert.deepEqual(deepClone([1, 2, 3]), [1, 2, 3])

    const a = [{ a: 0 }, { b: 1 }]
    const b = deepClone(a)

    assert.deepEqual(b, a)
    assert.deepEqual(b[0], a[0])

    const val = [0, 'a', {}, [{}], [function () {}], function () {}]
    assert.deepEqual(deepClone(val), val)
  })

  it('should deeply clone object', () => {
    const one = { a: 'b' }
    const two = deepClone(one)
    two.c = 'd'
    assert.notDeepEqual(one, two)
  })

  it('should deeply clone Map', () => {
    const a = new Map([[1, 5]])
    const b = deepClone(a)
    a.set(2, 4)
    assert.notDeepEqual(Array.from(a), Array.from(b))
  })

  it('should deeply clone Set', () => {
    const a = new Set([2, 1, 3])
    const b = deepClone(a)
    a.add(8)
    assert.notDeepEqual(Array.from(a), Array.from(b))
  })

  it('object', () => {
    const res: any = deepClone({
      name: 'utopia',
      say: () => {},
      isMan: true,
      arr: [1, 3],
      nestedObj: {
        id: 2,
      },
    })
    expect(res).toMatchInlineSnapshot(`
      {
        "arr": [
          1,
          3,
        ],
        "isMan": true,
        "name": "utopia",
        "nestedObj": {
          "id": 2,
        },
        "say": [Function],
      }
    `)
  })
})

