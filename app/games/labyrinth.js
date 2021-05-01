class Goal {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class Player {
  constructor (x, y, goal) {
    this.x = x
    this.y = y
    this.goal = goal
    this.getDistance()
  }

  getDistance () {
    const xDiff = this.x - this.goal.x
    const yDiff = this.y - this.goal.y
    this.distance = xDiff ** 2 + yDiff ** 2
    return this.distance
  }

  move (direction) {
    const norm = _norm(direction)
    const copy = this.copy()
    copy.x += 5 * direction[0] / norm
    copy.y += 5 * direction[1] / norm
    copy.getDistance()
    return copy
  }

  copy () {
    const copy = new Player(this.x, this.y, this.goal)
    copy.distance = this.distance
    return copy
  }
}

export class Labyrinth {
  constructor (size) {
    this.width = 400
    this.height = 600
    this.players = []
    for (let i = 0; i < size; i++) {
      this.players.push(new Player(200, 500, new Goal(200, 100)))
    }
  }
}

function _norm (array) {
  return array.reduce((acc, val) => acc + val ** 2, 0)
}
