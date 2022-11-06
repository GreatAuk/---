import { describe, expect, it } from 'vitest'

import './index'

const getData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('data')
    }, 100)
  })
}
const promise2 = Promise.resolve(2)

const promiseReject = Promise.reject(new Error('err'))

describe('习题04', () => {
  it('should return a promise with result(array)', async () => {
    const res = await Promise.all([getData(), promise2, 233, true, null])
    expect(res).toEqual(['data', 2, 233, true, null])
  })
  it('参数是空数组时，返回空数组', async () => {
    const res = await Promise.all([])
    expect(res).toEqual([])
  })
  it('参数是 Set 时', async () => {
    const res = await Promise.all(new Set([getData(), promise2]))
    expect(res).toEqual(['data', 2])
  })
  it('参数是 string 时', async () => {
    const res = await Promise.all('123')
    expect(res).toEqual(['1', '2', '3'])
  })
  it('抛出异常', async () => {
    try {
      await Promise.all([getData(), promiseReject])
    }
    catch (err: any) {
      expect(err.message).toBe('err')
    }
  })
})
