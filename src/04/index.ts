function myAll(promiseList: PromiseLike<any>[]) {
  return new Promise((resolve, reject) => {
    let iteratorIndex = 0
    const res: any[] = []
    let fullCount = 0
    for (const promise of promiseList) {
      const resultIndex = iteratorIndex
      iteratorIndex += 1
      Promise.resolve(promise).then((r) => {
        res[resultIndex] = r
        fullCount++
        if (fullCount === iteratorIndex)
          resolve(res)
      }).catch((err) => {
        reject(err)
      })
    }
    // 处理空 iterator 的情况
    if (iteratorIndex === 0)
      resolve([])
  })
}

Promise.all = myAll

const map = new Map()
map.set('a', 1)
map.set({ id: 1 }, 2)

for (const item of new Set(['11', '22']))
  console.log(item)

