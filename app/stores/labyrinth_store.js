/* eslint-disable space-before-function-paren */
import { NEAT } from '../algorithms/neat.js'
import { Labyrinth } from '../games/labyrinth.js'
function reset() {
  const size = 50
  return {
    size,
    toEvolve: 7,
    neat: new NEAT({ size, inNum: 3, outNum: 2 }),
    game: new Labyrinth(size),
    step: 0,
    lifetime: 10,
    maxcycle: 21,
    cycle: 0
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
    const args = [player.x, player.y, player.distance]
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
    if (this.neat.population.best.id) {
      this.game.bestPlayer = this.move(this.game.bestPlayer, this.neat.population.best)
    }
    this.game.players = [...this.game.players]
    return { ...this, step: this.step + 1 }
  }

  scoreAll() {
    for (let i = 0; i < this.size; i++) {
      const individual = this.neat.population.individuals[i]
      individual.setScore(this.game.players[i].distance)
    }
    this.neat.population.best.setScore(this.game.bestPlayer.distance)
  }

  evolve() {
    this.scoreAll()
    console.log(this)
    this.neat.population.evolvePopulation(this.toEvolve)

    this.game.reset(this.cycle % 20)

    this.lifetime = Math.min(this.lifetime + 3, 300)
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

  onReset(_, { game }) {
    return {
      ...reset()
    }
  }
};
