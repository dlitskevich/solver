class ActivationFunctions {
  constructor () {
    this.funcs = [
      (x) => (x),
      Math.sin,
      Math.tan,
      (x) => x > 0 ? x : 0
    ]
  }

  randomFunc () {
    const ans = this.funcs[Math.floor(this.funcs.length * Math.random())]
    return ans
  }
}

export const activationFunctions = new ActivationFunctions()
export const MAX_NUM = 100000000

export function randomSample (array, quant) {
  const copy = [...array]
  const sample = []
  for (let i = 0; i < quant; i++) {
    const selectId = Math.floor(Math.random() * copy.length)
    sample.push(copy[selectId])
    copy.splice(selectId, 1)
  }
  return sample
}

export function randomWeighted (array, weights) {
  let sum = 0
  const rand = Math.random()
  const norm = weights.reduce((acc, val) => acc + val, 0)
  for (let i = 0; i < array.length; i++) {
    sum += weights[i] / norm
    if (rand < sum) {
      return array[i]
    }
  }
  return array.slice(-1)[0]
}

export function cantorPairing (x, y) {
  return (x + y) * (x + y + 1) / 2 + y
}
