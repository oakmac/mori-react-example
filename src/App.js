import React, { Component } from 'react'
import mori from 'mori'

class MoriComponent extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !mori.equals(this.props.imdata, nextProps.imdata)
  }
}

function onChangeTextInput (evt) {
  let newText = evt.currentTarget.value
  window.NEXT_STATE = mori.assoc(window.CURRENT_STATE, 'newTabText', newText)
}

function clickAddTabBtn (newText, evt) {
  if (newText === '') return

  let currentTabs = mori.get(window.CURRENT_STATE, 'tabs')
  let newTabs = mori.conj(currentTabs, newText)
  let newState = mori.assoc(window.CURRENT_STATE, 'tabs', newTabs, 'newTabText', '')
  window.NEXT_STATE = newState
}

class AddTabInput extends MoriComponent {
  render () {
    let txt = this.props.imdata

    return (
      <div>
        <input type="text" value={txt} onChange={onChangeTextInput} />
        <button onClick={clickAddTabBtn.bind(null, txt)}>Add Tab</button>
      </div>
    )
  }
}

function clickTab (tabName) {
  window.NEXT_STATE = mori.assoc(window.CURRENT_STATE, 'activeTab', tabName)
}

class Tab extends MoriComponent {
  render () {
    let name = mori.get(this.props.imdata, 'name')
    let isActive = mori.get(this.props.imdata, 'isActive')
    let className = 'tab'
    if (isActive) className += ' active'
    let clickFn = mori.partial(clickTab, name)

    return (
      <li className={className} onClick={clickFn}>{name}</li>
    )
  }
}

function App (props) {
  let activeTab = mori.get(props, 'activeTab')
  let searchTxt = mori.get(props, 'newTabText')
  let tabNames = mori.intoArray(mori.get(props, 'tabs'))
  let tabComponents = tabNames.map(function (tabName) {
    let tabData = mori.hashMap('name', tabName, 'isActive', tabName === activeTab)
    return React.createElement(Tab, {imdata: tabData})
  })

  return (
    <div>
      <h1>React.js + Mori</h1>
      <AddTabInput imdata={searchTxt} />
      <ul className="tabs">{tabComponents}</ul>
    </div>
  )
}

export default App
