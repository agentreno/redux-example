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
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer
})

export default todoAppReducer