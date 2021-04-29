import { TTT } from './ttt.js'

function boardReset () {
  const size = [0, 1, 2]
  return size.map(row => ({
    id: row,
    cols: size.map(col => ({
      id: col,
      subgame: new TTT(),
      value: 0,
      available: 1,
      finished: false
    }))
  }))
}

class Board {
  constructor () {
    this.data = boardReset()
  }

  makeMove ({ col, row, value, subrow, subcol }) {
    // const { board, step, finished } = this
    const data = this.data.map(
      row => ({
        ...row,
        cols: row.cols.map(
          col => ({
            ...col,
            subgame: col.subgame.copy(col.subgame)
          })
        )
      })
    )
    data[row].cols[col].subgame = data[row].cols[col].subgame.makeSubMove({ row: subrow, col: subcol, value })
    const finished = data[row].cols[col].subgame.finished
    if (finished) {
      data[row].cols[col].value = finished % 3
      data[row].cols[col].available = false
      data[row].cols[col].finished = finished
    }
    // return this.copy(data)
    const answ = new Board()
    answ.data = data
    return answ
  }

  copy (data) {
    // TODO: rewrite copy by map
    const copy = new Board()
    copy.data = data.map(
      row => ({
        ...row,
        cols: row.cols.map(
          col => ({
            ...col,
            subgame: col.subgame.copy(col.subgame)
          })
        )
      })
    )
    return copy
  }
}

function checkFinished (board, step) {
  if (step < 16) {
    return false
  }
  const player = 1 + step % 2
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
  // available subBoards check

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r].cols[c].available !== false) {
        return false
      }
    }
  }
  return 3
}

export class UTTT {
  constructor () {
    this.board = new Board()
    this.finished = false
    this.step = 0
  }

  copy ({ board, finished, step }) {
    const copy = new UTTT()
    copy.board = board.copy(board.data)
    copy.finished = finished
    copy.step = step
    return copy
  }

  makeMove ({ col, row, subrow, subcol }) {
    // const { board, step, finished } = this
    // console.log(col, row, subcol, subrow)
    const subboard = this.board.data[row].cols[col]
    // console.log(subboard)
    if (!this.finished && (subboard.available === 1) && !subboard.finished) {
      const board = this.board.makeMove({ subcol, subrow, row, col, value: 1 + (this.step % 2) })
      const finished = checkFinished(board.data, this.step)
      // console.log(board)
      // determine available subboards for the next move
      let avail = 1
      if (board.data[subrow].cols[subcol].available !== false || finished) {
        avail = 0
      }
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board.data[r].cols[c].available !== false) {
            board.data[r].cols[c].available = avail
          }
        }
      }
      if (avail === 0 && !finished) {
        board.data[subrow].cols[subcol].available = 1
      }

      return this._copy({ board, finished, step: this.step + 1 })
    }
    return this._copy({ ...this })
  }

  _copy ({ board, finished, step }) {
    const copy = new UTTT()
    copy.board = board
    copy.finished = finished
    copy.step = step
    return copy
  }

  getAvailableMoves () {
    const moves = []
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = this.board.data[row].cols[col]
        if (cell.available !== 1) {
          continue
        }
        for (let subrow = 0; subrow < 3; subrow++) {
          for (let subcol = 0; subcol < 3; subcol++) {
            if (cell.subgame.board.data[subrow].cols[subcol].value === 0) {
              moves.push({ col: col, row: row, value: 0, subrow: subrow, subcol: subcol })
            }
          }
        }
      }
    }
    // console.log(moves)
    return moves
  }
}
