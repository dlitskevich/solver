
export class NEAT {
  constructor (params) {
    this.population = new Population(params)
  }
}

class Population {
  constructor ({ size, inNum, outNum }) {
    this.size = size
    this.individuals = []
    for (let i = 0; i < size; i++) {
      const individual = new Individual(inNum, outNum)
      this.individuals.push(individual)
    }
  }
}

class Individual {
  constructor (inNum, outNum) {
    this.inNum = inNum
    this.outNum = outNum
    this.totalNum = inNum + outNum
    this.nodes = []

    for (let i = this.inNum; i < this.totalNum; i++) {
      const node = new Node(i)
      this.nodes.push(node)
    }
    const lastLayer = this.getLayer(false)
    for (let i = 0; i < this.inNum; i++) {
      const node = new Node(i, 0)
      const addNodesNum = Math.ceil(Math.random() * this.outNum)
      randomSample(lastLayer, addNodesNum).forEach((el) => node.addConnection(el))
      this.nodes.push(node)
    }
  }

  getNode (id) {
    for (let i = 0; i < this.totalNum; i++) {
      const node = this.nodes[i]
      if (node.id === id) {
        return node
      }
    }
  }

  getLayer (layer) {
    const nodes = []
    this.nodes.forEach((node) => {
      if (node.layer === layer) {
        nodes.push(node)
      }
    })
    // for (let i = 0; i < this.totalNum; i++) {
    //   const node = this.nodes[i]
    //   if (node.layer === layer) {
    //     nodes.push(node)
    //   }
    // }
    return nodes
  }

  getMaxLayer () {
    let maxLayer = 0
    for (let i = 0; this.inNum < this.totalNum; i++) {
      const node = this.nodes[i]
      if (!node.layer && (node.layer > maxLayer)) {
        maxLayer = node.layer
      }
    }
  }

  evaluate (args) {
    // first layer init
    this.getLayer(0).forEach((node, i) => node.activateFirst(args[i]))
    for (let layer = 1; layer < this.getMaxLayer(); layer++) {
      this.getLayer(layer).forEach((node, i) => node.activate())
    }
    const answ = this.getLayer(false).sort((node1, node2) => node1.id - node2.id).map((node) => node.activateLast())
    return answ
  }
}

class Node {
  constructor (id, layer = false) {
    this.id = id
    this.conns = []
    this.sum = 0
    this.bias = 2 * Math.random() - 1
    this.activation = activationFunctions.randomFunc()
    this.output = 0
    this.layer = layer
  }

  activate () {
    this.output = this.activation(this.sum) + this.bias
    this.conns.forEach((conn) => {
      if (conn.active) {
        conn.outNode.sum += this.output * conn.weight
      }
    })
  }

  activateFirst (inValue) {
    this.sum = inValue
    this.activate()
  }

  activateLast () {
    this.output = this.activation(this.sum) + this.bias
    return this.output
  }

  reset () {
    this.sum = 0
  }

  addConnection (node) {
    if (!node.layer || (node.layer > this.layer)) {
      if (!this.connectionExist(node.id)) {
        const conn = new Connection(this.id, node)
        this.conns.push(conn)
      }
    }
  }

  connectionExist (nodeId) {
    const connId = cantorPairing(this.id, nodeId)
    this.conns.forEach((conn) => { if (conn.id === connId) { return true } })
    return false
  }
}

function cantorPairing (x, y) {
  return (x + y) * (x + y + 1) / 2 + y
}

class Connection {
  constructor (inNodeid, outNode) {
    this.id = cantorPairing(inNodeid, outNode.id)
    this.outNode = outNode
    this.weight = 2 * Math.random() - 1
    this.active = true
  }
}

class ActivationFunctions {
  constructor () {
    this.funcs = [
      (x) => (x),
      Math.sin,
      Math.tan
    ]
  }

  randomFunc () {
    const ans = this.funcs[Math.floor(this.funcs.length * Math.random())]
    return ans
  }
}
const activationFunctions = new ActivationFunctions()

function randomSample (array, quant) {
  const copy = [...array]
  const sample = []
  for (let i = 0; i < quant; i++) {
    const selectId = Math.floor(Math.random() * copy.length)
    sample.push(copy[selectId])
    copy.splice(selectId, 1)
  }
  return sample
}
