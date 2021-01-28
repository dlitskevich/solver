import { MonteCarloTreeSearch } from './mcts.js'

export class PlayerController0 {
  init () {
  }

  setState (state) {
    // console.log('player')
    // if (condition) {
    //   this.handler({ row: 1, col: 2 })
    // } else {

    // }
  }
}
export class PlayerController1 {
  init () {
    this.motecarlo = new MonteCarloTreeSearch()
  }

  setState (state) {
    // console.log('MCTS', this.player, state.step)
    if (this.player === 1 + state.step % 2) {
      setTimeout(() => this.handler(state), 1)
    }
  }
}
export class PlayerController2 {
  init () {
  }

  setState (state) {
    console.log('fdsf')
    // if (condition) {
    //   this.handler({ row: 1, col: 2 })
    // } else {

    // }
  }
}
