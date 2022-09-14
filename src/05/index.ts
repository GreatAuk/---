function deepClone<T = any>(obj: T, cache = new WeakMap()): T {
  if (obj === null || typeof obj !== 'object')
    return obj
  if (obj instanceof Date)
    return new Date(obj) as T

  if (obj instanceof RegExp)
    return new RegExp(obj) as T

  if (cache.has(obj)) // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
    return cache.get(obj)

  const cloneObj = new obj.constructor() // 使用对象所属的构造函数创建一个新对象
  cache.set(obj, cloneObj) // 缓存对象，用于循环引用的情况
  for (const k in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(k))
      cloneObj[k] = deepClone(obj[k], cache) // 递归拷贝
  }

  return cloneObj
}

export { deepClone }

