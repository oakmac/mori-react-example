import React, { Component } from 'react'
import mori from 'mori'

class MoriComponent extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !mori.equals(this.props.imdata, nextProps.imdata)
  }
}

function onChangeTextInput (evt) {
  const newText = evt.currentTarget.value
  window.NEXT_STATE = mori.assoc(window.CURRENT_STATE, 'newTabText', newText)
}

function clickAddTabBtn (newText, evt) {
  if (newText === '') return

  const currentTabs = mori.get(window.CURRENT_STATE, 'tabs')
  const newTabs = mori.conj(currentTabs, newText)
  const newState = mori.assoc(window.CURRENT_STATE, 'tabs', newTabs, 'newTabText', '')
  window.NEXT_STATE = newState
}

class AddTabInput extends MoriComponent {
  render () {
    const txt = this.props.imdata
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
    const name = mori.get(this.props.imdata, 'name')
    const isActive = mori.get(this.props.imdata, 'isActive')
    let className = 'tab'
    if (isActive) className += ' active'
    const clickFn = mori.partial(clickTab, name)

    return (
      <li className={className} onClick={clickFn}>{name}</li>
    )
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
