export class LabyrinthMonitor {
  init () {
    return {
      maxcycle: 5,
      cycle: 0
    }
  }

  setStep (step) {
    console.log(step)
    if (this.cycle % this.maxcycle) {
      if (step > this.lifetime) {
        this.cycle += 1
        setTimeout(() => this.assessAll(), 1)
      } else {
        setTimeout(() => this.moveAll(), 1)
      }
    }
  }
}
