/* eslint-disable space-before-function-paren */
import { UTTTBoard } from './ai/uttt.js'
import { MonteCarloTreeSearch } from './ai/mcts.js'

export class UTTT extends UTTTBoard {
  init() {
    return {
      ...this.reset(),
      cross: 'Person',
      circle: 'MCTS'
    }
  }

  getState() {
    return { ...this }
  }

  onRef() {
    return this
  }

  onStepcell(cell, game) {
    if (this.toggledAI) {
      if (this.toggledAI !== 1 + game.step % 2) {
        const nextState = this.makeMove(cell, game)
        return { ...nextState, '...': Promise.resolve(this.mctsrequest(nextState)) }
      }
    }
    return this.makeMove(cell, game)
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
    return {
      ...this.reset(),
      cross: 'Person',
      circle: 'MCTS'
    }
  }

  onMakeMoveOutside (cell) {
    // test without this
    return this.makeMove(cell, this)
  }

  mctsrequest (state) {
    if (!this.montecarlo) {
      this.montecarlo = new MonteCarloTreeSearch()
    }
    console.log(this.makeCopy())
    if (!this.finished) {
      return this.montecarlo.findNextmove(this.makeCopy(), 1 + state.step % 2)
    }
  }

  randomrequest (state) {
    this.getAvailableMoves()
    return this.montecarlo.findNextmove(this.makeCopy(), 1 + state.step % 2)
  }
};
