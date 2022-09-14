// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Function {
  myCall(this: any, thisArg: any, ...args: any[]): any
  myApply(this: any, thisArg: any, args: any[]): any
  myBind(this: any, thisArg: any, ...args: any[]): any
}

/* eslint-disable no-extend-native */
Function.prototype.myCall = function (this: any, ctx: any, ...args: any[]) {
  // 若没有传入要绑定的对象，默认绑定window对象
  const that = ctx || window

  const funcKey = Symbol('funcKey')
  that[funcKey] = this

  const res = that[funcKey](...args)

  // 删除我们绑定的Symbol(funcKey)属性，以免污染 that 的属性
  Reflect.deleteProperty(that, funcKey)

  return res
}

Function.prototype.myApply = function (this: any, ctx, args: any[]) {
  const that = ctx || window

  const funcKey = Symbol('funcKey')
  that[funcKey] = this

  const res = that[funcKey](...args)

  return res
}

Function.prototype.myBind = function (this: any, ctx, ...args: any[]) {
  const that = ctx || window

  const funcKey = Symbol('funcKey')
  that[funcKey] = this

  return () => that[funcKey](...args)
}
