import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import configureStore from './configureStore'
import './App.css'

const store = configureStore()

// Renderer
ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
)
