export class LabyrinthMonitor {
  init () {
    return {
      cycle: 0
    }
  }

  setStep (step) {
    console.log(step)
    if (this.cycle < 30) {
      if (step > 200) {
        this.cycle += 1
        setTimeout(() => this.assessAll(), 1)
      } else {
        setTimeout(() => this.moveAll(), 1)
      }
    }
  }
}
