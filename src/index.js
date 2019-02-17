import Game from './lib/game'

let menu = document.getElementById('mainMenu')
let canvas = document.getElementById('stage')
let pong = new Game({
  fps: 30,
  scoreEl: document.getElementById('score'),
  notifyEl: document.getElementById('notify'),
  canvas, document
})

menu.getElementsByClassName('newGame')[0].onclick = () => {
  menu.style.display = 'none'
  pong.run()
}
