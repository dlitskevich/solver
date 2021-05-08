export class LabyrinthMonitor {
  init () {
    return {
      cycle: 0
    }
  }

  setStep (step) {
    console.log(step)
    if (this.cycle < 120) {
      if (step > 230) {
        this.cycle += 1
        setTimeout(() => this.assessAll(), 1)
      } else {
        setTimeout(() => this.moveAll(), 1)
      }
    }
  }
}
