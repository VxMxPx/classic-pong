import Game from './lib/game'
import './style.css'

let menu = document.getElementById('mainMenu')
let canvas = document.getElementById('stage')

let pong = new Game({
  fps: 30,
  scoreEl: document.getElementById('score'),
  notifyEl: document.getElementById('notify'),
  canvas, document
})

const button = menu.getElementsByClassName('newGame')[0]
button.addEventListener('click', function () {
  menu.style.display = 'none'
  pong.run()
})
