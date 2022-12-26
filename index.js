const start = document.getElementById('start')
const game = document.getElementById('game')
const time = document.getElementById('time')
let score
start.addEventListener('click', startGame)
game.addEventListener('click', hanleBoxClick)

function startGame() {
  game.style.backgroundColor = '#FFF'
  start.classList.add('hide')
  let interval = setInterval(() => {
    let sec = parseFloat(time.textContent)
    if (sec <= 0) {
      //end
    } else {
      time.textContent = (sec - 0.1).toFixed(1)
    }
  }, 100)
  renderBox()
}

function hanleBoxClick(event) {
  if (event.target.dataset.square) {
    score++
    renderBox()
  }
}

function renderBox() {
  game.innerHTML = ''
  const num = 255
  console.log()
  const squareSize = getRandom(30, 100)
  const gameSize = game.getBoundingClientRect()
  const maxTop = gameSize.height - squareSize
  const maxLeft = gameSize.width - squareSize
  const square = document.createElement('div')
  square.style.height = `${squareSize}px`
  square.style.width = `${squareSize}px`
  square.style.position = 'absolute'
  square.style.backgroundColor = getColor()
  square.setAttribute('data-square', 'true')
  square.style.top = `${getRandom(0, maxTop)}px`
  square.style.height = `${getRandom(0, maxLeft)}px`
  square.style.cursor = 'pointer'

  game.insertAdjacentElement('afterbegin', square)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
