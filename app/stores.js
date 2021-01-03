/* eslint-disable space-before-function-paren */
export class TTTStore {
  init() {
    const size = [1, 2, 3]

    return {
      board: size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) })),
      step: 0,
      finished: false
    }
  }

  onStep({ col, row, value }, { board, step, finished }) {
    if (!value && !finished) {
      board[row - 1].cols[col - 1].value = 1 + step % 2
      finished = checkFinished(board, step)
      return { board: [...board], step: step + 1, finished: finished }
    }
  }

  // setBoard(v) {
  //   this.board = v
  // }

  onReset(_, { board }) {
    // const size = [1, 2, 3]
    // var board = size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) }))

    // return {
    //   board: [...board],
    //   step: 0
    // }
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

function checkFinished(board, step) {
  if (step < 4) {
    return false
  }
  const player = 1 + step % 2
  for (let row = 0; row < 3; row++) {
    if (
      (board[row].cols[0].value === player) &&
      (board[row].cols[1].value === player) &&
      (board[row].cols[2].value === player)) {
      return player
    }
    if (
      (board[0].cols[row].value === player) &&
      (board[1].cols[row].value === player) &&
      (board[2].cols[row].value === player)) {
      return player
    }
  }
  if (
    (board[0].cols[0].value === player) &&
    (board[1].cols[1].value === player) &&
    (board[2].cols[2].value === player)) {
    return player
  }
  if (
    (board[0].cols[2].value === player) &&
    (board[1].cols[1].value === player) &&
    (board[2].cols[0].value === player)) {
    return player
  }
  if (step === 8) {
    return 3
  }
  return false
}
