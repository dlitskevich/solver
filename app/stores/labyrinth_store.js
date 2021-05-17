/* eslint-disable space-before-function-paren */
import { NEAT } from '../algorithms/neat.js'
import { Labyrinth } from '../games/labyrinth.js'
function reset() {
  const size = 50
  return {
    size,
    toEvolve: 9,
    neat: new NEAT({ size, inNum: 4, outNum: 2 }),
    game: new Labyrinth(size),
    step: 0,
    lifetime: 10,
    maxcycle: 351,
    cycle: 0,
    newgoalcycles: 3,
    maxlifetime: 100,
    cyclesltconst: 2,
    addlt: 20
  }
}

export class LabyrinthStore {
  init() {
    console.log = () => {}
    return {
      ...reset()
    }
  }

  get individuals() {
    const array = this.neat.population.individuals.map((element, i) => ({ id: i, value: element }))
    return array
  }

  get players() {
    // const array = this.game.players.map((element, i) => ({ id: i, value: element }))
    // console.log(array)
    return this.game.players
  }

  get bestplayer() {
    // const array = this.game.players.map((element, i) => ({ id: i, value: element }))
    // console.log(array)
    return this.game.bestPlayer
  }

  get goal() {
    return this.game.goal
  }

  move(player, individual) {
    // const args = [player.x, player.y, player.xVel, player.yVel, player.predictDistance() - player.distance, player.distance]
    const args = [player.xVel, player.yVel, player.predictDistance() - player.distance, player.distance]
    const direction = individual.evaluate(args)
    return player.move(direction)
  }

  moveAll() {
    for (let i = 0; i < this.size; i++) {
      const player = this.game.players[i]
      const individual = this.neat.population.individuals[i]
      // const args = [player.x, player.y, player.distance]
      // const direction = individual.evaluate(args)
      // this.game.players[i] = player.move(direction)
      this.game.players[i] = this.move(player, individual)
    }
    // if (this.neat.population.best.id) {
    this.game.bestPlayer = this.move(this.game.bestPlayer, this.neat.population.best)
    // }
    this.game.players = [...this.game.players]
    return { ...this, step: this.step + 1 }
  }

  scoreAll() {
    for (let i = 0; i < this.size; i++) {
      const individual = this.neat.population.individuals[i]
      individual.setScore(this.game.players[i].score)
    }
    this.neat.population.best.setScore(this.game.bestPlayer.score)
  }

  evolve() {
    this.scoreAll()
    console.log(this)
    this.neat.population.evolvePopulation(this.toEvolve)

    this.game.reset(this.cycle % this.newgoalcycles)
    if (!(this.cycle % this.newgoalcycles)) {
      this.lifetime = Math.min(this.lifetime, 200)
    }
    if (!(this.cycle % this.cyclesltconst)) {
      this.lifetime = Math.min(this.lifetime + this.addlt, this.maxlifetime)
    }

    return { ...this, step: 0, cycle: this.cycle + 1 }
  }

  onEvolve() {
    return this.evolve()
  }

  onMoveall() {
    return this.moveAll()
  }

  onCycle() {
    this.cycle += 1
    return this.moveAll()
  }

  onMaxcycle({ value }) {
    this.maxcycle = parseInt(value)
    return this
  }

  onLifetime({ value }) {
    this.lifetime = parseInt(value)
    return this
  }

  onMaxlifetime({ value }) {
    this.maxlifetime = parseInt(value)
    return this
  }

  onCyclesltconst({ value }) {
    this.cyclesltconst = parseInt(value)
    return this
  }

  onAddlt({ value }) {
    this.addlt = parseInt(value)
    return this
  }

  onNewgoalcycles({ value }) {
    this.newgoalcycles = parseInt(value)
    return this
  }

  onReset(_, { game }) {
    return {
      ...reset()
    }
  }

  onChangeGame(type) {
    if (type === 2) {
      const playerY = () => (Math.random() < 0.5 ? 400 : 200)
      this.game = new Labyrinth(this.size, playerY)
      return this
    }
    return {
      ...reset()
    }
  }
};
