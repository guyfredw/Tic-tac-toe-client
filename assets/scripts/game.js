const store = require('./store')
const ui = require('./games/ui')

let arr = []
// let status = false
let winner

const gameBoard = function (index) {
  if (store.prevGame > 0) {
    return true
  } else {
  arr = store.game.cells
  let player
  const playIndex = $('#' + index.id).data('cellIndex')
  const valid = validPos(playIndex)
  // If the position is valid and the game is not over
  if (valid === true && store.game.over === false) {
    store.count++
    player = getValue()
    arr[playIndex] = player
    nextPlayer(arr[playIndex])
    ui.onBoxClickSuccess(playIndex, arr[playIndex])
    // If the position is invalid and the game is not over
  } else if (valid === false && store.game.over === false) {
    ui.onBoxClickFail()
    return false
  }
  store.game.over = gameStatus()
  const playObj = {
    index: playIndex,
    player: player,
    over: store.game.over
  }
  return playObj
}
}

// Get player symbol
const getValue = () => {
  let countX = 0
  let countO = 0
  let turnValue = ''
  for (let i = 0; i < 9; i++) {
    if (arr[i] === 'X') {
      countX++
    } else if (arr[i] === 'O') {
      countO++
    }
  }
  if (countX > countO) {
    turnValue = 'O'
  } else if (countX < countO) {
    turnValue = 'X'
  } else {
    turnValue = 'X'
  }
  return turnValue
}

const validPos = (playIndex) => {
  let valid = false
  if (arr[playIndex] === 'X' || arr[playIndex] === 'O') {
    valid = false
  } else {
    valid = true
  }
  return valid
}

// Determine player message
const nextPlayer = function (player) {
  let nextPlayer
  if (player === 'X') {
    nextPlayer = 'O'
  } else if (player === 'O') {
    nextPlayer = 'X'
  }
  ui.playerTurn(nextPlayer)
}

const gameStatus = () => {
  // let gameOver = false
  // Determine row wins
  if (store.count >= 4 && store.count < 9) {
    return checkWin()
  } else if (store.count === 9) {
    if (checkWin() === true) {
      return checkWin()
    } else {
      ui.onGameTie()
      return true
    }
  } else {
    return false
  }
}

const checkWin = () => {
  if (gameIndices(0, 1, 2) || gameIndices(3, 4, 5) || gameIndices(6, 7, 8)) {
    return true
  } else if (gameIndices(0, 3, 6) || gameIndices(1, 4, 7) || gameIndices(2, 5, 8)) {
    return true
  } else if (gameIndices(0, 4, 8) || gameIndices(2, 4, 6)) {
    return true
  } else {
    return false
  }
}

const gameIndices = (index1, index2, index3) => {
  if (arr[index1] === arr[index2] && arr[index1] === arr[index3] && arr[index1] !== '') {
    winner = arr[index1]
    ui.gameResult(winner)
    return true
  } else {
    return false
  }
}

module.exports = {
  gameBoard
}
