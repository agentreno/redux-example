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

// Single Todo component
// Takes the click handler as a prop to make this a pure presentational
// component
const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration:
                completed ?
                'line-through' :
                'none'
        }}
    >
        {text}
    </li>
)

// TodoList component
// Takes the click handler as a prop to make this a pure presentational
// component
const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
)

class VisibleTodoList extends Component {
    componentWillMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const state = store.getState()
        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id =>
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id
                    })
                }
            />
        )
    }
}

const AddTodo = () => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node
            }} />
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text: input.value
                })
                input.value = ''
            }}>
                Add Todo
            </button>
        </div>
    )
}

const Link = ({
    active,
    onClick,
    children
}) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a href="#"
           onClick={e => {
               e.preventDefault()
               onClick()
           }}
        >
            {children}
        </a>
    )
}

// Container for Link, provides behaviour and active state
class FilterLink extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const props = this.props
        const state = store.getState()

        return (
            <Link
                active={
                    props.filter ===
                    state.visibilityFilter
                }
                onClick={() => {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }}
            >
                {props.children}
            </Link>
        )
    }
}

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink
            filter='SHOW_ALL'
        >
            All
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_ACTIVE'
        >
            Active
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_COMPLETED'
        >
            Completed
        </FilterLink>
    </p>
)

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

// Renderer
const render = () => {
    ReactDOM.render(
        <TodoApp />,
        document.getElementById('root')
    )
}

store.subscribe(render)

export default render
