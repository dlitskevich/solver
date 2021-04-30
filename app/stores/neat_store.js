/* eslint-disable space-before-function-paren */
import { NEAT } from '../algorithms/neat.js'

function reset() {
  return {
    game: new NEAT({ size: 10, inNum: 3, outNum: 4 })
  }
}

export class NEATStore {
  init() {
    return {
      ...reset()
    }
  }

  getBoard() {
    return this.game.board.data
  }

  getFinished() {
    return this.game.finished
  }

  onReset(_, { game }) {
    return reset()
  }
};
