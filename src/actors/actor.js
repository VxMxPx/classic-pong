export default class Actor {

  constructor(x, y, width, height, texture) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.texture = texture

    this.constraints = {x: 0, y: 0, width: 0, height: 0}
  }

  getCorrectedPosition() {
    return {x: this.x, y: this.y}
  }

  collide(actor) {

    const actorPos = actor.getCorrectedPosition()
    const thisPos = this.getCorrectedPosition()

    if ((actorPos.y >= thisPos.y || actorPos.y+actor.height >= thisPos.y) && actorPos.y <= thisPos.y+this.height) {
      if ((actorPos.x >= thisPos.x || actorPos.x+actor.width >= thisPos.x) && actorPos.x <= thisPos.x+this.width) {
        return true
      }
    }

    return false
  }

  getNamedPosition(query) {
    let position = []
    const cw = this.constraints.width
    const ch = this.constraints.height
    if (this.x > cw/2-10 && this.x < cw/2+10) {
      position.push('x-center')
    } else {
      if (this.x < cw/2) { position.push('left') }
      if (this.x > cw/2) { position.push('right') }
    }
    if (this.y > ch/2-10 && this.y < ch/2+10) {
      position.push('y-center')
    } else {
      if (this.y < ch/2) { position.push('top') }
      if (this.y > ch/2) { position.push('bottom') }
    }
    if (!query) {
      return position
    } else {
      return position.indexOf(query) > -1
    }
  }

  setPosition(x, y) {

    const constraints = this.constraints
    const width = this.width
    const height = this.height

    if (x < constraints.x) { x = constraints.x }
    if (x + width > constraints.width) { x = constraints.width - width }

    if (y < constraints.y) { y = constraints.y }
    if (y + height > constraints.height) { y = constraints.height - height }

    this.x = x
    this.y = y
  }

  setDimension(width, height) {
    this.width = width
    this.height = height
  }

  setConstraints(x, y, width, height) {
    this.constraints = {x, y, width, height}
  }

  draw(context) {
    context.fillStyle = this.texture
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}