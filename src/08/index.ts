export function deepClone(val: any, cacheMap = new WeakMap()) {
  if (typeof val !== 'object' || val === null)
    return val
  if (val instanceof Date)
    return new Date(val)
  if (val instanceof RegExp)
    return new RegExp(val)
  if (val instanceof Map)
    return new Map(deepClone(Array.from(val), cacheMap))
  if (val instanceof Set)
    return new Set(deepClone(Array.from(val), cacheMap))

  if (cacheMap.get(val))
    return cacheMap.get(val) // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环

  const cloneVal = new val.constructor() // 使用对象所属的构造函数创建一个新对象
  cacheMap.set(val, cloneVal) // 缓存对象，用于循环引用的情况

  for (const key in val) {
    if (val.hasOwnProperty(key))
      cloneVal[key] = deepClone(val[key], cacheMap)
  }
  return cloneVal
}

