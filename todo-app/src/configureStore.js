import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import todoAppReducer from './reducers/reducers'

const thunk = (store) => (next) => (action) =>
    typeof action === 'function' ?
        action(store.dispatch) :
        next(action)

// Create augmented store
const configureStore = () => {
    const middlewares = [thunk]

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger())
    }

    return createStore(
        todoAppReducer,
        applyMiddleware(...middlewares)
    )
}

export default configureStore
