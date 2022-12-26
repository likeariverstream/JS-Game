const start = document.getElementById('start') as HTMLButtonElement
const game = document.getElementById('game') as HTMLDivElement
const time = document.getElementById('time') as HTMLSpanElement
const timeHeader = document.getElementById('time-header') as HTMLHeadingElement
const resultHeader = document.getElementById('result-header') as HTMLHeadingElement
const result = document.getElementById('result') as HTMLSpanElement
const gameTime = document.getElementById('game-time') as HTMLInputElement


let score = 0
let isGameStarted = false

start.addEventListener('click', startGame)
game.addEventListener('click', handleBoxClick)
gameTime.addEventListener('input', setGameTime)

function startGame() {
  score = 0
  setGameTime()
  gameTime.setAttribute('disabled', 'true')
  show(timeHeader)
  hide(resultHeader)
  isGameStarted = true
  game.style.backgroundColor = '#FFF'
  hide(start)
  let interval = setInterval(() => {
    let sec = parseFloat(time.textContent as string)
    if (sec <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      time.textContent = (sec - 0.1).toFixed(1)
    }
  }, 100)
  renderBox()
}

function handleBoxClick(event: MouseEvent) {
  if (!isGameStarted) {
    return
  }
  if (!(event.target instanceof HTMLDivElement)) {
    return
  }
  if (event.target.dataset.square) {
    score++
    renderBox()
  }
}

function show(element: HTMLElement) {
  element.classList.remove('hide')
}

function hide(element: HTMLElement) {
  element.classList.add('hide')
}

function setGameScore() {
  result.textContent = score.toString()
}

function setGameTime() {
  let value = +gameTime.value
  time.textContent = value.toFixed(1)
}

function endGame() {
  game.innerHTML = ''
  setGameScore()
  isGameStarted = false
  gameTime.removeAttribute('disabled')
  show(start)
  game.style.backgroundColor = '#CCC'
  hide(timeHeader)
  show(resultHeader)

}

function renderBox() {
  game.innerHTML = ''
  const num = 255
  const squareSize = getRandom(30, 100)
  const gameSize = game.getBoundingClientRect()

  const maxTop = gameSize.height - squareSize
  const maxLeft = gameSize.width - squareSize
  const square = document.createElement('div')
  square.style.height = square.style.width = `${squareSize}px`
  square.style.position = 'absolute'
  square.style.backgroundColor = getColor()
  square.style.top = `${getRandom(0, maxTop)}px`
  square.style.left = `${getRandom(0, maxLeft)}px`
  square.style.cursor = 'pointer'
  square.setAttribute('data-square', 'true')

  game.insertAdjacentElement('afterbegin', square)
}

function getRandom(min: number, max: number) {
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
