import ReactDOM from 'react-dom'
import App from './App'
import mori from 'mori'
import './index.css'

// -----------------------------------------------------------------------------
// Render Loop
// -----------------------------------------------------------------------------

const rootEl = document.getElementById('root')

const initialState = {
  activeTab: 'Home',
  newTabText: '',
  tabs: ['Home', 'Contact Us', 'About', 'Foo', 'Bar']
}

// set up our initial render
window.CURRENT_STATE = null
window.NEXT_STATE = mori.toClj(initialState)

let renderCount = 0

function render () {
  if (!mori.equals(window.CURRENT_STATE, window.NEXT_STATE)) {
    // next state is now our current state
    window.CURRENT_STATE = window.NEXT_STATE

    ReactDOM.render(App({imdata: window.CURRENT_STATE}), rootEl)

    renderCount = renderCount + 1

    // console.log('Render #' + renderCount)
    // console.log(mori.toJs(window.CURRENT_STATE))
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  }
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
