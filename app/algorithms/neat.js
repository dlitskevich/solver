
import { Individual } from './neat/individual'
import {
  MAX_NUM, randomWeighted
} from './neat/functions'

export class NEAT {
  constructor (params) {
    this.population = new Population(params)
  }
}

class Population {
  constructor ({ size, inNum, outNum }) {
    this.size = size
    this.individuals = []
    this.best = { score: MAX_NUM }

    for (let i = 0; i < size; i++) {
      const individual = new Individual(inNum, outNum, i)
      this.individuals.push(individual)
    }
  }

  getNodeIndividual (id) {
    for (let i = 0; i < this.size; i++) {
      const node = this.individuals[i]
      if (node.id === id) {
        return { id: i, value: node }
        // id -- id in individuals array
      }
    }
  }

  findBest () {
    this.individuals.forEach((individual) => {
      if (individual.score < this.best.score) {
        this.best = individual.copy(individual.score)
      }
    })
  }

  evolvePopulation (toEvolveNum = 4) {
    this.findBest()
    for (let i = 0; i < toEvolveNum; i++) {
      const rand = Math.random()
      if (rand < 0) {
        // TODO: crossover
      } else {
        const toReplaceId = this.getNodeIndividual(this.selectWorst()).id
        const copy = this.getNodeIndividual(this.selectBest()).value.copy()
        copy.addRandNode()
        copy.addRandConnection()
        copy.id = toReplaceId
        this.individuals[toReplaceId] = copy
      }
    }
  }

  selectBest () {
    const candidatesId = []
    const weights = []
    this.individuals.forEach((individual) => {
      if (individual.score < MAX_NUM) {
        candidatesId.push(individual.id)
        weights.push(1 / (1 + individual.score))
      }
    }
    )
    return randomWeighted(candidatesId, weights)
  }

  selectWorst () {
    const candidatesId = []
    const weights = []
    this.individuals.forEach((individual) => {
      if (individual.score < MAX_NUM) {
        candidatesId.push(individual.id)
        weights.push(individual.score)
      }
    }
    )
    return randomWeighted(candidatesId, weights)
  }
}
