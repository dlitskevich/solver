
export class MonteCarloTreeSearch {
  init () {
    return {
      scoreForWin: 10
    }
  }

  // TODO: remove
  findNextmove (game, player) {
    const opponent = 3 - player
    const tree = new Tree()
    const rootNode = tree.root
    rootNode.state.game = game
    rootNode.state.player = opponent

    // const startTime = Date.now()
    // while ((Date.now() - startTime) < 1000) {
    for (let index = 0; index < 100; index++) {
      const promisingNode = this.selectPromisingNode(rootNode)
      if (promisingNode.state.game.finished === false) {
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
    console.log(winnerNode)
    return winnerNode.state.game
  }

  getMovesScores (game, player) {
    const opponent = 3 - player
    const tree = new Tree()
    const rootNode = tree.root
    rootNode.state.game = game
    rootNode.state.player = opponent

    // const startTime = Date.now()
    // while ((Date.now() - startTime) < 1000) {
    for (let index = 0; index < 100; index++) {
      const promisingNode = this.selectPromisingNode(rootNode)
      if (promisingNode.state.game.finished === false) {
        this.expandNode(promisingNode)
      }
      let nodeToExplore = promisingNode
      if (promisingNode.childs.length > 0) {
        nodeToExplore = promisingNode.randomChild()
      }
      const playoutResult = this.simulateRandomPlayout(nodeToExplore, opponent)
      this.backPropogation(nodeToExplore, playoutResult)
    }
    const movesScores = rootNode.childs.map((child) => { return { visits: child.state.visits, move: child.state.move } })
    // console.log(rootNode)
    // tree.root = winnerNode
    console.log(movesScores)

    return movesScores
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
    let winner = tempState.game.finished
    // if (winner) {
    //   console.log(winner, opponent)
    //   console.log(tempState)
    //   console.log(tempNode)
    // }
    if (winner === opponent) {
      // console.log(123, JSON.parse(JSON.stringify(nodeToExplore.state)))
      // console.log(123, JSON.parse(JSON.stringify(nodeToExplore.parent.state)))
      // console.log(JSON.parse(JSON.stringify(tempNode.state)))

      tempNode.parent.state.score = Number.MIN_SAFE_INTEGER
      return winner
    }
    tempNode.parent = null
    while (winner === false) {
      tempState.togglePlayer()
      tempState.randomMove()
      winner = tempState.game.finished
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
  constructor (state = null, parent = null, childs = []) {
    this.parent = parent
    this.childs = childs
    if (state !== null) {
      this.state = new State(state)
    } else {
      this.state = new State()
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
      this.game = state.game.copy({ ...state.game })
      this.player = state.player
      this.move = state.move
    } else {
      this.visits = 0
      this.score = 10
      this.game = null
      this.player = null
      this.move = null
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
    const availableMoves = this.game.getAvailableMoves()
    return availableMoves.map((move) => {
      const newState = new State()
      newState.move = move
      newState.game = this.game.makeMove(move)
      // newState.game = this.game.copy()
      newState.player = 3 - this.player
      // newState.game.performMove(move, newState.player)
      return newState
    })
  }

  randomMove () {
    const availableMoves = this.game.getAvailableMoves()
    const randId = Math.floor(Math.random() * availableMoves.length)
    this.game = this.game.makeMove(availableMoves[randId])
    // this.game.performMove(availableMoves[randId], this.player)
  }
}
