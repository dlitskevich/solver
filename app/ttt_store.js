/* eslint-disable space-before-function-paren */
import { TTT } from './games/ttt.js'

function reset() {
  return {
    game: new TTT()
  }
}
// function checkWin(acc, cur){
//   return (acc&&(cur.value==player))
// }

export class TTTStore {
  init() {
    console.log('TTTstorelog')
    return reset()
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

  onStep({ col, row, value }, { game }) {
    if (!value) {
      game = game.makeMove({ col, row })
      return { game }
    }
  }

  // setBoard(v) {
  //   this.board = v
  // }

  onReset(_, { game }) {
    return reset()
  }
};
