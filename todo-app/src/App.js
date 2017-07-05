import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import './App.css'

// Todo reducer
const todo = (state, action) => {
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
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t =>
                todo(t, action)
            )
        default:
            return state
    }
}

// Visibility reducer
const visibilityFilter = (
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
const todoApp = combineReducers({
    todos,
    visibilityFilter
})

// Helper to find visible todos given a filter
const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            )
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            )
        default:
            return todos
    }
}

// Store
const store = createStore(todoApp)

// React components
let nextTodoId = 0

const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
           onClick={e => {
               e.preventDefault()
               store.dispatch({
                   type: 'SET_VISIBILITY_FILTER',
                   filter
               })
           }}
        >
            {children}
        </a>
    )
}

class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={node => {
                    this.input = node
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    })
                    this.input.value = ''
                }}>
                Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}
                            onClick={() => {
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                })
                            }}
                            style={{
                                textDecoration:
                                    todo.completed ?
                                    'line-through' :
                                    'none'
                            }}
                        >
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

// Renderer
const render = () => {
    ReactDOM.render(
        <TodoApp
            todos={store.getState().todos}
        />,
        document.getElementById('root')
    )
}

store.subscribe(render)

export default render
