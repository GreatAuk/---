export function deepEqual(a: any, b: any): boolean {
  if (Object.is(a, b))
    return true

  if ((typeof a !== 'object' || a === null) && (typeof b !== 'object' || b === null))
    return false

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime()

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length)
    return false

  return keysA.every(key => deepEqual(a[key], b[key]))
}
