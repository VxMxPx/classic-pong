import Actor from './actor'

export default class Ball extends Actor {

  constructor(x, y, size) {
    super(x, y, size, size, 'white')
    this.size = size
    this.defaults = { x, y, size }
    this.reset()
  }

  getCorrectedPosition() {
    return {x: this.x-(this.size/2), y: this.y-(this.size/2)}
  }

  rand(max) {
    let r = Math.floor(Math.random() * ((max*2)+1)) - max;
    return r
  }

  reset() {
    this.x = this.defaults.x
    this.y = this.defaults.y
    this.momentum = {now: 1.6, slowing: .01, speeding: .7, max: 3, min: 2}
    this.speed = { x: 5*(Math.random()>.5?-1:1), y: this.rand(6), max: 20 }
  }


  setPosition(x, y) {

    const constraints = this.constraints
    const size = this.size / 2

    if (x + size < constraints.x) { x = constraints.x + size }
    if (x + size > constraints.width) { x = constraints.width - size }

    if (y + size < constraints.y) { y = constraints.y + size }
    if (y + size > constraints.height) { y = constraints.height - size }

    this.x = x
    this.y = y
  }

  move() {
    let momentum = this.momentum
    this.setPosition(
      this.x + this.speed.x * momentum.now,
      this.y + this.speed.y * momentum.now)

    if (momentum.now > momentum.min) {
      momentum.now -= momentum.slowing
    } else if (momentum.now < momentum.min) {
      momentum.now = momentum.min
    }
  }

  getDelta(actor) {
    // Max +/- paddle height + ball size -60 top, 60 bottom, 0 middle
    let raw = this.y - (actor.y + actor.height/2)
    return raw/(actor.height + this.height)
  }

  increaseMomentum(factor) {
    if (typeof factor === 'undefined') {
      factor = this.momentum.speeding
    }
    if (this.momentum.now < this.momentum.max) {
      this.momentum.now += factor
    }
  }

  bounceY() {
    this.speed.y *= -1
  }

  bounceX() {
    this.speed.x *= -1
  }

  bounceOf(actor) {
    let deltaY = this.getDelta(actor)
    this.bounceX()
    this.speed.y = deltaY * this.speed.max
    this.lastDelata = deltaY
    this.increaseMomentum(Math.abs(deltaY))
  }

  draw(context) {
    context.fillStyle = this.texture
    context.beginPath()
    context.arc(this.x, this.y, this.width/2, 0, Math.PI*2, true)
    context.fill()
  }
}