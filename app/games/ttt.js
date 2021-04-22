// function boardReset () {
//   const size = [0, 1, 2]
//   return {
//     data: size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) }))
//   }
// }
function boardReset () {
  const size = [0, 1, 2]
  return size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) }))
}

class Board {
  // init () {
  //   return boardReset()
  // }
  constructor () {
    this.data = boardReset()
  }

  makeMove ({ row, col, value }) {
    const data = JSON.parse(JSON.stringify(this.data))
    data[row].cols[col].value = value
    return this.copy(data)
  }

  copy (data) {
    const copy = new Board()
    copy.data = JSON.parse(JSON.stringify(data))
    return copy
  }
}

function gameReset (player1 = 0, player2 = 1) {
  return {
    board: new Board(),
    finished: false,
    winner: false,
    step: 0,
    player1,
    player2
  }
}

function checkFinished (board, step) {
  if (step < 4) {
    return false
  }
  const player = 1 + step % 2
  // board.map()
  for (let row = 0; row < 3; row++) {
    if (board[row].cols.reduce((acc, cur) => (acc && (cur.value === player)), true)) {
      return player
    }
    if (board.reduce((acc, cur) => (acc && (cur.cols[row].value === player)), true)) {
      return player
    }
  }
  if (board.reduce((acc, cur, ind) => (acc && (cur.cols[ind].value === player)), true)) {
    return player
  }
  if (board.reduce((acc, cur, ind) => (acc && (cur.cols[2 - ind].value === player)), true)) {
    return player
  }
  if (step === 8) {
    return 3
  }
  return false
}

export class TTT {
  // init () {
  //   console.log('TTTlog')
  //   return gameReset(0, 1)
  // }
  constructor () {
    this.board = new Board()
    this.finished = false
    this.step = 0
  }

  // makeMove ({ row, col }) {
  //   if (!this.finished) {
  //     // console.log(row, col, this.step)
  //     this.board = this.board.makeMove({ row, col, value: 1 + (this.step % 2) })
  //     const winner = checkFinished(this.board.data, this.step)
  //     this.step = this.step + 1
  //     if (winner) {
  //       this.finished = winner
  //     }
  //     // return { ...this, board, step, finished, winner }
  //   }
  //   return this.copy({ ...this, winner: this.finished })
  // }
  makeMove ({ row, col }) {
    console.log(row, col, !this.finished, this.step)
    if (!this.finished) {
      // console.log(row, col, this.step)
      const board = this.board.makeMove({ row, col, value: 1 + (this.step % 2) })
      const finished = checkFinished(board.data, this.step)

      return this.copy({ board, finished, step: this.step + 1 })
    }
    return this.copy({ ...this })
  }

  getAvailableMoves () {
    const moves = []
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board.data[row].cols[col].value === 0) {
          moves.push({ col: col, row: row, value: 0 })
        }
      }
    }
    return moves
  }

  copy ({ board, finished, step }) {
    const copy = new TTT()
    copy.board = board.copy(board.data)
    copy.finished = finished
    copy.step = step
    return copy
  }
}
