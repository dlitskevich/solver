/* eslint-disable space-before-function-paren */
import { UTTTBoard } from './ai/uttt.js'
import { MonteCarloTreeSearch } from './ai/mcts.js'

export class UTTT extends UTTTBoard {
  init() {
    return {
      ...this.reset(),
      cross: 0,
      circle: 1
    }
  }

  getState() {
    return { ...this }
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
    return {
      ...this.reset(),
      cross: 0,
      circle: 1
    }
  }

  airequest (state) {
    if (!this.montecarlo) {
      this.montecarlo = new MonteCarloTreeSearch()
    }
    return this.montecarlo.findNextmove(this.makeCopy(), 1 + state.step % 2)
  }
};
