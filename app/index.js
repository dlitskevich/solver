import { launch } from 'arrmatura'
import commons from './commons'
import templates from './app.html'
import pages from './pages'
import resources from './res'
import { TTTStore } from './ttt_store.js'
import { UTTT } from './uttt_store.js'
import { pipes } from 'ultimus'
import {
  PlayerControllerPlayer,
  PlayerControllerMCTS,
  PlayerControllerRandom
} from './ai/player.js'

import {
  PlayerControllerTPlayer,
  PlayerControllerTMCTS,
  PlayerControllerTRandom
} from './games/player.js'

const types = [
  ...commons,
  templates,
  ...pages,
  TTTStore,
  UTTT,
  PlayerControllerPlayer,
  PlayerControllerMCTS,
  PlayerControllerRandom,
  PlayerControllerTPlayer,
  PlayerControllerTMCTS,
  PlayerControllerTRandom

]

launch({
  template: '<App />',
  types,
  resources,
  pipes: {
    ...pipes,
    fio: (p) => p.name || p.fullName,
    now: () => Date.now(),
    kv: (x = '', e = '') => 't' + e + x,
    age: () => 34,
    wrapWithKey: (v, k, r) => ({ ...r, [k]: v }),
    inc: (x = 0) => (x + 1),
    gameState: (states, f, step) => {
      if (f) {
        return states.gameWinner[f - 1]
      } else {
        return states.gameTurn[step % 2]
      }
    },
    subBoard: (board, r, c) => board[r].cols[c].board
  }
})
