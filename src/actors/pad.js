import Actor from './actor'

export default class Pad extends Actor {
  constructor(x, y, width, height) {
    super(x, y, width, height, 'white')

    this.impactPush = width*0.35
    this.impactStep = width*0.03

    this.animation = {
      position: 0,
      step: 0
    }
  }

  impactAnimate(delta) {
    const isLeft = this.getNamedPosition('left')
    this.animation.active = true
    this.animation.position = this.impactPush * (isLeft ? -1 : 1)
    this.animation.step = this.impactStep * (isLeft ? 1 : -1)
    this.animation.degrees = 20 * (delta * (isLeft ? 1 : -1))
    console.log('Pad hit at position', delta, isLeft, this.animation)
  }


  drawRotatedRect(ctx, x, y, width, height, texture, degrees) {

    ctx.save()

    ctx.beginPath()

    // move the rotation point to the center of the rect
    ctx.translate(x+width/2, y+height/2)

    // rotate the rect
    ctx.rotate(degrees*Math.PI/180)

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(-width/2, -height/2, width,height)

    ctx.fillStyle = texture
    ctx.fill()

    // restore the context to its untranslated/unrotated state
    ctx.restore()
  }

  draw(context) {
    if (!this.animation.active) {
      context.fillStyle = this.texture
      context.fillRect(this.x, this.y, this.width, this.height)
    } else {
      if (this.animation.degrees !== 0) {
        this.drawRotatedRect(
          context,
          this.x+this.animation.position,
          this.y,
          this.width,
          this.height,
          this.texture,
          this.animation.degrees)
      } else {
        context.fillStyle = this.texture
        context.fillRect(this.x+this.animation.position, this.y, this.width, this.height)
      }
      if (this.animation.step > 0) {
        if (this.animation.position < 0) {
          this.animation.position += this.animation.step
          if (this.animation.degrees !== 0) {
            if (this.animation.degrees < 0) {
              this.animation.degrees += .3
            } else {
              this.animation.degrees -= .3
            }
          }
        } else {
          this.animation.position = 0
          this.animation.degrees = 0
          this.animation.active = false
        }
      }
      else if (this.animation.step < 0) {
        if (this.animation.position > 0) {
          this.animation.position += this.animation.step
          if (this.animation.degrees !== 0) {
            if (this.animation.degrees < 0) {
              this.animation.degrees += .3
            } else {
              this.animation.degrees -= .3
            }
          }
        } else {
          this.animation.position = 0
          this.animation.degrees = 0
          this.animation.active = false
        }
      }
    }
  }
}