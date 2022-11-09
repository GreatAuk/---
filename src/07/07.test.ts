import { describe, expect, it } from 'vitest'
import { e } from 'vitest/dist/index-9eded9ec'
import { deepEqual } from './index'

describe('07', () => {
  it('基础数据类型', () => {
    expect(deepEqual(1, 1)).toEqual(true)
    expect(deepEqual(1.23333333333333, 1.23333333333333)).toEqual(true)
    expect(deepEqual(NaN, NaN)).toEqual(true)
    expect(deepEqual('hello', 'hello')).toEqual(true)
    expect(deepEqual(false, false)).toEqual(true)
    expect(deepEqual(null, false)).toEqual(false)
    expect(deepEqual(null, 0)).toEqual(false)
    expect(deepEqual(null, null)).toEqual(true)
    expect(deepEqual(undefined, undefined)).toEqual(true)
  })

  it('date time', () => {
    expect(deepEqual(new Date('2022/12/23 23:22:22'), new Date('2022/12/23 23:22:22'))).toEqual(true)
    expect(deepEqual(new Date('2022/12/23 23:22:22'), new Date('4022/12/23 23:22:22'))).toEqual(false)
  })

  it('function', () => {
    const foo1 = () => {}
    expect(deepEqual(foo1, foo1)).toEqual(true)

    const foo2 = () => {}
    expect(deepEqual(foo1, foo2)).toEqual(false)
  })

  it('Map', () => {
    const map1 = new Map([['a', 1], ['b', 2]])
    const map2 = new Map([['b', 2], ['a', 1]])
    expect(deepEqual(map1, map2)).toEqual(true)
  })

  it('Array', () => {
    expect(deepEqual(
      [1, 2, undefined],
      [1, 2, undefined],
    )).toEqual(true)
    expect(deepEqual([1, 2], [2, 1])).toEqual(false)
  })

  it('object', () => {
    expect(
      deepEqual(
        { a: [2, { e: 3 }], b: [4], c: 'foo' },
        { a: [2, { e: 3 }], b: [4], c: 'foo' },
      ),
    ).toEqual(true)

    expect(deepEqual(
      { id: 1, name: 'utopia' },
      { name: 'utopia', id: 1 },
    )).toEqual(true)

    expect(deepEqual(
      { id: 1, name: 'utopia' },
      { name: 'utopia', id: 1, id2: 2 },
    )).toEqual(true)

    expect(
      deepEqual(
        { a: [2, { e: 3 }], b: [4, 1], c: 'foo' },
        { b: [1, 4], c: 'foo', a: [2, { e: 3 }] },
      ),
    ).toEqual(false)
  })
})
