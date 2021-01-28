export class MonteCarloTreeSearch {
  init () {
    return {
      scoreForWin: 10
    }
  }

  findNextmove (board, player) {
    const opponent = 3 - player
    const tree = new Tree()
    const rootNode = tree.root
    rootNode.state.board = board
    rootNode.state.player = opponent

    const startTime = Date.now()
    while ((Date.now() - startTime) < 1000) {
      const promisingNode = this.selectPromisingNode(rootNode)
      if (promisingNode.state.board.checkWinner() === false) {
        this.expandNode(promisingNode)
      }
      let nodeToExplore = promisingNode
      if (promisingNode.childs.length > 0) {
        nodeToExplore = promisingNode.randomChild()
      }
      const playoutResult = this.simulateRandomPlayout(nodeToExplore, opponent)
      this.backPropogation(nodeToExplore, playoutResult)
    }

    const winnerNode = rootNode.childs.reduce((acc, cur) => cur.state.visits > acc.state.visits ? cur : acc)
    // console.log(rootNode)
    // tree.root = winnerNode
    return winnerNode.state.board
  }

  selectPromisingNode (rootNode) {
    let node = rootNode
    while (node.childs.length !== 0) {
      node = UCT.findBestChild(node)
    }
    return node
  }

  expandNode (node) {
    const possibleStates = node.state.getPossibleStates()
    possibleStates.forEach((state) => {
      const newNode = new Node(state, node)
      newNode.state.player = 3 - node.state.player
      node.childs.push(newNode)
    })
  }

  simulateRandomPlayout (nodeToExplore, opponent) {
    const tempNode = new Node(nodeToExplore.state, nodeToExplore.parent)
    const tempState = tempNode.state
    let winner = tempState.board.checkWinner()
    // if (winner) {
    //   console.log(winner, opponent)
    //   console.log(tempState)
    //   console.log(tempNode)
    // }
    if (winner === opponent) {
      console.log(123, JSON.parse(JSON.stringify(nodeToExplore.state)))
      console.log(123, JSON.parse(JSON.stringify(nodeToExplore.parent.state)))
      console.log(JSON.parse(JSON.stringify(tempNode.state)))

      tempNode.parent.state.score = Number.MIN_SAFE_INTEGER
      return winner
    }
    tempNode.parent = null
    while (winner === false) {
      tempState.togglePlayer()
      tempState.randomMove()
      winner = tempState.board.checkWinner()
    }
    return winner
  }

  backPropogation (nodeToExplore, winner) {
    let tempNode = nodeToExplore
    while (tempNode !== null) {
      tempNode.state.visits++
      if (tempNode.state.player === winner) {
        tempNode.state.addScore(1)
      }
      tempNode = tempNode.parent
    }
  }
}

const UCT = {
  uctValue (totalVisit, nodeWinScore, nodeVisit) {
    if (nodeVisit === 0) {
      return Number.MAX_SAFE_INTEGER
    }
    return (nodeWinScore / nodeVisit) + 1.41 * Math.sqrt(Math.log(totalVisit) / nodeVisit)
  },

  findBestChild (node) {
    const parentVisits = node.state.visits
    const values = node.childs.map((child) => UCT.uctValue(parentVisits, child.state.score, child.state.visits))
    const id = values.reduce((iMax, cur, i, arr) => cur > arr[iMax] ? i : iMax, 0)
    return node.childs[id]
  }
}

class Tree {
  constructor (root) {
    this.root = new Node()
  }
}

class Node {
  constructor (state = new State(), parent = null, childs = []) {
    if (arguments.length === 1) {
      this.state = new State(state)
      this.parent = parent
      this.childs = childs
    } else if (arguments.length === 2) {
      this.state = new State(state)
      this.parent = parent
      this.childs = childs
    } else {
      this.state = state
      this.parent = parent
      this.childs = childs
    }
  }

  randomChild () {
    return this.childs[Math.floor(Math.random() * this.childs.length)]
  }
}

class State {
  constructor (state) {
    if (arguments.length === 1) {
      this.visits = state.visits
      this.score = state.score
      this.board = state.board.makeCopy()
      this.player = state.player
    } else {
      this.visits = 0
      this.score = 10
      this.board = null
      this.player = null
    }
  }

  togglePlayer () {
    this.player = 3 - this.player
  }

  addScore (score) {
    if (this.score !== Number.MIN_SAFE_INTEGER) {
      this.score += score
    }
  }

  getPossibleStates () {
    const availableMoves = this.board.getAvailableMoves()
    return availableMoves.map((move) => {
      const newState = new State()
      newState.board = this.board.makeCopy()
      newState.player = 3 - this.player
      newState.board.performMove(move, newState.player)
      return newState
    })
  }

  randomMove () {
    const availableMoves = this.board.getAvailableMoves()
    const randId = Math.floor(Math.random() * availableMoves.length)
    this.board.performMove(availableMoves[randId], this.player)
  }
}
