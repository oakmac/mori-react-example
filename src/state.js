function getCurrentState () {
  return window.CURRENT_STATE
}

function setNextState (newState) {
  // TODO: validate the newState here
  window.NEXT_STATE = newState
}

module.exports = {
  getCurrentState: getCurrentState,
  setNextState: setNextState
}
