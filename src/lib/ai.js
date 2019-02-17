export default class Ai {

  constructor(pad, ball) {
    this.pad = pad
    this.ball = ball

    this.nextMove = 'center'
    this.nextAccuracy = 1
    this.randomize()
  }

  getRandomMove() {
    let rand = Math.random()
    if (rand < 0.15) { return 'top' }
    else if (rand > 0.85) { return 'bottom'}
    else { return 'center' }
  }

  getRandomAccuracy() {
    return this.ball.speed.max*(Math.random()+.3)
  }

  randomize() {
    this.nextMove = this.getRandomMove()
    this.nextAccuracy = this.getRandomAccuracy()
    console.log(`My next move accuracy: ${this.nextAccuracy} and position: ${this.nextMove}`)
  }

  move() {
    let aim
    let padY
    const pad = this.pad
    const ball = this.ball

    switch (this.nextMove) {
      case 'top':
        aim = pad.y
        aim = [ aim + 10, aim - 10]
      break

      case 'center':
        aim = pad.y + (pad.height/2)
        aim = [ aim + 10, aim - 10]
      break

      case 'bottom':
        aim = pad.y + pad.height
        aim = [ aim + 10, aim - 10]
      break
    }

    if (aim[0] < ball.y) {
      padY = pad.y + this.nextAccuracy
    } else if (aim[1] > ball.y) {
      padY = pad.y - this.nextAccuracy
    } else {
      padY = pad.y
    }

    pad.setPosition(pad.x, padY)
  }
}