import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'
import todoAppReducer from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import './App.css'

// Root container component
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)



// Store with persisted state
const persistedState = loadState()
const store = createStore(
    todoAppReducer,
    persistedState
)
store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    })
}, 1000))

// Renderer
ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
)
