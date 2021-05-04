import Pad from '../actors/pad'
import Ball from '../actors/ball'

import Mouse from './mouse'
import Player from './player'
import Ai from './ai'
import Sound from './sound'

export default class Game {

  constructor(settings) {
    this.fps = settings.fps
    this.canvas = settings.canvas
    this.document = settings.document
    this.context = this.canvas.getContext('2d')
    this.paused = false

    // Create controls
    this.mouse = new Mouse(this.canvas, document)

    // Sound effect
    this.aFx = {
      hit: new Sound('hit')
    }

    // Create actors
    this.padA = new Pad(20, this.canvas.height/2-50, 10, 100)
    this.padB = new Pad(this.canvas.width-40, this.canvas.height/2-50, 10, 100)
    this.ball = new Ball(this.canvas.width/2-10, this.canvas.height/2-10, 16)

    window.ball = this.ball

    // Notify
    this.notifyEl = settings.notifyEl

    // Score
    this.scores = [0, 0]
    this.scoreEl = settings.scoreEl

    this.addConstraints([this.padA, this.padB, this.ball])

    this.player = new Player(this.padA, this.mouse)
    this.ai = new Ai(this.padB, this.ball)

    document.addEventListener('mousemove', this.player.updatePosition)
    document.addEventListener('keydown', e => {
      if (e.code === 'KeyP') {
        this.togglePaused()
        console.log('Toggle pause', this.paused)
      }
    })
  }

  togglePaused() {
    this.paused = !this.paused
    if (this.paused) {
      this.notify('Paused')
    } else {
      this.notify('')
    }
  }

  addConstraints(actors) {
    actors.map(actor => actor.setConstraints(0, 0, this.canvas.width, this.canvas.height))
  }

  move() {
    const {ball, ai} = this

    ball.move()
    ai.move()

    const ballPos = ball.getCorrectedPosition()

    if (this.padA.collide(ball)) {
      this.aFx.hit.play()
      ball.bounceOf(this.padA)
      ai.randomize()
      this.padA.impactAnimate(ball.lastDelata)
    } else if (this.padB.collide(ball)) {
      this.aFx.hit.play()
      ball.bounceOf(this.padB)
      this.padB.impactAnimate(ball.lastDelata)
    } else if (ballPos.x <= 0) {
      return this.score(1)
    } else if (ballPos.x+ball.size >= this.canvas.width) {
      return this.score(0)
    }

    // Vertical position
    if (ballPos.y <= 0 || ballPos.y+ball.size >= this.canvas.height) {
      this.aFx.hit.play()
      ball.bounceY()
      ball.increaseMomentum()
    }
  }

  colorRect(x, y, width, height, color) {
    this.context.fillStyle = color
    this.context.fillRect(x, y, width, height)
  }

  drawNet() {
    for (let i = 0; i < this.canvas.height; i+=40) {
      this.colorRect(this.canvas.width / 2 - 1, i, 1, 10, 'white')
    }
  }

  draw() {
    this.colorRect(0, 0, this.canvas.width, this.canvas.height, 'black')
    this.drawNet()
    this.padA.draw(this.context)
    this.padB.draw(this.context)
    this.ball.draw(this.context)
  }

  notify(message, timeout=0) {
    this.notifyEl.innerText = message
    if (message) {
      this.notifyEl.style.display = 'block'
      if (timeout) {
        setTimeout(() => {
          this.notify('')
        }, timeout)
      }
    } else {
      this.notifyEl.style.display = 'none'
    }
  }

  score(side) {
    this.scores[side]++
    // Update score on the screen
    this.scoreEl.children[0].innerText = this.scores[0]
    this.scoreEl.children[1].innerText = this.scores[1]
    console.log('Score! Now @', this.scores)
    this.paused = true
    this.ball.reset()
    this.notify(side === 0 ? 'Your score!' : 'Enemy score!', 1500)
    setTimeout(() => {
      this.paused = false
    }, 500)
  }

  run() {
    setInterval(() => {
      if (!this.paused) {
        this.move()
        this.draw()
      }
    }, 1000/this.fps)
  }
}