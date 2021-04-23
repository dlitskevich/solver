
export class MiniMax {
  constructor (assess) {
    this.assess = assess
  }

  getMovesScores (game) {
    return {}
  }

  pruningSearch (game, depth, maximizing, alpha = -10000, beta = 10000, first = false) {
    const availableMoves = game.getAvailableMoves()
    if (game.finished || !depth || !availableMoves) {
      return this.assess(game)
    }

    const moveAssessment = []
    let bestValue = 0
    let bestMove = {}
    if (!game.finished) {
      if (maximizing) {
        bestValue = -10000
        for (let index = 0; index < availableMoves.length; index++) {
          const move = availableMoves[index]
          const value = this.pruningSearch(game.makeMove(move), depth - 1, !maximizing, alpha, beta)
          if (first) {
            moveAssessment.push({ move: availableMoves[index], value })
          }

          if (value > bestValue) {
            bestValue = value
            bestMove = move
            alpha = Math.max(alpha, bestValue)
          }
        }
      } else {
        bestValue = 10000
        for (let index = 0; index < availableMoves.length; index++) {
          const move = availableMoves[index]
          const value = this.pruningSearch(game.makeMove(move), depth - 1, !maximizing, alpha, beta)
          if (first) {
            moveAssessment.push({ move: availableMoves[index], value })
          }
          if (value < bestValue) {
            bestValue = value
            bestMove = move
            beta = Math.min(beta, bestValue)
          }
        }
      }
    }
    if (first) {
      return { bestMove, moveAssessment, bestValue }
    }
    return bestValue
  }
}
