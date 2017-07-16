import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'
import todoAppReducer from './reducers'
import './App.css'

// Root container component
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

// Persisted state
const persistedState = {
    todos: [{
        id: 0,
        text: 'Welcome back',
        completed: false
    }]
}

// Store
const store = createStore(
    todoAppReducer,
    persistedState
)

// Renderer
ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
)
