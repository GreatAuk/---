type MyConstruct = (...args: any) => any

function myNew(construct: MyConstruct, ...args: any) {
  // 链接到原型
  const obj = Object.create(construct.prototype)
  const res = construct.call(obj, ...args)
  return typeof res === 'object' ? res : obj
}

export {
  myNew,
}
