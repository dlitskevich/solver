import { MonteCarloTreeSearch } from './mcts.js'
import { UTTT } from '../games/uttt.js'

// export class PlayerController {
//   init () {
//   }

//   setState (state) {
//     if (this.player === 1 + state.step % 2) {
//       setTimeout(() => this.handler(state, this.type), 1)
//     }
//   }
// }
//
export class PlayerControllerPlayer {
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
// MCTS player for UTTT
export class PlayerControllerMCTS {
  init () {
    this.montecarlo = new MonteCarloTreeSearch()
    this.movesScores = null
  }

  getBestMove (state) {
    console.log(1, state)
    const board = new UTTT()
    board.copyFrom(state)
    console.log(2, board)
    this.movesScores = MonteCarloTreeSearch.prototype.getMovesScores(board, 1 + state.step % 2)
    const bestMove = this.movesScores.reduce((acc, cur) => cur.visits > acc.visits ? cur : acc)
    return bestMove.move
  }

  setState (state) {
    console.log('MCTS', this.player, this)
    if (this.player === 1 + state.step % 2) {
      setTimeout(() => {
        const bestMove = this.getBestMove(state)
        this.handler(bestMove)
      }, 1)
    }
  }
}
// Random player
export class PlayerControllerRandom {
  init () {
  }

  setState (state) {
    console.log('fdsf')
    // if (condition) {
    //   this.handler({ row: 1, col: 2 })
    // } else {

    // }
  }
}
