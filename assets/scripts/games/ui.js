const store = require('./../store')
// Create part

const onCreateSuccess = function (response) {
  store.game = null
  store.count = 0
  $('#message').text('Game created successfully')
  // console.log(response)
  $('#board').show()
  $('#game_notifications').show()
  $('#board-rows').children().text('')
  $('#game_not_messages').children().text('')
  $('#current_player').text('Current player: X')
  $('#notification').text('')
  $('#update').text('')
  $('#result').text('')
  store.game = response.game
}

const onCreateFail = function () {
  $('#message').text('Failed to create game')
}

const onGetGamesSuccess = function (response) {
  const gamesFin = function () {
    let count = 0
    for (let i = 0; i < response.games.length; i++) {
      if (response.games[i].over === true) {
        count++
      }
    }
    return count
  }
  const displayGames = function () {
    // $('#games-display').append(`
    // <h4>Game id: ${element._id} </h4>
    // <p> Over: ${element.over} </p>
    // <p> Cells: ${element.cells} </p>
    // `)
    $('#games-display').html('')
    $('#games-display').append(`
      <h5> Stats </h5>
      <p> Games played: ${response.games.length} </p>
      <p> Games finished: ${gamesFin()} </p>
      `)
  }
  displayGames()
  // response.games.forEach(element => displayGames(element))
}

const onGetGamesFail = function () {
  $('#message').text('Failed to get games')
}

// Track board in JS
const onBoxClickSuccess = function (playIndex, val) {
  $('#box' + playIndex).text(val)
  $('#notification').text('')
}

const onBoxClickFail = function () {
  $('#notification').text('This position is invalid')
}

const onUpdateSuccess = function (response) {
  // store.game = response.game
  // console.log('updated game is:' + store.game.cells)
  // console.log('store.game is: ' + store.game)
}

const onUpdateFail = function () {
  $('#update').text('Failed to update game')
}

const playerTurn = function (player) {
  $('#current_player').text('Current player: ' + player)
}

const onGameEnd = function () {
  $('#notification').text('The game is over')
}

const onGameTie = function () {
  $('#result').text('It\'s a tie!')
}

const gameResult = function (player) {
  if (player === 'X') {
    $('#result').text('You win!')
  } else {
    $('#result').text('You lose')
  }
}

module.exports = {
  onCreateSuccess,
  onCreateFail,
  onGetGamesSuccess,
  onGetGamesFail,
  onBoxClickSuccess,
  onBoxClickFail,
  onUpdateSuccess,
  onUpdateFail,
  playerTurn,
  onGameEnd,
  onGameTie,
  gameResult
}
