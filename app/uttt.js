/* eslint-disable space-before-function-paren */
function reset(){
  const size = [1, 2, 3]

  return {
    board: size.map(row => ({ id: row, cols: size.map(col => ({ 
      id: col, 
      board: size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) })), 
      value: 0,
      step: 0,
      finished: false,
      available: 1
    })) })),
    step: 0,
    finished: false
  }
}
function checkFinished(board,ultstep, step) {
  if (step < 2 && step !== -1) {
    return false
  }
  const player = 1 + ultstep % 2
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
  // ultimative case
  if (step === -1){
    let numAvailable = 0
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r].cols[c].available !== false){
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
    if (!value && !finished && (board[subrow-1].cols[subcol-1].available === 1) && !board[subrow-1].cols[subcol-1].value && !board[subrow-1].cols[subcol-1].finished) {
      board[subrow-1].cols[subcol-1].board[row - 1].cols[col - 1].value = 1 + step % 2
      board[subrow-1].cols[subcol-1].finished = checkFinished(board[subrow-1].cols[subcol-1].board, step, board[subrow-1].cols[subcol-1].step)
      board[subrow-1].cols[subcol-1].step = 1 + board[subrow-1].cols[subcol-1].step
      if (board[subrow-1].cols[subcol-1].finished) {
        board[subrow-1].cols[subcol-1].value = board[subrow-1].cols[subcol-1].finished % 3
        board[subrow-1].cols[subcol-1].available = false
        finished = checkFinished(board, step, -1)
      } 
      let avail = 1
      console.log(row);
      console.log(col);
      if (board[row-1].cols[col-1].available !== false || finished) {
        avail = 0
      } 
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[r].cols[c].available !== false){
            board[r].cols[c].available = avail
          }
        }
      }
      if (avail === 0 && !finished) {
        board[row-1].cols[col-1].available = 1
      } 

      return { board: [...board], step: step + 1, finished: finished }
    }
  }
  onStepSub({ col, row, value }, { board, step, finished }) {
    if (!value && !finished) {
      board[row - 1].cols[col - 1].value = 1 + step % 2
      finished = checkFinished(board, step)
      return { board: [...board], step: step + 1, finished: finished }
    }
  }


  onReset(_,{board}) {
    return reset()
  //   for (let row = 0; row < 3; row++) {
  //     for (let col = 0; col < 3; col++) {
  //       board[row].cols[col].value = 0
  //       board[row].cols[col].finished = false
  //       for (let row2 = 0; row < 3; row++) {
  //         for (let col2 = 0; col < 3; col++) {
  //           board[row].cols[col].board[row2].cols[col2].value = 0
  //         }
  //       }
  //     }
  //   }
  //   return {
  //     board: [...board],
  //     step: 0,
  //     finished: false
  //   }
  }
};