export default class Mouse {

  constructor(canvas, document) {
    this.canvas = canvas
    this.document = document
  }

  getPosition(e) {
    let rect = this.canvas.getBoundingClientRect()
    let root = this.document.documentElement
    return {
      x: e.clientX - rect.left - root.scrollLeft,
      y: e.clientY - rect.top - root.scrollTop
    }
  }
}