import React, { Component } from 'react'
import mori from 'mori'

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

function AddTabInput (txt) {
  return (
    <div>
      <input type="text" value={txt} onChange={onChangeTextInput} />
      <button onClick={clickAddTabBtn.bind(null, txt)}>Add Tab</button>
    </div>
  )
}

function clickTab (tabName) {
  window.NEXT_STATE = mori.assoc(window.CURRENT_STATE, 'activeTab', tabName)
}

function Tab (props) {
  let name = mori.get(props, 'name')
  let isActive = mori.get(props, 'isActive')
  let className = 'tab'
  if (isActive) className += ' active'
  let clickFn = clickTab.bind(null, name)

  return (
    <li className={className} onClick={clickFn}>{name}</li>
  )
}

function App (props) {
  let activeTab = mori.get(props, 'activeTab')
  let searchTxt = mori.get(props, 'newTabText')
  let tabNames = mori.intoArray(mori.get(props, 'tabs'))
  let tabComponents = tabNames.map(function (tabName) {
    return Tab(mori.hashMap('name', tabName, 'isActive', tabName === activeTab))
  })

  return (
    <div>
      <h1>React.js + Mori</h1>
      {AddTabInput(searchTxt)}
      <ul className="tabs">{tabComponents}</ul>
    </div>
  )
}

export default App
