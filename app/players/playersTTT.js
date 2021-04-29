import { MonteCarloTreeSearch } from '../algorithms/mcts.js'
import { MiniMax } from '../algorithms/minimax.js'

// MCTS player for TTT
export class PlayerControllerTTTMCTS {
  init () {
    this.montecarlo = new MonteCarloTreeSearch()
    this.movesScores = null
  }

  getBestMove (game) {
    this.movesScores = MonteCarloTreeSearch.prototype.getMovesScores(game, 1 + game.step % 2)
    // console.log(this.movesScores)
    const bestMove = this.movesScores.reduce((acc, cur) => cur.visits > acc.visits ? cur : acc)
    return bestMove.move
  }

  setState (game) {
    console.log('MCTS', this.player, this)
    if (!game.finished && (this.player === 1 + game.step % 2)) {
      setTimeout(() => {
        const bestMove = this.getBestMove(game)
        this.handler(bestMove)
      }, 1)
    }
  }
}

// MiniMax player
export class PlayerControllerTTTMiniMax {
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

  setState (game) {
    // console.log('MiniMax', this.player, game)
    if (!game.finished && (this.player === 1 + game.step % 2)) {
      setTimeout(() => {
        const bestMove = this.getBestMove(game)
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
