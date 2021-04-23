import { MonteCarloTreeSearch } from './mcts.js'
import { MiniMax } from './minimax.js'

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

// MiniMax player
export class PlayerControllerTMiniMax {
  init () {
  }

  assess (game) {
    switch (game.finished) {
      case 1:
        return 1000

      case 2:
        return -1000

      default:
        return 0
    }
  }

  setState (state) {
    console.log('MiniMax', this.player, state.game)
    if (!state.game.finished && (this.player === 1 + state.game.step % 2)) {
      setTimeout(() => {
        const bestMove = this.getBestMove(state.game)
        if (bestMove) {
          this.handler(bestMove)
        }
      }, 1)
    }
  }

  getBestMove (game, depth = 4) {
    const minimax = new MiniMax(this.assess)
    const answ = minimax.pruningSearch(game, depth, game.step % 2 === 0, -10000, 10000, true)
    const sameValueMoves = []
    answ.moveAssessment.forEach(element => {
      if (element.value === answ.bestValue) {
        sameValueMoves.push(element)
      }
    })
    if (sameValueMoves.length > 1) {
      const randId = Math.floor(Math.random() * sameValueMoves.length)
      return sameValueMoves[randId].move
    }
    return answ.bestMove
  }
}
