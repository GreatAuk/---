/* eslint-disable no-console */
class PlayBoy {
  queue: ((...args: any) => any)[] = []

  constructor(public name: string) {
    setTimeout(
      () => {
        this.next()
      },
      0,
    )
  }

  next() {
    const fn = this.queue.shift()
    return fn?.()
  }

  register(fn: (...args: any) => any) {
    this.queue.push(fn)
  }

  play(gameName: string) {
    const playInner = () => {
      console.log(`我在玩${gameName}`)
      this.next()
    }
    this.register(playInner)
    return this
  }

  sayHi() {
    const sayHiInner = () => {
      console.log(`大家好，我是${this.name}`)
      this.next()
    }
    this.register(sayHiInner)
    return this
  }

  sleep(ms: number) {
    const sleepInner = () => {
      setTimeout(
        () => {
          console.log('settimeout')
          this.next()
        },
        ms,
      )
    }
    this.register(sleepInner)
    return this
  }
}

export {
  PlayBoy,
}
