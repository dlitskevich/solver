
// TTT stats
export class TTTStats {
  init () {
    return ('<p>asdx</p>')
  }

  setCross (state) {
    this.cross = state
  }

  setCircle (state) {
    this.circle = state
  }

  setFinished (state) {
    console.log('TTTState', state)
  }
}
