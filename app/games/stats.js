
function reset () {
  return {
    crossWin: 0,
    circleWin: 0,
    draw: 0,
    total: 0,
    times: 10
  }
}
// TTT stats
export class TTTStats {
  init () {
    return reset()
  }

  createarray () {
    const size = [0, 1, 2]
    return size.map(row => ({ id: row, cols: size.map(col => ({ id: col, value: 0 })) }))
  }

  // setPlayers (state) {
  //   this.players = state
  // }
  reset () {
    this.crossWin = 0
    this.circleWin = 0
    this.draw = 0
    this.total = 0
    this.times = 0
  }

  // setCross (state) {
  //   console.log('bruh')
  //   return this.reset()
  // }

  // setCircle (state) {
  //   return this.reset()
  // }

  setFinished (state) {
    // console.log('TTTState', state, this)
    // console.log(this.times)
    if (this.times > 0) {
      switch (state) {
        case 1:
          this.crossWin += 1
          break
        case 2:
          this.circleWin += 1
          break

        case 3:
          this.draw += 1
          break

        default:
          return
      }
      this.total += 1
      this.times -= 1
      // console.log('do it')
      setTimeout(() => {
        this.handler()
      }, 1)
    }
  }
}
