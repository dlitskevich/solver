/* eslint-disable space-before-function-paren */
import { UTTT } from '../games/uttt.js'
import { MonteCarloTreeSearch } from '../ai/mcts.js'

function reset() {
  return {
    game: new UTTT()
  }
}

export class UTTTStore {
  init() {
    console.log('bruh', this)
    return {
      ...reset(),
      cross: 'Person',
      circle: 'Person'// 'MCTS'
    }
  }

  getBoard() {
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

  currentPlayer() {
    const player = 1 + this.game.step % 2
    return player === 1 ? this.cross : this.circle
  }

  // onStepcell(cell, game) {
  //   if (this.toggledAI) {
  //     if (this.toggledAI !== 1 + game.step % 2) {
  //       const nextState = this.makeMove(cell, game)
  //       return { ...nextState, '...': Promise.resolve(this.mctsrequest(nextState)) }
  //     }
  //   }
  //   return this.makeMove(cell, game)
  // }
  onStepcell({ col, row, subcol, subrow, value }, { game }) {
    if (this.currentPlayer() === 'Person') {
      if (!value) {
        console.log(game)
        game = game.makeMove({ col, row, subcol, subrow })
        console.log(game)
        return { ...this, game }
      }
    }
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

  onMctsrequest() {
    return this.mctsrequest(this)
  }

  onToggleai({ state }) {
    this.toggledAI = state
    if (state === 1 + this.step % 2) {
      return this.mctsrequest(this)
    }
  }

  onReset(_, { board }) {
    return reset()
  }

  onMakeMoveOutside (cell) {
    // test without this
    return this.makeMove(cell, this)
  }

  mctsrequest (state) {
    if (!this.montecarlo) {
      this.montecarlo = new MonteCarloTreeSearch()
    }
    console.log(this.copy())
    if (!this.finished) {
      return this.montecarlo.findNextmove(this.copy(), 1 + state.step % 2)
    }
  }

  randomrequest (state) {
    this.getAvailableMoves()
    return this.montecarlo.findNextmove(this.copy(), 1 + state.step % 2)
  }
};
