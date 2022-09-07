/* eslint-disable no-console */
import { describe, expect, it, vi } from 'vitest'

import { myNew } from './index'

interface Man_ {
  name: string
  age: number
  sayHello: () => void
}

describe('练习题02', () => {
  it('实例化', () => {
    function Man(name: string, age: number) {
      this.name = name
      this.age = age
      this.sayHello = () => { console.log(`Hello, my name is ${this.name}`) }
    }
    const name = 'utopia'
    const age = 29
    const man = myNew(Man, name, age) as Man_

    expect(Object.getPrototypeOf(man)).toEqual(Man.prototype)

    expect(man.name).toBe(name)
    expect(man.age).toBe(age)
    expect(typeof man.toString).toEqual('function')
    expect(typeof man.sayHello).toEqual('function')

    const sayHelloSpy = vi.spyOn(man, 'sayHello')
    man.sayHello()
    expect(sayHelloSpy).toHaveBeenCalledTimes(1)
  })
})
