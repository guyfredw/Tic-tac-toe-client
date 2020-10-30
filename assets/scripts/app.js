'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./auth/events')
const gameEvents = require('./games/events')

$(() => {
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#change-password-form').on('submit', events.onChangePass)
  $('#sign-out-form').on('submit', events.onSignOut)
  $('#change-password-form').hide()
  $('#sign-out-form').hide()
  // Create game part
  $('#create-game').on('submit', gameEvents.onCreateGame)
  $('#get-all-games').on('submit', gameEvents.onGetGames)
  // Hide create game and get all games
  $('#create-game').hide()
  $('#get-all-games').hide()
  // board click handlers
  $('.box').on('click', gameEvents.onBoxClick)
  // Hide game board
  $('#board').hide()
  $('#game_notifications').hide()
  // Get the previous game
  // $('#get-prev-game').on('submit', gameEvents.onGetPrev)
  // $('#get-prev-game').hide()
})
