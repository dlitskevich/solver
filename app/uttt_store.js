/* eslint-disable space-before-function-paren */
function reset() {
  const size = [0, 1, 2]
  return {
    board: size.map(row => ({
      id: row,
      cols: size.map(col => ({
        id: col,
        board: size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) })),
        value: 0,
        step: 0,
        finished: false,
        available: 1
      }))
    })),
    step: 0,
    finished: false
  }
}
function checkFinished(board, ultstep, step) {
  if (step < 2 && step !== -1) {
    return false
  }
  const player = 1 + ultstep % 2
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
  // ultimative case
  if (step === -1) {
    // const numAvailable = 0
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r].cols[c].available !== false) {
          return false
        }
      }
    }
    return 3
  }
  return false
}

export class UTTT {
  init() {
    return reset()
  }

  onStepcell({ col, row, value, subrow, subcol }, { board, step, finished }) {
    const subboard = board[subrow].cols[subcol]
    // console.log(subboard)
    if (!value && !finished && (subboard.available === 1) && !subboard.value && !subboard.finished) {
      subboard.board[row].cols[col].value = 1 + step % 2
      subboard.finished = checkFinished(subboard.board, step, subboard.step)
      subboard.step = 1 + subboard.step
      board[subrow].cols[subcol] = subboard
      if (subboard.finished) {
        subboard.value = subboard.finished % 3
        subboard.available = false
        board[subrow].cols[subcol] = subboard
        finished = checkFinished(board, step, -1)
      }
      let avail = 1
      // console.log(subrow)
      // console.log(subcol)
      if (board[row].cols[col].available !== false || finished) {
        avail = 0
      }
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[r].cols[c].available !== false) {
            board[r].cols[c].available = avail
          }
        }
      }
      if (avail === 0 && !finished) {
        board[row].cols[col].available = 1
      }

      return { board: [...board], step: step + 1, finished: finished }
    }
  }

  // onStepSub({ col, row, value }, { board, step, finished }) {
  //   if (!value && !finished) {
  //     board[row].cols[col].value = 1 + step % 2
  //     finished = checkFinished(board, step)
  //     return { board: [...board], step: step + 1, finished: finished }
  //   }
  // }

  onReset(_, { board }) {
    return reset()
  }
};
