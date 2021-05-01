/* eslint-disable space-before-function-paren */
import { NEAT } from '../algorithms/neat.js'
import { Labyrinth } from '../games/labyrinth.js'
function reset() {
  const size = 50
  return {
    size,
    neat: new NEAT({ size, inNum: 3, outNum: 2 }),
    game: new Labyrinth(size),
    step: 0,
    cycle: 0
  }
}

export class LabyrinthStore {
  init() {
    return {
      ...reset()
    }
  }

  getIndividuals() {
    const array = this.neat.population.individuals.map((element, i) => ({ id: i, value: element }))
    return array
  }

  getPlayers() {
    // const array = this.game.players.map((element, i) => ({ id: i, value: element }))
    // console.log(array)
    return this.game.players
  }

  moveAll() {
    for (let i = 0; i < this.size; i++) {
      const player = this.game.players[i]
      const individual = this.neat.population.individuals[i]
      const args = [player.x, player.y, player.distance]
      const direction = individual.evaluate(args)
      this.game.players[i] = player.move(direction)
    }
    this.game.players = [...this.game.players]
    return { ...this, step: this.step + 1 }
  }

  scoreAll() {
    for (let i = 0; i < this.size; i++) {
      const individual = this.neat.population.individuals[i]
      individual.setScore(this.game.players[i].distance)
    }
  }

  evolve() {
    this.scoreAll()
    console.log(this)
    this.neat.population.evolvePopulation(4)

    this.game.reset()
    return { ...this, step: 0, cycle: this.cycle + 1 }
  }

  onEvolve() {
    return this.evolve()
  }

  onMoveall() {
    return this.moveAll()
  }

  onReset(_, { game }) {
    return reset()
  }
};
