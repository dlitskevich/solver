/* eslint-disable space-before-function-paren */
import { TTT } from './games/ttt.js'

function reset() {
  return {
    game: new TTT()
  }
}

export class TTTStore {
  init() {
    return {
      ...reset(),
      cross: 'Person',
      circle: 'Random'
    }
  }

  getBoard() {
    console.log(this.game)
    return this.game.board.data
  }

  getFinished() {
    return this.game.finished
  }

  getStep() {
    return this.game.step
  }

  getState() {
    return { ...this }
  }

  onRef() {
    return this
  }

  onSwitch({ player, type }) {
    if (player === 1) {
      return {
        ...this,
        cross: type
      }
    } else {
      return {
        ...this,
        circle: type
      }
    }
  }

  currentPlayer() {
    const player = 1 + this.game.step % 2
    return player === 1 ? this.cross : this.circle
  }

  onStep({ col, row, value }, { game }) {
    if (this.currentPlayer() === 'Person') {
      if (!value) {
        game = game.makeMove({ col, row })
        return { game }
      }
    }
  }

  onMakeMoveOutside (cell) {
    // test without this
    this.game = this.game.makeMove(cell)
    return { ...this }
  }

  // setBoard(v) {
  //   this.board = v
  // }

  onReset(_, { game }) {
    return reset()
  }
};
