import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'
import './App.css'

// Todo reducer
const todoReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }

            return {
                ...state,
                completed: !state.completed
            }
        default:
            return state
    }
}

// Todos reducer
const todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todoReducer(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t =>
                todoReducer(t, action)
            )
        default:
            return state
    }
}

// Visibility reducer
const visibilityFilterReducer = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

// Root reducer
const todoAppReducer = combineReducers({
    todosReducer,
    visibilityFilterReducer
})

// Root container component
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

// Renderer
ReactDOM.render(
    <Provider store={createStore(todoAppReducer)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
)
