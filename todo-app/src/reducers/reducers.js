import { combineReducers } from 'redux'

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
const todosReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todoReducer(state[action.id], action)
            }
        default:
            return state
    }
}

// allIds reducer
const allIds = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, action.id]
        default:
            return state
    }
}

// Root reducer
const todoAppReducer = combineReducers({
    todos: todosReducer,
    allIds
})

export default todoAppReducer

// Internal selector to get a list of todos
const getAllTodos = (state) => 
    state.allIds.map(id => state.todos[id])

// Selector to find visible todos given a filter
export const getVisibleTodos = (
    state,
    filter
) => {
    const allTodos = getAllTodos(state)
    switch (filter) {
        case 'all':
            return allTodos
        case 'completed':
            return allTodos.filter(
                t => t.completed
            )
        case 'active':
            return allTodos.filter(
                t => !t.completed
            )
        default:
            return allTodos
    }
}

