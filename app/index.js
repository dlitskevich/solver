import { launch } from 'arrmatura'
import commons from './commons'
import templates from './app.html'
import pages from './pages'
import resources from './res'
import { TTTStore } from './stores/ttt_store.js'
import { UTTTStore } from './stores/uttt_store.js'
import { pipes } from 'ultimus'
import {
  PlayerControllerPlayer,
  PlayerControllerMCTS,
  PlayerControllerRandom
} from './ai/player.js'

import {
  PlayerControllerTPlayer,
  PlayerControllerTMCTS,
  PlayerControllerTRandom,
  PlayerControllerTMiniMax
} from './players/playerTTT.js'
import { TTTStats } from './games/stats.js'
const types = [
  ...commons,
  templates,
  ...pages,
  TTTStore,
  UTTTStore,
  TTTStats,
  PlayerControllerPlayer,
  PlayerControllerMCTS,
  PlayerControllerRandom,
  PlayerControllerTPlayer,
  PlayerControllerTMCTS,
  PlayerControllerTRandom,
  PlayerControllerTMiniMax

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
    subGame: (board, r, c) => board[r].cols[c].subgame.board.data

  }
})
