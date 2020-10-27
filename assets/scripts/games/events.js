const api = require('./api')
const ui = require('./ui')
const game = require('./../game')
const store = require('./../store')
// Create part

const onCreateGame = function (event) {
  event.preventDefault()

  api.createGame()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFail)
}

const onGetGames = function (event) {
  event.preventDefault()

  api.getGames()
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFail)
    // Cannot reject
}

const onBoxClick = function (event) {
  event.preventDefault()

  const box = event.target
  const test = game.gameBoard(box)
  // If the game is over
  if (store.prevGame === 0) {
  if (test === false) {
    ui.onBoxClickFail()
  // If the move was valid
  } else {
    if (test.over === true && store.truecount === 0) {
      onUpdateGame(test)
      ui.onGameEnd()
      store.truecount++
    } else if (test.over === true && store.truecount > 0) {
      ui.onGameEnd()
    } else {
      onUpdateGame(test)
    }
  }
} else {
  ui.onGameEnd()
}
}

const onUpdateGame = function (test) {
  api.updateGame(test)
    .then(ui.onUpdateSuccess)
    .catch(ui.onUpdateFail)
}

const onGetPrev = function () {
  event.preventDefault()

  api.getGames()
    .then(ui.onGetPrevSuccess)
    .catch(ui.onGetPrevFail)
}
module.exports = {
  onCreateGame,
  onGetGames,
  onBoxClick,
  onGetPrev
}
