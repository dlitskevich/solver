
export class MiniMax {
  constructor (assess) {
    this.assess = assess
  }

  getMovesScores (game) {
    return {}
  }

  pruningSearch ({ game, depth, maximizing, alpha = -10000, beta = 10000 }) {
    const availableMoves = game.getAvailableMoves()
    if (game.finished || !depth || !availableMoves) {
      return this.assess(game)
    }
    let bestMove = {}
    if (!game.finished) {
      if (maximizing) {
        let bestValue = -10000
        for (let index = 0; index < availableMoves.length; index++) {
          const move = availableMoves[index]
          const value = this.pruningSearch(game.makeMove(move), depth - 1, !maximizing, alpha, beta)
          availableMoves[index] = availableMoves[index].push({ value })
          if (value > bestValue) {
            bestValue = value
            bestMove = move
            alpha = Math.max(alpha, bestValue)
          }
        }
      } else {
        let bestValue = 10000
        for (let index = 0; index < availableMoves.length; index++) {
          const move = availableMoves[index]
          const value = this.pruningSearch(game.makeMove(move), depth - 1, !maximizing, alpha, beta)
          availableMoves[index] = availableMoves[index].push({ value })
          if (value < bestValue) {
            bestValue = value
            bestMove = move
            beta = Math.min(beta, bestValue)
          }
        }
      }
    }
    return { bestMove, availableMoves }
  }
}
