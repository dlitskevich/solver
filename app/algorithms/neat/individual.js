import { MAX_NUM, randomSample } from './functions'
import { Node } from './node'

export class Individual {
  constructor (inNum, outNum, id) {
    this.id = id
    this.inNum = inNum
    this.outNum = outNum
    this.totalNum = inNum + outNum
    this.nodes = []
    this.score = MAX_NUM
    this.maxLayer = 0

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
    return nodes
  }

  getLayers (layers) {
    const nodes = []
    this.nodes.forEach((node) => {
      if (layers.some((layer) => layer === node.layer)) {
        nodes.push(node)
      }
    })
    return nodes
  }

  getMaxLayer () {
    let maxLayer = 0
    for (let i = this.inNum + this.outNum; i < this.totalNum; i++) {
      const node = this.nodes[i]
      if (node.layer && (node.layer > maxLayer)) {
        maxLayer = node.layer
      }
    }
    this.maxLayer = maxLayer
    return maxLayer
  }

  setScore (score) {
    this.score = score
  }

  evaluate (args) {
    // first layer init
    this.getLayer(0).forEach((node, i) => node.activateFirst(args[i]))
    this.getMaxLayer()
    for (let layer = 1; layer < this.maxLayer + 1; layer++) {
      this.getLayer(layer).forEach((node, i) => node.activate())
    }
    const answ = this.getLayer(false).sort((node1, node2) => node1.id - node2.id).map((node) => node.activateLast())
    return answ
  }

  addRandConnection () {
    const inCandidates = this.getLayers([...Array(this.maxLayer + 1).keys()])
    const inNode = inCandidates[Math.floor(Math.random() * inCandidates.length)]
    const outLayers = [...Array(this.maxLayer - inNode.layer).keys()].map((v) => v + inNode.layer + 1)
    const outCandidates = this.getLayers([...outLayers, false])
    const outNode = outCandidates[Math.floor(Math.random() * outCandidates.length)]
    inNode.addConnection(outNode)
  }

  addRandNode () {
    const candidates = this.nodes.slice(this.outNum, this.nodes.length)
    const node = candidates[Math.floor(Math.random() * candidates.length)]
    const conn = node.conns[Math.floor(Math.random() * node.conns.length)]
    const outNode = conn.outNode
    const newNode = new Node(this.totalNum, outNode.layer ? outNode.layer : node.layer + 1)
    this.totalNum += 1
    outNode.toNextLayer()
    newNode.addConnection(outNode)
    conn.outNode = newNode
    conn.active = true
    this.nodes.push(newNode)
  }

  mutateRandNode (params) {
    const nodeId = Math.floor(Math.random() * this.nodes.length)
    this.nodes[nodeId].mutate(params)
  }

  crossOver (donor) {
    const nodeSeparator = this.nodes[this.outNum + Math.floor(Math.random() * (this.nodes.length - this.outNum))]
    const connSeparatorId = nodeSeparator.conns[Math.floor(Math.random() * nodeSeparator.conns.length)].id
    const child = this.copy()
    if (donor.totalNum > this.totalNum) {
      child.nodes = child.nodes.concat(donor.nodes.slice(this.totalNum).map(node => node.copy()))
      // adding connections
      // this.nodes.slice(this.totalNum).forEach((node, i) => {
      //   child.nodes[i].conns = node.conns.map((conn) => conn.copy(node.id, child.getNode(conn.outNode.id)))
      // })
      child.totalNum = donor.totalNum
    }
    let i = 0
    while (i < child.getMaxLayer()) {
      const nodes = child.getLayer(i)
      nodes.forEach((node) => {
        const donorNode = donor.getNode(node.id)
        if (donorNode) {
          child._crossOverNodes(node, donorNode, connSeparatorId)
        }
      })
      i++
    }
    return child
  }

  _crossOverNodes (thisNode, donorNode, connSeparatorId) {
    donorNode.conns.forEach(conn => {
      if (conn.id > connSeparatorId) {
        const childConnId = thisNode.conns.findIndex((c) => c.id === conn.id)
        if (childConnId) {
          thisNode.conns[childConnId] = conn.copy(thisNode.id, this.getNode(conn.outNode.id))
        } else {
          const outNode = this.getNode(conn.outNode.id)
          // if (outNode.layer === false || outNode.layer > thisNode.layer) {
          //   thisNode.conns.push(conn.copy(thisNode.id, outNode))
          // }
          thisNode.addConnection(outNode)
        }
      }
    })
  }

  disableNode (id) {
    this.nodes.forEach((node, i) => {
      node.conns.forEach((conn) => {
        if (conn.outNode.id === id) {
          conn.active = false
        }
      })
    })
    this.getNode(id).conns.forEach((conn) => { conn.active = false })
  }

  copy (score = MAX_NUM) {
    const copy = new Individual(this.inNum, this.outNum, this.id)
    copy.id = this.id
    copy.totalNum = this.totalNum
    copy.nodes = this.nodes.map((node) => node.copy())
    copy.score = score
    this.nodes.forEach((node, i) => {
      // const nodeid = node.id
      copy.nodes[i].conns = node.conns.map((conn) => conn.copy(node.id, copy.getNode(conn.outNode.id)))
    })
    return copy
  }
}
