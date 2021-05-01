import { cantorPairing } from './functions.js'

export class Connection {
  constructor (inNodeid, outNode) {
    this.id = cantorPairing(inNodeid, outNode.id)
    this.outNode = outNode
    this.weight = 2 * Math.random() - 1
    this.active = true
  }

  copy (inNodeid, outNode) {
    const copy = new Connection(inNodeid, outNode)
    copy.weight = this.weight
    copy.active = this.active
    return copy
  }
}
