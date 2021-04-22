/* eslint-disable space-before-function-paren */

function reset() {
  const size = [0, 1, 2]

  return {
    board: size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) })),
    step: 0,
    finished: false
  }
}
// function checkWin(acc, cur){
//   return (acc&&(cur.value==player))
// }

function checkFinished(board, step) {
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

export class TTTStore2 {
  init() {
    return reset()
  }

  onStep({ col, row, value }, { board, step, finished }) {
    if (!value && !finished) {
      board[row].cols[col].value = 1 + step % 2
      finished = checkFinished(board, step)
      return { board: [...board], step: step + 1, finished: finished }
    }
  }

  // setBoard(v) {
  //   this.board = v
  // }

  onReset(_, { board }) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[row].cols[col].value = 0
      }
    }
    return {
      board: [...board],
      step: 0,
      finished: false
    }
  }
};
