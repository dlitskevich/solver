class Goal {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

// class Player0 {
//   constructor (x, y, goal) {
//     this.x = x
//     this.y = y
//     this.xVel = Math.random() / 10
//     this.yVel = Math.random() / 10
//     this.goal = goal
//     this.getDistance()
//   }

//   getDistance () {
//     const xDiff = this.x - this.goal.x
//     const yDiff = this.y - this.goal.y
//     this.distance = xDiff ** 2 + yDiff ** 2
//     return this.distance
//   }

//   // changeVelocity (direction) {
//   //   const deltaVel = 0.5
//   //   const norm = _norm(direction)
//   //   this.xVel += deltaVel * direction[0] / norm
//   //   this.yVel += deltaVel * direction[1] / norm
//   // }

//   move (direction) {
//     // this.changeVelocity(direction)
//     const copy = this.copy()
//     const norm = _norm(direction)
//     copy.x += direction[0] / norm
//     copy.y += direction[1] / norm
//     copy.getDistance()
//     return copy
//   }

//   copy () {
//     const copy = new Player(this.x, this.y, this.goal)
//     copy.xVel = this.xVel
//     copy.yVel = this.yVel
//     copy.distance = this.distance
//     return copy
//   }
// }
class Player {
  constructor (x, y, goal) {
    this.x = x
    this.y = y
    this.xVel = (Math.random() - 0.5) / 5
    this.yVel = (Math.random() - 0.5) / 5
    this.goal = goal
    this.quality = 0
    this.distance = getDistance(this, this.goal)
  }

  get score () {
    if (this.x > 500 || this.x < -100 || this.y > 700 || this.y < -100) {
      return 1e20
    }
    const quality = this.quality
    this.quality = 0
    return quality
  }

  getDiractionX () {
    const vx = this.goal.x - this.x
    const vy = this.goal.y - this.y
    return vx / _norm([vx, vy])
  }

  getDiractionY () {
    const vx = this.goal.x - this.x
    const vy = this.goal.y - this.y
    return vy / _norm([vx, vy])
  }

  // predictDistance () {
  //   return getDistance({ x: this.x + this.xVel, y: this.y + this.yVel }, this.goal)
  // }

  changeVelocity (direction) {
    const deltaVel = 1
    // const norm = _norm(direction)
    this.xVel += deltaVel * direction[0] // norm
    this.yVel += deltaVel * direction[1] // norm
    // const norm = _norm([this.xVel, this.yVel])
  }

  move (direction) {
    this.changeVelocity(direction)
    const copy = this.copy()
    copy.x += copy.xVel
    copy.y += copy.yVel
    copy.distance = getDistance(copy, copy.goal)
    copy.quality = this.distance + this.quality
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
function resetGoal (goalsParams) {
  const x = goalsParams.x + Math.floor(Math.random() * goalsParams.dx)
  const y = goalsParams.y + Math.floor(Math.random() * goalsParams.dy)
  return new Goal(x, y)
}

export class Labyrinth {
  constructor (size,
    playerX = () => (200),
    playerY = () => (400),
    goalsParams = { x: 85, y: 280, dx: 230, dy: 70 }
  ) {
    this.playerX = playerX
    this.playerY = playerY
    this.goalsParams = goalsParams
    this.goal = resetGoal(goalsParams)
    Object.assign(this, {
      width: 400,
      height: 600,
      size,
      players: [],
      bestPlayer: new Player(playerX(), playerY(), this.goal)
    })
    for (let i = 0; i < size; i++) {
      this.players.push(new Player(playerX(), playerY(), this.goal))
    }
  }

  reset (savegoal) {
    if (!savegoal) {
      this.goal = resetGoal(this.goalsParams)
    }

    this.players = []
    this.bestPlayer = new Player(this.playerX(), this.playerY(), this.goal)
    for (let i = 0; i < this.size; i++) {
      this.players.push(new Player(this.playerX(), this.playerY(), this.goal))
    }
  }
}

function _norm (array) {
  return Math.sqrt(array.reduce((acc, val) => acc + val ** 2, 0))
}
function getDistance (a, b, width = 400, height = 600) {
  return _norm([(a.x - b.x), (a.y - b.y)]) / 100
}
