import { MonteCarloTreeSearch } from './mcts.js'

export class PlayerControllerTPlayer {
  init () {
  }

  setState (state) {
    // console.log('player')
    // if (condition) {
    //   this.handler({ row: 1, col: 2 })
    // } else {

    // }
  }
}
// MCTS player for TTT
export class PlayerControllerTMCTS {
  init () {
    this.montecarlo = new MonteCarloTreeSearch()
    this.movesScores = null
  }

  getBestMove (state) {
    // console.log(1, state)
    // const board = new UTTTBoard()
    // board.copyFrom(state)
    // console.log(2, board)
    this.movesScores = MonteCarloTreeSearch.prototype.getMovesScores(state.game, 1 + state.game.step % 2)
    const bestMove = this.movesScores.reduce((acc, cur) => cur.visits > acc.visits ? cur : acc)
    return bestMove.move
  }

  setState (state) {
    console.log('MCTS', this.player, this)
    if (!state.game.finished && (this.player === 1 + state.game.step % 2)) {
      setTimeout(() => {
        const bestMove = this.getBestMove(state)
        this.handler(bestMove)
      }, 1)
    }
  }
}
// Random player
export class PlayerControllerTRandom {
  init () {
  }

  setState (state) {
    console.log('Random', this.player, state.game)
    if (!state.game.finished && (this.player === 1 + state.game.step % 2)) {
      setTimeout(() => {
        const randomMove = this.randomMove(state)
        // console.log(randomMove)
        if (randomMove) {
          this.handler(randomMove)
        }
      }, 1)
    }
  }

  randomMove (state) {
    const availableMoves = state.game.getAvailableMoves()
    const randId = Math.floor(Math.random() * availableMoves.length)
    return availableMoves[randId]
  }
}
