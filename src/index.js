import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import mori from 'mori'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

// TODO: what does this do?
registerServiceWorker();

// ----------------------------------------------------------------------------
// Mori Example
// ----------------------------------------------------------------------------

let rootEl = document.getElementById('root')

const initialState = {
  activeTab: 'Home',
  tabs: ['Home', 'Contact Us', 'About', 'Foo', 'Bar'],
  newTabText: ''
}

window.CURRENT_STATE = null
window.NEXT_STATE = mori.toClj(initialState)

let renderCount = 0

function render () {
  if (!mori.equals(window.CURRENT_STATE, window.NEXT_STATE)) {
    // next app state is now our app state
    window.CURRENT_STATE = window.NEXT_STATE

    ReactDOM.render(App(window.CURRENT_STATE), rootEl)

    console.log('Render #' + renderCount)
    renderCount = renderCount + 1
  }
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
