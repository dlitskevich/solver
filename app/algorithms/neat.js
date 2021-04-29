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

    for (let i = 0; i < this.inNum; i++) {
      const node = new Node(i, 0)
      const addNodesNum = Math.ceil(Math.random() * this.outNum)
      for (let i = 0; i < addNodesNum; i++) {
        node.addConnection()
      }
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
}

class Node {
  constructor (id, layer = false) {
    this.id = id
    this.conns = []
    this.sum = 0
    this.bias = 2 * Math.random() - 1
    this.activation = ActivationFunctions.prototype.randomFunc()
    this.output = 0
    this.layer = layer
  }

  addConnection (node) {
    // const randId = Math.floor(Math.random() * nodes.length)
    // const node = nodes[randId]
    if (!node.layer || (node.layer > this.layer)) {
      const conn = new Connection(this.id, node)
      this.conns.push(conn)
    }
  }
}

function cantorPairing (x, y) {
  return (x + y)(x + y + 1) / 2 + y
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
    this.length = this.funcs.length
  }

  randomFunc () {
    return this.funcs[Math.floor(this.length * Math.random())]
  }
}
