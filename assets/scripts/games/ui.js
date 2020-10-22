const store = require('./../store')
// Create part

const onCreateSuccess = function (response) {
  store.game = null
  store.count = 0
  $('#message').text('Game created successfully')
  $('#board').show()
  $('#game_notifications').show()
  $('#board-rows').children().text('')
  $('#game_not_messages').children().text('')
  $('#current_player').text('Current player: X')
  $('#notification').text('')
  $('#update').text('')
  $('#result').text('')
  store.game = response.game
  store.truecount = 0
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
  $('#update').text('Updated Successfully')
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

const onGetPrevSuccess = function (response) {
  $('#board').show()
  $('#board-rows').children().text('')
  let arr
  if (typeof store.game === 'undefined') {
    arr = response.games[response.games.length - 1].cells
  } else {
    arr = response.games[response.games.length - 2].cells
  }
  for (let i = 0; i < 10; i++) {
    const input = arr[i]
    $('#box' + i).text(input)
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
  gameResult,
  onGetPrevSuccess
}
