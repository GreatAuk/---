type MyConstruct = (...args: any) => any

function myNew(construct: MyConstruct, ...args: any) {
  const obj = Object.create(Object.prototype)
  construct.call(obj, ...args)
  return obj
}

export {
  myNew,
}
