import { activationFunctions, cantorPairing } from './functions'
import { Connection } from './connection.js'

export class Node {
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
    this.resetSum()
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
    this.resetSum()
    return this.output
  }

  resetSum () {
    this.sum = 0
  }

  addConnection (node) {
    if (!node.layer || (node.layer > this.layer)) {
      if (!this.connectionExist(node.id)) {
        const conn = new Connection(this.id, node)
        this.conns.push(conn)
      } else {
        this.weight += 2 * Math.random() - 1
      }
    }
  }

  toggleRandConnection () {
    const randConnId = Math.floor(Math.rand() * this.conns.length)
    this.conns[randConnId].active = !this.conns[randConnId].active
  }

  updateBias () {
    this.bias += 2 * Math.random() - 1
  }

  updateActivationFunction () {
    this.activation = activationFunctions.randomFunc()
  }

  connectionExist (nodeId) {
    const connId = cantorPairing(this.id, nodeId)
    this.conns.forEach((conn) => { if (conn.id === connId) { return true } })
    return false
  }

  toNextLayer () {
    if (this.layer) {
      this.layer += 1
      this.conns.forEach((conn) => conn.outNode.toNextLayer())
    }
  }

  copy () {
    const copy = new Node(this.id, this.layer)
    copy.conns = [] // can't duplicate conns here, cause not all nodes created yet
    copy.sum = 0
    copy.bias = this.bias
    copy.activation = this.activation
    copy.output = 0
    return copy
  }
}
