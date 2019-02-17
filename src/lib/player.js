export default class Player {

  constructor(pad, mouse) {
    this.pad = pad
    this.mouse = mouse
  }

  updatePosition = e => {
    let position = this.mouse.getPosition(e)
    this.pad.setPosition(this.pad.x, position.y)
  }
}