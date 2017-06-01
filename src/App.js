import React, { Component } from 'react'
import mori from 'mori'
import { getCurrentState, setNextState } from './state'

class MoriComponent extends Component {
  shouldComponentUpdate (nextProps, _nextState) {
    return !mori.equals(this.props.imdata, nextProps.imdata)
  }
}

function onChangeTextInput (evt) {
  const newText = evt.currentTarget.value
  const newState = mori.assoc(getCurrentState(), 'newTabText', newText)
  setNextState(newState)
}

function clickAddTabBtn (newText, _evt) {
  if (newText === '') return

  const currentState = getCurrentState()
  const currentTabs = mori.get(currentState, 'tabs')
  const newTabs = mori.conj(currentTabs, newText)
  const newState = mori.assoc(currentState, 'tabs', newTabs, 'newTabText', '')
  setNextState(newState)
}

class AddTabInput extends MoriComponent {
  render () {
    const txt = this.props.imdata
    const clickFn = mori.partial(clickAddTabBtn, txt)
    return (
      <div>
        <input type="text" value={txt} onChange={onChangeTextInput} />
        <button onClick={clickFn}>Add Tab</button>
      </div>
    )
  }
}

function clickTab (tabName) {
  const newState = mori.assoc(getCurrentState(), 'activeTab', tabName)
  setNextState(newState)
}

class Tab extends MoriComponent {
  render () {
    const name = mori.get(this.props.imdata, 'name')
    const isActive = mori.get(this.props.imdata, 'isActive')
    let className = 'tab'
    if (isActive) className += ' active'
    const clickFn = mori.partial(clickTab, name)

    return <li className={className} onClick={clickFn}>{name}</li>
  }
}

function App (props) {
  const activeTab = mori.get(props.imdata, 'activeTab')
  const searchTxt = mori.get(props.imdata, 'newTabText')
  const tabNames = mori.intoArray(mori.get(props.imdata, 'tabs'))
  const tabComponents = tabNames.map(function (tabName, idx) {
    const tabData = mori.hashMap('name', tabName, 'isActive', tabName === activeTab)
    return <Tab imdata={tabData} key={idx} />
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
