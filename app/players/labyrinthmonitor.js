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
      if ((this.cycle % this.maxcycle === (this.maxcycle - 1)) && step === this.lifetime) { return }
      if (step > this.lifetime) {
        this.cycle += 1
        setTimeout(() => this.assessAll(), 100)
      } else {
        setTimeout(() => this.moveAll(), 5)
      }
    }
  }
}
