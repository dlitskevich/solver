export class UTTTBoard {
  init () {
    return this.reset()
  }

  reset () {
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

  makeMove ({ col, row, value, subrow, subcol }, { board, step, finished }) {
    const subboard = board[subrow].cols[subcol]
    // console.log(subboard)
    if (!value && !finished && (subboard.available === 1) && !subboard.value && !subboard.finished) {
      subboard.board[row].cols[col].value = 1 + step % 2
      subboard.finished = this.checkFinished(subboard.board, step, subboard.step)
      subboard.step = 1 + subboard.step
      board[subrow].cols[subcol] = subboard
      if (subboard.finished) {
        subboard.value = subboard.finished % 3
        subboard.available = false
        board[subrow].cols[subcol] = subboard
        finished = this.checkFinished(board, step, -1)
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

      return { board: JSON.parse(JSON.stringify(board)), step: step + 1, finished: finished }
    }
  }

  performMove (cell, player) {
    const nextBoard = this.makeMove(cell, this)
    this.step = nextBoard.step
    this.finished = nextBoard.finished
  }

  checkFinished (board, ultstep, step) {
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

  checkWinner () {
    return this.finished
  }

  makeCopy () {
    const copy = new UTTTBoard()
    copy.board = JSON.parse(JSON.stringify(this.board))
    copy.step = this.step
    copy.finished = this.finished
    return copy
  }

  getAvailableMoves () {
    const moves = []
    for (let subrow = 0; subrow < 3; subrow++) {
      for (let subcol = 0; subcol < 3; subcol++) {
        const subboard = this.board[subrow].cols[subcol]
        if (subboard.available !== 1) {
          continue
        }
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (subboard.board[row].cols[col].value === 0) {
              moves.push({ col: col, row: row, value: 0, subrow: subrow, subcol: subcol })
            }
          }
        }
      }
    }
    return moves
  }
}
