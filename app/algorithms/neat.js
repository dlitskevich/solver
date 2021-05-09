
import { Individual } from './neat/individual'
import {
  MAX_NUM, randomWeighted
} from './neat/functions'

export class NEAT {
  constructor (params) {
    if (!params.probParams) {
      params.probParams = {
        crossOver: 0.2,
        addNode: 0.2,
        addConn: 0.7,
        mutateNode: { toggleConn: 0.3, updBias: 0.5, updActFcn: 0.3, updConn: 0.5 }
      }
    }
    this.population = new Population(params)
  }
}

class Population {
  constructor ({ size, inNum, outNum, probParams }) {
    this.size = size
    this.individuals = []
    this.best = new Individual(inNum, outNum, 0)// { id: false, score: MAX_NUM }
    this.probParams = probParams

    for (let i = 0; i < size; i++) {
      const individual = new Individual(inNum, outNum, i)
      this.individuals.push(individual)
    }
  }

  getIndividual (id) {
    for (let i = 0; i < this.size; i++) {
      const individual = this.individuals[i]
      if (individual.id === id) {
        return { id: i, value: individual }
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
      const { id: toReplaceId, value: toReplaceValue } = this.getIndividual(this.selectWorst())
      const copy = this.getIndividual(this.selectBest()).value.copy()
      if (rand < this.probParams.crossOver) {
        copy.crossOver(toReplaceValue)
      } else {
        if (Math.random() < this.probParams.addNode) {
          copy.addRandNode()
        }
        if (Math.random() < this.probParams.addConn) {
          copy.addRandConnection()
        }
        copy.mutateRandNode(this.probParams.mutateNode)
      }
      copy.id = toReplaceId
      this.individuals[toReplaceId] = copy
    }
  }

  selectBest () {
    const candidatesId = []
    const weights = []
    this.individuals.forEach((individual) => {
      if (individual.score !== MAX_NUM) {
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
      if (individual.score !== MAX_NUM) {
        candidatesId.push(individual.id)
        weights.push(individual.score)
      }
    }
    )
    return randomWeighted(candidatesId, weights)
  }
}
