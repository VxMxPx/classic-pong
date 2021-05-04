// See: http://blog.sklambert.com/html5-canvas-game-html5-audio-and-finishing-touches/
export default class Sound {
  constructor(id, maxSize=5) {
    this.size = maxSize
    this.pool = []
    this.currSound = 0
    this.id = id

    console.log(`I shall init ${maxSize} sound(s) for ${id}.`)
    for (let i = 0; i < this.size; i++) {
      let fileRaw = require(`../assets/${id}.wav`).default
      console.log({fileRaw})
      this.file = new Audio(fileRaw)
      this.file.volume = 1
      this.file.load()
      this.pool[i] = this.file
    }
  }

  get() {
    return this.file
  }

	play() {
    if (this.pool[this.currSound].currentTime == 0 || this.pool[this.currSound].ended) {
      console.log(`Play existing sound from pool @${this.currSound}.`)
      this.pool[this.currSound].play()
    }
    this.currSound = (this.currSound + 1) % this.size
    console.log(`Play new sound from pool @${this.currSound}.`)
	}
}
