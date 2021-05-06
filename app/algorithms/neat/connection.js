import { cantorPairing } from './functions.js'

export class Connection {
  constructor (inNodeid, outNode) {
    this.id = cantorPairing(inNodeid, outNode.id)
    this.outNode = outNode
    this.weight = 2 * Math.random() - 1
    this.active = true
  }

  toggle () {
    this.active = !this.active
  }

  activate () {
    this.active = true
  }

  copy (inNodeid, outNode) {
    const copy = new Connection(inNodeid, outNode)
    copy.weight = this.weight
    copy.active = this.active
    return copy
  }

  // crossCopy (inNode, outNode) {
  //   if (outNode.layer !== false && outNode.layer <= inNode.layer) {
  //     return false
  //   }
  //   return this.copy(inNode.id, outNode)
  // }
}
