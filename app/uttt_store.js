/* eslint-disable space-before-function-paren */
import { UTTTBoard } from './ai/uttt.js'
import { MonteCarloTreeSearch } from './ai/mcts.js'

export class UTTT extends UTTTBoard {
  init() {
    return this.reset()
  }

  onStepcell(cell, game) {
    if (this.toggledAI) {
      if (this.toggledAI !== 1 + game.step % 2) {
        const nextState = this.makeMove(cell, game)
        return { ...nextState, '...': Promise.resolve(this.airequest(nextState)) }
      }
    }
    return this.makeMove(cell, game)
  }

  onAirequest() {
    return this.airequest(this)
  }

  onToggleai({ state }) {
    this.toggledAI = state
    if (state === 1 + this.step % 2) {
      return this.airequest(this)
    }
  }

  onReset(_, { board }) {
    return this.reset()
  }

  airequest (state) {
    if (!this.montecarlo) {
      this.montecarlo = new MonteCarloTreeSearch()
    }
    return this.montecarlo.findNextmove(this.makeCopy(), 1 + state.step % 2)
  }
};
