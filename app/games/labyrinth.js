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
    this.xVel = Math.random() / 10
    this.yVel = Math.random() / 10
    this.goal = goal
    this.getDistance()
  }

  getDistance () {
    const xDiff = this.x - this.goal.x
    const yDiff = this.y - this.goal.y
    this.distance = xDiff ** 2 + yDiff ** 2
    return this.distance
  }

  // changeVelocity (direction) {
  //   const deltaVel = 0.5
  //   const norm = _norm(direction)
  //   this.xVel += deltaVel * direction[0] / norm
  //   this.yVel += deltaVel * direction[1] / norm
  // }

  move (direction) {
    // this.changeVelocity(direction)
    const copy = this.copy()
    const norm = _norm(direction)
    copy.x += direction[0] / norm
    copy.y += direction[1] / norm
    copy.getDistance()
    return copy
  }

  copy () {
    const copy = new Player(this.x, this.y, this.goal)
    copy.xVel = this.xVel
    copy.yVel = this.yVel
    copy.distance = this.distance
    return copy
  }
}

export class Labyrinth {
  constructor (size) {
    const x = 50 + Math.floor(Math.random() * 350)
    const y = 80 + Math.floor(Math.random() * 50)
    this.goal = new Goal(x, y)
    Object.assign(this, {
      width: 400,
      height: 600,
      size,
      players: [],
      bestPlayer: new Player(200, 500, this.goal)
    })
    for (let i = 0; i < size; i++) {
      this.players.push(new Player(200, 500, this.goal))
    }
  }

  reset (savegoal) {
    if (!savegoal) {
      const x = 50 + Math.floor(Math.random() * 350)
      const y = 100 + Math.floor(Math.random() * 50)
      this.goal = new Goal(x, y)
    }

    this.players = []
    this.bestPlayer = new Player(200, 500, this.goal)
    for (let i = 0; i < this.size; i++) {
      this.players.push(new Player(200, 500, this.goal))
    }
  }
}

function _norm (array) {
  return array.reduce((acc, val) => acc + val ** 2, 0)
}
